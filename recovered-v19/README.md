# Recovery of live Worker `formzolo` v19 (c8278f39-abc4-41b9-ab94-94adb68dbe37)

Recovered 2026-11-10 (IST) from the live Cloudflare Worker via the official API (read-only GET) plus public HTTP of formzalo.com.
v19 was deployed with wrangler on 2026-11-09 21:01 UTC (02:31 IST Nov 10) from a working tree that was never pushed to GitHub.
This branch is based on `audit/fixes-2026-11-09` (75b85a7, "Kai (audit)") because live ads.txt text is byte-identical to that branch's and live is a descendant-by-content of it. It is **not** the original source.

## Contents
| Path | What | Exactness |
|---|---|---|
| `server-modules/` + `v19-manifest.json` | All 69 server modules of v19 (Nitro `cloudflare_module` output, un-minified) with SHA-256 per module | exact bytes |
| `client-assets/` | 51 files of `/assets/*` served live (minified client bundles + css) | exact bytes as served |
| `client-root/` | live `robots.txt`, `sitemap.xml` (148 URLs), `llms.txt`, `ads.txt`, `og.jpg`, `favicon.svg` | exact bytes as served |
| `../public/_headers` | v19 `_headers` ("FIX 2026-11-10 Phase 6") taken from the version's `raw_headers` | exact |
| `compiled-sources/` | Compiled-but-readable JS slices cut out of the server bundle: SEO landing data + `seoPageHead`, route definitions/heads (`/contact`, `/cv-maker`, 11 `/xx/cv-maker`, `/report`, ...), `/contact` page, shared `LandingPage`, `/report` page, complaints client, `/api/complaints/*` handler + store, consent helper | readable, not TSX |
| `overlay-v20/` | The overlay published as v20 on top of v19 (Bing file, msvalidate meta, AdSense loader + meta, www 301): publish script, validation harness, diffs | exact |

## What is recoverable
- `/contact`, `/cv-maker` and `/{ar,de,es,fr,hi,it,ja,pl,pt,ru,zh-cn}/cv-maker`: fully (see `compiled-sources/seo-pages.compiled.js`, `landing-page.compiled.js`, `contact.compiled.js`, `route-definitions-and-heads.compiled.js`). Header comment of seo-pages says "12 languages (2026-11-10 expansion)". Contact email is `partners@formzalo.com` (also `SUPPORT_EMAIL` in the consent helper); Kai's branch uses team@ / other addresses.
- `/report` page and `/api/complaints/*`: fully recoverable as compiled code. Submit is public (`submit`), `list`/`resolve` require the paid-plan owner (`entitlementId`). Types: not-working, payment, other; 180-day retention purge.
  **Warning:** the complaint store is `FileComplaintStore` writing a JSON snapshot to `COMPLAINTS_STORE_FILE || os.tmpdir()/formzalo-complaints.json` and an in-memory Map. On Cloudflare Workers that is not durable (isolate memory / virtual tmp), so submitted reports can be lost. Needs a real store (D1/KV/Postgres) before relying on it.
- `_headers` MIME rules, `ads.txt`, 148-URL sitemap, robots, llms.txt: exact files.

## What is NOT recovered / known gaps
- Original TSX/TS source, comments outside the bundle, tests, `routeTree.gen.ts`, package.json/lockfile changes. Bundle is compiled; JSX is `jsx()` calls.
- The live `dashboard` chunk (63 KB SSR / 39 KB client) and shared i18n/site-footer chunks are larger than in the base branch; their differences were not diffed or ported (they include the CV generator, filler, paid-export wiring, site footer links to /report and /about "About & Contact").
- The server bundle has NO www redirect and NO `/reset-password` route (live 404). Nitro middleware list in v19: grok-pwa, rate-limit only.
- Port to source was NOT attempted for the dashboard / footer / i18n; do not deploy this branch as-is. It adds only artifacts + `public/_headers`.

## Next steps
1. Port `compiled-sources/*` into TSX in this branch (contact, landing-page, seo-pages, report, complaints) and add `routes/{contact,cv-maker,report}.tsx` + `$lang.cv-maker` routes.
2. Diff `server-modules/_ssr/{dashboard,site-footer,site-header,routes}-*.mjs` against a build of the base branch and port the deltas.
3. Rebase PR #7 (`feature/global-ai-discovery-rebased-20261110`) on the result.
