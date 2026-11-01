/** 301 www.formzalo.com → https://formzalo.com (apex is canonical). */
export default function wwwRedirect(event: { url: URL; req: { headers: Headers } }, next: () => unknown) {
  const host = (event.req.headers.get("x-forwarded-host") ?? event.req.headers.get("host") ?? event.url.host).toLowerCase();
  if (host === "www.formzalo.com") {
    return new Response(null, { status: 301, headers: { location: `https://formzalo.com${event.url.pathname}${event.url.search}` } });
  }
  return next();
}
