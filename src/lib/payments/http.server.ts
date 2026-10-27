import { buildDocxBuffer } from "../cv/export-docx.ts";
import { buildPdf } from "../cv/export-pdf.ts";
import { defaultSettings, emptyPersonal, fileBase, type Profile, type Settings } from "../cv/model.ts";
import { supabaseFromEnv, SupabaseRest } from "../db/supabase-rest.server.ts";
import { SupabasePaymentStore } from "./store.supabase.server.ts";
import { configFromEnv, PaymentError, PaymentService, type DocInput } from "./service.server.ts";

/**
 * Request -> Response handlers for /api/paid-export/*. Framework-agnostic so
 * they are unit-testable and can be mounted by TanStack Start routes or any
 * other Node/edge server.
 */
let singleton: PaymentService | null = null;
export function paymentService(): PaymentService {
  if (!singleton) {
    const sb = supabaseFromEnv();
    singleton = new PaymentService(configFromEnv(process.env), sb ? new SupabasePaymentStore(new SupabaseRest(sb)) : undefined);
  }
  return singleton;
}

const MAX_BODY = 3_000_000; // photos are data URLs

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });
}

async function readJson(request: Request): Promise<Record<string, unknown>> {
  const text = await request.text();
  if (text.length > MAX_BODY) throw new PaymentError(413, "too_large", "Request too large.");
  try {
    const v = JSON.parse(text);
    if (!v || typeof v !== "object") throw new Error();
    return v as Record<string, unknown>;
  } catch {
    throw new PaymentError(400, "bad_json", "Invalid JSON.");
  }
}

const ENUMS: Record<keyof Settings, readonly string[]> = {
  template: ["meridian", "consulate", "atlas"],
  locale: ["en", "fr", "de", "es"],
  dateStyle: ["dmy", "mdy", "iso"],
  nameOrder: ["given-family", "family-given"],
  paper: ["a4", "letter"],
};

/** Normalise untrusted CV input into the canonical shape the generators expect. */
export function parseDoc(body: Record<string, unknown>): DocInput {
  const docId = typeof body.docId === "string" ? body.docId : "";
  const rawSettings = (body.settings ?? {}) as Record<string, unknown>;
  const settings = defaultSettings();
  for (const key of Object.keys(ENUMS) as (keyof Settings)[]) {
    const v = rawSettings[key];
    if (v !== undefined) {
      if (typeof v !== "string" || !ENUMS[key].includes(v)) throw new PaymentError(400, "bad_settings", `Invalid ${key}.`);
      (settings as Record<string, string>)[key] = v;
    }
  }
  const raw = body.profile as Partial<Profile> | undefined;
  if (!raw || typeof raw !== "object" || !raw.personal || typeof raw.personal !== "object") throw new PaymentError(400, "bad_profile", "Invalid CV data.");
  const arr = <T,>(v: unknown) => (Array.isArray(v) ? (v as T[]) : []);
  const profile: Profile = {
    personal: { ...emptyPersonal(), ...raw.personal },
    experience: arr(raw.experience),
    education: arr(raw.education),
    skills: arr<unknown>(raw.skills).filter((s): s is string => typeof s === "string"),
    languages: arr(raw.languages),
    certifications: arr(raw.certifications),
    children: arr(raw.children),
    travel: arr(raw.travel),
  };
  return { docId, profile, settings };
}

function fail(error: unknown) {
  if (error instanceof PaymentError) return json(error.status, { error: error.code, message: error.message });
  console.error("[paid-export]", error);
  return json(500, { error: "server_error", message: "Something went wrong. Nothing was charged twice; please retry." });
}

function publicOrder(o: { orderId: string; status: string; amountMinor: number; currency: string; test: boolean; provider: string; providerOrderId: string; entitlementId?: string }) {
  return {
    orderId: o.orderId,
    status: o.status,
    amountMinor: o.amountMinor,
    currency: o.currency,
    test: o.test,
    provider: o.provider,
    providerOrderId: o.providerOrderId,
    // The entitlement id is a bearer secret for THIS CV's clean export; only returned once paid.
    entitlementId: o.status === "paid" ? o.entitlementId : undefined,
  };
}

export async function handleStatus(_req: Request, svc = paymentService()) {
  return json(200, svc.status());
}

export async function handleCreateOrder(req: Request, svc = paymentService()) {
  try {
    const body = await readJson(req);
    const doc = parseDoc(body);
    const { order, reused, publicKey } = (await svc.createOrder(doc, String(body.idempotencyKey ?? ""), typeof body.planId === "string" ? body.planId : undefined)) as Awaited<ReturnType<PaymentService["createOrder"]>> & { publicKey?: string };
    return json(reused ? 200 : 201, { ...publicOrder(order), reused, publicKey });
  } catch (e) {
    return fail(e);
  }
}

export async function handleVerify(req: Request, svc = paymentService()) {
  try {
    const body = await readJson(req);
    const order = await svc.verifyPayment(String(body.orderId ?? ""), String(body.paymentId ?? ""), String(body.signature ?? ""));
    return json(200, publicOrder(order));
  } catch (e) {
    return fail(e);
  }
}

export async function handleCancel(req: Request, svc = paymentService()) {
  try {
    const body = await readJson(req);
    return json(200, publicOrder(await svc.cancelOrder(String(body.orderId ?? ""))));
  } catch (e) {
    return fail(e);
  }
}

/** TEST ONLY — 404 unless TRIAL_MODE is on, NODE_ENV isn't production and no live provider is set. */
export async function handleSimulate(req: Request, svc = paymentService()) {
  try {
    const body = await readJson(req);
    const outcome = body.outcome === "success" || body.outcome === "failure" || body.outcome === "cancel" ? body.outcome : null;
    if (!outcome) throw new PaymentError(400, "bad_outcome", "outcome must be success|failure|cancel");
    return json(200, publicOrder(await svc.simulate(String(body.orderId ?? ""), outcome)));
  } catch (e) {
    return fail(e);
  }
}

export async function handleWebhook(req: Request, provider: string, svc = paymentService()) {
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY) throw new PaymentError(413, "too_large", "Request too large.");
    const signature = req.headers.get("x-razorpay-signature") ?? req.headers.get("x-simulated-signature");
    const result = await svc.handleWebhook(provider, raw, signature, req.headers.get("x-razorpay-event-id"));
    return json(200, result);
  } catch (e) {
    return fail(e);
  }
}

/** The ONLY route that returns a clean PDF/DOCX. Built from canonical CV data, gated by a server entitlement. */
export async function handleCleanExport(req: Request, svc = paymentService()) {
  try {
    const body = await readJson(req);
    const format = body.format === "docx" ? "docx" : body.format === "pdf" ? "pdf" : null;
    if (!format) throw new PaymentError(400, "bad_format", "format must be pdf or docx");
    const doc = parseDoc(body);
    const ent = await svc.authorizeCleanExport(typeof body.entitlementId === "string" ? body.entitlementId : undefined, doc);
    const name = fileBase(doc.profile, doc.settings);
    const headers: Record<string, string> = { "cache-control": "no-store", "x-entitlement-test": String(ent.test), "x-downloads-used": String(ent.downloads) };
    if (format === "pdf") {
      const bytes = buildPdf(doc.profile, doc.settings).output("arraybuffer");
      return new Response(bytes, { status: 200, headers: { ...headers, "content-type": "application/pdf", "content-disposition": `attachment; filename="${name}.pdf"` } });
    }
    const buf = await buildDocxBuffer(doc.profile, doc.settings);
    return new Response(new Uint8Array(buf), {
      status: 200,
      headers: { ...headers, "content-type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "content-disposition": `attachment; filename="${name}.docx"` },
    });
  } catch (e) {
    return fail(e);
  }
}

export async function handleCredits(req: Request, svc = paymentService()) {
  try {
    const body = await readJson(req);
    return json(200, await svc.getCredits(typeof body.entitlementId === "string" ? body.entitlementId : undefined));
  } catch (e) {
    return fail(e);
  }
}

/** Form filler: reserve one credit before filling. */
export async function handleFormFillStart(req: Request, svc = paymentService()) {
  try {
    const body = await readJson(req);
    return json(200, await svc.startFormFill(typeof body.entitlementId === "string" ? body.entitlementId : undefined, String(body.company ?? "")));
  } catch (e) {
    return fail(e);
  }
}

/** Form filler: report the outcome. success=false refunds the credit. */
export async function handleFormFillComplete(req: Request, svc = paymentService()) {
  try {
    const body = await readJson(req);
    return json(200, await svc.completeFormFill(typeof body.entitlementId === "string" ? body.entitlementId : undefined, String(body.reservationId ?? ""), body.success === true));
  } catch (e) {
    return fail(e);
  }
}
