import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ADS, ADSENSE_PUB_ID, AFFILIATES, WATCH_AD_UNLOCK, adAllowed, adsenseScriptSrc } from "../../config/ads.ts";
import { UnlockTokens } from "./unlock.server.ts";
import { handleUnlockDownload, handleUnlockGrant, handleUnlockStatus } from "./unlock-http.server.ts";

const SRC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const read = (p: string) => fs.readFileSync(path.join(SRC, p), "utf8");
const SECRET = "test-secret-0123456789abcdef";

test("ads are off by default with placeholder ids", () => {
  assert.equal(ADS.enabled, false);
  assert.equal(ADSENSE_PUB_ID, "ca-pub-XXXXXXXXXXXXXXXX");
  assert.equal(WATCH_AD_UNLOCK.enabled, false);
  assert.match(adsenseScriptSrc(), /adsbygoogle\.js\?client=ca-pub-X+$/);
  assert.match(fs.readFileSync(path.join(SRC, "../public/ads.txt"), "utf8"), /^google\.com, pub-X{16}, DIRECT, f08c47fec0942fa0$/m);
});

test("AdSense head script is conditional on ADS.enabled", () => {
  const root = read("routes/__root.tsx");
  assert.match(root, /ADS\.enabled \? \[\{ src: adsenseScriptSrc\(\)/);
});

test("ad placement allow-list: only landing, guides, gallery, dashboard, below preview", () => {
  assert.ok(adAllowed("/", "landing"));
  assert.ok(adAllowed("/", "belowPreview"));
  assert.ok(adAllowed("/guides", "guides"));
  assert.ok(adAllowed("/guides/cv-for-freshers", "guides"));
  assert.ok(adAllowed("/templates", "gallery"));
  assert.ok(adAllowed("/dashboard", "dashboard"));
  for (const p of ["/services", "/refund-policy", "/privacy", "/privacy-policy", "/terms", "/next-steps", "/c/abc", "/api/paid-export/download", "/login", "/404"]) {
    for (const k of Object.keys(ADS.slots) as (keyof typeof ADS.slots)[]) assert.equal(adAllowed(p, k), false, `${p} ${k}`);
  }
  assert.equal(adAllowed("/guides", "dashboard"), false);
});

test("no ad slot in editor, form filler, paywall, pricing or checkout components", () => {
  const banned = ["components/studio/form-filler.tsx", "components/studio/profile-form.tsx", "components/studio/paywall.tsx", "components/studio/scan-card.tsx", "components/studio/signature-pad.tsx", "components/studio/custom-details.tsx", "components/studio/studio.tsx", "routes/services.tsx", "routes/refund-policy.tsx", "routes/c.$token.tsx", "routes/next-steps.tsx"];
  for (const f of banned) assert.doesNotMatch(read(f), /AdSlot/, f);
  // Below-preview unit sits after the watermark note, not next to the download buttons.
  const prev = read("components/studio/preview-doc.tsx");
  assert.ok(prev.indexOf('<AdSlot placement="belowPreview"') > prev.indexOf('id="preview-watermark-note"'));
});

test("ad slots are labelled Advertisement and never auto-refresh", () => {
  const slot = read("components/ads/ad-slot.tsx");
  assert.match(slot, /tr\("Advertisement"\)/);
  assert.doesNotMatch(slot, /setInterval|setTimeout/);
  assert.match(slot, /mode === "filler"\) return null/);
});

test("affiliate blocks use rel=sponsored noopener and placeholder URLs from config", () => {
  assert.match(read("components/ads/affiliate-blocks.tsx"), /rel="sponsored noopener"/);
  assert.ok(AFFILIATES.length >= 3);
  for (const a of AFFILIATES) assert.match(a.url, /^https:\/\/example\.com\//);
});

test("payment code has only the isolated watch-ad hook", () => {
  for (const f of fs.readdirSync(path.join(SRC, "lib/payments"))) assert.doesNotMatch(read(`lib/payments/${f}`), /ad-unlock|WatchAd|UnlockTokens/, f);
  const pay = read("components/studio/paywall.tsx");
  assert.equal(pay.match(/WatchAdOption/g)?.length, 2); // import + one render
});

test("unlock tokens: one-time, signed, guest-bound, expiring, capped per day", () => {
  const t = new UnlockTokens(SECRET, 60_000, 1);
  const now = Date.UTC(2026, 9, 27, 6);
  const tok = t.issue("guest_a", "1.1.1.1", now)!;
  assert.ok(tok);
  assert.equal(t.issue("guest_a", "2.2.2.2", now), null, "guest cap");
  assert.equal(t.issue("guest_b", "1.1.1.1", now), null, "ip cap");
  assert.deepEqual(t.redeem(tok, "guest_b", now), { ok: false, reason: "guest" });
  assert.deepEqual(t.redeem(tok.replace(/.$/, (c) => (c === "A" ? "B" : "A")), "guest_a", now), { ok: false, reason: "signature" });
  assert.deepEqual(t.redeem(tok, "guest_a", now + 120_000), { ok: false, reason: "expired" });
  assert.deepEqual(t.redeem(tok, "guest_a", now), { ok: true });
  assert.deepEqual(t.redeem(tok, "guest_a", now), { ok: false, reason: "used" });
  assert.ok(t.issue("guest_a", "1.1.1.1", now + 86_400_000), "new day");
  assert.throws(() => new UnlockTokens("short", 1, 1));
});

test("unlock API is 404 while the flag is off (or no secret)", async () => {
  const req = () => new Request("http://x/api/ad-unlock/grant", { method: "POST", body: "{}" });
  assert.equal((await handleUnlockStatus(req())).status, 404);
  assert.equal((await handleUnlockGrant(req())).status, 404);
  assert.equal((await handleUnlockDownload(req())).status, 404);
  assert.equal((await handleUnlockGrant(req(), { enabled: true, tokens: null })).status, 404);
});

test("unlock API (flag on): grant then one clean PDF, replay refused", async () => {
  const opts = { enabled: true, tokens: new UnlockTokens(SECRET, 60_000, 1) };
  const g = await handleUnlockGrant(new Request("http://x/g", { method: "POST", headers: { "x-forwarded-for": "9.9.9.9" }, body: JSON.stringify({ guestId: "guest_z" }) }), opts);
  assert.equal(g.status, 200);
  const { token } = (await g.json()) as { token: string };
  const body = JSON.stringify({ format: "pdf", token, guestId: "guest_z", profile: { personal: { givenName: "Asha", familyName: "Rao" } }, settings: {} });
  const d = await handleUnlockDownload(new Request("http://x/d", { method: "POST", body }), opts);
  assert.equal(d.status, 200);
  assert.equal(d.headers.get("content-type"), "application/pdf");
  assert.equal(Buffer.from(await d.arrayBuffer()).subarray(0, 4).toString(), "%PDF");
  const again = await handleUnlockDownload(new Request("http://x/d", { method: "POST", body }), opts);
  assert.equal(again.status, 403);
  const cap = await handleUnlockGrant(new Request("http://x/g", { method: "POST", headers: { "x-forwarded-for": "9.9.9.9" }, body: JSON.stringify({ guestId: "guest_z" }) }), opts);
  assert.equal(cap.status, 429);
});
