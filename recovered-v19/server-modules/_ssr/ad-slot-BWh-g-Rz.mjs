import { o as __toESM } from "../_runtime.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { $ as require_react, m as useLocation, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as tr } from "./site-footer-CrbBo0PJ.mjs";
import { F as ADSENSE_PUB_ID, L as adAllowed, P as ADS } from "./router-BXvCCxej.mjs";
//#region ../repo/node_modules/.nitro/vite/services/ssr/assets/ad-slot-BWh-g-Rz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** UI-only state. Profile data stays in the single studio store, shared by both modes. */
var useMode = create((set) => ({
	mode: "generator",
	detected: null,
	source: "",
	formText: "",
	setMode: (mode) => set({ mode }),
	setDetected: (detected, source = "", formText = "") => set({
		detected,
		source,
		formText
	})
}));
/** Layout preview for reviewers: localStorage "cvstudio.adpreview" = "1" shows an empty labelled box. Never loads an ad. */
var PREVIEW_KEY = "cvstudio.adpreview";
/**
* One manual AdSense unit, labelled "Advertisement". Renders nothing when ads are
* disabled or on a route that is not on the allow-list (src/config/ads.ts).
* Keyed by pathname so a new route = one new request; never refreshed on a timer.
*/
function AdSlot({ placement, className = "" }) {
	const { pathname } = useLocation();
	const mode = useMode((m) => m.mode);
	const [preview, setPreview] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			setPreview(localStorage.getItem(PREVIEW_KEY) === "1");
		} catch {
			setPreview(false);
		}
	}, []);
	if (!adAllowed(pathname, placement)) return null;
	if (pathname === "/" && mode === "filler") return null;
	if (!ADS.enabled && !preview) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: `my-10 ${className}`,
		"aria-label": tr("Advertisement"),
		"data-testid": `ad-slot-${placement}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-1 text-[11px] uppercase tracking-wider text-muted",
			children: tr("Advertisement")
		}), ADS.enabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdUnit, { slot: ADS.slots[placement] }, pathname) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-28 rounded-lg border border-dashed border-line bg-paper" })]
	});
}
function AdUnit({ slot }) {
	const pushed = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (pushed.current) return;
		pushed.current = true;
		try {
			const w = window;
			(w.adsbygoogle = w.adsbygoogle || []).push({});
		} catch {}
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ins", {
		className: "adsbygoogle",
		style: { display: "block" },
		"data-ad-client": ADSENSE_PUB_ID,
		"data-ad-slot": slot,
		"data-ad-format": "auto",
		"data-full-width-responsive": "true"
	});
}
//#endregion
export { useMode as n, AdSlot as t };
