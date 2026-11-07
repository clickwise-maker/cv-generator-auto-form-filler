# FormZalo AI discovery directory — Phase 2

Public-source review: **7 November 2026 (IST)**. This is a research/maintenance artifact, not a list of successful integrations or submission promises. Source timestamps are ISO 8601 with explicit offsets (currently UTC); convert to IST for human updates.

## Files and validation

- `platforms.json`: exactly the 23 requested entries, official site check, capability evidence, independently classified crawler/control tokens, public-submission documentation, source HTTP/access results and review dates.
- `platforms.schema.json`: strict JSON Schema 2020-12 structure. Its URN is a repository identifier, not a deployed web endpoint.
- `../../scripts/validate-ai-discovery.mjs`: dependency-free validator for the subset of schema keywords actually used here, plus provenance/business rules. It is not a general JSON Schema engine.
- `../../scripts/ai-discovery.test.mjs`: positive/negative offline contract tests.

Run from repository root (no dependencies, network, database or account access required):

```sh
node scripts/validate-ai-discovery.mjs
node --test scripts/ai-discovery.test.mjs
```

## Actual coverage and uncertainty

All **23 requested platforms** have records; **12** capability descriptions have readable fetched official support; **11** remain explicitly unknown. **33 official source URLs** have HTTP/access records, including blocked responses and app shells. Six platform families have readable crawler documentation; only five publish tokens recorded here (12 tokens in total). Brave's official help explicitly says its crawler does not advertise a differentiated user agent: do not invent `Bravebot`.

**Historical Phase 2 directory snapshot — actual submissions in that batch: 0.** Every entry is `NOT_SUBMITTED`. A discovered mechanism is not permission to use it. Only Google Search Console/sitemap documentation was confirmed as an indirect search-index mechanism in this bounded pass; this is not a direct Gemini listing. Bing/Copilot indexing documentation remains insufficiently fetched here, not evidence that no route exists. An old Bing help URL returned 404 and was dropped. A supplementary source-fetch batch was interrupted by user steering; incomplete results did not become verified sources. Search snippets guided research but did not confer fetched-content verification.

| Requested platform | Capability evidence | Crawler docs | Tokens |
|---|---|---|---:|
| OpenAI ChatGPT and ChatGPT Search | verified | verified | 3 |
| Google Gemini and Google AI Search | verified | verified | 2 |
| Microsoft Copilot | unknown | not_found_in_review | 0 |
| Anthropic Claude | verified | verified | 3 |
| Perplexity | verified | verified | 2 |
| xAI Grok | verified | not_found_in_review | 0 |
| Meta AI | unknown | not_found_in_review | 0 |
| DeepSeek | unknown | not_found_in_review | 0 |
| Mistral Le Chat | verified | not_found_in_review | 0 |
| You.com | verified | not_found_in_review | 0 |
| Poe | unknown | not_found_in_review | 0 |
| Brave Search | verified | verified | 0 |
| Phind | unknown | not_found_in_review | 0 |
| Baidu ERNIE | unknown | not_found_in_review | 0 |
| Alibaba Qwen | unknown | not_found_in_review | 0 |
| ByteDance Doubao | unknown | not_found_in_review | 0 |
| Moonshot Kimi | unknown | not_found_in_review | 0 |
| Tencent Yuanbao | unknown | not_found_in_review | 0 |
| Zhipu GLM | verified | not_found_in_review | 0 |
| Yandex Alice | unknown | not_found_in_review | 0 |
| Naver AI Search | verified | not_found_in_review | 0 |
| Apple Intelligence | verified | verified | 2 |
| Amazon Alexa+ | verified | not_found_in_review | 0 |

A `verified` capability can be narrower than general public web search: for example, Z.ai documentation verifies developer search tools, and Alexa+ verifies assistant information capability, not a documented publisher-listing route. Each summary states the boundary. Unknown is not proof of absence, discontinuation or unavailability. HTTP 200 app shells are insufficient evidence; HTTP 403/429 results are recorded without challenge solving, sign-in or network-control workarounds. No worldwide/regional availability was tested.

The requested **Mistral Le Chat** URL redirected to an official **Mistral Vibe (formerly Le Chat)** product page during this review; both requested and observed names are retained. The requested Baidu ERNIE URL redirected to Wenxin Assistant, but the app shell was insufficient to establish search behavior. Do not infer product capability from a name, redirect or embedded application configuration.

## Crawler semantics — never collapse these controls

- `http_user_agent`: a documented request-agent token (not a complete fixed-version User-Agent string).
- `robots_control_token`: a usage-control token, not necessarily a separate requesting crawler. **Google-Extended has no distinct HTTP User-Agent**; the official docs cover both model training and some Gemini grounding. It does not govern Google Search inclusion. **Applebot-Extended** is likewise not a separate crawler.
- Purposes are recorded separately: `search`, `training`, `user_fetch`, `grounding`. User-initiated fetchers can follow different robots rules: OpenAI/Perplexity docs explain that user-requested actions may not follow robots.txt in the same way as automatic crawling.
- A bot name is not authentication. Do not loosen a WAF, rate limit, auth or sensitive-path policy solely because a request claims an agent name. This batch changes **no robots/security settings**.

## Distinguish outcomes

**Discovery** (finding a URL) → **crawl** (fetching it) → **index** (retaining/search eligibility) → **retrieval** (selecting content for an answer) → **citation** (displaying a source link). These are separate, non-guaranteed outcomes. Model-training access is a different policy. Voluntary `llms.txt`-style files are not a Google ranking requirement or universal platform submission standard.

## Updating records safely

1. Use an official product or provider documentation page. Fetch normally; record the requested/final URL, HTTP status and checked timestamp. Remove or replace 404 links. Record 403/429, unreadable shells or interrupted checks honestly, without bypassing controls.
2. Add a unique source ID and concise scope note. `content_fetched` requires readable official text, not merely a 200 response or search snippet. Do not save customer data, keys, logged-in content or full third-party pages in this directory.
3. A verified capability needs readable source IDs and a non-null `contentVerifiedAt`. Unknown records retain a null content-verification date but still record their attempted check date.
4. Add crawler tokens only from readable official crawler documentation, classify request agents versus control tokens and separate purposes. Empty arrays are intentional, not invitations to guess product-name-plus-Bot.
5. Add a public submission mechanism only from fetched official documentation, distinguish direct-platform from indirect-search indexing, and keep `NOT_SUBMITTED` until a separately authorized action actually occurs. Schema/status changes for real submissions need a reviewed audit trail; this Phase 2 contract deliberately rejects claims of performed submissions.
6. Run both commands above; review the JSON diff. Re-verify before operational use. The current source-ID tests protect provenance structure, not the truth of every future manual edit.

## Scope and next priorities

This work branch is based on the confirmed live `feature/free-cv-paid-filler-ads` commit `5ccb8b4`, not stale main. AdSense PR3 and SEO PR4 are preserved separately and are not merged/cherry-picked here. The Phase 2 commit changed no application, routes, metadata, robots, payment, auth, database, DNS or deployment settings. Phase 3 adds generated public assets and a reviewed source-level robots policy; see ASSETS.md. The generic build invokes migrations and must not be used for these batches.

User's supplemental rollout priority: **en / hi / pl / ar / es first**, then **zh / ru / de / fr / pt / ja / id**. This does not claim those languages already work. Use free-first, public documented methods; do not claim access to proprietary ranking algorithms or reverse-engineer private systems. Later useful English intent pages must reflect actual supported features—no invented generative AI, no-signup, arbitrary third-party autofill or PDF-writeback promises.

Phase 3 assets are now prepared on this same review branch; see [ASSETS.md](ASSETS.md) for product-manifest sources, generator/validator commands and policy limitations. Phases 4–8 remain subsequent work: request-scoped SSR/locales, keyword evidence, schema/compliance review and release testing. No account registration, crawler submission, IndexNow ping, purchase or production deployment occurred. Production deployment remains blocked by the previously identified sanctioned connector upload/network limitations; no workaround is part of this batch.


## Phase 4 first-five foundation / current project status

See [LOCALIZATION.md](LOCALIZATION.md): thirty request-local public pages (en/hi/pl/ar/es) and a generated 42-URL sitemap are prepared on PR5, not live. Seven later locales remain planned. Phase 2 directory entries retain their dated research/submission snapshot; they are not a current account-wide submission ledger. The parent reports one authorized Google Search Console submission of the **existing live** sitemap on 7 November 2026 at 23:09 IST: Success, 102 discovered pages, zero videos. This is indirect Google indexing discovery, not a Gemini submission or proof of indexed pages. Bing/IndexNow submissions were zero as of that parent report. This executor performed no account action.


### Remaining-seven extension prepared

Current source now covers all twelve public-content locale collections (72 translated pages +12 existing English content pages =84 sitemap URLs). The first-five subsection above records the earlier batch. [ALL_LOCALES.md](ALL_LOCALES.md) records the extension, BCP47 Chinese mapping, editor-language fallback, tests and remaining review gates. No production release or new sitemap submission occurred. Native-language review and browser/mobile/a11y/performance/authenticated E2E remain pending. Parent later reports Bing signed in, but its manual www property remained unverified and no Bing submission was confirmed as of7 November2026 23:14 IST; account actions remain outside this source batch.
