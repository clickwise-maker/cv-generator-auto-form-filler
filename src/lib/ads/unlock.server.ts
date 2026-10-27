import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

/**
 * Signed one-time unlock tokens for the opt-in "watch an ad, download free" flow.
 * Isolated from the payment code: it never creates orders or entitlements.
 * Token = base64url(payload).base64url(HMAC-SHA256(payload)). Each nonce is
 * accepted once (in-memory), and issuance is capped per guest and per IP per day.
 */
export type UnlockPayload = { g: string; n: string; exp: number };

const b64 = (b: Buffer) => b.toString("base64url");

export class UnlockTokens {
  private used = new Map<string, number>();
  private issued = new Map<string, number>();
  private secret: string;
  private ttlMs: number;
  private dailyCap: number;
  constructor(secret: string, ttlMs: number, dailyCap: number) {
    this.secret = secret;
    this.ttlMs = ttlMs;
    this.dailyCap = dailyCap;
    if (!secret || secret.length < 16) throw new Error("AD_UNLOCK_SECRET missing or too short");
  }
  private sign(data: string) {
    return createHmac("sha256", this.secret).update(data).digest();
  }
  private day(now: number) {
    return new Date(now).toISOString().slice(0, 10);
  }
  private sweep(now: number) {
    for (const [n, exp] of this.used) if (exp < now) this.used.delete(n);
    const today = this.day(now);
    for (const k of this.issued.keys()) if (!k.startsWith(today)) this.issued.delete(k);
  }
  /** Returns a token, or null when the daily cap for this guest or IP is reached. */
  issue(guest: string, ip: string, now = Date.now()): string | null {
    this.sweep(now);
    const keys = [`${this.day(now)}|g|${guest}`, `${this.day(now)}|ip|${ip}`];
    if (keys.some((k) => (this.issued.get(k) ?? 0) >= this.dailyCap)) return null;
    keys.forEach((k) => this.issued.set(k, (this.issued.get(k) ?? 0) + 1));
    const payload: UnlockPayload = { g: guest, n: b64(randomBytes(16)), exp: now + this.ttlMs };
    const body = b64(Buffer.from(JSON.stringify(payload)));
    return `${body}.${b64(this.sign(body))}`;
  }
  /** Verifies and consumes a token. Returns the reason on failure. */
  redeem(token: string, guest: string, now = Date.now()): { ok: true } | { ok: false; reason: "malformed" | "signature" | "expired" | "guest" | "used" } {
    const [body, sig] = String(token ?? "").split(".");
    if (!body || !sig) return { ok: false, reason: "malformed" };
    const want = this.sign(body);
    const got = Buffer.from(sig, "base64url");
    if (got.length !== want.length || !timingSafeEqual(got, want)) return { ok: false, reason: "signature" };
    let p: UnlockPayload;
    try {
      p = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    } catch {
      return { ok: false, reason: "malformed" };
    }
    if (typeof p.exp !== "number" || p.exp < now) return { ok: false, reason: "expired" };
    if (p.g !== guest) return { ok: false, reason: "guest" };
    if (this.used.has(p.n)) return { ok: false, reason: "used" };
    this.used.set(p.n, p.exp);
    return { ok: true };
  }
}
