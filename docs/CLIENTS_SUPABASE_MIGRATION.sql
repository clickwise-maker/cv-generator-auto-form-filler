-- PROPOSED migration for the Commercial "Clients" feature. NOT APPLIED.
-- Review before running. Today (preview) the app uses FileClientStore
-- (src/lib/clients/store.server.ts): in-memory + /tmp JSON snapshot, which is
-- LOST on every Render restart/redeploy.
--
-- Access model: the browser never talks to these tables directly. The server
-- (service_role) verifies the owner's commercial entitlement and filters by
-- owner_entitlement_id. RLS is enabled with NO anon/authenticated policies, so
-- only service_role can read/write. If real user accounts are added later, add
-- an owner_user_id column and policies `using (owner_user_id = auth.uid())`.

create table if not exists public.client_links (
  token               text primary key,              -- unguessable, >= 18 random bytes
  owner_entitlement_id text not null,
  owner_guest_id      text,
  business_name       text not null check (char_length(business_name) <= 80),
  created_at          timestamptz not null default now(),
  revoked_at          timestamptz
);
create index if not exists client_links_owner_idx on public.client_links (owner_entitlement_id);

create table if not exists public.client_submissions (
  client_id           text primary key,
  token               text not null references public.client_links(token) on delete cascade,
  owner_entitlement_id text not null,
  name                text not null check (char_length(name) between 1 and 300),
  profile             jsonb not null,                -- sanitised Profile (existing model fields only)
  consent_at          timestamptz not null,
  submitted_at        timestamptz not null default now()
);
create index if not exists client_submissions_owner_idx on public.client_submissions (owner_entitlement_id, submitted_at desc);

alter table public.client_links enable row level security;
alter table public.client_submissions enable row level security;
alter table public.client_links force row level security;
alter table public.client_submissions force row level security;

revoke all on public.client_links from anon, authenticated;
revoke all on public.client_submissions from anon, authenticated;
-- No policies for anon/authenticated => deny all. service_role bypasses RLS.

-- Optional retention (personal data): purge submissions older than 1 year.
-- delete from public.client_submissions where submitted_at < now() - interval '1 year';
