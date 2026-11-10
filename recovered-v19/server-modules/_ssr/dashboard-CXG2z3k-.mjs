import { o as __toESM } from "../_runtime.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { $ as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as trObj, l as uiLocale, s as tr } from "./site-footer-CrbBo0PJ.mjs";
import { S as Briefcase, _ as Copy, c as Share2, d as PenLine, g as CreditCard, i as Upload, m as FilePlus2, n as Wallet, p as FileText, r as Users, v as ClipboardList, y as CircleCheck } from "../_libs/lucide-react.mjs";
import { $ as emptyPersonal, K as defaultSettings, Q as emptyExperience, W as TEMPLATES, X as emptyChild, Z as emptyEducation, et as emptyProfile, st as sampleProfile, tt as emptyTrip, ut as uid$1 } from "./router-BXvCCxej.mjs";
import { a as readConsent, n as SUPPORT_EMAIL } from "./consent-DPmgtzXN.mjs";
import { a as deleteClient, i as createClientLink, l as listClients, r as WithdrawButton, s as getClient, u as revokeClientLinks } from "./consent-ui-3p1JoNf4.mjs";
import { n as resolveComplaint, t as listComplaints } from "./client-BAtCw8bu.mjs";
//#region ../repo/node_modules/.nitro/vite/services/ssr/assets/dashboard-CXG2z3k-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Browser side of the paid export. Local storage only remembers a document id
* and the server-issued entitlement id (a reference, like a receipt number).
* It grants nothing by itself: every clean download is re-checked on the server.
*/
var KEY = "meridian.export.v1";
var API = "/api/paid-export";
function randomId(prefix) {
	const bytes = /* @__PURE__ */ new Uint8Array(12);
	crypto.getRandomValues(bytes);
	return `${prefix}_${Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("")}`;
}
function readLocal() {
	try {
		const raw = JSON.parse(localStorage.getItem(KEY) || "null");
		if (raw && typeof raw.docId === "string" && raw.docId.length >= 8) return raw;
	} catch {}
	const fresh = { docId: randomId("doc") };
	writeLocal(fresh);
	return fresh;
}
function writeLocal(next) {
	try {
		localStorage.setItem(KEY, JSON.stringify(next));
	} catch {}
}
var ApiError = class extends Error {
	status;
	code;
	constructor(status, code, message) {
		super(message);
		this.status = status;
		this.code = code;
	}
};
async function call(path, init) {
	let res;
	try {
		res = await fetch(`${API}/${path}`, {
			...init,
			headers: {
				"content-type": "application/json",
				...init?.headers ?? {}
			}
		});
	} catch {
		throw new ApiError(0, "network", "Could not reach the server. Check your connection and retry.");
	}
	if (!(res.headers.get("content-type") ?? "").includes("application/json")) {
		if (!res.ok) throw new ApiError(res.status, "server_unavailable", "Paid exports are not yet available on this site.");
		return res;
	}
	const body = await res.json();
	if (!res.ok) throw new ApiError(res.status, body.error ?? "error", body.message ?? "Request failed.");
	return body;
}
async function fetchStatus() {
	try {
		return await call("status");
	} catch {
		return {
			mode: "unavailable",
			trialMode: true,
			priceMinor: 0,
			currency: "INR",
			priceLabel: "",
			policy: "version",
			maxDownloads: 0,
			policyText: "",
			provider: null,
			message: "Paid clean exports are not yet available. You can keep editing and download the watermarked preview for free."
		};
	}
}
function createOrder(profile, settings, idempotencyKey, planId) {
	const { docId } = readLocal();
	return call("order", {
		method: "POST",
		body: JSON.stringify({
			docId,
			profile,
			settings,
			idempotencyKey,
			planId
		})
	});
}
function simulatePayment(orderId, outcome) {
	return call("simulate", {
		method: "POST",
		body: JSON.stringify({
			orderId,
			outcome
		})
	});
}
function verifyPayment(orderId, paymentId, signature) {
	return call("verify", {
		method: "POST",
		body: JSON.stringify({
			orderId,
			paymentId,
			signature
		})
	});
}
function cancelOrder(orderId) {
	return call("cancel", {
		method: "POST",
		body: JSON.stringify({ orderId })
	});
}
function newIdempotencyKey() {
	return randomId("idem");
}
async function downloadClean(format, entitlementId, profile, settings) {
	const { docId } = readLocal();
	const res = await call("download", {
		method: "POST",
		body: JSON.stringify({
			format,
			entitlementId,
			docId,
			profile,
			settings
		})
	});
	const blob = await res.blob();
	const name = /filename="([^"]+)"/.exec(res.headers.get("content-disposition") ?? "")?.[1] ?? `cv.${format}`;
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = name;
	link.click();
	setTimeout(() => URL.revokeObjectURL(url), 1e3);
	recordExport(profile, settings);
}
async function openRazorpay(order, description) {
	await new Promise((resolve, reject) => {
		if (window.Razorpay) return resolve();
		const s = document.createElement("script");
		s.src = "https://checkout.razorpay.com/v1/checkout.js";
		s.onload = () => resolve();
		s.onerror = () => reject(new ApiError(0, "checkout_load", "Could not load the payment window."));
		document.head.appendChild(s);
	});
	return new Promise((resolve) => {
		const Rzp = window.Razorpay;
		new Rzp({
			key: order.publicKey,
			order_id: order.providerOrderId,
			amount: order.amountMinor,
			currency: order.currency,
			name: "Meridian CV",
			description,
			handler: (r) => resolve(r),
			modal: { ondismiss: () => resolve("dismissed") }
		}).open();
	});
}
var GUEST_KEY = "meridian.guest.v1";
var memGuest = null;
function readGuest() {
	try {
		const raw = JSON.parse(localStorage.getItem(GUEST_KEY) || "null");
		if (raw && typeof raw.guestId === "string") return {
			...raw,
			exported: raw.exported ?? [],
			formFillsUsed: raw.formFillsUsed ?? 0,
			companies: raw.companies ?? []
		};
	} catch {}
	const fresh = memGuest ?? {
		guestId: randomId("guest"),
		createdAt: Date.now(),
		exported: [],
		formFillsUsed: 0,
		companies: []
	};
	if (readConsent()) writeGuest(fresh);
	else memGuest = fresh;
	return fresh;
}
function writeGuest(next) {
	memGuest = next;
	try {
		if (!readConsent()) {
			window.dispatchEvent(new Event("meridian-guest"));
			return;
		}
		localStorage.setItem(GUEST_KEY, JSON.stringify(next));
		window.dispatchEvent(new Event("meridian-guest"));
	} catch {}
}
function fingerprint(profile, settings) {
	const str = JSON.stringify([profile, settings ?? null]);
	let h = 2166136261;
	for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619);
	return (h >>> 0).toString(36);
}
function recordExport(profile, settings) {
	const g = readGuest();
	const fp = fingerprint(profile, settings);
	if (!g.exported.includes(fp)) writeGuest({
		...g,
		exported: [...g.exported, fp]
	});
}
function fetchCredits(entitlementId) {
	return call("credits", {
		method: "POST",
		body: JSON.stringify({ entitlementId })
	});
}
var L = (words) => new RegExp(`^\\s*(?:${words})\\s*(?:[:\\-–：]|$)`, "im");
var FORM_FIELDS = [
	{
		key: "givenName",
		usage: "used",
		en: "Given name",
		hi: "पहला नाम",
		detect: L("first name|given names?|prénom|prenom|vorname|nombre de pila|nom complet|nombre completo|full name|name|applicant name|customer name|पहला नाम|पूरा नाम|الاسم الأول|الاسم الكامل|名|氏名|姓名")
	},
	{
		key: "familyName",
		usage: "used",
		en: "Family name",
		hi: "उपनाम",
		detect: L("last name|family name|surname|nom de famille|nachname|apellidos?|nom complet|nombre completo|full name|name|applicant name|customer name|उपनाम|पूरा नाम|اسم العائلة|الاسم الكامل|姓|氏名|姓名")
	},
	{
		key: "headline",
		usage: "used",
		en: "Occupation / headline",
		hi: "पेशा / शीर्षक",
		detect: L("headline|title|occupation|job title|poste|beruf|profesi[oó]n|पेशा|المهنة|職業|职业")
	},
	{
		key: "email",
		usage: "used",
		en: "Email",
		hi: "ईमेल",
		input: "email",
		detect: L("e-?mail(?: address)?|courriel|correo|ईमेल|البريد الإلكتروني|メールアドレス|电子邮箱|邮箱")
	},
	{
		key: "phoneCode",
		usage: "used",
		en: "Calling code",
		hi: "देश कोड",
		detect: L("(?:phone|telephone|téléphone|telefon|teléfono|mobile|cell|whatsapp|फ़ोन|الهاتف|電話番号|電話|电话)(?: number| no\\.?)?")
	},
	{
		key: "phone",
		usage: "used",
		en: "Phone",
		hi: "फ़ोन",
		input: "tel",
		detect: L("(?:phone|telephone|téléphone|telefon|teléfono|mobile|cell|whatsapp|फ़ोन|टेलीफ़ोन|الهاتف|電話番号|電話|电话|手机)(?: number| no\\.?)?")
	},
	{
		key: "street",
		usage: "used",
		en: "Street / address",
		hi: "पता",
		detect: L("street|address|adresse|direcci[oó]n|stra(?:ß|ss)e|पता|العنوان|住所|地址")
	},
	{
		key: "postalCode",
		usage: "used",
		en: "Postal code",
		hi: "पिन कोड",
		detect: L("postal code|postcode|zip(?: code)?|pin(?: code)?|पिन कोड|code postal|código postal|codigo postal|plz|الرمز البريدي|郵便番号|邮政编码")
	},
	{
		key: "city",
		usage: "used",
		en: "City",
		hi: "शहर",
		detect: L("city|ville|stadt|ciudad|शहर|المدينة|市|城市")
	},
	{
		key: "region",
		usage: "used",
		en: "State / region",
		hi: "राज्य",
		detect: L("region|state|province|région|bundesland|canton|राज्य|المنطقة|都道府県|省")
	},
	{
		key: "country",
		usage: "used",
		en: "Country",
		hi: "देश",
		detect: L("country|pays|land|pa[ií]s|देश|البلد|国|国家")
	},
	{
		key: "nationality",
		usage: "used",
		en: "Nationality",
		hi: "राष्ट्रीयता",
		detect: L("nationality|nationalité|staatsangehörigkeit|nacionalidad|citizenship|राष्ट्रीयता|الجنسية|国籍")
	},
	{
		key: "dateOfBirth",
		usage: "used",
		en: "Date of birth",
		hi: "जन्म तिथि",
		input: "date",
		detect: L("date of birth|dob|birth date|born|date de naissance|geburtsdatum|fecha de nacimiento|जन्म तिथि|تاريخ الميلاد|生年月日|出生日期")
	},
	{
		key: "placeOfBirth",
		usage: "used",
		en: "Place of birth",
		hi: "जन्म स्थान",
		detect: L("place of birth|birth place|lieu de naissance|geburtsort|lugar de nacimiento|जन्म स्थान|مكان الميلاد|出生地")
	},
	{
		key: "passportNumber",
		usage: "used",
		en: "Passport number",
		hi: "पासपोर्ट नंबर",
		detect: L("passport(?: number| no\\.?)?|passeport|reisepass|pasaporte|पासपोर्ट|جواز السفر|パスポート|护照")
	},
	{
		key: "linkedin",
		usage: "used",
		en: "LinkedIn",
		hi: "लिंक्डइन",
		detect: L("linkedin")
	},
	{
		key: "website",
		usage: "used",
		en: "Website",
		hi: "वेबसाइट",
		detect: L("website|site|web|url|portfolio")
	},
	{
		key: "summary",
		usage: "used",
		en: "Profile / summary",
		hi: "प्रोफ़ाइल सारांश",
		input: "area",
		detect: L("summary|profile|profil|about|résumé|resumen|सारांश|ملخص|概要|简介")
	},
	{
		key: "signature",
		usage: "used",
		en: "Signature",
		hi: "हस्ताक्षर",
		input: "signature",
		detect: L("(?:applicant'?s |candidate'?s )?signature(?: of (?:the )?applicant)?|sign(?:ed)?(?: here)?|unterschrift|firma|हस्ताक्षर|التوقيع|署名|签名")
	},
	{
		key: "sex",
		usage: "extra",
		en: "Sex",
		hi: "लिंग",
		detect: L("sex|gender")
	},
	{
		key: "maritalStatus",
		usage: "extra",
		en: "Marital status",
		hi: "वैवाहिक स्थिति",
		detect: L("marital status|civil status")
	},
	{
		key: "surnameAtBirth",
		usage: "extra",
		en: "Surname at birth",
		hi: "जन्म के समय उपनाम",
		detect: L("surname at birth|maiden name|birth name")
	},
	{
		key: "nationalityAtBirth",
		usage: "extra",
		en: "Nationality at birth",
		hi: "जन्म के समय राष्ट्रीयता",
		detect: L("nationality at birth")
	},
	{
		key: "otherNationalities",
		usage: "extra",
		en: "Other nationalities",
		hi: "अन्य राष्ट्रीयताएँ",
		detect: L("other nationalit(?:y|ies)")
	},
	{
		key: "nationalId",
		usage: "extra",
		en: "National ID number",
		hi: "राष्ट्रीय पहचान संख्या",
		detect: L("national id(?: number)?|aadhaar(?: number)?|id number")
	},
	{
		key: "positionApplied",
		usage: "extra",
		en: "Position applied for",
		hi: "आवेदित पद",
		detect: L("position(?: applied for)?|post applied for")
	},
	{
		key: "drivingLicence",
		usage: "extra",
		en: "Driving licence",
		hi: "ड्राइविंग लाइसेंस",
		detect: L("driving licen[cs]e|driver'?s licen[cs]e")
	},
	{
		key: "fatherName",
		usage: "extra",
		en: "Father's name",
		hi: "पिता का नाम",
		detect: L("father(?:'s)?(?: name)?")
	},
	{
		key: "motherName",
		usage: "extra",
		en: "Mother's name",
		hi: "माता का नाम",
		detect: L("mother(?:'s)?(?: name)?")
	},
	{
		key: "spouseName",
		usage: "extra",
		en: "Spouse's name",
		hi: "जीवनसाथी का नाम",
		detect: L("spouse(?:'s)?(?: name)?|husband|wife")
	},
	{
		key: "guardian",
		usage: "extra",
		en: "Guardian",
		hi: "अभिभावक",
		detect: L("guardian")
	},
	{
		key: "eyeColour",
		usage: "extra",
		en: "Eye colour",
		hi: "आँखों का रंग",
		detect: L("eye colou?r")
	},
	{
		key: "hairColour",
		usage: "extra",
		en: "Hair colour",
		hi: "बालों का रंग",
		detect: L("hair colou?r")
	},
	{
		key: "digitalSkills",
		usage: "extra",
		en: "Digital skills",
		hi: "डिजिटल कौशल",
		input: "area",
		detect: L("digital skills")
	},
	{
		key: "projects",
		usage: "extra",
		en: "Projects",
		hi: "परियोजनाएँ",
		input: "area",
		detect: L("projects")
	},
	{
		key: "publications",
		usage: "extra",
		en: "Publications",
		hi: "प्रकाशन",
		input: "area",
		detect: L("publications")
	},
	{
		key: "volunteering",
		usage: "extra",
		en: "Volunteering",
		hi: "स्वयंसेवा",
		input: "area",
		detect: L("volunteering|volunteer work")
	},
	{
		key: "memberships",
		usage: "extra",
		en: "Memberships",
		hi: "सदस्यताएँ",
		input: "area",
		detect: L("memberships")
	},
	{
		key: "referencesNote",
		usage: "extra",
		en: "References",
		hi: "संदर्भ",
		input: "area",
		detect: L("references")
	},
	{
		key: "merit",
		usage: "extra",
		en: "Merit / award",
		hi: "योग्यता / पुरस्कार",
		detect: L("merit|awards?")
	},
	{
		key: "hobbies",
		usage: "extra",
		en: "Hobbies",
		hi: "शौक",
		detect: L("hobbies|interests")
	},
	{
		key: "visaPurpose",
		usage: "extra",
		en: "Purpose of travel",
		hi: "यात्रा का उद्देश्य",
		detect: L("purpose of (?:travel|visit)|visa purpose")
	},
	{
		key: "destination",
		usage: "extra",
		en: "Destination",
		hi: "गंतव्य",
		detect: L("destination")
	},
	{
		key: "entryDate",
		usage: "extra",
		en: "Entry date",
		hi: "प्रवेश तिथि",
		input: "date",
		detect: L("(?:date of )?entry(?: date)?|arrival date")
	},
	{
		key: "exitDate",
		usage: "extra",
		en: "Exit date",
		hi: "प्रस्थान तिथि",
		input: "date",
		detect: L("(?:date of )?exit(?: date)?|departure date")
	},
	{
		key: "accommodation",
		usage: "extra",
		en: "Accommodation",
		hi: "आवास",
		detect: L("accommodation|address in destination")
	},
	{
		key: "sponsor",
		usage: "extra",
		en: "Costs paid by",
		hi: "खर्च कौन देगा",
		detect: L("sponsor|costs paid by")
	},
	{
		key: "signaturePlace",
		usage: "extra",
		en: "Place (signature)",
		hi: "स्थान (हस्ताक्षर)",
		detect: L("place|ort|lieu|lugar|स्थान|مكان|場所|地点")
	},
	{
		key: "signatureDate",
		usage: "extra",
		en: "Date (signature)",
		hi: "दिनांक (हस्ताक्षर)",
		input: "date",
		detect: L("date|datum|fecha|दिनांक|तारीख|تاريخ|日付|日期")
	},
	{
		key: "previousVisa",
		usage: "extra",
		en: "Previous visa",
		hi: "पिछला वीज़ा",
		detect: L("previous visa")
	},
	{
		key: "photo",
		usage: "unused",
		en: "Photo",
		hi: "फ़ोटो"
	},
	{
		key: "passportType",
		usage: "unused",
		en: "Passport type",
		hi: "पासपोर्ट प्रकार"
	},
	{
		key: "passportIssuedOn",
		usage: "unused",
		en: "Passport issued",
		hi: "पासपोर्ट जारी",
		input: "date"
	},
	{
		key: "passportExpires",
		usage: "unused",
		en: "Passport expires",
		hi: "पासपोर्ट समाप्ति",
		input: "date"
	},
	{
		key: "passportIssuedBy",
		usage: "unused",
		en: "Passport issuing country",
		hi: "जारीकर्ता देश"
	},
	{
		key: "passportIssuedCity",
		usage: "unused",
		en: "Passport issuing city",
		hi: "जारीकर्ता शहर"
	},
	{
		key: "passportEndorsement",
		usage: "unused",
		en: "Passport endorsement",
		hi: "पासपोर्ट अनुमोदन"
	},
	{
		key: "passportLost",
		usage: "unused",
		en: "Passport lost or stolen",
		hi: "पासपोर्ट खोया/चोरी"
	},
	{
		key: "oldPassport",
		usage: "unused",
		en: "Previous passport number",
		hi: "पुराना पासपोर्ट नंबर"
	}
];
function fieldsByUsage(usage) {
	return FORM_FIELDS.filter((f) => f.usage === usage);
}
/** Which registry fields does this form text ask for? (labels, with or without values) */
function detectFormFields(text) {
	const found = FORM_FIELDS.filter((f) => f.usage !== "unused" && f.detect?.test(text)).map((f) => f.key);
	return Array.from(new Set(found));
}
function uid() {
	return Math.random().toString(36).slice(2, 10);
}
/** Add or update custom rows by label (case-insensitive). Empty values are skipped, never invented. */
function mergeCustom(existing, incoming) {
	const out = existing.map((item) => ({ ...item }));
	for (const { label, value } of incoming) {
		const l = label.trim();
		const v = value.trim();
		if (!l || !v) continue;
		const hit = out.find((item) => item.label.trim().toLowerCase() === l.toLowerCase());
		if (hit) hit.value = v;
		else out.push({
			id: uid(),
			label: l,
			value: v
		});
	}
	return out;
}
/** Form labels asking which company/organisation the application is for. */
var TARGET_COMPANY = /^\s*(?:company(?: name)?|company applying (?:to|for)|name of (?:the )?(?:company|employer|organi[sz]ation)|organi[sz]ation(?: name)?|employer(?: name)?|applying to|entreprise|unternehmen|empresa|कंपनी(?: का नाम)?|応募先(?:企業)?|会社名|应聘公司|公司名称|اسم الشركة|الشركة المتقدم إليها)\s*(?:[:\-–]|_{3,}|$)/im;
var norm = (s) => s.trim().toLowerCase().replace(/\s+/g, " ");
/** Labels written on a form: "Label:" / "Label: ____" / "Label ......" lines. */
function formLabels(text) {
	const out = [];
	for (const raw of text.split(/\r?\n/)) {
		const m = /^\s*([\p{L}\p{M}][\p{L}\p{M}\p{N} '’/()&.,-]{1,60}?)\s*(?::|：|_{3,}|\.{3,})/u.exec(raw);
		if (!m) continue;
		const label = m[1].replace(/[\s.,-]+$/, "").trim();
		if (label.length >= 2 && !out.some((x) => norm(x) === norm(label))) out.push(label);
	}
	return out;
}
var filled = (personal, key) => {
	const v = personal[key];
	return typeof v === "string" ? v.trim() !== "" : Array.isArray(v) && v.length > 0;
};
/**
* Which fields does this form need that the profile cannot answer yet?
* Nothing is guessed: a field is "missing" only when the profile value is empty.
*/
function findMissing(text, personal, detected, targetCompany = "") {
	const keys = detected ?? FORM_FIELDS.filter((f) => f.usage !== "unused" && f.detect?.test(text)).map((f) => f.key);
	const fields = FORM_FIELDS.filter((f) => keys.includes(f.key) && f.usage !== "unused" && !filled(personal, f.key));
	const saved = new Map((personal.customDetails ?? []).map((c) => [norm(c.label), c.value.trim()]));
	const asksCompany = TARGET_COMPANY.test(text);
	return {
		fields,
		custom: formLabels(text).filter((label) => {
			if (TARGET_COMPANY.test(`${label}:`)) return false;
			if (FORM_FIELDS.some((f) => f.detect && f.detect.test(`${label}:`))) return false;
			return !saved.get(norm(label));
		}),
		targetCompany: asksCompany && !targetCompany.trim()
	};
}
var TARGET_STORAGE = "meridian.target.v1";
function emptyTarget() {
	return {
		on: false,
		company: ""
	};
}
function parseTarget(raw) {
	if (!raw || typeof raw !== "object") return emptyTarget();
	const r = raw;
	return {
		on: r.on === true,
		company: typeof r.company === "string" ? r.company.slice(0, 120) : ""
	};
}
/** The company to use, or "" when the toggle is off or empty. */
function activeCompany(target) {
	return target.on ? target.company.trim() : "";
}
/**
* Layer the target company on top of the base CV for preview/export. The base profile object
* is never mutated; with the toggle off any stale layer is stripped.
*/
function applyTarget(profile, target) {
	const company = activeCompany(target);
	const { preparedFor: _drop, ...base } = profile.personal;
	return {
		...profile,
		personal: company ? {
			...base,
			preparedFor: company
		} : base
	};
}
var STORAGE = "meridian.dossier.v1";
var SESSION = "meridian.session.v1";
function persist(profile, settings, verifiedEmail) {
	try {
		if (!readConsent()) return;
		localStorage.setItem(STORAGE, JSON.stringify({
			profile,
			settings
		}));
		if (verifiedEmail) sessionStorage.setItem(SESSION, verifiedEmail);
		else sessionStorage.removeItem(SESSION);
	} catch {}
}
function mergeProfile(raw) {
	const base = emptyProfile();
	if (!raw || typeof raw !== "object") return base;
	const data = raw;
	return {
		personal: {
			...emptyPersonal(),
			...data.personal ?? {},
			customDetails: Array.isArray(data.personal?.customDetails) ? data.personal.customDetails : []
		},
		experience: Array.isArray(data.experience) ? data.experience : [],
		education: Array.isArray(data.education) ? data.education : [],
		skills: Array.isArray(data.skills) ? data.skills.filter((item) => typeof item === "string") : [],
		languages: Array.isArray(data.languages) ? data.languages : [],
		certifications: Array.isArray(data.certifications) ? data.certifications : [],
		children: Array.isArray(data.children) ? data.children : [],
		travel: Array.isArray(data.travel) ? data.travel : []
	};
}
var useStudio = create((set, get) => {
	const write = (partial) => {
		const next = {
			...get(),
			...partial
		};
		persist(next.profile, next.settings, next.verifiedEmail);
		set(partial);
	};
	return {
		hydrated: false,
		verifiedEmail: null,
		profile: emptyProfile(),
		settings: defaultSettings(),
		undo: null,
		tab: "compose",
		target: emptyTarget(),
		setTarget: (patch) => {
			const target = {
				...get().target,
				...patch
			};
			try {
				if (readConsent()) localStorage.setItem(TARGET_STORAGE, JSON.stringify(target));
			} catch {}
			set({ target });
		},
		hydrate: () => {
			if (get().hydrated) return;
			try {
				const saved = localStorage.getItem(STORAGE);
				const parsed = saved ? JSON.parse(saved) : null;
				const email = sessionStorage.getItem(SESSION);
				set({
					hydrated: true,
					verifiedEmail: get().verifiedEmail || email,
					profile: mergeProfile(parsed?.profile),
					settings: {
						...defaultSettings(),
						...parsed?.settings ?? {}
					},
					target: parseTarget(JSON.parse(localStorage.getItem("meridian.target.v1") || "null"))
				});
			} catch {
				set({ hydrated: true });
			}
		},
		verify: (email) => {
			const profile = get().profile;
			const personal = profile.personal.email || !email.includes("@") ? profile.personal : {
				...profile.personal,
				email
			};
			write({
				hydrated: true,
				verifiedEmail: email,
				profile: {
					...profile,
					personal
				}
			});
		},
		signOut: () => {
			write({ verifiedEmail: null });
		},
		setTab: (tab) => set({ tab }),
		setSettings: (patch) => write({ settings: {
			...get().settings,
			...patch
		} }),
		patchPersonal: (patch) => write({ profile: {
			...get().profile,
			personal: {
				...get().profile.personal,
				...patch
			}
		} }),
		commitProfile: (profile, rememberUndo = true) => write({
			profile,
			undo: rememberUndo ? get().profile : get().undo
		}),
		undoProfile: () => {
			const previous = get().undo;
			if (!previous) return;
			write({
				profile: previous,
				undo: null
			});
		},
		addExperience: () => write({ profile: {
			...get().profile,
			experience: [...get().profile.experience, emptyExperience()]
		} }),
		updateExperience: (id, patch) => write({ profile: {
			...get().profile,
			experience: get().profile.experience.map((item) => item.id === id ? {
				...item,
				...patch
			} : item)
		} }),
		removeExperience: (id) => write({ profile: {
			...get().profile,
			experience: get().profile.experience.filter((item) => item.id !== id)
		} }),
		addEducation: () => write({ profile: {
			...get().profile,
			education: [...get().profile.education, emptyEducation()]
		} }),
		updateEducation: (id, patch) => write({ profile: {
			...get().profile,
			education: get().profile.education.map((item) => item.id === id ? {
				...item,
				...patch
			} : item)
		} }),
		removeEducation: (id) => write({ profile: {
			...get().profile,
			education: get().profile.education.filter((item) => item.id !== id)
		} }),
		addLanguage: () => write({ profile: {
			...get().profile,
			languages: [...get().profile.languages, {
				id: uid$1(),
				name: "",
				level: "B2"
			}]
		} }),
		updateLanguage: (id, patch) => write({ profile: {
			...get().profile,
			languages: get().profile.languages.map((item) => item.id === id ? {
				...item,
				...patch
			} : item)
		} }),
		removeLanguage: (id) => write({ profile: {
			...get().profile,
			languages: get().profile.languages.filter((item) => item.id !== id)
		} }),
		addCertification: () => write({ profile: {
			...get().profile,
			certifications: [...get().profile.certifications, {
				id: uid$1(),
				name: "",
				issuer: "",
				year: ""
			}]
		} }),
		updateCertification: (id, patch) => write({ profile: {
			...get().profile,
			certifications: get().profile.certifications.map((item) => item.id === id ? {
				...item,
				...patch
			} : item)
		} }),
		removeCertification: (id) => write({ profile: {
			...get().profile,
			certifications: get().profile.certifications.filter((item) => item.id !== id)
		} }),
		addSkill: (skill) => {
			const cleaned = skill.trim();
			if (!cleaned) return;
			if (get().profile.skills.some((item) => item.toLowerCase() === cleaned.toLowerCase())) return;
			write({ profile: {
				...get().profile,
				skills: [...get().profile.skills, cleaned]
			} });
		},
		removeSkill: (skill) => write({ profile: {
			...get().profile,
			skills: get().profile.skills.filter((item) => item !== skill)
		} }),
		addChild: () => write({ profile: {
			...get().profile,
			children: [...get().profile.children, emptyChild()]
		} }),
		updateChild: (id, patch) => write({ profile: {
			...get().profile,
			children: get().profile.children.map((item) => item.id === id ? {
				...item,
				...patch
			} : item)
		} }),
		removeChild: (id) => write({ profile: {
			...get().profile,
			children: get().profile.children.filter((item) => item.id !== id)
		} }),
		addTrip: () => write({ profile: {
			...get().profile,
			travel: [...get().profile.travel, emptyTrip()]
		} }),
		updateTrip: (id, patch) => write({ profile: {
			...get().profile,
			travel: get().profile.travel.map((item) => item.id === id ? {
				...item,
				...patch
			} : item)
		} }),
		removeTrip: (id) => write({ profile: {
			...get().profile,
			travel: get().profile.travel.filter((item) => item.id !== id)
		} }),
		addCustomDetail: (label = "", value = "") => {
			const id = uid$1();
			const personal = get().profile.personal;
			write({ profile: {
				...get().profile,
				personal: {
					...personal,
					customDetails: [...personal.customDetails, {
						id,
						label,
						value
					}]
				}
			} });
			return id;
		},
		updateCustomDetail: (id, patch) => {
			const personal = get().profile.personal;
			write({ profile: {
				...get().profile,
				personal: {
					...personal,
					customDetails: personal.customDetails.map((item) => item.id === id ? {
						...item,
						...patch
					} : item)
				}
			} });
		},
		removeCustomDetail: (id) => {
			const personal = get().profile.personal;
			write({ profile: {
				...get().profile,
				personal: {
					...personal,
					customDetails: personal.customDetails.filter((item) => item.id !== id)
				}
			} });
		},
		saveAnswers: (fields, custom) => {
			const personal = get().profile.personal;
			write({ profile: {
				...get().profile,
				personal: {
					...personal,
					...fields,
					customDetails: mergeCustom(personal.customDetails, custom)
				}
			} });
		},
		loadSample: () => write({
			profile: sampleProfile(),
			undo: get().profile
		}),
		clearDossier: () => {
			const email = get().profile.personal.email || get().verifiedEmail || "";
			write({
				profile: {
					...emptyProfile(),
					personal: {
						...emptyPersonal(),
						email
					}
				},
				undo: get().profile
			});
		}
	};
});
/** Base profile with the optional target-company layer applied (for preview and export). */
function layeredProfile() {
	const { profile, target } = useStudio.getState();
	return applyTarget(profile, target);
}
/**
* DPDP: drafts created via "Fill form for this client" hold a client's personal data in the
* owner's browser. We tag them with the client_id so they can be erased once the client's
* server record is gone (client withdrew, owner deleted it, or link revoked + purged).
* The owner's own (non-client) draft is kept in a backup key and restored on purge.
*/
var DOSSIER_KEY = "meridian.dossier.v1";
var BACKUP_KEY = "meridian.dossier.backup.v1";
var CLIENT_TAG_KEY = "meridian.dossier.client.v1";
function readClientTag(s) {
	try {
		const v = JSON.parse(s.getItem("meridian.dossier.client.v1") ?? "null");
		return v && typeof v.clientId === "string" ? v.clientId : null;
	} catch {
		return null;
	}
}
/** Call before loading a client's details into the working draft. */
function tagClientDraft(s, clientId) {
	const own = s.getItem(DOSSIER_KEY);
	if (own && !readClientTag(s) && !s.getItem("meridian.dossier.backup.v1")) s.setItem(BACKUP_KEY, own);
	s.setItem(CLIENT_TAG_KEY, JSON.stringify({
		clientId,
		at: Date.now()
	}));
}
/**
* Removes the local client draft if its client_id is not in `liveClientIds` (or equals `removedId`).
* Restores the owner's own backed-up draft if there is one. Returns true if something was purged.
*/
function purgeOrphanClientDrafts(s, liveClientIds, removedId) {
	const tagged = readClientTag(s);
	if (!tagged) return false;
	const live = liveClientIds ? new Set(liveClientIds) : null;
	if (!(tagged === removedId || live !== null && !live.has(tagged))) return false;
	const backup = s.getItem(BACKUP_KEY);
	if (backup) s.setItem(DOSSIER_KEY, backup);
	else s.removeItem(DOSSIER_KEY);
	s.removeItem(BACKUP_KEY);
	s.removeItem(CLIENT_TAG_KEY);
	return true;
}
/** All dashboard copy in one place so it can be translated later. */
var DASH_TEXT = {
	title: "Your dashboard",
	subtitle: "Everything you have created with FormZalo, saved in this browser.",
	guestBadge: "Guest session · saved in this browser",
	cvsMade: "CVs made",
	cvsInProgress: "CVs in progress",
	balance: "Remaining balance",
	balanceCv: "CV downloads",
	balanceFill: "Form fills",
	formFillsUsed: "Form fills used",
	companiesApplied: "Companies applied",
	planTitle: "Your plan",
	noPlan: "No active plan",
	noPlanHint: "Pick a plan to download clean CVs and auto-fill forms.",
	viewPlans: "View plans",
	validUntil: "Valid until",
	noExpiry: "No expiry date",
	test: "TEST",
	companyLimit: "Company limit",
	quickActions: "Quick actions",
	buildCv: "Build new CV",
	fillForm: "Fill a form",
	recentCvs: "Recent CVs",
	draft: "Draft · in progress",
	exported: "Downloaded",
	untitled: "Untitled CV",
	exportedCv: "Downloaded CV",
	noCvs: "No CVs yet. Start building your first CV — it only takes a few minutes.",
	companiesTitle: "Companies applied",
	noCompanies: "No applications yet. Use “Fill a form” to apply to a company.",
	clientsTitle: "Clients",
	clientsHint: "Share this link with a client. They fill their details once; you can then fill any form for them.",
	businessName: "Your business name (shown to clients)",
	createLink: "Create share link",
	copy: "Copy link",
	copied: "Copied!",
	whatsapp: "Share on WhatsApp",
	noClients: "No client details yet. Share the link above.",
	submitted: "Submitted",
	fillForClient: "Fill form for this client",
	refresh: "Refresh",
	shareMsg: "Please fill your details here so we can fill your form:",
	privacyTitle: "Privacy & data",
	privacyHint: "Your CVs, drafts and plan key are stored only in this browser. You can withdraw consent and delete them at any time.",
	consentGiven: "Consent given",
	deleteClient: "Delete client data",
	confirmDeleteClient: "Permanently delete this client's details from FormZalo?",
	revokeLink: "Revoke share link",
	confirmRevoke: "Revoke the share link? Clients will no longer be able to open it. You can create a new link later.",
	revoked: "Link revoked.",
	retention: "Client details are auto-deleted after {days} days, or earlier on request.",
	complaintsTitle: "Problem reports",
	complaintsHint: "New problem reports from users appear here.",
	complaintsResolve: "Mark as resolved",
	complaintsResolved: "Resolved",
	complaintsNew: "New"
};
/** Opens the download paywall (where plans live). Plans are never shown elsewhere. */
function openPlans() {
	if (window.location.pathname.startsWith("/dashboard")) {
		window.location.href = "/#plans";
		return;
	}
	window.dispatchEvent(new Event("meridian-open-plans"));
}
function StatCard({ icon, label, value, testId, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-2 rounded-xl border border-line bg-paper p-4 shadow-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid size-8 place-items-center rounded-lg bg-forest/10 text-forest",
					"aria-hidden": true,
					children: icon
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium",
					children: label
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-serif text-3xl leading-none",
				"data-testid": testId,
				children: value
			}),
			children
		]
	});
}
function Bar({ left, max, label }) {
	const pct = max > 0 ? Math.max(0, Math.min(100, left / max * 100)) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between text-[11px] text-muted",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
			left,
			"/",
			max
		] })]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-1 h-1.5 overflow-hidden rounded-full bg-line",
		role: "progressbar",
		"aria-label": label,
		"aria-valuemin": 0,
		"aria-valuemax": max,
		"aria-valuenow": left,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full rounded-full bg-forest",
			style: { width: `${pct}%` }
		})
	})] });
}
function Panel({ title, children, testId }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-line bg-paper p-4 shadow-sm",
		"data-testid": testId,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "kicker text-muted",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3",
			children
		})]
	});
}
/** Guest dashboard — local storage only, no account needed. */
function Dashboard() {
	const T = trObj(DASH_TEXT, { days: 180 });
	const profile = useStudio((s) => s.profile);
	const settings = useStudio((s) => s.settings);
	const [guest, setGuest] = (0, import_react.useState)(null);
	const [credits, setCredits] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const load = () => {
			const g = readGuest();
			setGuest(g);
			if (g.planEntitlementId) fetchCredits(g.planEntitlementId).then(setCredits, () => setCredits(null));
			else setCredits(null);
		};
		load();
		window.addEventListener("meridian-guest", load);
		return () => window.removeEventListener("meridian-guest", load);
	}, []);
	if (!guest) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl border border-line bg-sheet p-4 sm:p-6",
		"aria-labelledby": "dash-title",
		"data-testid": "dashboard-loading",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			id: "dash-title",
			className: "font-serif text-2xl text-forest",
			children: tr("Your dashboard")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted",
			children: tr("Loading your dashboard…")
		})]
	});
	const hasContent = JSON.stringify(profile) !== JSON.stringify(emptyProfile());
	const currentFp = fingerprint(profile, settings);
	const currentExported = guest.exported.includes(currentFp);
	const inProgress = hasContent && !currentExported ? 1 : 0;
	const cvLeft = credits?.cvGenerationsLeft ?? 0;
	const fillLeft = credits?.formFillsLeft ?? 0;
	const balance = cvLeft + fillLeft;
	const companies = guest.companies;
	const companiesCount = credits ? credits.companiesUsed : companies.length;
	const draftName = [profile.personal.givenName, profile.personal.familyName].filter(Boolean).join(" ") || T.untitled;
	const templateLabel = TEMPLATES.find((t) => t.id === settings.template)?.label ?? "";
	const pastExports = guest.exported.filter((fp) => !(hasContent && fp === currentFp));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl border border-line bg-sheet p-4 sm:p-6",
		"aria-labelledby": "dash-title",
		"data-testid": "dashboard",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 sm:flex-row sm:items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "dash-title",
						className: "font-serif text-2xl text-forest",
						children: T.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: T.subtitle
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "self-start rounded-full bg-paper px-3 py-1 text-xs text-muted",
					children: T.guestBadge
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "/",
					className: "flex h-12 items-center justify-center gap-2 rounded-full bg-forest px-4 text-sm font-medium text-sheet",
					"data-testid": "dash-build-cv",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePlus2, {
							className: "size-4",
							"aria-hidden": true
						}),
						" ",
						T.buildCv
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "/#document-file",
					className: "flex h-12 items-center justify-center gap-2 rounded-full border border-forest px-4 text-sm font-medium text-forest",
					"data-testid": "dash-fill-form",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
							className: "size-4",
							"aria-hidden": true
						}),
						" ",
						T.fillForm
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }),
						label: T.cvsMade,
						value: guest.exported.length,
						testId: "dash-completed"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "size-4" }),
						label: T.cvsInProgress,
						value: inProgress,
						testId: "dash-drafts"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "col-span-2 lg:col-span-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StatCard, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "size-4" }),
							label: T.balance,
							value: balance,
							testId: "dash-balance",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "sr-only",
									"data-testid": "dash-cv-credits",
									children: cvLeft
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "sr-only",
									"data-testid": "dash-fill-credits",
									children: fillLeft
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									label: T.balanceCv,
									left: cvLeft,
									max: credits?.cvGenerationsMax ?? 0
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									label: T.balanceFill,
									left: fillLeft,
									max: credits?.formFillsMax ?? 0
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "size-4" }),
						label: T.formFillsUsed,
						value: guest.formFillsUsed,
						testId: "dash-fills-used"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "size-4" }),
						label: T.companiesApplied,
						value: companiesCount,
						testId: "dash-companies"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "col-span-2 lg:col-span-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
							title: T.planTitle,
							testId: "dash-plan",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-8 shrink-0 place-items-center rounded-lg bg-forest/10 text-forest",
									"aria-hidden": true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "size-4" })
								}), credits ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-medium",
											"data-testid": "dash-plan-name",
											children: [credits.planName, credits.test && !credits.planName.includes(`(${T.test})`) ? ` (${T.test})` : ""]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted",
											children: credits.expiresAt ? `${T.validUntil} ${new Date(credits.expiresAt).toLocaleDateString(uiLocale())}` : T.noExpiry
										}),
										credits.companyLimit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted",
											children: [
												T.companyLimit,
												": ",
												credits.companiesUsed,
												"/",
												credits.companyLimit
											]
										}) : null,
										balance === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "mt-2 font-medium text-forest underline",
											onClick: openPlans,
											children: T.viewPlans
										}) : null
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium",
											"data-testid": "dash-plan-name",
											children: T.noPlan
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted",
											children: T.noPlanHint
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "mt-2 font-medium text-forest underline",
											onClick: openPlans,
											"data-testid": "dash-view-plans",
											children: T.viewPlans
										})
									]
								})]
							})
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrivacyCard, {}),
			credits?.clients && guest.planEntitlementId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientsCard, {
				entitlementId: guest.planEntitlementId,
				guestId: guest.guestId
			}) : null,
			credits?.clients && guest.planEntitlementId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComplaintsCard, { entitlementId: guest.planEntitlementId }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: T.recentCvs,
					testId: "dash-recent",
					children: hasContent || pastExports.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "divide-y divide-line text-sm",
						children: [hasContent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3 py-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
									className: "size-4 shrink-0 text-forest",
									"aria-hidden": true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate font-medium",
										children: draftName
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-xs text-muted",
										children: [profile.personal.headline, templateLabel].filter(Boolean).join(" · ")
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "shrink-0 rounded-full bg-sheet px-2 py-0.5 text-[11px] text-muted",
									children: currentExported ? T.exported : T.draft
								})
							]
						}) : null, pastExports.slice(-5).reverse().map((fp) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3 py-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
									className: "size-4 shrink-0 text-forest",
									"aria-hidden": true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex-1 truncate",
									children: [
										T.exportedCv,
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs text-muted",
											children: ["#", fp.slice(0, 6)]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "shrink-0 rounded-full bg-sheet px-2 py-0.5 text-[11px] text-muted",
									children: T.exported
								})
							]
						}, fp))]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: T.noCvs
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: T.companiesTitle,
					testId: "dash-companies-list",
					children: companies.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-wrap gap-2",
						children: companies.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-1 rounded-full border border-line bg-sheet px-3 py-1 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, {
									className: "size-3 text-forest",
									"aria-hidden": true
								}),
								" ",
								c
							]
						}, c))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: T.noCompanies
					})
				})]
			})
		]
	});
}
function PrivacyCard() {
	const T = trObj(DASH_TEXT, { days: 180 });
	const [at, setAt] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => setAt(readConsent()?.at ?? null), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			title: T.privacyTitle,
			testId: "dash-privacy",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: T.privacyHint
				}),
				at ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-xs text-muted",
					"data-testid": "consent-at",
					children: [
						T.consentGiven,
						": ",
						new Date(at).toLocaleString(uiLocale())
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithdrawButton, {
							className: "h-11 rounded-full border-2 border-red-700 px-4 text-sm font-medium text-red-700",
							label: tr("Withdraw consent & delete my data")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/privacy",
							className: "text-sm text-forest underline",
							children: tr("Privacy notice")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `mailto:${SUPPORT_EMAIL}`,
							className: "text-sm text-forest underline",
							children: SUPPORT_EMAIL
						})
					]
				})
			]
		})
	});
}
/** Commercial plan only: share an intake link and fill forms with a client's saved details. */
function ClientsCard({ entitlementId, guestId }) {
	const T = trObj(DASH_TEXT, { days: 180 });
	const commitProfile = useStudio((s) => s.commitProfile);
	const [biz, setBiz] = (0, import_react.useState)("");
	const [url, setUrl] = (0, import_react.useState)("");
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [clients, setClients] = (0, import_react.useState)([]);
	const [err, setErr] = (0, import_react.useState)("");
	const purge = (live, removedId) => {
		try {
			if (purgeOrphanClientDrafts(localStorage, live, removedId)) {
				useStudio.setState({ hydrated: false });
				useStudio.getState().hydrate();
			}
		} catch {}
	};
	const refresh = () => listClients(entitlementId).then((r) => {
		setClients(r.clients);
		purge(r.clients.map((c) => c.clientId));
	}, (e) => setErr(e.message));
	(0, import_react.useEffect)(() => {
		refresh();
	}, [entitlementId]);
	async function makeLink() {
		setErr("");
		try {
			const r = await createClientLink(entitlementId, guestId, biz);
			setBiz(r.businessName);
			setUrl(`${window.location.origin}${r.path}`);
		} catch (e) {
			setErr(e.message);
		}
	}
	async function copy() {
		try {
			await navigator.clipboard.writeText(url);
		} catch {}
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	}
	async function remove(c) {
		if (!window.confirm(`${T.confirmDeleteClient}\n\n${c.name}`)) return;
		setErr("");
		try {
			await deleteClient(entitlementId, c.clientId);
			purge(null, c.clientId);
			await refresh();
		} catch (e) {
			setErr(e.message);
		}
	}
	async function revoke() {
		if (!window.confirm(T.confirmRevoke)) return;
		setErr("");
		try {
			await revokeClientLinks(entitlementId);
			setUrl("");
			setErr(T.revoked);
			await refresh();
		} catch (e) {
			setErr(e.message);
		}
	}
	async function fillFor(c) {
		setErr("");
		try {
			const full = await getClient(entitlementId, c.clientId);
			const base = emptyProfile();
			try {
				tagClientDraft(localStorage, c.clientId);
			} catch {}
			commitProfile({
				...base,
				...full.profile,
				personal: {
					...base.personal,
					...full.profile.personal
				}
			});
			window.location.href = "/#document-file";
		} catch (e) {
			setErr(e.message);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			title: T.clientsTitle,
			testId: "dash-clients",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: T.clientsHint
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-col gap-2 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "h-11 flex-1 rounded-lg border border-line bg-paper px-3 text-sm",
						placeholder: T.businessName,
						"aria-label": T.businessName,
						value: biz,
						onChange: (e) => setBiz(e.target.value),
						"data-testid": "clients-biz"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "flex h-11 items-center justify-center gap-2 rounded-full bg-forest px-4 text-sm font-medium text-sheet",
						onClick: () => void makeLink(),
						"data-testid": "clients-create-link",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
								className: "size-4",
								"aria-hidden": true
							}),
							" ",
							T.createLink
						]
					})]
				}),
				url ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 rounded-lg border border-line bg-sheet p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "break-all font-mono text-xs",
						"data-testid": "clients-link",
						children: url
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex h-10 items-center gap-1 rounded-full border border-forest px-3 text-sm text-forest",
							onClick: () => void copy(),
							"data-testid": "clients-copy",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
									className: "size-4",
									"aria-hidden": true
								}),
								" ",
								copied ? T.copied : T.copy
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							className: "flex h-10 items-center gap-1 rounded-full border border-forest px-3 text-sm text-forest",
							href: `https://wa.me/?text=${encodeURIComponent(`${T.shareMsg} ${url}`)}`,
							target: "_blank",
							rel: "noreferrer",
							"data-testid": "clients-whatsapp",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, {
									className: "size-4",
									"aria-hidden": true
								}),
								" ",
								T.whatsapp
							]
						})]
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-wrap items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-10 text-sm text-red-700 underline",
						onClick: () => void revoke(),
						"data-testid": "clients-revoke",
						children: T.revokeLink
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted",
						children: T.retention
					})]
				}),
				err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-red-700",
					role: "alert",
					children: err
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-medium",
						children: [
							T.clientsTitle,
							" (",
							clients.length,
							")"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-10 text-sm text-forest underline",
						onClick: () => void refresh(),
						"data-testid": "clients-refresh",
						children: T.refresh
					})]
				}),
				clients.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 divide-y divide-line text-sm",
					"data-testid": "clients-list",
					children: clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-col gap-2 py-2 sm:flex-row sm:items-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: c.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted",
									children: [
										T.submitted,
										" ",
										new Date(c.submittedAt).toLocaleString(uiLocale())
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "h-10 rounded-full bg-forest px-4 text-sm font-medium text-sheet",
								onClick: () => void fillFor(c),
								"data-testid": "clients-fill",
								children: T.fillForClient
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "h-10 rounded-full border border-red-700 px-4 text-sm font-medium text-red-700",
								onClick: () => void remove(c),
								"data-testid": "clients-delete",
								children: T.deleteClient
							})
						]
					}, c.clientId))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: T.noClients
				})
			]
		})
	});
}
/** Commercial plan only: read and resolve user problem reports. */
function ComplaintsCard({ entitlementId }) {
	const T = trObj(DASH_TEXT, { days: 180 });
	const [items, setItems] = (0, import_react.useState)([]);
	const [err, setErr] = (0, import_react.useState)("");
	const refresh = () => listComplaints(entitlementId).then((r) => setItems(r.complaints), (e) => setErr(e.message));
	(0, import_react.useEffect)(() => {
		refresh();
	}, [entitlementId]);
	async function resolve(id) {
		setErr("");
		try {
			await resolveComplaint(entitlementId, id);
			await refresh();
		} catch (e) {
			setErr(e.message);
		}
	}
	const typeLabel = (t) => t === "payment" ? tr("Payment problem") : t === "not-working" ? tr("Something is not working") : tr("Other");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			title: T.complaintsTitle,
			testId: "dash-complaints",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: T.complaintsHint
				}),
				err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-red-700",
					role: "alert",
					children: err
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-medium",
						children: [
							T.complaintsTitle,
							" (",
							items.filter((c) => c.status === "new").length,
							" ",
							T.complaintsNew,
							")"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-10 text-sm text-forest underline",
						onClick: () => void refresh(),
						"data-testid": "complaints-refresh",
						children: T.refresh
					})]
				}),
				items.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 divide-y divide-line text-sm",
					"data-testid": "complaints-list",
					children: items.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: typeLabel(c.type)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "shrink-0 rounded-full bg-sheet px-2 py-0.5 text-[11px] text-muted",
										children: c.status === "resolved" ? T.complaintsResolved : T.complaintsNew
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted",
										children: new Date(c.submittedAt).toLocaleString(uiLocale())
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1",
								children: [
									c.name,
									" · ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										className: "text-forest underline",
										href: `mailto:${c.email}`,
										children: c.email
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-muted",
								children: c.message
							}),
							c.status === "new" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "mt-2 h-10 rounded-full border border-forest px-4 text-sm text-forest",
								onClick: () => void resolve(c.complaintId),
								"data-testid": "complaints-resolve",
								children: T.complaintsResolve
							}) : null
						]
					}, c.complaintId))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: T.complaintsHint
				})
			]
		})
	});
}
//#endregion
export { writeLocal as S, readLocal as _, activeCompany as a, verifyPayment as b, detectFormFields as c, fieldsByUsage as d, findMissing as f, readGuest as g, openRazorpay as h, TARGET_COMPANY as i, downloadClean as l, newIdempotencyKey as m, Dashboard as n, cancelOrder as o, layeredProfile as p, FORM_FIELDS as r, createOrder as s, ApiError as t, fetchStatus as u, simulatePayment as v, writeGuest as x, useStudio as y };
