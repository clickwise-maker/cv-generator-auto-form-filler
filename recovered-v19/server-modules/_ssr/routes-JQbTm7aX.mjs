import { o as __toESM } from "../_runtime.mjs";
import { $ as require_react, m as useLocation, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as useT, n as SiteFooter, r as cn, s as tr } from "./site-footer-CrbBo0PJ.mjs";
import { t as SiteHeader } from "./site-header-DONlhDL_.mjs";
import { a as Undo2, b as ChevronDown, d as PenLine, f as FileUp, h as Eraser, i as Upload, l as ScanLine, s as Trash2, t as X, u as Plus, x as Check } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { B as COPY, F as ADSENSE_PUB_ID, G as addressLines, H as SAMPLE_CV, I as WATCH_AD_UNLOCK, J as displayName, L as adAllowed, P as ADS, R as downloadGateActive, U as SAMPLE_FORM, V as COUNTRIES, W as TEMPLATES, Y as dossierCode, a as getPlan, at as phoneLine, c as downloadPreviewPdf, ct as splitDisplayName, d as signatureLine, dt as GUIDES, f as signaturePatch, i as WATERMARK_LINES, it as lifeLines, l as checkSignatureFile, lt as summaryLines, m as trimToPng, n as DEFAULT_PLAN_ID, nt as formatSpan, o as planPriceLabel, ot as placeLine, p as templateSigns, q as degreeLine, r as LAUNCH_NOTE, rt as formatWhen, s as visiblePlans, u as clearSignaturePatch, ut as uid, z as CALLING_CODES } from "./router-BXvCCxej.mjs";
import { t as ConsentGate } from "./consent-ui-3p1JoNf4.mjs";
import { S as writeLocal, _ as readLocal, a as activeCompany, b as verifyPayment, c as detectFormFields, d as fieldsByUsage, f as findMissing, g as readGuest, h as openRazorpay, i as TARGET_COMPANY, l as downloadClean, m as newIdempotencyKey, n as Dashboard, o as cancelOrder, p as layeredProfile, r as FORM_FIELDS, s as createOrder, t as ApiError, u as fetchStatus, v as simulatePayment, x as writeGuest, y as useStudio } from "./dashboard-CXG2z3k-.mjs";
import { n as useMode, t as AdSlot } from "./ad-slot-BWh-g-Rz.mjs";
import { Buffer } from "node:buffer";
//#region ../repo/node_modules/.nitro/vite/services/ssr/assets/routes-JQbTm7aX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var tones = {
	forest: "bg-forest text-sheet hover:bg-forest-deep",
	sheet: "bg-sheet text-forest hover:bg-brass-soft",
	quiet: "border border-line bg-sheet text-ink hover:border-forest",
	ghost: "bg-transparent text-forest hover:bg-brass-soft"
};
function Button({ tone = "forest", className, type = "button", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		className: cn("inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50", tones[tone], className),
		...props
	});
}
function Panel({ title, action, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl border border-line bg-sheet p-4 sm:p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-serif text-xl",
				children: title
			}), action]
		}), children]
	});
}
function Field({ label, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex min-w-0 flex-col gap-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-medium text-muted",
				children: label
			}),
			children,
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs leading-snug text-muted",
				children: hint
			}) : null
		]
	});
}
var controlClass = "h-11 w-full min-w-0 rounded-xl border border-line bg-paper px-3 text-sm text-ink outline-none transition placeholder:text-muted focus:border-forest";
function TextInput({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn(controlClass, className),
		...props
	});
}
function Area({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn(controlClass, "h-auto min-h-24 py-2 leading-relaxed", className),
		...props
	});
}
function Select({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		className: cn(controlClass, className),
		...props
	});
}
/** Unlimited "Add more details" rows (label + value), shared by CV Generator and Form Filler. */
function CustomDetails() {
	const t = useT();
	const rows = useStudio((s) => s.profile.personal.customDetails);
	const add = useStudio((s) => s.addCustomDetail);
	const update = useStudio((s) => s.updateCustomDetail);
	const remove = useStudio((s) => s.removeCustomDetail);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-2",
		"data-testid": "custom-details",
		children: [rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-[1fr_1.4fr_auto] items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					dir: "auto",
					"aria-label": t("Detail name"),
					placeholder: t("Detail name"),
					value: row.label,
					onChange: (e) => update(row.id, { label: e.target.value })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					dir: "auto",
					"aria-label": t("Value"),
					placeholder: t("Value"),
					value: row.value,
					onChange: (e) => update(row.id, { value: e.target.value })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "grid size-11 place-items-center text-muted hover:text-forest",
					"aria-label": t("Remove"),
					onClick: () => remove(row.id),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
						className: "size-4",
						"aria-hidden": true
					})
				})
			]
		}, row.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			tone: "quiet",
			className: "h-11 self-start px-4",
			"data-testid": "add-more-details",
			onClick: () => add(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
					className: "size-4",
					"aria-hidden": true
				}),
				" ",
				t("Add more details")
			]
		})]
	});
}
function loadImage(src) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = () => reject(new Error(tr("image")));
		img.src = src;
	});
}
async function fileToSignature(file) {
	const url = URL.createObjectURL(file);
	try {
		const img = await loadImage(url);
		const scale = Math.min(1, 1200 / img.width, 600 / img.height);
		const canvas = document.createElement("canvas");
		canvas.width = Math.max(1, Math.round(img.width * scale));
		canvas.height = Math.max(1, Math.round(img.height * scale));
		canvas.getContext("2d")?.drawImage(img, 0, 0, canvas.width, canvas.height);
		return trimToPng(canvas);
	} finally {
		URL.revokeObjectURL(url);
	}
}
function DrawPad({ onSave }) {
	const t = useT();
	const canvasRef = (0, import_react.useRef)(null);
	const [strokes, setStrokes] = (0, import_react.useState)([]);
	const [undone, setUndone] = (0, import_react.useState)([]);
	const drawing = (0, import_react.useRef)(null);
	const paint = (all) => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !ctx) return;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
		ctx.lineWidth = 3;
		ctx.strokeStyle = "#1c1915";
		for (const stroke of all) {
			ctx.beginPath();
			stroke.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y));
			if (stroke.length === 1) ctx.lineTo(stroke[0].x + .1, stroke[0].y);
			ctx.stroke();
		}
	};
	(0, import_react.useEffect)(() => paint(strokes), [strokes]);
	const at = (e) => {
		const rect = e.currentTarget.getBoundingClientRect();
		return {
			x: (e.clientX - rect.left) / rect.width * e.currentTarget.width,
			y: (e.clientY - rect.top) / rect.height * e.currentTarget.height
		};
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref: canvasRef,
			width: 600,
			height: 200,
			"data-testid": "signature-canvas",
			"aria-label": t("Draw your signature here"),
			className: "h-36 w-full touch-none rounded-xl border border-dashed border-line bg-paper",
			onPointerDown: (e) => {
				e.currentTarget.setPointerCapture(e.pointerId);
				const stroke = [at(e)];
				drawing.current = stroke;
				setUndone([]);
				setStrokes((s) => [...s, stroke]);
			},
			onPointerMove: (e) => {
				if (!drawing.current) return;
				drawing.current.push(at(e));
				paint([...strokes.slice(0, -1), drawing.current]);
			},
			onPointerUp: () => {
				const stroke = drawing.current;
				drawing.current = null;
				if (stroke) setStrokes((s) => [...s.slice(0, -1), [...stroke]]);
			},
			onPointerCancel: () => drawing.current = null
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					tone: "quiet",
					className: "h-10 px-3",
					disabled: !strokes.length,
					onClick: () => {
						setUndone((u) => [...u, strokes[strokes.length - 1]]);
						setStrokes((s) => s.slice(0, -1));
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, {
							className: "size-4 rtl:-scale-x-100",
							"aria-hidden": true
						}),
						" ",
						t("Undo")
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					tone: "quiet",
					className: "h-10 px-3",
					disabled: !undone.length,
					onClick: () => {
						setStrokes((s) => [...s, undone[undone.length - 1]]);
						setUndone((u) => u.slice(0, -1));
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, {
							className: "size-4 -scale-x-100 rtl:scale-x-100",
							"aria-hidden": true
						}),
						" ",
						t("Redo")
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					tone: "quiet",
					className: "h-10 px-3",
					disabled: !strokes.length,
					onClick: () => {
						setStrokes([]);
						setUndone([]);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eraser, {
							className: "size-4",
							"aria-hidden": true
						}),
						" ",
						t("Clear")
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "h-10 px-4",
					"data-testid": "signature-save",
					disabled: !strokes.length,
					onClick: () => {
						const canvas = canvasRef.current;
						if (!canvas) return;
						const copy = document.createElement("canvas");
						copy.width = canvas.width;
						copy.height = canvas.height;
						copy.getContext("2d")?.drawImage(canvas, 0, 0);
						onSave(trimToPng(copy));
					},
					children: t("Use this signature")
				})
			]
		})]
	});
}
/** Signature section: upload an image OR draw one; preview; remove. Stored on the guest's profile. */
function SignatureSection({ compact }) {
	const t = useT();
	const signature = useStudio((s) => s.profile.personal.signature);
	const place = useStudio((s) => s.profile.personal.signaturePlace);
	const date = useStudio((s) => s.profile.personal.signatureDate);
	const patch = useStudio((s) => s.patchPersonal);
	const [mode, setMode] = (0, import_react.useState)("draw");
	const [error, setError] = (0, import_react.useState)("");
	const fileRef = (0, import_react.useRef)(null);
	const save = (dataUrl) => {
		const next = signaturePatch(dataUrl);
		if (!next) {
			setError(t("That signature could not be saved. Try a smaller or clearer image."));
			return;
		}
		setError("");
		patch(next);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3",
		"data-testid": "signature-section",
		children: [
			signature ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3 rounded-xl border border-line bg-paper p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: signature,
					alt: t("Your signature"),
					"data-testid": "signature-preview",
					className: "h-16 max-w-56 object-contain"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					tone: "quiet",
					className: "h-10 px-3",
					"data-testid": "signature-remove",
					onClick: () => patch(clearSignaturePatch()),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
							className: "size-4",
							"aria-hidden": true
						}),
						" ",
						t("Remove signature")
					]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "tablist",
				className: "grid grid-cols-2 rounded-full border border-line bg-sheet p-1",
				children: ["draw", "upload"].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "tab",
					"aria-selected": mode === m,
					"data-testid": `signature-${m}`,
					className: cn("flex h-9 items-center justify-center gap-2 rounded-full text-sm font-medium", mode === m ? "bg-forest text-sheet" : "text-muted"),
					onClick: () => setMode(m),
					children: [m === "draw" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, {
						className: "size-4",
						"aria-hidden": true
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
						className: "size-4",
						"aria-hidden": true
					}), m === "draw" ? t("Draw") : t("Upload image")]
				}, m))
			}), mode === "draw" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawPad, { onSave: save }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileRef,
						type: "file",
						accept: "image/png,image/jpeg",
						className: "hidden",
						"data-testid": "signature-file",
						onChange: (e) => {
							const file = e.target.files?.[0];
							e.target.value = "";
							if (!file) return;
							const check = checkSignatureFile(file);
							if (!check.ok) {
								setError(check.reason === "type" ? t("Use a PNG or JPG image.") : t("The image must be 1 MB or smaller."));
								return;
							}
							fileToSignature(file).then(save, () => setError(t("That image could not be read.")));
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						tone: "quiet",
						className: "h-11 self-start px-4",
						onClick: () => fileRef.current?.click(),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
								className: "size-4",
								"aria-hidden": true
							}),
							" ",
							t("Choose PNG or JPG (max 1 MB)")
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: t("White or transparent margins are trimmed automatically.")
					})
				]
			})] }),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-red-700",
				role: "alert",
				children: error
			}) : null,
			!compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("Place (signature)"),
					hint: t("Leave empty to use your city."),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						dir: "auto",
						value: place,
						onChange: (e) => patch({ signaturePlace: e.target.value })
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("Date (signature)"),
					hint: t("Leave empty to use the export date."),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						type: "date",
						value: date,
						onChange: (e) => patch({ signatureDate: e.target.value })
					})
				})]
			}) : null
		]
	});
}
var LEVELS = [
	"Native",
	"C2",
	"C1",
	"B2",
	"B1",
	"A2",
	"A1"
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
var PASSPORTS = [
	"Ordinary",
	"Diplomatic",
	"Service",
	"Official",
	"Special",
	"Laissez-passer",
	"Refugee travel document",
	"Other"
];
var ENDORSEMENTS = [
	"ECNR",
	"ECR",
	"Not applicable"
];
var YES_NO = ["No", "Yes"];
function readPhoto(file) {
	const url = URL.createObjectURL(file);
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.onload = () => {
			const scale = Math.min(1, 360 / Math.max(image.width, image.height));
			const canvas = document.createElement("canvas");
			canvas.width = Math.max(1, Math.round(image.width * scale));
			canvas.height = Math.max(1, Math.round(image.height * scale));
			const context = canvas.getContext("2d");
			if (!context) {
				URL.revokeObjectURL(url);
				reject(new Error(tr("photo")));
				return;
			}
			context.drawImage(image, 0, 0, canvas.width, canvas.height);
			const photo = canvas.toDataURL("image/jpeg", .72);
			URL.revokeObjectURL(url);
			resolve(photo);
		};
		image.onerror = () => {
			URL.revokeObjectURL(url);
			reject(new Error(tr("photo")));
		};
		image.src = url;
	});
}
function ProfileForm() {
	const t = useT();
	const personal = useStudio((state) => state.profile.personal);
	const experience = useStudio((state) => state.profile.experience);
	const education = useStudio((state) => state.profile.education);
	const languages = useStudio((state) => state.profile.languages);
	const certifications = useStudio((state) => state.profile.certifications);
	const skills = useStudio((state) => state.profile.skills);
	const children = useStudio((state) => state.profile.children);
	const travel = useStudio((state) => state.profile.travel);
	const patch = useStudio((state) => state.patchPersonal);
	const addExperience = useStudio((state) => state.addExperience);
	const updateExperience = useStudio((state) => state.updateExperience);
	const removeExperience = useStudio((state) => state.removeExperience);
	const addEducation = useStudio((state) => state.addEducation);
	const updateEducation = useStudio((state) => state.updateEducation);
	const removeEducation = useStudio((state) => state.removeEducation);
	const addLanguage = useStudio((state) => state.addLanguage);
	const updateLanguage = useStudio((state) => state.updateLanguage);
	const removeLanguage = useStudio((state) => state.removeLanguage);
	const addCertification = useStudio((state) => state.addCertification);
	const updateCertification = useStudio((state) => state.updateCertification);
	const removeCertification = useStudio((state) => state.removeCertification);
	const addSkill = useStudio((state) => state.addSkill);
	const removeSkill = useStudio((state) => state.removeSkill);
	const addChild = useStudio((state) => state.addChild);
	const updateChild = useStudio((state) => state.updateChild);
	const removeChild = useStudio((state) => state.removeChild);
	const addTrip = useStudio((state) => state.addTrip);
	const updateTrip = useStudio((state) => state.updateTrip);
	const removeTrip = useStudio((state) => state.removeTrip);
	const clearDossier = useStudio((state) => state.clearDossier);
	const [skill, setSkill] = (0, import_react.useState)("");
	const [armed, setArmed] = (0, import_react.useState)(false);
	const empty = !personal.givenName && !personal.familyName && experience.length === 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			empty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-2xl border border-dashed border-brass bg-brass-soft px-4 py-3 text-sm",
				children: tr("The desk is empty. Read a document above, or fill the sample dossier to see a finished page.")
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: tr("Identity"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: tr("Given name"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									value: personal.givenName,
									onChange: (event) => patch({ givenName: event.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: tr("Family name"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									value: personal.familyName,
									onChange: (event) => patch({ familyName: event.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "sm:col-span-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: tr("Headline"),
									hint: tr("Occupation or target role. Shown under your name."),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
										value: personal.headline,
										onChange: (event) => patch({ headline: event.target.value })
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: tr("Date of birth"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									type: "date",
									value: personal.dateOfBirth,
									onChange: (event) => patch({ dateOfBirth: event.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: tr("Place of birth"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									value: personal.placeOfBirth,
									onChange: (event) => patch({ placeOfBirth: event.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: tr("Nationality"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									value: personal.nationality,
									onChange: (event) => patch({ nationality: event.target.value })
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: tr("Photo"),
							hint: tr("Optional. Germany and the Gulf often expect a photo; leave it off for the US, UK and Canada."),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [personal.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: personal.photo,
									alt: "",
									className: "size-16 rounded-lg object-cover"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-16 place-items-center rounded-lg border border-dashed border-line text-xs text-muted",
									children: tr("None")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex min-w-0 flex-1 flex-col gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "file",
										accept: "image/jpeg,image/png,image/webp",
										"aria-label": tr("Optional photo"),
										className: "block w-full text-sm file:me-3 file:h-11 file:rounded-full file:border-0 file:bg-forest file:px-4 file:text-sm file:text-sheet",
										onChange: (event) => {
											const file = event.target.files?.[0];
											event.target.value = "";
											if (!file) return;
											readPhoto(file).then((photo) => patch({ photo }));
										}
									}), personal.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "h-11 self-start text-sm text-muted",
										onClick: () => patch({ photo: "" }),
										children: tr("Remove photo")
									}) : null]
								})]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: tr("Profile"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								value: personal.summary,
								onChange: (event) => patch({ summary: event.target.value })
							})
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: tr("Passport"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-sm text-muted",
					children: tr("Schengen and visa forms ask for these options. Indian passports may also carry ECNR or ECR.")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: tr("Type"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: personal.passportType,
								onChange: (event) => patch({ passportType: event.target.value }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: tr("Choose")
								}), PASSPORTS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: item,
									children: tr(item)
								}, item))]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: tr("Number"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								value: personal.passportNumber,
								autoComplete: "off",
								onChange: (event) => patch({ passportNumber: event.target.value })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: tr("Issued"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								type: "date",
								value: personal.passportIssuedOn,
								onChange: (event) => patch({ passportIssuedOn: event.target.value })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: tr("Expires"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								type: "date",
								value: personal.passportExpires,
								onChange: (event) => patch({ passportExpires: event.target.value })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: tr("Issuing country"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: personal.passportIssuedBy,
								onChange: (event) => patch({ passportIssuedBy: event.target.value }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: tr("Choose")
								}), COUNTRIES.map((country) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: country }, country))]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: tr("Issuing city"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								value: personal.passportIssuedCity,
								placeholder: tr("Mumbai"),
								onChange: (event) => patch({ passportIssuedCity: event.target.value })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: tr("Endorsement"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: personal.passportEndorsement,
								onChange: (event) => patch({ passportEndorsement: event.target.value }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: tr("Choose")
								}), ENDORSEMENTS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: item,
									children: tr(item)
								}, item))]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: tr("Lost or stolen"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: personal.passportLost,
								onChange: (event) => patch({ passportLost: event.target.value }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: tr("Choose")
								}), YES_NO.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: item,
									children: tr(item)
								}, item))]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "sm:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: tr("Previous passport number"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									value: personal.oldPassport,
									onChange: (event) => patch({ oldPassport: event.target.value })
								})
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: tr("Contact"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: tr("Email"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								type: "email",
								value: personal.email,
								onChange: (event) => patch({ email: event.target.value })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: tr("Calling code"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								value: personal.phoneCode,
								onChange: (event) => patch({ phoneCode: event.target.value }),
								children: CALLING_CODES.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: entry.code,
									children: entry.label
								}, entry.code))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: tr("Phone"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								value: personal.phone,
								inputMode: "tel",
								onChange: (event) => patch({ phone: event.target.value })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: tr("Street"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								value: personal.street,
								onChange: (event) => patch({ street: event.target.value })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: tr("Postal code"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								value: personal.postalCode,
								onChange: (event) => patch({ postalCode: event.target.value })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: tr("City"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								value: personal.city,
								onChange: (event) => patch({ city: event.target.value })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: tr("Region"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								value: personal.region,
								onChange: (event) => patch({ region: event.target.value })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: tr("Country"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								list: "meridian-countries",
								value: personal.country,
								onChange: (event) => patch({ country: event.target.value })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("datalist", {
							id: "meridian-countries",
							children: COUNTRIES.map((country) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: country }, country))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: tr("LinkedIn"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								value: personal.linkedin,
								onChange: (event) => patch({ linkedin: event.target.value })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: tr("Website"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								value: personal.website,
								onChange: (event) => patch({ website: event.target.value })
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: tr("Work"),
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					tone: "quiet",
					className: "h-10 px-4",
					onClick: addExperience,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
							className: "size-4",
							"aria-hidden": true
						}),
						" ",
						tr("Add role")
					]
				}),
				children: [experience.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: tr("No roles yet.")
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-4",
					children: experience.map((role, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-xl border border-line p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-sm font-medium",
									children: ["Role ", index + 1]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "grid size-11 place-items-center text-muted",
									onClick: () => removeExperience(role.id),
									"aria-label": `Remove role ${index + 1}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: tr("Title"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
											value: role.title,
											onChange: (event) => updateExperience(role.id, { title: event.target.value })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: tr("Organization"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
											value: role.organization,
											onChange: (event) => updateExperience(role.id, { organization: event.target.value })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: tr("Location"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
											value: role.location,
											onChange: (event) => updateExperience(role.id, { location: event.target.value })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: tr("Start"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
											type: "month",
											value: role.start,
											onChange: (event) => updateExperience(role.id, { start: event.target.value })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: tr("End"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
											type: "month",
											value: role.end,
											disabled: role.current,
											onChange: (event) => updateExperience(role.id, { end: event.target.value })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex h-11 items-center gap-2 self-end text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: role.current,
											onChange: (event) => updateExperience(role.id, {
												current: event.target.checked,
												end: event.target.checked ? "" : role.end
											})
										}), tr("Current role")]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: tr("What changed"),
									hint: tr("One point per line."),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										value: role.summary,
										onChange: (event) => updateExperience(role.id, { summary: event.target.value })
									})
								})
							})
						]
					}, role.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: tr("Education"),
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					tone: "quiet",
					className: "h-10 px-4",
					onClick: addEducation,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
							className: "size-4",
							"aria-hidden": true
						}),
						" ",
						tr("Add study")
					]
				}),
				children: [education.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: tr("No study yet.")
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-4",
					children: education.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-xl border border-line p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-sm font-medium",
									children: ["Study ", index + 1]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "grid size-11 place-items-center text-muted",
									onClick: () => removeEducation(item.id),
									"aria-label": `Remove study ${index + 1}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: tr("Qualification"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
											value: item.qualification,
											onChange: (event) => updateEducation(item.id, { qualification: event.target.value })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: tr("Field"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
											value: item.field,
											onChange: (event) => updateEducation(item.id, { field: event.target.value })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: tr("Institution"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
											value: item.institution,
											onChange: (event) => updateEducation(item.id, { institution: event.target.value })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: tr("Location"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
											value: item.location,
											onChange: (event) => updateEducation(item.id, { location: event.target.value })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: tr("Start year"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
											value: item.start,
											onChange: (event) => updateEducation(item.id, { start: event.target.value })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: tr("End year"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
											value: item.end,
											onChange: (event) => updateEducation(item.id, { end: event.target.value })
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: tr("Notes"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										value: item.details,
										onChange: (event) => updateEducation(item.id, { details: event.target.value })
									})
								})
							})
						]
					}, item.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: tr("International options"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 text-sm text-muted",
						children: tr("This list follows the Europass CV and Schengen / visa particulars. Fill only what your form asks for. Empty lines are not printed.")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: tr("Sex"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: personal.sex,
									onChange: (event) => patch({ sex: event.target.value }),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: tr("Not stated")
									}), SEXES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: item,
										children: tr(item)
									}, item))]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: tr("Marital status"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: personal.maritalStatus,
									onChange: (event) => patch({ maritalStatus: event.target.value }),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: tr("Not stated")
									}), MARITAL.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: item,
										children: tr(item)
									}, item))]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: tr("Surname at birth"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									value: personal.surnameAtBirth,
									onChange: (event) => patch({ surnameAtBirth: event.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: tr("Nationality at birth"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									value: personal.nationalityAtBirth,
									onChange: (event) => patch({ nationalityAtBirth: event.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: tr("Other nationalities"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									value: personal.otherNationalities,
									onChange: (event) => patch({ otherNationalities: event.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: tr("National ID number"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									value: personal.nationalId,
									onChange: (event) => patch({ nationalId: event.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: tr("Position applied for"),
								hint: tr("Europass header. The job title on the advert."),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									value: personal.positionApplied,
									onChange: (event) => patch({ positionApplied: event.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: tr("Driving licence"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									value: personal.drivingLicence,
									placeholder: tr("B"),
									onChange: (event) => patch({ drivingLicence: event.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: tr("Father"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									value: personal.fatherName,
									onChange: (event) => patch({ fatherName: event.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: tr("Mother"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									value: personal.motherName,
									onChange: (event) => patch({ motherName: event.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: tr("Spouse"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									value: personal.spouseName,
									onChange: (event) => patch({ spouseName: event.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: tr("Guardian"),
								hint: tr("For a minor: name, phone, nationality."),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									value: personal.guardian,
									onChange: (event) => patch({ guardian: event.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: tr("Eye colour"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									value: personal.eyeColour,
									placeholder: tr("Brown"),
									onChange: (event) => patch({ eyeColour: event.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: tr("Hair colour"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									value: personal.hairColour,
									placeholder: tr("Black"),
									onChange: (event) => patch({ hairColour: event.target.value })
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: tr("Digital skills"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									value: personal.digitalSkills,
									onChange: (event) => patch({ digitalSkills: event.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: tr("Projects"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									value: personal.projects,
									onChange: (event) => patch({ projects: event.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: tr("Publications"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									value: personal.publications,
									onChange: (event) => patch({ publications: event.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: tr("Volunteering"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									value: personal.volunteering,
									onChange: (event) => patch({ volunteering: event.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: tr("Memberships"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									value: personal.memberships,
									onChange: (event) => patch({ memberships: event.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: tr("References"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									value: personal.referencesNote,
									placeholder: tr("Available on request"),
									onChange: (event) => patch({ referencesNote: event.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: tr("Merit"),
								hint: tr("Distinction, rank, or award."),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									value: personal.merit,
									onChange: (event) => patch({ merit: event.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: tr("Hobbies"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									value: personal.hobbies,
									onChange: (event) => patch({ hobbies: event.target.value })
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 mt-4 text-sm font-medium",
						children: tr("This trip")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: tr("Purpose of travel"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									value: personal.visaPurpose,
									placeholder: tr("Tourism, work, study"),
									onChange: (event) => patch({ visaPurpose: event.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: tr("Destination"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									value: personal.destination,
									onChange: (event) => patch({ destination: event.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: tr("Entry"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									type: "date",
									value: personal.entryDate,
									onChange: (event) => patch({ entryDate: event.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: tr("Exit"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									type: "date",
									value: personal.exitDate,
									onChange: (event) => patch({ exitDate: event.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: tr("Accommodation"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									value: personal.accommodation,
									onChange: (event) => patch({ accommodation: event.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: tr("Costs paid by"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									value: personal.sponsor,
									placeholder: tr("Yourself, employer, host"),
									onChange: (event) => patch({ sponsor: event.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "sm:col-span-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: tr("Previous visa"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
										value: personal.previousVisa,
										placeholder: tr("No, or the sticker number"),
										onChange: (event) => patch({ previousVisa: event.target.value })
									})
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-col gap-3",
						children: [
							children.map((child, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "rounded-xl border border-line p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-3 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "text-sm font-medium",
										children: ["Child ", index + 1]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "grid size-11 place-items-center text-muted",
										onClick: () => removeChild(child.id),
										"aria-label": `Remove child ${index + 1}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-3 sm:grid-cols-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: tr("Name"),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
												value: child.name,
												onChange: (event) => updateChild(child.id, { name: event.target.value })
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: tr("Date of birth"),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
												type: "date",
												value: child.dateOfBirth,
												onChange: (event) => updateChild(child.id, { dateOfBirth: event.target.value })
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: tr("Gender"),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
												value: child.gender,
												placeholder: tr("Daughter"),
												onChange: (event) => updateChild(child.id, { gender: event.target.value })
											})
										})
									]
								})]
							}, child.id)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								tone: "quiet",
								className: "h-11 self-start px-4",
								onClick: addChild,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
										className: "size-4",
										"aria-hidden": true
									}),
									" ",
									tr("Add child")
								]
							}),
							travel.map((trip, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "rounded-xl border border-line p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-3 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "text-sm font-medium",
										children: ["Travel ", index + 1]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "grid size-11 place-items-center text-muted",
										onClick: () => removeTrip(trip.id),
										"aria-label": `Remove travel ${index + 1}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-3 sm:grid-cols-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: tr("Country"),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
												value: trip.country,
												onChange: (event) => updateTrip(trip.id, { country: event.target.value })
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: tr("Purpose"),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
												value: trip.purpose,
												placeholder: tr("Work or visit"),
												onChange: (event) => updateTrip(trip.id, { purpose: event.target.value })
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: tr("From"),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
												value: trip.from,
												placeholder: "2019",
												onChange: (event) => updateTrip(trip.id, { from: event.target.value })
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: tr("To"),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
												value: trip.to,
												placeholder: "2019",
												onChange: (event) => updateTrip(trip.id, { to: event.target.value })
											})
										})
									]
								})]
							}, trip.id)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								tone: "quiet",
								className: "h-11 self-start px-4",
								onClick: addTrip,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
										className: "size-4",
										"aria-hidden": true
									}),
									" ",
									tr("Add travel")
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: tr("Languages and skills"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4",
					children: [
						languages.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								"aria-label": `Language ${index + 1}`,
								value: item.name,
								onChange: (event) => updateLanguage(item.id, { name: event.target.value })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									"aria-label": `Level ${index + 1}`,
									className: "min-w-0 flex-1",
									value: item.level,
									onChange: (event) => updateLanguage(item.id, { level: event.target.value }),
									children: LEVELS.map((level) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: level,
										children: tr(level)
									}, level))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "grid size-11 shrink-0 place-items-center text-muted",
									onClick: () => removeLanguage(item.id),
									"aria-label": `Remove language ${index + 1}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
								})]
							})]
						}, item.id)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							tone: "quiet",
							className: "h-11 self-start px-4",
							onClick: addLanguage,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
									className: "size-4",
									"aria-hidden": true
								}),
								" ",
								tr("Add language")
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: tr("Skills"),
							hint: tr("Press Enter to add each skill."),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								value: skill,
								placeholder: tr("Tariff design"),
								onChange: (event) => setSkill(event.target.value),
								onKeyDown: (event) => {
									if (event.key !== "Enter") return;
									event.preventDefault();
									addSkill(skill);
									setSkill("");
								}
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "flex flex-wrap gap-2",
							children: skills.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "inline-flex h-11 items-center gap-2 rounded-full bg-brass-soft px-3 text-sm",
								onClick: () => removeSkill(item),
								children: [item, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "sr-only",
									children: ["Remove ", item]
								})]
							}) }, item))
						}),
						certifications.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_6rem_2.75rem]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									"aria-label": `Certificate ${index + 1}`,
									placeholder: tr("Certificate"),
									value: item.name,
									onChange: (event) => updateCertification(item.id, { name: event.target.value })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									"aria-label": `Issuer ${index + 1}`,
									placeholder: tr("Issuer"),
									value: item.issuer,
									onChange: (event) => updateCertification(item.id, { issuer: event.target.value })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									"aria-label": `Year ${index + 1}`,
									placeholder: tr("Year"),
									value: item.year,
									onChange: (event) => updateCertification(item.id, { year: event.target.value })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "grid size-11 place-items-center text-muted",
									onClick: () => removeCertification(item.id),
									"aria-label": `Remove certificate ${index + 1}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
								})
							]
						}, item.id)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							tone: "quiet",
							className: "h-11 self-start px-4",
							onClick: addCertification,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
									className: "size-4",
									"aria-hidden": true
								}),
								" ",
								tr("Add certificate")
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: t("More details"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "-mt-2 mb-3 text-xs text-muted",
					children: t("Anything else your CV or forms need. Add as many as you like.")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomDetails, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: t("Signature"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "-mt-2 mb-3 text-xs text-muted",
					children: t("Draw or upload your signature. It appears on the signature line of the CV and on form declarations.")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignatureSection, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-end",
				children: armed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						tone: "quiet",
						className: "h-11",
						onClick: () => setArmed(false),
						children: tr("Keep it")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						className: "h-11",
						onClick: () => {
							clearDossier();
							setArmed(false);
						},
						children: tr("Clear the dossier")
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					tone: "ghost",
					className: "h-11",
					onClick: () => setArmed(true),
					children: tr("Clear the dossier")
				})
			})
		]
	});
}
var PREVIEW_KEY = "cvstudio.adpreview";
/** Bounded wait per unit before releasing with an honest "could not be shown" note. */
var UNIT_TIMEOUT_MS = 15e3;
function DownloadAdsGate({ onStatus }) {
	const { pathname } = useLocation();
	const mode = useMode((m) => m.mode);
	const [preview, setPreview] = (0, import_react.useState)(false);
	const [outcomes, setOutcomes] = (0, import_react.useState)(["loading", "loading"]);
	const onStatusRef = (0, import_react.useRef)(onStatus);
	onStatusRef.current = onStatus;
	(0, import_react.useEffect)(() => {
		try {
			setPreview(localStorage.getItem(PREVIEW_KEY) === "1");
		} catch {
			setPreview(false);
		}
	}, []);
	const active = (downloadGateActive() || preview) && pathname === "/" && mode !== "filler" && adAllowed(pathname, "downloadGate1") && adAllowed(pathname, "downloadGate2");
	const ready = outcomes.every((o) => o !== "loading");
	(0, import_react.useEffect)(() => {
		onStatusRef.current({
			active,
			ready
		});
	}, [active, ready]);
	const setOutcome = (index, outcome) => setOutcomes((prev) => prev[index] === outcome ? prev : [index === 0 ? outcome : prev[0], index === 1 ? outcome : prev[1]]);
	if (!active) return null;
	const degraded = outcomes.some((o) => o === "unfilled" || o === "blocked" || o === "timeout");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3 rounded-xl border border-line bg-paper p-3",
		"data-testid": "download-ads-gate",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: ready ? degraded ? tr("Ads could not be shown — the free download is still available.") : tr("Both ads loaded — you can download your free preview now.") : tr("Two ads support this free download — the Preview PDF button unlocks once both ads have loaded.")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GateAdUnit, {
				placement: "downloadGate1",
				preview,
				onResolve: (o) => setOutcome(0, o)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GateAdUnit, {
				placement: "downloadGate2",
				preview,
				onResolve: (o) => setOutcome(1, o)
			})]
		})]
	});
}
function GateAdUnit({ placement, preview, onResolve }) {
	const insRef = (0, import_react.useRef)(null);
	const pushed = (0, import_react.useRef)(false);
	const resolved = (0, import_react.useRef)(false);
	const resolveRef = (0, import_react.useRef)(onResolve);
	resolveRef.current = onResolve;
	(0, import_react.useEffect)(() => {
		if (preview) {
			resolveRef.current("filled");
			return;
		}
		const el = insRef.current;
		if (!el) return;
		const resolve = (outcome) => {
			if (resolved.current) return;
			resolved.current = true;
			resolveRef.current(outcome);
		};
		const check = () => {
			const status = el.getAttribute("data-ad-status");
			if (status === "filled" || el.querySelector("iframe")) resolve("filled");
			else if (status === "unfilled") resolve("unfilled");
		};
		let observer = null;
		try {
			observer = new MutationObserver(check);
			observer.observe(el, {
				attributes: true,
				attributeFilter: ["data-ad-status"],
				childList: true,
				subtree: true
			});
		} catch {}
		check();
		if (!pushed.current) {
			pushed.current = true;
			try {
				const w = window;
				(w.adsbygoogle = w.adsbygoogle || []).push({});
			} catch {
				resolve("blocked");
			}
		}
		const timer = setTimeout(() => resolve("timeout"), UNIT_TIMEOUT_MS);
		return () => {
			observer?.disconnect();
			clearTimeout(timer);
		};
	}, [preview]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		"aria-label": tr("Advertisement"),
		"data-testid": `ad-slot-${placement}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-1 text-[11px] uppercase tracking-wider text-muted",
			children: tr("Advertisement")
		}), preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-28 rounded-lg border border-dashed border-line bg-paper" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ins", {
			ref: insRef,
			className: "adsbygoogle",
			style: { display: "block" },
			"data-ad-client": ADSENSE_PUB_ID,
			"data-ad-slot": ADS.slots[placement],
			"data-ad-format": "auto",
			"data-full-width-responsive": "true"
		})]
	});
}
function Ink({ value, placeholder, onChange, className, multiline = false }) {
	const ref = (0, import_react.useRef)(null);
	const focused = (0, import_react.useRef)(false);
	(0, import_react.useLayoutEffect)(() => {
		const node = ref.current;
		if (!node || focused.current) return;
		if ((node.textContent ?? "") !== value) node.textContent = value;
	}, [value]);
	const shared = {
		className: cn("ink cursor-text rounded-sm outline-none hover:bg-brass-soft focus:bg-brass-soft", multiline && "block whitespace-pre-wrap", className),
		contentEditable: true,
		suppressContentEditableWarning: true,
		role: "textbox",
		"aria-label": placeholder,
		"data-placeholder": placeholder,
		spellCheck: true,
		onFocus: () => {
			focused.current = true;
		},
		onBlur: (event) => {
			focused.current = false;
			const next = (event.currentTarget.textContent ?? "").replace(/\u00a0/g, " ");
			onChange(multiline ? next.replace(/^\n+|\n+$/g, "") : next.trim());
		}
	};
	if (multiline) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		...shared
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		ref,
		...shared
	});
}
function loadGpt() {
	const w = window;
	w.googletag = w.googletag || { cmd: [] };
	if (!document.querySelector("script[data-gpt]")) {
		const s = document.createElement("script");
		s.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
		s.async = true;
		s.dataset.gpt = "1";
		document.head.appendChild(s);
	}
	return new Promise((resolve) => w.googletag.cmd.push(() => resolve(w.googletag)));
}
/** Server round-trip after the ad reports a reward: get a one-time token, then download the clean file once. */
async function redeemUnlock(format, fetcher = fetch) {
	const guestId = readGuest().guestId;
	const grant = await fetcher("/api/ad-unlock/grant", {
		method: "POST",
		headers: {
			"content-type": "application/json",
			"x-guest-id": guestId
		},
		body: JSON.stringify({ guestId })
	});
	if (!grant.ok) throw new Error(grant.status === 429 ? "daily_limit" : "unavailable");
	const { token } = await grant.json();
	const { settings } = useStudio.getState();
	const res = await fetcher("/api/ad-unlock/download", {
		method: "POST",
		headers: {
			"content-type": "application/json",
			"x-guest-id": guestId
		},
		body: JSON.stringify({
			format,
			token,
			guestId,
			docId: readLocal().docId,
			profile: layeredProfile(),
			settings
		})
	});
	if (!res.ok) throw new Error("unavailable");
	const blob = await res.blob();
	const name = /filename="([^"]+)"/.exec(res.headers.get("content-disposition") ?? "")?.[1] ?? `cv.${format}`;
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = name;
	a.click();
	setTimeout(() => URL.revokeObjectURL(url), 1e3);
}
/**
* Opt-in alternative to the ₹20 unlock. Renders nothing unless WATCH_AD_UNLOCK.enabled.
* Nothing loads until the user clicks; closing the ad simply returns to the dialog.
*/
function WatchAdOption({ format, enabled = WATCH_AD_UNLOCK.enabled }) {
	const [state, setState] = (0, import_react.useState)("idle");
	if (!enabled) return null;
	async function start() {
		setState("loading");
		try {
			const g = await loadGpt();
			const slot = g.defineOutOfPageSlot(WATCH_AD_UNLOCK.gamAdUnitPath, g.enums.OutOfPageFormat.REWARDED);
			if (!slot) return setState("error");
			slot.addService(g.pubads());
			g.pubads().addEventListener("rewardedSlotReady", (e) => e.makeRewardedVisible?.());
			g.pubads().addEventListener("rewardedSlotGranted", () => {
				redeemUnlock(format).then(() => window.location.href = "/next-steps").catch((err) => setState(err.message === "daily_limit" ? "limit" : "error"));
			});
			g.pubads().addEventListener("rewardedSlotClosed", () => {
				g.destroySlots([slot]);
				setState((s) => s === "loading" ? "idle" : s);
			});
			g.enableServices();
			g.display(slot);
		} catch {
			setState("error");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-dashed border-line p-3 text-sm",
		"data-testid": "watch-ad-option",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-semibold",
				children: tr("Or watch a short ad to download free")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: tr("Optional. You can skip or close the ad. One free clean download per day. Paying ₹20 is always available.")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				tone: "quiet",
				className: "mt-2",
				disabled: state === "loading",
				onClick: () => void start(),
				children: state === "loading" ? tr("Loading ad…") : tr("Watch ad and download")
			}),
			state === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs",
				role: "status",
				children: tr("No ad is available right now. You can still pay ₹20 or download the free watermarked PDF.")
			}) : null,
			state === "limit" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs",
				role: "status",
				children: tr("You have used today's free download. Try again tomorrow or pay ₹20.")
			}) : null
		]
	});
}
/**
* Unlock dialog: confirmation (price + entitlement) → payment → server
* verification → clean download from the server. The browser never decides
* that a payment succeeded; it only shows what the server returns.
*/
function UnlockDialog({ open, format, status, onClose }) {
	const [phase, setPhase] = (0, import_react.useState)({ kind: "confirm" });
	const [planId, setPlanId] = (0, import_react.useState)(DEFAULT_PLAN_ID);
	const plan = getPlan(planId);
	const planLabel = planPriceLabel(plan);
	const idem = (0, import_react.useRef)("");
	const closeRef = (0, import_react.useRef)(null);
	const label = format === "docx" ? tr("Word (DOCX)") : "PDF";
	(0, import_react.useEffect)(() => {
		if (!open) return;
		idem.current = newIdempotencyKey();
		setPhase({ kind: "confirm" });
		closeRef.current?.focus();
		const onKey = (e) => e.key === "Escape" && onClose();
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onClose]);
	if (!open || !status) return null;
	const isTest = status.mode === "test";
	const busy = phase.kind === "loading";
	async function fetchFile(entitlementId, test) {
		const { settings } = useStudio.getState();
		const profile = layeredProfile();
		setPhase({
			kind: "loading",
			label: `Building your clean ${label}…`
		});
		try {
			await downloadClean(format, entitlementId, profile, settings);
			setPhase({
				kind: "success",
				test
			});
		} catch (e) {
			if (e instanceof ApiError && (e.code === "edited_after_purchase" || e.code === "download_limit" || e.code === "test_entitlement")) setPhase({
				kind: "edited",
				message: e.message
			});
			else setPhase({
				kind: "failed",
				message: e instanceof Error ? e.message : tr("Download failed.")
			});
		}
	}
	async function settled(order) {
		if (order.status === "paid" && order.entitlementId) {
			if (plan.singleUse) writeLocal({
				...readLocal(),
				entitlementId: order.entitlementId,
				orderId: order.orderId,
				test: order.test
			});
			writeGuest({
				...readGuest(),
				planEntitlementId: order.entitlementId,
				planTest: order.test
			});
			await fetchFile(order.entitlementId, order.test);
		} else if (order.status === "cancelled") setPhase({ kind: "cancelled" });
		else setPhase({
			kind: "failed",
			message: tr("The payment did not go through. You were not charged for a clean file.")
		});
	}
	async function start() {
		const guest = readGuest();
		if (guest.planEntitlementId && guest.planEntitlementId !== readLocal().entitlementId) {
			const { settings } = useStudio.getState();
			const profile = layeredProfile();
			setPhase({
				kind: "loading",
				label: tr("Using your plan credits…")
			});
			try {
				await downloadClean(format, guest.planEntitlementId, profile, settings);
				setPhase({
					kind: "success",
					test: Boolean(guest.planTest)
				});
				return;
			} catch {}
		}
		const local = readLocal();
		if (local.entitlementId) {
			const { settings } = useStudio.getState();
			const profile = layeredProfile();
			setPhase({
				kind: "loading",
				label: tr("Checking your existing unlock…")
			});
			try {
				await downloadClean(format, local.entitlementId, profile, settings);
				setPhase({
					kind: "success",
					test: Boolean(local.test)
				});
				return;
			} catch (e) {
				if (!(e instanceof ApiError) || e.status === 0) {
					setPhase({
						kind: "failed",
						message: e instanceof Error ? e.message : tr("Download failed.")
					});
					return;
				}
				if (e.code === "edited_after_purchase") {
					setPhase({
						kind: "edited",
						message: `${e.message} Continue below to unlock this version.`
					});
					writeLocal({ docId: local.docId });
					return;
				}
				writeLocal({ docId: local.docId });
			}
		}
		setPhase({
			kind: "loading",
			label: tr("Creating your order…")
		});
		try {
			const { settings } = useStudio.getState();
			const profile = layeredProfile();
			const order = await createOrder(profile, settings, idem.current, planId);
			if (order.status !== "created") return settled(order);
			if (order.provider === "simulated") setPhase({
				kind: "paying",
				order
			});
			else {
				const result = await openRazorpay(order, `Clean ${label} export`);
				if (result === "dismissed") {
					await cancelOrder(order.orderId).catch(() => void 0);
					idem.current = newIdempotencyKey();
					return setPhase({ kind: "cancelled" });
				}
				setPhase({
					kind: "loading",
					label: tr("Verifying payment with the server…")
				});
				await settled(await verifyPayment(order.orderId, result.razorpay_payment_id, result.razorpay_signature));
			}
		} catch (e) {
			setPhase({
				kind: "failed",
				message: e instanceof Error ? e.message : tr("Something went wrong.")
			});
		}
	}
	async function simulate(order, outcome) {
		setPhase({
			kind: "loading",
			label: tr("TEST: server is simulating the payment…")
		});
		try {
			await settled(await simulatePayment(order.orderId, outcome));
		} catch (e) {
			setPhase({
				kind: "failed",
				message: e instanceof Error ? e.message : tr("Simulated payment failed.")
			});
		}
		idem.current = newIdempotencyKey();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 grid place-items-end bg-ink/40 p-4 sm:place-items-center",
		role: "presentation",
		onClick: () => !busy && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "unlock-title",
			"aria-describedby": "unlock-desc",
			className: "max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-line bg-sheet p-5 text-ink",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "kicker flex-1 text-forest",
							children: tr("Unlock clean download")
						}),
						isTest ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-amber-200 px-2 py-0.5 text-xs font-bold text-amber-900",
							role: "note",
							children: tr("TEST MODE — no real payment")
						}) : status.mode === "live" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-forest px-2 py-0.5 text-xs font-bold text-sheet",
							children: tr("Real payment")
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							ref: closeRef,
							type: "button",
							"aria-label": tr("Close"),
							className: "-mt-1 h-9 w-9 rounded-full text-lg",
							disabled: busy,
							onClick: onClose,
							children: "×"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "unlock-title",
					className: "mt-2 font-serif text-2xl",
					children: tr("Clean {label}", { label })
				}),
				status.mode === "unavailable" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					id: "unlock-desc",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm",
						role: "status",
						children: status.message
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							onClick: onClose,
							children: tr("OK")
						})
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					id: "unlock-desc",
					"aria-live": "polite",
					children: [
						phase.kind === "confirm" || phase.kind === "edited" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							phase.kind === "edited" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 rounded-xl bg-paper p-3 text-sm",
								role: "alert",
								children: phase.message
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
								className: "mt-3",
								"data-testid": "plan-picker",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
										className: "text-sm font-semibold",
										children: tr("Choose a plan")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex gap-3 rounded-xl border border-dashed border-line p-3 text-sm",
											"data-testid": "plan-free",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex justify-between gap-2 font-semibold",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tr("Free preview") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tr("Free") })]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "block text-xs text-muted",
													children: tr("Watermarked PDF · unlimited · no sign-in")
												})]
											})
										}), visiblePlans(status.mode === "test").map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: `flex cursor-pointer gap-3 rounded-xl border p-3 text-sm ${p.id === planId ? "border-forest bg-paper" : "border-line"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "radio",
												name: "plan",
												value: p.id,
												checked: p.id === planId,
												onChange: () => setPlanId(p.id),
												className: "mt-1"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex justify-between gap-2 font-semibold",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: planPriceLabel(p) })]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "block text-xs text-muted",
													children: p.bullets.join(" · ")
												})]
											})]
										}, p.id))]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-xs text-muted",
										children: LAUNCH_NOTE
									}),
									plan.singleUse ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-muted",
										children: status.policyText
									}) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-xs text-muted",
								children: [
									tr(status.message),
									" ",
									tr("Card/UPI details are entered only on the payment provider's page, never here.")
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 flex flex-col gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										onClick: () => void start(),
										children: isTest ? tr("Continue to TEST payment ({price})", { price: planLabel }) : tr("Pay {price} and unlock", { price: planLabel })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										tone: "quiet",
										onClick: () => {
											const { settings } = useStudio.getState();
											const profile = layeredProfile();
											downloadPreviewPdf(profile, settings, WATERMARK_LINES);
										},
										children: tr("Download FREE watermarked PDF")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WatchAdOption, { format }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										tone: "quiet",
										onClick: onClose,
										children: tr("Not now")
									})
								]
							})
						] }) : null,
						phase.kind === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 flex items-center gap-2 text-sm",
							role: "status",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "inline-block size-4 animate-spin rounded-full border-2 border-forest border-t-transparent",
								"aria-hidden": true
							}), phase.label]
						}) : null,
						phase.kind === "paying" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 rounded-xl border-2 border-dashed border-amber-400 p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold",
									children: tr("Simulated payment — TEST ONLY")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted",
									children: tr("Order {id}… · {plan} {price}. These buttons ask the server to simulate an outcome. Nothing is charged, and test unlocks never count as real purchases.", {
										id: phase.order.orderId.slice(0, 16),
										plan: plan.name,
										price: planLabel
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 grid gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "button",
											onClick: () => void simulate(phase.order, "success"),
											children: tr("Simulate success")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "button",
											tone: "quiet",
											onClick: () => void simulate(phase.order, "failure"),
											children: tr("Simulate failure")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "button",
											tone: "quiet",
											onClick: () => void simulate(phase.order, "cancel"),
											children: tr("Simulate cancel")
										})
									]
								})
							]
						}) : null,
						phase.kind === "cancelled" || phase.kind === "failed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm",
							role: "alert",
							children: phase.kind === "cancelled" ? tr("Payment cancelled. Nothing was charged and your CV is unchanged.") : phase.message
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								onClick: () => void start(),
								children: tr("Retry")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								tone: "quiet",
								onClick: onClose,
								children: tr("Close")
							})]
						})] }) : null,
						phase.kind === "success" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm",
							role: "status",
							children: phase.test ? tr("TEST unlock verified by the server — your clean file is downloading. (Test only: no money moved.)") : tr("Payment verified — your clean file is downloading.")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								onClick: onClose,
								children: tr("Done")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "/next-steps",
								className: "ms-3 text-sm underline",
								"data-testid": "next-steps-link",
								children: tr("Next steps: tips and guides")
							})]
						})] }) : null
					]
				})
			]
		})
	});
}
function esc(s) {
	return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
/**
* One page-sized SVG tile with two diagonal, semi-transparent lines. Tiled
* vertically over the on-screen preview so every page-length of the CV
* carries both lines. Purely visual: it deters casual reuse, it is NOT DRM.
*/
function watermarkSvg(lines, paper = "a4") {
	const [w, h] = paper === "letter" ? [216, 279] : [210, 297];
	const angle = -(Math.atan2(h, w) * 180 / Math.PI);
	const [a = "", b = ""] = lines;
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><g transform="translate(${w / 2} ${h / 2}) rotate(${angle.toFixed(2)})" font-family="Helvetica,Arial,sans-serif" font-weight="700" text-anchor="middle" fill="rgb(150,30,30)" fill-opacity="0.16"><text y="-22" font-size="12" textLength="175" lengthAdjust="spacingAndGlyphs">${esc(a)}</text><text y="30" font-size="17" textLength="150" lengthAdjust="spacingAndGlyphs">${esc(b)}</text></g></svg>`;
}
function watermarkDataUrl(lines, paper = "a4") {
	return `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(watermarkSvg(lines, paper))}")`;
}
/** Optional toggle: tailor this CV for one company. Off = one generic base CV for every application. */
function TargetCompanyToggle() {
	const target = useStudio((s) => s.target);
	const setTarget = useStudio((s) => s.setTarget);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl border border-line bg-sheet p-4",
		"data-testid": "target-company",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "flex cursor-pointer items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				role: "switch",
				"aria-checked": target.on,
				"data-testid": "target-toggle",
				onClick: () => setTarget({ on: !target.on }),
				className: cn("relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition", target.on ? "bg-forest" : "bg-line"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute top-0.5 size-5 rounded-full bg-sheet shadow transition-all", target.on ? "start-[22px]" : "start-0.5") })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-sm font-medium",
					children: tr("Tailoring this CV for a specific company?")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-xs text-muted",
					children: target.on ? tr("Enter the company name. A “Prepared for” line is added to the header and file name; your base CV stays unchanged.") : tr("Off: one general CV you can reuse for every application.")
				})]
			})]
		}), target.on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
			dir: "auto",
			className: "mt-3",
			"data-testid": "target-input",
			"aria-label": tr("Company name"),
			placeholder: tr("Company name"),
			value: target.company,
			onChange: (e) => setTarget({ company: e.target.value })
		}) : null]
	});
}
/** "Prepared for X" line inside the CV preview header, only when the layer is on. */
function PreparedFor({ className }) {
	const target = useStudio((s) => s.target);
	const locale = useStudio((s) => s.settings.locale);
	const company = target.on ? target.company.trim() : "";
	if (!company) return null;
	const label = COPY[locale].preparedFor;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: cn("text-xs italic", className),
		"data-testid": "cv-prepared-for",
		children: [
			label,
			" ",
			company
		]
	});
}
function PreviewColumn() {
	const settings = useStudio((state) => state.settings);
	const setSettings = useStudio((state) => state.setSettings);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [unlockFor, setUnlockFor] = (0, import_react.useState)(null);
	const [status, setStatus] = (0, import_react.useState)(null);
	const [gate, setGate] = (0, import_react.useState)({
		active: false,
		ready: false
	});
	const closeUnlock = (0, import_react.useCallback)(() => setUnlockFor(null), []);
	(0, import_react.useEffect)(() => {
		fetchStatus().then(setStatus);
		const open = () => {
			fetchStatus().then(setStatus);
			setUnlockFor("pdf");
		};
		window.addEventListener("meridian-open-plans", open);
		if (window.location.hash === "#plans") open();
		return () => window.removeEventListener("meridian-open-plans", open);
	}, []);
	function previewPdf() {
		const { settings: current } = useStudio.getState();
		const profile = layeredProfile();
		setBusy(true);
		try {
			downloadPreviewPdf(profile, current, WATERMARK_LINES);
			toast.success(tr("Watermarked preview PDF downloaded."));
		} catch (error) {
			toast.error(error instanceof Error ? error.message : tr("Could not build that file."));
		} finally {
			setBusy(false);
		}
	}
	async function unlock(format) {
		setStatus(status ?? await fetchStatus());
		setUnlockFor(format);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "lg:sticky lg:top-48",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 grid grid-cols-2 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-1 text-xs font-medium text-muted",
						children: [
							tr("CV headings"),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] font-normal text-muted",
								children: tr("Language of headings inside your CV")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: settings.locale,
								onChange: (event) => setSettings({ locale: event.target.value }),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "en",
										children: tr("English")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "fr",
										children: tr("Français")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "de",
										children: tr("Deutsch")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "es",
										children: tr("Español")
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-1 text-xs font-medium text-muted",
						children: [tr("Dates"), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: settings.dateStyle,
							onChange: (event) => setSettings({ dateStyle: event.target.value }),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "dmy",
									children: tr("DD Mon YYYY")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "mdy",
									children: tr("Mon DD, YYYY")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "iso",
									children: tr("YYYY-MM-DD")
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-1 text-xs font-medium text-muted",
						children: [tr("Name order"), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: settings.nameOrder,
							onChange: (event) => setSettings({ nameOrder: event.target.value }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "given-family",
								children: tr("Given name first")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "family-given",
								children: tr("Family name first")
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-1 text-xs font-medium text-muted",
						children: [tr("Paper"), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: settings.paper,
							onChange: (event) => setSettings({ paper: event.target.value }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "a4",
								children: "A4"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "letter",
								children: tr("US Letter")
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 rounded-2xl border border-line bg-sheet p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-paper px-2.5 py-1 text-xs font-bold tracking-wide text-forest",
								"aria-label": tr("Free preview"),
								children: tr("FREE PREVIEW")
							}),
							status?.mode === "test" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-amber-200 px-2 py-0.5 text-xs font-bold text-amber-900",
								children: tr("TEST MODE")
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "min-w-0 flex-1 text-xs text-muted",
								children: tr("Editing, templates and the watermarked preview are free. A clean, watermark-free file needs an unlock — options appear when you download.")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DownloadAdsGate, { onStatus: setGate }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								onClick: () => void unlock("pdf"),
								disabled: busy,
								children: tr("Unlock Clean Download · PDF")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								tone: "quiet",
								onClick: () => void unlock("docx"),
								disabled: busy,
								children: tr("Unlock Clean Download · Word")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								tone: "quiet",
								onClick: previewPdf,
								disabled: busy || gate.active && !gate.ready,
								children: busy ? tr("Building…") : tr("Preview PDF (watermarked)")
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnlockDialog, {
				open: unlockFor !== null,
				format: unlockFor ?? "pdf",
				status,
				onClose: closeUnlock
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-xs text-muted",
				children: tr("Click any line on the page to edit it. The form stays in step.")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "cv-preview sheet-shadow rise relative overflow-hidden rounded-2xl border border-line bg-sheet",
				"aria-describedby": "preview-watermark-note",
				children: [settings.template === "consulate" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsulatePage, {}) : settings.template === "atlas" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AtlasPage, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeridianPage, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "cv-watermark pointer-events-none absolute inset-0 z-10",
					"aria-hidden": true,
					"data-testid": "cv-watermark",
					style: {
						backgroundImage: watermarkDataUrl(WATERMARK_LINES, settings.paper),
						backgroundRepeat: "repeat-y",
						backgroundSize: "100% auto"
					}
				})]
			}, settings.template),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				id: "preview-watermark-note",
				className: "cv-print-note mt-2 text-xs text-muted",
				children: tr("Preview carries a “{mark}” watermark on every page. Use “Unlock Clean Download” for a clean file. (The watermark deters casual reuse; screenshots cannot be prevented.)", { mark: WATERMARK_LINES[1] ?? "" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, {
				placement: "belowPreview",
				className: "mt-16"
			})
		]
	});
}
function MeridianPage() {
	const personal = useStudio((state) => state.profile.personal);
	const experience = useStudio((state) => state.profile.experience);
	const education = useStudio((state) => state.profile.education);
	const skills = useStudio((state) => state.profile.skills);
	const languages = useStudio((state) => state.profile.languages);
	const certifications = useStudio((state) => state.profile.certifications);
	const settings = useStudio((state) => state.settings);
	const patch = useStudio((state) => state.patchPersonal);
	const updateExperience = useStudio((state) => state.updateExperience);
	const updateEducation = useStudio((state) => state.updateEducation);
	const copy = COPY[settings.locale];
	const name = displayName(personal, settings.nameOrder);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "paper",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-start gap-4 bg-forest px-5 py-6 text-sheet sm:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ink, {
							value: name,
							placeholder: tr(tr("Your name")),
							onChange: (value) => patch(splitDisplayName(value, settings.nameOrder)),
							className: "on-forest block font-serif text-3xl text-sheet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ink, {
							value: personal.headline,
							placeholder: tr("Headline"),
							onChange: (value) => patch({ headline: value }),
							className: "on-forest mt-1 block text-sm italic text-mist"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreparedFor, { className: "mt-1 text-brass-soft" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs break-words text-mist",
							children: [
								placeLine(personal),
								personal.email,
								phoneLine(personal)
							].filter(Boolean).join("  ·  ") || tr("City, email, phone")
						})
					]
				}), personal.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: personal.photo,
					alt: "",
					className: "size-16 shrink-0 rounded-md object-cover"
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 bg-brass" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 px-5 py-6 sm:grid-cols-[minmax(0,1fr)_11rem] sm:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { label: copy.profile }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ink, {
							multiline: true,
							value: personal.summary,
							placeholder: tr("A short profile"),
							onChange: (value) => patch({ summary: value }),
							className: "text-sm"
						}),
						experience.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { label: copy.experience }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-col gap-4",
							children: experience.map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-baseline justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ink, {
										value: role.title,
										placeholder: tr("Role"),
										onChange: (value) => updateExperience(role.id, { title: value }),
										className: "font-serif text-base"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs italic text-muted",
										children: formatSpan(role.start, role.end, role.current, settings)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm italic text-muted",
									children: [role.organization, role.location].filter(Boolean).join(" · ")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ink, {
									multiline: true,
									value: role.summary,
									placeholder: tr("What changed in this role"),
									onChange: (value) => updateExperience(role.id, { summary: value }),
									className: "mt-1 text-sm"
								})
							] }, role.id))
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-sm italic text-muted",
							children: tr("Roles you add show up here.")
						}),
						education.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { label: copy.education }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-col gap-3",
							children: education.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-serif text-base",
									children: degreeLine(item) || tr("Study")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ink, {
									value: item.institution,
									placeholder: tr("Institution"),
									onChange: (value) => updateEducation(item.id, { institution: value }),
									className: "text-sm italic text-muted"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: [item.location, formatSpan(item.start, item.end, false, settings)].filter(Boolean).join(" · ")
								})
							] }, item.id))
						})] }) : null
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "min-w-0 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { label: copy.contact }),
						addressLines(personal).map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "break-words",
							children: line
						}, line)),
						personal.nationality ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2",
							children: [
								copy.nationality,
								": ",
								personal.nationality
							]
						}) : null,
						personal.linkedin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 break-words",
							children: personal.linkedin
						}) : null,
						personal.website ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "break-words",
							children: personal.website
						}) : null,
						languages.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { label: copy.languages }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: languages.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							item.name,
							" · ",
							item.level
						] }, item.id)) })] }) : null,
						skills.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { label: copy.skills }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: skills.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item)) })] }) : null,
						certifications.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { label: copy.certifications }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: certifications.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: [item.name, item.year].filter(Boolean).join(" · ") }, item.id)) })] }) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LifeLines, { mode: "cv" })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-5 pb-6 sm:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignatureLine, {})
			})
		]
	});
}
function AtlasPage() {
	const personal = useStudio((state) => state.profile.personal);
	const experience = useStudio((state) => state.profile.experience);
	const education = useStudio((state) => state.profile.education);
	const skills = useStudio((state) => state.profile.skills);
	const settings = useStudio((state) => state.settings);
	const patch = useStudio((state) => state.patchPersonal);
	const updateExperience = useStudio((state) => state.updateExperience);
	const copy = COPY[settings.locale];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-5 py-6 sm:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ink, {
				value: displayName(personal, settings.nameOrder),
				placeholder: tr(tr("Your name")),
				onChange: (value) => patch(splitDisplayName(value, settings.nameOrder)),
				className: "block font-serif text-3xl"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ink, {
				value: personal.headline,
				placeholder: tr("Headline"),
				onChange: (value) => patch({ headline: value }),
				className: "mt-1 block text-sm text-forest"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreparedFor, { className: "mt-1 text-muted" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs break-words text-muted",
				children: [
					placeLine(personal),
					personal.email,
					phoneLine(personal),
					personal.linkedin
				].filter(Boolean).join("  |  ")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-3 h-px bg-forest" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs text-muted",
				children: tr("Date of birth, nationality, and passport stay off this résumé.")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { label: copy.profile }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ink, {
				multiline: true,
				value: personal.summary,
				placeholder: tr("A short profile"),
				onChange: (value) => patch({ summary: value }),
				className: "text-sm"
			}),
			experience.map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-baseline justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ink, {
							value: role.title,
							placeholder: tr("Role"),
							onChange: (value) => updateExperience(role.id, { title: value }),
							className: "font-medium"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted",
							children: formatSpan(role.start, role.end, role.current, settings)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: [role.organization, role.location].filter(Boolean).join(", ")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-1 list-disc ps-4 text-sm",
						children: summaryLines(role.summary).map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
					})
				]
			}, role.id)),
			education.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { label: copy.education }), education.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium",
					children: [degreeLine(item), item.institution].filter(Boolean).join(", ")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-muted",
					children: [" · ", [item.location, formatSpan(item.start, item.end, false, settings)].filter(Boolean).join(", ")]
				})]
			}, item.id))] }) : null,
			skills.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { label: copy.skills }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm",
				children: skills.join(" · ")
			})] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LifeLines, { mode: "cv" })
		]
	});
}
function ConsulatePage() {
	const profile = useStudio((state) => state.profile);
	const personal = profile.personal;
	const settings = useStudio((state) => state.settings);
	const patch = useStudio((state) => state.patchPersonal);
	const copy = COPY[settings.locale];
	const fields = [
		{
			label: tr("Full name"),
			value: displayName(personal, settings.nameOrder),
			placeholder: tr("Your name"),
			onChange: (value) => patch(splitDisplayName(value, settings.nameOrder))
		},
		{
			label: copy.born,
			value: formatWhen(personal.dateOfBirth, settings.dateStyle),
			placeholder: tr("Date of birth")
		},
		{
			label: copy.place,
			value: personal.placeOfBirth,
			placeholder: tr("Place of birth"),
			onChange: (value) => patch({ placeOfBirth: value })
		},
		{
			label: copy.nationality,
			value: personal.nationality,
			placeholder: tr("Nationality"),
			onChange: (value) => patch({ nationality: value })
		},
		{
			label: copy.passport,
			value: personal.passportNumber,
			placeholder: tr("Passport number"),
			onChange: (value) => patch({ passportNumber: value })
		},
		{
			label: tr("Occupation"),
			value: personal.headline,
			placeholder: tr("Occupation"),
			onChange: (value) => patch({ headline: value })
		},
		{
			label: tr("Email"),
			value: personal.email,
			placeholder: tr("Email"),
			onChange: (value) => patch({ email: value })
		},
		{
			label: tr("Telephone"),
			value: phoneLine(personal),
			placeholder: tr("Telephone")
		},
		{
			label: tr("Address"),
			value: addressLines(personal).join(", "),
			placeholder: tr("Address")
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "paper px-5 py-6 sm:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "kicker text-forest",
				children: ["FormZalo ", dossierCode(profile)]
			}),
			personal.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: personal.photo,
				alt: "",
				className: "mt-3 size-20 rounded-md object-cover"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-2 font-serif text-2xl",
				children: copy.particulars
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreparedFor, { className: "mt-1 text-muted" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid gap-4 sm:grid-cols-2",
				children: fields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-line pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker text-muted",
						children: field.label
					}), field.onChange ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ink, {
						value: field.value,
						placeholder: field.placeholder,
						onChange: field.onChange,
						className: "mt-1 block text-sm"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm",
						children: field.value || "—"
					})]
				}, field.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { label: copy.profile }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ink, {
				multiline: true,
				value: personal.summary,
				placeholder: tr("Statement"),
				onChange: (value) => patch({ summary: value }),
				className: "text-sm"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-xs italic text-muted",
				children: copy.declaration
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LifeLines, { mode: "full" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignatureLine, {})
		]
	});
}
function LifeLines({ mode }) {
	const profile = useStudio((state) => state.profile);
	const settings = useStudio((state) => state.settings);
	const lines = lifeLines(profile, settings, mode);
	if (!lines.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { label: mode === "full" ? tr("Family and travel") : tr("More") }), lines.map(([label, value], index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-muted",
			children: [label, ". "]
		}), value]
	}, `${label}-${index}`))] });
}
function SignatureLine() {
	const personal = useStudio((state) => state.profile.personal);
	const settings = useStudio((state) => state.settings);
	const line = templateSigns(settings) ? signatureLine(personal, settings) : null;
	if (!line) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-8 flex items-end justify-between gap-4",
		"data-testid": "cv-signature",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm",
			children: line.text
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-48 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: line.image,
				alt: line.label,
				className: "mx-auto h-14 max-w-full object-contain"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-ink pt-1 text-xs text-muted",
				children: line.label
			})]
		})]
	});
}
function Section({ label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: "kicker mb-2 mt-5 text-forest",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "border-b border-brass pb-1",
			children: label
		})
	});
}
var HEADINGS = {
	summary: "summary",
	"professional summary": "summary",
	profile: "summary",
	"about me": "summary",
	about: "summary",
	objective: "summary",
	profil: "summary",
	zusammenfassung: "summary",
	perfil: "summary",
	experience: "experience",
	"work experience": "experience",
	"professional experience": "experience",
	"employment history": "experience",
	"work history": "experience",
	employment: "experience",
	expérience: "experience",
	"expérience professionnelle": "experience",
	berufserfahrung: "experience",
	"berufliche erfahrung": "experience",
	experiencia: "experience",
	"experiencia profesional": "experience",
	"experiencia laboral": "experience",
	education: "education",
	"education and training": "education",
	"academic background": "education",
	studies: "education",
	formation: "education",
	études: "education",
	etudes: "education",
	ausbildung: "education",
	educación: "education",
	educacion: "education",
	formación: "education",
	formacion: "education",
	skills: "skills",
	"core skills": "skills",
	"key skills": "skills",
	competencies: "skills",
	competences: "skills",
	compétences: "skills",
	kompetenzen: "skills",
	kenntnisse: "skills",
	habilidades: "skills",
	competencias: "skills",
	languages: "languages",
	"language skills": "languages",
	langues: "languages",
	sprachen: "languages",
	idiomas: "languages",
	certifications: "certifications",
	certificates: "certifications",
	licenses: "certifications",
	licences: "certifications",
	certificats: "certifications",
	zertifikate: "certifications",
	certificaciones: "certifications"
};
var MONTH = "jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?|janv(?:ier)?|févr(?:ier)?|fevr(?:ier)?|mars|avr(?:il)?|mai|juin|juil(?:let)?|ao[uû]t|sept(?:embre)?|octobre|novembre|d[ée]cembre|märz|maerz|okt|dez|ene|abr|ago|dic|जनवरी|फ़रवरी|फरवरी|मार्च|अप्रैल|मई|जून|जुलाई|अगस्त|सितंबर|सितम्बर|अक्टूबर|नवंबर|दिसंबर|يناير|فبراير|مارس|أبريل|ابريل|مايو|يونيو|يوليو|أغسطس|اغسطس|سبتمبر|أكتوبر|اكتوبر|نوفمبر|ديسمبر";
var DATE_TOKEN = `(?:(?:${MONTH})\\.?\\s+\\d{4}|\\d{1,2}[\\/.\\-]\\d{4}|\\d{4}[\\/.\\-]\\d{1,2}|\\d{4})`;
var RANGE = new RegExp(`(${DATE_TOKEN})\\s*(?:–|—|-|to|à|bis)\\s*(${DATE_TOKEN}|present|current|now|aujourd['’]hui|heute|actualidad|actual|en cours|présent|presente)`, "i");
var DEGREE = /\b(Ph\.?D\.?|M\.?Sc\.?|B\.?Sc\.?|M\.?Eng\.?|B\.?Eng\.?|MBA|LL\.?M\.?|M\.?A\.?|B\.?A\.?|Bachelor(?:'s)?|Master(?:'s)?|Doctorate|Licence|Diplom)\b/i;
var MONTH_INDEX = {
	jan: "01",
	feb: "02",
	mar: "03",
	apr: "04",
	may: "05",
	jun: "06",
	jul: "07",
	aug: "08",
	sep: "09",
	oct: "10",
	nov: "11",
	dec: "12",
	janv: "01",
	févr: "02",
	fevr: "02",
	mars: "03",
	avr: "04",
	mai: "05",
	juin: "06",
	juil: "07",
	aou: "08",
	aoû: "08",
	sept: "09",
	okt: "10",
	dez: "12",
	ene: "01",
	ago: "08",
	dic: "12",
	mär: "03",
	maerz: "03",
	जनवरी: "01",
	फ़रवरी: "02",
	फरवरी: "02",
	मार्च: "03",
	अप्रैल: "04",
	मई: "05",
	जून: "06",
	जुलाई: "07",
	अगस्त: "08",
	सितंबर: "09",
	सितम्बर: "09",
	अक्टूबर: "10",
	नवंबर: "11",
	दिसंबर: "12",
	يناير: "01",
	فبراير: "02",
	مارس: "03",
	أبريل: "04",
	ابريل: "04",
	مايو: "05",
	يونيو: "06",
	يوليو: "07",
	أغسطس: "08",
	اغسطس: "08",
	سبتمبر: "09",
	أكتوبر: "10",
	اكتوبر: "10",
	نوفمبر: "11",
	ديسمبر: "12"
};
function monthKey(token) {
	const cleaned = token.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\./g, "");
	if (MONTH_INDEX[cleaned]) return MONTH_INDEX[cleaned];
	return MONTH_INDEX[cleaned.slice(0, 4)] ?? MONTH_INDEX[cleaned.slice(0, 3)];
}
/** Devanagari (०-९), Arabic-Indic (٠-٩) and Eastern Arabic (۰-۹) digits → ASCII 0-9. */
function normalizeDigits(text) {
	return text.replace(/[\u0966-\u096F\u0660-\u0669\u06F0-\u06F9]/g, (ch) => {
		const code = ch.codePointAt(0) ?? 0;
		if (code >= 2406 && code <= 2415) return String(code - 2406);
		if (code >= 1632 && code <= 1641) return String(code - 1632);
		return String(code - 1776);
	});
}
function normalize(text) {
	return normalizeDigits(text).replace(/\r/g, "").replace(/\u00a0/g, " ").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}
function matchHeading(line) {
	const raw = line.trim();
	if (!raw || raw.length > 48 || raw.includes("@")) return null;
	if (/^(cv|curriculum vitae|resume|résumé)$/i.test(raw)) return null;
	const cleaned = raw.replace(/[:|.\-–—]+$/g, "").trim().toLowerCase();
	if (HEADINGS[cleaned]) return HEADINGS[cleaned];
	if (!(raw.replace(/[^A-Za-zÀ-ÿ]/g, "").length > 3 && raw === raw.toUpperCase())) return null;
	for (const [key, section] of Object.entries(HEADINGS)) if (cleaned === key || cleaned.startsWith(`${key} `)) return section;
	return null;
}
function chunks(lines) {
	const groups = [];
	let current = [];
	for (const line of lines) if (!line.trim()) {
		if (current.length) groups.push(current);
		current = [];
	} else current.push(line.trim());
	if (current.length) groups.push(current);
	return groups;
}
function isBullet(line) {
	return /^([•·*\-–]|\d+[.)])\s+/.test(line);
}
function cleanBullet(line) {
	return line.replace(/^([•·*\-–]|\d+[.)])\s+/, "").trim();
}
function isLocation(line) {
	if (line.length > 64 || /\d{3,}/.test(line) || line.includes("@")) return false;
	return /^[\p{L}][\p{L} .'-]+,\s*[\p{L}][\p{L} .'-]+$/u.test(line);
}
function toYearMonth(token) {
	const trimmed = token.trim();
	const lower = trimmed.toLowerCase();
	if (/present|current|now|aujourd|heute|actual|cours|présent|presente/.test(lower)) return {
		value: "",
		current: true
	};
	const iso = /^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(trimmed);
	if (iso) return {
		value: `${iso[1]}-${iso[2]}`,
		current: false
	};
	const ymd = /^(\d{4})年(\d{1,2})月(?:\d{1,2}日)?$/.exec(trimmed);
	if (ymd) return {
		value: `${ymd[1]}-${(ymd[2] ?? "").padStart(2, "0")}`,
		current: false
	};
	if (/^\d{4}$/.test(trimmed)) return {
		value: trimmed,
		current: false
	};
	const named = new RegExp(`^(${MONTH})\\.?\\s+(\\d{4})$`, "i").exec(trimmed);
	if (named) {
		const month = monthKey(named[1]);
		return {
			value: month ? `${named[2]}-${month}` : named[2],
			current: false
		};
	}
	const slash = /^(\d{1,2})[/.\\-](\d{4})$/.exec(trimmed);
	if (slash) return {
		value: `${slash[2]}-${slash[1].padStart(2, "0")}`,
		current: false
	};
	const yearFirst = /^(\d{4})[/.\\-](\d{1,2})$/.exec(trimmed);
	if (yearFirst) return {
		value: `${yearFirst[1]}-${yearFirst[2].padStart(2, "0")}`,
		current: false
	};
	return {
		value: trimmed,
		current: false
	};
}
function splitRole(line) {
	if (RANGE.test(line) || isBullet(line) || isLocation(line)) return null;
	const parts = line.split(/\s+[—–|]\s+|\s+-\s+|\s+ at \s+/i);
	if (parts.length < 2) return null;
	const title = parts[0]?.trim() ?? "";
	const organization = parts.slice(1).join(" — ").trim();
	if (!title || !organization || title.length > 80) return null;
	return {
		title,
		organization
	};
}
function parseExperienceChunk(chunk) {
	let title = "";
	let organization = "";
	let location = "";
	let start = "";
	let end = "";
	let current = false;
	const notes = [];
	for (const line of chunk) {
		const range = line.match(RANGE);
		if (range && !start) {
			const from = toYearMonth(range[1] ?? "");
			const to = toYearMonth(range[2] ?? "");
			start = from.value;
			current = to.current;
			end = to.current ? "" : to.value;
			const rest = line.replace(range[0], " ").replace(/[|·•]/g, " ").replace(/\s+/g, " ").trim();
			if (rest && !title && !isLocation(rest)) {
				const role = splitRole(rest);
				if (role) {
					title = role.title;
					organization = role.organization;
				} else title = rest;
			}
			continue;
		}
		const role = !title || !organization ? splitRole(line) : null;
		if (role && !title) {
			title = role.title;
			organization = role.organization;
			continue;
		}
		if (!title && !isLocation(line) && !isBullet(line)) {
			title = line;
			continue;
		}
		if (!location && isLocation(line)) {
			location = line;
			continue;
		}
		notes.push(isBullet(line) ? cleanBullet(line) : line);
	}
	if (!title && !organization && notes.length === 0) return null;
	if (!title && !organization) return null;
	return {
		id: uid(),
		title,
		organization,
		location,
		start,
		end,
		current,
		summary: notes.join("\n")
	};
}
function splitDegree(title) {
	const match = title.match(DEGREE);
	if (!match || match.index === void 0) return {
		qualification: title,
		field: ""
	};
	return {
		qualification: match[1] ?? title,
		field: title.replace(match[0], " ").replace(/^[\s,–—-]+|[\s,–—-]+$/g, "").replace(/\s+/g, " ").trim()
	};
}
function parseEducationChunk(chunk) {
	let qualification = "";
	let field = "";
	let institution = "";
	let location = "";
	let start = "";
	let end = "";
	const notes = [];
	const joined = chunk.join(" ");
	if (!DEGREE.test(joined) && !RANGE.test(joined)) return null;
	for (const line of chunk) {
		const range = line.match(RANGE);
		if (range && !start) {
			start = toYearMonth(range[1] ?? "").value;
			const to = toYearMonth(range[2] ?? "");
			end = to.current ? "" : to.value;
			continue;
		}
		const role = splitRole(line);
		if (role && !qualification) {
			const degree = splitDegree(role.title);
			qualification = degree.qualification;
			field = degree.field;
			institution = role.organization;
			continue;
		}
		if (!qualification && DEGREE.test(line)) {
			const degree = splitDegree(line);
			qualification = degree.qualification;
			field = degree.field;
			continue;
		}
		if (!location && isLocation(line)) {
			location = line;
			continue;
		}
		if (!institution && !isBullet(line)) {
			institution = line;
			continue;
		}
		notes.push(isBullet(line) ? cleanBullet(line) : line);
	}
	if (!qualification && !institution) return null;
	return {
		id: uid(),
		institution,
		qualification,
		field,
		location,
		start,
		end,
		details: notes.join("\n")
	};
}
function parseLanguage(line) {
	const cleaned = cleanBullet(line);
	const match = /^([A-Za-zÀ-ÿ][\p{L} -]{1,32}?)\s*[—–:\-|]\s*(native|mother tongue|bilingual|fluent|professional|advanced|intermediate|elementary|basic|c2|c1|b2|b1|a2|a1)$/iu.exec(cleaned);
	if (!match) return null;
	const levelRaw = (match[2] ?? "").toLowerCase();
	const level = levelRaw === "mother tongue" || levelRaw === "bilingual" ? "Native" : levelRaw === "fluent" || levelRaw === "advanced" ? "C1" : levelRaw === "professional" ? "B2" : levelRaw === "intermediate" ? "B1" : levelRaw === "elementary" || levelRaw === "basic" ? "A2" : levelRaw === "native" ? "Native" : levelRaw.toUpperCase();
	return {
		id: uid(),
		name: (match[1] ?? "").trim(),
		level
	};
}
function parseCertification(line) {
	const cleaned = cleanBullet(line);
	if (cleaned.length < 3) return null;
	const year = cleaned.match(/\b(19|20)\d{2}\b/);
	const parts = cleaned.split(/\s+[—–|]\s+|\s+-\s+|,\s+/).map((part) => part.replace(/\(?\b(19|20)\d{2}\b\)?/g, "").trim()).filter(Boolean);
	const name = parts[0];
	if (!name) return null;
	return {
		id: uid(),
		name,
		issuer: parts[1] ?? "",
		year: year?.[0] ?? ""
	};
}
function splitSkills(text) {
	const seen = /* @__PURE__ */ new Set();
	const skills = [];
	for (const part of text.split(/[\n,;•·|]/)) {
		const skill = cleanBullet(part).replace(/\s+/g, " ").trim();
		if (skill.length < 2 || skill.length > 48) continue;
		if (skill.split(/\s+/).length > 6) continue;
		const key = skill.toLowerCase();
		if (seen.has(key)) continue;
		seen.add(key);
		skills.push(skill);
	}
	return skills;
}
var KV = [
	{
		re: /^(?:first name|given name|given names|prénom|prenom|vorname|nombre de pila|पहला नाम|الاسم الأول|名)\s*[:\-–：]\s*(.+)$/i,
		key: "givenName"
	},
	{
		re: /^(?:last name|family name|surname|nom de famille|nachname|apellidos|apellido|उपनाम|اسم العائلة|姓)\s*[:\-–：]\s*(.+)$/i,
		key: "familyName"
	},
	{
		re: /^(?:customer name|applicant name|account name|subscriber name|full name|name|nom complet|nombre completo|पूरा नाम|नाम|الاسم الكامل|الاسم|氏名|姓名|全名)\s*[:\-–：]\s*(.+)$/i,
		key: "fullName"
	},
	{
		re: /^(?:headline|title|occupation|job title|poste|beruf|profesión|profesion|provider|operator|network|पेशा|المهنة|職業|职业)\s*[:\-–：]\s*(.+)$/i,
		key: "headline"
	},
	{
		re: /^(?:e-?mail(?:\s+address)?|courriel|correo|ईमेल|البريد الإلكتروني|メールアドレス|电子邮箱|邮箱)\s*[:\-–：]\s*(.+)$/i,
		key: "email"
	},
	{
		re: /^(?:phone|telephone|téléphone|telefon|teléfono|telefono|mobile|cell|whatsapp|फ़ोन|टेलीफ़ोन|الهاتف|電話番号|電話|电话|手机)(?:\s+(?:number|no\.?|num(?:ber)?))?\s*[:\-–：]\s*(.+)$/i,
		key: "phone"
	},
	{
		re: /^(?:street|address|adresse|dirección|direccion|straße|strasse|पता|العنوان|住所|地址)\s*[:\-–：]\s*(.+)$/i,
		key: "street"
	},
	{
		re: /^(?:postal code|postcode|zip|zip code|code postal|código postal|codigo postal|plz|पिन कोड|c\.?p\.?)\s*[:\-–：]\s*(.+)$/i,
		key: "postalCode"
	},
	{
		re: /^(?:city|ville|stadt|ciudad|शहर|المدينة|市|城市)\s*[:\-–：]\s*(.+)$/i,
		key: "city"
	},
	{
		re: /^(?:region|state|province|région|bundesland|canton|राज्य|المنطقة|都道府県|省)\s*[:\-–：]\s*(.+)$/i,
		key: "region"
	},
	{
		re: /^(?:country|pays|land|país|pais|देश|البلد|国|国家)\s*[:\-–：]\s*(.+)$/i,
		key: "country"
	},
	{
		re: /^(?:nationality|nationalité|staatsangehörigkeit|nacionalidad|राष्ट्रीयता|الجنسية|国籍)\s*[:\-–：]\s*(.+)$/i,
		key: "nationality"
	},
	{
		re: /^(?:date of birth|dob|birth date|born|date de naissance|geburtsdatum|fecha de nacimiento|जन्म तिथि|تاريخ الميلاد|生年月日|出生日期)\s*[:\-–：]\s*(.+)$/i,
		key: "dateOfBirth"
	},
	{
		re: /^(?:place of birth|birth place|lieu de naissance|geburtsort|lugar de nacimiento|जन्म स्थान|مكان الميلاد|出生地)\s*[:\-–：]\s*(.+)$/i,
		key: "placeOfBirth"
	},
	{
		re: /^(?:passport|passport number|n[°ºo]\.\?\s*passeport|passeport|reisepass|pasaporte|पासपोर्ट|جواز السفر|パスポート|护照)\s*[:\-–：]\s*(.+)$/i,
		key: "passportNumber"
	},
	{
		re: /^(?:linkedin)\s*[:\-–：]\s*(.+)$/i,
		key: "linkedin"
	},
	{
		re: /^(?:website|site|web|url|portfolio|वेबसाइट|الموقع|网站)\s*[:\-–：]\s*(.+)$/i,
		key: "website"
	},
	{
		re: /^(?:summary|profile|profil|about|résumé|resumen|सारांश|ملخص|概要|简介)\s*[:\-–：]\s*(.+)$/i,
		key: "summary"
	}
];
function splitName(full) {
	const parts = full.trim().split(/\s+/).filter(Boolean);
	if (parts.length < 2) return {
		givenName: full.trim(),
		familyName: ""
	};
	const particles = /* @__PURE__ */ new Set([
		"el",
		"al",
		"de",
		"del",
		"da",
		"di",
		"van",
		"von",
		"bin",
		"ibn"
	]);
	let index = parts.length - 1;
	while (index > 1 && particles.has((parts[index - 1] ?? "").toLowerCase())) index -= 1;
	return {
		givenName: parts.slice(0, index).join(" "),
		familyName: parts.slice(index).join(" ")
	};
}
function looksLikeName(line) {
	if (line.length > 48 || /\d|@|https?:/.test(line)) return false;
	const parts = line.split(/\s+/);
	if (parts.length < 2 || parts.length > 4) return false;
	return parts.every((part) => {
		if (/^(el|al|de|van|von)$/i.test(part)) return true;
		if (!/^[\p{L}][\p{L}'’.-]+$/u.test(part)) return false;
		return !/[\p{Ll}\p{Lu}]/u.test(part) || /^[\p{Lu}]/u.test(part);
	});
}
function looseDate(value) {
	const trimmed = normalizeDigits(value.trim());
	if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
	const ymd = /^(\d{4})年(\d{1,2})月(\d{1,2})日$/.exec(trimmed);
	if (ymd) return `${ymd[1]}-${(ymd[2] ?? "").padStart(2, "0")}-${(ymd[3] ?? "").padStart(2, "0")}`;
	const named = new RegExp(`^(\\d{1,2})\\s+(${MONTH})\\.?\\s+(\\d{4})$`, "i").exec(trimmed);
	if (named) {
		const month = monthKey(named[2] ?? "");
		if (month) return `${named[3]}-${month}-${(named[1] ?? "").padStart(2, "0")}`;
	}
	const mdy = new RegExp(`^(${MONTH})\\.?\\s+(\\d{1,2}),?\\s+(\\d{4})$`, "i").exec(trimmed);
	if (mdy) {
		const month = monthKey(mdy[1] ?? "");
		if (month) return `${mdy[3]}-${month}-${(mdy[2] ?? "").padStart(2, "0")}`;
	}
	const slash = /^(\d{1,2})[/.](\d{1,2})[/.](\d{4})$/.exec(trimmed);
	if (slash) {
		const a = Number(slash[1]);
		if (Number(slash[2]) <= 12) return `${slash[3]}-${(slash[2] ?? "").padStart(2, "0")}-${(slash[1] ?? "").padStart(2, "0")}`;
		if (a <= 12) return `${slash[3]}-${(slash[1] ?? "").padStart(2, "0")}-${(slash[2] ?? "").padStart(2, "0")}`;
		return trimmed;
	}
	return trimmed;
}
function splitPhone(raw) {
	const compact = raw.replace(/[^\d+]/g, "");
	const codes = [...CALLING_CODES].sort((a, b) => b.code.length - a.code.length);
	for (const entry of codes) if (compact.startsWith(entry.code)) {
		const phone = raw.trim().replace(/^\+\d{1,3}[\s.-]*/, "").trim();
		return {
			phoneCode: entry.code,
			phone: phone || compact.slice(entry.code.length)
		};
	}
	return {
		phoneCode: "",
		phone: raw.replace(/\s+/g, " ").trim()
	};
}
function cleanUrl(value) {
	return value.replace(/^https?:\/\//i, "").replace(/^www\./i, "").replace(/\/$/, "").trim();
}
function findWebsite(text, email) {
	const domain = email?.split("@")[1]?.toLowerCase();
	const local = email?.split("@")[0]?.toLowerCase();
	const matches = text.match(/(?:https?:\/\/|www\.)?[a-z0-9][a-z0-9.-]*\.[a-z]{2,}(?:\/[^\s)]*)?/gi) ?? [];
	for (const item of matches) {
		const host = cleanUrl(item).split("/")[0]?.toLowerCase() ?? "";
		const tld = host.split(".").pop() ?? "";
		if (!host || host.includes("linkedin.com")) continue;
		if (!/^(?:com|org|net|io|co|in|uk|de|fr|ch|edu|gov|app|dev|me|info|biz|us|ca|au|ae|ng|ke|eg|eu|ai)$/i.test(tld)) continue;
		if (domain && (host === domain || host.endsWith(`.${domain}`))) continue;
		if (local && host === local) continue;
		if (email && item.toLowerCase().includes(email.toLowerCase())) continue;
		return cleanUrl(item);
	}
}
function leadingPlace(line) {
	const match = /^([\p{L}][\p{L} .'-]{1,40}),\s*([\p{L}][\p{L} .'-]{1,40})/u.exec(line.trim());
	if (!match?.[1] || !match[2]) return null;
	return {
		city: match[1].trim(),
		country: match[2].trim()
	};
}
function titleCaseIfShouting(value) {
	const letters = value.replace(/[^\p{L}]/gu, "");
	if (!letters || letters !== letters.toUpperCase()) return value;
	return value.toLowerCase().replace(/(^|[\s\-'])(\p{L})/gu, (_all, sep, char) => sep + char.toUpperCase());
}
function sectionText(blocks, name) {
	return blocks.filter((block) => block.section === name).flatMap((block) => block.lines).join("\n");
}
function readKv(lines) {
	const found = {};
	for (const line of lines) for (const field of KV) {
		const match = field.re.exec(line.trim());
		if (!match?.[1]) continue;
		const value = match[1].trim();
		if (field.key === "fullName") found.fullName = value;
		else if (field.key === "dateOfBirth") found.dateOfBirth = looseDate(value);
		else if (field.key === "phone") {
			const phone = splitPhone(value);
			if (phone.phoneCode) found.phoneCode = phone.phoneCode;
			found.phone = phone.phone;
		} else if (field.key === "linkedin" || field.key === "website") found[field.key] = cleanUrl(value);
		else found[field.key] = value;
	}
	return found;
}
function personalProposals(personal) {
	return [
		{
			key: "givenName",
			label: "Given name"
		},
		{
			key: "familyName",
			label: "Family name"
		},
		{
			key: "headline",
			label: "Headline"
		},
		{
			key: "email",
			label: "Email"
		},
		{
			key: "phoneCode",
			label: "Calling code"
		},
		{
			key: "phone",
			label: "Phone"
		},
		{
			key: "street",
			label: "Street"
		},
		{
			key: "postalCode",
			label: "Postal code"
		},
		{
			key: "city",
			label: "City"
		},
		{
			key: "region",
			label: "Region"
		},
		{
			key: "country",
			label: "Country"
		},
		{
			key: "nationality",
			label: "Nationality"
		},
		{
			key: "dateOfBirth",
			label: "Date of birth"
		},
		{
			key: "placeOfBirth",
			label: "Place of birth"
		},
		{
			key: "passportNumber",
			label: "Passport"
		},
		{
			key: "linkedin",
			label: "LinkedIn"
		},
		{
			key: "website",
			label: "Website"
		},
		{
			key: "summary",
			label: "Profile"
		}
	].flatMap(({ key, label }) => {
		const raw = personal[key];
		const value = typeof raw === "string" ? raw.trim() : "";
		if (!value) return [];
		return [{
			id: `personal.${key}`,
			label,
			detail: value,
			selected: true,
			apply: (profile) => ({
				...profile,
				personal: {
					...profile.personal,
					[key]: value
				}
			})
		}];
	});
}
function proposeFromText(source) {
	const text = normalize(source);
	if (!text) return [];
	const lines = text.split("\n");
	const kv = readKv(lines);
	const blocks = [{
		section: "header",
		lines: []
	}];
	for (const line of lines) {
		const heading = matchHeading(line);
		if (heading) blocks.push({
			section: heading,
			lines: []
		});
		else blocks[blocks.length - 1]?.lines.push(line);
	}
	const headerLines = blocks.filter((block) => block.section === "header").flatMap((block) => block.lines).map((line) => line.trim()).filter(Boolean);
	const { fullName, ...kvPersonal } = kv;
	const personal = { ...kvPersonal };
	if (fullName && !personal.givenName && !personal.familyName) {
		const split = splitName(fullName);
		personal.givenName = titleCaseIfShouting(split.givenName);
		personal.familyName = titleCaseIfShouting(split.familyName);
	}
	const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0];
	if (email && !personal.email) personal.email = email;
	if (!personal.phone) {
		const phoneMatch = text.match(/\+\d{1,3}[\s.-]?(?:\(?\d{1,4}\)?[\s.-]?){2,4}\d{2,4}/);
		const digits = phoneMatch?.[0]?.replace(/\D/g, "") ?? "";
		if (phoneMatch && digits.length >= 8 && digits.length <= 15) {
			const phone = splitPhone(phoneMatch[0]);
			if (phone.phoneCode) personal.phoneCode = phone.phoneCode;
			personal.phone = phone.phone || phoneMatch[0].trim();
		}
	}
	const linkedin = text.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[A-Za-z0-9_\-/%]+/i)?.[0];
	if (linkedin && !personal.linkedin) personal.linkedin = cleanUrl(linkedin);
	if (!personal.website) {
		const site = findWebsite(text, personal.email);
		if (site) personal.website = site;
	}
	const contentLines = headerLines.filter((line) => {
		if (KV.some((field) => field.re.test(line))) return false;
		if (line.includes("@") || /linkedin\.com/i.test(line)) return false;
		return true;
	});
	if (!personal.givenName) {
		const nameLine = contentLines.find(looksLikeName);
		if (nameLine) {
			const split = splitName(nameLine);
			personal.givenName = titleCaseIfShouting(split.givenName);
			personal.familyName = titleCaseIfShouting(split.familyName);
		}
	}
	if (!personal.headline) {
		const headline = contentLines.find((line) => {
			if (line.includes(":") || line.includes("：")) return false;
			if (looksLikeName(line) && titleCaseIfShouting(splitName(line).givenName) === personal.givenName) return false;
			if (leadingPlace(line) && line.length < 48) return false;
			return line.length < 80 && !/^[\d\s+().-]+$/.test(line);
		});
		if (headline) personal.headline = headline.split(/\s+[·|]\s+/)[0]?.trim() ?? headline;
	}
	if (!personal.city || !personal.country) for (const line of headerLines) {
		const place = leadingPlace(line);
		if (!place) continue;
		if (!personal.city) personal.city = place.city;
		if (!personal.country) personal.country = place.country;
		break;
	}
	const summaryBody = sectionText(blocks, "summary").trim();
	if (summaryBody && !personal.summary) personal.summary = summaryBody.replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
	const headed = blocks.some((block) => block.section !== "header");
	const experienceSource = headed ? sectionText(blocks, "experience") : text;
	const educationSource = headed ? sectionText(blocks, "education") : text;
	const experience = chunks(experienceSource.split("\n")).map(parseExperienceChunk).filter((item) => Boolean(item && (item.title || item.organization) && (headed || item.start || item.current))).filter((item) => headed || !DEGREE.test(`${item.title} ${item.organization}`));
	const education = chunks(educationSource.split("\n")).map(parseEducationChunk).filter((item) => Boolean(item && (item.qualification || item.institution))).filter((item) => headed || DEGREE.test(`${item.qualification} ${item.field}`));
	const skills = splitSkills(sectionText(blocks, "skills"));
	const languages = sectionText(blocks, "languages").split("\n").map(parseLanguage).filter((item) => Boolean(item));
	const certifications = sectionText(blocks, "certifications").split("\n").map((line) => line.trim()).filter(Boolean).map(parseCertification).filter((item) => Boolean(item));
	const proposals = personalProposals(personal);
	if (experience.length) proposals.push({
		id: "experience",
		label: "Work history",
		detail: experience.map((item) => item.organization || item.title).filter(Boolean).slice(0, 3).join(", "),
		selected: true,
		apply: (profile) => ({
			...profile,
			experience
		})
	});
	if (education.length) proposals.push({
		id: "education",
		label: "Education",
		detail: education.map((item) => [item.qualification, item.institution].filter(Boolean).join(" · ")).slice(0, 3).join("; "),
		selected: true,
		apply: (profile) => ({
			...profile,
			education
		})
	});
	if (skills.length) proposals.push({
		id: "skills",
		label: "Skills",
		detail: skills.slice(0, 6).join(", "),
		selected: true,
		apply: (profile) => ({
			...profile,
			skills
		})
	});
	if (languages.length) proposals.push({
		id: "languages",
		label: "Languages",
		detail: languages.map((item) => `${item.name} ${item.level}`).join(", "),
		selected: true,
		apply: (profile) => ({
			...profile,
			languages
		})
	});
	if (certifications.length) proposals.push({
		id: "certifications",
		label: "Certifications",
		detail: certifications.map((item) => item.name).join(", "),
		selected: true,
		apply: (profile) => ({
			...profile,
			certifications
		})
	});
	return proposals;
}
function applyProposals(profile, proposals) {
	return proposals.filter((item) => item.selected).reduce((next, item) => item.apply(next), profile);
}
async function readDocument(file, onProgress) {
	if (file.size > 12582912) throw new Error("That file is over 12 MB. Export a smaller PDF or a single page image.");
	const name = file.name.toLowerCase();
	if (file.type.startsWith("image/") || /\.(png|jpe?g|webp|gif|bmp|tiff?)$/.test(name)) {
		onProgress?.("Preparing the reader…");
		const text = await readImage(file, onProgress);
		if (text.replace(/\s/g, "").length < 8) throw new Error("The reader could not find words in that image. Try a sharper photo or a text PDF.");
		return {
			text,
			method: "On-device OCR"
		};
	}
	if (file.type === "application/pdf" || name.endsWith(".pdf")) {
		onProgress?.("Reading the PDF text layer…");
		const result = await readPdf(file, onProgress);
		if (result.text.replace(/\s/g, "").length < 20) throw new Error("This PDF still has no readable words after a scan pass. Photograph the page as a PNG or JPG and try that.");
		return {
			text: result.text,
			method: result.scanned ? "Scanned PDF" : "PDF text"
		};
	}
	if (file.type.startsWith("text/") || name.endsWith(".txt") || name.endsWith(".md") || name.endsWith(".csv") || file.type === "") return {
		text: await file.text(),
		method: "Plain text"
	};
	throw new Error("Use a PDF, a PNG or JPG, or a plain text file.");
}
async function readPdf(file, onProgress) {
	const { extractText, getDocumentProxy, renderPageAsImage } = await import("../_libs/unpdf.mjs").then((n) => n.t);
	const original = new Uint8Array(await file.arrayBuffer());
	const pdf = await getDocumentProxy(original.slice());
	const { text } = await extractText(pdf, { mergePages: true });
	const joined = Array.isArray(text) ? text.join("\n") : String(text ?? "");
	if (joined.replace(/\s/g, "").length >= 20) return {
		text: joined,
		scanned: false
	};
	const pages = Math.min(pdf.numPages || 1, 2);
	onProgress?.("This PDF is a scan. Reading the page as an image…");
	const chunks = [];
	for (let page = 1; page <= pages; page += 1) {
		onProgress?.(`Reading scanned page ${page} of ${pages}…`);
		const png = await renderPageAsImage(original.slice(), page, { scale: 2 });
		const image = new File([png], `page-${page}.png`, { type: "image/png" });
		chunks.push(await readImage(image, onProgress));
	}
	return {
		text: chunks.join("\n"),
		scanned: true
	};
}
async function readImage(file, onProgress) {
	const { createWorker } = await import("../_libs/tesseract.js+unenv.mjs").then((n) => /* @__PURE__ */ __toESM(n.t()));
	const worker = await createWorker("eng", 1, { logger: (message) => {
		if (message.status === "recognizing text") onProgress?.(`Reading the image… ${Math.round((message.progress ?? 0) * 100)}%`);
		else onProgress?.("Preparing the reader…");
	} });
	try {
		const bytes = new Uint8Array(await file.arrayBuffer());
		const image = typeof Buffer === "undefined" ? file : Buffer.from(bytes);
		return (await worker.recognize(image)).data.text ?? "";
	} finally {
		await worker.terminate();
	}
}
function ScanCard() {
	const profile = useStudio((state) => state.profile);
	const commit = useStudio((state) => state.commitProfile);
	const loadSample = useStudio((state) => state.loadSample);
	const inputRef = (0, import_react.useRef)(null);
	const [drag, setDrag] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [status, setStatus] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [method, setMethod] = (0, import_react.useState)("");
	const [raw, setRaw] = (0, import_react.useState)("");
	const [proposals, setProposals] = (0, import_react.useState)([]);
	const setDetected = useMode((state) => state.setDetected);
	const setMode = useMode((state) => state.setMode);
	const mode = useMode((state) => state.mode);
	const detected = useMode((state) => state.detected);
	const t = useT();
	function show(text, how) {
		const next = proposeFromText(text);
		setRaw(text);
		setMethod(how);
		setProposals(next);
		const asked = detectFormFields(text);
		setDetected(asked.length ? asked : null, how, text);
		if (asked.length && typeof window !== "undefined" && window.location.hash === "#document-file") setMode("filler");
		setError(next.length ? "" : tr("Nothing recognizable was mapped. The extracted text is below if you want to copy from it."));
	}
	async function onFile(file) {
		setBusy(true);
		setError("");
		setProposals([]);
		setStatus(tr("Opening the file…"));
		try {
			const result = await readDocument(file, setStatus);
			setStatus("");
			show(result.text, result.method);
		} catch (err) {
			setStatus("");
			setError(err instanceof Error ? err.message : tr("Could not read that file."));
		} finally {
			setBusy(false);
		}
	}
	function apply() {
		const selected = proposals.filter((item) => item.selected);
		if (!selected.length) return;
		commit(applyProposals(profile, proposals), true);
		toast.success(tr("Mapped {count} items onto the form.", { count: selected.length }));
		setProposals([]);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl border border-line bg-sheet p-4 sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid size-10 shrink-0 place-items-center rounded-xl bg-forest text-sheet",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanLine, {
						className: "size-5",
						"aria-hidden": true
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-xl",
						children: tr("Read a document")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: tr("PDF, photo, or image. The reader autofills the form on this device.")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: tr("Free CV generator · auto form filler · international CV generator")
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("mt-4 flex flex-col items-center gap-3 rounded-2xl border border-dashed px-4 py-6 text-center", drag ? "border-forest bg-brass-soft" : "border-line bg-paper"),
				onDragOver: (event) => {
					event.preventDefault();
					setDrag(true);
				},
				onDragLeave: () => setDrag(false),
				onDrop: (event) => {
					event.preventDefault();
					setDrag(false);
					const file = event.dataTransfer.files[0];
					if (file) onFile(file);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, {
						className: "size-5 text-forest",
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: tr("Drop a file here, or choose one from this device.")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						tone: "quiet",
						className: "h-11",
						onClick: () => inputRef.current?.click(),
						disabled: busy,
						children: busy ? tr("Reading…") : tr("Choose a file")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "document-file",
						ref: inputRef,
						type: "file",
						accept: ".pdf,.png,.jpg,.jpeg,.webp,.gif,.txt,.md,.csv,application/pdf,image/*,text/plain",
						className: "sr-only",
						onChange: (event) => {
							const file = event.target.files?.[0];
							event.target.value = "";
							if (file) onFile(file);
						}
					})
				]
			}),
			status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				className: "mt-3 text-sm text-forest",
				children: status
			}) : null,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "mt-3 text-sm text-ink",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-col gap-2 sm:flex-row",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						tone: "ghost",
						className: "h-11 px-4",
						"data-testid": "read-sample-cv",
						onClick: () => show(SAMPLE_CV, tr("Sample CV")),
						children: tr("Read a sample CV")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						tone: "ghost",
						className: "h-11 px-4",
						"data-testid": "read-sample-form",
						onClick: () => show(SAMPLE_FORM, tr("Sample form")),
						children: tr("Read a sample form")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						tone: "quiet",
						className: "h-11 px-4",
						"data-testid": "fill-sample-dossier",
						onClick: () => {
							loadSample();
							toast.success(tr("Sample dossier loaded."));
							setError("");
						},
						children: tr("Fill the sample dossier")
					})
				]
			}),
			detected?.length && mode !== "filler" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				"data-testid": "use-filler",
				className: "mt-3 h-11 rounded-full border border-forest px-4 text-sm font-medium text-forest",
				onClick: () => setMode("filler"),
				children: [
					t("Fill only this form's fields"),
					" (",
					detected.length,
					")"
				]
			}) : null,
			proposals.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-medium",
							children: [method ? `${method} · ` : "", tr("{n} mapped fields", { n: proposals.length })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-sm text-muted",
							onClick: () => setProposals([]),
							children: tr("Dismiss")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 flex max-h-80 flex-col gap-2 overflow-auto",
						children: proposals.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex cursor-pointer gap-3 rounded-xl border border-line bg-paper px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								className: "mt-1 size-4",
								checked: item.selected,
								onChange: () => setProposals((list) => list.map((entry) => entry.id === item.id ? {
									...entry,
									selected: !entry.selected
								} : entry))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-sm font-medium",
									children: tr(item.label)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-sm break-words text-muted",
									children: item.detail
								})]
							})]
						}) }, item.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						className: "mt-3",
						onClick: apply,
						disabled: !proposals.some((item) => item.selected),
						children: tr("Apply to the form")
					})
				]
			}) : null,
			raw ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				className: "mt-4 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
					className: "cursor-pointer text-forest",
					children: tr("Show extracted text")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "mt-2 max-h-48 overflow-auto whitespace-pre-wrap rounded-xl bg-paper p-3 text-xs text-ink",
					children: raw
				})]
			}) : null
		]
	});
}
function Control({ def, value, onChange, compact }) {
	if (def.input === "signature") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignatureSection, { compact: true });
	if (def.input === "area") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
		dir: "auto",
		className: compact ? "min-h-16" : void 0,
		value,
		"data-field": def.key,
		onChange: (e) => onChange(e.target.value)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
		dir: def.input === "date" || def.input === "email" || def.input === "tel" ? "ltr" : "auto",
		className: compact ? "h-9" : void 0,
		type: def.input === "date" ? "date" : def.input === "email" ? "email" : "text",
		inputMode: def.input === "tel" ? "tel" : void 0,
		value,
		"data-field": def.key,
		onChange: (e) => onChange(e.target.value)
	});
}
function FieldInput({ def, compact }) {
	const t = useT();
	const raw = useStudio((s) => s.profile.personal[def.key]);
	const patch = useStudio((s) => s.patchPersonal);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
		label: t(def.en),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Control, {
			def,
			compact,
			value: typeof raw === "string" ? raw : "",
			onChange: (v) => patch({ [def.key]: v })
		})
	});
}
/**
* Pop-up listing what the form needs and the profile lacks. Answers are saved back to the
* profile (known fields) or to "More details" (custom rows) so they are reused next time.
* Nothing is pre-filled or guessed.
*/
function MissingFieldsDialog({ open, onClose, fields, custom, askCompany = false }) {
	const t = useT();
	const saveAnswers = useStudio((s) => s.saveAnswers);
	const setTarget = useStudio((s) => s.setTarget);
	const [company, setCompany] = (0, import_react.useState)("");
	const [values, setValues] = (0, import_react.useState)({});
	const [extra, setExtra] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setValues({});
		setCompany("");
		setExtra(custom.map((label) => ({
			label,
			value: ""
		})));
	}, [open, custom]);
	if (!open) return null;
	const save = () => {
		const known = {};
		for (const def of fields) {
			const v = values[def.key]?.trim();
			if (v && def.input !== "signature") known[def.key] = v;
		}
		saveAnswers(known, extra);
		if (company.trim()) setTarget({
			on: true,
			company: company.trim()
		});
		onClose();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 grid place-items-end bg-ink/40 p-4 sm:place-items-center",
		role: "presentation",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "missing-title",
			"data-testid": "missing-dialog",
			className: "max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-line bg-sheet p-5 text-ink",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-start gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "missing-title",
						className: "flex-1 font-serif text-xl",
						children: fields.length || custom.length || askCompany ? t("This form needs a few more details") : t("Add more details")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "grid size-9 place-items-center text-muted",
						"aria-label": t("Close"),
						onClick: onClose,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
							className: "size-4",
							"aria-hidden": true
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 text-xs text-muted",
					children: t("Fill in what you know. Empty answers are skipped, and nothing is guessed. Answers are saved to your profile for next time.")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3",
					"data-testid": "missing-fields",
					children: [
						fields.map((def) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t(def.en),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Control, {
								def,
								value: values[def.key] ?? "",
								onChange: (v) => setValues((s) => ({
									...s,
									[def.key]: v
								}))
							})
						}, def.key)),
						askCompany ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("Company you are applying to"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								dir: "auto",
								"data-testid": "missing-company",
								value: company,
								onChange: (e) => setCompany(e.target.value)
							})
						}) : null,
						extra.map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-[1fr_1.4fr] gap-2",
							"data-testid": "missing-custom",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								dir: "auto",
								"aria-label": t("Detail name"),
								placeholder: t("Detail name"),
								value: row.label,
								onChange: (e) => setExtra((rows) => rows.map((r, i) => i === index ? {
									...r,
									label: e.target.value
								} : r))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								dir: "auto",
								"aria-label": t("Value"),
								placeholder: t("Value"),
								value: row.value,
								onChange: (e) => setExtra((rows) => rows.map((r, i) => i === index ? {
									...r,
									value: e.target.value
								} : r))
							})]
						}, index)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							tone: "quiet",
							className: "h-11 self-start px-4",
							"data-testid": "missing-add-row",
							onClick: () => setExtra((rows) => [...rows, {
								label: "",
								value: ""
							}]),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
									className: "size-4",
									"aria-hidden": true
								}),
								" ",
								t("Add another detail")
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						tone: "quiet",
						className: "h-11",
						onClick: onClose,
						children: t("Later")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "h-11",
						"data-testid": "missing-save",
						onClick: save,
						children: t("Save to profile")
					})]
				})
			]
		})
	});
}
function FormFiller() {
	const t = useT();
	const detected = useMode((s) => s.detected);
	const source = useMode((s) => s.source);
	const formText = useMode((s) => s.formText);
	const personal = useStudio((s) => s.profile.personal);
	const target = useStudio((s) => s.target);
	const setTarget = useStudio((s) => s.setTarget);
	const [dialog, setDialog] = (0, import_react.useState)(false);
	const [askedFor, setAskedFor] = (0, import_react.useState)("");
	const main = detected?.length ? FORM_FIELDS.filter((f) => detected.includes(f.key) && f.usage !== "unused") : fieldsByUsage("used");
	const mainKeys = new Set(main.map((f) => f.key));
	const optional = FORM_FIELDS.filter((f) => f.usage !== "unused" && !mainKeys.has(f.key));
	const isFilled = (f) => {
		const v = personal[f.key];
		return typeof v === "string" && v.trim() !== "";
	};
	const filledCount = main.filter(isFilled).length;
	const report = (0, import_react.useMemo)(() => formText ? findMissing(formText, personal, detected, activeCompany(target)) : {
		fields: [],
		custom: [],
		targetCompany: false
	}, [
		formText,
		personal,
		detected,
		target
	]);
	(0, import_react.useEffect)(() => {
		if (!formText || formText === askedFor) return;
		setAskedFor(formText);
		if (report.fields.length || report.custom.length || report.targetCompany) setDialog(true);
	}, [
		formText,
		askedFor,
		report
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		"data-testid": "form-filler",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: detected?.length ? t("Fields this form needs") : t("Common form fields"),
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-brass-soft px-2.5 py-1 text-xs font-medium",
					"data-testid": "filled-count",
					children: t("{n}/{total} filled", {
						n: filledCount,
						total: main.length
					})
				}),
				children: [
					detected?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "-mt-2 mb-3 text-xs text-muted",
						children: [
							t("Detected from"),
							": ",
							source ? t(source) : "—"
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "-mt-2 mb-3 text-xs text-muted",
						children: t("Upload or read a form above. We'll show only the fields it asks for.")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						"data-testid": "filler-main",
						children: main.map((def) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn((def.input === "area" || def.input === "signature") && "sm:col-span-2"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, { def })
						}, def.key))
					}),
					formText && TARGET_COMPANY.test(formText) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("Company you are applying to"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								dir: "auto",
								"data-testid": "filler-company",
								value: target.company,
								onChange: (e) => setTarget({
									on: true,
									company: e.target.value
								})
							})
						})
					}) : null,
					report.fields.length || report.custom.length || report.targetCompany ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "mt-3 w-full rounded-xl bg-brass-soft px-3 py-2 text-start text-xs",
						"data-testid": "filler-missing",
						onClick: () => setDialog(true),
						children: [
							t("Still missing"),
							" (",
							report.fields.length + report.custom.length + (report.targetCompany ? 1 : 0),
							"): ",
							[
								...report.fields.map((f) => t(f.en)),
								...report.targetCompany ? [t("Company you are applying to")] : [],
								...report.custom
							].join(", ")
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-muted",
						children: t("Work history, education, skills and languages are shared with the CV Generator.")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: t("More details"),
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					tone: "quiet",
					className: "h-10 px-3",
					"data-testid": "filler-add-more",
					onClick: () => setDialog(true),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
							className: "size-4",
							"aria-hidden": true
						}),
						" ",
						t("Add more details")
					]
				}),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "-mt-2 mb-3 text-xs text-muted",
					children: t("Anything else your CV or forms need. Add as many as you like.")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomDetails, {})]
			}),
			optional.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				className: "group rounded-2xl border border-line bg-sheet",
				"data-testid": "filler-more",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
					className: "flex h-12 cursor-pointer list-none items-center justify-between gap-2 px-4 text-sm font-medium",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2",
						children: [t("More details (optional)"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-paper px-2 py-0.5 text-xs text-muted",
							"data-testid": "more-count",
							children: optional.length
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
						className: "size-4 transition group-open:rotate-180",
						"aria-hidden": true
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-2 px-4 pb-4 sm:grid-cols-2",
					children: optional.map((def) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn(def.input === "signature" && "sm:col-span-2"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
							def,
							compact: true
						})
					}, def.key))
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MissingFieldsDialog, {
				open: dialog,
				onClose: () => setDialog(false),
				fields: report.fields,
				custom: report.custom,
				askCompany: report.targetCompany
			})
		]
	});
}
function ModeSwitch() {
	const t = useT();
	const mode = useMode((s) => s.mode);
	const setMode = useMode((s) => s.setMode);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		"data-testid": "mode-switch",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "kicker shrink-0 text-muted",
			children: t("Mode")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			role: "tablist",
			className: "grid min-w-0 flex-1 grid-cols-2 rounded-full border border-line bg-sheet p-1",
			children: ["generator", "filler"].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				role: "tab",
				"aria-selected": mode === m,
				title: m === "generator" ? t("Collects every CV field.") : t("Only the fields your form needs."),
				"data-testid": `mode-${m}`,
				className: cn("h-9 rounded-full text-sm font-medium", mode === m ? "bg-forest text-sheet" : "text-muted"),
				onClick: () => setMode(m),
				children: m === "generator" ? t("CV Generator") : t("Form Filler")
			}, m))
		})]
	});
}
function Studio() {
	const tab = useStudio((state) => state.tab);
	const setTab = useStudio((state) => state.setTab);
	const settings = useStudio((state) => state.settings);
	const setSettings = useStudio((state) => state.setSettings);
	const undo = useStudio((state) => state.undo);
	const undoProfile = useStudio((state) => state.undoProfile);
	const mode = useMode((state) => state.mode);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id: "cv-editor",
		className: "min-h-screen bg-paper text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, { current: "editor" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-line bg-paper/95",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3",
					children: [
						undo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "ms-auto h-11 px-2 text-sm font-medium text-forest",
								onClick: undoProfile,
								children: tr("Undo")
							})
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-3 text-sm",
							htmlFor: "document-kind",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "kicker shrink-0 text-muted",
								children: tr("Document")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								id: "document-kind",
								value: settings.template,
								onChange: (event) => setSettings({ template: event.target.value }),
								className: "h-11 min-w-0 flex-1 rounded-full border border-line bg-sheet px-3 text-sm",
								children: TEMPLATES.map((template) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: template.id,
									children: [
										tr(template.label),
										" — ",
										tr(template.hint)
									]
								}, template.id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeSwitch, {})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto grid max-w-6xl gap-6 px-4 py-6 pb-28 lg:grid-cols-2 lg:items-start lg:pb-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("flex min-w-0 flex-col gap-4", tab !== "compose" && "hidden lg:flex"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanCard, {}),
						mode === "filler" ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TargetCompanyToggle, {}),
						mode === "filler" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormFiller, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileForm, {})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("min-w-0", tab !== "preview" && "hidden lg:block"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewColumn, {})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 grid h-16 grid-cols-2 border-t border-line bg-sheet lg:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: cn("text-sm font-medium", tab === "compose" ? "text-forest" : "text-muted"),
					onClick: () => setTab("compose"),
					children: tr("Compose")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: cn("text-sm font-medium", tab === "preview" ? "text-forest" : "text-muted"),
					onClick: () => setTab("preview"),
					children: tr("Preview")
				})]
			})
		]
	});
}
/**
* Homepage hero (front-look fix #3 + professional polish).
*
* Layout pattern borrowed from leading CV-builder homepages (Resume.io,
* Zety, Novoresume — structure only, no copied text, images or claims):
* one headline, one value proposition, one clear CTA, a row of honest
* trust signals, and a 3-step strip. All copy is FormZalo's own and true
* to the product: free CV generator, one Master Profile, PDF/Word
* download, Auto Form Filler as a paid-plan feature. Text only — no
* stock photos or invented statistics.
*/
function Hero() {
	const steps = [
		{
			n: "1",
			title: tr("Choose a template")
		},
		{
			n: "2",
			title: tr("Fill your Master Profile")
		},
		{
			n: "3",
			title: tr("Download PDF or Word")
		}
	];
	const trust = [
		tr("Free watermarked preview"),
		tr("No sign-up — guest mode"),
		tr("Your data stays in this browser")
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-b border-line bg-sheet",
		"aria-labelledby": "hero-title",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 py-10 text-center sm:py-14",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker text-forest",
					children: tr("FormZalo — Free CV generator & auto form filler")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					id: "hero-title",
					className: "mx-auto mt-3 max-w-3xl font-serif text-4xl leading-tight text-ink sm:text-5xl",
					children: tr("Build a professional CV from one Master Profile.")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg",
					children: tr("Fill in your details once, choose a template, and download PDF or Word. Reuse the same profile to fill job application forms faster.")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-col items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#cv-editor",
						className: "flex h-12 items-center justify-center rounded-full bg-forest px-6 text-base font-medium text-sheet",
						children: tr("Start building your CV — free")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: tr("Auto Form Filler is a paid-plan feature.")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted",
					children: trust.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
								className: "size-4 text-forest",
								"aria-hidden": true
							}),
							" ",
							item
						]
					}, item))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mx-auto mt-8 grid max-w-3xl gap-3 text-left sm:grid-cols-3",
					children: steps.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start gap-3 rounded-2xl border border-line bg-paper p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-8 shrink-0 place-items-center rounded-full bg-forest font-serif text-sm text-sheet",
							"aria-hidden": true,
							children: s.n
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "pt-1 text-sm font-medium",
							children: s.title
						})]
					}, s.n))
				})
			]
		})
	});
}
/** Landing-page content block below the tool: guide links, then (if enabled) one ad, far from editor buttons. */
function GuidesTeaser() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-t border-line bg-paper",
		"data-testid": "guides-teaser",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 py-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-2xl",
					children: tr("Guides for your CV and job applications")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
					children: GUIDES.slice(0, 4).map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `/guides/${g.slug}`,
						className: "block h-full rounded-xl border border-line bg-sheet p-4 text-sm hover:border-forest",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: tr(g.title)
						})
					}) }, g.slug))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/guides",
							className: "underline",
							children: tr("All guides")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mx-2",
							children: "·"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/templates",
							className: "underline",
							children: tr("Templates gallery")
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, { placement: "landing" })
			]
		})
	});
}
function Home() {
	const hydrate = useStudio((state) => state.hydrate);
	(0, import_react.useEffect)(() => {
		hydrate();
		const pick = new URLSearchParams(window.location.search).get("template");
		if (pick && TEMPLATES.some((t) => t.id === pick)) {
			useStudio.getState().setSettings({ template: pick });
			window.history.replaceState(null, "", "/");
		}
	}, [hydrate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Studio, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuidesTeaser, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsentGate, {})
	] });
}
//#endregion
export { Home as component };
