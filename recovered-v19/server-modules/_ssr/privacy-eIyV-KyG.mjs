import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as SiteFooter, s as tr } from "./site-footer-CrbBo0PJ.mjs";
import { t as SiteHeader } from "./site-header-DONlhDL_.mjs";
import { n as SUPPORT_EMAIL } from "./consent-DPmgtzXN.mjs";
//#region ../repo/node_modules/.nitro/vite/services/ssr/assets/privacy-eIyV-KyG.js
var import_jsx_runtime = require_jsx_runtime();
var EN = [
	["Who we are", [`FormZalo ("we") is a CV builder and form-filling tool. Contact / Grievance Officer: {email} (we aim to reply within 2 working days).`]],
	["Data we collect", [
		"CV editor: the details you type or upload (name, contact details, date of birth, address, ID/passport numbers if you enter them, education, experience, skills, photo).",
		"Plan & usage: an anonymous guest id, your plan key, download/form-fill counts and the company names you fill forms for.",
		"Business (Commercial) clients: details a client submits through a share link, the time of consent and submission.",
		"Payments are processed by the payment provider; we do not store card numbers."
	]],
	["Purpose", ["Only to build your CV and fill your forms, and to count plan usage. We do not sell your data or use your CV data for profiling. Ads, if switched on, appear only on content pages and may use Google advertising cookies (see the full privacy policy). FormZalo has no interest in your data beyond this purpose."]],
	["Consent", ["We ask before storing your data, with an unticked box. You can withdraw consent at any time with “Withdraw consent & delete my data” (editor and dashboard) or “Withdraw consent” on a client link page. Withdrawing is as easy as giving consent."]],
	["Where it is stored", ["Your CVs and drafts are stored in your own browser (localStorage) on your device. They are not uploaded unless you use a feature that needs the server (e.g. reading a document, checkout).", "Client submissions and plan records are stored on our server (hosted on Render). Encryption at rest of these records is planned as part of a database migration and is not yet complete."]],
	["Retention", ["Browser data: kept until you delete it (withdraw consent, or clear site data).", `Client submissions: automatically deleted after {days} days, or earlier when the client or the business deletes them.`]],
	["Your rights", ["You may ask to access, correct or erase your data, withdraw consent, nominate another person, and raise a grievance. Email us; if you are not satisfied with our response you may approach the Data Protection Board of India."]],
	["Data breaches", ["If a personal data breach occurs, we will inform affected users and the Data Protection Board of India without delay, and aim to do so within 72 hours of becoming aware of it."]],
	["Note", ["This notice describes our practices in plain language. It is not legal advice."]]
];
function Block({ secs }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-4",
		children: secs.map(([h, ps]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-serif text-lg text-forest",
			children: tr(h)
		}), ps.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm leading-relaxed",
			children: tr(p, {
				email: SUPPORT_EMAIL,
				days: 180
			})
		}, p))] }, h))
	});
}
function PrivacyPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-paper text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-3xl px-4 py-6",
				"data-testid": "privacy-page",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-serif text-3xl text-forest",
						children: tr("Privacy notice")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: tr("Last updated: 27 October 2026 · Digital Personal Data Protection Act, 2023 (India)")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, { secs: EN })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-8 text-sm",
						children: [
							tr("Contact"),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "underline",
								href: `mailto:{email}`,
								children: SUPPORT_EMAIL
							}),
							" · ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "underline",
								href: "/privacy-policy",
								children: tr("Full privacy policy")
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { PrivacyPage as component };
