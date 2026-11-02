# End-to-end website architecture

## User journey

1. Visitor lands on the public homepage and can inspect templates/guides.
2. Visitor starts the CV builder. The existing app can keep a draft in browser storage; show a clear consent notice before persistence.
3. Visitor imports a PDF/DOCX/image or enters details. Parsing/export happens in the browser/server paths already present in the project.
4. Visitor previews the CV. Watermarked preview and paid clean export are separate paths.
5. Visitor chooses an account only when a feature needs identity (cloud sync, multiple devices, account recovery, commercial clients, saved history). Keep guest editing available if product policy allows.
6. User signs in through Google/X broker or email/password (once enabled).
7. Better Auth creates/reads the user and session in the app's Postgres database.
8. User creates a clean export or form fill. Payment order is created server-side; provider checkout runs on the provider's hosted page.
9. Server verifies payment signature and fetches the payment status/amount. A webhook is verified and deduplicated. Only then is an entitlement issued.
10. Optional client intake: owner creates a share link; client sees notice and unticked consent; client submits; owner can view/delete/revoke; retention job purges old submissions.
11. Public content pages may show approved ads. Never place ads in the editor, form fields, login, checkout or sensitive client page.

## Data map

| Data | Current location / code | Production rule |
|---|---|---|
| CV profile and draft | Browser localStorage; consent helper in `src/lib/privacy/consent.ts` | Keep local by default; cloud sync only with explicit consent |
| Uploaded source file | Browser-side reading/import path | Do not silently upload; delete temporary server copies |
| User identity/session | Better Auth tables in Postgres when `DATABASE_URL` is set | Durable Postgres required; PGLite is preview/dev fallback |
| Client links/submissions | File store by default; Supabase adapter + proposed migration | Do not accept real commercial client data until durable Supabase storage is configured and tested |
| Orders/entitlements/webhook IDs | Memory store by default; Supabase adapter + proposed migration | Do not enable live payments until durable store is active |
| Static assets | Repo `public/` | Keep non-sensitive assets only |
| Large private files | No R2 integration in current source | R2 is optional future work; private bucket + signed URLs |

## Current authentication flow

```text
Browser
  └─ Better Auth client (/api/auth/* on this app)
       ├─ Google button → shared auth broker → Google
       ├─ X button      → shared auth broker → X
       └─ Email/password → local Better Auth (currently disabled)
              │
              └─ Postgres DATABASE_URL (PGLite fallback in preview/dev)
```

The current source uses `GROK_AUTH_ISSUER`, `GROK_AUTH_CLIENT_ID`, and `GROK_AUTH_CLIENT_SECRET` for deployed broker federation. The app does not currently use a direct Google provider client. The broker's preview client is not a production app credential.

## Current payments flow

```text
Browser → app server creates order → Razorpay hosted checkout
  → browser callback / Razorpay webhook
  → server verifies signature + provider payment record
  → durable order + entitlement + webhook event
  → server-authorized clean PDF/DOCX export
```

Do not trust a browser success message. Do not enable live checkout with memory-only order/entitlement storage.

## Hosting shape

- Run the full app as a Node server using `npm run build:render` and `npm start`.
- The `preview/` folder is a static preview and does not provide the full API/auth/payment backend.
- Production must set `BETTER_AUTH_URL` to the final HTTPS origin and a durable `DATABASE_URL`.
- Configure a health check and monitor server errors, database connectivity, email delivery and payment webhook failures.

## Inspiration from FlowCV

Reference reviewed: https://flowcv.com/ and https://flowcv.com/pricing

Observed product patterns from its public pages:
- one free resume with unlimited PDF downloads and no watermark on its free plan;
- guided template → experience → layout → export journey;
- save progress in an account, but allow users to begin without signup;
- useful public templates and guides create discoverable content;
- separate advanced features from the core free workflow.

AiFormPilot can adapt the journey without copying its brand, wording, template designs or proprietary implementation. The differentiator remains international master profile + CV + auto form filling + client intake.
