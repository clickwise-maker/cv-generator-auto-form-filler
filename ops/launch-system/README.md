# AiFormPilot — Launch & Operations System

**Purpose:** One source of truth for the accounts, infrastructure, setup order, launch checks, advertising and ongoing operations of the existing CV Generator / Auto Form Filler.

> Status snapshot: 30 October 2026. This is an implementation/runbook product, not proof that external accounts have been created or production credentials configured. Re-check vendor pricing and policies before activation.

## Start here

1. [Account map — where to sign in and what to create](./ACCOUNT_MAP.md)
2. [System architecture — how the website works end to end](./ARCHITECTURE.md)
3. [Environment variables — what goes into the host, never Git](./ENVIRONMENT_VARIABLES.md)
4. [Ads, analytics and growth](./ADS_AND_GROWTH.md)
5. [Launch checklist — ordered tasks and acceptance tests](./LAUNCH_CHECKLIST.md)

## Operating principles

- Keep the existing app and its Better Auth architecture. Do not replace it with Clerk or rebuild the product.
- Prefer accounts and infrastructure already owned by the project. No paid upgrade, domain purchase, API credit, or subscription without owner approval.
- Never put API keys, OAuth secrets, database URLs, service-role keys, SMTP passwords, payment secrets or webhook secrets in Git, browser code, screenshots or public issues.
- Keep CV/profile content in the browser by default. Do not upload it to cloud storage without a clear user-facing reason and consent.
- Do not enable ads in the CV editor, form filler, login, checkout or payment screens.
- Do not enable live payments until order/entitlement persistence is durable and webhook tests pass.
- Separate **implemented in source**, **configured in a provider dashboard**, and **verified live**. These are three different statuses.

## Current project snapshot

| Area | Repository evidence | Current status |
|---|---|---|
| Frontend / app | TanStack Start + React + Vite, Node server build scripts | Existing app; preserve it |
| Authentication | Better Auth + shared Grok Auth broker; Google and X providers | Source exists; deployed broker credentials are environment-provided |
| Email/password | `src/lib/auth/email-password.ts` | Disabled by default; UI and reset-email delivery need completion/verification |
| Auth database | Postgres via `DATABASE_URL`; PGLite fallback | PGLite is not durable across process restarts |
| CV profile storage | Browser localStorage, with consent/erase controls | No cloud sync by default |
| Commercial client records | File store plus Supabase adapter and proposed SQL migration | Durable Supabase path must be configured and verified before real client data |
| Payments | Razorpay provider code + simulated provider; Supabase store adapter exists | Live provider and durable persistence are not yet verified |
| Ads | AdSense slots/config/tests exist | Disabled; publisher and unit IDs are placeholders |
| Analytics | Cloudflare Web Analytics bootstrap file | Token is blank; not active |
| Object storage | Cloudflare R2 account/bucket has been discussed previously | No R2 integration found in current app source |
| Deployment | Node build scripts for Render; Vercel install config | Choose and verify the production Node host; static preview is not the full app |

## Definition of done

The launch is not complete until:
- production URL and HTTPS work;
- Google and email/password sign-in both work;
- password reset email arrives and reset link is single-use/expiring;
- user sessions and auth records survive a redeploy;
- profile data behavior is accurately described to users;
- client/payment records persist and are owner-scoped;
- payment test mode and webhook replay tests pass before live mode;
- AdSense approval is received before replacing placeholder IDs;
- privacy, terms, refund and support details are correct;
- a tested backup/restore and account deletion path exists.
