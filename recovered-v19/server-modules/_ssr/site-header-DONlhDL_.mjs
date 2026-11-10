import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as tr, t as LanguageSelect } from "./site-footer-CrbBo0PJ.mjs";
//#region ../repo/node_modules/.nitro/vite/services/ssr/assets/site-header-DONlhDL_.js
var import_jsx_runtime = require_jsx_runtime();
/**
* One shared header for every page (front-look fix #3): the same FormZalo
* brand and the same nav links everywhere. Before this, the homepage header
* had only Guides + Dashboard, other pages had a fuller nav, and the About
* page had no header nav at all.
*/
function SiteHeader({ current }) {
	const link = (active) => `h-11 content-center px-2 text-sm font-medium ${active ? "text-ink underline underline-offset-4" : "text-forest"}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-wrap items-center gap-x-1 gap-y-0 px-4 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "/",
					className: "me-2 flex items-center gap-3",
					"aria-label": "FormZalo home",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-9 shrink-0 place-items-center rounded-lg bg-forest font-serif text-sm text-sheet",
						"aria-hidden": true,
						children: "FZ"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-serif text-lg leading-none",
							children: "FormZalo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block truncate text-xs text-muted",
							children: tr("Guest mode — no email, phone or OTP needed")
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "ms-auto flex flex-wrap items-center",
					"aria-label": tr("Main"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/",
							className: link(current === "editor"),
							children: tr("CV generator")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/templates",
							className: link(current === "templates"),
							children: tr("Templates")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/guides",
							className: link(current === "guides"),
							children: tr("Guides")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/dashboard",
							className: link(current === "dashboard"),
							children: tr("Dashboard")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/about",
							className: link(current === "about"),
							children: tr("About & Contact")
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageSelect, {})
			]
		})
	});
}
//#endregion
export { SiteHeader as t };
