import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as SiteFooter } from "./site-footer-CrbBo0PJ.mjs";
import { pt as SEO_PAGES } from "./router-BXvCCxej.mjs";
//#region ../repo/node_modules/.nitro/vite/services/ssr/assets/landing-page-CwE-e6zC.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Shared render for the multilingual SEO landing pages (/cv-maker, /hi/cv-maker, ...).
* The page body is fully in the page language (from seo-pages.ts), so it renders
* correctly server-side. The footer chrome translates client-side via the
* saved UI language where a catalogue exists (en/en-GB/hi/ja/ar/zh-CN/es-ES/fr-FR).
* Landing-only languages (de/pt/pl/it/ru) show p.landingOnlyNote plainly under
* the lead: the page is localised, the tool itself runs in the UI languages.
*/
function LandingPage({ p }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		dir: p.dir,
		className: "min-h-screen bg-paper text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b border-line bg-paper",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "mx-auto flex max-w-5xl flex-wrap items-center gap-x-4 gap-y-1 px-4 py-3 text-sm",
					"aria-label": p.label,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/",
							className: "me-auto font-serif text-lg",
							children: "FormZalo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/",
							className: "text-forest",
							children: p.nav.generator
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/templates",
							className: "text-forest",
							children: p.nav.templates
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/guides",
							className: "text-forest",
							children: p.nav.guides
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/services",
							className: "text-forest",
							children: p.nav.services
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/about",
							className: "text-forest",
							children: p.nav.about
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-5xl px-4 py-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-serif text-4xl leading-tight",
							children: p.h1
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-2xl text-base leading-relaxed text-ink/80",
							children: p.lead
						}),
						p.landingOnlyNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-2xl rounded-lg border border-line bg-sheet p-3 text-sm leading-relaxed text-ink/80",
							children: p.landingOnlyNote
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-6 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "/",
								className: "rounded-md bg-forest px-5 py-2.5 font-semibold text-white",
								children: p.ctaPrimary
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "/templates",
								className: "rounded-md border border-line bg-sheet px-5 py-2.5 font-semibold",
								children: p.ctaSecondary
							})]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-serif text-2xl",
							children: p.stepsHeading
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "mt-4 grid gap-4 md:grid-cols-3",
							children: p.steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "rounded-lg border border-line bg-sheet p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-serif text-lg text-forest",
										children: i + 1
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-1 font-semibold",
										children: s.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm leading-relaxed text-ink/80",
										children: s.text
									})
								]
							}, s.title))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-12",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-serif text-2xl",
								children: p.templatesHeading
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 grid gap-4 md:grid-cols-3",
								children: p.templates.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "rounded-lg border border-line bg-sheet p-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-semibold",
										children: t.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm leading-relaxed text-ink/80",
										children: t.text
									})]
								}, t.name))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "/templates",
									className: "underline",
									children: p.ctaSecondary
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-12 rounded-lg border border-line bg-sheet p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-serif text-2xl",
								children: p.plansHeading
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-relaxed",
								children: p.plans
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-relaxed",
								children: p.filler
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "/services",
									className: "underline",
									children: p.nav.services
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-serif text-2xl",
							children: p.faqHeading
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 space-y-4",
							children: p.faqs.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-line bg-sheet p-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold",
									children: f.q
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm leading-relaxed text-ink/80",
									children: f.a
								})]
							}, f.q))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "mt-12 text-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: SEO_PAGES.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: x.path,
							className: "underline",
							hrefLang: x.lang,
							children: x.label
						}), " "] }, x.code)) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { LandingPage as t };
