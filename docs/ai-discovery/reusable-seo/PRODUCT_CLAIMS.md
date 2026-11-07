# Corrected FormZalo product claims — 7 November 2026 (IST)

Read-only source review; no worktree edits, authentication changes or new production fetch. The owner's computer is offline; public research used the box network. FormZalo was already network-blocked and was NOT retried through alternate UAs, proxies, browser or APIs.

All paths below are relative to `/workspace/formzalo-global-seo-20261107/`. These are code/audit observations, not a fresh end-to-end production test.

| Claim | Actual source read | Safe conclusion |
|---|---|---|
| Sign-in | `src/components/landing/auth-gate.tsx:19-30`; `src/components/studio/preview-doc.tsx:49-59` | Editor/download are gated by signed-in session. Never advertise no-signup. |
| Free PDF | `src/components/studio/preview-doc.tsx:49-59,108-117`; `src/lib/cv/export-pdf.ts:444-446` | Signed-in Color PDF and Plain PDF use the clean browser download path. They are watermark-free. |
| Stale watermark/paid comments | `src/lib/cv/export-pdf.ts:432-441`; `src/routes/api/paid-export/$.ts:15-17,24-36` | Separate preview/paid paths and stale comments exist. They do NOT override the actual free `downloadCvPdf` call. The earlier research's “watermark on free” claim was FALSE and removed. |
| Templates/quota | `src/lib/cv/model.ts:254-272`; `docs/ai-discovery/product-manifest.json:15-33` | Three templates: meridian, consulate, atlas. No numeric daily free quota established; do not promise unlimited. Free DOCX not verified. |
| OCR/input | `src/lib/cv/read-document.ts:6-8,41-63` | 12 × 1024 × 1024 bytes = 12 MiB maximum input; scanned-PDF OCR fallback up to two pages; `createWorker("eng")`. Not 12-language OCR. |
| Assistance | `src/components/studio/form-filler.tsx:133-194`; `docs/ai-discovery/product-manifest.json:49-65` | Local requested-field/profile assistance; audit did not establish arbitrary website autofill, automatic applications, arbitrary PDF write-back, or active generative-model integration. These are not current advertising claims. |
| Billing | `src/routes/api/paid-export/$.ts:24-36`; `docs/ai-discovery/product-manifest.json:67-73` | Server paid routes exist. Prior audit observation was unavailable/trial, no active provider (7 November 2026, 10:56 PM IST, from the timestamp recorded in manifest). This run did not query live status; deployment configuration remains unknown. |
| Public languages | `docs/ai-discovery/product-manifest.json:75-95`; `docs/ai-discovery/README.md:77-79` | Twelve public locales are not twelve fully localized editors, verified Unicode PDF output, country availability or legal clearance. Native review remains pending. |

## Privacy-source contradictions needing review, not silently fixed

`src/routes/privacy-policy.tsx:1-13` renders `src/content/privacy-policy.json` through InfoPage. That JSON says “No account is needed / no login” at lines 11-12 and Hindi lines 75-76; this conflicts with AuthGate. Its paid clean-download wording at lines 18-20 is incomplete relative to the free clean path. Its Render/Google Fonts assertions (39-40), storage description, and English/Hindi advertising descriptions need verification against actual deployment/data flows; they are not certified by this review.

A contact email IS interpolated by `src/components/info-page.tsx:45-56` for the `mail` placeholder. Do not report that the policy has no email merely because JSON says `mail`. Legal controller identity/address, retention periods, processor locations, applicable transfer arrangements and account/cloud persistence explanation are not established by the reviewed policy text. Request the actual controller and data-flow inventory before drafting localized legal notices; do not collect credentials.
