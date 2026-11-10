import test from "node:test";
import assert from "node:assert/strict";
import { renderHub, fzHandle, fzPost } from "../server/fz/hub.mjs";
import DATA from "../server/fz/opportunities.json" with { type: "json" };

const cards = (h) => (h.match(/<article class="fz-card"/g) || []).length;

test("hub renders 59 cards, 33 disclosures, canonical + JSON-LD", () => {
  const h = renderHub(Date.parse("2026-11-10T12:00:00Z"));
  assert.equal(cards(h), 59);
  assert.equal((h.match(/class="fz-disc"/g) || []).length, 33);
  assert.match(h, /rel="canonical" href="https:\/\/formzalo\.com\/opportunities"/);
  assert.match(h, /application\/ld\+json/);
  assert.match(h, /rel="nofollow sponsored noopener noreferrer"/);
});

test("entries expire automatically after their deadline", () => {
  const dated = DATA.items.filter((x) => x.iso);
  assert.ok(dated.length > 0);
  const far = renderHub(Date.parse("2100-01-01T00:00:00Z"));
  assert.equal(cards(far), DATA.items.length - dated.length);
});

test("routes: /opportunities, sitemap, video range 206/416, fallthrough", async () => {
  const mk = (p, h = {}) => { const r = new Request("https://formzalo.com" + p, { headers: h }); return [r, new URL(r.url)]; };
  const [r1, u1] = mk("/opportunities");
  assert.equal((await fzHandle(r1, {}, u1)).status, 200);
  const [r2, u2] = mk("/sitemap-opportunities.xml");
  const s = await fzHandle(r2, {}, u2);
  assert.equal(s.status, 200);
  assert.match(await s.text(), /<loc>https:\/\/formzalo\.com\/opportunities<\/loc>/);
  const bytes = new Uint8Array(1000).map((_, i) => i % 251);
  const env = { ASSETS: { fetch: async () => new Response(bytes, { status: 200 }) } };
  const [r3, u3] = mk("/media/hero-video.mp4", { range: "bytes=10-19" });
  const v = await fzHandle(r3, env, u3);
  assert.equal(v.status, 206);
  assert.equal(v.headers.get("content-range"), "bytes 10-19/1000");
  assert.equal(new Uint8Array(await v.arrayBuffer()).length, 10);
  const [r4, u4] = mk("/media/hero-video.mp4", { range: "bytes=5000-" });
  assert.equal((await fzHandle(r4, env, u4)).status, 416);
  const [r5, u5] = mk("/about");
  assert.equal(await fzHandle(r5, env, u5), undefined);
});

test("post-hydration promo script is appended to HTML pages only", async () => {
  const html = "<!doctype html><html><body><div id=app>x</div></body></html>";
  const req = new Request("https://formzalo.com/");
  const out = await fzPost(req, new Response(html, { headers: { "content-type": "text/html" } }));
  const t = await out.text();
  assert.match(t, /fz-opps-js/);
  assert.ok(t.indexOf("fz-opps-js") < t.lastIndexOf("</body>"));
  const j = await fzPost(req, new Response("{}", { headers: { "content-type": "application/json" } }));
  assert.equal(await j.text(), "{}");
  const api = await fzPost(new Request("https://formzalo.com/api/x"), new Response(html, { headers: { "content-type": "text/html" } }));
  assert.doesNotMatch(await api.text(), /fz-opps-js/);
});
