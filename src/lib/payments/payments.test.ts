import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { defaultSettings, sampleProfile, type Profile } from "../cv/model.ts";
import { EXPORT_PRICE_MINOR } from "./config.ts";
import { hmacHex, RazorpayProvider } from "./providers.server.ts";
import { configFromEnv, PaymentService } from "./service.server.ts";
import { handleCleanExport, handleCreateOrder, handleSimulate, handleStatus, handleVerify, handleWebhook } from "./http.server.ts";

const TRIAL_DEV = { TRIAL_MODE: "true", NODE_ENV: "development", SIMULATED_PAYMENT_SECRET: "test-secret" };
const svcFor = (env: Record<string, string | undefined>) => new PaymentService(configFromEnv(env));
const doc = (profile: Profile = sampleProfile()) => ({ docId: "doc_testdoc1", profile, settings: defaultSettings() });
const post = (body: unknown) => new Request("http://x/api", { method: "POST", body: JSON.stringify(body) });

async function paidEntitlement(svc: PaymentService, d = doc(), key = "idem_aaaaaaaa") {
  const { order } = await svc.createOrder(d, key);
  const paid = await svc.simulate(order.orderId, "success");
  assert.equal(paid.status, "paid");
  return paid.entitlementId!;
}

describe("server configuration (TRIAL_MODE)", () => {
  it("defaults to trial mode and never configures live payments", () => {
    const cfg = configFromEnv({});
    assert.equal(cfg.trialMode, true);
    assert.equal(cfg.live, null);
    assert.equal(cfg.priceMinor, 2900);
  });
  it("disables the simulator in production: paid exports report unavailable", () => {
    const svc = svcFor({ TRIAL_MODE: "true", NODE_ENV: "production" });
    assert.equal(svc.status().mode, "unavailable");
    assert.match(svc.status().message, /not yet available/);
  });
  it("live keys are ignored while TRIAL_MODE is on", () => {
    const cfg = configFromEnv({ ...TRIAL_DEV, PAYMENT_PROVIDER: "razorpay", RAZORPAY_KEY_ID: "rzp_live_x", RAZORPAY_KEY_SECRET: "s", RAZORPAY_WEBHOOK_SECRET: "w" });
    assert.equal(cfg.live, null);
  });
  it("status endpoint shows test labelling and the central price", async () => {
    const res = await handleStatus(new Request("http://x"), svcFor(TRIAL_DEV));
    const body = await res.json();
    assert.equal(body.mode, "test");
    assert.equal(body.priceLabel, "₹29");
    assert.match(body.message, /TEST MODE/);
  });
});

describe("paid export flow (simulated, test-only)", () => {
  it("issues a test entitlement after server-verified success and serves a clean PDF and DOCX", async () => {
    const svc = svcFor(TRIAL_DEV);
    const ent = await paidEntitlement(svc);
    const pdf = await handleCleanExport(post({ ...doc(), format: "pdf", entitlementId: ent }), svc);
    assert.equal(pdf.status, 200);
    assert.equal(pdf.headers.get("content-type"), "application/pdf");
    assert.equal(pdf.headers.get("x-entitlement-test"), "true");
    const pdfText = Buffer.from(await pdf.arrayBuffer()).toString("latin1");
    assert.ok(pdfText.startsWith("%PDF"));
    assert.ok(!pdfText.includes("UNPAID PREVIEW"), "paid PDF must be clean");
    const docx = await handleCleanExport(post({ ...doc(), format: "docx", entitlementId: ent }), svc);
    assert.equal(docx.status, 200);
    const bytes = Buffer.from(await docx.arrayBuffer());
    assert.equal(bytes.subarray(0, 2).toString(), "PK");
  });

  it("failure and cancel never issue an entitlement", async () => {
    const svc = svcFor(TRIAL_DEV);
    const a = await svc.createOrder(doc(), "idem_fail0001");
    await assert.rejects(svc.simulate(a.order.orderId, "failure"), { code: "payment_not_captured" });
    assert.equal((await svc.store.getOrder(a.order.orderId))!.status, "failed");
    const b = await svc.createOrder(doc(), "idem_cancel01");
    const cancelled = await svc.simulate(b.order.orderId, "cancel");
    assert.equal(cancelled.status, "cancelled");
    assert.equal(cancelled.entitlementId, undefined);
  });

  it("rejects a forged client signature (a success redirect alone unlocks nothing)", async () => {
    const svc = svcFor(TRIAL_DEV);
    const { order } = await svc.createOrder(doc(), "idem_forge001");
    const res = await handleVerify(post({ orderId: order.orderId, paymentId: "sim_pay:ok:2900:INR:x", signature: "deadbeef" }), svc);
    assert.equal(res.status, 400);
    assert.equal((await svc.store.getOrder(order.orderId))!.status, "created");
  });

  it("rejects an amount/currency mismatch", async () => {
    const svc = svcFor(TRIAL_DEV);
    const { order } = await svc.createOrder(doc(), "idem_amount01");
    const pid = "sim_pay:ok:100:INR:x";
    await assert.rejects(svc.verifyPayment(order.orderId, pid, svc.cfg.simulated!.sign(order.providerOrderId, pid)), { code: "amount_mismatch" });
    const pid2 = "sim_pay:ok:2900:USD:x";
    await assert.rejects(svc.verifyPayment(order.orderId, pid2, svc.cfg.simulated!.sign(order.providerOrderId, pid2)), { code: "amount_mismatch" });
  });

  it("client-sent price is ignored: the order always uses the server price", async () => {
    const svc = svcFor(TRIAL_DEV);
    const res = await handleCreateOrder(post({ ...doc(), idempotencyKey: "idem_price001", amountMinor: 1 }), svc);
    assert.equal((await res.json()).amountMinor, EXPORT_PRICE_MINOR);
  });

  it("simulate endpoint is 404 outside trial/dev", async () => {
    const res = await handleSimulate(post({ orderId: "x", outcome: "success" }), svcFor({ TRIAL_MODE: "true", NODE_ENV: "production" }));
    assert.equal(res.status, 404);
  });
});

describe("idempotency: duplicate orders and webhooks", () => {
  it("same idempotency key returns the same order (no double charge)", async () => {
    const svc = svcFor(TRIAL_DEV);
    const a = await svc.createOrder(doc(), "idem_dupe0001");
    const b = await svc.createOrder(doc(), "idem_dupe0001");
    assert.equal(a.order.orderId, b.order.orderId);
    assert.equal(b.reused, true);
  });
  it("re-verifying a paid order returns the same entitlement", async () => {
    const svc = svcFor(TRIAL_DEV);
    const { order } = await svc.createOrder(doc(), "idem_repeat01");
    const first = await svc.simulate(order.orderId, "success");
    const pid = first.paymentId!;
    const again = await svc.verifyPayment(order.orderId, pid, svc.cfg.simulated!.sign(order.providerOrderId, pid));
    assert.equal(again.entitlementId, first.entitlementId);
    assert.equal((svc.store as unknown as { entitlements: Map<string, unknown> }).entitlements.size, 1);
  });
  it("concurrent verify + webhook for one order issue exactly one entitlement", async () => {
    const svc = svcFor(TRIAL_DEV);
    const { order } = await svc.createOrder(doc(), "idem_race0001");
    const pid = "sim_pay:ok:2900:INR:race";
    const raw = JSON.stringify({ id: "evt_race", event: "payment.captured", payment: { providerOrderId: order.providerOrderId, paymentId: pid, amountMinor: 2900, currency: "INR", status: "captured" } });
    await Promise.all([
      svc.verifyPayment(order.orderId, pid, svc.cfg.simulated!.sign(order.providerOrderId, pid)),
      svc.handleWebhook("simulated", raw, hmacHex("test-secret", raw)),
      svc.verifyPayment(order.orderId, pid, svc.cfg.simulated!.sign(order.providerOrderId, pid)),
    ]);
    assert.equal((svc.store as unknown as { entitlements: Map<string, unknown> }).entitlements.size, 1);
  });
  it("repeated signed webhooks are processed once; unsigned ones are rejected", async () => {
    const svc = svcFor(TRIAL_DEV);
    const { order } = await svc.createOrder(doc(), "idem_hook0001");
    const raw = JSON.stringify({ id: "evt_1", event: "payment.captured", payment: { providerOrderId: order.providerOrderId, paymentId: "p1", amountMinor: 2900, currency: "INR", status: "captured" } });
    const sig = hmacHex("test-secret", raw);
    const mk = (s: string | null) => new Request("http://x", { method: "POST", body: raw, headers: s ? { "x-simulated-signature": s } : {} });
    assert.equal((await handleWebhook(mk(null), "simulated", svc)).status, 401);
    assert.equal((await handleWebhook(mk("00"), "simulated", svc)).status, 401);
    const r1 = await (await handleWebhook(mk(sig), "simulated", svc)).json();
    const r2 = await (await handleWebhook(mk(sig), "simulated", svc)).json();
    assert.equal(r1.status, "paid");
    assert.equal(r2.duplicate, true);
    assert.equal((svc.store as unknown as { entitlements: Map<string, unknown> }).entitlements.size, 1);
  });
});

describe("export endpoint protection", () => {
  it("direct requests without / with a fake entitlement get 402", async () => {
    const svc = svcFor(TRIAL_DEV);
    for (const entitlementId of [undefined, "", "ent_fake", "true"]) {
      for (const format of ["pdf", "docx"]) {
        const res = await handleCleanExport(post({ ...doc(), format, entitlementId, paid: true, trial: true }), svc);
        assert.equal(res.status, 402);
      }
    }
  });
  it("an unpaid (created) order's id is not an entitlement", async () => {
    const svc = svcFor(TRIAL_DEV);
    const res = await handleCreateOrder(post({ ...doc(), idempotencyKey: "idem_unpaid01" }), svc);
    const body = await res.json();
    assert.equal(body.entitlementId, undefined);
    assert.equal((await handleCleanExport(post({ ...doc(), format: "pdf", entitlementId: body.orderId }), svc)).status, 402);
  });
  it("test entitlements stop working once the simulator is off (never real purchases)", async () => {
    const env = { ...TRIAL_DEV };
    const svc = svcFor(env);
    const ent = await paidEntitlement(svc);
    const prod = new PaymentService(configFromEnv({ TRIAL_MODE: "true", NODE_ENV: "production" }), svc.store);
    assert.equal((await handleCleanExport(post({ ...doc(), format: "pdf", entitlementId: ent }), prod)).status, 402);
  });
  it("download limit is enforced", async () => {
    const svc = svcFor({ ...TRIAL_DEV, EXPORT_MAX_DOWNLOADS: "2" });
    const ent = await paidEntitlement(svc);
    assert.equal((await handleCleanExport(post({ ...doc(), format: "pdf", entitlementId: ent }), svc)).status, 200);
    assert.equal((await handleCleanExport(post({ ...doc(), format: "docx", entitlementId: ent }), svc)).status, 200);
    assert.equal((await handleCleanExport(post({ ...doc(), format: "pdf", entitlementId: ent }), svc)).status, 429);
  });
});

describe("edits after purchase", () => {
  const edited = () => {
    const p = sampleProfile();
    p.personal.headline = "Changed after purchase";
    return p;
  };
  it("policy=version: an edited CV needs a new unlock", async () => {
    const svc = svcFor(TRIAL_DEV);
    const ent = await paidEntitlement(svc);
    const res = await handleCleanExport(post({ ...doc(edited()), format: "pdf", entitlementId: ent }), svc);
    assert.equal(res.status, 402);
    assert.equal((await res.json()).error, "edited_after_purchase");
    // template change is also a new version
    const res2 = await handleCleanExport(post({ ...doc(), settings: { ...defaultSettings(), template: "atlas" }, format: "pdf", entitlementId: ent }), svc);
    assert.equal(res2.status, 402);
  });
  it("policy=cv: edits to the same CV stay unlocked, a different person does not", async () => {
    const svc = svcFor({ ...TRIAL_DEV, EXPORT_ENTITLEMENT_POLICY: "cv" });
    const ent = await paidEntitlement(svc);
    assert.equal((await handleCleanExport(post({ ...doc(edited()), format: "pdf", entitlementId: ent }), svc)).status, 200);
    const other = sampleProfile();
    other.personal.givenName = "Someone";
    assert.equal((await handleCleanExport(post({ ...doc(other), format: "pdf", entitlementId: ent }), svc)).status, 402);
    assert.equal((await handleCleanExport(post({ ...doc(), docId: "doc_otherdoc", format: "pdf", entitlementId: ent }), svc)).status, 402);
  });
});

describe("Razorpay provider (offline, fake secrets — no network)", () => {
  it("verifies the checkout signature and server-fetched payment; rejects forgery", async () => {
    const fakeFetch = (async () => new Response(JSON.stringify({ id: "pay_1", order_id: "order_1", amount: 2900, currency: "INR", status: "captured" }))) as typeof fetch;
    const p = new RazorpayProvider("rzp_test_abc", "key-secret", "hook-secret", fakeFetch);
    assert.equal(p.test, true);
    const ok = await p.verifyClientPayment({ providerOrderId: "order_1", paymentId: "pay_1", signature: hmacHex("key-secret", "order_1|pay_1") });
    assert.equal(ok.status, "captured");
    await assert.rejects(p.verifyClientPayment({ providerOrderId: "order_1", paymentId: "pay_1", signature: hmacHex("wrong", "order_1|pay_1") }));
    const raw = JSON.stringify({ event: "payment.captured", payload: { payment: { entity: { id: "pay_1", order_id: "order_1", amount: 2900, currency: "INR", status: "captured" } } } });
    assert.equal(p.parseWebhook(raw, hmacHex("hook-secret", raw)).type, "payment.captured");
    assert.throws(() => p.parseWebhook(raw, hmacHex("key-secret", raw)));
  });
});
