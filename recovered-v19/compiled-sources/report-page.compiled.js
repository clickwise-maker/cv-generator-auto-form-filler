import { o as __toESM } from "../_runtime.mjs";
import { $ as require_react, S as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as SiteFooter, s as tr } from "./site-footer-CrbBo0PJ.mjs";
import { t as SiteHeader } from "./site-header-DONlhDL_.mjs";
import { n as SUPPORT_EMAIL } from "./consent-DPmgtzXN.mjs";
import { r as submitComplaint } from "./client-BAtCw8bu.mjs";
//#region ../repo/node_modules/.nitro/vite/services/ssr/assets/report-CWHadQpV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var inputCls = "h-12 w-full rounded-lg border border-line bg-paper px-3 text-base";
function ReportPage() {
	const [type, setType] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	const [consent, setConsent] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [ref, setRef] = (0, import_react.useState)("");
	async function onSubmit(e) {
		e.preventDefault();
		setErr("");
		if (!type || !name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || message.trim().length < 10 || !consent) {
			setErr(tr("Please fill in all fields correctly."));
			return;
		}
		setBusy(true);
		try {
			const r = await submitComplaint(type, name.trim(), email.trim(), message.trim(), consent);
			setRef(r.complaintId);
		} catch (e) {
			setErr(e.message);
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-paper text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, { current: "report" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-3xl px-4 py-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "text-xs uppercase tracking-[0.3em] text-ink/60 hover:text-ink",
						children: tr("FormZalo")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 font-serif text-4xl",
						children: tr("Report a problem")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-ink/70",
						children: tr("Tell us what went wrong and we will look into it.")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-ink/70",
						children: [
							tr("Support is by email only. We review requests within 2 working days."),
							" ",
							tr("Email"),
							":",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "underline",
								href: `mailto:${SUPPORT_EMAIL}`,
								children: SUPPORT_EMAIL
							})
						]
					}),
					ref ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-8 rounded-lg border border-line bg-sheet p-6",
						"data-testid": "report-success",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: tr("Thank you. Your report was sent — we will look into it.")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: tr("Your reference: {id}", { id: ref })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									className: "underline",
									children: tr("← Back to FormZalo")
								})
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit,
						className: "mt-8 rounded-lg border border-line bg-sheet p-6",
						"data-testid": "report-form",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-sm font-medium",
								htmlFor: "report-type",
								children: tr("Issue type")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "report-type",
								className: `${inputCls} mt-1`,
								value: type,
								onChange: (e) => setType(e.target.value),
								"data-testid": "report-type",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: tr("Issue type")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "not-working",
										children: tr("Something is not working")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "payment",
										children: tr("Payment problem")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "other",
										children: tr("Other")
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mt-4 block text-sm font-medium",
								htmlFor: "report-name",
								children: tr("Your name")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "report-name",
								className: `${inputCls} mt-1`,
								value: name,
								onChange: (e) => setName(e.target.value),
								"data-testid": "report-name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mt-4 block text-sm font-medium",
								htmlFor: "report-email",
								children: tr("Your email")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "report-email",
								type: "email",
								className: `${inputCls} mt-1`,
								value: email,
								onChange: (e) => setEmail(e.target.value),
								"data-testid": "report-email"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mt-4 block text-sm font-medium",
								htmlFor: "report-message",
								children: tr("What happened?")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								id: "report-message",
								rows: 5,
								className: "mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2 text-base",
								value: message,
								onChange: (e) => setMessage(e.target.value),
								"data-testid": "report-message"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "mt-4 flex items-start gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									className: "mt-1",
									checked: consent,
									onChange: (e) => setConsent(e.target.checked),
									"data-testid": "report-consent"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tr("I agree FormZalo may email me about this report.") })]
							}),
							err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm text-red-700",
								role: "alert",
								children: err
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: busy,
								className: "mt-6 flex h-12 items-center justify-center rounded-full bg-forest px-6 text-sm font-medium text-sheet disabled:opacity-60",
								"data-testid": "report-submit",
								children: tr("Send report")
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
export { ReportPage as component };
