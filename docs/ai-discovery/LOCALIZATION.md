# Phase 4 — first-five public locale foundation (review branch, not live)

## Scope and factual content

Active public content: **en, hi, pl, ar, es**. Six meaningful existing-product intents per locale: home, templates, plans/availability (`services`), FAQ, about, help. These are not keyword-volume-driven doorway pages. Catalogs are editorial drafts checked for structure and factual parity; **independent native-speaker review has not occurred**. Policy links explicitly identify existing English destinations. No country availability, keyword volumes, unlimited quota, AI writing, free Word, no-signup or arbitrary auto-application claims are introduced.

The existing brand is formzolo on formzalo.com; FormZalo remains a project alias, not an application rename. Editor sign-in, auth/payment/ad controls and export code remain unchanged. Template links preserve the original `template` query workflow. Free Color/Plain PDFs have no watermark. Checkout observations are explicitly dated 7 November 2026, not live assertions. Existing legacy editor metadata/noscript contradictions remain separate follow-up scope.

Public page locale is **not** editor/Unicode PDF/OCR support. Existing editor UI: eight IDs / seven base languages. Polish public pages explicitly open the English editor. OCR initializes English only, with 12 MiB input and two scanned-PDF fallback pages. PDF language/character validation remains incomplete.

## Routing / isolation

- One registry: `src/content/public-locales/registry.json`. Only active locales generate routes/discovery URLs. Later seven: zh-cn, ru, de, fr, pt, ja, id. Unsupported locale directories return 404 in this batch; no indexable placeholders.
- Route loader → React context → catalog: request-local content, not Zustand locale writes. Directory URL owns initial SSR body, heading, document lang/dir and metadata. The same loader/catalog is used on hydration; browser hydration itself is not certified by HTTP tests.
- Canonical examples: `/en/`, `/hi/templates/`, `/ar/faq/`. Every public counterpart is self-canonical; reciprocal generic-language hreflang and x-default target the equivalent English page. Language is not a country-targeting assertion.
- Nitro GET/HEAD middleware normalizes casing/trailing slash and removes conflicting `lang` on implemented directories. Other query data is retained. Router `trailingSlash: preserve` prevents an observed automatic slash-removal redirect loop; public middleware owns directory canonicalization while legacy app paths remain usable.
- Legacy `/templates`, `/services`, `/faq`, `/about` redirect to actual active counterparts, mapping recognized locale variants (e.g. `es-ES` → `es`). Later/unknown legacy locale queries stay on their existing pages, never a nonexistent directory.
- **Legacy `/` / `/?lang=...` are not server-redirected**: OAuth/app state and `#signin` fragments must remain functional. Head canonical points to the implemented public equivalent when available. Original editor/authentication code is untouched. The new public locale pages are independent of the old root app's client-only language behavior.
- Arabic SSR has `lang=ar`, `dir=rtl`; logical start/end spacing and wrapping layouts are used. Desktop/mobile visual rendering and font/contrast/focus behavior remain untested in this batch.
- Localized WebPage schema describes translated public content, not invented Polish editor support. Visible localized FAQ and FAQPage answers share the same catalog. No rich-result eligibility promise.

## Discovery assets / sitemap

`generate-ai-assets.mjs` now generates six assets, including `sitemap.xml`: **30 translated canonical pages + 12 existing English content pages = 42**. No absent seven locales, query-locale duplicates or invented lastmod dates. Validators enforce route parity, XML correctness, unique URLs and reciprocal alternates. Separate per-language sitemaps are not necessary. Search/training robots policy and sensitive-path exclusions are unchanged; generated assets remain optional conventions, not guaranteed indexing/citation signals.

The live 102-URL sitemap remains distinct. Parent reports GSC verified ownership and a successful authorized submission of that existing live sitemap on 7 November 2026 at **23:09 IST**, 102 discovered pages / zero videos. That is discovery, not confirmed indexing; this executor did not submit anything or change DNS. Bing/IndexNow submissions zero as of that report. Prepared 42-URL sitemap is not submitted/deployed.

## Reproducible safe checks

```sh
node scripts/generate-ai-assets.mjs --check
node scripts/validate-ai-assets.mjs
node --test scripts/ai-discovery.test.mjs scripts/ai-assets.test.mjs scripts/public-locales.test.mjs
npm run typecheck
npm run test:ads
npm run test:paid-export
node --experimental-strip-types --test src/lib/auth/gate-identity.test.ts src/lib/auth/sign-in-gate.test.ts src/lib/protect/rate-limit.test.ts src/lib/i18n/i18n.test.ts
# Supply the previously reviewed PUBLIC Supabase build values where needed.
npm run build:render
node scripts/verify-public-ssr.mjs
npm run build:cloudflare
```

**Never run generic `npm run build` here:** it chains database migrations. The explicit SSR verifier launches only loopback Node, with a deliberately closed loopback DB URL and no account/server credentials; no migrations, browser or external network calls are used. It checks all thirty translated raw HTML bodies/heads, all42 sitemap routes with200, 45 mixed-locale requests, six redirect cases, seven future-locale404s, legacy editor entry and five visible FAQ/schema pairs. It terminates its own server.

## Remaining gates / release boundary

- Independent native-language editorial review; browser hydration/navigation and mobile/RTL visual tests; keyboard, contrast, screen reader and performance measurements.
- Authenticated sign-in/editor/template/PDF workflow and real export characters, performed safely without real purchases. Existing offline auth/export/ads tests are regression evidence, not live end-to-end certification.
- Remaining seven public collections after review; actual product-supported keyword research and useful future intents only. No 12-locale completion claim.
- Legacy application SEO/schema contradiction cleanup, compliance and country-network availability require their later phases.
- No source merge, production deployment, DNS/account/billing/ad change, submission or IndexNow network call is performed by this implementation batch. PR3/PR4 remain separate. Existing deployment connector upload/network blocker is unchanged and must not be bypassed.


## Recorded validation for this batch (7 November 2026, IST)

| Check | Result |
| --- | --- |
| Directory/assets + locale contracts | PASS 37/37 |
| Existing ads | PASS 10/10 |
| Existing offline exports/payments | PASS 42/42 |
| Existing auth/rate-limit/i18n | PASS 35/35 |
| Typecheck | PASS, exit 0 |
| Safe Node / Cloudflare builds | PASS, exit 0 each |
| Raw HTTP SSR verifier | PASS: 30 localized pages, 42 sitemap routes, 45 concurrent mixed-locale requests, 6 redirects, 7 planned-locale404s, legacy editor alias, visible FAQ/schema parity |
| Built generated assets | PASS 6/6 byte-identical |
| Browser hydration/mobile/a11y/performance/live authenticated exports | NOT TESTED |
| Complete generic npm test | NOT RUN; existing unrelated fixture caveat remains |
| Production deployment | NOT PERFORMED / existing connector restriction |

Sanitized local evidence: `/workspace/formzalo-phase4-evidence-20261107/`. The slash redirect-loop failure found during the first local run was corrected with router preservation and rerun successfully. No claim that every project phase or every application behavior passes.
