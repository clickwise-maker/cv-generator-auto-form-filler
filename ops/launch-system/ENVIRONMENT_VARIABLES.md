# Production environment variables

Set these only in the production host's secret/environment settings. Never commit real values, paste them into issues, or put server secrets in `VITE_*` variables.

## Core application

| Variable | Purpose | Required when |
|---|---|---|
| `NODE_ENV` | Runtime mode | Production host |
| `BETTER_AUTH_URL` | Exact public HTTPS origin for Better Auth | Deployed auth |
| `BETTER_AUTH_SECRET` | Session/signing secret; use a long random value | Deployed auth |
| `DATABASE_URL` | Durable Postgres connection string | Production auth persistence |
| `VITE_AUTH_ENABLED` | Public feature flag; must be true/omitted according to intended auth rollout | Auth enabled; do not leave shipped dev-user mode in production |
| `GROK_AUTH_ISSUER` | Shared auth broker issuer | Broker OAuth |
| `GROK_AUTH_CLIENT_ID` | Per-app broker client ID | Broker OAuth |
| `GROK_AUTH_CLIENT_SECRET` | Per-app broker secret | Broker OAuth |

The repo's default issuer is `https://auth.grok.me`. Confirm the broker owner has provisioned the production client and exact callback URLs before enabling Google/X sign-in.

## Email / password reset

The current code has email/password disabled by default. The exact sender integration is not yet verified in source.

| Variable / secret | Purpose |
|---|---|
| `RESEND_API_KEY` | Use only if Resend is selected |
| `EMAIL_FROM` | Verified sender address, e.g. `no-reply@your-domain` |
| `AWS_ACCESS_KEY_ID` | Use only if SES API/SMTP integration requires it |
| `AWS_SECRET_ACCESS_KEY` | Server-only SES secret |
| `AWS_REGION` | SES region |
| `SES_FROM_EMAIL` | Verified SES sender address |

Choose SES **or** Resend for the app's transactional sender; avoid configuring both without a reason. Verify sender domain and actual delivery before enabling reset links.

## Supabase durable records

| Variable | Purpose |
|---|---|
| `STORE_BACKEND` | Select Supabase-backed order/client stores after code-path verification |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only key; never expose to browser |
 
The SQL files in `docs/` are proposed migrations. Review, apply and verify them before setting the production backend flag.

## Razorpay live payments

| Variable | Purpose |
|---|---|
| `TRIAL_MODE` | Keep true until production payment tests are complete |
| `PAYMENT_PROVIDER` | `razorpay` only when live mode approved |
| `RAZORPAY_KEY_ID` | Test/live public key ID |
| `RAZORPAY_KEY_SECRET` | Server-only secret |
| `RAZORPAY_WEBHOOK_SECRET` | Server-only webhook signing secret |

Never use live keys in local preview. Do not switch `TRIAL_MODE=false` until durable persistence, refund/support handling and webhook verification are tested.

## Ads / analytics

| Variable or code setting | Purpose |
|---|---|
| `ADS.enabled` in `src/config/ads.ts` | Keep false until AdSense approves the site |
| `ADSENSE_PUB_ID` | Replace placeholder only with approved publisher ID |
| Ad unit IDs in `src/config/ads.ts` | Replace placeholders with real AdSense unit IDs |
| `public/ads.txt` | Must contain the real publisher ID after approval |
| `CF_BEACON_TOKEN` in `preview/analytics.js` | Cloudflare Web Analytics token; currently blank |
| `AD_UNLOCK_SECRET` | Only if rewarded-ad unlock is intentionally enabled; keep feature off otherwise |

## Storage

No R2 credentials are currently required because the app does not integrate R2. If a future R2 integration is approved, add server-only variables such as account ID, bucket, access key ID, secret access key and endpoint via a separately reviewed implementation. Never invent or pre-populate them.

## Before clicking Save in the host dashboard

- Confirm each secret is for the correct production environment.
- Remove whitespace/newlines from copied values.
- Do not put secrets in variables prefixed `VITE_`.
- Restrict dashboard access and enable MFA.
- Record variable *names and purpose* in this file; never record values.
- Rotate any credential that was pasted into Git, chat, logs or a public screenshot.
