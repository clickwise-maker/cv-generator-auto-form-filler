/**
 * Opportunities Hub + range-capable hero video + post-hydration promo.
 * Auto-registered as global h3 middleware (vite.config.ts serverDir: "./server").
 *
 * - GET /opportunities, /sitemap-opportunities.xml, /media/hero-video.mp4 are answered here
 *   (see server/fz/hub.mjs); everything else falls through to the app.
 * - HTML documents get a <style>+<script> appended to <body>. The script only runs AFTER
 *   hydration and adds nodes outside React-managed trees, so no hydration mismatch (#418).
 * - Does not touch ads flags, ads.txt, auth, DNS or security headers.
 */
import { fzHandle, fzPost } from "../fz/hub.mjs";

interface Ev {
  url: URL;
  req: { method: string; headers: Headers; url?: string; runtime?: { cloudflare?: { env?: unknown } } };
  runtime?: { cloudflare?: { env?: unknown } };
}

export default async function fzHubMiddleware(event: Ev, next: () => unknown | Promise<unknown>): Promise<unknown> {
  const method = (event.req.method ?? "GET").toUpperCase();
  if (method !== "GET" && method !== "HEAD") return next();
  const env = event.req.runtime?.cloudflare?.env ?? event.runtime?.cloudflare?.env;
  const request = new Request(event.url.href, { method, headers: event.req.headers });
  const own = await fzHandle(request, env, event.url);
  if (own) return own;
  const res = await next();
  if (method === "GET" && res instanceof Response) return fzPost(request, res);
  return res;
}
