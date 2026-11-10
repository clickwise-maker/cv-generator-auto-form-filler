import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as tr } from "./site-footer-CrbBo0PJ.mjs";
import { dt as GUIDES, ft as ContentShell } from "./router-BXvCCxej.mjs";
import { t as AdSlot } from "./ad-slot-BWh-g-Rz.mjs";
//#region ../repo/node_modules/.nitro/vite/services/ssr/assets/guides.index-uKxJ6D84.js
var import_jsx_runtime = require_jsx_runtime();
function GuidesIndex() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContentShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-serif text-4xl",
			children: tr("CV and job application guides")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-2xl text-sm text-muted",
			children: tr("Practical, free guides for writing your CV and filling application forms correctly.")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-8 grid gap-4 sm:grid-cols-2",
			"data-testid": "guide-list",
			children: GUIDES.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: `/guides/${g.slug}`,
				className: "block h-full rounded-2xl border border-line bg-sheet p-5 hover:border-forest",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-xl",
					children: tr(g.title)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: tr(g.desc)
				})]
			}) }, g.slug))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 text-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "/templates",
				className: "underline",
				children: tr("Browse the CV templates gallery")
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, { placement: "guides" })
	] });
}
//#endregion
export { GuidesIndex as component };
