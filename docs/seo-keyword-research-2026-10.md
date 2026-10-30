# CV Studio keyword research and implementation notes

Research date: 30 October 2026  
Markets considered: United States, United Kingdom, India, Canada  
Purpose: Select search-intent clusters that match the product already shipped, without promising features that do not exist.

## Evidence quality and important corrections

1. Google Keyword Planner is the preferred source for country-specific average monthly searches and bid estimates. Google's documentation says to set location and language targeting and review average monthly searches and suggested bids. Exact country figures were not available in the public search results used for this pass; do not present third-party estimates as verified US/UK/IN/CA figures. A Keyword Planner export for each country is still needed.
2. A DataForSEO-based opportunity page reports 2,400 monthly searches for "resume tailoring" with KD 8, but it does not clearly identify the country in the surfaced result. Treat this as a directional third-party estimate, not a four-country volume.
3. Another third-party keyword page reports "resume tailor" at 3,600 average monthly searches, competition index 31, and "tailor resume to job description" at 880. The page does not clearly state the market and currency for every bid field. Do not use those numbers in ad budgets until checked in Keyword Planner.
4. A DataForSEO US snapshot reports "AI resume builder" at 27,100 searches/month, a 25-keyword cluster at 90,450/month, and estimated CPC of $10.39. This is a US-oriented third-party estimate, not a global total and not a guaranteed Google Ads price. It supports keeping the broad phrase secondary rather than making it the only acquisition strategy.
5. A surfaced "job application tracker" 5,400 searches/month result is Etsy marketplace keyword data, not Google web-search demand. It is excluded from the site's SEO volume claims.
6. A surfaced ATS-resume-checker traffic table is competitor traffic/keyword data with unclear market scope. It is not used as a verified search-volume claim.
7. Jobscan's 2026 ATS report says it detected an ATS at 97.4% of Fortune 500 companies in 2026; the often-quoted 97.8% figure is its 2025 result. This is a Fortune 500 sample, not all employers.
8. Huntr's Q2 2026 report compares 101,501 tailored applications with 1,893,054 untailored applications across a larger sample. Recorded interview rates were 5.71% vs 3.09%. Outcomes are user-reported/recorded and observational; this does not prove tailoring caused the difference and must not be marketed as a guaranteed result.

## Keyword-to-page map

| Page | Primary intent / phrase | Supporting phrases | Implementation decision |
|---|---|---|---|
| / | free CV builder | free resume builder, online CV maker, CV generator, resume maker | Use in page title/description and visible product copy naturally |
| /guides/cv-for-freshers | free CV builder for freshers | fresher CV, fresher resume, entry-level resume | Existing guide title/description expanded; product claims remain factual |
| /guides/ats-friendly-cv | ATS-friendly CV | ATS-friendly resume, ATS CV format, resume formatting for ATS | Educational guide only; do not claim an ATS score/checker exists |
| /guides/job-application-form-filler | job application form filler | online job form preparation, form field mapping, auto form filler | New guide explains supported document reading and profile mapping; explicitly says it does not submit third-party applications |
| /guides/government-job-forms | government job application forms | online recruitment form, photo/signature upload requirements | Existing guide retained |
| /guides/cv-vs-resume | CV vs resume | CV or resume by country, US resume, UK CV, Canada resume | Existing country comparison retained |

## Product claims deliberately NOT targeted yet

- Resume tailoring / tailor resume to job description: no shipped job-description tailoring workflow was found in the inspected app code. Do not create a landing page claiming this feature until implemented and tested.
- ATS resume checker / ATS score: no shipped scoring/checker workflow was found. Keep the current ATS page educational.
- Job application autofill Chrome extension / automatic apply: the current product reads supported documents and maps recognizable fields into the profile. It does not operate third-party job portals or submit applications. Do not claim extension-style autofill.
- Interview-rate lift: Huntr's result is observational and self-reported. It can be cited in an educational article with caveats, not as a product performance guarantee.

## Next data collection step

Export the same keyword list from Google Ads Keyword Planner four times, each with the matching location and English language:
- United States
- United Kingdom
- India
- Canada

Include average monthly searches, 12-month trend, competition, top-of-page bid low/high, and date range. Keep close variants separate until Google groups them. Refresh the table before paid campaigns. Google's guide: https://support.google.com/google-ads/answer/7337243

## Sources checked

- Google Ads Keyword Planner help: https://support.google.com/google-ads/answer/7337243
- DataForSEO-based resume tailoring opportunity snapshot: https://buildthis123.com/opportunity/evidence-locked-resume-tailor
- Resume tailor keyword snapshot: https://trenzhub.com/t/resume_tailor
- US AI resume builder keyword cluster: https://unbuilt.software/topics/resume-tailoring
- Jobscan 2026 ATS Usage Report: https://www.jobscan.co/blog/fortune-500-use-applicant-tracking-systems/
- Huntr Q2 2026 Job Search Trends: https://huntr.co/research/job-search-trends-q2-2026
