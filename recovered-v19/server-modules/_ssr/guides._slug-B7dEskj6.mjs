import { o as __toESM } from "../_runtime.mjs";
import { $ as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as tr } from "./site-footer-CrbBo0PJ.mjs";
import { S as Route$11, dt as GUIDES, ft as ContentShell } from "./router-BXvCCxej.mjs";
import { t as AdSlot } from "./ad-slot-BWh-g-Rz.mjs";
//#region ../repo/node_modules/.nitro/vite/services/ssr/assets/guides._slug-B7dEskj6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GuidePage() {
	const g = Route$11.useLoaderData();
	const others = GUIDES.filter((x) => x.slug !== g.slug).slice(0, 4);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContentShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-3xl",
		"data-testid": "guide-article",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "/guides",
				className: "text-xs uppercase tracking-[0.2em] text-muted",
				children: tr("Guides")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-serif text-4xl",
				children: tr(g.title)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-base text-muted",
				children: tr(g.lead)
			}),
			g.sections.map(([h, items], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-2xl",
					children: tr(h)
				}), items.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 leading-relaxed",
					children: tr(p)
				}, p))]
			}), i === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, { placement: "guides" }) : null] }, h)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12 rounded-2xl border border-line bg-sheet p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-semibold",
					children: tr("More guides")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 list-disc space-y-1 ps-5 text-sm",
					children: others.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "underline",
						href: `/guides/${o.slug}`,
						children: tr(o.title)
					}) }, o.slug))
				})]
			})
		]
	}) });
}
//#endregion
export { GuidePage as component };
