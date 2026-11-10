# recovered-v21 — live v23 (2026-11-10 09:30 IST): new logo + `team@formzalo.com`

Published as Worker `formzolo` version `f4f320aa-3f38-404f-9b63-864866526000`, deployment `dba931af-36e3-4554-9a88-f28872fa21a7`
(2026-11-10 04:00:35 UTC = 09:30:35 IST), as an overlay on top of the live v20/v22 base (`3890d8ab…` / `d7d4103e…`, identical code).

What changed vs v20 (and nothing else):
1. Logo images replaced/added (see `logo/`, `client-root/`): `/favicon.svg`, `/__grok/icon-180.png`, `/og.jpg`, plus new `/favicon.ico`, `/favicon-32.png`, `/favicon-16.png`, `/apple-touch-icon.png`, `/icon-192.png`, `/icon-512.png`, `/icon-maskable-512.png`, `/logo.png`, `/logo-512.png`.
2. Every `partners@formzalo.com` -> `team@formzalo.com` in the 6 server modules that held it, the manifest, `llms.txt` and the client chunks.
3. Because `/assets/*` is `immutable` for a year, every client chunk that contained the email, or imports one that does (40 of 50 JS files), was published under a NEW filename (`<old-name>-t21.js`, map in `overlay-v21/rename-map.json`). Old files remain in the asset set for already-cached pages. `index.mjs` and the start manifest reference the new names.

Not changed: the header brand mark is a text monogram ("FZ") in code, not an image; the PWA manifest name is still "Grok App" (in worker code); behaviour, payments, auth, DNS and security untouched.

The v19 archive in `../recovered-v19/` is deliberately left as exact v19 bytes (those files still contain `partners@formzalo.com`; compiled-sources and docs were updated).
`overlay-v21/publish-v21-overlay.template.js` is the publish script with the large literals stripped (no tokens included); `overlay-v21/local-prelaunch-test.mjs` is the Playwright harness that served the patched Worker locally before deploy.
