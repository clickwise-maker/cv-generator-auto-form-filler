-- PROPOSED migration for durable storage of plans/credits (entitlements), orders and
-- Commercial clients. *** NOT APPLIED. Review before running. ***
-- Code: src/lib/db/supabase-rest.server.ts, src/lib/payments/store.supabase.server.ts,
--       src/lib/clients/store.supabase.server.ts
-- Enable on Render ONLY after applying: STORE_BACKEND=supabase, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
-- (server-only secret). Without these the app keeps using the memory/file stores.
-- Access: server uses service_role; RLS on with NO anon/authenticated policies.
-- Encryption at rest: Supabase encrypts storage volumes (AES-256); for extra protection of
-- client profiles consider pgsodium / Vault column encryption (DPDP_COMPLIANCE.md "pending").

create table if not exists public.cv_orders (
  order_id          text primary key,
  provider_order_id text not null,
  idempotency_key   text not null,
  status            text not null,
  data              jsonb not null,
  updated_at        timestamptz not null default now()
);
create unique index if not exists cv_orders_provider_idx on public.cv_orders (provider_order_id);
create unique index if not exists cv_orders_idem_idx on public.cv_orders (idempotency_key);

create table if not exists public.cv_entitlements (
  entitlement_id text primary key,
  order_id       text not null,
  plan_id        text,
  data           jsonb not null,
  updated_at     timestamptz not null default now()
);

create table if not exists public.cv_webhook_events (
  event_key   text primary key,
  received_at timestamptz not null default now()
);

create table if not exists public.cv_client_links (
  token                text primary key,
  owner_entitlement_id text not null,
  revoked              boolean not null default false,
  data                 jsonb not null,
  created_at           timestamptz not null default now()
);
create index if not exists cv_client_links_owner_idx on public.cv_client_links (owner_entitlement_id);

create table if not exists public.cv_client_submissions (
  client_id            text primary key,
  token                text not null references public.cv_client_links(token) on delete cascade,
  owner_entitlement_id text not null,
  submitted_at         timestamptz not null default now(),
  data                 jsonb not null
);
create index if not exists cv_client_submissions_owner_idx on public.cv_client_submissions (owner_entitlement_id);
create index if not exists cv_client_submissions_age_idx on public.cv_client_submissions (submitted_at);

alter table public.cv_orders              enable row level security;
alter table public.cv_entitlements        enable row level security;
alter table public.cv_webhook_events      enable row level security;
alter table public.cv_client_links        enable row level security;
alter table public.cv_client_submissions  enable row level security;
-- No policies on purpose: only service_role (server) can access.

-- Optional: DPDP 180-day retention via pg_cron (app also purges hourly on API traffic).
-- select cron.schedule('cv_client_retention', '17 3 * * *',
--   $$delete from public.cv_client_submissions where submitted_at < now() - interval '180 days'$$);
