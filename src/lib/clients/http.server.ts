import { randomBytes } from "node:crypto";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { emptyEducation, emptyPersonal, type Education, type Personal, type Profile } from "../cv/model.ts";
import { paymentService } from "../payments/http.server.ts";
import { PaymentError, type PaymentService } from "../payments/service.server.ts";
import { FileClientStore, type ClientStore } from "./store.server.ts";

/** Fields a client may submit — existing Personal model fields used by the form filler. No new semantics. */
export const CLIENT_PERSONAL_FIELDS = [
  "givenName",
  "familyName",
  "fatherName",
  "motherName",
  "dateOfBirth",
  "placeOfBirth",
  "sex",
  "maritalStatus",
  "nationality",
  "email",
  "phoneCode",
  "phone",
  "street",
  "city",
  "region",
  "postalCode",
  "country",
  "nationalId",
  "passportNumber",
  "positionApplied",
] as const satisfies readonly (keyof Personal)[];
const EDU_FIELDS = ["institution", "qualification", "field", "start", "end", "details"] as const satisfies readonly (keyof Education)[];

let store: ClientStore | null = null;
export function clientStore(): ClientStore {
  store ??= new FileClientStore(process.env.CLIENTS_STORE_FILE || join(tmpdir(), "cvstudio-clients.json"));
  return store;
}

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });
}
const id = (p: string, n = 24) => `${p}_${randomBytes(n).toString("base64url")}`;
const str = (v: unknown, max = 300) => (typeof v === "string" ? v.trim().slice(0, max) : "");

async function body(req: Request): Promise<Record<string, unknown>> {
  const t = await req.text();
  if (t.length > 100_000) throw new PaymentError(413, "too_large", "Request too large.");
  try {
    const v = JSON.parse(t);
    if (v && typeof v === "object") return v as Record<string, unknown>;
  } catch {
    // fallthrough
  }
  throw new PaymentError(400, "bad_json", "Invalid JSON.");
}

function fail(e: unknown) {
  if (e instanceof PaymentError) return json(e.status, { error: e.code, message: e.message });
  console.error("[clients]", e);
  return json(500, { error: "server_error", message: "Something went wrong." });
}

/** Sanitise an untrusted client submission into a Profile using only existing model fields. */
export function sanitizeClient(raw: Record<string, unknown>): Profile {
  const p = (raw.personal ?? {}) as Record<string, unknown>;
  const personal = emptyPersonal();
  for (const k of CLIENT_PERSONAL_FIELDS) personal[k] = str(p[k]);
  const eduRaw = Array.isArray(raw.education) ? raw.education.slice(0, 6) : [];
  const education = eduRaw.map((e) => {
    const r = (e ?? {}) as Record<string, unknown>;
    const out = emptyEducation();
    for (const k of EDU_FIELDS) out[k] = str(r[k]);
    return out;
  }).filter((e) => e.institution || e.qualification);
  return { personal, experience: [], education, skills: [], languages: [], certifications: [], children: [], travel: [] };
}

export async function handleClients(req: Request, path: string, svc: PaymentService = paymentService(), st: ClientStore = clientStore()) {
  try {
    // PUBLIC: intake page metadata (business name only — never other clients' data).
    if (req.method === "GET" && path.startsWith("intake/")) {
      const link = await st.getLink(path.slice(7));
      if (!link || link.revoked) return json(404, { error: "not_found", message: "This link is not valid." });
      return json(200, { businessName: link.businessName });
    }
    if (req.method !== "POST") return json(404, { error: "not_found" });
    const b = await body(req);
    if (path === "submit") {
      const link = await st.getLink(str(b.token, 100));
      if (!link || link.revoked) throw new PaymentError(404, "not_found", "This link is not valid.");
      // Owner must still hold an active commercial plan.
      await svc.commercialOwner(link.ownerEntitlementId).catch(() => {
        throw new PaymentError(404, "not_found", "This link is no longer active.");
      });
      if (b.consent !== true) throw new PaymentError(400, "consent_required", "Please tick the consent box.");
      const profile = sanitizeClient((b.profile ?? {}) as Record<string, unknown>);
      const name = [profile.personal.givenName, profile.personal.familyName].filter(Boolean).join(" ").trim();
      if (!profile.personal.givenName) throw new PaymentError(400, "name_required", "Name is required.");
      const now = Date.now();
      await st.putClient({ clientId: id("cli"), token: link.token, ownerEntitlementId: link.ownerEntitlementId, name, profile, consentAt: now, submittedAt: now });
      return json(201, { ok: true });
    }
    // OWNER endpoints — the commercial entitlement id proves ownership.
    const ent = await svc.commercialOwner(str(b.entitlementId, 200) || undefined);
    if (path === "link") {
      const existing = (await st.linksByOwner(ent.entitlementId)).find((l) => !l.revoked);
      const businessName = str(b.businessName, 80) || existing?.businessName || "CV Studio business";
      let link = existing;
      if (!link || b.rotate === true) {
        if (link) await st.putLink({ ...link, revoked: true });
        link = { token: id("c", 18), ownerEntitlementId: ent.entitlementId, ownerGuestId: str(b.guestId, 80), businessName, createdAt: Date.now() };
      } else link = { ...link, businessName };
      await st.putLink(link);
      return json(200, { token: link.token, path: `/c/${link.token}`, businessName: link.businessName });
    }
    if (path === "list") {
      const list = await st.clientsByOwner(ent.entitlementId);
      return json(200, { clients: list.sort((a, c) => c.submittedAt - a.submittedAt).map((c) => ({ clientId: c.clientId, name: c.name, submittedAt: c.submittedAt })) });
    }
    if (path === "get") {
      const c = await st.getClient(str(b.clientId, 100));
      if (!c || c.ownerEntitlementId !== ent.entitlementId) throw new PaymentError(404, "not_found", "Client not found.");
      return json(200, { clientId: c.clientId, name: c.name, submittedAt: c.submittedAt, profile: c.profile });
    }
    return json(404, { error: "not_found" });
  } catch (e) {
    return fail(e);
  }
}
