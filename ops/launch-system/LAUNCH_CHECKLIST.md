# Ordered launch checklist

Use this as the project control board. Tick items only after the action is actually completed and tested. `[ ]` means pending; do not treat a written plan as a completed setup.

## Phase 0 — protect the existing project

- [x] Preserve existing app and repository.
- [x] Create isolated branch `ops/launch-operations-system`.
- [x] Add launch/operations handbook.
- [ ] Review this branch and merge to `main` only after owner approval.
- [ ] Confirm no secrets, local test payloads or user data are included in commits.

## Phase 1 — decide the public identity

- [ ] Confirm final brand/domain (AiFormPilot name is the working brand).
- [ ] Buy only one year of the selected domain after checking final checkout total and renewal price.
- [ ] Add domain to Cloudflare DNS.
- [ ] Configure host CNAME/A records from the host dashboard.
- [ ] Verify HTTPS, apex/www redirects and DNS propagation.
- [ ] Confirm support inbox receives and sends mail.

## Phase 2 — production host

- [ ] Choose Node host; do not deploy the static `preview/` folder as the full app.
- [ ] Connect the GitHub repo and production branch.
- [ ] Set build command `npm run build:render`.
- [ ] Set start command `npm start`.
- [ ] Set app health check and logs.
- [ ] Configure host secrets from `ENVIRONMENT_VARIABLES.md`.
- [ ] Confirm production app survives restart/redeploy.

## Phase 3 — auth and database

- [ ] Confirm auth broker owner has issued production `GROK_AUTH_*` credentials OR approve a separate direct Google OAuth implementation.
- [ ] Set `BETTER_AUTH_URL`, strong `BETTER_AUTH_SECRET`, `DATABASE_URL`.
- [ ] Confirm Postgres schema migrations ran and user/session records persist.
- [ ] Confirm production is not running with dev-user auth mode.
- [ ] Enable email/password only after sign-up and reset email callback are implemented.
- [ ] Configure SES (preferred if existing sending account is production-ready) or Resend fallback.
- [ ] Test signup, duplicate email, wrong password, signout, session expiry, password reset, expired reset link and unknown-email response.
- [ ] Test Google login, cancel, account switch and return URL.
- [ ] Confirm user A cannot access user B's records.

## Phase 4 — user data and storage

- [ ] Keep CV profile local by default and explain that browser clearing/device changes can remove drafts.
- [ ] Confirm consent notice is shown before browser persistence.
- [ ] Confirm withdraw consent deletes local CV data.
- [ ] Decide whether cross-device sync is required at launch.
- [ ] If yes, implement authenticated per-user profile persistence and deletion before advertising cloud sync.
- [ ] Do not add R2 until a real file-sync requirement exists.
- [ ] If R2 is added later: private bucket, signed URLs, limits, retention, deletion and access tests.
- [ ] For commercial client records, review/apply Supabase migration and test persistence, owner isolation, client deletion, link revocation and 180-day purge.

## Phase 5 — payments

- [ ] Create/use Razorpay merchant account and complete KYC only when ready.
- [ ] Apply and verify durable Supabase order/entitlement/webhook storage.
- [ ] Keep `TRIAL_MODE=true` while testing.
- [ ] Configure Razorpay test keys and webhook.
- [ ] Test successful payment, failed payment, cancelled payment, wrong amount/currency, forged signature, duplicate webhook, replay and restart persistence.
- [ ] Confirm refunds/support process and receipt/tax handling.
- [ ] Owner approves live mode and transaction fees.
- [ ] Only then set live keys and `TRIAL_MODE=false`.

## Phase 6 — content, analytics and ads

- [ ] Publish original CV/job guides and useful templates.
- [ ] Complete About, Contact, Privacy, Terms and Refund pages.
- [ ] Verify domain in Search Console and submit sitemap.
- [ ] Add Cloudflare Web Analytics or GA4 with privacy review.
- [ ] Track only aggregate events; never send CV personal data to analytics.
- [ ] Apply to AdSense after the site is genuinely ready.
- [ ] Wait for approval; do not assume acceptance.
- [ ] Replace publisher/ad-unit placeholders and `ads.txt` only after approval.
- [ ] Test ad placement and confirm no ads appear in editor, form filler, login, paywall, checkout or client pages.
- [ ] Join affiliate programs only after approval and add proper disclosure.
- [ ] Keep rewarded ads disabled unless Google Ad Manager setup is deliberately approved.

## Phase 7 — security, legal and launch

- [ ] MFA on GitHub, Cloudflare, Google, AWS, database, host and payment dashboards.
- [ ] Least-privilege team access; remove unused tokens.
- [ ] Verify rate limits, CSRF/trusted origins, secure cookies, CORS and security headers.
- [ ] Review privacy text against actual storage and processor behavior.
- [ ] Name a grievance contact and confirm support inbox.
- [ ] Document deletion, retention, backup and restore process.
- [ ] Test mobile Android and desktop Chrome/Edge.
- [ ] Run `npm run check:auth`, `npm test`, `npm run test:paid-export`, `npm run test:ads`, `npm run typecheck`, `npm run lint`, and production build.
- [ ] Monitor first production week: login failures, reset-email delivery, database errors, export errors, payment webhook failures, ad policy warnings.

## Release gate

Do not call the website production-ready if any of these are true:
- authentication is using a dev user or process-local PGLite;
- reset emails are not delivered end-to-end;
- client submissions or payment entitlements are stored only in memory/ephemeral disk;
- live payments are enabled without durable persistence and webhook replay protection;
- ads are active with placeholder IDs or before approval;
- privacy text promises cloud storage/security that is not actually implemented.
