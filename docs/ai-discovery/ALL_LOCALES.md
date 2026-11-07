# Phase 4 — twelve public-content locales, review branch only

This extends the preserved [first-five batch](LOCALIZATION.md), not a fresh audit or deployment. Source base remains live5ccb8b4 on feature/free-cv-paid-filler-ads; PR5 stays on feature/global-ai-discovery-20261107, unmerged. PR3/4 are not merged or overwritten.

## Current coverage

Twelve public directory IDs: **en, hi, pl, ar, es, zh-cn, ru, de, fr, pt, ja, id**. Each has six useful existing-product page intents: home, templates, services/plans and availability, FAQ, about, help. The remaining-seven batch adds42 translated counterparts; it does not invent42 new keyword intents or search-volume claims.

All catalogs have nonempty translated titles/descriptions/H1/intros/sections, navigation and FAQ. Tests reject English fallback in these fields. They are editorial drafts, **not independently reviewed by native speakers**; completeness checks do not certify idiomatic language quality. Existing policy destinations remain English and are labeled accordingly. Proper template names and the multilingual language-selector names are intentionally retained.

Japanese templates text distinguishes generic CV layouts from Japanese 履歴書 and 職務経歴書; no official/local prescribed-form compatibility is promised. No country availability, cultural compliance or worldwide PDF coverage is inferred from translations. Generic language tags do not mean country targeting; OG regional locale formatting is not a service-availability assertion.

## Request-scoped rendering and URL policy

The existing loader → context → catalog architecture remains. No singleton locale writes are introduced. Each locale/page has a self-canonical URL, twelve reciprocal alternate language links and x-default to the equivalent English page. Arabic remains RTL; all other active locales are LTR. The language selector links to the same page intent.

Chinese separates the lowercased URL/catalog ID `zh-cn` from BCP47 `zh-CN` for HTML lang, hreflang, WebPage/FAQ language and selector link language. Registry `languageTag` supplies that mapping. Legacy `?lang=zh-CN`/lowercase variants map to `/zh-cn/` equivalents. `fr-FR` and `ja` aliases likewise migrate to their actual translated public routes. Root editor URLs stay alive with head canonicals, preserving auth/OAuth/query/#signin behavior. Public canonical middleware and router trailing-slash preservation are unchanged; no IP-based redirects.

## Website language is not editor/OCR/PDF language

| Surface | Actual scope |
| --- | --- |
| Public translated content | Twelve collections,72 pages |
| Existing editor UI | Eight locale IDs / seven base languages, unchanged |
| Public Polish/Russian/German/Portuguese/Indonesian → editor | Explicit English-editor fallback |
| Public Chinese/French/Japanese → editor | Existing zh-CN/fr-FR/ja UI IDs |
| OCR initialization | English only;12 MiB input; at most two scanned-PDF fallback pages |
| PDF headings | Existing en/fr/de/es options, not twelve-language glyph validation |
| PDF characters / browser export E2E | Not fully validated across these languages |

The factual manifest and generated files retain sign-in, free clean Color/Plain PDFs, no inferred unlimited quota, no verified free Word button or active generative writing integration. Form assistance is reviewed field mapping, not arbitrary browser autoapply or guaranteed PDF writeback. Paid-checkout descriptions remain dated observations from7 November2026, not live purchase readiness. Only the existing published team@formzalo.com is used; inbox deliverability is not claimed.

## Sitemap / discovery policy

The deterministic generator now emits **84 URLs**:72 translated canonical pages plus12 existing English content pages. No query duplicates, unsupported locale placeholders or fabricated lastmod. One sitemap can contain all language collections; separate language sitemaps are optional. Product JSON explicitly distinguishes twelve public languages from existing UI/OCR/PDF support. Robots bytes/default training-allow policy and sensitive-path exclusions are unchanged. Voluntary AI-readable assets do not guarantee crawling, indexing, retrieval or citation.

The parent reports Google accepted the **existing live102-URL sitemap** on7 November2026 at23:09 IST (102 discovered pages,0videos). That is not an indexed count or a submission of this unpublished84-URL sitemap. Parent reported Bing signed in but manual www property still unverified at23:14 IST; no Bing submission is confirmed here. This source executor performs no account action. No blocked production fetch was retried.

## Validation / explicit limitations

Use the safe commands in LOCALIZATION.md. The SSR verifier requires `build:render`, starts only loopback with a disabled DB URL/no server credentials, then terminates its process. It does not use a browser, call account services, perform migrations or submit anything.

Recorded PASS integration coverage: all72 translated raw body/head/lang/dir responses, all84 sitemap routes200,108 concurrent/mixed locale requests,10 redirect cases including Chinese/French/Japanese legacy aliases,7 unrequested locales404, legacy root editor alias200 and12 visible FAQ/schema pairs. Existing first-five public text and application/editor/auth/payment/ad code are preserved.

Pending gates: independent native-language review; actual browser hydration/navigation;375/390px and RTL visual checks; keyboard/screen-reader/contrast checks; measured performance; authenticated synthetic CV/PDF export and Unicode glyph tests; deployed Worker/runtime verification. Source and Node SSR tests do not certify those. No generic npm build (migration chain), database migration, production merge/deploy, DNS/billing/config change, purchase, webmaster submission or IndexNow call is part of this batch. Phases5–7 remain separate work.


### Recorded results — 7 November2026, IST

- PASS directory/assets/locale contracts40/40; existing ads10/10; offline exports/payments42/42; auth/rate-limit/i18n35/35 (127 targeted tests total).
- PASS typecheck, safe Node build and Cloudflare build, exit0 each.
- PASS actual loopback HTTP SSR:72 localized pages,84 sitemap routes200,108 concurrent/mixed-locale requests,10 redirects,7 unrequested locales404, preserved editor root alias and12 visible FAQ/schema pairs. WebPage/FAQ language and language-selector tags include correct zh-CN.
- PASS all six built discovery assets byte-identical; generated source facts/XML/parity/diff checks.
- NOT TESTED native-speaker approval, browser hydration/mobile/keyboard/a11y/performance, authenticated PDF E2E or deployed production Worker. Complete generic npm test not run (earlier unrelated fixture caveat).

Sanitized logs: `/workspace/formzalo-phase4-all12-evidence-20261107/`. First-five catalog files, root editor, auth, payment and ads source are unchanged by this extension; robots bytes are also unchanged. No production release, account action or new sitemap submission was performed.
