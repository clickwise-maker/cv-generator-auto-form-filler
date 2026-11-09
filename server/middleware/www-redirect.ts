/**
 * 301 canonicalisation for the production host. Apex https://formzalo.com is canonical:
 * - http → https (Cloudflare "Always Use HTTPS" may be off)
 * - www → apex
 * - legacy /plans and /pricing → /services (the pages they were replaced by)
 * - trailing slash → no trailing slash (matches every canonical and internal link)
 * Only runs for formzalo.com hosts, so localhost previews are untouched.
 */
const CANONICAL_HOST = "formzalo.com";
const LEGACY_PATHS: Record<string, string> = { "/plans": "/services", "/pricing": "/services" };

export default function seoRedirects(event: { url: URL; req: { headers: Headers } }, next: () => unknown) {
  const headers = event.req.headers;
  const host = (headers.get("x-forwarded-host") ?? headers.get("host") ?? event.url.host)
    .toLowerCase()
    .split(",")[0]
    .trim();
  if (host !== CANONICAL_HOST && host !== `www.${CANONICAL_HOST}`) return next();

  const { pathname, search } = event.url;
  const proto = (headers.get("x-forwarded-proto") ?? event.url.protocol.replace(":", ""))
    .split(",")[0]
    .trim()
    .toLowerCase();
  const withoutSlash = pathname.replace(/\/+$/, "") || "/";
  const isFile = /\.[a-z0-9]+$/i.test(pathname);
  const normalised =
    pathname.length > 1 && pathname.endsWith("/") && !isFile && !pathname.startsWith("/api/")
      ? withoutSlash
      : pathname;
  const target = LEGACY_PATHS[normalised] ?? normalised;

  const needsRedirect = proto === "http" || host === `www.${CANONICAL_HOST}` || target !== pathname;
  if (!needsRedirect) return next();
  // One hop only: protocol, host, legacy path and trailing slash collapse into a single 301.
  return new Response(null, {
    status: 301,
    headers: { location: `https://${CANONICAL_HOST}${target}${search}` },
  });
}
