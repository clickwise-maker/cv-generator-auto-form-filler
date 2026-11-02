# ads.txt (placeholder — no publisher id yet)

`/ads.txt` is served by `src/routes/ads[.]txt.ts` from the single value `VITE_ADSENSE_CLIENT`.
Until it is set to a real `ca-pub-<digits>` id, `/ads.txt` returns 404 and no ads, script or
`google-adsense-account` meta tag are emitted.

One-line change after AdSense approval (build-time env, e.g. Cloudflare build variables or `.env`):

    VITE_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX

Resulting ads.txt line: `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`.
Do not create `public/ads.txt` (it would shadow the route).
