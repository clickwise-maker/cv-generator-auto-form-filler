/**
 * Global h3 middleware: per-IP (and per x-guest-id) token-bucket rate limiting
 * for /api/* plus long-lived Cache-Control on hashed static assets.
 * Pages, static files, health checks and payment webhooks are never limited.
 */
import { checkRateLimit } from "../../src/lib/protect/rate-limit";

interface Ev {
  url: URL;
  req: { method: string; headers: Headers };
}

export default async function rateLimitMiddleware(event: Ev, next: () => unknown | Promise<unknown>): Promise<unknown> {
  const path = event.url.pathname;
  const blocked = checkRateLimit(path, event.req.headers);
  if (blocked) return blocked;
  const res = await next();
  if (path.startsWith("/assets/") && res instanceof Response && res.ok) {
    try {
      res.headers.set("cache-control", "public, max-age=31536000, immutable");
    } catch {
      /* immutable headers: leave as-is */
    }
  }
  return res;
}
