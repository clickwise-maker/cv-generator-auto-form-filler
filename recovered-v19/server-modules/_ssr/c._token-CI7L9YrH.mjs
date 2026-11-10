import { o as __toESM } from "../_runtime.mjs";
import { $ as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as tr } from "./site-footer-CrbBo0PJ.mjs";
import { E as Route$16 } from "./router-BXvCCxej.mjs";
import { n as SUPPORT_EMAIL } from "./consent-DPmgtzXN.mjs";
import { c as intakeInfo, d as submitIntake, n as ConsentNotice, o as deleteOwnSubmission } from "./consent-ui-3p1JoNf4.mjs";
//#region ../repo/node_modules/.nitro/vite/services/ssr/assets/c._token-CI7L9YrH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** [model field, English label, Hindi label, input type] — existing Personal fields only. */
var FIELDS = [
	[
		"givenName",
		"First name *",
		"पहला नाम *"
	],
	[
		"familyName",
		"Surname",
		"उपनाम"
	],
	[
		"fatherName",
		"Father's name",
		"पिता का नाम"
	],
	[
		"motherName",
		"Mother's name",
		"माता का नाम"
	],
	[
		"dateOfBirth",
		"Date of birth",
		"जन्म तिथि",
		"date"
	],
	[
		"placeOfBirth",
		"Place of birth",
		"जन्म स्थान"
	],
	[
		"sex",
		"Gender",
		"लिंग",
		"sex"
	],
	[
		"maritalStatus",
		"Marital status",
		"वैवाहिक स्थिति",
		"marital"
	],
	[
		"nationality",
		"Nationality",
		"राष्ट्रीयता"
	],
	[
		"phone",
		"Mobile number",
		"मोबाइल नंबर",
		"tel"
	],
	[
		"email",
		"Email",
		"ईमेल",
		"email"
	],
	[
		"street",
		"Address",
		"पता"
	],
	[
		"city",
		"City",
		"शहर"
	],
	[
		"region",
		"State",
		"राज्य"
	],
	[
		"postalCode",
		"PIN code",
		"पिन कोड"
	],
	[
		"country",
		"Country",
		"देश"
	],
	[
		"nationalId",
		"National ID (e.g. Aadhaar)",
		"राष्ट्रीय पहचान (जैसे आधार)"
	],
	[
		"passportNumber",
		"Passport number",
		"पासपोर्ट नंबर"
	],
	[
		"positionApplied",
		"Post applied for",
		"आवेदित पद"
	]
];
var EDU = [
	[
		"qualification",
		"Qualification (e.g. 10th, 12th, B.A.)",
		"योग्यता"
	],
	[
		"institution",
		"School / College / Board",
		"स्कूल / कॉलेज / बोर्ड"
	],
	[
		"field",
		"Subject / Stream",
		"विषय"
	],
	[
		"end",
		"Year passed",
		"उत्तीर्ण वर्ष"
	],
	[
		"details",
		"Marks / Grade",
		"अंक / ग्रेड"
	]
];
var SEXES = [
	"Female",
	"Male",
	"Unspecified"
];
var MARITAL = [
	"Single",
	"Married",
	"Registered partnership",
	"Separated",
	"Divorced",
	"Widow(er)",
	"Other"
];
var input = "h-12 w-full rounded-lg border border-line bg-paper px-3 text-base";
function L({ en, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-medium",
			children: tr(en)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1",
			children
		})]
	});
}
function IntakePage() {
	const { token } = Route$16.useParams();
	const [biz, setBiz] = (0, import_react.useState)(null);
	const [state, setState] = (0, import_react.useState)("loading");
	const [error, setError] = (0, import_react.useState)("");
	const [p, setP] = (0, import_react.useState)({
		phoneCode: "+91",
		country: "India"
	});
	const [edu, setEdu] = (0, import_react.useState)([{}]);
	const [consent, setConsent] = (0, import_react.useState)(false);
	const [noticeDone, setNoticeDone] = (0, import_react.useState)("no");
	const [sub, setSub] = (0, import_react.useState)(null);
	const [withdrawn, setWithdrawn] = (0, import_react.useState)(false);
	const SUB_KEY = `cvstudio.intake.${token}`;
	(0, import_react.useEffect)(() => {
		try {
			const v = JSON.parse(localStorage.getItem(SUB_KEY) ?? "null");
			if (v?.clientId) setSub(v);
		} catch {}
	}, [SUB_KEY]);
	async function withdraw() {
		if (!window.confirm(tr("Withdraw consent and delete the details you sent?"))) return;
		if (sub) try {
			await deleteOwnSubmission(sub.clientId, sub.deleteKey);
		} catch (err) {
			return setError(err instanceof Error ? err.message : tr("Failed"));
		}
		try {
			localStorage.removeItem(SUB_KEY);
		} catch {}
		setSub(null);
		setP({
			phoneCode: "+91",
			country: "India"
		});
		setEdu([{}]);
		setConsent(false);
		setWithdrawn(true);
		setState("ready");
		setNoticeDone("no");
	}
	(0, import_react.useEffect)(() => {
		intakeInfo(token).then((r) => {
			setBiz(r.businessName);
			setState("ready");
		}, () => setState("invalid"));
	}, [token]);
	async function submit(e) {
		e.preventDefault();
		setError("");
		if (!p.givenName?.trim()) return setError(tr("Name is required"));
		if (!consent) return setError(tr("Please tick the consent box"));
		setState("sending");
		try {
			const r = await submitIntake(token, {
				personal: p,
				education: edu
			}, true);
			const keep = {
				clientId: r.clientId,
				deleteKey: r.deleteKey
			};
			setSub(keep);
			try {
				localStorage.setItem(SUB_KEY, JSON.stringify(keep));
			} catch {}
			setState("done");
		} catch (err) {
			setError(err instanceof Error ? err.message : tr("Failed"));
			setState("ready");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-paper text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "border-b border-line px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-serif text-lg",
				children: tr("FormZalo")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: tr("Secure client details form")
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-xl px-4 py-6",
			"data-testid": "intake",
			children: [
				state === "ready" && noticeDone === "no" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsentNotice, {
					testId: "intake-consent-dialog",
					title: tr("{biz} is asking for your details", { biz: biz ?? tr("This business") }),
					extra: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm",
						children: tr("Shared only with {biz} to fill your forms. Auto-deleted after {days} days.", {
							biz: biz ?? "",
							days: 180
						})
					}),
					onKeep: () => setNoticeDone("keep"),
					onDelete: () => {
						setNoticeDone("delete");
						(sub ? deleteOwnSubmission(sub.clientId, sub.deleteKey).catch(() => void 0) : Promise.resolve()).then(() => {
							try {
								localStorage.removeItem(SUB_KEY);
							} catch {}
							setSub(null);
						});
					}
				}) : null,
				noticeDone === "delete" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 rounded-xl border border-line bg-sheet p-4 text-sm",
					"data-testid": "intake-declined",
					children: [tr("Nothing was collected and nothing is stored. You can close this page."), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mt-2 block underline text-forest",
						onClick: () => setNoticeDone("no"),
						children: tr("Show the notice again")
					})]
				}) : null,
				withdrawn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 rounded-xl bg-sheet p-3 text-sm",
					"data-testid": "intake-withdrawn",
					children: tr("Consent withdrawn; your submitted details were deleted.")
				}) : null,
				state === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: tr("Loading…") }) : null,
				state === "invalid" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-testid": "intake-invalid",
					children: tr("This link is not valid or has expired.")
				}) : null,
				state === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-forest bg-sheet p-4",
					"data-testid": "intake-done",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-serif text-xl text-forest",
							children: tr("Thank you!")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm",
							children: tr("Your details were sent to {biz}.", { biz: biz ?? "" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted",
							children: tr("They are auto-deleted after {days} days.", { days: 180 })
						})
					]
				}) : null,
				(state === "ready" || state === "sending") && noticeDone === "keep" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-serif text-2xl text-forest",
							children: tr("Share your details with {biz}", { biz: biz ?? "" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: tr("They will use them to fill application forms for you.")
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: FIELDS.map(([k, en, hi, type]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(L, {
								en,
								hi,
								children: type === "sex" || type === "marital" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: input,
									name: k,
									value: p[k] ?? "",
									onChange: (e) => setP({
										...p,
										[k]: e.target.value
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "—"
									}), (type === "sex" ? SEXES : MARITAL).map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: o,
										children: tr(o)
									}, o))]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: input,
									name: k,
									type: type ?? "text",
									required: k === "givenName",
									value: p[k] ?? "",
									onChange: (e) => setP({
										...p,
										[k]: e.target.value
									})
								})
							}, k))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
							className: "rounded-xl border border-line p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
									className: "px-1 text-sm font-medium",
									children: tr("Education")
								}),
								edu.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mb-3 grid gap-2 border-b border-line pb-3 sm:grid-cols-2",
									children: EDU.map(([k, en, hi]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(L, {
										en,
										hi,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											className: input,
											name: `edu${i}.${k}`,
											value: row[k] ?? "",
											onChange: (e) => setEdu(edu.map((r, j) => j === i ? {
												...r,
												[k]: e.target.value
											} : r))
										})
									}, k))
								}, i)),
								edu.length < 6 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "h-11 text-sm font-medium text-forest underline",
									onClick: () => setEdu([...edu, {}]),
									children: tr("+ Add education")
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-start gap-3 rounded-xl bg-sheet p-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								className: "mt-1 size-5",
								name: "consent",
								required: true,
								"data-testid": "intake-consent",
								checked: consent,
								onChange: (e) => setConsent(e.target.checked)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tr("I agree my details are shared with {biz} for form filling.", { biz: biz ?? "" }) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							"data-testid": "intake-deletion-note",
							children: [
								tr("To delete your details later, use “Withdraw consent” below or email"),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									className: "underline",
									href: `mailto:${SUPPORT_EMAIL}`,
									children: SUPPORT_EMAIL
								}),
								" ",
								tr("with the business name. See our"),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									className: "underline",
									href: "/privacy",
									children: tr("privacy notice")
								}),
								". / बाद में विवरण हटवाने के लिए नीचे “सहमति वापस लें” दबाएँ या ईमेल करें।"
							]
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-red-700",
							role: "alert",
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: state === "sending",
							className: "h-12 w-full rounded-full bg-forest text-sheet font-medium",
							"data-testid": "intake-submit",
							children: state === "sending" ? tr("Sending…") : tr("Submit")
						})
					]
				}) : null,
				state !== "loading" && state !== "invalid" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 border-t border-line pt-4 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-11 rounded-full border-2 border-red-700 px-4 font-medium text-red-700",
						onClick: () => void withdraw(),
						"data-testid": "intake-withdraw",
						children: tr("Withdraw consent")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted",
						children: tr("Or email {email} to request deletion.", { email: SUPPORT_EMAIL })
					})]
				}) : null,
				error && state === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-red-700",
					role: "alert",
					children: error
				}) : null
			]
		})]
	});
}
//#endregion
export { IntakePage as component };
