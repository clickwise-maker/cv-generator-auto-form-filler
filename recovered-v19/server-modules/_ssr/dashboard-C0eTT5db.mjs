import { o as __toESM } from "../_runtime.mjs";
import { $ as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as SiteFooter } from "./site-footer-CrbBo0PJ.mjs";
import { t as SiteHeader } from "./site-header-DONlhDL_.mjs";
import { t as ConsentGate } from "./consent-ui-3p1JoNf4.mjs";
import { n as Dashboard, y as useStudio } from "./dashboard-CXG2z3k-.mjs";
import { t as AdSlot } from "./ad-slot-BWh-g-Rz.mjs";
//#region ../repo/node_modules/.nitro/vite/services/ssr/assets/dashboard-C0eTT5db.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DashboardPage() {
	const hydrate = useStudio((state) => state.hydrate);
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-paper text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, { current: "dashboard" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[1fr_300px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:pt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, {
						placement: "dashboard",
						className: "lg:sticky lg:top-24 lg:my-0"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsentGate, { floating: false })
		]
	});
}
//#endregion
export { DashboardPage as component };
