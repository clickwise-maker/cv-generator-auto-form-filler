# cv-generator-auto-form-filler

International CV generator and auto form filler. One profile fills a curriculum vitae, a compact résumé, or consular particulars.

- Read a PDF, photo, or text file in the browser and map the fields it finds.
- Optional photo, passport options, family, travel, and Europass-style sections. Blank lines stay off the file.
- Download PDF or Word. The dossier stays in this browser.

Keywords: auto CV generator, international CV generator, auto form filler, free auto form filler, free CV generator.

## Direct Google OAuth (optional, deployed apps)

By default sign-in federates to the shared auth broker (Google/X secrets stay with the broker).
To sign in with Google directly on a deployed domain, set these env vars:

- `GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_SECRET` (server env, from Google Cloud Console)
- `VITE_GOOGLE_DIRECT=true` (build env, e.g. Vercel)

Callback URL to register in Google Cloud Console: `https://<your-domain>/api/auth/callback/google`

When enabled, the sign-in page shows one “Continue with Google” button that talks to Google
directly; the brokered Google button is hidden (X stays brokered). Without the vars, nothing changes.
