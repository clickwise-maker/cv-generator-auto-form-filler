# Phase6: technical SEO / GEO, review branch only

## Factual structured graph and links

`src/lib/seo-graph.mjs` is a pure graph builder. All84 canonical public routes have Organization/WebSite/WebPage with consistent IDs, language, URL, title and description. This expresses a product brand, not an invented registered company. The12 locale home pages additionally have a SoftwareApplication describing only the free signed-in CV-builder component, UI languages, Color/Plain PDF formats and source-backed functionality. No paid Product/Offer, aggregateRating, telephone/address/support hours or fabricated email. Visible wrapping breadcrumbs match BreadcrumbList on descendant pages, including English legal/guides. A raw HTML anchor crawl from/en/ reaches all84 routes.

Root metadata and the12 English-only legacy routes use actual page-specific canonical/title/description/OG/Twitter fields. Legacy-only English pages advertise only English plus x-default equivalents, not fictional translated legal pages. Twelve public locale directories have reciprocal12-language/x-default counterparts from one registry. The current tests validate structure/content consistency, not Google's external Rich Results Test or a complete vocabulary/inference validator.

## Visible FAQ, not FAQ rich results

No FAQPage markup is emitted. Visible useful FAQs remain in all12 catalogs. The previously documented government/health restriction was historical2023 guidance, not current2026 availability. On7 November2026 the official FAQPage documentation redirected HTTP200 to:

https://developers.google.com/search/updates#removing-faq-rich-result

The primary changelog states FAQ rich results stopped appearing7 May2026, with docs removed15 June2026. This executor read the official text; a durable bounded source record stores redirect/status/quote/hash in `faq-feature-source.json`. No FAQ or other structured-data rich-result appearance is promised.

## IndexNow: preparation only, no submission

Official readable documentation checked7 November2026:
- https://www.indexnow.org/documentation
- https://www.indexnow.org/faq

The official endpoint is `https://api.indexnow.org/indexnow`; it is a configured future endpoint, not contacted by scripts/tests/builds. `docs/ai-discovery/indexnow.config.example.json` is disabled with null key/location. `scripts/prepare-indexnow.mjs` accepts only `--dry-run`, has no network/POST client or submit mode and creates no key file. Normalized84 canonical public HTTPS apex URLs only; credentials/private/unknown/query/fragment/foreign/www URLs reject. Input limit10000, deduplication, disabled configuration and test-only fake key fixtures are tested. A draft payload is not submission-ready/live-enabled.

Example future OFFLINE draft, after independently choosing a key (do not commit secrets/account tokens):

```
node scripts/prepare-indexnow.mjs --dry-run docs/ai-discovery/indexnow.config.example.json https://formzalo.com/en/
```

The example retains a null key and returns a blocked offline draft, not an enabled submission. Future operator checklist: obtain explicit release/ownership approval, prepare the official8–128-character allowed key according to the documentation, deploy a UTF-8 root `<key>.txt` through the supported approved deployment route (or documented keyLocation), verify its actual public200 body and host, then separately authorize submission. Do not represent it as already present; no live-key verification or autoPOST occurs here. Search-engine participation/ingestion/indexing is not guaranteed. Never put privileged service tokens into a public key file.

## Crawl/access policy

Training remains allow by default, separately configurable; Googlebot/Bingbot/search remain permitted on public pages under either option. Private paths are repeated for named groups to avoid user-agent precedence opening them. Google-Extended is a policy-control token, not a distinct crawler HTTP user agent. User-request fetch behaviors differ by provider; robots is not authorization or a guarantee every fetch respects a rule. No IP-based bot redirects or security/auth/payment/ad flag changes. AI-readable assets are voluntary conventions, not a Google ranking requirement.

## Legal/product and evidence limitations

Bounded old SEO/FAQ claims now reflect sign-in, free PDF formats, reviewed field mapping and unverified Word/generative/writeback behavior. Actual app controls remain intact. Real privacy no-login/controller/data-flow inconsistencies are flagged in the reviewed research package for owner/legal review; the policy body is not silently rewritten. The interpolated contact placeholder exists; this is not evidence that any suggested support mailbox is operational. Native wording/country legality/PDF script support still need human/runtime checks.
