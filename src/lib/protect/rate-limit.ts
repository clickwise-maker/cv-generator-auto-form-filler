/**
 * In-memory crash protection (single Render instance, no Redis):
 * token-bucket rate limiting per client IP (+ optional x-guest-id header) and
 * a small concurrency guard for CPU-heavy export generation.
 */
export interface BucketRule {
  name: string;
  capacity: number; // burst size == requests per window
  windowMs: number;
}

export const GENERAL: BucketRule = { name: "general", capacity: 120, windowMs: 60_000 };
export const SENSITIVE: BucketRule = { name: "sensitive", capacity: 25, windowMs: 60_000 };

const SENSITIVE_PATHS = [
  "/api/paid-export/download",
  "/api/paid-export/order",
  "/api/paid-export/verify",
  "/api/paid-export/formfill/",
  "/api/paid-export/simulate",
  "/api/clients/submit",
  "/api/clients/link",
  "/api/auth/",
];

/** Which rule applies to a path; null = not limited (static, health, webhooks, pages). */
export function ruleFor(pathname: string): BucketRule | null {
  if (!pathname.startsWith("/api/")) return null;
  if (pathname === "/api/health" || pathname.startsWith("/api/paid-export/webhook/")) return null;
  if (SENSITIVE_PATHS.some((p) => (p.endsWith("/") ? pathname.startsWith(p) : pathname === p))) return SENSITIVE;
  return GENERAL;
}

/** Client IP behind Render's proxy: left-most X-Forwarded-For entry (trust proxy). */
export function clientIp(headers: Headers, fallback = "unknown"): string {
  const xff = headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first.slice(0, 64);
  }
  return (headers.get("x-real-ip") ?? headers.get("cf-connecting-ip") ?? fallback).slice(0, 64);
}

interface Bucket {
  tokens: number;
  last: number;
}

export class TokenBucketLimiter {
  private buckets = new Map<string, Bucket>();
  private maxKeys: number;
  constructor(maxKeys = 50_000) {
    this.maxKeys = maxKeys;
  }
  /** Returns 0 if allowed, else seconds to wait. */
  take(key: string, rule: BucketRule, now = Date.now()): number {
    const k = `${rule.name}:${key}`;
    const rate = rule.capacity / rule.windowMs; // tokens per ms
    let b = this.buckets.get(k);
    if (!b) {
      if (this.buckets.size >= this.maxKeys) this.sweep(now, true);
      b = { tokens: rule.capacity, last: now };
      this.buckets.set(k, b);
    } else {
      b.tokens = Math.min(rule.capacity, b.tokens + (now - b.last) * rate);
      b.last = now;
    }
    if (b.tokens >= 1) {
      b.tokens -= 1;
      return 0;
    }
    return Math.max(1, Math.ceil((1 - b.tokens) / rate / 1000));
  }
  sweep(now = Date.now(), force = false) {
    for (const [k, b] of this.buckets) if (now - b.last > 120_000) this.buckets.delete(k);
    if (force && this.buckets.size >= this.maxKeys) this.buckets.clear();
  }
  get size() {
    return this.buckets.size;
  }
}

export const limiter = new TokenBucketLimiter();
const sweepTimer = setInterval(() => limiter.sweep(), 60_000);
(sweepTimer as { unref?: () => void }).unref?.();

export function rateLimitedResponse(retryAfter: number): Response {
  return new Response(JSON.stringify({ error: "rate_limited", retryAfter }), {
    status: 429,
    headers: { "content-type": "application/json", "retry-after": String(retryAfter), "cache-control": "no-store" },
  });
}

/** Check a request; returns a 429 Response or null when allowed. */
export function checkRateLimit(pathname: string, headers: Headers, now = Date.now(), lim = limiter): Response | null {
  const rule = ruleFor(pathname);
  if (!rule) return null;
  const wait = lim.take(`ip:${clientIp(headers)}`, rule, now);
  if (wait) return rateLimitedResponse(wait);
  const guest = headers.get("x-guest-id")?.trim().slice(0, 80);
  if (guest) {
    const g = lim.take(`guest:${guest}`, rule, now);
    if (g) return rateLimitedResponse(g);
  }
  return null;
}

/** Concurrency guard: at most `max` running, up to `queueMax` waiting `waitMs`. */
export class Semaphore {
  private active = 0;
  private waiters: Array<() => void> = [];
  private max: number;
  private queueMax: number;
  private waitMs: number;
  constructor(max: number, queueMax = 10, waitMs = 8_000) {
    this.max = max;
    this.queueMax = queueMax;
    this.waitMs = waitMs;
  }
  async run<T>(fn: () => Promise<T> | T): Promise<T | null> {
    if (this.active >= this.max) {
      if (this.waiters.length >= this.queueMax) return null;
      const ok = await new Promise<boolean>((resolve) => {
        const w = () => {
          clearTimeout(t);
          resolve(true);
        };
        const t = setTimeout(() => {
          this.waiters = this.waiters.filter((x) => x !== w);
          resolve(false);
        }, this.waitMs);
        this.waiters.push(w);
      });
      if (!ok) return null;
    } else this.active++;
    try {
      return await fn();
    } finally {
      const next = this.waiters.shift();
      if (next) next(); // hand slot over directly
      else this.active--;
    }
  }
  get running() {
    return this.active;
  }
}

export const exportGuard = new Semaphore(3);

export function busyResponse(): Response {
  return new Response(JSON.stringify({ error: "busy", retryAfter: 5 }), {
    status: 503,
    headers: { "content-type": "application/json", "retry-after": "5", "cache-control": "no-store" },
  });
}
