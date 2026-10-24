# Free preview + one-time paid export

## What the app does now
- CV creation, editing, templates, sample/autofill text reading and saving
  (browser `localStorage`) are free and need no login.
- The on-screen preview has two diagonal, semi-transparent watermark lines
  (`WATERMARK_LINES` in `src/lib/payments/config.ts`) tiled once per page length.
- "Preview PDF (watermarked)" builds a PDF in the browser with both lines on
  **every page** (`buildPreviewPdf` → `stampWatermark`).
- Printing the page (Ctrl+P / Save as PDF) prints a notice instead of the CV
  (`@media print` in `src/styles.css`).
- Clean PDF/DOCX come **only** from `POST /api/paid-export/download`, which
  re-checks a server-stored entitlement against the canonical CV data and
  builds the file with the existing `buildPdf` / `buildDocxBuffer`.

The watermark and print CSS are deterrents, not DRM: screenshots, dev tools
and screen capture cannot be prevented. Also note the clean PDF *layout code*
(jsPDF) ships to the browser because the free preview PDF uses it; a technical
user could call it from dev tools. The DOCX builder is server-only. The
server endpoint is what protects the *paid* file path.

## Configuration
| Where | What |
|---|---|
| `src/lib/payments/config.ts` | `EXPORT_PRICE_MINOR` (2900 = ₹29), currency, watermark text, default policy |
| `TRIAL_MODE` (server env) | default `true`. In trial mode live payments are always off. |
| `NODE_ENV=production` | disables the simulated provider |
| `EXPORT_ENTITLEMENT_POLICY` | `version` (default: edits need a new unlock) or `cv` (edits to the same CV stay unlocked) |
| `EXPORT_MAX_DOWNLOADS` | repeat downloads per unlock (default 10, `0` = unlimited) |
| `SIMULATED_PAYMENT_SECRET` | optional, test-only HMAC key for the simulator |
| `PAYMENT_PROVIDER=razorpay`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET` | live payments (NOT set anywhere) |

Modes reported by `GET /api/paid-export/status`:
- `test` – TRIAL_MODE on and not production: simulated payments (success / failure / cancel), clearly labelled TEST; entitlements are flagged `test` and are rejected as soon as the simulator is off.
- `unavailable` – no live provider (e.g. production with TRIAL_MODE on, or static hosting): UI says "Paid clean exports are not yet available".
- `live` – TRIAL_MODE=false + Razorpay keys. (`rzp_test_` keys report `test`.)

## API (`src/routes/api/paid-export/$.ts` → `src/lib/payments/http.server.ts`)
`GET status` · `POST order` · `POST verify` · `POST cancel` · `POST simulate` (test only, 404 otherwise) · `POST webhook/razorpay` · `POST webhook/simulated` · `POST download`.

Guarantees (see `src/lib/payments/payments.test.ts`): server-side price only;
unique random order ids; idempotency key per checkout; one entitlement per
order; webhook signature over raw body + replay de-dupe; amount, currency,
status and order id validated; the browser's success callback is verified
server-side (HMAC signature + payment fetch) before anything is unlocked.

## Persistence — IMPORTANT before going live
Only `MemoryPaymentStore` exists. It loses orders on restart and is not shared
between serverless instances, so it is **not acceptable for live payments**.
The browser keeps just the entitlement id (a receipt reference); browser
storage is not a protection mechanism.

Proposed (NOT created) Supabase schema — server writes with the
service-role key, the browser never touches these tables:

```sql
create table public.export_orders (
  order_id text primary key,
  provider text not null,
  provider_order_id text not null unique,
  idempotency_key text not null unique,
  test boolean not null,
  amount_minor integer not null check (amount_minor > 0),
  currency text not null,
  status text not null check (status in ('created','paid','failed','cancelled')),
  doc_id text not null, version_hash text not null, cv_key text not null,
  payment_id text unique, entitlement_id text unique,
  created_at timestamptz not null default now(), paid_at timestamptz
);
create table public.export_entitlements (
  entitlement_id text primary key,
  order_id text not null unique references public.export_orders(order_id),
  test boolean not null, policy text not null,
  version_hash text not null, cv_key text not null,
  max_downloads integer not null, downloads integer not null default 0,
  created_at timestamptz not null default now()
);
create table public.payment_webhook_events (event_key text primary key, received_at timestamptz not null default now());
alter table public.export_orders enable row level security;
alter table public.export_entitlements enable row level security;
alter table public.payment_webhook_events enable row level security;
-- No policies for anon/authenticated = no browser access. Server uses service role.
```
Implement `PaymentStore` against it (use `insert ... on conflict do nothing`
for events and a conditional `update ... where status='created'` when settling
so concurrent verify + webhook can't double-issue).

## Hosting note
The Render static site (`preview/`) cannot run these endpoints; the paywall UI
there would show "not yet available". The TanStack Start app (`src/`) needs a
Node/serverless host: free options include Vercel Hobby (repo already builds
with the nitro `vercel` preset — note Hobby is for non-commercial use), Render
free Web Service (sleeps when idle), Netlify / Cloudflare (would need a
different nitro preset; untested).

## Enabling live payments later (needs owner approval)
1. Create a Razorpay account, complete KYC; get **test** keys first.
2. Implement the Supabase `PaymentStore` above (migration reviewed and applied by the owner).
3. Deploy the `src/` app to a server host; set env: `TRIAL_MODE=false`, `PAYMENT_PROVIDER=razorpay`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET` (server env only).
4. In Razorpay dashboard add a webhook to `https://<host>/api/paid-export/webhook/razorpay` for `payment.captured`, `payment.failed`, `order.paid`, using the same webhook secret.
5. Run an end-to-end test with `rzp_test_` keys (UI shows TEST), then swap to live keys.
6. Costs: no fixed fee; Razorpay charges a per-transaction fee (≈2% on standard plans + GST — check current pricing). Supabase/Vercel/Render free tiers have limits.
