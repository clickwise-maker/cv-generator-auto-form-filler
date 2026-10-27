import { WATCH_AD_UNLOCK } from "../../config/ads.ts";
import { busyResponse, clientIp, exportGuard } from "../protect/rate-limit.ts";
import { buildDocxBuffer } from "../cv/export-docx.ts";
import { buildPdf } from "../cv/export-pdf.ts";
import { fileBase } from "../cv/model.ts";
import { parseDoc } from "../payments/http.server.ts";
import { UnlockTokens } from "./unlock.server.ts";

/**
 * /api/ad-unlock/* — the opt-in rewarded-ad free download. Separate from
 * /api/paid-export: it only READS the shared CV parser and generators, and never
 * touches orders, entitlements or Razorpay. Returns 404 while the flag is off.
 */
type Opts = { enabled?: boolean; tokens?: UnlockTokens | null };

let tokensSingleton: UnlockTokens | null | undefined;
function envTokens(): UnlockTokens | null {
  if (tokensSingleton === undefined) {
    const secret = process.env.AD_UNLOCK_SECRET ?? "";
    tokensSingleton = secret.length >= 16 ? new UnlockTokens(secret, WATCH_AD_UNLOCK.ttlMs, WATCH_AD_UNLOCK.dailyCap) : null;
  }
  return tokensSingleton;
}

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });

function setup(opts: Opts) {
  const enabled = opts.enabled ?? WATCH_AD_UNLOCK.enabled;
  const tokens = opts.tokens === undefined ? envTokens() : opts.tokens;
  return enabled && tokens ? tokens : null;
}

const guestOf = (req: Request, body: Record<string, unknown>) => String(body.guestId ?? req.headers.get("x-guest-id") ?? "").trim().slice(0, 80);

async function body(req: Request): Promise<Record<string, unknown>> {
  const text = await req.text();
  if (text.length > 3_000_000) return {};
  try {
    const v = JSON.parse(text);
    return v && typeof v === "object" ? (v as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

export function handleUnlockStatus(_req: Request, opts: Opts = {}) {
  return setup(opts) ? json(200, { enabled: true }) : json(404, { error: "not_found" });
}

/** Called after the rewarded ad reports "granted". Issues one signed, one-time token. */
export async function handleUnlockGrant(req: Request, opts: Opts = {}) {
  const tokens = setup(opts);
  if (!tokens) return json(404, { error: "not_found" });
  const b = await body(req);
  const guest = guestOf(req, b);
  if (!guest) return json(400, { error: "guest_required" });
  const token = tokens.issue(guest, clientIp(req.headers));
  return token ? json(200, { token }) : json(429, { error: "daily_limit" });
}

/** Redeems a token for ONE clean PDF/DOCX. */
export async function handleUnlockDownload(req: Request, opts: Opts = {}) {
  const tokens = setup(opts);
  if (!tokens) return json(404, { error: "not_found" });
  const b = await body(req);
  const format = b.format === "docx" ? "docx" : b.format === "pdf" ? "pdf" : null;
  if (!format) return json(400, { error: "bad_format" });
  const result = tokens.redeem(String(b.token ?? ""), guestOf(req, b));
  if (!result.ok) return json(403, { error: `token_${result.reason}` });
  const doc = parseDoc(b);
  const name = fileBase(doc.profile, doc.settings);
  const out = await exportGuard.run(async () => (format === "pdf" ? buildPdf(doc.profile, doc.settings).output("arraybuffer") : await buildDocxBuffer(doc.profile, doc.settings)));
  if (out === null) return busyResponse();
  const type = format === "pdf" ? "application/pdf" : "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  return new Response(format === "pdf" ? (out as ArrayBuffer) : new Uint8Array(out as Uint8Array), {
    status: 200,
    headers: { "content-type": type, "cache-control": "no-store", "content-disposition": `attachment; filename="${name}.${format}"` },
  });
}
