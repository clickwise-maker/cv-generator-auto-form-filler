import { test } from "node:test";
import assert from "node:assert/strict";
import { TokenBucketLimiter, checkRateLimit, ruleFor, clientIp, Semaphore } from "./rate-limit.ts";

test("rules", () => {
  assert.equal(ruleFor("/assets/x.js"), null);
  assert.equal(ruleFor("/"), null);
  assert.equal(ruleFor("/api/health"), null);
  assert.equal(ruleFor("/api/paid-export/webhook/razorpay"), null);
  assert.equal(ruleFor("/api/paid-export/download")?.name, "sensitive");
  assert.equal(ruleFor("/api/paid-export/formfill/start")?.name, "sensitive");
  assert.equal(ruleFor("/api/clients/submit")?.name, "sensitive");
  assert.equal(ruleFor("/api/paid-export/status")?.name, "general");
});

test("ip from proxy", () => {
  assert.equal(clientIp(new Headers({ "x-forwarded-for": "1.2.3.4, 10.0.0.1" })), "1.2.3.4");
});

test("burst gets 429 with Retry-After, refills", async () => {
  const lim = new TokenBucketLimiter();
  const h = new Headers({ "x-forwarded-for": "9.9.9.9" });
  const t = 1_000_000;
  for (let i = 0; i < 25; i++) assert.equal(checkRateLimit("/api/paid-export/download", h, t, lim), null);
  const r = checkRateLimit("/api/paid-export/download", h, t, lim)!;
  assert.equal(r.status, 429);
  assert.ok(Number(r.headers.get("retry-after")) >= 1);
  assert.deepEqual((await r.json()).error, "rate_limited");
  assert.equal(checkRateLimit("/api/paid-export/download", new Headers({ "x-forwarded-for": "8.8.8.8" }), t, lim), null);
  assert.equal(checkRateLimit("/api/paid-export/download", h, t + 3000, lim), null);
});

test("semaphore caps concurrency", async () => {
  const s = new Semaphore(2, 1, 50);
  let peak = 0, cur = 0;
  const job = () => s.run(async () => { cur++; peak = Math.max(peak, cur); await new Promise((r) => setTimeout(r, 20)); cur--; return 1; });
  const res = await Promise.all([job(), job(), job(), job()]);
  assert.equal(peak, 2);
  assert.deepEqual(res.filter((x) => x === null).length, 1);
});
