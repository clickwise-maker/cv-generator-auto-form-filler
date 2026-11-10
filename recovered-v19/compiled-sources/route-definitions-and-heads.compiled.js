var Route$32 = createRootRoute({
	head: ({ matches }) => {
		const leaf = matches[matches.length - 1];
		const lang = langFromSearch(leaf?.search);
		const path = (leaf?.pathname || "/").replace(/(.)\/+$/, "$1");
		const seo = LOCALE_SEO[lang];
		const url = localeUrl(path, lang);
		const skipLinks = LANDING_RE.test(path) || path === "/cv-maker" || NO_SEO_LINKS(path);
		return {
			meta: [
				{ charSet: "utf-8" },
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1"
				},
				{ title: seo.title },
				{
					name: "description",
					content: seo.description
				},
				{
					property: "og:title",
					content: seo.title
				},
				{
					property: "og:description",
					content: seo.description
				},
				{
					property: "og:type",
					content: "website"
				},
				{
					property: "og:site_name",
					content: "FormZalo"
				},
				{
					property: "og:image",
					content: `${SITE}/og.jpg`
				},
				{
					property: "og:url",
					content: url
				},
				{
					property: "og:locale",
					content: seo.ogLocale
				},
				{
					name: "twitter:card",
					content: "summary_large_image"
				},
				{
					name: "twitter:title",
					content: seo.title
				},
				{
					name: "twitter:description",
					content: seo.description
				},
				{
					name: "twitter:image",
					content: `${SITE}/og.jpg`
				},
				{
					name: "theme-color",
					content: "#1b4d3e"
				},
				...[]
			],
			scripts: [
				{
					type: "application/ld+json",
					children: JSON.stringify(webAppLd(seo.description, url, seo.hreflang))
				},
				{
					type: "application/ld+json",
					children: JSON.stringify(ORG_LD)
				},
				...[],
				...ADS.enabled ? [{
					src: adsenseScriptSrc(),
					async: true,
					crossOrigin: "anonymous"
				}] : []
			],
			links: [
				...skipLinks ? [] : [{
					rel: "canonical",
					href: url
				}, ...hreflangLinks(path)],
				{
					rel: "icon",
					type: "image/svg+xml",
					href: "/favicon.svg"
				},
				{
					rel: "stylesheet",
					href: styles_default
				},
				{
					rel: "manifest",
					href: "/__grok/manifest.webmanifest"
				},
				{
					rel: "apple-touch-icon",
					href: "/__grok/icon-180.png"
				},
				{
					rel: "preconnect",
					href: "https://fonts.googleapis.com"
				},
				{
					rel: "preconnect",
					href: "https://fonts.gstatic.com",
					crossOrigin: "anonymous"
				},
				{
					rel: "stylesheet",
					href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,560;9..144,650&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Outfit:wght@400;500;600;700&display=swap"
				}
			]
		};
	},
	component: Root
});
var $$splitComponentImporter$27 = () => import("./routes-JQbTm7aX.mjs");
var Route$31 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$27, "component") });
var c$3 = {
	slug: "about",
	title: "About & Contact",
	hi_title: "हमारे बारे में और संपर्क",
	desc: "About FormZalo and how to contact support, in English and Hindi.",
	lead: "Who we are and how to reach us.",
	en: [
		["What FormZalo is", ["FormZalo is an online CV (resume) builder with an Auto Form Filler for job applications.", "You can create a CV with plain or designed templates, download it as PDF or DOCX, and use your CV to fill job application forms."]],
		["How it works", [
			"Free: create, edit, save and choose templates, with no login. Download a watermarked copy free.",
			"Paid: clean (no watermark) downloads and form fills with single-use credits or a yearly plan.",
			"Your CV is saved in your own browser."
		]],
		["Status", ["FormZalo is currently in trial mode. No real payments are taken yet."]],
		["Contact", [
			"mail",
			"report",
			"Support is by email only. We review requests within 2 working days."
		]]
	],
	hi: [
		["FormZalo क्या है", ["FormZalo एक ऑनलाइन CV (रिज़्यूमे) बिल्डर है, जिसमें नौकरी के आवेदनों के लिए ऑटो फ़ॉर्म फ़िलर है।", "आप सादे या डिज़ाइन वाले टेम्पलेट से CV बना सकते हैं, PDF या DOCX में डाउनलोड कर सकते हैं, और अपने CV से नौकरी के फ़ॉर्म भर सकते हैं।"]],
		["कैसे काम करता है", [
			"मुफ़्त: CV बनाएँ, एडिट करें, सेव करें और टेम्पलेट चुनें, बिना लॉगिन। वॉटरमार्क वाली कॉपी मुफ़्त डाउनलोड करें।",
			"पेड: क्लीन (बिना वॉटरमार्क) डाउनलोड और फ़ॉर्म फ़िल, सिंगल-यूज़ क्रेडिट या सालाना प्लान से।",
			"आपका CV आपके अपने ब्राउज़र में सेव होता है।"
		]],
		["स्थिति", ["FormZalo अभी ट्रायल मोड में है। अभी कोई असली भुगतान नहीं लिया जा रहा है।"]],
		["संपर्क", [
			"mail",
			"report",
			"सहायता सिर्फ़ ईमेल से। हम 2 कार्य-दिवसों में अनुरोध देखते हैं।"
		]]
	],
	faqld: null
};
var EMAIL = "team@formzalo.com";
function infoHead(c) {
	const url = `https://formzalo.com/${c.slug}`;
	return {
		meta: [
			{ title: `${c.title} — FormZalo` },
			{
				name: "description",
				content: c.desc
			},
			{
				property: "og:title",
				content: `FormZalo — ${c.title}`
			},
			{
				property: "og:description",
				content: c.desc
			},
			{
				property: "og:url",
				content: url
			}
		],
		links: [{
			rel: "stylesheet",
			href: "https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600&display=swap"
		}],
		scripts: c.faqld ? [{
			type: "application/ld+json",
			children: JSON.stringify(c.faqld)
		}] : []
	};
}
function Items({ items, plain }) {
	const mail = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mt-2 text-sm leading-relaxed",
		children: [
			tr("Email"),
			":",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				className: "underline",
				href: `mailto:${EMAIL}`,
				children: EMAIL
			})
		]
	});
	const rest = items.filter((i) => i !== "mail" && i !== "report");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		items.includes("mail") && mail,
		items.includes("report") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm leading-relaxed",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/report",
				className: "underline",
				children: tr("Report a problem")
			})
		}),
		plain || rest.length === 1 ? rest.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm leading-relaxed",
			children: tr(i)
		}, i)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-2 list-disc space-y-1 ps-5 text-sm leading-relaxed",
			children: rest.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: tr(i) }, i))
		})
	] });
}
function InfoPage({ c }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, { current: "about" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "min-h-screen bg-paper px-4 py-10 text-ink",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "text-xs uppercase tracking-[0.3em] text-ink/60 hover:text-ink",
						children: tr("FormZalo")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 font-serif text-4xl",
						children: tr(c.title)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-ink/70",
						children: tr(c.lead)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "mt-8 rounded-lg border border-line bg-sheet p-6",
						children: c.en.map(([t, items]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 first:mt-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold",
								children: tr(t)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Items, {
								items,
								plain: !!c.faq
							})]
						}, t))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-8 text-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "underline",
							children: tr("← Back to FormZalo")
						})
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
	] });
}
var $$splitComponentImporter$26 = () => import("./about-DpeaqgxL.mjs");
var Route$30 = createFileRoute("/about")({
	head: () => infoHead(c$3),
	component: lazyRouteComponent($$splitComponentImporter$26, "component")
});
var $$splitComponentImporter$25 = () => import("./contact-GdUL6iww.mjs");
var Route$29 = createFileRoute("/contact")({
	head: () => ({
		meta: [
			{ title: "Contact — FormZalo" },
			{
				name: "description",
				content: "Contact FormZalo support by email. Requests are reviewed within 2 working days."
			},
			{
				property: "og:title",
				content: "Contact — FormZalo"
			},
			{
				property: "og:description",
				content: "Contact FormZalo support by email."
			},
			{
				property: "og:url",
				content: "https://formzalo.com/contact"
			}
		],
		links: []
	}),
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
var p$11 = SEO_PAGES.find((x) => x.code === "");
var $$splitComponentImporter$24 = () => import("./cv-maker-8A5v3H20.mjs");
var Route$28 = createFileRoute("/cv-maker")({
	head: () => seoPageHead(p$11),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./dashboard-C0eTT5db.mjs");
var Route$27 = createFileRoute("/dashboard")({
	head: () => ({ meta: [{ title: "Dashboard · FormZalo" }] }),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var c$2 = {
	slug: "faq",
	title: "FAQ",
	hi_title: "अक्सर पूछे जाने वाले सवाल",
	desc: "FormZalo frequently asked questions in English and Hindi: pricing, login, downloads, storage, refunds.",
	lead: "Short answers to common questions.",
	en: [
		["Is FormZalo free?", ["Yes. Creating, editing, saving and choosing templates are free, and you can download a watermarked PDF/DOCX for free. A clean download or a form fill costs ₹20 / $1 each, or you can use a yearly plan (see Services & Plans)."]],
		["Do I need to sign up?", ["No login is needed — you can use FormZalo as a guest."]],
		["Where is my CV saved?", ["In your browser's local storage on your own device. Clearing browser data or switching device can remove it, so download a copy."]],
		["Which formats can I download?", ["PDF and DOCX (Word)."]],
		["What does the free download include?", ["The full CV with a watermark, so you can see exactly what you get before paying."]],
		["What is the Auto Form Filler?", ["It fills job application forms from your CV. A form-fill credit is used only when the fill succeeds, and is refunded if it fails. Always check the form before submitting."]],
		["Is there a monthly plan?", ["No. There are single-use payments and yearly plans only."]],
		["Are payments live?", ["Not yet. FormZalo is in trial mode and no real payments are taken."]],
		["How do refunds work?", ["See the Refund Policy. In short: ₹20 single use is refunded if the download fails because of our technical error; yearly plans are refundable within 7 days if unused."]],
		["How do I contact you?", ["mail"]]
	],
	hi: [
		["क्या FormZalo मुफ़्त है?", ["हाँ। CV बनाना, एडिट करना, सेव करना और टेम्पलेट चुनना मुफ़्त है, और वॉटरमार्क वाला PDF/DOCX मुफ़्त डाउनलोड कर सकते हैं। क्लीन डाउनलोड या एक फ़ॉर्म फ़िल ₹20 / $1 का है, या आप सालाना प्लान ले सकते हैं (Services & Plans देखें)।"]],
		["क्या साइन-अप ज़रूरी है?", ["कोई लॉगिन ज़रूरी नहीं — आप गेस्ट के रूप में इस्तेमाल कर सकते हैं।"]],
		["मेरा CV कहाँ सेव होता है?", ["आपके अपने डिवाइस पर ब्राउज़र के local storage में। ब्राउज़र डेटा साफ़ करने या डिवाइस बदलने पर यह हट सकता है, इसलिए कॉपी डाउनलोड कर लें।"]],
		["किन फ़ॉर्मेट में डाउनलोड कर सकते हैं?", ["PDF और DOCX (Word)।"]],
		["मुफ़्त डाउनलोड में क्या मिलता है?", ["वॉटरमार्क के साथ पूरा CV, ताकि भुगतान से पहले आप देख सकें कि क्या मिलेगा।"]],
		["ऑटो फ़ॉर्म फ़िलर क्या है?", ["यह आपके CV से नौकरी के आवेदन फ़ॉर्म भरता है। क्रेडिट सिर्फ़ सफल फ़िल पर लगता है और असफल होने पर वापस होता है। भेजने से पहले फ़ॉर्म ज़रूर जाँचें।"]],
		["क्या कोई मासिक प्लान है?", ["नहीं। सिर्फ़ सिंगल-यूज़ भुगतान और सालाना प्लान हैं।"]],
		["क्या भुगतान चालू है?", ["अभी नहीं। FormZalo ट्रायल मोड में है और कोई असली भुगतान नहीं लिया जा रहा है।"]],
		["रिफंड कैसे मिलता है?", ["रिफंड नीति देखें। संक्षेप में: हमारी तकनीकी गड़बड़ी से डाउनलोड न होने पर ₹20 वापस; सालाना प्लान 7 दिनों में, अगर इस्तेमाल नहीं हुआ, तो रिफंड।"]],
		["आपसे संपर्क कैसे करें?", ["mail"]]
	],
	faq: true,
	faqld: {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": [
			{
				"@type": "Question",
				"name": "Is FormZalo free?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "Yes. Creating, editing, saving and choosing templates are free, and you can download a watermarked PDF/DOCX for free. A clean download or a form fill costs ₹20 / $1 each, or you can use a yearly plan (see Services & Plans)."
				}
			},
			{
				"@type": "Question",
				"name": "Do I need to sign up?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "No login is needed — you can use FormZalo as a guest."
				}
			},
			{
				"@type": "Question",
				"name": "Where is my CV saved?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "In your browser's local storage on your own device. Clearing browser data or switching device can remove it, so download a copy."
				}
			},
			{
				"@type": "Question",
				"name": "Which formats can I download?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "PDF and DOCX (Word)."
				}
			},
			{
				"@type": "Question",
				"name": "What does the free download include?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "The full CV with a watermark, so you can see exactly what you get before paying."
				}
			},
			{
				"@type": "Question",
				"name": "What is the Auto Form Filler?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "It fills job application forms from your CV. A form-fill credit is used only when the fill succeeds, and is refunded if it fails. Always check the form before submitting."
				}
			},
			{
				"@type": "Question",
				"name": "Is there a monthly plan?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "No. There are single-use payments and yearly plans only."
				}
			},
			{
				"@type": "Question",
				"name": "Are payments live?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "Not yet. FormZalo is in trial mode and no real payments are taken."
				}
			},
			{
				"@type": "Question",
				"name": "How do refunds work?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "See the Refund Policy. In short: ₹20 single use is refunded if the download fails because of our technical error; yearly plans are refundable within 7 days if unused."
				}
			},
			{
				"@type": "Question",
				"name": "How do I contact you?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "team@formzalo.com"
				}
			}
		]
	}
};
var $$splitComponentImporter$22 = () => import("./faq-DU-GwVRP.mjs");
var Route$26 = createFileRoute("/faq")({
	head: () => infoHead(c$2),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./next-steps-BWyHfLAS.mjs");
var Route$25 = createFileRoute("/next-steps")({
	head: () => ({
		...contentHead("After you download your CV", "What to check before you send your CV, and guides for the next steps.", "/next-steps"),
		meta: [{ title: "After you download your CV — FormZalo" }, {
			name: "robots",
			content: "noindex"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./privacy-eIyV-KyG.mjs");
var Route$24 = createFileRoute("/privacy")({
	head: () => ({ meta: [
		{ title: "Privacy notice (DPDP) · FormZalo" },
		{
			name: "description",
			content: "FormZalo privacy notice in English and Hindi: data collected, purpose, storage, retention, your rights, grievance contact."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var c$1 = {
	slug: "privacy-policy",
	title: "Privacy Policy",
	hi_title: "गोपनीयता नीति",
	desc: "FormZalo privacy policy in English and Hindi: what we store, where, and why.",
	lead: "Last updated: 24 October 2026.",
	en: [
		["1. Summary", ["We collect as little as possible and we do not sell your data. Ads are currently switched off; if we turn them on, they appear only on content pages such as guides, never in the editor or form filler.", "No account is needed. There is no login on this site — you can use it as a guest."]],
		["2. Your CV data", [
			"The CV you type (name, contact details, experience, education, skills) is saved in your browser's local storage on your own device. It is not uploaded to us while you edit.",
			"Clearing your browser data, or using a different browser or device, removes or hides that saved CV. Please keep your own copy (download it).",
			"When you request a clean (paid) download or start a purchase, your CV content is sent to our server only to create the file and check the order. We keep order records (order ID, plan, amount, status, payment reference and a fingerprint/hash of the CV) — not the CV text itself."
		]],
		["3. Auto Form Filler", ["When you use a form-fill credit, the company name and the result (success or failure) are recorded so that credits are counted correctly and refunded if a fill fails."]],
		["4. Payments", ["CV Studio is currently in trial mode and no real payments are taken yet.", "When payments are switched on, they are processed by a payment provider (Razorpay). We never see or store your card or UPI details."]],
		["5. Other services we use", ["Our hosting provider (Render) receives normal technical request data such as IP address and browser type.", "Fonts are loaded from Google Fonts, so Google receives a normal request from your browser."]],
		["6. Cookies and local storage", [
			"We use browser local/session storage to keep your CV, settings and download receipts on your device.",
			"Advertising cookies: when ads are switched on, Google AdSense and its partners may use cookies or similar technologies to show and measure ads, including personalised ads where the law allows. You can opt out of personalised ads at adssettings.google.com. Visitors from the EEA, UK and Switzerland are asked for consent first.",
			"Affiliate links: some links on the page shown after a download are affiliate links marked as sponsored. If you use them, the partner may set its own cookies."
		]],
		["7. Your choices", ["You can delete your saved CV at any time by clearing your browser's site data for this website.", "To ask about, or delete, any order record we hold, email us."]],
		["8. Changes", ["If this policy changes, we will update this page and its date."]],
		["9. Contact", ["mail"]]
	],
	hi: [
		["1. सारांश", ["हम कम से कम जानकारी लेते हैं। हम आपका डेटा नहीं बेचते और विज्ञापन नहीं दिखाते।", "कोई अकाउंट ज़रूरी नहीं है। इस साइट पर कोई लॉगिन नहीं है — आप गेस्ट के रूप में इस्तेमाल कर सकते हैं।"]],
		["2. आपका CV डेटा", [
			"आप जो CV लिखते हैं (नाम, संपर्क, अनुभव, शिक्षा, स्किल) वह आपके अपने डिवाइस पर ब्राउज़र के local storage में सेव होता है। एडिट करते समय यह हमें अपलोड नहीं होता।",
			"ब्राउज़र डेटा साफ़ करने, या दूसरा ब्राउज़र/डिवाइस इस्तेमाल करने पर सेव किया गया CV हट या छिप सकता है। अपनी कॉपी (डाउनलोड) ज़रूर रखें।",
			"जब आप क्लीन (पेड) डाउनलोड माँगते हैं या खरीद शुरू करते हैं, तब आपका CV कंटेंट सिर्फ़ फ़ाइल बनाने और ऑर्डर जाँचने के लिए हमारे सर्वर पर भेजा जाता है। हम ऑर्डर रिकॉर्ड (ऑर्डर ID, प्लान, राशि, स्थिति, पेमेंट रेफ़रेंस और CV का फ़िंगरप्रिंट/हैश) रखते हैं — CV का टेक्स्ट नहीं।"
		]],
		["3. ऑटो फ़ॉर्म फ़िलर", ["फ़ॉर्म-फ़िल क्रेडिट इस्तेमाल होने पर कंपनी का नाम और नतीजा (सफल/असफल) रिकॉर्ड होता है, ताकि क्रेडिट सही गिने जाएँ और फ़िल असफल होने पर वापस हों।"]],
		["4. भुगतान", ["CV Studio अभी ट्रायल मोड में है, अभी कोई असली भुगतान नहीं लिया जा रहा है।", "भुगतान शुरू होने पर वे एक पेमेंट प्रदाता (Razorpay) से प्रोसेस होंगे। हम आपका कार्ड या UPI विवरण न देखते हैं, न रखते हैं।"]],
		["5. अन्य सेवाएँ", ["हमारा होस्टिंग प्रदाता (Render) सामान्य तकनीकी जानकारी जैसे IP पता और ब्राउज़र प्रकार प्राप्त करता है।", "फ़ॉन्ट Google Fonts से लोड होते हैं, इसलिए Google को आपके ब्राउज़र से सामान्य अनुरोध मिलता है।"]],
		["6. कुकीज़ और local storage", ["हम आपके CV, सेटिंग और डाउनलोड रसीद को आपके डिवाइस पर रखने के लिए ब्राउज़र storage का इस्तेमाल करते हैं।", "हम विज्ञापन कुकीज़ का इस्तेमाल नहीं करते।"]],
		["7. आपके विकल्प", ["आप कभी भी इस वेबसाइट का ब्राउज़र साइट डेटा साफ़ करके अपना सेव किया CV हटा सकते हैं।", "हमारे पास मौजूद किसी ऑर्डर रिकॉर्ड के बारे में पूछने या हटवाने के लिए हमें ईमेल करें।"]],
		["8. बदलाव", ["अगर यह नीति बदलती है, तो हम यह पेज और इसकी तारीख अपडेट करेंगे।"]],
		["9. संपर्क", ["mail"]]
	],
	faqld: null
};
var $$splitComponentImporter$19 = () => import("./privacy-policy-CjOqb9ai.mjs");
var Route$23 = createFileRoute("/privacy-policy")({
	head: () => infoHead(c$1),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./refund-policy-DSLAShqx.mjs");
var Route$22 = createFileRoute("/refund-policy")({
	head: () => ({
		meta: [{ title: "Refund Policy — FormZalo" }, {
			name: "description",
			content: "FormZalo refund policy in English and Hindi."
		}],
		links: [{
			rel: "stylesheet",
			href: "https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600&display=swap"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./report-CWHadQpV.mjs");
var Route$21 = createFileRoute("/report")({
	head: () => ({ meta: [{ title: "Report a problem · FormZalo" }] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./services-CYrRqtca.mjs");
var BASE = "https://formzalo.com";
var JSONLD = [{
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: [
		{
			"@type": "Question",
			name: "Is FormZalo free?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "Yes. Creating, editing, saving and choosing templates are free with no login, and you can download a watermarked PDF/DOCX for free."
			}
		},
		{
			"@type": "Question",
			name: "How much does a clean CV download cost?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "₹20 one-time (Single Use) in India or $1 (Global Single Use); each gives one clean CV download or one form fill."
			}
		},
		{
			"@type": "Question",
			name: "What is in the Career Starter plan?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "₹1,000 per year: 2 profiles, 100 CV generations and 100 form fills (up to 100 companies, counted within those fills)."
			}
		},
		{
			"@type": "Question",
			name: "What is in the Global Pro plan?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "$29 per year: 300 CV generations and 300 form fills."
			}
		},
		{
			"@type": "Question",
			name: "Am I charged if a form fill fails?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "No. A form-fill credit is used only on a successful fill and is refunded if the fill fails."
			}
		},
		{
			"@type": "Question",
			name: "How do I contact support?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "Email team@formzalo.com. Requests are reviewed within 2 working days."
			}
		},
		{
			"@type": "Question",
			name: "Is FormZalo taking payments now?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "Not yet. FormZalo is in trial mode and no real payments are being taken."
			}
		}
	]
}];
var Route$20 = createFileRoute("/services")({
	head: () => ({
		meta: [
			{ title: "Services & Plans — FormZalo" },
			{
				name: "description",
				content: "FormZalo services and plans (English & Hindi): free CV builder with no login, PDF/DOCX download, Auto Form Filler, Single Use ₹20/$1, Career Starter ₹1,000/year, Global Pro $29/year."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: `${BASE}/services`
			}
		],
		links: [{
			rel: "stylesheet",
			href: "https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600&display=swap"
		}],
		scripts: JSONLD.map((j) => ({
			type: "application/ld+json",
			children: JSON.stringify(j)
		}))
	}),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./templates-DuZDzHQp.mjs");
var Route$19 = createFileRoute("/templates")({
	head: () => contentHead("CV templates gallery", "Free CV templates: a modern two-column layout, a classic consular format and a plain ATS-friendly page.", "/templates"),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var c = {
	slug: "terms",
	title: "Terms & Conditions",
	hi_title: "नियम और शर्तें",
	desc: "FormZalo terms and conditions in English and Hindi.",
	lead: "Last updated: 24 October 2026.",
	en: [
		["1. About these terms", ["By using CV Studio you agree to these terms. If you do not agree, please do not use the service."]],
		["2. The service", ["CV Studio lets you create, edit and save CVs, choose templates, download them as PDF or DOCX, and use an Auto Form Filler for job applications.", "Creating, editing, saving and choosing templates are free. The free download carries a watermark. Clean downloads and form fills use paid credits, as described on the Services & Plans page."]],
		["3. Trial mode", ["CV Studio is currently in trial mode and no real payments are taken yet. Features and plans may change before full launch. Packages you have already bought keep the terms they were bought with."]],
		["4. Your content", ["You own what you write in your CV. You are responsible for making sure it is true and that you have the right to use it.", "Do not use CV Studio for anything illegal, misleading, or to impersonate someone else."]],
		["5. Auto Form Filler", ["You are responsible for checking every form before you submit it to an employer. A form-fill credit is used only when a fill succeeds, and is refunded if the fill fails."]],
		["6. Payments and refunds", ["Prices are shown on the Services & Plans page. Refunds follow our Refund Policy."]],
		["7. No guarantee of results", ["We do not promise that using CV Studio will get you interviews or a job.", "The service is provided “as is”. We try to keep it working and accurate, but we cannot guarantee it will always be available or error-free. Keep your own copy of your CV."]],
		["8. Changes", ["We may update these terms. The updated version will be posted on this page with a new date."]],
		["9. Contact", ["mail"]]
	],
	hi: [
		["1. इन शर्तों के बारे में", ["CV Studio इस्तेमाल करके आप इन शर्तों से सहमत होते हैं। अगर आप सहमत नहीं हैं, तो कृपया सेवा का इस्तेमाल न करें।"]],
		["2. सेवा", ["CV Studio से आप CV बना, एडिट और सेव कर सकते हैं, टेम्पलेट चुन सकते हैं, PDF या DOCX में डाउनलोड कर सकते हैं, और नौकरी के आवेदनों के लिए ऑटो फ़ॉर्म फ़िलर इस्तेमाल कर सकते हैं।", "CV बनाना, एडिट करना, सेव करना और टेम्पलेट चुनना मुफ़्त है। मुफ़्त डाउनलोड पर वॉटरमार्क होता है। क्लीन डाउनलोड और फ़ॉर्म फ़िल के लिए पेड क्रेडिट लगते हैं, जैसा Services & Plans पेज पर बताया गया है।"]],
		["3. ट्रायल मोड", ["CV Studio अभी ट्रायल मोड में है, अभी कोई असली भुगतान नहीं लिया जा रहा है। पूरे लॉन्च से पहले फ़ीचर और प्लान बदल सकते हैं। पहले से खरीदे गए पैकेज उन्हीं शर्तों पर रहेंगे जिन पर वे खरीदे गए थे।"]],
		["4. आपका कंटेंट", ["आपके CV में लिखी चीज़ें आपकी हैं। यह सुनिश्चित करना आपकी ज़िम्मेदारी है कि वे सही हों और आपको उन्हें इस्तेमाल करने का अधिकार हो।", "CV Studio का इस्तेमाल किसी गैरकानूनी, भ्रामक काम या किसी और की पहचान बनाने के लिए न करें।"]],
		["5. ऑटो फ़ॉर्म फ़िलर", ["किसी भी फ़ॉर्म को नियोक्ता को भेजने से पहले जाँचना आपकी ज़िम्मेदारी है। फ़ॉर्म-फ़िल क्रेडिट सिर्फ़ सफल फ़िल पर लगता है, और फ़िल असफल होने पर वापस हो जाता है।"]],
		["6. भुगतान और रिफंड", ["कीमतें Services & Plans पेज पर दी गई हैं। रिफंड हमारी रिफंड नीति के अनुसार होते हैं।"]],
		["7. नतीजों की कोई गारंटी नहीं", ["हम यह वादा नहीं करते कि CV Studio से आपको इंटरव्यू या नौकरी मिलेगी।", "सेवा “जैसी है” वैसी दी जाती है। हम इसे सही और चालू रखने की कोशिश करते हैं, पर यह गारंटी नहीं दे सकते कि यह हमेशा उपलब्ध या बिना गलती के रहेगी। अपने CV की अपनी कॉपी रखें।"]],
		["8. बदलाव", ["हम ये शर्तें अपडेट कर सकते हैं। नया वर्ज़न नई तारीख के साथ इसी पेज पर डाला जाएगा।"]],
		["9. संपर्क", ["mail"]]
	],
	faqld: null
};
var $$splitComponentImporter$14 = () => import("./terms-CCyQkSdb.mjs");
var Route$18 = createFileRoute("/terms")({
	head: () => infoHead(c),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var p$10 = SEO_PAGES.find((x) => x.code === "ar");
var $$splitComponentImporter$13 = () => import("./ar.cv-maker-tcVvCy-E.mjs");
var Route$17 = createFileRoute("/ar/cv-maker")({
	head: () => seoPageHead(p$10),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./c._token-CI7L9YrH.mjs");
var Route$16 = createFileRoute("/c/$token")({
	head: () => ({ meta: [{ title: "Share your details · FormZalo" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
/** [model field, English label, Hindi label, input type] — existing Personal fields only. */
var p$9 = SEO_PAGES.find((x) => x.code === "de");
var $$splitComponentImporter$11 = () => import("./de.cv-maker-DyLyTZMn.mjs");
var Route$15 = createFileRoute("/de/cv-maker")({
	head: () => seoPageHead(p$9),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var p$8 = SEO_PAGES.find((x) => x.code === "es");
var $$splitComponentImporter$10 = () => import("./es.cv-maker-CaPN9mLX.mjs");
var Route$14 = createFileRoute("/es/cv-maker")({
	head: () => seoPageHead(p$8),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var p$7 = SEO_PAGES.find((x) => x.code === "fr");
var $$splitComponentImporter$9 = () => import("./fr.cv-maker-iRuOOiOW.mjs");
var Route$13 = createFileRoute("/fr/cv-maker")({
	head: () => seoPageHead(p$7),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./guides.index-uKxJ6D84.mjs");
var Route$12 = createFileRoute("/guides/")({
	head: () => contentHead("CV and job application guides", "Free guides on writing a CV, cover letters, government job forms and photo/signature specifications.", "/guides"),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./guides._slug-B7dEskj6.mjs");
var Route$11 = createFileRoute("/guides/$slug")({
	loader: ({ params }) => {
		const g = guideBySlug(params.slug);
		if (!g) throw notFound();
		return g;
	},
	head: ({ loaderData }) => {
		if (!loaderData) return {};
		const url = `https://formzalo.com/guides/${loaderData.slug}`;
		return {
			...contentHead(loaderData.title, loaderData.desc, `/guides/${loaderData.slug}`),
			scripts: [{
				type: "application/ld+json",
				children: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "Article",
					headline: loaderData.title,
					description: loaderData.desc,
					author: {
						"@type": "Organization",
						name: "FormZalo",
						url: "https://formzalo.com/"
					},
					publisher: {
						"@type": "Organization",
						name: "FormZalo",
						url: "https://formzalo.com/"
					},
					dateModified: "2026-11-10",
					mainEntityOfPage: url,
					inLanguage: "en"
				})
			}, {
				type: "application/ld+json",
				children: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "BreadcrumbList",
					itemListElement: [
						{
							"@type": "ListItem",
							position: 1,
							name: "Home",
							item: "https://formzalo.com/"
						},
						{
							"@type": "ListItem",
							position: 2,
							name: "Guides",
							item: "https://formzalo.com/guides"
						},
						{
							"@type": "ListItem",
							position: 3,
							name: loaderData.title,
							item: url
						}
					]
				})
			}]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var p$6 = SEO_PAGES.find((x) => x.code === "hi");
var $$splitComponentImporter$6 = () => import("./hi.cv-maker-KvpmRPLd.mjs");
var Route$10 = createFileRoute("/hi/cv-maker")({
	head: () => seoPageHead(p$6),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var p$5 = SEO_PAGES.find((x) => x.code === "it");
var $$splitComponentImporter$5 = () => import("./it.cv-maker-C7xv6Wnk.mjs");
var Route$9 = createFileRoute("/it/cv-maker")({
	head: () => seoPageHead(p$5),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var p$4 = SEO_PAGES.find((x) => x.code === "ja");
var $$splitComponentImporter$4 = () => import("./ja.cv-maker-DfjIAjhT.mjs");
var Route$8 = createFileRoute("/ja/cv-maker")({
	head: () => seoPageHead(p$4),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var p$3 = SEO_PAGES.find((x) => x.code === "pl");
var $$splitComponentImporter$3 = () => import("./pl.cv-maker-Dy47r4JK.mjs");
var Route$7 = createFileRoute("/pl/cv-maker")({
	head: () => seoPageHead(p$3),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var p$2 = SEO_PAGES.find((x) => x.code === "pt");
var $$splitComponentImporter$2 = () => import("./pt.cv-maker-DvbQmYjr.mjs");
var Route$6 = createFileRoute("/pt/cv-maker")({
	head: () => seoPageHead(p$2),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var p$1 = SEO_PAGES.find((x) => x.code === "ru");
var $$splitComponentImporter$1 = () => import("./ru.cv-maker-BCT3H2Vc.mjs");
var Route$5 = createFileRoute("/ru/cv-maker")({
	head: () => seoPageHead(p$1),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var p = SEO_PAGES.find((x) => x.code === "zh-cn");
var $$splitComponentImporter = () => import("./zh-cn.cv-maker-1m7T4Hsh.mjs");
var Route$4 = createFileRoute("/zh-cn/cv-maker")({
	head: () => seoPageHead(p),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Client IP behind Render's proxy: left-most X-Forwarded-For entry (trust proxy). */
function clientIp(headers, fallback = "unknown") {
	const xff = headers.get("x-forwarded-for");
	if (xff) {
		const first = xff.split(",")[0]?.trim();
		if (first) return first.slice(0, 64);
	}
	return (headers.get("x-real-ip") ?? headers.get("cf-connecting-ip") ?? fallback).slice(0, 64);
}
var TokenBucketLimiter = class {
	buckets = /* @__PURE__ */ new Map();
	maxKeys;
	constructor(maxKeys = 5e4) {
		this.maxKeys = maxKeys;
	}
	/** Returns 0 if allowed, else seconds to wait. */
	lastSweep = 0;
	take(key, rule, now = Date.now()) {
		if (now - this.lastSweep > 6e4) {
			this.lastSweep = now;
			this.sweep(now);
		}
		const k = `${rule.name}:${key}`;
		const rate = rule.capacity / rule.windowMs;
		let b = this.buckets.get(k);
		if (!b) {
			if (this.buckets.size >= this.maxKeys) this.sweep(now, true);
			b = {
				tokens: rule.capacity,
				last: now
			};
			this.buckets.set(k, b);
		} else {
			b.tokens = Math.min(rule.capacity, b.tokens + (now - b.last) * rate);
			b.last = now;
		}
		if (b.tokens >= 1) {
			b.tokens -= 1;
			return 0;
