import { o as __toESM } from "../_runtime.mjs";
import { $ as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as tr } from "./site-footer-CrbBo0PJ.mjs";
import { W as TEMPLATES, ft as ContentShell } from "./router-BXvCCxej.mjs";
import { t as AdSlot } from "./ad-slot-BWh-g-Rz.mjs";
//#region ../repo/node_modules/.nitro/vite/services/ssr/assets/templates-DuZDzHQp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var USE_FOR = {
	meridian: "Good for private-sector jobs in India, the Gulf and abroad where a modern look helps.",
	consulate: "Good for visa, embassy and government applications that expect a full personal record.",
	atlas: "Good for online portals and applicant tracking systems that prefer a plain single column."
};
function TemplatesPage() {
	const [opening, setOpening] = (0, import_react.useState)(null);
	const use = (id) => {
		setOpening(id);
		window.location.href = `/?template=${id}`;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContentShell, {
		current: "templates",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-4xl",
				children: tr("CV templates gallery")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-sm text-muted",
				children: tr("All templates are free to edit and preview. Each is shown with sample data; your own details replace it in the editor.")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-sm text-muted",
				children: tr("Free to edit and preview — no sign-up needed.")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-8 grid gap-6 md:grid-cols-3",
				"data-testid": "template-gallery",
				children: TEMPLATES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-col rounded-2xl border border-line bg-sheet p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplateImage, {
							id: t.id,
							label: tr(t.label)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 font-serif text-xl",
							children: tr(t.label)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: tr(t.hint)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 flex-1 text-sm",
							children: tr(USE_FOR[t.id])
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-4 h-11 rounded-full bg-forest px-4 text-sm font-medium text-sheet disabled:opacity-50",
							onClick: () => use(t.id),
							disabled: opening !== null,
							"data-testid": `use-${t.id}`,
							children: opening === t.id ? tr("Opening the template…") : tr("Use this template")
						})
					]
				}, t.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12 max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-2xl",
						children: tr("How to choose")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 leading-relaxed",
						children: tr("Follow the employer's instructions first. If none are given, a plain single-column layout is the safest choice for online portals, while a two-column layout reads well when a person opens the PDF.")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 leading-relaxed",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "underline",
							href: "/guides/ats-friendly-cv",
							children: tr("Making your CV ATS-friendly")
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, { placement: "gallery" })
		]
	});
}
/**
* Template preview image with a loading skeleton and a failure message.
* Before this, the <img> rendered as a blank white rectangle until the
* file arrived (front-look QA, 2026-11-09) — and stayed blank forever
* if the file failed to load.
*/
function TemplateImage({ id, label }) {
	const [state, setState] = (0, import_react.useState)("loading");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative aspect-[1/1.414] w-full overflow-hidden rounded-lg border border-line bg-paper",
		children: [
			state === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 animate-pulse bg-line/60",
				"aria-hidden": true,
				"data-testid": `template-skeleton-${id}`
			}) : null,
			state === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "absolute inset-0 grid place-items-center p-4 text-center text-sm text-muted",
				role: "alert",
				children: tr("Preview image failed to load.")
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: `/templates/${id}.png`,
				alt: tr("{name} template preview", { name: label }),
				loading: "lazy",
				className: "absolute inset-0 h-full w-full object-cover object-top",
				onLoad: () => setState("ready"),
				onError: () => setState("error")
			})
		]
	});
}
//#endregion
export { TemplatesPage as component };
