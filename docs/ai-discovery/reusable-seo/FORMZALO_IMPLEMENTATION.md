# What was actually applied to FormZalo

## Branch and immutable history

Repository clickwise-maker/cv-generator-auto-form-filler; isolated feature/global-ai-discovery-20261107 from confirmed live5ccb8b4 on feature/free-cv-paid-filler-ads, not stale main. Same open PR5. PR3 AdSense and PR4 SEO remain separate; no merge/cherry-pick/deployment here.

| Prepared batch | Commit / actual artifacts |
| --- | --- |
| Phase2 directory | 711a8de97ca9ac2bc9c60bf17c569e4661a90e1f: platforms.json/schema/README and validators;23 requested platforms, honest unknown source coverage |
| Phase3 factual assets | ab87891808a4baa772a8ee06e92517ae7f78c047: product manifest/schema, purpose-aware crawler policy, deterministic public assets |
| First5 public locales | ecb03909256634263b9f3189bc27f88d9ab35f9b: en/hi/pl/ar/es, six intents each, request-scoped architecture, initial42-route sitemap |
| Remaining7 public locales | 166661b9cdb105c65c77b045a027f5dfb2b62e34: zh-cn/ru/de/fr/pt/ja/id;72 localized pages +12 English legacy routes =84 sitemap URLs;127 targeted tests at that batch |
| Current Phase6/review package | Same PR5 later commit: factual graph/breadcrumb/social corrections, no FAQ rich-result markup, disabled IndexNow drafts, reusable research/package/test/release docs. See git log for this file/PR head; do not mistake it for a live release. |

## Exact implementation steps / source map

1. `docs/ai-discovery/product-manifest.json` is the factual product source. Signed-in Color/Plain PDFs are free and watermark-free, three templates, no proven numeric daily quota. No verified active generative writing, arbitrary autoapply/PDF-writeback or free Word button. English OCR has12MiB/two scanned-page fallback. Dated unavailable/trial checkout is not an active paid upsell.
2. `src/content/public-locales/registry.json` defines12 public URL IDs, language tags, directions, existing editor-locale mapping and six page intents. Every locale catalog supplies title/description/H1/intro/sections/navigation/FAQ. Native review remains pending.
3. `src/routes/$locale.tsx`, `$locale.index.tsx`, `$locale.$page.tsx` feed route-loader locale into `PublicLocaleProvider` in `src/components/content/public-localized.tsx`. `src/lib/public-locales.ts` binds catalogs. No per-request global Zustand writes. The same route data supplies SSR and hydration; actual browser parity is still a gate, not proved by source alone.
4. Root `src/routes/__root.tsx` selects the same copy for metadata and HTML lang/dir; Arabic is RTL initially. Chinese URL/catalog `zh-cn` maps to BCP47 `zh-CN` in HTML, alternate links and schema. The language selector navigates equivalent real URLs rather than changing only localStorage.
5. `src/lib/public-locale-routing.mjs` and `server/middleware/public-locale-canonical.ts` normalize supported directory casing/slashes and legacy aliases, retain legitimate non-language queries, and preserve root editor/OAuth/#signin entry. `src/router.tsx` trailingSlash preserve avoids the redirect loop found in the first local run. No crawler IP redirects.
6. Self-canonical, reciprocal12 hreflang alternatives and English x-default derive from the registry. `scripts/generate-ai-assets.mjs` emits the84-URL sitemap and factual llms.txt/llms-full.txt/AI-DISCOVERY.md/ai-product.json/robots.txt. No invented lastmod or absent routes; separate language sitemaps are not required.
7. `src/lib/seo-graph.mjs` models Organization/WebSite/WebPage, appropriate free-CV SoftwareApplication on home pages only and visible BreadcrumbList on descendants. It omits Product/paid offers/ratings/unverified company/contact hours. `legacy-public-seo.ts`, breadcrumbs components and bounded old metadata corrections align the12 original English public content routes. Privacy-policy body/legal commitments are not silently rewritten; contradictory no-login/controller/data-flow text remains a launch blocker.
8. Visible localized FAQ remains. Phase6 removes FAQPage rich-result markup: Google's official2026 changelog says the feature retired7 May2026 (older guidance limited it to government/health). No Rich Results Test service pass is claimed. OG/Twitter title/description/canonical URLs are checked against raw HTML and graph fields.
9. `crawler-policy.json` remains training allow by default; verified search/training/control tokens are separated. All named groups repeat private exclusions. Optional AI-readable files do not guarantee ingestion, citation or ranking. Google-Extended is not a separate HTTP user agent.
10. `scripts/prepare-indexnow.mjs` and `indexnow.config.example.json` prepare offline dry-run payloads only. No actual key file, submission mode, autoPOST or live enablement. `submissions.json` records actual account observations separately.
11. Tests/build/source-to-URL references: `public-locales.test.mjs`, `seo-phase6.test.mjs`, `research-package.test.mjs`, `verify-public-ssr.mjs`, `generate-seo-reference.mjs`; safe Node/Cloudflare builds and existing ads/export/auth suites. Never generic npm build (migration chain). Browser/mobile/a11y/performance/authenticated PDF/Unicode remain gates.

## Keywords: what “applied” does and does not mean

The current pages use natural, factual localized product descriptions. The105 research phrases are **not automatically inserted**, all are not implemented as landing pages, and observed publisher wording is not demand evidence. Exact current titles/descriptions/H1 and canonical URLs are in IMPLEMENTED_PAGE_MAP.json. Regenerate/check with `node scripts/generate-seo-reference.mjs [--check]`.

| Intent cluster | Current useful surface / decision |
| --- | --- |
| Free resume builder / online CV maker | Locale home and templates; signed-in clean PDFs, not no-signup/unlimited claims |
| AI resume generator | Research hypothesis only; no verified active model, no new promotional AI-writing page |
| Free online form filler / automatic form filling | Help/services explain bounded reviewed field mapping; not arbitrary browser autofill |
| Job application assistance | Existing guide(s), help and product limits; not automatic application submission |
| PDF form filling | Reading/extraction limits documented; arbitrary writeback unverified, no supporting product claim/page |
| AI form assistant | Candidate intent only; no verified generative integration or fabricated landing page |

Website12 translations are not editor12 parity. Existing UI remains8 IDs/7 languages; five public languages explicitly open English editor. PDF headings/output and English OCR are distinct. Japanese generic CV templates do not establish prescribed 履歴書/職務経歴書 compliance; pt-PT demand cannot be inferred from Brazilian publisher text.

## Live/account distinction

Only formzalo.com and its www alias are known. Google accepted the existing live102-URL sitemap at23:09 IST on7 November2026; that is not an indexed count or submission of the unpublished84-URL source sitemap. Bing's www property was Not verified at23:21 IST, no apex shown, sitemap inaccessible; do not repeat login/import/consent/Verify. No site/account/listing/product/Rako task is inferred. PR5 remains unmerged/not deployed.
