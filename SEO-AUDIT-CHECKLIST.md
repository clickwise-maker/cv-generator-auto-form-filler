# FormZalo SEO + AI Visibility Implementation Checklist

Audit run 7 Nov 2026 against the live site. Full findings in the audit report; this file is the working checklist. Update the boxes as items land.

## Phase 1 - Measurement (this week, all free)

- [ ] Google Search Console property for formzalo.com; verify and submit sitemap.xml
- [ ] GA4 measurement script in the site shell (all pages)
- [ ] Microsoft Clarity script (heatmaps + session recordings)
- [ ] GA4 events for the CV funnel: cv_started, cv_generated, form_filler_used, plan_view, upgrade_clicked
- [ ] PageSpeed Insights mobile + desktop from pagespeed.web.dev; record Core Web Vitals here

## Phase 2 - Brand unification (decision needed first)

Current state: domain is formzalo.com but the site brands itself "formzolo" (title, og:site_name, JSON-LD name, llms.txt "formzolo (formerly CV Studio)"). Brand search "FormZalo" returns zero results; the split name means AI engines resolve neither form.

- [ ] Decide: brand = "FormZalo" (matches domain) or buy formzolo.com
- [ ] Unify JSON-LD name/alternateName, og:site_name, apple-mobile-web-app-title, llms.txt title, page titles to the chosen name
- [ ] Remove the stale "(formerly CV Studio)" alias from llms.txt

## Phase 3 - Languages

Current state: sitemap has ~78 URLs, 65 are `?lang=` query-param variants of 13 pages; zero hreflang tags in HTML; canonical points to the plain URL, so Google treats variants as duplicates.

- [ ] Move language variants to real paths (/hi/, /ar/, /es/...) OR drop ?lang= URLs from the sitemap until paths exist
- [ ] Add hreflang link tags with x-default = en-IN; set html lang per variant
- [ ] Regenerate sitemap (one URL per page per language); resubmit in GSC

## Phase 4 - Schema and content

- [ ] Article/BlogPosting schema on every guide page (FAQ page already has FAQPage schema)
- [ ] BreadcrumbList schema on guides and templates
- [ ] Organization schema: add sameAs links to social profiles
- [ ] First 8 intent landing pages (one real feature each, no keyword clones): AI Resume Builder for Freshers, ATS Resume Builder India, Resume for Software Engineers, Job Application Form Filler, Government Job Application Guide, Free ATS Resume Checker, Auto Form Filler from Photo/PDF, Cover Letter Generator
- [ ] 2 guides per week from Google Trends + AnswerThePublic questions
- [ ] Remove the dead keywords meta tag

## Phase 5 - Off-site presence (the AI-visibility bottleneck)

No third-party mentions exist anywhere today, so ChatGPT/Gemini/Perplexity cannot recommend FormZalo. Free routes first; nothing paid yet.

- [ ] Bing Webmaster Tools + IndexNow
- [ ] Product Hunt launch (tagline, maker story, first comment prepared in advance)
- [ ] SaaSHub listing (free; needs released product + approval)
- [ ] Futurepedia + FutureTools submissions (free tier)
- [ ] HubSpot AI Search Grader baseline now, repeat monthly
- [ ] Skip for now (paid): Toolify ($99), Veritas, AirOps, Semrush/Ahrefs paid tiers; Ahrefs free Webmaster Tools is enough for a backlink baseline

## Not yet verified

- PageSpeed scores (free API rate-limited during the audit)
- Google indexing status (needs Search Console)
- Competitor keywords (needs an Ahrefs/Semrush account)

## Run 2 - 7 Nov 2026 (logins + live data attempt)

Done:
- Google Trends (India, last 3 months, no login needed): "free resume" avg 53 / peak 100 (week of 20 Sep), "resume builder" avg 20, "cv maker" avg 14. Rising queries map 1:1 to features we already ship: "free resume builder online without payment", "free ai resume builder and download", "free cv maker and download pdf", "free resume templates download in word format", "europass cv maker". Action: first 5 guides should target exactly these phrases.
- Homepage weight probe (PSI API quota exhausted for the day): TTFB ~0.14s, HTML 27.4KB, only 1 render-blocking script (Cloudflare's own beacon), 2 stylesheets, 18 preloads, 1 image missing width/height, 2 JSON-LD blocks. Performance looks structurally fine; real Lighthouse scores still pending.
- Confirmed live homepage still has no GSC meta, no GA4, no Clarity.

Blocked / pending logins (per your rule, login + OTP steps go through you, not around you):
- Google Search Console: reached the sign-in step; the automated browser could not pass it this run. Retry: sign in with the saved Google account, then add property https://formzalo.com/ (URL-prefix; HTML meta or file verification) or domain property (DNS TXT at Domain India).
- Bing Webmaster: sign-in supports Google account; after GSC exists we can import the site instead of re-verifying.
- Microsoft Clarity: needs a Google or Microsoft sign-in, then the tracking script goes into the site shell.
- Ahrefs Webmaster Tools: free signup; verifies formzalo.com with its own meta tag (needs deploy access).
- Keyword Planner: needs a Google Ads account; stop if it demands billing/payment setup.
- HubSpot AI Search Grader: form-based, no real account; run when the browser session is healthy.
- Product Hunt / SaaSHub: Phase 5 launch steps; accounts only when we actually list.

Deploy-source mismatch to resolve first (blocks every meta-tag install):
- Live formzalo.com serves llms.txt titled "formzolo (formerly CV Studio)"; repo main's public/llms.txt still says "CV Studio". The live build is NOT repo main. Before touching verification meta tags, confirm which branch/repo deploys formzalo.com (Render "cvstudio-app" is referenced in __root.tsx SITE constant; DNS sits behind Cloudflare).
