import { o as __toESM } from "../_runtime.mjs";
import { $ as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as tr } from "./site-footer-CrbBo0PJ.mjs";
import { a as readConsent, i as giveConsent, n as SUPPORT_EMAIL, r as eraseAllLocalData, t as NOTICE } from "./consent-DPmgtzXN.mjs";
//#region ../repo/node_modules/.nitro/vite/services/ssr/assets/consent-ui-3p1JoNf4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var API = "/api/clients";
async function call(path, init) {
	const res = await fetch(`${API}/${path}`, {
		...init,
		headers: { "content-type": "application/json" }
	});
	const body = await res.json().catch(() => ({}));
	if (!res.ok) throw Object.assign(new Error(body.message ?? "Request failed."), {
		status: res.status,
		code: body.error
	});
	return body;
}
var post = (path, data) => call(path, {
	method: "POST",
	body: JSON.stringify(data)
});
var createClientLink = (entitlementId, guestId, businessName) => post("link", {
	entitlementId,
	guestId,
	businessName
});
var listClients = (entitlementId) => post("list", { entitlementId });
var getClient = (entitlementId, clientId) => post("get", {
	entitlementId,
	clientId
});
var intakeInfo = (token) => call(`intake/${encodeURIComponent(token)}`);
var submitIntake = (token, profile, consent) => post("submit", {
	token,
	profile,
	consent
});
var del = (path, data) => call(path, {
	method: "DELETE",
	body: JSON.stringify(data)
});
var deleteClient = (entitlementId, clientId) => del("client", {
	entitlementId,
	clientId
});
var revokeClientLinks = (entitlementId) => del("link", { entitlementId });
var deleteOwnSubmission = (clientId, deleteKey) => del("self", {
	clientId,
	deleteKey
});
var btn = "h-12 flex-1 rounded-full border-2 border-forest px-4 text-sm font-medium text-forest bg-paper disabled:opacity-40";
/**
* Data-collection notice (EN + Hindi) shown BEFORE data is collected.
* Unticked checkbox; two equal-weight choices; nothing pre-selected.
*/
function ConsentNotice({ title = tr("Before you start"), extra, onKeep, onDelete, testId = "consent-dialog" }) {
	const [ticked, setTicked] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[100] grid place-items-center bg-black/50 p-3",
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "consent-title",
		"data-testid": testId,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-h-[92vh] w-full max-w-md overflow-y-auto rounded-2xl bg-sheet p-5 text-ink shadow-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "consent-title",
					className: "font-serif text-xl text-forest",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 list-disc space-y-1 ps-5 text-sm",
					children: NOTICE.en.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: tr(t) }, t))
				}),
				extra,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-xs text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "underline",
							href: "/privacy",
							target: "_blank",
							rel: "noreferrer",
							children: tr("Privacy notice")
						}),
						" · ",
						SUPPORT_EMAIL
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-3 flex items-start gap-3 rounded-xl bg-paper p-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						className: "mt-1 size-5",
						checked: ticked,
						onChange: (e) => setTicked(e.target.checked),
						"data-testid": "consent-check"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tr("I have read this notice and agree to my data being stored for this purpose. I can withdraw at any time.") })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: btn,
						disabled: !ticked,
						onClick: onKeep,
						"data-testid": "consent-keep",
						children: tr("Keep my data")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: btn,
						onClick: onDelete,
						"data-testid": "consent-delete",
						children: tr("Delete my data")
					})]
				})
			]
		})
	});
}
/** Editor/dashboard gate: blocks the CV editor until the user chooses. */
function ConsentGate({ floating = true } = {}) {
	const [state, setState] = (0, import_react.useState)("unknown");
	(0, import_react.useEffect)(() => {
		const sync = () => setState((s) => readConsent() ? "ok" : s === "declined" ? "declined" : "ask");
		sync();
		window.addEventListener("cvstudio-consent", sync);
		return () => window.removeEventListener("cvstudio-consent", sync);
	}, []);
	if (state === "ok" || state === "unknown") return floating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithdrawFloating, {}) : null;
	if (state === "declined") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[100] grid place-items-center bg-black/50 p-3",
		"data-testid": "consent-declined",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-2xl bg-sheet p-5 text-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-serif text-xl text-forest",
					children: tr("Deleted")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2",
					children: tr("Nothing from FormZalo is stored in this browser now. You can close this tab.")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: `${btn} mt-4 w-full`,
					onClick: () => setState("ask"),
					children: tr("Show the notice again")
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsentNotice, {
		onKeep: () => {
			giveConsent();
			setState("ok");
		},
		onDelete: () => {
			eraseAllLocalData();
			setState("declined");
			setTimeout(() => window.location.reload(), 50);
		}
	});
}
/** Always-visible withdraw control in the editor. */
function WithdrawFloating() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed bottom-24 start-2 z-40 print:hidden sm:bottom-3 sm:start-3",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithdrawButton, {
			className: "rounded-full border border-line bg-sheet/95 px-3 py-1.5 text-[11px] text-ink shadow",
			label: tr("Withdraw consent")
		})
	});
}
function WithdrawButton({ className, label = tr("Withdraw consent & delete my data") }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className,
		"data-testid": "withdraw-consent",
		onClick: () => {
			if (!window.confirm(tr("Withdraw consent and delete all FormZalo data saved in this browser (CVs, drafts, plan key, history)? This cannot be undone."))) return;
			eraseAllLocalData();
			window.location.href = "/";
		},
		children: label
	});
}
//#endregion
export { deleteClient as a, intakeInfo as c, submitIntake as d, createClientLink as i, listClients as l, ConsentNotice as n, deleteOwnSubmission as o, WithdrawButton as r, getClient as s, ConsentGate as t, revokeClientLinks as u };
