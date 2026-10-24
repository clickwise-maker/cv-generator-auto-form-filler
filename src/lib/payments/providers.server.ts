import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Payment-provider boundary. Two implementations:
 * - simulated: test-only, never usable when live payments are on or NODE_ENV=production.
 * - razorpay:  INR, UPI/cards/netbanking handled entirely on Razorpay's hosted
 *   Checkout — this app never sees card details. Uses Razorpay's REST API via
 *   fetch (no SDK dependency). Not configured in this repo.
 */
export type ProviderOrder = { providerOrderId: string; publicKey?: string };

export type VerifiedPayment = {
  providerOrderId: string;
  paymentId: string;
  amountMinor: number;
  currency: string;
  status: "captured" | "authorized" | "failed" | "other";
};

export interface PaymentProvider {
  readonly name: "simulated" | "razorpay";
  readonly test: boolean;
  createOrder(input: { receipt: string; amountMinor: number; currency: string }): Promise<ProviderOrder>;
  /** Verify a client-reported payment with the provider (signature + server-side fetch). */
  verifyClientPayment(input: { providerOrderId: string; paymentId: string; signature: string }): Promise<VerifiedPayment>;
  /** Verify a webhook's signature over the RAW body; returns the parsed event or throws. */
  parseWebhook(rawBody: string, signature: string | null): WebhookEvent;
}

export type WebhookEvent = {
  eventId: string;
  type: "payment.captured" | "payment.failed" | "order.paid" | "other";
  payment?: VerifiedPayment;
};

export function hmacHex(secret: string, data: string): string {
  return createHmac("sha256", secret).update(data).digest("hex");
}

export function safeEqualHex(a: string, b: string): boolean {
  const x = Buffer.from(a, "utf8");
  const y = Buffer.from(b, "utf8");
  return x.length === y.length && timingSafeEqual(x, y);
}

export class RazorpayProvider implements PaymentProvider {
  readonly name = "razorpay" as const;
  readonly test: boolean;
  constructor(
    private readonly keyId: string,
    private readonly keySecret: string,
    private readonly webhookSecret: string,
    private readonly fetchImpl: typeof fetch = fetch,
  ) {
    // rzp_test_ keys are Razorpay's sandbox; they must never count as real revenue.
    this.test = keyId.startsWith("rzp_test_");
  }

  private auth() {
    return `Basic ${Buffer.from(`${this.keyId}:${this.keySecret}`).toString("base64")}`;
  }

  async createOrder(input: { receipt: string; amountMinor: number; currency: string }): Promise<ProviderOrder> {
    const res = await this.fetchImpl("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: { authorization: this.auth(), "content-type": "application/json" },
      body: JSON.stringify({ amount: input.amountMinor, currency: input.currency, receipt: input.receipt, payment_capture: 1 }),
    });
    if (!res.ok) throw new Error(`razorpay order failed (${res.status})`);
    const body = (await res.json()) as { id?: string; amount?: number; currency?: string };
    if (!body.id || body.amount !== input.amountMinor || body.currency !== input.currency) {
      throw new Error("razorpay order mismatch");
    }
    return { providerOrderId: body.id, publicKey: this.keyId };
  }

  async verifyClientPayment(input: { providerOrderId: string; paymentId: string; signature: string }): Promise<VerifiedPayment> {
    const expected = hmacHex(this.keySecret, `${input.providerOrderId}|${input.paymentId}`);
    if (!safeEqualHex(expected, input.signature)) throw new Error("bad payment signature");
    // Signature proves the triple came from Razorpay; still fetch the payment for amount/status.
    const res = await this.fetchImpl(`https://api.razorpay.com/v1/payments/${encodeURIComponent(input.paymentId)}`, {
      headers: { authorization: this.auth() },
    });
    if (!res.ok) throw new Error(`razorpay payment fetch failed (${res.status})`);
    return toVerified((await res.json()) as RzpPayment);
  }

  parseWebhook(rawBody: string, signature: string | null): WebhookEvent {
    if (!signature || !safeEqualHex(hmacHex(this.webhookSecret, rawBody), signature)) {
      throw new Error("bad webhook signature");
    }
    const body = JSON.parse(rawBody) as { event?: string; payload?: { payment?: { entity?: RzpPayment } } };
    const entity = body.payload?.payment?.entity;
    const type = body.event === "payment.captured" || body.event === "payment.failed" || body.event === "order.paid" ? body.event : "other";
    // Razorpay sends the event id in the x-razorpay-event-id header; the caller passes it in. Fallback: payment id + event.
    return { eventId: `${body.event}:${entity?.id ?? "?"}`, type, payment: entity ? toVerified(entity) : undefined };
  }
}

type RzpPayment = { id: string; order_id: string; amount: number; currency: string; status: string };

function toVerified(p: RzpPayment): VerifiedPayment {
  const status = p.status === "captured" ? "captured" : p.status === "authorized" ? "authorized" : p.status === "failed" ? "failed" : "other";
  return { providerOrderId: p.order_id, paymentId: p.id, amountMinor: p.amount, currency: p.currency, status };
}

/**
 * Test-only provider. "Payments" are simulated by the server itself; it only
 * exists so the success / cancel / failure UI and the entitlement plumbing can
 * be exercised without money. Entitlements it produces are flagged test=true.
 */
export class SimulatedProvider implements PaymentProvider {
  readonly name = "simulated" as const;
  readonly test = true;
  private seq = 0;
  constructor(private readonly secret: string) {}

  async createOrder(input: { receipt: string }): Promise<ProviderOrder> {
    this.seq += 1;
    return { providerOrderId: `sim_order_${input.receipt}` };
  }

  /** Server-side "signature" for a simulated payment, so the verify path is the same shape as live. */
  sign(providerOrderId: string, paymentId: string) {
    return hmacHex(this.secret, `${providerOrderId}|${paymentId}`);
  }

  async verifyClientPayment(input: { providerOrderId: string; paymentId: string; signature: string }): Promise<VerifiedPayment> {
    if (!safeEqualHex(this.sign(input.providerOrderId, input.paymentId), input.signature)) throw new Error("bad payment signature");
    const [, , amount, currency] = input.paymentId.split(":");
    return {
      providerOrderId: input.providerOrderId,
      paymentId: input.paymentId,
      amountMinor: Number(amount),
      currency: currency ?? "",
      status: input.paymentId.startsWith("sim_pay:ok") ? "captured" : "failed",
    };
  }

  parseWebhook(rawBody: string, signature: string | null): WebhookEvent {
    if (!signature || !safeEqualHex(hmacHex(this.secret, rawBody), signature)) throw new Error("bad webhook signature");
    const body = JSON.parse(rawBody) as { id: string; event: string; payment: VerifiedPayment };
    const type = body.event === "payment.captured" || body.event === "payment.failed" ? body.event : "other";
    return { eventId: body.id, type, payment: body.payment };
  }
}
