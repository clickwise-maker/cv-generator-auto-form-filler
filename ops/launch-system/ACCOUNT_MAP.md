# Account map — where to log in

This is the order of accounts and dashboards for AiFormPilot. Existing accounts are reused where possible. A link in this document is a sign-in destination, not a statement that the account is already configured.

## 0. Existing accounts / assets to reuse first

| Service | Sign-in / dashboard | What it does | Project status |
|---|---|---|---|
| GitHub | https://github.com/clickwise-maker/cv-generator-auto-form-filler | Source code, issues, branch and deployment connection | Existing repo; launch system is on `ops/launch-operations-system` |
| Cloudflare | https://dash.cloudflare.com/ | DNS, SSL, R2 and optional Web Analytics | Existing Cloudflare setup was discussed; verify zone and bucket access |
| AWS | https://console.aws.amazon.com/ses/ | Transactional email sending | Existing SES/DKIM setup for the `we24.in` mail domain was discussed; verify sending status and credentials |
| Domain | Registrar dashboard where domain was purchased | Domain registration and renewal | AiFormPilot domain is not confirmed purchased |

Do not create duplicate accounts before checking these existing ones.

## 1. Domain and DNS

**Purpose:** own the public brand address, point it to the Node app, and publish email verification records.

1. Choose the final domain before configuring OAuth redirect URLs, email sender identities or Search Console.
2. Sign in to the registrar and register only the domain. Decline hosting, website builder, paid privacy or multi-year add-ons unless separately approved.
3. Add the domain to Cloudflare DNS if Cloudflare is the chosen DNS provider.
4. Add the host's required DNS records exactly as shown by the host. Do not guess A/CNAME values.
5. Enable HTTPS/SSL and test both apex and `www` redirects if both are used.
6. Add the final domain to Google OAuth broker allowlists, Resend/SES sender verification, Search Console and AdSense only when applicable.

Previously reviewed quote (not a purchase confirmation): `aiformpilot.co.in` was shown at ₹475 + GST ₹85.50 = ₹560.50 for one year. Recheck checkout price, renewal price, KYC and mandatory add-ons before paying. The earlier `.com` quote was above the stated budget.

## 2. Hosting / deployment

**Recommended initial path:** use a Node-capable host for the full TanStack Start app. The repo has:
- build: `npm run build:render`
- start: `npm start`
- app port contract: 8080 in local development
- a `vercel.json` install command, but that file alone does not prove production deployment is configured.

The static `preview/` folder is not the full production app: it cannot run the server auth, paid-export and other API routes.

Host dashboard: https://render.com/ (if continuing the existing Render deployment) or https://vercel.com/ (verify plan/commercial terms before using). Render free services can sleep and local disk is ephemeral. Vercel Hobby is not the right plan for a commercial business; check current plan terms. Do not pay for an upgrade without approval.

**Host setup sequence**
1. Connect the existing GitHub repository.
2. Select branch `main` for production after launch branch changes are reviewed/merged.
3. Set build command `npm run build:render`.
4. Set start command `npm start`.
5. Set Node version compatible with the lockfile and app scripts.
6. Add environment variables from [ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md) through the host's secret UI.
7. Add the custom domain and verify HTTPS.
8. Run the production smoke tests in the launch checklist.

## 3. Authentication

### Existing route — shared auth broker

The current source does **not** call Google's OAuth endpoints directly. It uses Better Auth in this app and federates Google/X login through the shared broker at `https://auth.grok.me`.

Current provider IDs:
- Google: `grok-google` → broker upstream `google`
- X: `grok-x` → broker upstream `twitter`

For a deployed app, the platform/deployer must inject:
- `GROK_AUTH_ISSUER`
- `GROK_AUTH_CLIENT_ID`
- `GROK_AUTH_CLIENT_SECRET`

The app also needs its own `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET`, and durable `DATABASE_URL`.

**Important:** Do not create a Google Cloud OAuth client just because a login button says Google. In the current architecture, the broker owns upstream Google credentials. Ask the broker/platform owner for the per-app client first. Only use the direct Google OAuth setup below if the team deliberately changes the app to direct Google provider credentials.

### Direct Google OAuth alternative (not the current code path)

Dashboard: https://console.cloud.google.com/auth/clients

If direct OAuth is chosen:
1. Sign in with the Google account that will own the project.
2. Create/select a Google Cloud project.
3. Configure Google Auth Platform branding and audience.
4. Create an OAuth client of type **Web application**.
5. Add the exact authorized JavaScript origin(s) and redirect URI shown by the app's Better Auth configuration.
6. Save the client ID and client secret in the hosting provider's secret manager.
7. Test with a personal account; complete Google verification only if the requested scopes/audience require it.

Creating an OAuth client is not a paid per-login product. Do not enable unrelated paid Google Cloud APIs or attach billing unless a separate feature actually requires them.

Official guide: https://developers.google.com/identity/openid-connect/openid-connect

## 4. Database and durable storage

### Authentication database

The app uses Postgres when `DATABASE_URL` is present. Without it, it falls back to embedded PGLite. The fallback is useful for preview/dev but is not a durable production database across process restarts.

Neon dashboard: https://console.neon.tech/
- Create a project only if no existing Postgres database is available.
- Copy the pooled Postgres connection string into the host as `DATABASE_URL`.
- Run the app migration/build process and verify Better Auth tables exist.
- Never put the connection string in Git.

### Commercial records (orders, entitlements and client submissions)

The repo includes Supabase REST adapters and proposed SQL migrations:
- `docs/SUPABASE_PERSISTENCE_MIGRATION.sql`
- `docs/CLIENTS_SUPABASE_MIGRATION.sql`

Supabase dashboard: https://supabase.com/dashboard
- Create/use a project only when enabling persistent client links, client submissions or live payment records.
- Review and apply the SQL migrations to the intended project.
- Keep the service-role key server-only; enable RLS and do not add public/anon policies.
- Configure `STORE_BACKEND=supabase`, `SUPABASE_URL`, and `SUPABASE_SERVICE_ROLE_KEY` only after confirming the adapter selection path and tests.
- Verify writes survive a redeploy and one customer's records cannot be read by another.

Do not assume that the SQL migration has already been applied. It is documented as proposed/not applied.

### CV files and profile storage

Today, the CV dossier is stored in the user's browser (localStorage) after consent. The current source does not integrate Cloudflare R2 into the CV storage flow.

Cloudflare R2 dashboard: https://dash.cloudflare.com/ → Storage & databases → R2
- Use the existing account/bucket if available; do not create another bucket blindly.
- R2 is optional for launch. Add it only when cloud backup, cross-device sync or server-side document storage is a real requirement.
- If integrated, use a private bucket, server-side S3 credentials, short-lived signed upload/download URLs, size/type limits, malware scanning where appropriate, and deletion/retention controls.
- Never make CVs or identity documents publicly readable.

R2 includes a monthly free allowance (currently 10 GB-month standard storage, 1 million Class A and 10 million Class B operations); usage above the allowance is billed. Check current pricing: https://developers.cloudflare.com/r2/pricing/

## 5. Transactional email (verification and password reset)

Preferred order:
1. Reuse the existing AWS SES setup if the sender domain is verified and SES is out of sandbox / permitted to send to real recipients.
2. If SES is not ready, Resend is a simple fallback: https://resend.com/signup

Resend currently advertises a free plan with 3,000 emails/month and 100 emails/day. Check current terms: https://resend.com/pricing

Required application work:
- enable email/password in `src/lib/auth/email-password.ts`;
- add/verify sign-up and sign-in forms;
- implement Better Auth's password-reset email callback using the chosen sender;
- add email verification if the launch policy requires verified accounts;
- use expiring, single-use reset tokens and a generic response that does not reveal whether an email exists;
- configure sender SPF/DKIM/DMARC and test inbox + spam folder.

Resend is not a login provider. It only sends email. It is not necessary for Google OAuth.

## 6. Payments

Razorpay dashboard: https://dashboard.razorpay.com/
- Create/use account and complete merchant KYC only when paid checkout is ready.
- First use test keys.
- Configure webhook URL `https://<production-host>/api/paid-export/webhook/razorpay`.
- Subscribe to the event types used by the app and store the webhook secret only in the host.
- Do not switch to live keys until order and entitlement records are durable and duplicate webhook / replay tests pass.

The repo already contains Razorpay provider logic, but live credentials and production persistence are not verified. Razorpay charges transaction fees; check current pricing before activation.

## 7. Search, analytics and advertising

| Account | Login | Why / when |
|---|---|---|
| Google Search Console | https://search.google.com/search-console | Verify domain, submit sitemap, monitor indexing and search issues |
| Google Analytics 4 | https://analytics.google.com/ | Measure visits, tool starts, CV exports, signups and conversion events |
| AdSense | https://adsense.google.com/start/ | Publisher application and display ads; no upfront signup fee, but approval is not guaranteed |
| Google Ad Manager | https://admanager.google.com/ | Only if later enabling rewarded ads / video ad unlock; not required for ordinary AdSense |
| Cloudflare Web Analytics | Cloudflare dashboard → Analytics & Logs → Web Analytics | Free, cookieless traffic analytics; app's bootstrap token is currently blank |

Do not confuse **Google Ads** (buying traffic) with **Google AdSense** (earning from ads shown on your site). We are planning publisher monetization, not paid ad campaigns.

AdSense needs original, useful content and policy compliance. A tool-only landing page may not be enough. Publish genuinely useful CV/job-application guides before applying. Never click your own ads or ask users to click them.

## 8. Support inbox

The existing privacy notice lists `team@clickwisewe24in.we24.in`. Confirm that it receives mail and that someone can reply. Cloudflare Email Routing forwards mail; it is not itself a full hosted mailbox or outbound mail service. For a real inbox, use the already-configured mail host/SES arrangement or a mailbox provider. Do not promise support from an address until inbound and outbound tests pass.
