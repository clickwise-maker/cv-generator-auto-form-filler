import { randomBytes } from "node:crypto";
import type { Profile, Settings } from "../cv/model.ts";
import { cvKey as makeCvKey, versionHash as makeVersionHash } from "./canonical.ts";
import {
  DEFAULT_ENTITLEMENT_POLICY,
  DEFAULT_MAX_DOWNLOADS,
  EXPORT_CURRENCY,
  EXPORT_PRICE_MINOR,
  formatPrice,
  policyExplanation,
  type EntitlementPolicy,
  type PaywallStatus,
} from "./config.ts";
import { RazorpayProvider, SimulatedProvider, type PaymentProvider, type VerifiedPayment } from "./providers.server.ts";
import { MemoryPaymentStore, type EntitlementRecord, type OrderRecord, type PaymentStore } from "./store.server.ts";

export type PaymentEnv = Record<string, string | undefined>;

export type ServiceConfig = {
  trialMode: boolean;
  production: boolean;
  priceMinor: number;
  currency: string;
  policy: EntitlementPolicy;
  maxDownloads: number;
  live: PaymentProvider | null; // only set when live payments are fully configured
  simulated: SimulatedProvider | null; // only set in trial mode outside production
};

/** All decisions come from SERVER env vars; nothing the browser sends can change them. */
export function configFromEnv(env: PaymentEnv): ServiceConfig {
  const trialMode = (env.TRIAL_MODE ?? "true").trim().toLowerCase() !== "false"; // safe default: trial
  const production = env.NODE_ENV === "production";
  const policy: EntitlementPolicy = env.EXPORT_ENTITLEMENT_POLICY === "cv" ? "cv" : DEFAULT_ENTITLEMENT_POLICY;
  const maxRaw = Number(env.EXPORT_MAX_DOWNLOADS ?? DEFAULT_MAX_DOWNLOADS);
  const maxDownloads = Number.isInteger(maxRaw) && maxRaw >= 0 ? maxRaw : DEFAULT_MAX_DOWNLOADS;
  let live: PaymentProvider | null = null;
  if (!trialMode && env.PAYMENT_PROVIDER === "razorpay" && env.RAZORPAY_KEY_ID && env.RAZORPAY_KEY_SECRET && env.RAZORPAY_WEBHOOK_SECRET) {
    live = new RazorpayProvider(env.RAZORPAY_KEY_ID, env.RAZORPAY_KEY_SECRET, env.RAZORPAY_WEBHOOK_SECRET);
  }
  const simulated = trialMode && !production ? new SimulatedProvider(env.SIMULATED_PAYMENT_SECRET || randomBytes(32).toString("hex")) : null;
  return { trialMode, production, priceMinor: EXPORT_PRICE_MINOR, currency: EXPORT_CURRENCY, policy, maxDownloads, live, simulated };
}

export class PaymentError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
  ) {
    super(message);
  }
}

export type DocInput = { docId: string; profile: Profile; settings: Settings };

function newId(prefix: string) {
  return `${prefix}_${randomBytes(16).toString("hex")}`;
}

export class PaymentService {
  constructor(
    readonly cfg: ServiceConfig,
    readonly store: PaymentStore = new MemoryPaymentStore(),
    private readonly now: () => number = Date.now,
  ) {}

  private provider(): PaymentProvider | null {
    return this.cfg.live ?? this.cfg.simulated;
  }

  status(): PaywallStatus {
    const base = {
      trialMode: this.cfg.trialMode,
      priceMinor: this.cfg.priceMinor,
      currency: this.cfg.currency,
      priceLabel: formatPrice(this.cfg.priceMinor, this.cfg.currency),
      policy: this.cfg.policy,
      maxDownloads: this.cfg.maxDownloads,
      policyText: policyExplanation(this.cfg.policy, this.cfg.maxDownloads),
    };
    if (this.cfg.live) {
      return { ...base, mode: this.cfg.live.test ? "test" : "live", provider: this.cfg.live.name, message: this.cfg.live.test ? "Razorpay TEST keys — no real money moves." : "Secure payment via Razorpay." };
    }
    if (this.cfg.simulated) {
      return { ...base, mode: "test", provider: "simulated", message: "TEST MODE — simulated payment. No money is charged and test unlocks never count as real purchases." };
    }
    return { ...base, mode: "unavailable", provider: null, message: "Paid clean exports are not yet available. You can keep editing and download the watermarked preview for free." };
  }

  /** Create (or idempotently reuse) an order for this CV. Amount/currency come from server config only. */
  async createOrder(doc: DocInput, idempotencyKey: string) {
    const provider = this.provider();
    if (!provider) throw new PaymentError(503, "payments_unavailable", "Paid exports are not yet available.");
    if (!/^[A-Za-z0-9_-]{8,80}$/.test(idempotencyKey)) throw new PaymentError(400, "bad_idempotency_key", "Missing idempotency key.");
    if (!/^[A-Za-z0-9_-]{8,80}$/.test(doc.docId)) throw new PaymentError(400, "bad_doc", "Missing document id.");
    const versionHash = makeVersionHash(doc.profile, doc.settings);
    const cvKey = makeCvKey(doc.docId, doc.profile);

    const existing = await this.store.findOrderByIdempotencyKey(idempotencyKey);
    if (existing) {
      if (existing.versionHash !== versionHash) throw new PaymentError(409, "idempotency_conflict", "This request key was already used for different CV content.");
      return { order: existing, reused: true };
    }
    const orderId = newId("ord");
    const created = await provider.createOrder({ receipt: orderId.slice(0, 40), amountMinor: this.cfg.priceMinor, currency: this.cfg.currency });
    const order: OrderRecord = {
      orderId,
      providerOrderId: created.providerOrderId,
      provider: provider.name,
      test: provider.test,
      amountMinor: this.cfg.priceMinor,
      currency: this.cfg.currency,
      status: "created",
      docId: doc.docId,
      versionHash,
      cvKey,
      idempotencyKey,
      createdAt: this.now(),
    };
    await this.store.putOrder(order);
    return { order, reused: false, publicKey: created.publicKey };
  }

  /** Validate a provider-verified payment against OUR order and, once, issue the entitlement. */
  private locks = new Map<string, Promise<unknown>>();

  /** Serialise settlement per order so a concurrent verify + webhook cannot issue two entitlements (in-process; a DB store must use a conditional update). */
  private async settle(order: OrderRecord, payment: VerifiedPayment): Promise<OrderRecord> {
    const prev = this.locks.get(order.orderId) ?? Promise.resolve();
    const run = prev.catch(() => undefined).then(async () => this.settleNow((await this.store.getOrder(order.orderId)) ?? order, payment));
    this.locks.set(order.orderId, run);
    try {
      return await run;
    } finally {
      if (this.locks.get(order.orderId) === run) this.locks.delete(order.orderId);
    }
  }

  private async settleNow(order: OrderRecord, payment: VerifiedPayment): Promise<OrderRecord> {
    if (payment.providerOrderId !== order.providerOrderId) throw new PaymentError(400, "order_mismatch", "Payment is for a different order.");
    if (payment.amountMinor !== order.amountMinor || payment.currency !== order.currency) {
      throw new PaymentError(400, "amount_mismatch", "Payment amount or currency does not match the order.");
    }
    if (order.status === "paid") return order; // idempotent: never a second entitlement, never a second charge
    if (payment.status !== "captured") {
      if (order.status === "created") await this.store.putOrder({ ...order, status: "failed" });
      throw new PaymentError(402, "payment_not_captured", "The payment did not go through.");
    }
    const ent: EntitlementRecord = {
      entitlementId: newId("ent"),
      orderId: order.orderId,
      test: order.test,
      policy: this.cfg.policy,
      versionHash: order.versionHash,
      cvKey: order.cvKey,
      maxDownloads: this.cfg.maxDownloads,
      downloads: 0,
      createdAt: this.now(),
    };
    await this.store.putEntitlement(ent);
    const paid: OrderRecord = { ...order, status: "paid", paidAt: this.now(), paymentId: payment.paymentId, entitlementId: ent.entitlementId };
    await this.store.putOrder(paid);
    return paid;
  }

  /** Browser returns from checkout with (paymentId, signature): verified server-side, never trusted as-is. */
  async verifyPayment(orderId: string, paymentId: string, signature: string) {
    const order = await this.store.getOrder(orderId);
    if (!order) throw new PaymentError(404, "no_order", "Unknown order.");
    const provider = this.providerFor(order);
    let payment: VerifiedPayment;
    try {
      payment = await provider.verifyClientPayment({ providerOrderId: order.providerOrderId, paymentId, signature });
    } catch {
      throw new PaymentError(400, "verification_failed", "Payment could not be verified.");
    }
    return this.settle(order, payment);
  }

  /** Signed webhook from the provider. Replays and duplicates are no-ops. */
  async handleWebhook(providerName: string, rawBody: string, signature: string | null, eventIdHeader?: string | null) {
    const provider = this.cfg.live?.name === providerName ? this.cfg.live : this.cfg.simulated?.name === providerName ? this.cfg.simulated : null;
    if (!provider) throw new PaymentError(404, "no_provider", "Provider not enabled.");
    let event;
    try {
      event = provider.parseWebhook(rawBody, signature);
    } catch {
      throw new PaymentError(401, "bad_signature", "Invalid webhook signature.");
    }
    const eventId = eventIdHeader || event.eventId;
    if (!(await this.store.markEventProcessed(`${providerName}:${eventId}`))) return { duplicate: true as const };
    if (!event.payment || (event.type !== "payment.captured" && event.type !== "order.paid" && event.type !== "payment.failed")) return { ignored: true as const };
    const order = await this.store.getOrderByProviderId(event.payment.providerOrderId);
    if (!order) return { ignored: true as const };
    try {
      const settled = await this.settle(order, event.payment);
      return { orderId: settled.orderId, status: settled.status };
    } catch (error) {
      if (error instanceof PaymentError && error.code === "payment_not_captured") return { orderId: order.orderId, status: "failed" as const };
      throw error;
    }
  }

  async cancelOrder(orderId: string) {
    const order = await this.store.getOrder(orderId);
    if (!order) throw new PaymentError(404, "no_order", "Unknown order.");
    if (order.status === "created") await this.store.putOrder({ ...order, status: "cancelled" });
    return (await this.store.getOrder(orderId))!;
  }

  private providerFor(order: OrderRecord): PaymentProvider {
    const p = order.provider === "simulated" ? this.cfg.simulated : this.cfg.live;
    if (!p || p.name !== order.provider) throw new PaymentError(409, "provider_disabled", "This order's payment provider is no longer enabled.");
    return p;
  }

  /**
   * THE gate for clean exports. Checks a server-stored entitlement against the
   * canonical CV data the file will be built from. Returns the entitlement after
   * counting the download.
   */
  async authorizeCleanExport(entitlementId: string | undefined, doc: DocInput): Promise<EntitlementRecord> {
    if (!entitlementId) throw new PaymentError(402, "no_entitlement", "A clean export needs an unlock.");
    const ent = await this.store.getEntitlement(entitlementId);
    if (!ent) throw new PaymentError(402, "no_entitlement", "A clean export needs an unlock.");
    const order = await this.store.getOrder(ent.orderId);
    if (!order || order.status !== "paid") throw new PaymentError(402, "no_entitlement", "A clean export needs an unlock.");
    // Test unlocks are only honoured while the simulated/test provider is active (never as real purchases).
    if (ent.test && !(this.cfg.simulated || this.cfg.live?.test)) throw new PaymentError(402, "test_entitlement", "Test unlocks are not valid for real exports.");
    if (!ent.test && !this.cfg.live) throw new PaymentError(503, "payments_unavailable", "Paid exports are not available right now.");
    const matches = ent.policy === "version" ? ent.versionHash === makeVersionHash(doc.profile, doc.settings) : ent.cvKey === makeCvKey(doc.docId, doc.profile);
    if (!matches) {
      throw new PaymentError(
        402,
        "edited_after_purchase",
        ent.policy === "version" ? "This CV changed after it was unlocked. The edited version needs a new unlock." : "This unlock belongs to a different CV.",
      );
    }
    if (ent.maxDownloads > 0 && ent.downloads >= ent.maxDownloads) throw new PaymentError(429, "download_limit", "Download limit for this unlock reached.");
    const updated = { ...ent, downloads: ent.downloads + 1 };
    await this.store.putEntitlement(updated);
    return updated;
  }

  /** TEST ONLY: simulate the provider completing (or not) a payment for an order. */
  async simulate(orderId: string, outcome: "success" | "failure" | "cancel") {
    const sim = this.cfg.simulated;
    if (!sim || this.cfg.live) throw new PaymentError(404, "not_found", "Not found.");
    const order = await this.store.getOrder(orderId);
    if (!order || order.provider !== "simulated") throw new PaymentError(404, "no_order", "Unknown order.");
    if (outcome === "cancel") return this.cancelOrder(orderId);
    const paymentId = `sim_pay:${outcome === "success" ? "ok" : "fail"}:${order.amountMinor}:${order.currency}:${randomBytes(6).toString("hex")}`;
    return this.verifyPayment(orderId, paymentId, sim.sign(order.providerOrderId, paymentId));
  }
}
