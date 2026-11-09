/** 301 www.formzalo.com → https://formzalo.com (apex is canonical).
 * Prefer the client Host header over x-forwarded-host: on Cloudflare, x-forwarded-host
 * can be the primary custom domain (apex) even when the browser requested www, which
 * previously skipped this redirect and left www/apex duplicates.
 */
export default function wwwRedirect(event: { url: URL; req: { headers: Headers } }, next: () => unknown) {
  const strip = (h: string | null) => (h ?? "").toLowerCase().split(":")[0].trim();
  const host = strip(event.req.headers.get("host")) || strip(event.url.host);
  const fwd = strip(event.req.headers.get("x-forwarded-host"));
  const urlHost = strip(event.url.hostname);
  if (host === "www.formzalo.com" || fwd === "www.formzalo.com" || urlHost === "www.formzalo.com") {
    return new Response(null, {
      status: 301,
      headers: { location: `https://formzalo.com${event.url.pathname}${event.url.search}` },
    });
  }
  return next();
}
