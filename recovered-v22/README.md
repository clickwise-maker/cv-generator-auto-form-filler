# recovered-v22 — header logo (live 2026-11-10 09:45 IST)
Worker `formzolo` version `8d51a505-1065-40c7-9cd2-0e08e33a3917`, deployment `bdc58b60-93ca-40ad-ae05-0797697d3182` (2026-11-10 04:15:18 UTC = 09:45:18 IST), overlay on `f4f320aa-3f38-404f-9b63-864866526000` (v21 overlay, see `../recovered-v21/`).

Only change: the header's text monogram `FZ` (`_ssr/site-header-DONlhDL_.mjs` and the client chunk) became `<img src="/logo-header.png" alt="FormZalo" width="36" height="36" class="size-9 shrink-0 rounded-full">` (108px icon-only badge, same 36px box). The wordmark text is unchanged.
Immutable-cache safety: the 31 client chunks that import the header chunk (transitively) were republished as `*-t22.js` (`overlay-v22/rename-map.json`); `index.mjs` and the start manifest point to them. `-t21` files stay for cached pages.
`overlay-v22/final-template.js` is the publish script with no token (JWT placeholder). Rollback target if needed: f4f320aa.
