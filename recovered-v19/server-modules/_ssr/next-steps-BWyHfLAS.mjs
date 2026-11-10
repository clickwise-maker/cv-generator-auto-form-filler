import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as tr } from "./site-footer-CrbBo0PJ.mjs";
import { dt as GUIDES, ft as ContentShell } from "./router-BXvCCxej.mjs";
//#region ../repo/node_modules/.nitro/vite/services/ssr/assets/next-steps-BWyHfLAS.js
var import_jsx_runtime = require_jsx_runtime();
var CHECKLIST = [
	"Open the downloaded file once and check names, dates and contact details.",
	"Rename the file with your name if the employer asks for a specific format.",
	"Write a short cover letter for each application.",
	"Keep a list of where you applied and on which date."
];
function NextSteps() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContentShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-serif text-4xl",
			children: tr("After you download your CV")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted",
			children: tr("Your file has been prepared. Here is what to do before you send it.")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-6 list-decimal space-y-2 ps-5",
			"data-testid": "next-checklist",
			children: CHECKLIST.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: tr(c) }, c))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-10 font-serif text-2xl",
			children: tr("Helpful guides")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 grid gap-3 sm:grid-cols-2",
			children: GUIDES.slice(0, 6).map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: `/guides/${g.slug}`,
				className: "block rounded-xl border border-line bg-sheet p-4 text-sm hover:border-forest",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold",
					children: tr(g.title)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 block text-muted",
					children: tr(g.desc)
				})]
			}) }, g.slug))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-10 text-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "/",
				className: "underline",
				children: tr("← Back to FormZalo")
			})
		})
	] });
}
//#endregion
export { NextSteps as component };
