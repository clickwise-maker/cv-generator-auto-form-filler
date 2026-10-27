# DPDP Act 2023 — CV Studio status

> Engineering checklist, **not legal advice** and not a claim of legal compliance. Have a lawyer review before relying on it.

## Done (branch `preview/full-app`)
- **Notice before collection** (EN + Hindi pop-up) in the CV editor/dashboard and on the client page `/c/<token>`: data is collected, only to fill forms, keep-or-delete is your choice, CV Studio has no interest in the data.
- **Unticked consent checkbox**; equal-weight “Keep my data” / “Delete my data” buttons, neither pre-selected (Keep is enabled only after ticking).
- Editor stores nothing in `localStorage` until consent; consent timestamp at `cvstudio.consent.v1`.
- **Withdraw consent & delete**: floating button in editor, “Privacy & data” card in dashboard — clears all `meridian*` / `cvstudio*` keys (local + session storage) after confirm.
- Client page: required, unticked checkbox (server also rejects `consent !== true`); “Withdraw consent” button deletes the submitted record via `DELETE /api/clients/self` (record id + secret delete key returned only to the submitter); deletion-by-email note.
- Commercial owners: per-client “Delete client data” (`DELETE /api/clients/client`) and “Revoke share link” (`DELETE /api/clients/link`), both enforcing the commercial entitlement owner check.
- **Retention**: client submissions purged server-side after 180 days (checked at most hourly on API traffic).
- `/privacy` notice (EN + HI): data, purpose, storage, retention, rights, grievance contact `team@clickwisewe24in.we24.in`, breach notification (Board + users, aim ≤72h). Linked in footer.

## Pending
- **Encryption at rest** for client/plan records — pending Supabase migration (`docs/CLIENTS_SUPABASE_MIGRATION.sql`; not applied). Current file store on Render is ephemeral and unencrypted.
- Data Processing terms with processors (Render, payment provider, OCR/AI providers if any) and a record of processors.
- Formal Grievance Officer name/address; consent-manager integration if required by the Rules.
- Verifiable parental consent for users under 18 (no age gate today).
- Legal review of `/privacy` and `/privacy-policy` text, and reconciling the two pages.
- Access/correction requests are handled manually by email.
- Audit log of consent/withdrawal on the server (only client consent time is stored).

## Breach response runbook
1. **Detect & contain** (0–4h): revoke leaked keys/tokens, rotate secrets in Render, disable affected endpoint, snapshot logs.
2. **Assess** (≤24h): what data, whose, how many, how; keep a timeline.
3. **Notify** (aim ≤72h): Data Protection Board of India (in the prescribed form) and affected users by email — nature, extent, likely impact, mitigation, what users should do, contact.
4. **Remediate**: fix root cause, deploy, verify.
5. **Review**: post-mortem, update this doc, retain records.
