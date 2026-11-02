# Advertising, analytics and growth plan

## What already exists in this repository

The current app already contains:
- AdSense publisher ID placeholder in `src/config/ads.ts`;
- ad unit ID placeholders;
- ads disabled by default (`ADS.enabled: false`);
- a route allow-list for homepage, guides, templates and dashboard;
- tests ensuring ads do not render in the editor, form filler, login, paywall, checkout or client intake;
- a rewarded-ad unlock option that is disabled by default and requires a Google Ad Manager network code plus `AD_UNLOCK_SECRET`;
- affiliate cards with `example.com` placeholder URLs.

Do not rewrite the ad system. Configure it only after the accounts are approved and the real IDs exist.

## Recommended monetization order

### Stage 1 — useful content and measurement (no paid ads)

1. Keep the core CV tool usable and fast.
2. Publish original guides that solve real job-search problems: country-specific CV formats, ATS-readable CVs, fresher CV examples, cover letters, international job application checklists, and form-filling tutorials.
3. Add clear authorship, update dates, sources where needed, contact/about pages and accurate privacy/terms.
4. Verify the domain in Search Console and submit the sitemap.
5. Add Cloudflare Web Analytics first (already has a blank-token bootstrap) or GA4 after consent/privacy review.
6. Measure: landing visits, guide views, tool starts, CV imports, preview opens, clean exports, signups and paid conversions. Do not send CV contents, names, email addresses or passport details to analytics.

### Stage 2 — AdSense

Login: https://adsense.google.com/start/

1. Use the Google account that will own publisher payments.
2. Submit the final owned domain (not a temporary preview URL).
3. Ensure the site has original, useful content, navigation, About, Contact, Privacy Policy and Terms.
4. Wait for Google's site review; approval is not guaranteed and there is no fee to apply.
5. After approval, copy the exact publisher ID (`ca-pub-...`) and create ad units.
6. Replace placeholders in `src/config/ads.ts` and `public/ads.txt`.
7. Set `ADS.enabled = true` only after IDs and placements are checked.
8. Verify ad labels and page layout on desktop/mobile.

Google's eligibility guide: https://support.google.com/adsense/answer/9724  
AdSense overview: https://adsense.google.com/start/how-adsense-works/

**Placement policy:** keep ads only on public content pages and low-risk landing/dashboard areas already allowed by the code. Never show ads next to personal CV details, passport/ID data, client submissions, form fields, payment buttons, login/reset screens or download controls. Avoid accidental clicks and never click your own ads.

### Stage 3 — optional rewarded ad

Google Ad Manager: https://admanager.google.com/

The repo has a disabled watch-ad unlock hook. Do not enable it until:
- a Google Ad Manager network and rewarded web ad unit exist;
- the integration is checked against current Google rewarded-ad policies;
- `AD_UNLOCK_SECRET` is set server-side;
- daily guest/IP caps, one-time tokens and replay protection are tested;
- the ad is genuinely optional and a paid alternative remains available.

Ordinary AdSense does not require Google Ad Manager. Do not create a GAM account for the first launch unless rewarded unlock is a deliberate product decision.

### Stage 4 — affiliate revenue

Join only relevant programs that accept the business and target countries. Replace the `example.com` URLs with real tracked affiliate links after approval. Clearly disclose affiliate relationships and use the existing `rel="sponsored noopener"` behavior. Do not make fake recommendations or claim an affiliate relationship before acceptance.

## Analytics accounts

- Search Console: https://search.google.com/search-console
- Google Analytics: https://analytics.google.com/
- Cloudflare Web Analytics: Cloudflare dashboard → Analytics & Logs → Web Analytics

Use privacy-conscious event names and aggregate metrics. Do not collect CV field values, uploaded document contents, ID/passport numbers, or raw client profiles in analytics.

## Benchmark: FlowCV

FlowCV's public pages communicate a genuinely usable free first resume, a guided workflow, and clear separation between free basics and paid multi-version/AI features. Its free offering and plan limits can change; see https://flowcv.com/pricing. For AiFormPilot, keep a useful free path and monetize additional workflows without making the editor unpleasant.

## What not to buy

- Google Ads traffic campaigns before organic conversion is measured.
- Paid SEO subscriptions or analytics dashboards at launch.
- Paid ad traffic or ad networks promising guaranteed revenue.
- Google Ad Manager before the basic AdSense site is approved.
- Extra email/CRM subscriptions if the existing SES setup can deliver transactional messages.
