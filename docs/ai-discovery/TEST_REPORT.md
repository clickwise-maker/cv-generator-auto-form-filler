# Consolidated review-package test report

Prepared7 November2026, IST. **LaunchReady: HOLD.** PR5 is not merged/deployed; all results below are local source/offline/loopback evidence, not production or complete project acceptance.

## Current automated PASS (Phase6 batch)

| Check | Actual result / boundary |
| --- | --- |
| Discovery/assets/public locale/schema/IndexNow/research-package tests |51/51 passing. Directory23 unique entries, nullable unknowns, purpose separation; product/robots/JSON/XML/deterministic output; locale catalogs; graph/social truth; IndexNow offline and private URL rejection; portable research evidence |
| Ads regressions |10/10 passing, flags preserved; not live ads or revenue |
| Export/payment regressions |42/42 passing, offline fake provider/state; not real checkout |
| Auth/rate-limit/editor i18n regressions |35/35 passing; not actual Google/email sign-in E2E |
| Total |138 targeted tests; original all12 batch127 remains a historical result.177 research assertions are separate data QA, not additional app tests |
| TypeScript |npm run typecheck exit0 |
| Builds |npm run build:render and npm run build:cloudflare exit0; no generic build/migrations/deployment. Existing bundler/chunk/directive warnings are not a measured performance result |
| Generated assets |generate-ai-assets --check and validate-ai-assets pass; six source/built asset bytes equal for Node and Cloudflare;84 sitemap URLs; no fabricated lastmod |
| Reusable source/page map |generate-seo-reference --check passes;72 localized title/description/H1/canonical/editor-language/catalog/alternate references |
| Raw HTTP integration |72 localized routes:200, translated title/description/H1, lang/dir, reciprocal hreflang/x-default/self canonical.84 sitemap routes200;108 simultaneous/mixed-locale requests no tested leakage;10 canonical redirects;7 unrequested locales404; root editor alias200 preserved |
| Schema/social/internal links via actual HTML |84 graph/social/title/description/canonical consistency checks;12 homepage SoftwareApplication only, no Product/Offer/ratings/FAQPage;12 visible FAQ collections retained; visible descendant breadcrumbs. Real anchor BFS from/en/ reaches84 canonical paths |
| Git hygiene |git diff --check passes; no unrelated migration/account/security/runtime flag changes |

Initial Phase6 editor-i18n parity check failed on two newly corrected FAQ strings; the four corrected sign-in/format/mapping/free-status answers now have translations in all seven existing non-default catalog files and35 regression tests pass. Tests were not weakened to hide the failure. Native quality of new wording remains unreviewed.

### Reproduction commands

```
node scripts/generate-ai-assets.mjs --check
node scripts/validate-ai-assets.mjs
node scripts/generate-seo-reference.mjs --check
node --test scripts/ai-discovery.test.mjs scripts/ai-assets.test.mjs scripts/public-locales.test.mjs scripts/seo-phase6.test.mjs scripts/research-package.test.mjs
npm run test:ads
npm run test:paid-export
node --experimental-strip-types --test src/lib/auth/gate-identity.test.ts src/lib/auth/sign-in-gate.test.ts src/lib/protect/rate-limit.test.ts src/lib/i18n/i18n.test.ts
npm run typecheck
npm run build:render
node scripts/verify-public-ssr.mjs
npm run build:cloudflare
git diff --check
```

Use only the approved public client build configuration; never print/commit account keys or credentials. verify-public-ssr starts127.0.0.1:4148 with a closed-loopback disabled DB and stops its own child. No account creation/reset/payment/submission/network indexing action occurs. Persistent separate loopback preview for parent browser is recorded in the Page and local `/workspace/formzalo-phase6-evidence-20261107/preview.json`; it is not a public release. Evidence logs live in that sanitized local directory, not repo app data.

## NOT TESTED / BLOCKED / not all-pass

- Native-speaker approval of12 catalogs and new bounded legacy FAQ translations; pt-PT/Japanese terminology, country availability and legal text currentness.
- Actual browser hydration/selector/menu/nav/RTL behavior; desktop and375/390 mobile screenshot/reflow; keyboard/focus/contrast/screen-reader; measured Core Web Vitals/Lighthouse/performance. Source landmark/RTL structure is not full WCAG compliance.
- Real auth callbacks/email sign-in, synthetic CV/editor/export/download/form assistance/PDF Unicode/fonts E2E; file limits and local OCR remain source/targeted-test facts, not new all-script runtime proof.
- Deployed Cloudflare runtime/current public canonical routes not tested; public network fetch previously403 and was not retried/bypassed. Existing production was not changed.
- External Google Rich Results Test/schema validator not run. Current tests are structural/content invariants. FAQ rich results were retired per current official2026 docs; visible FAQ is preserved without that markup.
- Generic full npm test not run; historical unrelated missing .grok fixture/legacy PWA source-expectation caveat remains. No claim the entire repository suite passes.
- Approved full-artifact deployment capability remains blocked; no main merge/release. AdSense PR3 diagnosis did not deploy. Billing/ads/account/DNS/security unchanged.
- All keyword metrics null;31 observed publisher terms are not proven query demand,74 remain hypotheses.177 research assertions do not certify law or native/PDF support. Russia/Indonesia/UK/India final rules/Saudi detail/PIPL-CAC/data-flow/controller checks remain open; privacy no-login contradiction needs owner/legal review.

## Nine requested deliverables / honest availability

| Deliverable | Current availability |
| --- | --- |
|1 Technical audit |Existing project Page delivered; historical production findings distinct from unpublished source fixes |
|2 AI directory |23 platforms with official-source coverage/unknowns, schema/tests; no all-platform verification claim |
|3 AI-readable files |Manifest + six generated public assets prepared; voluntary conventions, not citation guarantee |
|4 Multilingual implementation |12 draft public locales/six intents, locally tested; native/browser/output/release gates open |
|5 Keyword research |Durable105 qualitative records,31 observed/74 candidates/all metrics null; quantitative demand not complete |
|6 Technical test report |This report,138 targeted tests + actual local HTTP; manual/E2E/performance gaps above |
|7 Git diff/commits |GIT_DIFF_SUMMARY.md + PR5; correct live base, no main merge |
|8 Deployment instructions |DEPLOYMENT.md + LAUNCH_PLAN.md; sanctioned upload capability and explicit PR5 release approval required |
|9 Actual submissions |submissions.json:Google one existing live102-URL sitemap Success, not indexing. Bing0/IndexNow0/direct AI listings0; branch84 not deployed/submitted |
