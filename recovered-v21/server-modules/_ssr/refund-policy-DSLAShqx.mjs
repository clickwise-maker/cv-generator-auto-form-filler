import { S as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as SiteFooter, s as tr } from "./site-footer-CrbBo0PJ.mjs";
import { t as SiteHeader } from "./site-header-DONlhDL_.mjs";
//#region ../repo/node_modules/.nitro/vite/services/ssr/assets/refund-policy-DSLAShqx.js
var import_jsx_runtime = require_jsx_runtime();
var EMAIL = "team@formzalo.com";
var CONTENT = [{
	id: "en",
	lang: "en",
	heading: "Refund Policy",
	trial: "Note: FormZalo is currently in trial mode. No real payments are being taken yet.",
	sections: [
		{
			title: "1. ₹20 one-time clean download (no watermark)",
			items: ["You can always try the free watermarked download first, so you see exactly what you will get.", "If you paid ₹20 and the PDF/DOCX does not generate, or the download fails because of a technical error on our side, you get a full refund."]
		},
		{
			title: "2. Yearly plans — Career Starter (₹1,000/year) and Global Pro ($29/year)",
			items: ["Full refund if you ask within 7 days of purchase and have not used the plan.", "No refund once credits have been actively used."]
		},
		{
			title: "3. How to request a refund",
			intro: "Email us with:",
			mail: true,
			items: [
				"Payment / order ID",
				"Date of payment",
				"Email address used for the purchase",
				"Reason for the refund"
			]
		},
		{
			title: "4. Processing time",
			items: ["We review your request within 2 working days.", "Approved refunds go back to your original payment method within 5–7 working days."]
		}
	]
}];
function RefundPolicy() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "min-h-screen bg-paper px-4 py-10 text-ink",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "text-xs uppercase tracking-[0.3em] text-ink/60 hover:text-ink",
						children: tr("FormZalo")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 font-serif text-4xl",
						children: tr("Refund Policy")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-ink/70",
						children: tr("Plain and simple.")
					}),
					CONTENT.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: c.id,
						className: "mt-8 rounded-lg border border-line bg-sheet p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl font-semibold",
								children: tr(c.heading)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 rounded border border-line px-3 py-2 text-sm",
								children: tr(c.trial)
							}),
							c.sections.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-semibold",
										children: tr(s.title)
									}),
									s.intro && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 text-sm leading-relaxed",
										children: [s.mail && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												className: "underline",
												href: `mailto:${EMAIL}?subject=Refund%20request`,
												children: EMAIL
											}),
											" ",
											"—",
											" "
										] }), tr(s.intro)]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-2 list-disc space-y-1 ps-5 text-sm leading-relaxed",
										children: s.items?.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: tr(i) }, i))
									})
								]
							}, tr(s.title)))
						]
					}, c.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-8 text-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "underline",
							children: tr("← Back to FormZalo")
						})
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
	] });
}
//#endregion
export { RefundPolicy as component };
