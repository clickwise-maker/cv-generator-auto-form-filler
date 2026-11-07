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
