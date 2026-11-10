import { o as __toESM } from "../_runtime.mjs";
import { $ as require_react, C as useRouter, Q as notFound, S as Link, _ as createRouter, b as createFileRoute, f as Scripts, h as useRouterState, p as HeadContent, v as Outlet, w as require_jsx_runtime, x as createRootRoute, y as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as matchLang, i as LANG_BOOT, n as SiteFooter, o as prefixDocLang, s as tr, u as useLang } from "./site-footer-CrbBo0PJ.mjs";
import { t as SiteHeader } from "./site-header-DONlhDL_.mjs";
import { o as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { a as Packer, i as ImageRun, n as BorderStyle, o as Paragraph, r as File, s as TextRun, t as AlignmentType } from "../_libs/docx.mjs";
import { t as E } from "../_libs/jspdf.mjs";
import processModule from "node:process";
import { Buffer } from "node:buffer";
import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { tmpdir } from "node:os";
//#region ../repo/node_modules/.nitro/vite/services/ssr/assets/seo-pages-C5trbSgy.js
/**
* Multilingual SEO landing pages for FormZalo (one page per language).
*
* Copy rules enforced here (and checked by seo-pages.test.ts):
* - Honest only: free CV creation + free watermarked PDF/Word download, no login.
*   A clean download OR one form fill costs ₹20 in India / $1 (Single Use).
*   Auto Form Filler is a PAID-plan feature — never claimed free.
* - No fake stats, testimonials, rankings, backlink or traffic claims.
* - No keyword stuffing; natural copy in each language.
* - Brand is FormZalo everywhere (never "CV Studio" / "formzolo").
* - 12 languages (2026-11-10 expansion): en, hi, ja, ar, zh-CN, fr, de, es,
*   pt, pl, it, ru. Full UI languages (catalogues in src/lib/i18n/messages/):
*   en, en-GB, hi, ja, ar, zh-CN, es-ES, fr-FR. Landing-only languages —
*   localised page, tool UI stays in the UI languages above (the page says so
*   in its own language via landingOnlyNote): de, pt, pl, it, ru.
* - Local keywords are used naturally (a few per language, no stuffing):
*   e.g. de "Lebenslauf erstellen", fr "créer un CV", pt "criar um currículo",
*   pl "tworzenie CV", it "creare un CV", ru "создать резюме".
*/
var SITE$1 = "https://formzalo.com";
var SEO_PAGES = [
	{
		code: "",
		path: "/cv-maker",
		lang: "en",
		dir: "ltr",
		label: "English",
		title: "Free CV Maker & Resume Builder | FormZalo",
		description: "Build a professional CV free with FormZalo. Create one Master Profile, choose a template, and download your CV as PDF or Word. Auto Form Filler is a paid plan feature.",
		h1: "Make a professional CV, free",
		lead: "FormZalo is a free CV maker. Build one Master Profile, pick a template, and download your CV as a PDF or Word file — no sign-up needed to start.",
		stepsHeading: "How it works",
		steps: [
			{
				title: "Build your Master Profile",
				text: "Add your details once — education, experience, skills and contact."
			},
			{
				title: "Choose a template",
				text: "Three professional templates: a modern two-column CV, a classic consular format, and a plain ATS-friendly page."
			},
			{
				title: "Download your CV",
				text: "Download a watermarked PDF or Word file free. A clean download costs ₹20 in India or $1."
			}
		],
		templatesHeading: "Three templates to choose from",
		templates: [
			{
				name: "International CV",
				text: "A modern two-column layout."
			},
			{
				name: "Particulars",
				text: "The classic consular format."
			},
			{
				name: "Atlas résumé",
				text: "A plain, ATS-friendly page."
			}
		],
		plansHeading: "Free to start, pay only for a clean download",
		plans: "Creating, editing and saving your CV is free, with no login needed. A watermarked PDF or Word download is free too. One clean download — or one form fill with the Auto Form Filler — costs ₹20 in India or $1. Yearly plans are listed on the Services page.",
		filler: "Auto Form Filler: reuse your Master Profile to fill job application forms faster. It is a paid plan feature — a credit is used only when a fill succeeds.",
		faqHeading: "Frequently asked questions",
		faqs: [
			{
				q: "Is FormZalo really free?",
				a: "Yes, for creating your CV. A watermarked PDF or Word download is free too. You only pay ₹20 in India or $1 for a clean download or a form fill."
			},
			{
				q: "Do I need an account?",
				a: "No. You can build your CV as a guest. A clean download needs an account."
			},
			{
				q: "Which languages does FormZalo support?",
				a: "The CV builder works in English, Hindi, Japanese, Arabic, Simplified Chinese, Spanish and French, and CV headings are also available in German."
			}
		],
		ctaPrimary: "Build my CV free",
		ctaSecondary: "See templates",
		nav: {
			generator: "CV generator",
			templates: "Templates",
			guides: "Guides",
			services: "Services & Plans",
			about: "About & Contact"
		}
	},
	{
		code: "hi",
		path: "/hi/cv-maker",
		lang: "hi",
		dir: "ltr",
		label: "हिंदी",
		title: "मुफ़्त CV मेकर और रिज़्यूमे बिल्डर | FormZalo",
		description: "FormZalo से मुफ़्त में प्रोफ़ेशनल CV बनाइए। एक Master Profile बनाइए, टेम्पलेट चुनिए और CV को PDF या Word में डाउनलोड कीजिए। ऑटो फ़ॉर्म फ़िलर एक पेड प्लान सुविधा है।",
		h1: "मुफ़्त में प्रोफ़ेशनल CV बनाइए",
		lead: "FormZalo एक मुफ़्त CV मेकर है। एक Master Profile बनाइए, टेम्पलेट चुनिए और अपना CV PDF या Word फ़ाइल के रूप में डाउनलोड कीजिए — शुरू करने के लिए साइन-अप की ज़रूरत नहीं है।",
		stepsHeading: "यह कैसे काम करता है",
		steps: [
			{
				title: "अपना Master Profile बनाइए",
				text: "अपनी जानकारी एक बार भरिए — शिक्षा, अनुभव, कौशल और संपर्क विवरण।"
			},
			{
				title: "टेम्पलेट चुनिए",
				text: "तीन प्रोफ़ेशनल टेम्पलेट: आधुनिक दो-कॉलम CV, क्लासिक कांसुलर फ़ॉर्मैट और ATS के अनुकूल सादा पेज।"
			},
			{
				title: "अपना CV डाउनलोड कीजिए",
				text: "वॉटरमार्क वाला PDF या Word फ़ाइल मुफ़्त में डाउनलोड कीजिए। बिना वॉटरमार्क के डाउनलोड की कीमत भारत में ₹20 या $1 है।"
			}
		],
		templatesHeading: "चुनने के लिए तीन टेम्पलेट",
		templates: [
			{
				name: "International CV",
				text: "आधुनिक दो-कॉलम लेआउट।"
			},
			{
				name: "Particulars",
				text: "क्लासिक कांसुलर फ़ॉर्मैट।"
			},
			{
				name: "Atlas résumé",
				text: "ATS के अनुकूल सादा पेज।"
			}
		],
		plansHeading: "बनाना मुफ़्त है, सिर्फ़ साफ़ डाउनलोड के लिए भुगतान",
		plans: "CV बनाना, एडिट करना और सेव करना बिना लॉगिन के मुफ़्त है। वॉटरमार्क वाला PDF या Word डाउनलोड भी मुफ़्त है। एक साफ़ डाउनलोड — या ऑटो फ़ॉर्म फ़िलर से एक फ़ॉर्म भरना — भारत में ₹20 या $1 का है। सालाना प्लान Services पेज पर देखिए।",
		filler: "ऑटो फ़ॉर्म फ़िलर: अपने Master Profile से नौकरी के आवेदन फ़ॉर्म तेज़ी से भरिए। यह एक पेड प्लान सुविधा है — क्रेडिट तभी इस्तेमाल होता है जब फ़ॉर्म सफलतापूर्वक भर जाए।",
		faqHeading: "अक्सर पूछे जाने वाले सवाल",
		faqs: [
			{
				q: "क्या FormZalo सच में मुफ़्त है?",
				a: "हाँ। CV बनाना मुफ़्त है और वॉटरमार्क वाला डाउनलोड भी मुफ़्त है। आप सिर्फ़ साफ़ डाउनलोड या फ़ॉर्म भरने के लिए ₹20 या $1 देते हैं।"
			},
			{
				q: "क्या मुझे अकाउंट चाहिए?",
				a: "नहीं। आप गेस्ट के रूप में CV बना सकते हैं। साफ़ डाउनलोड के लिए अकाउंट चाहिए।"
			},
			{
				q: "कौन-सी भाषाएँ समर्थित हैं?",
				a: "CV बिल्डर अंग्रेज़ी, हिंदी, जापानी, अरबी, सरलीकृत चीनी, स्पैनिश और फ़्रेंच में काम करता है, और CV के शीर्षक जर्मन में भी उपलब्ध हैं।"
			}
		],
		ctaPrimary: "मुफ़्त में मेरा CV बनाइए",
		ctaSecondary: "टेम्पलेट देखिए",
		nav: {
			generator: "CV जनरेटर",
			templates: "टेम्पलेट",
			guides: "गाइड",
			services: "सेवाएँ और प्लान",
			about: "हमारे बारे में"
		}
	},
	{
		code: "ja",
		path: "/ja/cv-maker",
		lang: "ja",
		dir: "ltr",
		label: "日本語",
		title: "無料の履歴書・CV作成ツール | FormZalo",
		description: "FormZaloでプロフェッショナルなCVを無料で作成。マスタープロフィールを作り、テンプレートを選び、PDFまたはWordでダウンロードできます。オートフォームフィラーは有料プランの機能です。",
		h1: "プロフェッショナルなCVを無料で作成",
		lead: "FormZaloは無料のCV作成ツールです。マスタープロフィールを1つ作り、テンプレートを選んで、PDFまたはWordでダウンロードできます。始めるのに登録は不要です。",
		stepsHeading: "使い方",
		steps: [
			{
				title: "マスタープロフィールを作成",
				text: "学歴、職歴、スキル、連絡先を一度だけ入力します。"
			},
			{
				title: "テンプレートを選ぶ",
				text: "3つのプロフェッショナルなテンプレート：モダンな2カラム、クラシックな領事館形式、ATS対応のシンプルな形式。"
			},
			{
				title: "CVをダウンロード",
				text: "透かし入りのPDFまたはWordファイルを無料でダウンロードできます。透かしなしのダウンロードはインドで₹20、または1ドルです。"
			}
		],
		templatesHeading: "選べる3つのテンプレート",
		templates: [
			{
				name: "International CV",
				text: "モダンな2カラムのレイアウト。"
			},
			{
				name: "Particulars",
				text: "クラシックな領事館形式。"
			},
			{
				name: "Atlas résumé",
				text: "ATS対応のシンプルなページ。"
			}
		],
		plansHeading: "作成は無料、透かしなしのダウンロードだけ有料",
		plans: "CVの作成、編集、保存はログインなしで無料です。透かし入りのPDF・Wordダウンロードも無料です。透かしなしのダウンロード1回、またはオートフォームフィラーでのフォーム入力1回は、インドで₹20、または1ドルです。年間プランは料金ページをご覧ください。",
		filler: "オートフォームフィラー：マスタープロフィールを使って求人申込フォームをすばやく入力できます。有料プランの機能で、入力が成功したときにのみクレジットが使われます。",
		faqHeading: "よくある質問",
		faqs: [
			{
				q: "FormZaloは本当に無料ですか？",
				a: "はい。CVの作成は無料で、透かし入りのダウンロードも無料です。透かしなしのダウンロードやフォーム入力には₹20／1ドルがかかります。"
			},
			{
				q: "アカウントは必要ですか？",
				a: "いいえ。ゲストとしてCVを作れます。透かしなしのダウンロードにはアカウントが必要です。"
			},
			{
				q: "どの言語に対応していますか？",
				a: "CVビルダーは英語、ヒンディー語、日本語、アラビア語、簡体字中国語、スペイン語、フランス語に対応し、CVの見出しはドイツ語でも利用できます。"
			}
		],
		ctaPrimary: "無料でCVを作成",
		ctaSecondary: "テンプレートを見る",
		nav: {
			generator: "CV作成",
			templates: "テンプレート",
			guides: "ガイド",
			services: "サービスと料金",
			about: "会社概要・お問い合わせ"
		}
	},
	{
		code: "ar",
		path: "/ar/cv-maker",
		lang: "ar",
		dir: "rtl",
		label: "العربية",
		title: "صانع سيرة ذاتية مجاني | FormZalo",
		description: "إنشاء سيرة ذاتية احترافية مجانًا مع FormZalo، منشئ سيرة ذاتية مجاني. أنشئ ملفًا رئيسيًا واحدًا، واختر قالبًا، ونزّل سيرتك الذاتية بصيغة PDF أو Word. ميزة تعبئة النماذج التلقائية مدفوعة.",
		h1: "إنشاء سيرة ذاتية احترافية مجانًا",
		lead: "FormZalo أداة مجانية لإنشاء السيرة الذاتية. أنشئ ملفًا رئيسيًا واحدًا، واختر قالبًا، ونزّل سيرتك الذاتية بصيغة PDF أو Word — لا حاجة للتسجيل للبدء.",
		stepsHeading: "كيف يعمل",
		steps: [
			{
				title: "أنشئ ملفك الرئيسي",
				text: "أدخل بياناتك مرة واحدة: التعليم والخبرة والمهارات وبيانات الاتصال."
			},
			{
				title: "اختر قالبًا",
				text: "ثلاثة قوالب احترافية: سيرة ذاتية حديثة بعمودين، وتنسيق قنصلي كلاسيكي، وصفحة بسيطة متوافقة مع أنظمة تتبع المتقدمين."
			},
			{
				title: "نزّل سيرتك الذاتية",
				text: "نزّل نسخة PDF أو Word بعلامة مائية مجانًا. أما النسخة النظيفة فتكلف 20 روبية في الهند أو دولارًا واحدًا."
			}
		],
		templatesHeading: "ثلاثة قوالب للاختيار من بينها",
		templates: [
			{
				name: "International CV",
				text: "تخطيط حديث بعمودين."
			},
			{
				name: "Particulars",
				text: "التنسيق القنصلي الكلاسيكي."
			},
			{
				name: "Atlas résumé",
				text: "صفحة بسيطة متوافقة مع أنظمة تتبع المتقدمين."
			}
		],
		plansHeading: "الإنشاء مجاني، والدفع فقط للنسخة النظيفة",
		plans: "إنشاء سيرتك الذاتية وتعديلها وحفظها مجاني دون تسجيل الدخول. وتنزيل نسخة بعلامة مائية مجاني أيضًا. تنزيل نسخة نظيفة واحدة — أو تعبئة نموذج واحد — يكلف 20 روبية في الهند أو دولارًا واحدًا. الخطط السنوية موضحة في صفحة الخدمات.",
		filler: "تعبئة النماذج التلقائية: استخدم ملفك الرئيسي لتعبئة نماذج طلبات الوظائف بسرعة. إنها ميزة مدفوعة، ولا يُستخدم الرصيد إلا عند نجاح التعبئة.",
		faqHeading: "الأسئلة الشائعة",
		faqs: [
			{
				q: "هل FormZalo مجاني فعلًا؟",
				a: "نعم. إنشاء السيرة الذاتية مجاني، والتنزيل بعلامة مائية مجاني. وتدفع 20 روبية أو دولارًا واحدًا فقط مقابل نسخة نظيفة أو تعبئة نموذج."
			},
			{
				q: "هل أحتاج إلى حساب؟",
				a: "لا. يمكنك إنشاء سيرتك الذاتية كضيف. أما التنزيل النظيف فيحتاج إلى حساب."
			},
			{
				q: "ما اللغات المدعومة؟",
				a: "يعمل منشئ السيرة الذاتية بالإنجليزية والهندية واليابانية والعربية والصينية المبسطة والإسبانية والفرنسية، وتتوفر عناوين السيرة الذاتية أيضًا بالألمانية."
			}
		],
		ctaPrimary: "أنشئ سيرتي الذاتية مجانًا",
		ctaSecondary: "شاهد القوالب",
		nav: {
			generator: "منشئ السيرة الذاتية",
			templates: "القوالب",
			guides: "الأدلة",
			services: "الخدمات والخطط",
			about: "من نحن واتصل بنا"
		}
	},
	{
		code: "zh-cn",
		path: "/zh-cn/cv-maker",
		lang: "zh-CN",
		dir: "ltr",
		label: "简体中文",
		title: "免费简历制作工具 | FormZalo",
		description: "使用 FormZalo 免费制作专业简历。创建一个主档案，选择模板，并以 PDF 或 Word 格式下载简历。自动填表是付费计划功能。",
		h1: "免费制作专业简历",
		lead: "FormZalo 是一款免费简历制作工具。创建一个主档案，选择一个模板，即可以 PDF 或 Word 文件下载简历——开始使用无需注册。",
		stepsHeading: "使用方法",
		steps: [
			{
				title: "创建主档案",
				text: "只需输入一次信息：教育背景、工作经历、技能和联系方式。"
			},
			{
				title: "选择模板",
				text: "三个专业模板：现代双栏简历、经典领事格式和简洁的 ATS 友好页面。"
			},
			{
				title: "下载简历",
				text: "免费下载带水印的 PDF 或 Word 文件。无水印下载在印度为 20 卢比，或 1 美元。"
			}
		],
		templatesHeading: "三种模板可供选择",
		templates: [
			{
				name: "International CV",
				text: "现代双栏布局。"
			},
			{
				name: "Particulars",
				text: "经典领事格式。"
			},
			{
				name: "Atlas résumé",
				text: "简洁的 ATS 友好页面。"
			}
		],
		plansHeading: "创建免费，仅无水印下载收费",
		plans: "创建、编辑和保存简历均免费，无需登录。带水印的 PDF 或 Word 下载也是免费的。一次无水印下载——或使用自动填表填写一份表格——在印度为 20 卢比，或 1 美元。年费计划请见服务页面。",
		filler: "自动填表：使用主档案快速填写求职申请表。这是付费计划功能，仅在填写成功时使用额度。",
		faqHeading: "常见问题",
		faqs: [
			{
				q: "FormZalo 真的免费吗？",
				a: "是的。制作简历免费，带水印下载也免费。只有无水印下载或填表才需支付 20 卢比或 1 美元。"
			},
			{
				q: "需要注册账号吗？",
				a: "不需要。您可以作为访客制作简历。无水印下载需要账号。"
			},
			{
				q: "支持哪些语言？",
				a: "简历制作工具支持英语、印地语、日语、阿拉伯语、简体中文、西班牙语和法语，简历标题还支持德语。"
			}
		],
		ctaPrimary: "免费制作我的简历",
		ctaSecondary: "查看模板",
		nav: {
			generator: "简历制作",
			templates: "模板",
			guides: "指南",
			services: "服务与套餐",
			about: "关于与联系"
		}
	},
	{
		code: "fr",
		path: "/fr/cv-maker",
		lang: "fr",
		dir: "ltr",
		label: "Français",
		title: "Créateur de CV gratuit | FormZalo",
		description: "Créez un CV professionnel gratuitement avec FormZalo, le générateur de CV gratuit. Créez un profil principal, choisissez un modèle et téléchargez votre CV en PDF ou Word. Le remplissage automatique des formulaires est une fonction payante.",
		h1: "Créer un CV professionnel, gratuitement",
		lead: "FormZalo est un créateur de CV gratuit. Créez un profil principal, choisissez un modèle et téléchargez votre CV en PDF ou Word — aucune inscription n'est nécessaire pour commencer.",
		stepsHeading: "Comment ça marche",
		steps: [
			{
				title: "Créez votre profil principal",
				text: "Saisissez vos informations une seule fois : formation, expérience, compétences et coordonnées."
			},
			{
				title: "Choisissez un modèle",
				text: "Trois modèles professionnels : un CV moderne à deux colonnes, un format consulaire classique et une page simple compatible ATS."
			},
			{
				title: "Téléchargez votre CV",
				text: "Téléchargez gratuitement un fichier PDF ou Word avec filigrane. Un téléchargement sans filigrane coûte 20 roupies en Inde ou 1 dollar."
			}
		],
		templatesHeading: "Trois modèles au choix",
		templates: [
			{
				name: "International CV",
				text: "Une mise en page moderne à deux colonnes."
			},
			{
				name: "Particulars",
				text: "Le format consulaire classique."
			},
			{
				name: "Atlas résumé",
				text: "Une page simple, compatible ATS."
			}
		],
		plansHeading: "La création est gratuite, seul le téléchargement sans filigrane est payant",
		plans: "Créer, modifier et enregistrer votre CV est gratuit, sans connexion. Le téléchargement avec filigrane est gratuit aussi. Un téléchargement sans filigrane — ou un formulaire rempli — coûte 20 roupies en Inde ou 1 dollar. Les formules annuelles sont sur la page Services.",
		filler: "Remplissage automatique des formulaires : réutilisez votre profil principal pour remplir les formulaires de candidature plus vite. C'est une fonction payante — un crédit n'est utilisé que si le remplissage réussit.",
		faqHeading: "Questions fréquentes",
		faqs: [
			{
				q: "FormZalo est-il vraiment gratuit ?",
				a: "Oui. La création du CV est gratuite, et le téléchargement avec filigrane aussi. Vous ne payez 20 roupies ou 1 dollar que pour un téléchargement sans filigrane ou un formulaire rempli."
			},
			{
				q: "Faut-il un compte ?",
				a: "Non. Vous pouvez créer votre CV en tant qu'invité. Le téléchargement sans filigrane nécessite un compte."
			},
			{
				q: "Quelles langues sont prises en charge ?",
				a: "Le créateur de CV fonctionne en anglais, hindi, japonais, arabe, chinois simplifié, espagnol et français, et les titres du CV sont aussi disponibles en allemand."
			}
		],
		ctaPrimary: "Créer mon CV gratuitement",
		ctaSecondary: "Voir les modèles",
		nav: {
			generator: "Créateur de CV",
			templates: "Modèles",
			guides: "Guides",
			services: "Services et formules",
			about: "À propos et contact"
		}
	},
	{
		code: "de",
		path: "/de/cv-maker",
		lang: "de",
		dir: "ltr",
		label: "Deutsch",
		landingOnlyNote: "Hinweis: Diese Seite ist auf Deutsch, damit Sie das Tool in der Suche finden. Das Tool selbst läuft auf Englisch, Hindi, Japanisch, Arabisch, Chinesisch, Spanisch und Französisch.",
		title: "Kostenloser Lebenslauf-Ersteller | FormZalo",
		description: "FormZalo ist ein kostenloser Lebenslauf-Generator. Legen Sie ein Masterprofil an, wählen Sie eine Vorlage und laden Sie Ihren Lebenslauf als PDF oder Word herunter. Der Auto-Formularausfüller ist eine kostenpflichtige Funktion.",
		h1: "Lebenslauf erstellen — kostenlos und professionell",
		lead: "FormZalo ist ein kostenloser Lebenslauf-Ersteller. Legen Sie ein Masterprofil an, wählen Sie eine Vorlage und laden Sie Ihren Lebenslauf als PDF- oder Word-Datei herunter — zur Anmeldung ist keine Registrierung nötig.",
		stepsHeading: "So funktioniert es",
		steps: [
			{
				title: "Masterprofil anlegen",
				text: "Geben Sie Ihre Daten einmal ein: Ausbildung, Erfahrung, Fähigkeiten und Kontaktdaten."
			},
			{
				title: "Vorlage wählen",
				text: "Drei professionelle Vorlagen: ein moderner zweispaltiger Lebenslauf, ein klassisches konsularisches Format und eine schlichte ATS-freundliche Seite."
			},
			{
				title: "Lebenslauf herunterladen",
				text: "Laden Sie kostenlos eine PDF- oder Word-Datei mit Wasserzeichen herunter. Ein Download ohne Wasserzeichen kostet 20 Rupien in Indien oder 1 US-Dollar."
			}
		],
		templatesHeading: "Drei Vorlagen zur Auswahl",
		templates: [
			{
				name: "International CV",
				text: "Ein modernes zweispaltiges Layout."
			},
			{
				name: "Particulars",
				text: "Das klassische konsularische Format."
			},
			{
				name: "Atlas résumé",
				text: "Eine schlichte, ATS-freundliche Seite."
			}
		],
		plansHeading: "Erstellen ist kostenlos, nur der Download ohne Wasserzeichen kostet etwas",
		plans: "Das Erstellen, Bearbeiten und Speichern Ihres Lebenslaufs ist kostenlos und ohne Anmeldung möglich. Auch der Download mit Wasserzeichen ist kostenlos. Ein Download ohne Wasserzeichen — oder ein ausgefülltes Formular — kostet 20 Rupien in Indien oder 1 US-Dollar. Jahrestarife finden Sie auf der Seite „Services“.",
		filler: "Auto-Formularausfüller: Nutzen Sie Ihr Masterprofil, um Bewerbungsformulare schneller auszufüllen. Es handelt sich um eine kostenpflichtige Funktion — ein Guthaben wird nur bei erfolgreichem Ausfüllen verwendet.",
		faqHeading: "Häufige Fragen",
		faqs: [
			{
				q: "Ist FormZalo wirklich kostenlos?",
				a: "Ja. Das Erstellen des Lebenslaufs ist kostenlos, ebenso der Download mit Wasserzeichen. Sie zahlen nur 20 Rupien oder 1 US-Dollar für einen Download ohne Wasserzeichen oder ein ausgefülltes Formular."
			},
			{
				q: "Brauche ich ein Konto?",
				a: "Nein. Sie können Ihren Lebenslauf als Gast erstellen. Für den Download ohne Wasserzeichen ist ein Konto erforderlich."
			},
			{
				q: "Welche Sprachen werden unterstützt?",
				a: "Der Lebenslauf-Ersteller funktioniert auf Englisch, Hindi, Japanisch, Arabisch, vereinfachtem Chinesisch, Spanisch und Französisch; die Überschriften des Lebenslaufs gibt es auch auf Deutsch."
			}
		],
		ctaPrimary: "Kostenlos Lebenslauf erstellen",
		ctaSecondary: "Vorlagen ansehen",
		nav: {
			generator: "Lebenslauf-Ersteller",
			templates: "Vorlagen",
			guides: "Anleitungen",
			services: "Leistungen und Tarife",
			about: "Über uns und Kontakt"
		}
	},
	{
		code: "es",
		path: "/es/cv-maker",
		lang: "es",
		dir: "ltr",
		label: "Español",
		title: "Creador de CV gratis | FormZalo",
		description: "Crea un CV profesional gratis con FormZalo, el generador de CV gratis. Crea un perfil principal, elige una plantilla y descarga tu CV en PDF o Word. El autorrelleno de formularios es una función de pago.",
		h1: "Crear un CV profesional, gratis",
		lead: "FormZalo es un creador de CV gratuito. Crea un perfil principal, elige una plantilla y descarga tu CV como archivo PDF o Word — no necesitas registrarte para empezar.",
		stepsHeading: "Cómo funciona",
		steps: [
			{
				title: "Crea tu perfil principal",
				text: "Escribe tus datos una sola vez: formación, experiencia, habilidades y contacto."
			},
			{
				title: "Elige una plantilla",
				text: "Tres plantillas profesionales: un CV moderno de dos columnas, un formato consular clásico y una página sencilla compatible con ATS."
			},
			{
				title: "Descarga tu CV",
				text: "Descarga gratis un archivo PDF o Word con marca de agua. Una descarga sin marca de agua cuesta 20 rupias en India o 1 dólar."
			}
		],
		templatesHeading: "Tres plantillas para elegir",
		templates: [
			{
				name: "International CV",
				text: "Un diseño moderno de dos columnas."
			},
			{
				name: "Particulars",
				text: "El formato consular clásico."
			},
			{
				name: "Atlas résumé",
				text: "Una página sencilla, compatible con ATS."
			}
		],
		plansHeading: "Crear es gratis, solo pagas por la descarga sin marca de agua",
		plans: "Crear, editar y guardar tu CV es gratis y sin iniciar sesión. La descarga con marca de agua también es gratis. Una descarga sin marca de agua — o un formulario rellenado — cuesta 20 rupias en India o 1 dólar. Los planes anuales están en la página de Servicios.",
		filler: "Autorrelleno de formularios: reutiliza tu perfil principal para rellenar solicitudes de empleo más rápido. Es una función de pago: el crédito solo se usa si el relleno tiene éxito.",
		faqHeading: "Preguntas frecuentes",
		faqs: [
			{
				q: "¿FormZalo es realmente gratis?",
				a: "Sí. Crear el CV es gratis, y la descarga con marca de agua también. Solo pagas 20 rupias o 1 dólar por una descarga sin marca de agua o un formulario rellenado."
			},
			{
				q: "¿Necesito una cuenta?",
				a: "No. Puedes crear tu CV como invitado. La descarga sin marca de agua necesita una cuenta."
			},
			{
				q: "¿Qué idiomas admite?",
				a: "El creador de CV funciona en inglés, hindi, japonés, árabe, chino simplificado, español y francés, y los encabezados del CV también están disponibles en alemán."
			}
		],
		ctaPrimary: "Crear mi CV gratis",
		ctaSecondary: "Ver plantillas",
		nav: {
			generator: "Creador de CV",
			templates: "Plantillas",
			guides: "Guías",
			services: "Servicios y planes",
			about: "Acerca de y contacto"
		}
	},
	{
		code: "pt",
		path: "/pt/cv-maker",
		lang: "pt",
		dir: "ltr",
		label: "Português",
		landingOnlyNote: "Nota: esta página está em português para que você encontre a ferramenta na busca. A ferramenta em si funciona em inglês, hindi, japonês, árabe, chinês, espanhol e francês.",
		title: "Criador de currículo grátis | FormZalo",
		description: "Crie um currículo profissional grátis com o FormZalo, o gerador de currículo grátis. Crie um perfil principal, escolha um modelo e baixe seu currículo em PDF ou Word. O preenchimento automático de formulários é um recurso pago.",
		h1: "Criar um currículo profissional, grátis",
		lead: "O FormZalo é um gerador de currículo grátis. Crie um perfil principal, escolha um modelo e baixe seu currículo como arquivo PDF ou Word — não é preciso se cadastrar para começar.",
		stepsHeading: "Como funciona",
		steps: [
			{
				title: "Crie seu perfil principal",
				text: "Insira seus dados uma só vez: formação, experiência, habilidades e contato."
			},
			{
				title: "Escolha um modelo",
				text: "Três modelos profissionais: um currículo moderno de duas colunas, um formato consular clássico e uma página simples compatível com ATS."
			},
			{
				title: "Baixe seu currículo",
				text: "Baixe gratuitamente um arquivo PDF ou Word com marca d'água. Um download sem marca d'água custa 20 rúpias na Índia ou 1 dólar."
			}
		],
		templatesHeading: "Três modelos para escolher",
		templates: [
			{
				name: "International CV",
				text: "Um layout moderno de duas colunas."
			},
			{
				name: "Particulars",
				text: "O formato consular clássico."
			},
			{
				name: "Atlas résumé",
				text: "Uma página simples, compatível com ATS."
			}
		],
		plansHeading: "Criar é grátis, você só paga pelo download sem marca d'água",
		plans: "Criar, editar e salvar seu currículo é grátis e sem login. O download com marca d'água também é grátis. Um download sem marca d'água — ou um formulário preenchido — custa 20 rúpias na Índia ou 1 dólar. Os planos anuais estão na página de Serviços.",
		filler: "Preenchimento automático de formulários: reutilize seu perfil principal para preencher candidaturas de emprego mais rápido. É um recurso pago — o crédito só é usado se o preenchimento for bem-sucedido.",
		faqHeading: "Perguntas frequentes",
		faqs: [
			{
				q: "O FormZalo é realmente grátis?",
				a: "Sim. Criar o currículo é grátis, e o download com marca d'água também. Você só paga 20 rúpias ou 1 dólar por um download sem marca d'água ou um formulário preenchido."
			},
			{
				q: "Preciso de uma conta?",
				a: "Não. Você pode criar seu currículo como visitante. O download sem marca d'água precisa de uma conta."
			},
			{
				q: "Quais idiomas são suportados?",
				a: "A ferramenta funciona em inglês, hindi, japonês, árabe, chinês simplificado, espanhol e francês; os títulos do CV também estão disponíveis em alemão. Esta página está em português para ajudar você a encontrar a ferramenta."
			}
		],
		ctaPrimary: "Criar meu currículo grátis",
		ctaSecondary: "Ver modelos",
		nav: {
			generator: "Criador de currículo",
			templates: "Modelos",
			guides: "Guias",
			services: "Serviços e planos",
			about: "Sobre e contato"
		}
	},
	{
		code: "pl",
		path: "/pl/cv-maker",
		lang: "pl",
		dir: "ltr",
		label: "Polski",
		landingOnlyNote: "Uwaga: ta strona jest po polsku, żeby można było znaleźć narzędzie w wyszukiwarce. Samo narzędzie działa w języku angielskim, hindi, japońskim, arabskim, chińskim, hiszpańskim i francuskim.",
		title: "Darmowy kreator CV | FormZalo",
		description: "Utwórz profesjonalne CV za darmo z FormZalo. Utwórz profil główny, wybierz szablon i pobierz CV w formacie PDF lub Word. Automatyczne wypełnianie formularzy to funkcja płatna.",
		h1: "Stwórz profesjonalne CV za darmo",
		lead: "Tworzenie CV z FormZalo jest darmowe i proste: utwórz jeden profil główny, wybierz szablon i pobierz CV jako plik PDF lub Word — aby zacząć, nie musisz się rejestrować.",
		stepsHeading: "Jak to działa",
		steps: [
			{
				title: "Utwórz profil główny",
				text: "Wprowadź swoje dane raz: wykształcenie, doświadczenie, umiejętności i kontakt."
			},
			{
				title: "Wybierz szablon",
				text: "Trzy profesjonalne szablony: nowoczesne dwukolumnowe CV, klasyczny format konsularny i prosta strona przyjazna ATS."
			},
			{
				title: "Pobierz CV",
				text: "Pobierz bezpłatnie plik PDF lub Word ze znakiem wodnym. Pobranie bez znaku wodnego kosztuje 20 rupii w Indiach lub 1 dolara."
			}
		],
		templatesHeading: "Trzy szablony do wyboru",
		templates: [
			{
				name: "International CV",
				text: "Nowoczesny układ dwukolumnowy."
			},
			{
				name: "Particulars",
				text: "Klasyczny format konsularny."
			},
			{
				name: "Atlas résumé",
				text: "Prosta strona przyjazna ATS."
			}
		],
		plansHeading: "Tworzenie jest darmowe, płacisz tylko za pobranie bez znaku wodnego",
		plans: "Tworzenie, edycja i zapisywanie CV jest darmowe i nie wymaga logowania. Pobieranie ze znakiem wodnym też jest darmowe. Jedno pobranie bez znaku wodnego — albo jeden wypełniony formularz — kosztuje 20 rupii w Indiach lub 1 dolara. Plany roczne znajdziesz na stronie Usługi.",
		filler: "Automatyczne wypełnianie formularzy: wykorzystaj swój profil główny, aby szybciej wypełniać formularze zgłoszeniowe. To funkcja płatna — kredyt jest wykorzystywany tylko wtedy, gdy wypełnienie się powiedzie.",
		faqHeading: "Częste pytania",
		faqs: [
			{
				q: "Czy FormZalo jest naprawdę darmowe?",
				a: "Tak. Tworzenie CV jest darmowe, podobnie jak pobieranie ze znakiem wodnym. Płacisz 20 rupii lub 1 dolara tylko za pobranie bez znaku wodnego albo wypełniony formularz."
			},
			{
				q: "Czy potrzebuję konta?",
				a: "Nie. Możesz utworzyć CV jako gość. Pobranie bez znaku wodnego wymaga konta."
			},
			{
				q: "Jakie języki są obsługiwane?",
				a: "Narzędzie działa w języku angielskim, hindi, japońskim, arabskim, chińskim uproszczonym, hiszpańskim i francuskim; nagłówki CV są dostępne także po niemiecku. Ta strona jest po polsku, żeby pomóc Ci znaleźć narzędzie."
			}
		],
		ctaPrimary: "Utwórz CV za darmo",
		ctaSecondary: "Zobacz szablony",
		nav: {
			generator: "Kreator CV",
			templates: "Szablony",
			guides: "Poradniki",
			services: "Usługi i plany",
			about: "O nas i kontakt"
		}
	},
	{
		code: "it",
		path: "/it/cv-maker",
		lang: "it",
		dir: "ltr",
		label: "Italiano",
		landingOnlyNote: "Nota: questa pagina è in italiano per aiutarti a trovare lo strumento nella ricerca. Lo strumento funziona in inglese, hindi, giapponese, arabo, cinese, spagnolo e francese.",
		title: "Generatore di CV gratuito | FormZalo",
		description: "Crea un CV professionale gratis con FormZalo. Crea un profilo principale, scegli un modello e scarica il tuo CV in PDF o Word. La compilazione automatica dei moduli è una funzione a pagamento.",
		h1: "Creare un CV professionale, gratis",
		lead: "FormZalo è un generatore di CV gratuito. Crea un profilo principale, scegli un modello e scarica il tuo CV come file PDF o Word — non serve registrarsi per iniziare.",
		stepsHeading: "Come funziona",
		steps: [
			{
				title: "Crea il tuo profilo principale",
				text: "Inserisci i tuoi dati una sola volta: formazione, esperienza, competenze e contatti."
			},
			{
				title: "Scegli un modello",
				text: "Tre modelli professionali: un CV moderno a due colonne, un formato consolare classico e una pagina semplice compatibile con ATS."
			},
			{
				title: "Scarica il tuo CV",
				text: "Scarica gratuitamente un file PDF o Word con filigrana. Un download senza filigrana costa 20 rupie in India o 1 dollaro."
			}
		],
		templatesHeading: "Tre modelli tra cui scegliere",
		templates: [
			{
				name: "International CV",
				text: "Un layout moderno a due colonne."
			},
			{
				name: "Particulars",
				text: "Il formato consolare classico."
			},
			{
				name: "Atlas résumé",
				text: "Una pagina semplice, compatibile con ATS."
			}
		],
		plansHeading: "Creare è gratis, paghi solo per il download senza filigrana",
		plans: "Creare, modificare e salvare il tuo CV è gratis e senza accesso. Anche il download con filigrana è gratis. Un download senza filigrana — o un modulo compilato — costa 20 rupie in India o 1 dollaro. I piani annuali sono nella pagina Servizi.",
		filler: "Compilazione automatica dei moduli: riutilizza il tuo profilo principale per compilare le candidature più velocemente. È una funzione a pagamento: il credito viene usato solo se la compilazione riesce.",
		faqHeading: "Domande frequenti",
		faqs: [
			{
				q: "FormZalo è davvero gratuito?",
				a: "Sì. Creare il CV è gratuito, così come il download con filigrana. Paghi 20 rupie o 1 dollaro solo per un download senza filigrana o un modulo compilato."
			},
			{
				q: "Serve un account?",
				a: "No. Puoi creare il tuo CV come ospite. Il download senza filigrana richiede un account."
			},
			{
				q: "Quali lingue sono supportate?",
				a: "Lo strumento funziona in inglese, hindi, giapponese, arabo, cinese semplificato, spagnolo e francese; le intestazioni del CV sono disponibili anche in tedesco. Questa pagina è in italiano per aiutarti a trovare lo strumento."
			}
		],
		ctaPrimary: "Crea il tuo CV gratis",
		ctaSecondary: "Vedi i modelli",
		nav: {
			generator: "Creatore di CV",
			templates: "Modelli",
			guides: "Guide",
			services: "Servizi e piani",
			about: "Chi siamo e contatti"
		}
	},
	{
		code: "ru",
		path: "/ru/cv-maker",
		lang: "ru",
		dir: "ltr",
		label: "Русский",
		landingOnlyNote: "Примечание: эта страница на русском, чтобы инструмент можно было найти в поиске. Сам инструмент работает на английском, хинди, японском, арабском, китайском, испанском и французском.",
		title: "Бесплатный конструктор резюме | FormZalo",
		description: "Создайте профессиональное резюме бесплатно с FormZalo. Создайте главный профиль, выберите шаблон и скачайте резюме в формате PDF или Word. Автозаполнение форм — платная функция.",
		h1: "Создать резюме бесплатно",
		lead: "FormZalo — бесплатный конструктор резюме. Создайте один главный профиль, выберите шаблон и скачайте резюме в виде файла PDF или Word — регистрация для начала не нужна.",
		stepsHeading: "Как это работает",
		steps: [
			{
				title: "Создайте главный профиль",
				text: "Введите данные один раз: образование, опыт, навыки и контакты."
			},
			{
				title: "Выберите шаблон",
				text: "Три профессиональных шаблона: современное двухколоночное резюме, классический консульский формат и простая страница, дружественная к ATS."
			},
			{
				title: "Скачайте резюме",
				text: "Бесплатно скачайте файл PDF или Word с водяным знаком. Скачивание без водяного знака стоит 20 рупий в Индии или 1 доллар."
			}
		],
		templatesHeading: "Три шаблона на выбор",
		templates: [
			{
				name: "International CV",
				text: "Современный двухколоночный макет."
			},
			{
				name: "Particulars",
				text: "Классический консульский формат."
			},
			{
				name: "Atlas résumé",
				text: "Простая страница, дружественная к ATS."
			}
		],
		plansHeading: "Создание бесплатно, платите только за скачивание без водяного знака",
		plans: "Создание, редактирование и сохранение резюме бесплатно и без входа в аккаунт. Скачивание с водяным знаком тоже бесплатно. Одно скачивание без водяного знака — или одна заполненная форма — стоит 20 рупий в Индии или 1 доллар. Годовые тарифы — на странице «Услуги».",
		filler: "Автозаполнение форм: используйте главный профиль, чтобы быстрее заполнять заявления о приёме на работу. Это платная функция — кредит используется только при успешном заполнении.",
		faqHeading: "Частые вопросы",
		faqs: [
			{
				q: "FormZalo действительно бесплатный?",
				a: "Да. Создание резюме бесплатно, как и скачивание с водяным знаком. Вы платите 20 рупий или 1 доллар только за скачивание без водяного знака или заполненную форму."
			},
			{
				q: "Нужен ли аккаунт?",
				a: "Нет. Вы можете создать резюме как гость. Для скачивания без водяного знака нужен аккаунт."
			},
			{
				q: "Какие языки поддерживаются?",
				a: "Инструмент работает на английском, хинди, японском, арабском, упрощённом китайском, испанском и французском; заголовки резюме доступны также на немецком. Эта страница на русском, чтобы помочь вам найти инструмент."
			}
		],
		ctaPrimary: "Создать резюме бесплатно",
		ctaSecondary: "Посмотреть шаблоны",
		nav: {
			generator: "Конструктор резюме",
			templates: "Шаблоны",
			guides: "Руководства",
			services: "Услуги и тарифы",
			about: "О нас и контакты"
		}
	}
];
var OG_LOCALE = {
	en: "en_IN",
	hi: "hi_IN",
	ja: "ja_JP",
	ar: "ar_SA",
	"zh-CN": "zh_CN",
	fr: "fr_FR",
	de: "de_DE",
	es: "es_ES",
	pt: "pt_PT",
	pl: "pl_PL",
	it: "it_IT",
	ru: "ru_RU"
};
/** Full head() payload for one landing page: unique title/desc, canonical, hreflang, OG, JSON-LD. */
function seoPageHead(p) {
	const url = `${SITE$1}${p.path}`;
	const alternates = SEO_PAGES.map((x) => ({
		rel: "alternate",
		hrefLang: x.lang,
		href: `${SITE$1}${x.path}`
	}));
	const jsonLd = [{
		"@context": "https://schema.org",
		"@type": "WebApplication",
		name: "FormZalo",
		url: `${SITE$1}/`,
		inLanguage: p.lang,
		applicationCategory: "BusinessApplication",
		operatingSystem: "Web",
		description: p.description,
		dateModified: "2026-11-10",
		offers: [
			{
				"@type": "Offer",
				name: "Free",
				price: "0",
				priceCurrency: "INR",
				url
			},
			{
				"@type": "Offer",
				name: "Single Use",
				price: "20",
				priceCurrency: "INR",
				url: `${SITE$1}/services`
			},
			{
				"@type": "Offer",
				name: "Global Single Use",
				price: "1",
				priceCurrency: "USD",
				url: `${SITE$1}/services`
			}
		]
	}, {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: p.faqs.map((f) => ({
			"@type": "Question",
			name: f.q,
			acceptedAnswer: {
				"@type": "Answer",
				text: f.a
			}
		}))
	}];
	return {
		meta: [
			{ title: p.title },
			{
				name: "description",
				content: p.description
			},
			{
				property: "og:title",
				content: p.title
			},
			{
				property: "og:description",
				content: p.description
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
				property: "og:url",
				content: url
			},
			{
				property: "og:image",
				content: `${SITE$1}/og.jpg`
			},
			{
				property: "og:locale",
				content: OG_LOCALE[p.lang] ?? "en_IN"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: p.title
			},
			{
				name: "twitter:description",
				content: p.description
			},
			{
				name: "twitter:image",
				content: `${SITE$1}/og.jpg`
			}
		],
		links: [
			{
				rel: "canonical",
				href: url
			},
			{
				rel: "alternate",
				hrefLang: "x-default",
				href: `${SITE$1}/cv-maker`
			},
			...alternates
		],
		scripts: jsonLd.map((j) => ({
			type: "application/ld+json",
			children: JSON.stringify(j)
		}))
	};
}
//#endregion
//#region ../repo/node_modules/.nitro/vite/services/ssr/assets/content-shell-Hg1P-umr.js
var import_jsx_runtime = require_jsx_runtime();
/** Shared header/nav for content pages (guides, templates, next steps). */
function ContentShell({ children, current }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-paper text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, { current }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto max-w-5xl px-4 py-10",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
function contentHead(title, desc, path) {
	const url = `https://formzalo.com${path}`;
	return { meta: [
		{ title: `${title} — FormZalo` },
		{
			name: "description",
			content: desc
		},
		{
			property: "og:title",
			content: `${title} — FormZalo`
		},
		{
			property: "og:description",
			content: desc
		},
		{
			property: "og:url",
			content: url
		}
	] };
}
//#endregion
//#region ../repo/node_modules/.nitro/vite/services/ssr/assets/guides-C8dXhzrj.js
var GUIDES = [
	{
		"slug": "cv-for-freshers",
		"title": "How to write a CV as a fresher",
		"desc": "A step-by-step guide to a one-page CV when you have little or no work experience.",
		"lead": "No job history yet? A clear one-page CV built around education, projects and skills still gets shortlisted.",
		"sections": [
			["Keep it to one page", ["Recruiters spend under a minute on a first screen. A fresher CV should fit on one A4 page.", "Use one clean template, one font and consistent dates. Fancy graphics rarely help."]],
			["Start with a short profile", ["Write two or three lines saying what you studied, what you are good at and the role you want.", "Example: \"Commerce graduate with Tally and Excel skills, looking for an accounts assistant role in Pune.\""]],
			["Put education and projects first", ["List your highest qualification first, with institution, year and marks or CGPA if they are good.", "Add college projects, internships, apprenticeships or volunteer work. Describe what you did and the result, in one line each."]],
			["Show real skills", ["Group skills into technical (Excel, Python, AutoCAD) and languages (English, Hindi, Marathi).", "Only list skills you can discuss in an interview. Interviewers often test one at random."]],
			["Final checks", ["Use a professional email address and a phone number you answer.", "Save as PDF unless the employer asks for Word, and name the file with your name, for example Priya-Sharma-CV.pdf."]]
		]
	},
	{
		"slug": "cv-vs-resume",
		"title": "CV vs resume: what is the difference?",
		"desc": "When to send a CV, when to send a resume, and how the two differ in India, the UK, the US and the Gulf.",
		"lead": "The words are often used as if they mean the same thing, but employers in different countries expect different documents.",
		"sections": [
			["The short answer", ["A resume is a short summary (usually one or two pages) tailored to one job.", "A CV (curriculum vitae) is a fuller record of your education, work, publications and achievements, and can be longer."]],
			["By country", [
				"India: \"CV\" and \"resume\" are used interchangeably. Most private employers expect one or two pages.",
				"UK, Ireland and much of Europe: \"CV\" means the short two-page document.",
				"US and Canada: \"resume\" is the normal job document; a CV is mostly for academic and research roles.",
				"Gulf countries: employers often expect personal details such as nationality, visa status and sometimes a photo."
			]],
			["Which one should you send?", ["Follow the job advertisement. If it says CV, send a CV; if it says resume, send a resume.", "For academic, research and medical posts, send the full CV with publications and training."]],
			["What stays the same", ["Both must be accurate, easy to scan and free of spelling mistakes.", "Never invent qualifications or experience. Background checks are common."]]
		]
	},
	{
		"slug": "government-job-forms",
		"title": "Filling government job application forms",
		"desc": "Practical tips for online recruitment forms: documents, details, fees and the final submission.",
		"lead": "Online recruitment forms are strict. One wrong date or a mismatched name can get an application rejected.",
		"sections": [
			["Read the notification first", ["Download the official notification and check eligibility, age limits, reservation rules and the last date.", "Note the exact document specifications for photo, signature and certificates before you start."]],
			["Keep your details consistent", ["Write your name exactly as it appears on your Class 10 certificate, and use the same spelling everywhere.", "Date of birth, father's or mother's name and category must match your certificates."]],
			["Prepare documents in advance", ["Scan your photo, signature and certificates in the required format and size.", "Keep caste, income, disability or domicile certificates ready if you claim any category benefit."]],
			["Before you submit", ["Use the preview to check every field. Many portals do not allow changes after final submission.", "Pay the fee only through the official portal, and save the payment receipt and application number."]],
			["After submission", ["Download and keep the final application PDF.", "Watch the official website for admit cards and results. Ignore unofficial messages asking for money."]]
		]
	},
	{
		"slug": "cover-letter",
		"title": "How to write a cover letter",
		"desc": "A simple structure for a short cover letter that hiring managers actually read.",
		"lead": "A good cover letter is short, specific to the job and explains why you fit.",
		"sections": [
			["Structure", [
				"Opening: the role you are applying for and where you saw it.",
				"Middle: two or three reasons you fit, each backed by a fact from your experience.",
				"Closing: thank the reader and say you are available for an interview."
			]],
			["Make it specific", ["Mention the company name and one thing you know about it.", "Match your examples to the requirements in the job advertisement."]],
			["Keep it short", ["Three or four short paragraphs, under one page.", "Do not repeat your whole CV. Pick the strongest points."]],
			["Common mistakes", ["Sending the same letter to every employer.", "Addressing the wrong company or person. Check names before you send."]]
		]
	},
	{
		"slug": "form-mistakes",
		"title": "Common mistakes in job application forms",
		"desc": "The errors that most often get online applications rejected, and how to avoid them.",
		"lead": "Most rejections at the form stage come from small, avoidable errors.",
		"sections": [
			["Mismatched details", ["Name spelling, date of birth or category that differs from your certificates.", "Different email addresses or phone numbers across forms, so you miss updates."]],
			["Wrong uploads", ["Photo or signature in the wrong size, format or background.", "Blurred or cropped certificate scans."]],
			["Missing information", ["Leaving optional fields blank when they are needed for your category or experience.", "Not adding all qualifications, or entering marks in the wrong format (percentage instead of CGPA)."]],
			["Rushing at the last date", ["Portals slow down near the deadline. Apply a few days early.", "Always save the confirmation page and payment receipt."]],
			["How CV Studio helps", ["The Auto Form Filler reuses your saved details, so the same spelling goes into every form.", "It never invents values. Anything missing is asked for and saved for next time."]]
		]
	},
	{
		"slug": "photo-signature-specs",
		"title": "Photo and signature specifications for online forms",
		"desc": "How to prepare a passport-style photo and signature that portals accept.",
		"lead": "Upload errors are one of the most common problems. These general rules work for most portals; always follow the exact notice.",
		"sections": [
			["Photo", [
				"Recent colour photo with a plain light background, face clearly visible, no cap or dark glasses.",
				"Use the format and size in the notice. Many Indian recruitment portals ask for a JPG of a few tens of kilobytes.",
				"Crop to the requested dimensions instead of stretching the image."
			]],
			["Signature", [
				"Sign with a black or blue pen on white paper, then scan or photograph it in good light.",
				"Crop tightly around the signature. Do not sign in capital letters if the notice forbids it.",
				"In CV Studio you can draw your signature or upload one; it is trimmed and saved as a PNG."
			]],
			["Checking file size", ["If the file is too large, reduce the dimensions or the JPG quality.", "If it is too small, the portal may reject it as unclear. Do not over-compress."]],
			["Before uploading", ["Open the file once to make sure it is the right image and not rotated.", "Keep copies in the exact required sizes in one folder for future applications."]]
		]
	},
	{
		"slug": "ats-friendly-cv",
		"title": "Making your CV ATS-friendly",
		"desc": "How applicant tracking systems read CVs and how to make sure yours is parsed correctly.",
		"lead": "Many companies run CVs through software before a person reads them. Simple formatting helps it read yours correctly.",
		"sections": [
			["Use a simple layout", ["Standard headings such as Experience, Education and Skills.", "Avoid putting key information in images, text boxes or headers."]],
			["Use the job's keywords", ["Read the job advertisement and use the same words for skills you genuinely have.", "Do not paste hidden keywords. Recruiters see them and reject the CV."]],
			["Choose the right file", ["A text-based PDF or a DOCX works with most systems. Scanned images do not.", "CV Studio PDF and DOCX exports are text-based."]],
			["Dates and titles", ["Write job titles and dates clearly and in the same format throughout.", "Explain gaps briefly if asked."]]
		]
	}
];
var guideBySlug = (slug) => GUIDES.find((g) => g.slug === slug);
//#endregion
//#region ../repo/node_modules/.nitro/vite/services/ssr/assets/model-C_zmnNIF.js
var COPY = {
	en: {
		profile: "Profile",
		experience: "Experience",
		education: "Education",
		skills: "Skills",
		languages: "Languages",
		certifications: "Certifications",
		contact: "Contact",
		particulars: "Personal particulars",
		born: "Date of birth",
		nationality: "Nationality",
		passport: "Passport",
		place: "Place of birth",
		declaration: "Review every line before you file this.",
		signature: "Signature",
		signPlace: "Place",
		signDate: "Date",
		more: "More details",
		preparedFor: "Prepared for"
	},
	fr: {
		profile: "Profil",
		experience: "Expérience",
		education: "Formation",
		skills: "Compétences",
		languages: "Langues",
		certifications: "Certificats",
		contact: "Contact",
		particulars: "État civil",
		born: "Date de naissance",
		nationality: "Nationalité",
		passport: "Passeport",
		place: "Lieu de naissance",
		declaration: "Relisez chaque ligne avant de déposer ce dossier.",
		signature: "Signature",
		signPlace: "Lieu",
		signDate: "Date",
		more: "Informations complémentaires",
		preparedFor: "Préparé pour"
	},
	de: {
		profile: "Profil",
		experience: "Berufserfahrung",
		education: "Ausbildung",
		skills: "Kenntnisse",
		languages: "Sprachen",
		certifications: "Zertifikate",
		contact: "Kontakt",
		particulars: "Persönliche Angaben",
		born: "Geburtsdatum",
		nationality: "Staatsangehörigkeit",
		passport: "Reisepass",
		place: "Geburtsort",
		declaration: "Prüfen Sie jede Zeile, bevor Sie das Formular einreichen.",
		signature: "Unterschrift",
		signPlace: "Ort",
		signDate: "Datum",
		more: "Weitere Angaben",
		preparedFor: "Erstellt für"
	},
	es: {
		profile: "Perfil",
		experience: "Experiencia",
		education: "Formación",
		skills: "Competencias",
		languages: "Idiomas",
		certifications: "Certificaciones",
		contact: "Contacto",
		particulars: "Datos personales",
		born: "Fecha de nacimiento",
		nationality: "Nacionalidad",
		passport: "Pasaporte",
		place: "Lugar de nacimiento",
		declaration: "Revise cada línea antes de presentar este formulario.",
		signature: "Firma",
		signPlace: "Lugar",
		signDate: "Fecha",
		more: "Más datos",
		preparedFor: "Preparado para"
	}
};
var TEMPLATES = [
	{
		id: "meridian",
		label: "International CV",
		hint: "International two-column curriculum vitae"
	},
	{
		id: "consulate",
		label: "Particulars",
		hint: "Consular-style personal particulars"
	},
	{
		id: "atlas",
		label: "Atlas résumé",
		hint: "Compact one-column résumé, no personal particulars"
	}
];
var COUNTRIES = [
	"Argentina",
	"Australia",
	"Austria",
	"Belgium",
	"Brazil",
	"Canada",
	"Chile",
	"China",
	"Colombia",
	"Croatia",
	"Czechia",
	"Denmark",
	"Egypt",
	"Finland",
	"France",
	"Germany",
	"Greece",
	"Hungary",
	"India",
	"Indonesia",
	"Ireland",
	"Israel",
	"Italy",
	"Japan",
	"Jordan",
	"Kenya",
	"Lebanon",
	"Malaysia",
	"Mexico",
	"Morocco",
	"Netherlands",
	"New Zealand",
	"Nigeria",
	"Norway",
	"Pakistan",
	"Peru",
	"Philippines",
	"Poland",
	"Portugal",
	"Romania",
	"Saudi Arabia",
	"Singapore",
	"South Africa",
	"South Korea",
	"Spain",
	"Sweden",
	"Switzerland",
	"Thailand",
	"Turkey",
	"Ukraine",
	"United Arab Emirates",
	"United Kingdom",
	"United States",
	"Vietnam"
];
var CALLING_CODES = [
	{
		code: "+1",
		label: "+1 United States / Canada"
	},
	{
		code: "+7",
		label: "+7 Russia / Kazakhstan"
	},
	{
		code: "+20",
		label: "+20 Egypt"
	},
	{
		code: "+27",
		label: "+27 South Africa"
	},
	{
		code: "+30",
		label: "+30 Greece"
	},
	{
		code: "+31",
		label: "+31 Netherlands"
	},
	{
		code: "+32",
		label: "+32 Belgium"
	},
	{
		code: "+33",
		label: "+33 France"
	},
	{
		code: "+34",
		label: "+34 Spain"
	},
	{
		code: "+39",
		label: "+39 Italy"
	},
	{
		code: "+41",
		label: "+41 Switzerland"
	},
	{
		code: "+43",
		label: "+43 Austria"
	},
	{
		code: "+44",
		label: "+44 United Kingdom"
	},
	{
		code: "+45",
		label: "+45 Denmark"
	},
	{
		code: "+46",
		label: "+46 Sweden"
	},
	{
		code: "+47",
		label: "+47 Norway"
	},
	{
		code: "+48",
		label: "+48 Poland"
	},
	{
		code: "+49",
		label: "+49 Germany"
	},
	{
		code: "+51",
		label: "+51 Peru"
	},
	{
		code: "+52",
		label: "+52 Mexico"
	},
	{
		code: "+54",
		label: "+54 Argentina"
	},
	{
		code: "+55",
		label: "+55 Brazil"
	},
	{
		code: "+56",
		label: "+56 Chile"
	},
	{
		code: "+57",
		label: "+57 Colombia"
	},
	{
		code: "+60",
		label: "+60 Malaysia"
	},
	{
		code: "+61",
		label: "+61 Australia"
	},
	{
		code: "+62",
		label: "+62 Indonesia"
	},
	{
		code: "+63",
		label: "+63 Philippines"
	},
	{
		code: "+64",
		label: "+64 New Zealand"
	},
	{
		code: "+65",
		label: "+65 Singapore"
	},
	{
		code: "+66",
		label: "+66 Thailand"
	},
	{
		code: "+81",
		label: "+81 Japan"
	},
	{
		code: "+82",
		label: "+82 South Korea"
	},
	{
		code: "+84",
		label: "+84 Vietnam"
	},
	{
		code: "+86",
		label: "+86 China"
	},
	{
		code: "+90",
		label: "+90 Turkey"
	},
	{
		code: "+91",
		label: "+91 India"
	},
	{
		code: "+92",
		label: "+92 Pakistan"
	},
	{
		code: "+212",
		label: "+212 Morocco"
	},
	{
		code: "+234",
		label: "+234 Nigeria"
	},
	{
		code: "+254",
		label: "+254 Kenya"
	},
	{
		code: "+351",
		label: "+351 Portugal"
	},
	{
		code: "+353",
		label: "+353 Ireland"
	},
	{
		code: "+358",
		label: "+358 Finland"
	},
	{
		code: "+380",
		label: "+380 Ukraine"
	},
	{
		code: "+420",
		label: "+420 Czechia"
	},
	{
		code: "+880",
		label: "+880 Bangladesh"
	},
	{
		code: "+961",
		label: "+961 Lebanon"
	},
	{
		code: "+962",
		label: "+962 Jordan"
	},
	{
		code: "+966",
		label: "+966 Saudi Arabia"
	},
	{
		code: "+971",
		label: "+971 United Arab Emirates"
	},
	{
		code: "+972",
		label: "+972 Israel"
	}
];
var MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec"
];
function uid() {
	return Math.random().toString(36).slice(2, 10);
}
function emptyPersonal() {
	return {
		givenName: "",
		familyName: "",
		headline: "",
		email: "",
		phoneCode: "+91",
		phone: "",
		street: "",
		postalCode: "",
		city: "",
		region: "",
		country: "",
		nationality: "",
		dateOfBirth: "",
		placeOfBirth: "",
		passportNumber: "",
		linkedin: "",
		website: "",
		summary: "",
		photo: "",
		fatherName: "",
		motherName: "",
		maritalStatus: "",
		spouseName: "",
		eyeColour: "",
		hairColour: "",
		merit: "",
		hobbies: "",
		sex: "",
		surnameAtBirth: "",
		nationalityAtBirth: "",
		otherNationalities: "",
		nationalId: "",
		positionApplied: "",
		passportType: "",
		passportIssuedOn: "",
		passportExpires: "",
		passportIssuedBy: "",
		passportIssuedCity: "",
		passportEndorsement: "",
		passportLost: "",
		oldPassport: "",
		drivingLicence: "",
		digitalSkills: "",
		projects: "",
		publications: "",
		volunteering: "",
		memberships: "",
		referencesNote: "",
		guardian: "",
		visaPurpose: "",
		destination: "",
		entryDate: "",
		exitDate: "",
		accommodation: "",
		sponsor: "",
		previousVisa: "",
		signature: "",
		signaturePlace: "",
		signatureDate: "",
		customDetails: []
	};
}
function emptyProfile() {
	return {
		personal: emptyPersonal(),
		experience: [],
		education: [],
		skills: [],
		languages: [],
		certifications: [],
		children: [],
		travel: []
	};
}
function defaultSettings() {
	return {
		template: "meridian",
		locale: "en",
		dateStyle: "dmy",
		nameOrder: "given-family",
		paper: "a4"
	};
}
function emptyExperience() {
	return {
		id: uid(),
		title: "",
		organization: "",
		location: "",
		start: "",
		end: "",
		current: false,
		summary: ""
	};
}
function emptyChild() {
	return {
		id: uid(),
		name: "",
		dateOfBirth: "",
		gender: ""
	};
}
function emptyTrip() {
	return {
		id: uid(),
		country: "",
		from: "",
		to: "",
		purpose: ""
	};
}
function lifeLines(profile, settings, mode) {
	const personal = profile.personal;
	const when = (value) => formatWhen(value, settings.dateStyle) || value;
	const cvRows = [
		["Position applied for", personal.positionApplied],
		["Digital skills", personal.digitalSkills],
		["Projects", personal.projects],
		["Publications", personal.publications],
		["Volunteering", personal.volunteering],
		["Memberships", personal.memberships],
		["Driving licence", personal.drivingLicence],
		["References", personal.referencesNote],
		["Merit", personal.merit],
		["Hobbies", personal.hobbies]
	];
	const rows = mode === "cv" ? cvRows : [
		["Sex", personal.sex],
		["Surname at birth", personal.surnameAtBirth],
		["Nationality at birth", personal.nationalityAtBirth],
		["Other nationalities", personal.otherNationalities],
		["National ID", personal.nationalId],
		["Marital status", personal.maritalStatus],
		["Father", personal.fatherName],
		["Mother", personal.motherName],
		["Spouse", personal.spouseName],
		["Guardian", personal.guardian],
		["Eye colour", personal.eyeColour],
		["Hair colour", personal.hairColour],
		["Passport type", personal.passportType],
		["Passport number", personal.passportNumber],
		["Old passport", personal.oldPassport],
		["Passport issued", when(personal.passportIssuedOn)],
		["Passport expires", when(personal.passportExpires)],
		["Issued by", [personal.passportIssuedBy, personal.passportIssuedCity].filter(Boolean).join(", ")],
		["Endorsement", personal.passportEndorsement],
		["Passport lost or stolen", personal.passportLost],
		["Purpose of travel", personal.visaPurpose],
		["Destination", personal.destination],
		["Entry", when(personal.entryDate)],
		["Exit", when(personal.exitDate)],
		["Accommodation", personal.accommodation],
		["Costs paid by", personal.sponsor],
		["Previous visa", personal.previousVisa],
		...cvRows
	];
	if (mode === "full") {
		for (const child of profile.children) {
			const value = [
				child.name,
				child.gender,
				formatWhen(child.dateOfBirth, settings.dateStyle)
			].filter(Boolean).join(" · ");
			if (value) rows.push(["Child", value]);
		}
		for (const trip of profile.travel) {
			const value = [
				trip.country,
				[trip.from, trip.to].filter(Boolean).join(" – "),
				trip.purpose
			].filter(Boolean).join(" · ");
			if (value) rows.push(["Past travel", value]);
		}
	}
	for (const item of cleanCustomDetails(personal.customDetails)) rows.push([item.label, item.value]);
	return rows.filter(([, value]) => value.trim());
}
/** Untrusted-safe view of custom details: only rows with a label and a value. */
function cleanCustomDetails(raw) {
	if (!Array.isArray(raw)) return [];
	return raw.flatMap((item) => {
		if (!item || typeof item !== "object") return [];
		const { id, label, value } = item;
		if (typeof label !== "string" || typeof value !== "string") return [];
		if (!label.trim() || !value.trim()) return [];
		return [{
			id: typeof id === "string" ? id : uid(),
			label: label.trim().slice(0, 120),
			value: value.trim().slice(0, 2e3)
		}];
	});
}
function emptyEducation() {
	return {
		id: uid(),
		institution: "",
		qualification: "",
		field: "",
		location: "",
		start: "",
		end: "",
		details: ""
	};
}
function splitDisplayName(full, order) {
	const parts = full.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) return {
		givenName: "",
		familyName: ""
	};
	if (parts.length === 1) return order === "family-given" ? {
		givenName: "",
		familyName: parts[0] ?? ""
	} : {
		givenName: parts[0] ?? "",
		familyName: ""
	};
	if (order === "family-given") return {
		familyName: parts[0] ?? "",
		givenName: parts.slice(1).join(" ")
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
function displayName(personal, order) {
	const given = personal.givenName.trim();
	const family = personal.familyName.trim();
	return (order === "family-given" ? [family, given] : [given, family]).filter(Boolean).join(" ");
}
/** "Prepared for Acme" when the target-company layer is on, else "". */
function preparedLine(personal, locale) {
	const company = (personal.preparedFor ?? "").trim();
	return company ? `${COPY[locale].preparedFor} ${company}` : "";
}
/** Contact line for the document header. A bare calling code with no
*  number used to render as an orphaned "+91" in an empty preview
*  (front-look QA, 2026-11-09); hide the code until a number exists. */
function phoneLine(personal) {
	if (!personal.phone.trim()) return "";
	return [personal.phoneCode, personal.phone].filter(Boolean).join(" ").trim();
}
function placeLine(personal) {
	return [personal.city, personal.country].filter(Boolean).join(", ");
}
function addressLines(personal) {
	return [[personal.street, personal.postalCode].filter(Boolean).join(", "), [
		personal.city,
		personal.region,
		personal.country
	].filter(Boolean).join(", ")].filter(Boolean);
}
function presentLabel(locale) {
	if (locale === "fr") return "Aujourd'hui";
	if (locale === "de") return "Heute";
	if (locale === "es") return "Actualidad";
	return "Present";
}
function formatWhen(value, style) {
	const raw = value.trim();
	if (!raw) return "";
	const full = /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw);
	const month = /^(\d{4})-(\d{2})$/.exec(raw);
	const year = /^(\d{4})$/.exec(raw);
	if (year) return year[1];
	const y = full?.[1] ?? month?.[1];
	const m = full?.[2] ?? month?.[2];
	if (!y || !m) return raw;
	const label = MONTHS[Number(m) - 1];
	if (!label) return raw;
	if (style === "iso") return full ? `${y}-${m}-${full[3]}` : `${y}-${m}`;
	if (full) {
		const d = Number(full[3]);
		if (style === "mdy") return `${label} ${d}, ${y}`;
		return `${d} ${label} ${y}`;
	}
	return `${label} ${y}`;
}
function formatSpan(start, end, current, settings) {
	const a = formatWhen(start, settings.dateStyle);
	const b = current ? presentLabel(settings.locale) : formatWhen(end, settings.dateStyle);
	if (a && b) return `${a} – ${b}`;
	return a || b;
}
function degreeLine(item) {
	return [item.qualification, item.field].filter(Boolean).join(" ");
}
function dossierCode(profile) {
	const seed = `${profile.personal.familyName}|${profile.personal.dateOfBirth}|${profile.personal.givenName}`;
	let hash = 0;
	for (const char of seed) hash = hash * 33 + char.charCodeAt(0) >>> 0;
	return `M-${hash % 9e5 + 1e5}`;
}
function fileBase(profile, settings) {
	const name = displayName(profile.personal, settings.nameOrder).replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "");
	const kind = settings.template === "consulate" ? "particulars" : settings.template === "atlas" ? "resume" : "cv";
	const target = (profile.personal.preparedFor ?? "").replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "");
	return `${name || "CV-Studio"}-${kind}${target ? `-for-${target}` : ""}`;
}
function summaryLines(summary) {
	return summary.split(/\n+/).map((line) => line.replace(/^([•·*\-–]|\d+[.)])\s+/, "").trim()).filter(Boolean);
}
var sampleProfile = () => ({
	personal: {
		givenName: "Amira",
		familyName: "El-Sayed",
		headline: "Climate policy advisor",
		email: "amira.elsayed@example.com",
		phoneCode: "+41",
		phone: "22 555 0148",
		street: "14 Rue de la Servette",
		postalCode: "1201",
		city: "Geneva",
		region: "Geneva",
		country: "Switzerland",
		nationality: "Egyptian",
		dateOfBirth: "1991-04-17",
		placeOfBirth: "Cairo, Egypt",
		passportNumber: "X0000000",
		linkedin: "linkedin.com/in/amira-elsayed",
		website: "amira.example.org",
		summary: "Advisor helping cities finance resilient power grids. Twelve years across Cairo, Nairobi, and Geneva, working in Arabic, English, and French.",
		photo: "",
		fatherName: "Hassan El-Sayed",
		motherName: "Nadia El-Sayed",
		maritalStatus: "Married",
		spouseName: "Yusuf El-Sayed",
		eyeColour: "Brown",
		hairColour: "Black",
		merit: "Distinction, MSc Environmental Policy",
		hobbies: "City walking, Arabic calligraphy",
		sex: "",
		surnameAtBirth: "",
		nationalityAtBirth: "",
		otherNationalities: "",
		nationalId: "",
		positionApplied: "",
		passportType: "",
		passportIssuedOn: "",
		passportExpires: "",
		passportIssuedBy: "",
		passportIssuedCity: "",
		passportEndorsement: "",
		passportLost: "",
		oldPassport: "",
		drivingLicence: "",
		digitalSkills: "",
		projects: "",
		publications: "",
		volunteering: "",
		memberships: "",
		referencesNote: "",
		guardian: "",
		visaPurpose: "",
		destination: "",
		entryDate: "",
		exitDate: "",
		accommodation: "",
		sponsor: "",
		previousVisa: "",
		signature: "",
		signaturePlace: "",
		signatureDate: "",
		customDetails: []
	},
	experience: [{
		id: "exp-helios",
		title: "Senior Policy Advisor",
		organization: "Helios Compact",
		location: "Geneva, Switzerland",
		start: "2021-03",
		end: "",
		current: true,
		summary: "Structured a $240m municipal guarantee for distributed solar.\nNegotiated offtake language now used by six city utilities."
	}, {
		id: "exp-nile",
		title: "Programme Lead",
		organization: "Nile Grid Cooperative",
		location: "Cairo, Egypt",
		start: "2016-06",
		end: "2021-02",
		current: false,
		summary: "Built a bilingual tariff clinic serving 14,000 households.\nPublished the cooperative's first open loss-audit."
	}],
	education: [{
		id: "ed-gi",
		institution: "Graduate Institute",
		qualification: "MSc",
		field: "Environmental Policy",
		location: "Geneva, Switzerland",
		start: "2014",
		end: "2016",
		details: "Thesis on cross-border power pools."
	}, {
		id: "ed-cu",
		institution: "Cairo University",
		qualification: "BSc",
		field: "Electrical Engineering",
		location: "Cairo, Egypt",
		start: "2009",
		end: "2013",
		details: ""
	}],
	skills: [
		"Power markets",
		"Climate finance",
		"Tariff design",
		"Stakeholder mapping",
		"Arabic–French negotiation"
	],
	languages: [
		{
			id: "lang-ar",
			name: "Arabic",
			level: "Native"
		},
		{
			id: "lang-en",
			name: "English",
			level: "C2"
		},
		{
			id: "lang-fr",
			name: "French",
			level: "C1"
		},
		{
			id: "lang-de",
			name: "German",
			level: "B1"
		}
	],
	certifications: [{
		id: "cert-esg",
		name: "CFA ESG Certificate",
		issuer: "CFA Institute",
		year: "2022"
	}],
	children: [{
		id: "child-leila",
		name: "Leila El-Sayed",
		dateOfBirth: "2018-06-02",
		gender: "Daughter"
	}],
	travel: [{
		id: "trip-ke",
		country: "Kenya",
		from: "2019",
		to: "2019",
		purpose: "Work"
	}]
});
var SAMPLE_CV = `AMIRA EL-SAYED
Climate Policy Advisor
Geneva, Switzerland · amira.elsayed@example.com · +41 22 555 0148
linkedin.com/in/amira-elsayed · amira.example.org

SUMMARY
Advisor helping cities finance resilient power grids. Twelve years across Cairo, Nairobi, and Geneva.

EXPERIENCE
Senior Policy Advisor — Helios Compact
Geneva, Switzerland
Mar 2021 – Present
- Structured a $240m municipal guarantee for distributed solar.
- Negotiated offtake language used by six city utilities.

Programme Lead — Nile Grid Cooperative
Cairo, Egypt
Jun 2016 – Feb 2021
- Built a bilingual tariff clinic serving 14,000 households.
- Published the cooperative's first open loss-audit.

EDUCATION
MSc Environmental Policy — Graduate Institute
Geneva, Switzerland
2014 – 2016
Thesis on cross-border power pools.

BSc Electrical Engineering — Cairo University
Cairo, Egypt
2009 – 2013

SKILLS
Power markets, Climate finance, Arabic–French negotiation, Stakeholder mapping, Tariff design

LANGUAGES
Arabic — Native
English — C2
French — C1
German — B1

CERTIFICATIONS
CFA ESG Certificate — CFA Institute — 2022
`;
var SAMPLE_FORM = `Given name: Amira
Family name: El-Sayed
Headline: Climate policy advisor
Email: amira.elsayed@example.com
Phone: +41 22 555 0148
Street: 14 Rue de la Servette
Postal code: 1201
City: Geneva
Region: Geneva
Country: Switzerland
Nationality: Egyptian
Date of birth: 1991-04-17
Place of birth: Cairo, Egypt
Passport: X0000000
LinkedIn: linkedin.com/in/amira-elsayed
Website: amira.example.org
Summary: Advisor helping cities finance resilient power grids.
`;
//#endregion
//#region ../repo/node_modules/.nitro/vite/services/ssr/assets/router-BXvCCxej.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
/**
* Stale-chunk recovery (front-look fix #1).
*
* After a deploy, a browser holding a cached HTML page can reference a
* chunk hash the server no longer serves (hashed assets are immutable and
* old builds are replaced). The dynamic import then fails with
* "Failed to fetch dynamically imported module: .../assets/routes-*.js"
* even though the file itself returns 200 for the current build — the
* failure is the stale HTML, not a missing file. The fix is layered:
*   1. HTML is served `no-cache` (server/middleware/rate-limit.ts), so a
*      stale page is revalidated instead of reused across deploys.
*   2. When a chunk import does fail, the error screen retries ONCE with a
*      cache-busting query (?_r=1, which the QA browser proved loads),
*      then falls back to a manual Retry button — never a dead screen.
*/
var CHUNK_RETRY_KEY = "formzalo.chunk-retry.v1";
function isChunkLoadError(error) {
	const msg = error instanceof Error ? error.message : typeof error === "string" ? error : "";
	return /dynamically imported module|Failed to fetch.*\.js|ChunkLoadError|Loading chunk .* failed/i.test(msg);
}
/** True when we have not already auto-retried once in this session. */
function shouldAutoRetry(storage) {
	try {
		if (storage.getItem("formzalo.chunk-retry.v1")) return false;
		storage.setItem(CHUNK_RETRY_KEY, "1");
		return true;
	} catch {
		return false;
	}
}
/** URL to reload to after a chunk failure: same page with a cache-buster. */
function chunkRetryUrl(href) {
	const url = new URL(href);
	url.searchParams.set("_r", "1");
	return url.toString();
}
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
/**
* App error screen. A failed dynamic import (stale HTML after a deploy
* referencing a superseded chunk hash) used to be a dead end: no retry
* button, and the router never retried. Now it retries ONCE automatically
* with a cache-busting query, and always offers a working Retry button
* plus a link back to the FormZalo home page.
*/
function AppErrorComponent({ error }) {
	const chunkError = isChunkLoadError(error);
	(0, import_react.useEffect)(() => {
		if (!chunkError || typeof window === "undefined") return;
		try {
			if (shouldAutoRetry(window.sessionStorage)) window.location.href = chunkRetryUrl(window.location.href);
		} catch {}
	}, [chunkError]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			}),
			chunkError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm text-zinc-500 dark:text-zinc-400",
				children: "This can happen right after an update, when this page was loaded before the new version. Reloading usually fixes it."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap items-center justify-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"data-testid": "error-retry",
					className: "h-11 rounded-full bg-zinc-900 px-5 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900",
					onClick: () => window.location.reload(),
					children: "Try again"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/",
					className: "h-11 content-center rounded-full border border-zinc-300 px-5 text-sm font-medium",
					children: "Go to the FormZalo home page"
				})]
			})
		]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-BStSLZbC.css";
/**
* Advertising configuration. EVERYTHING HERE IS OFF BY DEFAULT.
* - Replace ADSENSE_PUB_ID with the real "ca-pub-…" id only after AdSense approval,
*   then set ADS.enabled = true (see research/ADSENSE_APPLICATION.md).
* - The AdSense <script> is added to <head> only when ADS.enabled is true.
* - public/ads.txt must be updated with the same publisher id.
*/
var ADSENSE_PUB_ID = "ca-pub-XXXXXXXXXXXXXXXX";
var ADS = {
	enabled: false,
	/** Ad unit ids from AdSense → Ads → By ad unit. Placeholders until approved. */
	slots: {
		landing: "0000000001",
		guides: "0000000002",
		gallery: "0000000003",
		dashboard: "0000000004",
		belowPreview: "0000000005",
		/**
		* Download gate (2 ads shown before the free watermarked preview download).
		* TODO — paste the REAL ad-unit ids here from THOR's AdSense account
		* (AdSense → Ads → By ad unit) AFTER the site is approved. Leave them
		* empty until then: an empty slot keeps the gate inactive, so the free
		* download keeps working exactly as today. NEVER invent an id.
		* AdSense review was requested 2026-11-08; the site is under review,
		* not approved yet (see findings/13-ads-gating.md).
		*/
		downloadGate1: "",
		downloadGate2: ""
	}
};
/**
* Opt-in "watch a short ad to download free" (Google Ad Manager rewarded web ad).
* OFF by default. Needs a GAM network code AND the AD_UNLOCK_SECRET server env var
* (the server refuses to issue tokens without it). The paid ₹20 option is always shown.
*/
var WATCH_AD_UNLOCK = {
	enabled: false,
	gamAdUnitPath: "/NETWORK_CODE/cvstudio_rewarded",
	/** Free unlocks per guest (and per IP) per day. */
	dailyCap: 1,
	/** Token lifetime. */
	ttlMs: 6e5
};
/**
* Routes where an ad slot may render. Anything else (editor, form filler, pricing,
* paywall, checkout, auth, errors, post-download) never shows ads.
* Note: "/" is the landing page; the slot there sits in the guides section below the tool.
*/
var AD_ROUTES = [
	{
		prefix: "/guides",
		placements: ["guides"]
	},
	{
		prefix: "/templates",
		placements: ["gallery"]
	},
	{
		prefix: "/dashboard",
		placements: ["dashboard"]
	}
];
function adAllowed(pathname, placement) {
	const path = pathname.replace(/\/+$/, "") || "/";
	if (path === "/") return placement === "landing" || placement === "belowPreview" || placement === "downloadGate1" || placement === "downloadGate2";
	return AD_ROUTES.some((r) => (path === r.prefix || path.startsWith(`${r.prefix}/`)) && r.placements.includes(placement));
}
/**
* Is the 2-ads-before-download gate live? All three must hold: ads switched on,
* BOTH gate slots filled with real AdSense unit ids, and the AdSense publisher id
* replaced with the real one. Anything less → the gate stays inactive and the free
* watermarked download works exactly as it does today (no behaviour change while
* AdSense is still under review).
*/
function downloadGateActive() {
	return ADS.enabled && ADS.slots.downloadGate1 !== "" && ADS.slots.downloadGate2 !== "" && false;
}
function adsenseScriptSrc(pub = ADSENSE_PUB_ID) {
	return `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pub}`;
}
var SITE_ORIGIN = "https://formzalo.com";
var LOCALE_SEO = {
	en: {
		hreflang: "en-IN",
		ogLocale: "en_IN",
		title: "Free CV Maker India & Resume for Freshers | FormZalo",
		description: "Free CV maker for India: build a resume for freshers in Indian format — no login needed — and download PDF or Word. Reuse your details to fill job, affidavit and vakalatnama forms (form filling, not legal drafting).",
		h1: "Free CV maker for India, resume for freshers and online form filling"
	},
	"en-GB": {
		hreflang: "en-GB",
		ogLocale: "en_GB",
		title: "Free CV Builder UK, CV Template & Form Filler | FormZalo",
		description: "Free CV builder for the UK: pick a CV template, fill in your details and download a PDF or Word CV. Reuse the same details to fill online forms. No login needed to build your CV.",
		h1: "Free CV builder and online form filler"
	},
	hi: {
		hreflang: "hi-IN",
		ogLocale: "hi_IN",
		title: "फ्री बायोडाटा और रिज्यूम कैसे बनाएं | FormZalo",
		description: "बायोडाटा और रिज्यूम फॉर्मेट में मुफ़्त CV बनाएं और PDF या Word में डाउनलोड करें। वही जानकारी नौकरी और शपथ पत्र जैसे फॉर्म भरने में दोबारा इस्तेमाल करें (फॉर्म भरना, कानूनी ड्राफ्टिंग नहीं)।",
		h1: "मुफ़्त बायोडाटा / रिज्यूम मेकर और ऑनलाइन फॉर्म भरना"
	},
	ar: {
		hreflang: "ar-SA",
		ogLocale: "ar_SA",
		title: "إنشاء سيرة ذاتية مجانية وتعبئة النماذج | FormZalo",
		description: "أنشئ سيرة ذاتية مجانية من نموذج سيرة ذاتية جاهز للتعبئة، وحمّلها بصيغة PDF أو Word. استخدم بياناتك نفسها لتعبئة نموذج الوظيفة والنماذج الأخرى.",
		h1: "إنشاء سيرة ذاتية مجانية وتعبئة النماذج أونلاين"
	},
	"es-ES": {
		hreflang: "es-ES",
		ogLocale: "es_ES",
		title: "Hacer currículum gratis y rellenar formularios | FormZalo",
		description: "Haz tu currículum gratis online con una plantilla de currículum y descárgalo en PDF o Word. Reutiliza tus datos para rellenar formularios en línea.",
		h1: "Hacer currículum gratis y rellenar formularios online"
	},
	"fr-FR": {
		hreflang: "fr-FR",
		ogLocale: "fr_FR",
		title: "Créer un CV gratuit en ligne et remplir un formulaire | FormZalo",
		description: "Créez un CV gratuit en ligne à partir d'un modèle de CV et téléchargez-le en PDF ou Word. Réutilisez vos informations pour remplir un formulaire en ligne.",
		h1: "Créer un CV gratuit et remplir vos formulaires en ligne"
	},
	ja: {
		hreflang: "ja",
		ogLocale: "ja_JP",
		title: "無料の履歴書（CV）作成とフォーム入力 | FormZalo",
		description: "無料でCVを作成し、PDFまたはWordでダウンロード。同じ情報をオンラインフォームの入力に再利用できます。",
		h1: "無料のCV作成とオンラインフォーム入力"
	},
	"zh-CN": {
		hreflang: "zh-CN",
		ogLocale: "zh_CN",
		title: "免费简历（CV）制作与表格填写 | FormZalo",
		description: "免费制作简历并下载 PDF 或 Word。可重复使用同一资料填写在线表格。",
		h1: "免费简历制作与在线表格填写"
	}
};
/** Locales advertised with hreflang (the researched markets) + x-default. */
var HREFLANG_LANGS = [
	"en",
	"en-GB",
	"ar",
	"es-ES",
	"fr-FR",
	"hi",
	"ja",
	"zh-CN"
];
function langFromSearch(search) {
	const raw = search && typeof search === "object" ? search.lang : void 0;
	return typeof raw === "string" && matchLang([raw]) || "en";
}
function localeUrl(path, lang) {
	const p = path.startsWith("/") ? path : `/${path}`;
	return lang === "en" ? `${SITE_ORIGIN}${p}` : `${SITE_ORIGIN}${p}?lang=${encodeURIComponent(lang)}`;
}
function hreflangLinks(path) {
	return [...HREFLANG_LANGS.map((l) => ({
		rel: "alternate",
		hrefLang: LOCALE_SEO[l].hreflang,
		href: localeUrl(path, l)
	})), {
		rel: "alternate",
		hrefLang: "x-default",
		href: localeUrl(path, "en")
	}];
}
var SITE = SITE_ORIGIN;
/** WebApplication JSON-LD (one brand: FormZalo). dateModified added 2026-11-10 (IsVisible flag). */
var webAppLd = (DESCRIPTION, url, inLanguage) => ({
	"@context": "https://schema.org",
	"@type": "WebApplication",
	name: "FormZalo",
	url,
	applicationCategory: "BusinessApplication",
	operatingSystem: "Any (web browser)",
	description: DESCRIPTION,
	inLanguage,
	availableLanguage: [
		"en-IN",
		"en-GB",
		"hi-IN",
		"ar-SA",
		"es-ES",
		"fr-FR",
		"ja",
		"zh-CN"
	],
	dateModified: "2026-11-10",
	offers: {
		"@type": "Offer",
		price: "0",
		priceCurrency: "INR"
	},
	publisher: {
		"@type": "Organization",
		name: "FormZalo",
		url: `${SITE}/`
	}
});
var ORG_LD = {
	"@context": "https://schema.org",
	"@type": "Organization",
	name: "FormZalo",
	url: `${SITE}/`,
	logo: `${SITE}/favicon.svg`
};
/** Loads the saved UI language and remounts the page tree when it changes, so every string re-translates. */
function LangRoot() {
	const lang = useLang((s) => s.lang);
	const load = useLang((s) => s.load);
	(0, import_react.useEffect)(() => {
		load();
		document.documentElement.dataset.hydrated = "true";
	}, [load]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }, lang);
}
/**
* Document language, derived server-side from the URL so crawlers and screen
* readers see the real language (previously hardcoded lang="en"):
* locale-prefixed landing paths (/hi/cv-maker, /pt/cv-maker, …) win, then ?lang=.
*/
function docLang(pathname, search) {
	const fromPath = prefixDocLang(pathname);
	if (fromPath) return fromPath;
	const q = new URLSearchParams(search).get("lang") ?? "";
	const fromQuery = q ? matchLang([q]) : null;
	if (fromQuery) return {
		lang: fromQuery === "zh-CN" ? "zh-CN" : fromQuery.split("-")[0],
		dir: fromQuery === "ar" ? "rtl" : "ltr"
	};
	return {
		lang: "en",
		dir: "ltr"
	};
}
function Root() {
	const { lang, dir } = docLang(useRouterState({ select: (s) => s.location.pathname }), useRouterState({ select: (s) => s.location.searchStr }));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang,
		dir,
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: LANG_BOOT } }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: `setTimeout(function(){try{if(document.documentElement.dataset.hydrated==="true")return;var b=document.createElement("div");b.setAttribute("role","alert");b.style.cssText="position:fixed;inset:0 0 auto 0;z-index:9999;background:#7f1d1d;color:#fff;padding:12px 16px;font:14px system-ui,sans-serif;text-align:center";b.innerHTML="FormZalo did not finish loading. <button type=\\"button\\" onclick=\\"location.reload()\\" style=\\"margin-left:8px;padding:6px 14px;border-radius:999px;border:0;background:#fff;color:#7f1d1d;font-weight:600;cursor:pointer\\">Reload the page</button>";document.body.appendChild(b);}catch(e){}},8000);` } })
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("noscript", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"FormZalo: free CV builder (no login), plain and designed templates, PDF/DOCX download, free watermarked download and an Auto Form Filler for job applications. Single Use ₹20/$1, Career Starter ₹1,000/year, Global Pro $29/year. Support: team@formzalo.com (reviewed within 2 working days).",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/services",
					children: "Services & Plans"
				}),
				" · ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/refund-policy",
					children: "Refund Policy"
				})
			] }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangRoot, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				theme: "light",
				position: "top-center",
				toastOptions: { style: {
					background: "var(--color-sheet)",
					color: "var(--color-ink)",
					border: "1px solid var(--color-line)",
					fontFamily: "var(--font-sans)"
				} }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
/** Localised SEO landing pages own their canonical + hreflang (seoPageHead, 12 languages). */
var LANDING_RE = /^\/(hi|ja|ar|zh-cn|fr|de|es|pt|pl|it|ru)\/cv-maker$/;
/** No canonical/hreflang: tokenised share URLs, the gated dashboard, the noindex privacy notice. */
var NO_SEO_LINKS = (path) => path === "/dashboard" || path === "/privacy" || path.startsWith("/c/");
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
				...[],
				{
					name: "google-adsense-account",
					content: "ca-pub-5439325240008654"
				},
				{
					name: "msvalidate.01",
					content: "8D212A4216CC1E3C06C3716B84A80955"
				}
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
				...[{
					src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5439325240008654",
					async: true,
					crossOrigin: "anonymous"
				}]
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
		}
		return Math.max(1, Math.ceil((1 - b.tokens) / rate / 1e3));
	}
	sweep(now = Date.now(), force = false) {
		for (const [k, b] of this.buckets) if (now - b.last > 12e4) this.buckets.delete(k);
		if (force && this.buckets.size >= this.maxKeys) this.buckets.clear();
	}
	get size() {
		return this.buckets.size;
	}
};
new TokenBucketLimiter();
/** Concurrency guard: at most `max` running, up to `queueMax` waiting `waitMs`. */
var Semaphore = class {
	active = 0;
	waiters = [];
	max;
	queueMax;
	waitMs;
	constructor(max, queueMax = 10, waitMs = 8e3) {
		this.max = max;
		this.queueMax = queueMax;
		this.waitMs = waitMs;
	}
	async run(fn) {
		if (this.active >= this.max) {
			if (this.waiters.length >= this.queueMax) return null;
			if (!await new Promise((resolve) => {
				const w = () => {
					clearTimeout(t);
					resolve(true);
				};
				const t = setTimeout(() => {
					this.waiters = this.waiters.filter((x) => x !== w);
					resolve(false);
				}, this.waitMs);
				this.waiters.push(w);
			})) return null;
		} else this.active++;
		try {
			return await fn();
		} finally {
			const next = this.waiters.shift();
			if (next) next();
			else this.active--;
		}
	}
	get running() {
		return this.active;
	}
};
var exportGuard = new Semaphore(3);
function busyResponse() {
	return new Response(JSON.stringify({
		error: "busy",
		retryAfter: 5
	}), {
		status: 503,
		headers: {
			"content-type": "application/json",
			"retry-after": "5",
			"cache-control": "no-store"
		}
	});
}
var SIGNATURE_TYPES = ["image/png", "image/jpeg"];
function checkSignatureFile(file) {
	if (!SIGNATURE_TYPES.includes(file.type)) return {
		ok: false,
		reason: "type"
	};
	if (file.size > 1e6) return {
		ok: false,
		reason: "size"
	};
	return { ok: true };
}
/** Only PNG data URLs within the size cap are stored or rendered. */
function isSignatureDataUrl(value) {
	return typeof value === "string" && value.startsWith("data:image/png;base64,") && value.length <= 4e5;
}
/** Patch to store a signature on the guest's profile; invalid input clears nothing and returns null. */
function signaturePatch(dataUrl) {
	return isSignatureDataUrl(dataUrl) ? { signature: dataUrl } : null;
}
function clearSignaturePatch() {
	return { signature: "" };
}
function today() {
	return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
/** What the CV output shows on the signature line, or null when there is no signature. */
function signatureLine(personal, settings, now = today()) {
	if (!isSignatureDataUrl(personal.signature)) return null;
	const copy = COPY[settings.locale];
	const place = (personal.signaturePlace || personal.city || "").trim();
	const date = formatWhen(personal.signatureDate || now, settings.dateStyle);
	return {
		image: personal.signature,
		place,
		date,
		text: [place, date].filter(Boolean).join(", "),
		label: copy.signature
	};
}
/** Templates that carry a signature line (Atlas is a compact résumé without one). */
function templateSigns(settings) {
	return settings.template !== "atlas";
}
/**
* Browser only: trim near-white / transparent margins and re-encode as PNG with a transparent
* background (white pixels become transparent so the ink sits on any paper).
*/
function trimToPng(canvas) {
	const ctx = canvas.getContext("2d");
	if (!ctx) return canvas.toDataURL("image/png");
	const { width, height } = canvas;
	const img = ctx.getImageData(0, 0, width, height);
	const d = img.data;
	let minX = width, minY = height, maxX = -1, maxY = -1;
	for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
		const i = (y * width + x) * 4;
		if (d[i] > 235 && d[i + 1] > 235 && d[i + 2] > 235) d[i + 3] = 0;
		if (d[i + 3] > 16) {
			if (x < minX) minX = x;
			if (y < minY) minY = y;
			if (x > maxX) maxX = x;
			if (y > maxY) maxY = y;
		}
	}
	if (maxX < 0) return "";
	ctx.putImageData(img, 0, 0);
	const pad = 6;
	const sx = Math.max(0, minX - pad), sy = Math.max(0, minY - pad);
	const w = Math.min(width, maxX + pad) - sx, h = Math.min(height, maxY + pad) - sy;
	const out = document.createElement("canvas");
	const scale = Math.min(1, 600 / w, 200 / h);
	out.width = Math.max(1, Math.round(w * scale));
	out.height = Math.max(1, Math.round(h * scale));
	out.getContext("2d")?.drawImage(canvas, sx, sy, w, h, 0, 0, out.width, out.height);
	return out.toDataURL("image/png");
}
var INK$1 = "1C1915";
var FOREST$1 = "1B4D3E";
var MUTED$1 = "5C554C";
function run(text, opts = {}) {
	return new TextRun({
		text,
		bold: opts.bold,
		italics: opts.italics,
		size: opts.size ?? 22,
		color: opts.color ?? INK$1,
		font: opts.font ?? "Georgia"
	});
}
function photoBlock(dataUrl) {
	if (!dataUrl.startsWith("data:image/")) return null;
	const base64 = dataUrl.split(",")[1];
	if (!base64) return null;
	const bytes = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
	return new Paragraph({
		alignment: AlignmentType.RIGHT,
		spacing: { after: 120 },
		children: [new ImageRun({
			type: "jpg",
			data: bytes,
			transformation: {
				width: 84,
				height: 104
			}
		})]
	});
}
function signatureBlocks(profile, settings) {
	const line = templateSigns(settings) ? signatureLine(profile.personal, settings) : null;
	if (!line) return [];
	const bytes = Uint8Array.from(atob(line.image.split(",")[1] ?? ""), (char) => char.charCodeAt(0));
	return [new Paragraph({
		alignment: AlignmentType.RIGHT,
		spacing: { before: 360 },
		children: [new ImageRun({
			type: "png",
			data: bytes,
			transformation: {
				width: 160,
				height: 54
			}
		})]
	}), new Paragraph({
		alignment: AlignmentType.RIGHT,
		border: { top: {
			style: BorderStyle.SINGLE,
			size: 6,
			color: INK$1,
			space: 2
		} },
		children: [run(`${line.text ? `${line.text} · ` : ""}${line.label}`, {
			size: 18,
			color: MUTED$1,
			font: "Calibri"
		})]
	})];
}
function para(children, after = 80) {
	return new Paragraph({
		spacing: { after },
		children
	});
}
function heading(label) {
	return new Paragraph({
		border: { bottom: {
			color: "A68456",
			space: 1,
			style: BorderStyle.SINGLE,
			size: 8
		} },
		spacing: {
			before: 280,
			after: 120
		},
		children: [run(label.toUpperCase(), {
			bold: true,
			size: 18,
			color: FOREST$1,
			font: "Calibri"
		})]
	});
}
function body$3(text, opts = {}) {
	return para([run(text, {
		italics: opts.italics,
		size: opts.size ?? 21
	})], opts.after ?? 80);
}
function experienceBlocks(profile, settings) {
	const copy = COPY[settings.locale];
	if (!profile.experience.length) return [];
	const blocks = [heading(copy.experience)];
	for (const role of profile.experience) {
		const when = formatSpan(role.start, role.end, role.current, settings);
		blocks.push(para([run(role.title || "Role", {
			bold: true,
			size: 24
		}), run(when ? `    ${when}` : "", {
			italics: true,
			size: 20,
			color: MUTED$1
		})], 40));
		const org = [role.organization, role.location].filter(Boolean).join("  |  ");
		if (org) blocks.push(para([run(org, {
			italics: true,
			size: 20,
			color: MUTED$1
		})], 40));
		for (const line of summaryLines(role.summary)) blocks.push(body$3(`•  ${line}`, {
			size: 21,
			after: 40
		}));
	}
	return blocks;
}
function educationBlocks(profile, settings) {
	const copy = COPY[settings.locale];
	if (!profile.education.length) return [];
	const blocks = [heading(copy.education)];
	for (const item of profile.education) {
		const when = formatSpan(item.start, item.end, false, settings);
		blocks.push(para([run([degreeLine(item), item.institution].filter(Boolean).join(" — ") || "Study", {
			bold: true,
			size: 22
		})], 40));
		const meta = [item.location, when].filter(Boolean).join("  |  ");
		if (meta) blocks.push(para([run(meta, {
			italics: true,
			size: 20,
			color: MUTED$1
		})], 40));
		if (item.details) blocks.push(body$3(item.details, { after: 80 }));
	}
	return blocks;
}
function skillBlocks(profile, settings, includeLanguages) {
	const copy = COPY[settings.locale];
	const blocks = [];
	if (profile.skills.length) blocks.push(heading(copy.skills), body$3(profile.skills.join("  ·  ")));
	if (includeLanguages && profile.languages.length) blocks.push(heading(copy.languages), body$3(profile.languages.map((item) => `${item.name} (${item.level})`).join("  ·  ")));
	if (profile.certifications.length) {
		blocks.push(heading(copy.certifications));
		for (const item of profile.certifications) blocks.push(body$3([
			item.name,
			item.issuer,
			item.year
		].filter(Boolean).join(" — ")));
	}
	return blocks;
}
function childrenFor(profile, settings) {
	const copy = COPY[settings.locale];
	const personal = profile.personal;
	const name = displayName(personal, settings.nameOrder) || "Your name";
	const contact = [
		placeLine(personal),
		personal.email,
		phoneLine(personal),
		personal.linkedin,
		personal.website
	].filter(Boolean).join("  |  ");
	if (settings.template === "consulate") {
		const fields = [
			["Full name", name],
			[copy.born, formatWhen(personal.dateOfBirth, settings.dateStyle) || "—"],
			[copy.place, personal.placeOfBirth || "—"],
			[copy.nationality, personal.nationality || "—"],
			[copy.passport, personal.passportNumber || "—"],
			["Occupation", personal.headline || "—"],
			["Email", personal.email || "—"],
			["Telephone", phoneLine(personal) || "—"],
			["Address", addressLines(personal).join(", ") || "—"],
			...lifeLines(profile, settings, "full")
		];
		return [
			para([run(`MERIDIAN  ${dossierCode(profile)}`, {
				bold: true,
				size: 16,
				color: FOREST$1,
				font: "Calibri"
			})], 40),
			...photoBlock(personal.photo) ? [photoBlock(personal.photo)] : [],
			para([run(copy.particulars.toUpperCase(), {
				bold: true,
				size: 32
			})], 160),
			...preparedLine(personal, settings.locale) ? [para([run(preparedLine(personal, settings.locale), {
				italics: true,
				size: 20,
				color: "A68456"
			})], 120)] : [],
			...fields.flatMap(([label, value]) => [para([run(label.toUpperCase(), {
				bold: true,
				size: 16,
				color: MUTED$1,
				font: "Calibri"
			})], 20), para([run(value, { size: 22 })], 120)]),
			...personal.summary ? [heading(copy.profile), body$3(personal.summary)] : [],
			...experienceBlocks(profile, settings),
			...educationBlocks(profile, settings),
			...skillBlocks(profile, settings, true),
			para([run(copy.declaration, {
				italics: true,
				size: 18,
				color: MUTED$1
			})], 0),
			...signatureBlocks(profile, settings)
		];
	}
	const blocks = [];
	const portrait = settings.template === "meridian" ? photoBlock(personal.photo) : null;
	if (portrait) blocks.push(portrait);
	blocks.push(new Paragraph({
		alignment: AlignmentType.LEFT,
		spacing: { after: 40 },
		children: [run(name, {
			bold: true,
			size: settings.template === "atlas" ? 40 : 44
		})]
	}));
	if (personal.headline) blocks.push(para([run(personal.headline, {
		italics: true,
		size: 24,
		color: FOREST$1
	})], 60));
	if (preparedLine(personal, settings.locale)) blocks.push(para([run(preparedLine(personal, settings.locale), {
		italics: true,
		size: 20,
		color: "A68456"
	})], 60));
	blocks.push(para([run(contact || "Add contact details", {
		size: 18,
		color: MUTED$1,
		font: "Calibri"
	})], 160));
	if (settings.template === "meridian" && personal.nationality) blocks.push(para([run(`${copy.nationality}: ${personal.nationality}`, {
		italics: true,
		size: 20,
		color: MUTED$1
	})]));
	if (personal.summary) blocks.push(heading(copy.profile), body$3(personal.summary));
	blocks.push(...experienceBlocks(profile, settings));
	blocks.push(...educationBlocks(profile, settings));
	blocks.push(...skillBlocks(profile, settings, true));
	for (const [label, value] of lifeLines(profile, settings, "cv")) blocks.push(body$3(`${label}: ${value}`));
	blocks.push(...signatureBlocks(profile, settings));
	return blocks;
}
async function buildDocxBuffer(profile, settings) {
	const doc = new File({
		creator: "Meridian",
		title: displayName(profile.personal, settings.nameOrder) || "Meridian dossier",
		sections: [{
			properties: { page: {
				size: {
					width: settings.paper === "a4" ? 11906 : 12240,
					height: settings.paper === "a4" ? 16838 : 15840
				},
				margin: {
					top: 850,
					bottom: 850,
					left: 1e3,
					right: 1e3
				}
			} },
			children: childrenFor(profile, settings)
		}]
	});
	return Packer.toBuffer(doc);
}
var INK = [
	28,
	25,
	21
];
var FOREST = [
	27,
	77,
	62
];
var MUTED = [
	92,
	85,
	76
];
var BRASS = [
	166,
	132,
	86
];
var SHEET = [
	255,
	253,
	248
];
var RULE = [
	227,
	218,
	203
];
function personalPhoto(profile) {
	return profile.personal.photo.startsWith("data:image/");
}
function pdfText(value) {
	return value.replace(/[–—]/g, "-").replace(/[‘’]/g, "'").replace(/[“”]/g, "\"").replace(/[•·]/g, "-");
}
var Pen = class {
	doc;
	margin;
	y;
	constructor(doc, margin = 16) {
		this.doc = doc;
		this.margin = margin;
		this.y = 18;
	}
	get pageW() {
		return this.doc.internal.pageSize.getWidth();
	}
	get pageH() {
		return this.doc.internal.pageSize.getHeight();
	}
	get width() {
		return this.pageW - this.margin * 2;
	}
	ensure(height) {
		if (this.y + height <= this.pageH - 14) return;
		this.doc.addPage();
		this.y = 18;
	}
	rule(color = BRASS, length = 28) {
		this.doc.setDrawColor(...color);
		this.doc.setLineWidth(.35);
		this.doc.line(this.margin, this.y, this.margin + length, this.y);
		this.y += 4;
	}
	write(value, opts = {}) {
		const size = opts.size ?? 11;
		const width = opts.width ?? this.width;
		const x = opts.x ?? this.margin;
		this.doc.setFont(opts.font ?? "times", opts.style ?? "normal");
		this.doc.setFontSize(size);
		this.doc.setTextColor(...opts.color ?? INK);
		const lines = this.doc.splitTextToSize(pdfText(value), width);
		const lineHeight = size * .42;
		this.ensure(lines.length * lineHeight + 1);
		this.doc.text(lines, x, this.y);
		this.y += lines.length * lineHeight + (opts.gap ?? 1.6);
	}
	heading(label) {
		this.ensure(12);
		this.y += 2;
		this.write(label.toUpperCase(), {
			size: 9,
			font: "helvetica",
			style: "bold",
			color: FOREST,
			gap: 1.2
		});
		this.rule();
	}
	footer(name) {
		const pages = this.doc.getNumberOfPages();
		for (let page = 1; page <= pages; page += 1) {
			this.doc.setPage(page);
			this.doc.setFont("helvetica", "normal");
			this.doc.setFontSize(8);
			this.doc.setTextColor(...MUTED);
			this.doc.text(pdfText(name), this.margin, this.pageH - 8);
			this.doc.text(`${page} / ${pages}`, this.pageW - this.margin, this.pageH - 8, { align: "right" });
		}
	}
};
function contactBits(profile, includeStreet) {
	const personal = profile.personal;
	return [
		includeStreet ? addressLines(personal).join(", ") : placeLine(personal),
		personal.email,
		phoneLine(personal),
		personal.linkedin,
		personal.website
	].filter(Boolean);
}
function drawExperience(pen, profile, settings) {
	const copy = COPY[settings.locale];
	if (!profile.experience.length) return;
	pen.heading(copy.experience);
	for (const role of profile.experience) {
		pen.ensure(16);
		const when = formatSpan(role.start, role.end, role.current, settings);
		pen.doc.setFont("times", "bold");
		pen.doc.setFontSize(12);
		pen.doc.setTextColor(...INK);
		const title = role.title || "Role";
		const dateWidth = when ? pen.doc.getTextWidth(pdfText(when)) : 0;
		const titleWidth = pen.width - (when ? dateWidth + 4 : 0);
		pen.doc.text(pdfText(title), pen.margin, pen.y, { maxWidth: titleWidth });
		if (when) {
			pen.doc.setFont("times", "italic");
			pen.doc.setFontSize(10);
			pen.doc.setTextColor(...MUTED);
			pen.doc.text(pdfText(when), pen.margin + pen.width, pen.y, { align: "right" });
		}
		pen.y += 5;
		const org = [role.organization, role.location].filter(Boolean).join("  |  ");
		if (org) pen.write(org, {
			size: 10,
			style: "italic",
			color: MUTED,
			gap: 1.2
		});
		for (const line of summaryLines(role.summary)) pen.write(`-  ${line}`, {
			size: 10.5,
			gap: .8
		});
		pen.y += 2;
	}
}
function drawEducation(pen, profile, settings) {
	const copy = COPY[settings.locale];
	if (!profile.education.length) return;
	pen.heading(copy.education);
	for (const item of profile.education) {
		const when = formatSpan(item.start, item.end, false, settings);
		pen.write([degreeLine(item) || "Study", item.institution].filter(Boolean).join("  -  "), {
			size: 12,
			style: "bold",
			gap: .6
		});
		const meta = [item.location, when].filter(Boolean).join("  |  ");
		if (meta) pen.write(meta, {
			size: 10,
			style: "italic",
			color: MUTED,
			gap: 1
		});
		if (item.details) pen.write(item.details, {
			size: 10.5,
			gap: 2
		});
	}
}
function drawSkills(pen, profile, settings) {
	const copy = COPY[settings.locale];
	if (profile.skills.length) {
		pen.heading(copy.skills);
		pen.write(profile.skills.join("   ·   ").replace(/·/g, "|"), {
			size: 10.5,
			gap: 2
		});
	}
	if (profile.languages.length) {
		pen.heading(copy.languages);
		pen.write(profile.languages.map((item) => `${item.name} (${item.level})`).join("   |   "), { size: 10.5 });
	}
	if (profile.certifications.length) {
		pen.heading(copy.certifications);
		for (const item of profile.certifications) pen.write([
			item.name,
			item.issuer,
			item.year
		].filter(Boolean).join("  -  "), {
			size: 10.5,
			gap: 1
		});
	}
	drawLife(pen, profile, settings, "cv");
}
function drawMeridian(pen, profile, settings) {
	const copy = COPY[settings.locale];
	const name = displayName(profile.personal, settings.nameOrder) || "Your name";
	pen.doc.setFillColor(...FOREST);
	pen.doc.rect(0, 0, pen.pageW, 34, "F");
	pen.doc.setFillColor(...BRASS);
	pen.doc.rect(0, 34, pen.pageW, 1.2, "F");
	pen.doc.setTextColor(...SHEET);
	pen.doc.setFont("times", "bold");
	let nameSize = 22;
	pen.doc.setFontSize(nameSize);
	while (nameSize > 12 && pen.doc.getTextWidth(pdfText(name)) > pen.width) {
		nameSize -= 2;
		pen.doc.setFontSize(nameSize);
	}
	pen.doc.text(pdfText(name), pen.margin, 16, { maxWidth: pen.width });
	pen.doc.setFont("times", "italic");
	pen.doc.setFontSize(12);
	pen.doc.text(pdfText(profile.personal.headline || "Add a headline"), pen.margin, 23);
	pen.doc.setFont("times", "normal");
	pen.doc.setFontSize(9);
	const contact = contactBits(profile, false).join("   |   ");
	pen.doc.text(pdfText(contact || "Contact details appear here"), pen.margin, 30, { maxWidth: personalPhoto(profile) ? pen.width - 28 : pen.width });
	if (personalPhoto(profile)) pen.doc.addImage(profile.personal.photo, "JPEG", pen.pageW - pen.margin - 22, 5, 22, 26);
	pen.y = 44;
	{
		const prepared = preparedLine(profile.personal, settings.locale);
		if (prepared) pen.write(prepared, {
			size: 10,
			style: "italic",
			color: BRASS,
			gap: 2
		});
	}
	if (profile.personal.nationality) pen.write(`${copy.nationality}: ${profile.personal.nationality}`, {
		size: 10,
		style: "italic",
		color: MUTED,
		gap: 2
	});
	if (profile.personal.summary) {
		pen.heading(copy.profile);
		pen.write(profile.personal.summary, {
			size: 11,
			gap: 1
		});
	}
	drawExperience(pen, profile, settings);
	drawEducation(pen, profile, settings);
	drawSkills(pen, profile, settings);
}
function drawAtlas(pen, profile, settings) {
	const copy = COPY[settings.locale];
	const name = displayName(profile.personal, settings.nameOrder) || "Your name";
	pen.write(name, {
		size: 22,
		style: "bold",
		gap: 1
	});
	if (profile.personal.headline) pen.write(profile.personal.headline, {
		size: 12,
		style: "italic",
		gap: 1
	});
	{
		const prepared = preparedLine(profile.personal, settings.locale);
		if (prepared) pen.write(prepared, {
			size: 10,
			style: "italic",
			color: BRASS,
			gap: 2
		});
	}
	pen.write(contactBits(profile, false).join("  |  ") || "City, email, phone", {
		size: 9,
		font: "helvetica",
		color: MUTED,
		gap: 1
	});
	pen.rule(FOREST, pen.width);
	if (profile.personal.summary) {
		pen.heading(copy.profile);
		pen.write(profile.personal.summary, { size: 10.5 });
	}
	drawExperience(pen, profile, settings);
	drawEducation(pen, profile, settings);
	drawSkills(pen, profile, settings);
}
function drawConsulate(pen, profile, settings) {
	const copy = COPY[settings.locale];
	const personal = profile.personal;
	const name = displayName(personal, settings.nameOrder) || "Your name";
	pen.doc.setFont("helvetica", "bold");
	pen.doc.setFontSize(8);
	pen.doc.setTextColor(...FOREST);
	pen.doc.text(`MERIDIAN  ${dossierCode(profile)}`, pen.margin, 14);
	pen.doc.setFont("times", "bold");
	pen.doc.setFontSize(16);
	pen.doc.setTextColor(...INK);
	pen.doc.text(copy.particulars.toUpperCase(), pen.margin, 22);
	if (personalPhoto(profile)) pen.doc.addImage(profile.personal.photo, "JPEG", pen.pageW - pen.margin - 24, 12, 24, 30);
	pen.y = personalPhoto(profile) ? 46 : 26;
	pen.rule(BRASS, pen.width);
	pen.y += 2;
	{
		const prepared = preparedLine(profile.personal, settings.locale);
		if (prepared) pen.write(prepared, {
			size: 10,
			style: "italic",
			color: BRASS,
			gap: 2
		});
	}
	const rows = [
		["Full name", name],
		[copy.born, formatWhen(personal.dateOfBirth, settings.dateStyle)],
		[copy.place, personal.placeOfBirth],
		[copy.nationality, personal.nationality],
		[copy.passport, personal.passportNumber],
		["Occupation", personal.headline],
		["Email", personal.email],
		["Telephone", phoneLine(personal)],
		["Address", addressLines(personal).join(", ")],
		["LinkedIn", personal.linkedin],
		...lifeLines(profile, settings, "full")
	];
	for (let index = 0; index < rows.length; index += 2) {
		const left = rows[index];
		const right = rows[index + 1];
		const col = pen.width / 2;
		const lineHeight = 4.6;
		const linesFor = (pair) => pair ? pen.doc.splitTextToSize(pdfText(pair[1] || "-"), col - 6) : ["-"];
		const leftLines = linesFor(left);
		const rightLines = linesFor(right);
		const rowHeight = 5 + (Math.max(leftLines.length, rightLines.length) - 1) * lineHeight + 8;
		pen.ensure(rowHeight);
		const y = pen.y;
		const paint = (pair, x, lines) => {
			if (!pair) return;
			pen.doc.setFont("helvetica", "bold");
			pen.doc.setFontSize(7.5);
			pen.doc.setTextColor(...MUTED);
			pen.doc.text(pdfText(pair[0].toUpperCase()), x, y);
			pen.doc.setFont("times", "normal");
			pen.doc.setFontSize(11);
			pen.doc.setTextColor(...INK);
			pen.doc.text(lines, x, y + 5);
			pen.doc.setDrawColor(...RULE);
			pen.doc.setLineWidth(.2);
			pen.doc.line(x, y + 5 + (lines.length - 1) * lineHeight + 2.5, x + col - 6, y + 5 + (lines.length - 1) * lineHeight + 2.5);
		};
		paint(left, pen.margin, leftLines);
		paint(right, pen.margin + col, rightLines);
		pen.y = y + rowHeight;
	}
	if (personal.summary) {
		pen.heading(copy.profile);
		pen.write(personal.summary, { size: 11 });
	}
	drawExperience(pen, profile, settings);
	drawEducation(pen, profile, settings);
	if (profile.languages.length) {
		pen.heading(copy.languages);
		pen.write(profile.languages.map((item) => `${item.name} (${item.level})`).join("   |   "), { size: 10.5 });
	}
	pen.y += 2;
	pen.write(copy.declaration, {
		size: 9,
		style: "italic",
		color: MUTED
	});
}
function drawLife(pen, profile, settings, mode) {
	const lines = lifeLines(profile, settings, mode);
	if (!lines.length) return;
	pen.heading(mode === "full" ? "Family and travel" : "More");
	for (const [label, value] of lines) pen.write(`${label}: ${value}`, {
		size: 10.5,
		gap: 1
	});
}
function drawSignature(pen, profile, settings) {
	const line = templateSigns(settings) ? signatureLine(profile.personal, settings) : null;
	if (!line) return;
	pen.ensure(30);
	pen.y += 6;
	const top = pen.y;
	const x = pen.pageW - pen.margin - 70;
	try {
		const props = pen.doc.getImageProperties(line.image);
		const h = 16;
		const w = Math.min(60, props.width / Math.max(1, props.height) * h);
		pen.doc.addImage(line.image, "PNG", x + 2, top, w, h);
	} catch {}
	pen.doc.setDrawColor(...INK);
	pen.doc.setLineWidth(.3);
	pen.doc.line(x, top + 18, x + 70, top + 18);
	pen.doc.setFont("helvetica", "normal");
	pen.doc.setFontSize(8.5);
	pen.doc.setTextColor(...MUTED);
	pen.doc.text(pdfText(line.label), x, top + 22);
	if (line.text) pen.doc.text(pdfText(line.text), pen.margin, top + 18);
	pen.y = top + 26;
}
function buildPdf(profile, settings) {
	const doc = new E({
		unit: "mm",
		format: settings.paper
	});
	const pen = new Pen(doc);
	if (settings.template === "consulate") drawConsulate(pen, profile, settings);
	else if (settings.template === "atlas") drawAtlas(pen, profile, settings);
	else drawMeridian(pen, profile, settings);
	drawSignature(pen, profile, settings);
	const name = displayName(profile.personal, settings.nameOrder) || "Meridian";
	pen.footer(name);
	doc.setProperties({
		title: `${name} - Meridian`,
		creator: "Meridian"
	});
	return doc;
}
/**
* Two diagonal, semi-transparent lines across EVERY page. Drawn last (on top)
* at low opacity so the CV text underneath stays readable.
*/
function stampWatermark(doc, lines) {
	const pages = doc.getNumberOfPages();
	const w = doc.internal.pageSize.getWidth();
	const h = doc.internal.pageSize.getHeight();
	const angle = Math.atan2(h, w) * 180 / Math.PI;
	for (let page = 1; page <= pages; page += 1) {
		doc.setPage(page);
		doc.saveGraphicsState();
		doc.setGState(doc.GState({ opacity: .18 }));
		doc.setFont("helvetica", "bold");
		doc.setTextColor(150, 30, 30);
		lines.forEach((line, index) => {
			const size = index === 0 ? 30 : 40;
			doc.setFontSize(size);
			const text = pdfText(line);
			const len = doc.getTextWidth(text);
			const cx = w / 2 + (index === 0 ? -1 : 1) * 22 * Math.sin(angle * Math.PI / 180);
			const cy = h / 2 + (index === 0 ? -1 : 1) * 22 * Math.cos(angle * Math.PI / 180);
			const rad = angle * Math.PI / 180;
			const x = cx - len / 2 * Math.cos(rad);
			const y = cy + len / 2 * Math.sin(rad);
			doc.text(text, x, y, { angle });
		});
		doc.restoreGraphicsState();
	}
}
/** Free, watermarked preview PDF. This is the ONLY PDF the browser builds. */
function buildPreviewPdf(profile, settings, lines) {
	const doc = buildPdf(profile, settings);
	stampWatermark(doc, lines);
	doc.setProperties({
		title: "UNPAID PREVIEW - Meridian",
		subject: lines.join(" / "),
		creator: "Meridian"
	});
	return doc;
}
function downloadPreviewPdf(profile, settings, lines) {
	buildPreviewPdf(profile, settings, lines).save(`${fileBase(profile, settings)}-PREVIEW.pdf`);
}
function supabaseFromEnv(env = processModule.env) {
	if (env.STORE_BACKEND !== "supabase") return null;
	const url = env.SUPABASE_URL?.replace(/\/+$/, "");
	const key = env.SUPABASE_SERVICE_ROLE_KEY;
	if (!url || !key) {
		console.warn("[db] STORE_BACKEND=supabase but SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY missing — using memory store");
		return null;
	}
	return {
		url,
		key
	};
}
var SupabaseRest = class {
	env;
	fetchImpl;
	constructor(env, fetchImpl = fetch) {
		this.env = env;
		this.fetchImpl = fetchImpl;
	}
	async req(path, init = {}) {
		const res = await this.fetchImpl(`${this.env.url}/rest/v1/${path}`, {
			...init,
			headers: {
				apikey: this.env.key,
				authorization: `Bearer ${this.env.key}`,
				"content-type": "application/json",
				...init.prefer ? { prefer: init.prefer } : {}
			}
		});
		if (!res.ok) throw new Error(`[db] ${init.method ?? "GET"} ${path.split("?")[0]} -> ${res.status} ${await res.text().catch(() => "")}`);
		const t = await res.text();
		return t ? JSON.parse(t) : null;
	}
	select(table, query) {
		return this.req(`${table}?${query}`);
	}
	upsert(table, row) {
		return this.req(table, {
			method: "POST",
			body: JSON.stringify(row),
			prefer: "resolution=merge-duplicates,return=minimal"
		});
	}
	insertIgnore(table, row) {
		return this.req(table, {
			method: "POST",
			body: JSON.stringify(row),
			prefer: "resolution=ignore-duplicates,return=representation"
		});
	}
	delete(table, query) {
		return this.req(`${table}?${query}`, {
			method: "DELETE",
			prefer: "return=representation"
		});
	}
};
var eq = (v) => `eq.${encodeURIComponent(v)}`;
/** Supabase-backed PaymentStore (orders, plans/credits entitlements, webhook replay guard). Records kept as jsonb. */
var SupabasePaymentStore = class {
	db;
	constructor(db) {
		this.db = db;
	}
	async one(table, q) {
		return (await this.db.select(table, `select=data&${q}&limit=1`))[0]?.data;
	}
	getOrder(id) {
		return this.one("cv_orders", `order_id=${eq(id)}`);
	}
	getOrderByProviderId(pid) {
		return this.one("cv_orders", `provider_order_id=${eq(pid)}`);
	}
	findOrderByIdempotencyKey(key) {
		return this.one("cv_orders", `idempotency_key=${eq(key)}`);
	}
	async putOrder(o) {
		await this.db.upsert("cv_orders", {
			order_id: o.orderId,
			provider_order_id: o.providerOrderId,
			idempotency_key: o.idempotencyKey,
			status: o.status,
			data: o
		});
	}
	getEntitlement(id) {
		return this.one("cv_entitlements", `entitlement_id=${eq(id)}`);
	}
	async putEntitlement(e) {
		await this.db.upsert("cv_entitlements", {
			entitlement_id: e.entitlementId,
			order_id: e.orderId,
			plan_id: e.planId ?? null,
			data: e
		});
	}
	async markEventProcessed(id) {
		return (await this.db.insertIgnore("cv_webhook_events", { event_key: id })).length > 0;
	}
};
/** Stable JSON: object keys sorted recursively, so the same CV always hashes the same. */
function canonicalJson(value) {
	if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
	if (value && typeof value === "object") return `{${Object.entries(value).filter(([, v]) => v !== void 0).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).map(([k, v]) => `${JSON.stringify(k)}:${canonicalJson(v)}`).join(",")}}`;
	return JSON.stringify(value ?? null);
}
function sha256(text) {
	return createHash("sha256").update(text).digest("hex");
}
/** Hash of the canonical CV data + layout settings that the clean file is generated from. */
function versionHash(profile, settings) {
	return sha256(canonicalJson({
		profile,
		settings
	}));
}
/** Identity used by the "cv" policy: the local document id plus the normalised person name. */
function cvKey(docId, profile) {
	const p = profile.personal;
	return sha256(canonicalJson({
		docId,
		name: `${p.givenName ?? ""} ${p.familyName ?? ""}`.toLowerCase().replace(/\s+/g, " ").trim()
	}));
}
/**
* Central, client-safe configuration for the watermarked preview and the
* one-time paid export. Change the price HERE (and only here).
*
* Nothing in this file grants anything: whether a clean export is allowed is
* decided exclusively on the server (see service.server.ts).
*/
/** Price of one clean export, in the smallest currency unit (paise). ₹20 = 2000 (matches the Single Use plan below). */
var EXPORT_PRICE_MINOR = 2e3;
function formatPrice(minor = EXPORT_PRICE_MINOR, currency = "INR") {
	const value = minor / 100;
	return `${currency === "INR" ? "₹" : `${currency} `}${Number.isInteger(value) ? value : value.toFixed(2)}`;
}
/** Watermark lines drawn diagonally on every preview page (screen + preview PDF). */
var WATERMARK_LINES = ["SAMPLE — NOT FOR OFFICIAL USE", "UNPAID PREVIEW"];
var DEFAULT_ENTITLEMENT_POLICY = "version";
function policyExplanation(policy, maxDownloads) {
	const repeat = maxDownloads > 0 ? `up to ${maxDownloads} clean downloads (PDF and Word)` : "unlimited clean downloads (PDF and Word)";
	return policy === "version" ? `Covers this exact version of your CV: ${repeat}. If you edit the CV afterwards, the edited version needs a new unlock.` : `Covers this CV: ${repeat}. Edits to the same CV stay unlocked; a CV for a different person needs a new unlock.`;
}
var PLANS = [
	{
		id: "single_inr",
		name: "Single Use",
		priceMinor: 2e3,
		currency: "INR",
		period: "one-time",
		profiles: 1,
		cvGenerations: 1,
		formFills: 1,
		companyLimit: 0,
		singleUse: true,
		bullets: ["One clean CV export or one form fill", "PDF and Word"]
	},
	{
		id: "career_starter",
		name: "Career Starter",
		priceMinor: 1e5,
		currency: "INR",
		period: "year",
		profiles: 2,
		cvGenerations: 100,
		formFills: 100,
		companyLimit: 100,
		singleUse: false,
		bullets: [
			"1 year",
			"2 profiles",
			"100 CV generations",
			"100 form-filler uses (up to 100 companies, counted within those 100 fills)"
		]
	},
	{
		id: "global_single",
		name: "Global Single Use",
		priceMinor: 100,
		currency: "USD",
		period: "one-time",
		profiles: 1,
		cvGenerations: 1,
		formFills: 1,
		companyLimit: 0,
		singleUse: true,
		bullets: ["One clean CV export or one form fill", "PDF and Word"]
	},
	{
		id: "global_pro",
		name: "Global Pro",
		priceMinor: 2900,
		currency: "USD",
		period: "year",
		profiles: 1,
		cvGenerations: 300,
		formFills: 300,
		companyLimit: 0,
		singleUse: false,
		bullets: [
			"1 year",
			"300 form-filler uses",
			"Remaining credits always shown"
		]
	},
	{
		id: "commercial_test",
		name: "Commercial (TEST)",
		priceMinor: 100,
		currency: "INR",
		period: "year",
		profiles: 1,
		cvGenerations: 100,
		formFills: 300,
		companyLimit: 0,
		singleUse: false,
		hidden: true,
		testOnly: true,
		clients: true,
		bullets: [
			"TEST ONLY — price TBD",
			"Share link with clients",
			"Clients list + fill forms for each client"
		]
	}
];
/** Plans offered in the paywall. Hidden test-only plans appear only in TEST mode. */
function visiblePlans(testMode) {
	return PLANS.filter((p) => !p.hidden || p.testOnly && testMode);
}
var DEFAULT_PLAN_ID = "single_inr";
var LAUNCH_NOTE = "Launch offer, future plans may change; purchased package terms stay as bought.";
function getPlan(id) {
	return PLANS.find((p) => p.id === id);
}
function planPriceLabel(p) {
	if (p.testOnly) return "Price TBD (TEST)";
	const v = p.priceMinor / 100;
	const amt = Number.isInteger(v) ? v.toLocaleString("en-IN") : v.toFixed(2);
	return `${p.currency === "INR" ? "₹" : "$"}${amt}${p.period === "year" ? "/year" : ""}`;
}
function hmacHex(secret, data) {
	return createHmac("sha256", secret).update(data).digest("hex");
}
function safeEqualHex(a, b) {
	const x = Buffer.from(a, "utf8");
	const y = Buffer.from(b, "utf8");
	return x.length === y.length && timingSafeEqual(x, y);
}
var RazorpayProvider = class {
	keyId;
	keySecret;
	webhookSecret;
	fetchImpl;
	name = "razorpay";
	test;
	constructor(keyId, keySecret, webhookSecret, fetchImpl = fetch) {
		this.keyId = keyId;
		this.keySecret = keySecret;
		this.webhookSecret = webhookSecret;
		this.fetchImpl = fetchImpl;
		this.test = keyId.startsWith("rzp_test_");
	}
	auth() {
		return `Basic ${Buffer.from(`${this.keyId}:${this.keySecret}`).toString("base64")}`;
	}
	async createOrder(input) {
		const res = await this.fetchImpl("https://api.razorpay.com/v1/orders", {
			method: "POST",
			headers: {
				authorization: this.auth(),
				"content-type": "application/json"
			},
			body: JSON.stringify({
				amount: input.amountMinor,
				currency: input.currency,
				receipt: input.receipt,
				payment_capture: 1
			})
		});
		if (!res.ok) throw new Error(`razorpay order failed (${res.status})`);
		const body = await res.json();
		if (!body.id || body.amount !== input.amountMinor || body.currency !== input.currency) throw new Error("razorpay order mismatch");
		return {
			providerOrderId: body.id,
			publicKey: this.keyId
		};
	}
	async verifyClientPayment(input) {
		if (!safeEqualHex(hmacHex(this.keySecret, `${input.providerOrderId}|${input.paymentId}`), input.signature)) throw new Error("bad payment signature");
		const res = await this.fetchImpl(`https://api.razorpay.com/v1/payments/${encodeURIComponent(input.paymentId)}`, { headers: { authorization: this.auth() } });
		if (!res.ok) throw new Error(`razorpay payment fetch failed (${res.status})`);
		return toVerified(await res.json());
	}
	parseWebhook(rawBody, signature) {
		if (!signature || !safeEqualHex(hmacHex(this.webhookSecret, rawBody), signature)) throw new Error("bad webhook signature");
		const body = JSON.parse(rawBody);
		const entity = body.payload?.payment?.entity;
		const type = body.event === "payment.captured" || body.event === "payment.failed" || body.event === "order.paid" ? body.event : "other";
		return {
			eventId: `${body.event}:${entity?.id ?? "?"}`,
			type,
			payment: entity ? toVerified(entity) : void 0
		};
	}
};
function toVerified(p) {
	const status = p.status === "captured" ? "captured" : p.status === "authorized" ? "authorized" : p.status === "failed" ? "failed" : "other";
	return {
		providerOrderId: p.order_id,
		paymentId: p.id,
		amountMinor: p.amount,
		currency: p.currency,
		status
	};
}
/**
* Test-only provider. "Payments" are simulated by the server itself; it only
* exists so the success / cancel / failure UI and the entitlement plumbing can
* be exercised without money. Entitlements it produces are flagged test=true.
*/
var SimulatedProvider = class {
	secret;
	name = "simulated";
	test = true;
	seq = 0;
	constructor(secret) {
		this.secret = secret;
	}
	async createOrder(input) {
		this.seq += 1;
		return { providerOrderId: `sim_order_${input.receipt}` };
	}
	/** Server-side "signature" for a simulated payment, so the verify path is the same shape as live. */
	sign(providerOrderId, paymentId) {
		return hmacHex(this.secret, `${providerOrderId}|${paymentId}`);
	}
	async verifyClientPayment(input) {
		if (!safeEqualHex(this.sign(input.providerOrderId, input.paymentId), input.signature)) throw new Error("bad payment signature");
		const [, , amount, currency] = input.paymentId.split(":");
		return {
			providerOrderId: input.providerOrderId,
			paymentId: input.paymentId,
			amountMinor: Number(amount),
			currency: currency ?? "",
			status: input.paymentId.startsWith("sim_pay:ok") ? "captured" : "failed"
		};
	}
	parseWebhook(rawBody, signature) {
		if (!signature || !safeEqualHex(hmacHex(this.secret, rawBody), signature)) throw new Error("bad webhook signature");
		const body = JSON.parse(rawBody);
		const type = body.event === "payment.captured" || body.event === "payment.failed" ? body.event : "other";
		return {
			eventId: body.id,
			type,
			payment: body.payment
		};
	}
};
var MemoryPaymentStore = class {
	orders = /* @__PURE__ */ new Map();
	entitlements = /* @__PURE__ */ new Map();
	events = /* @__PURE__ */ new Set();
	async getOrder(id) {
		const o = this.orders.get(id);
		return o ? { ...o } : void 0;
	}
	async getOrderByProviderId(pid) {
		for (const o of this.orders.values()) if (o.providerOrderId === pid) return { ...o };
	}
	async findOrderByIdempotencyKey(key) {
		for (const o of this.orders.values()) if (o.idempotencyKey === key) return { ...o };
	}
	async putOrder(order) {
		this.orders.set(order.orderId, { ...order });
	}
	async getEntitlement(id) {
		const e = this.entitlements.get(id);
		return e ? { ...e } : void 0;
	}
	async putEntitlement(ent) {
		this.entitlements.set(ent.entitlementId, { ...ent });
	}
	async markEventProcessed(id) {
		if (this.events.has(id)) return false;
		this.events.add(id);
		return true;
	}
};
/** All decisions come from SERVER env vars; nothing the browser sends can change them. */
function configFromEnv(env) {
	const trialMode = (env.TRIAL_MODE ?? "true").trim().toLowerCase() !== "false";
	const production = env.NODE_ENV === "production";
	const policy = env.EXPORT_ENTITLEMENT_POLICY === "cv" ? "cv" : DEFAULT_ENTITLEMENT_POLICY;
	const maxRaw = Number(env.EXPORT_MAX_DOWNLOADS ?? 10);
	const maxDownloads = Number.isInteger(maxRaw) && maxRaw >= 0 ? maxRaw : 10;
	let live = null;
	if (!trialMode && env.PAYMENT_PROVIDER === "razorpay" && env.RAZORPAY_KEY_ID && env.RAZORPAY_KEY_SECRET && env.RAZORPAY_WEBHOOK_SECRET) live = new RazorpayProvider(env.RAZORPAY_KEY_ID, env.RAZORPAY_KEY_SECRET, env.RAZORPAY_WEBHOOK_SECRET);
	const simulated = trialMode && !production ? new SimulatedProvider(env.SIMULATED_PAYMENT_SECRET || randomBytes(32).toString("hex")) : null;
	return {
		trialMode,
		production,
		priceMinor: EXPORT_PRICE_MINOR,
		currency: "INR",
		policy,
		maxDownloads,
		live,
		simulated
	};
}
var PaymentError = class extends Error {
	status;
	code;
	constructor(status, code, message) {
		super(message);
		this.status = status;
		this.code = code;
	}
};
function newId(prefix) {
	return `${prefix}_${randomBytes(16).toString("hex")}`;
}
var PaymentService = class {
	cfg;
	store;
	now;
	constructor(cfg, store = new MemoryPaymentStore(), now = Date.now) {
		this.cfg = cfg;
		this.store = store;
		this.now = now;
	}
	provider() {
		return this.cfg.live ?? this.cfg.simulated;
	}
	status() {
		const base = {
			trialMode: this.cfg.trialMode,
			priceMinor: this.cfg.priceMinor,
			currency: this.cfg.currency,
			priceLabel: formatPrice(this.cfg.priceMinor, this.cfg.currency),
			policy: this.cfg.policy,
			maxDownloads: this.cfg.maxDownloads,
			policyText: policyExplanation(this.cfg.policy, this.cfg.maxDownloads)
		};
		if (this.cfg.live) return {
			...base,
			mode: this.cfg.live.test ? "test" : "live",
			provider: this.cfg.live.name,
			message: this.cfg.live.test ? "Razorpay TEST keys — no real money moves." : "Secure payment via Razorpay."
		};
		if (this.cfg.simulated) return {
			...base,
			mode: "test",
			provider: "simulated",
			message: "TEST MODE — simulated payment. No money is charged and test unlocks never count as real purchases."
		};
		return {
			...base,
			mode: "unavailable",
			provider: null,
			message: "Paid clean exports are not yet available. You can keep editing and download the watermarked preview for free."
		};
	}
	/** Create (or idempotently reuse) an order for this CV. Amount/currency come from server config only. */
	async createOrder(doc, idempotencyKey, planId = DEFAULT_PLAN_ID) {
		const plan = getPlan(planId);
		if (!plan) throw new PaymentError(400, "bad_plan", "Unknown plan.");
		const provider = this.provider();
		if (!provider) throw new PaymentError(503, "payments_unavailable", "Paid exports are not yet available.");
		if (plan.testOnly && !provider.test) throw new PaymentError(400, "bad_plan", "This plan is not available yet.");
		if (!/^[A-Za-z0-9_-]{8,80}$/.test(idempotencyKey)) throw new PaymentError(400, "bad_idempotency_key", "Missing idempotency key.");
		if (!/^[A-Za-z0-9_-]{8,80}$/.test(doc.docId)) throw new PaymentError(400, "bad_doc", "Missing document id.");
		const versionHash$1 = versionHash(doc.profile, doc.settings);
		const cvKey$1 = cvKey(doc.docId, doc.profile);
		const existing = await this.store.findOrderByIdempotencyKey(idempotencyKey);
		if (existing) {
			if (existing.versionHash !== versionHash$1) throw new PaymentError(409, "idempotency_conflict", "This request key was already used for different CV content.");
			return {
				order: existing,
				reused: true
			};
		}
		const orderId = newId("ord");
		const created = await provider.createOrder({
			receipt: orderId.slice(0, 40),
			amountMinor: plan.priceMinor,
			currency: plan.currency
		});
		const order = {
			orderId,
			providerOrderId: created.providerOrderId,
			provider: provider.name,
			test: provider.test,
			amountMinor: plan.priceMinor,
			currency: plan.currency,
			planId: plan.id,
			status: "created",
			docId: doc.docId,
			versionHash: versionHash$1,
			cvKey: cvKey$1,
			idempotencyKey,
			createdAt: this.now()
		};
		await this.store.putOrder(order);
		return {
			order,
			reused: false,
			publicKey: created.publicKey
		};
	}
	/** Validate a provider-verified payment against OUR order and, once, issue the entitlement. */
	locks = /* @__PURE__ */ new Map();
	/** Serialise settlement per order so a concurrent verify + webhook cannot issue two entitlements (in-process; a DB store must use a conditional update). */
	async settle(order, payment) {
		const run = (this.locks.get(order.orderId) ?? Promise.resolve()).catch(() => void 0).then(async () => this.settleNow(await this.store.getOrder(order.orderId) ?? order, payment));
		this.locks.set(order.orderId, run);
		try {
			return await run;
		} finally {
			if (this.locks.get(order.orderId) === run) this.locks.delete(order.orderId);
		}
	}
	async settleNow(order, payment) {
		if (payment.providerOrderId !== order.providerOrderId) throw new PaymentError(400, "order_mismatch", "Payment is for a different order.");
		if (payment.amountMinor !== order.amountMinor || payment.currency !== order.currency) throw new PaymentError(400, "amount_mismatch", "Payment amount or currency does not match the order.");
		if (order.status === "paid") return order;
		if (order.status === "cancelled") throw new PaymentError(409, "order_cancelled", "This order was cancelled.");
		if (payment.status !== "captured") {
			if (order.status === "created") await this.store.putOrder({
				...order,
				status: "failed"
			});
			throw new PaymentError(402, "payment_not_captured", "The payment did not go through.");
		}
		const ent = {
			entitlementId: newId("ent"),
			orderId: order.orderId,
			test: order.test,
			policy: this.cfg.policy,
			versionHash: order.versionHash,
			cvKey: order.cvKey,
			maxDownloads: this.cfg.maxDownloads,
			downloads: 0,
			createdAt: this.now(),
			...this.initialCredits(order)
		};
		await this.store.putEntitlement(ent);
		const paid = {
			...order,
			status: "paid",
			paidAt: this.now(),
			paymentId: payment.paymentId,
			entitlementId: ent.entitlementId
		};
		await this.store.putOrder(paid);
		return paid;
	}
	/** Browser returns from checkout with (paymentId, signature): verified server-side, never trusted as-is. */
	async verifyPayment(orderId, paymentId, signature) {
		const order = await this.store.getOrder(orderId);
		if (!order) throw new PaymentError(404, "no_order", "Unknown order.");
		const provider = this.providerFor(order);
		let payment;
		try {
			payment = await provider.verifyClientPayment({
				providerOrderId: order.providerOrderId,
				paymentId,
				signature
			});
		} catch {
			throw new PaymentError(400, "verification_failed", "Payment could not be verified.");
		}
		return this.settle(order, payment);
	}
	/** Signed webhook from the provider. Replays and duplicates are no-ops. */
	async handleWebhook(providerName, rawBody, signature, eventIdHeader) {
		const provider = this.cfg.live?.name === providerName ? this.cfg.live : this.cfg.simulated?.name === providerName ? this.cfg.simulated : null;
		if (!provider) throw new PaymentError(404, "no_provider", "Provider not enabled.");
		let event;
		try {
			event = provider.parseWebhook(rawBody, signature);
		} catch {
			throw new PaymentError(401, "bad_signature", "Invalid webhook signature.");
		}
		const eventId = eventIdHeader || event.eventId;
		if (!await this.store.markEventProcessed(`${providerName}:${eventId}`)) return { duplicate: true };
		if (!event.payment || event.type !== "payment.captured" && event.type !== "order.paid" && event.type !== "payment.failed") return { ignored: true };
		const order = await this.store.getOrderByProviderId(event.payment.providerOrderId);
		if (!order) return { ignored: true };
		try {
			const settled = await this.settle(order, event.payment);
			return {
				orderId: settled.orderId,
				status: settled.status
			};
		} catch (error) {
			if (error instanceof PaymentError && error.code === "payment_not_captured") return {
				orderId: order.orderId,
				status: "failed"
			};
			if (error instanceof PaymentError && error.code === "order_cancelled") return {
				orderId: order.orderId,
				status: "cancelled"
			};
			throw error;
		}
	}
	async cancelOrder(orderId) {
		const order = await this.store.getOrder(orderId);
		if (!order) throw new PaymentError(404, "no_order", "Unknown order.");
		if (order.status === "created") await this.store.putOrder({
			...order,
			status: "cancelled"
		});
		return await this.store.getOrder(orderId);
	}
	providerFor(order) {
		const p = order.provider === "simulated" ? this.cfg.simulated : this.cfg.live;
		if (!p || p.name !== order.provider) throw new PaymentError(409, "provider_disabled", "This order's payment provider is no longer enabled.");
		return p;
	}
	/**
	* THE gate for clean exports. Checks a server-stored entitlement against the
	* canonical CV data the file will be built from. Returns the entitlement after
	* counting the download.
	*/
	async authorizeCleanExport(entitlementId, doc) {
		if (!entitlementId) throw new PaymentError(402, "no_entitlement", "A clean export needs an unlock.");
		const ent = await this.store.getEntitlement(entitlementId);
		if (!ent) throw new PaymentError(402, "no_entitlement", "A clean export needs an unlock.");
		const order = await this.store.getOrder(ent.orderId);
		if (!order || order.status !== "paid") throw new PaymentError(402, "no_entitlement", "A clean export needs an unlock.");
		if (ent.test && !(this.cfg.simulated || this.cfg.live?.test)) throw new PaymentError(402, "test_entitlement", "Test unlocks are not valid for real exports.");
		if (!ent.test && !this.cfg.live) throw new PaymentError(503, "payments_unavailable", "Paid exports are not available right now.");
		if (!(this.isPackage(ent) || (ent.policy === "version" ? ent.versionHash === versionHash(doc.profile, doc.settings) : ent.cvKey === cvKey(doc.docId, doc.profile)))) throw new PaymentError(402, "edited_after_purchase", ent.policy === "version" ? "This CV changed after it was unlocked. The edited version needs a new unlock." : "This unlock belongs to a different CV.");
		if (ent.maxDownloads > 0 && ent.downloads >= ent.maxDownloads && !this.isPackage(ent)) throw new PaymentError(429, "download_limit", "Download limit for this unlock reached.");
		let updated = {
			...ent,
			downloads: ent.downloads + 1
		};
		if (ent.planId) {
			this.checkActive(ent);
			const vh = versionHash(doc.profile, doc.settings);
			const charged = ent.chargedVersions ?? [];
			if (!charged.includes(vh)) {
				if ((ent.cvGenerationsLeft ?? 0) <= 0) throw new PaymentError(402, "no_credits", "No CV credits left on this plan.");
				const plan = getPlan(ent.planId);
				updated = {
					...updated,
					cvGenerationsLeft: (ent.cvGenerationsLeft ?? 0) - 1,
					chargedVersions: [...charged, vh]
				};
				if (plan?.singleUse) updated.formFillsLeft = 0;
			}
		}
		await this.store.putEntitlement(updated);
		return updated;
	}
	initialCredits(order) {
		const plan = getPlan(order.planId);
		if (!plan) return {};
		return {
			planId: plan.id,
			expiresAt: plan.period === "year" ? this.now() + 31536e6 : null,
			cvGenerationsLeft: plan.cvGenerations,
			formFillsLeft: plan.formFills,
			companies: [],
			chargedVersions: [],
			pendingFills: {}
		};
	}
	/** Multi-use packages are not bound to one CV version. Single-use plans keep the version policy. */
	isPackage(ent) {
		const plan = getPlan(ent.planId);
		return Boolean(plan && !plan.singleUse);
	}
	checkActive(ent) {
		if (ent.expiresAt && this.now() > ent.expiresAt) throw new PaymentError(402, "plan_expired", "This plan has expired.");
	}
	async paidEntitlement(entitlementId) {
		const ent = entitlementId ? await this.store.getEntitlement(entitlementId) : void 0;
		if (!ent || !ent.planId) throw new PaymentError(402, "no_entitlement", "No active plan.");
		const order = await this.store.getOrder(ent.orderId);
		if (!order || order.status !== "paid") throw new PaymentError(402, "no_entitlement", "No active plan.");
		if (ent.test && !(this.cfg.simulated || this.cfg.live?.test)) throw new PaymentError(402, "test_entitlement", "Test unlocks are not valid.");
		return ent;
	}
	credits(ent) {
		const plan = getPlan(ent.planId);
		return {
			planId: plan.id,
			planName: plan.name,
			test: ent.test,
			expiresAt: ent.expiresAt ?? null,
			profilesMax: plan.profiles,
			cvGenerationsLeft: ent.cvGenerationsLeft ?? 0,
			cvGenerationsMax: plan.cvGenerations,
			formFillsLeft: ent.formFillsLeft ?? 0,
			formFillsMax: plan.formFills,
			companiesUsed: (ent.companies ?? []).length,
			companyLimit: plan.companyLimit,
			singleUse: plan.singleUse,
			clients: Boolean(plan.clients)
		};
	}
	/** Commercial owner check: a paid, active entitlement whose plan includes the Clients feature. */
	async commercialOwner(entitlementId) {
		let ent;
		try {
			ent = await this.paidEntitlement(entitlementId);
		} catch {
			throw new PaymentError(403, "not_commercial", "Clients are available only on an active Commercial plan.");
		}
		if (!getPlan(ent.planId)?.clients) throw new PaymentError(403, "not_commercial", "Clients are available only on an active Commercial plan.");
		this.checkActive(ent);
		return ent;
	}
	async getCredits(entitlementId) {
		return this.credits(await this.paidEntitlement(entitlementId));
	}
	/** Reserve (deduct) one form-fill credit. Kept only if completeFormFill(success=true); refunded otherwise. */
	async startFormFill(entitlementId, company) {
		const ent = await this.paidEntitlement(entitlementId);
		this.checkActive(ent);
		const name = company.trim().toLowerCase().slice(0, 200);
		if (!name) throw new PaymentError(400, "bad_company", "Company name required.");
		const plan = getPlan(ent.planId);
		if ((ent.formFillsLeft ?? 0) <= 0) throw new PaymentError(402, "no_credits", "No form-fill credits left on this plan.");
		const companies = ent.companies ?? [];
		const pending = ent.pendingFills ?? {};
		const known = companies.includes(name) || Object.values(pending).includes(name);
		if (plan.companyLimit > 0 && !known && companies.length + new Set(Object.values(pending)).size >= plan.companyLimit) throw new PaymentError(402, "company_limit", `Company limit (${plan.companyLimit}) reached for this plan.`);
		const reservationId = newId("fill");
		const updated = {
			...ent,
			formFillsLeft: (ent.formFillsLeft ?? 0) - 1,
			pendingFills: {
				...pending,
				[reservationId]: name
			}
		};
		if (plan.singleUse) updated.cvGenerationsLeft = 0;
		await this.store.putEntitlement(updated);
		return {
			reservationId,
			credits: this.credits(updated)
		};
	}
	async completeFormFill(entitlementId, reservationId, success) {
		const ent = await this.paidEntitlement(entitlementId);
		const pending = { ...ent.pendingFills ?? {} };
		const company = pending[reservationId];
		if (!company) throw new PaymentError(404, "no_reservation", "Unknown form-fill reservation.");
		delete pending[reservationId];
		const plan = getPlan(ent.planId);
		const updated = {
			...ent,
			pendingFills: pending
		};
		if (success) {
			const companies = ent.companies ?? [];
			updated.companies = companies.includes(company) ? companies : [...companies, company];
		} else {
			updated.formFillsLeft = (ent.formFillsLeft ?? 0) + 1;
			if (plan.singleUse && (ent.chargedVersions ?? []).length === 0) updated.cvGenerationsLeft = plan.cvGenerations;
		}
		await this.store.putEntitlement(updated);
		return {
			success,
			refunded: !success,
			credits: this.credits(updated)
		};
	}
	/** TEST ONLY: simulate the provider completing (or not) a payment for an order. */
	async simulate(orderId, outcome) {
		const sim = this.cfg.simulated;
		if (!sim || this.cfg.live) throw new PaymentError(404, "not_found", "Not found.");
		const order = await this.store.getOrder(orderId);
		if (!order || order.provider !== "simulated") throw new PaymentError(404, "no_order", "Unknown order.");
		if (outcome === "cancel") return this.cancelOrder(orderId);
		const paymentId = `sim_pay:${outcome === "success" ? "ok" : "fail"}:${order.amountMinor}:${order.currency}:${randomBytes(6).toString("hex")}`;
		return this.verifyPayment(orderId, paymentId, sim.sign(order.providerOrderId, paymentId));
	}
};
/**
* Request -> Response handlers for /api/paid-export/*. Framework-agnostic so
* they are unit-testable and can be mounted by TanStack Start routes or any
* other Node/edge server.
*/
var singleton = null;
function paymentService() {
	if (!singleton) {
		const sb = supabaseFromEnv();
		singleton = new PaymentService(configFromEnv(processModule.env), sb ? new SupabasePaymentStore(new SupabaseRest(sb)) : void 0);
	}
	return singleton;
}
var MAX_BODY = 3e6;
function json$3(status, body) {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			"content-type": "application/json",
			"cache-control": "no-store"
		}
	});
}
async function readJson(request) {
	const text = await request.text();
	if (text.length > MAX_BODY) throw new PaymentError(413, "too_large", "Request too large.");
	try {
		const v = JSON.parse(text);
		if (!v || typeof v !== "object") throw new Error();
		return v;
	} catch {
		throw new PaymentError(400, "bad_json", "Invalid JSON.");
	}
}
var ENUMS = {
	template: [
		"meridian",
		"consulate",
		"atlas"
	],
	locale: [
		"en",
		"fr",
		"de",
		"es"
	],
	dateStyle: [
		"dmy",
		"mdy",
		"iso"
	],
	nameOrder: ["given-family", "family-given"],
	paper: ["a4", "letter"]
};
/** Normalise untrusted CV input into the canonical shape the generators expect. */
function parseDoc(body) {
	const docId = typeof body.docId === "string" ? body.docId : "";
	const rawSettings = body.settings ?? {};
	const settings = defaultSettings();
	for (const key of Object.keys(ENUMS)) {
		const v = rawSettings[key];
		if (v !== void 0) {
			if (typeof v !== "string" || !ENUMS[key].includes(v)) throw new PaymentError(400, "bad_settings", `Invalid ${key}.`);
			settings[key] = v;
		}
	}
	const raw = body.profile;
	if (!raw || typeof raw !== "object" || !raw.personal || typeof raw.personal !== "object") throw new PaymentError(400, "bad_profile", "Invalid CV data.");
	const arr = (v) => Array.isArray(v) ? v : [];
	return {
		docId,
		profile: {
			personal: {
				...emptyPersonal(),
				...raw.personal
			},
			experience: arr(raw.experience),
			education: arr(raw.education),
			skills: arr(raw.skills).filter((s) => typeof s === "string"),
			languages: arr(raw.languages),
			certifications: arr(raw.certifications),
			children: arr(raw.children),
			travel: arr(raw.travel)
		},
		settings
	};
}
function fail$2(error) {
	if (error instanceof PaymentError) return json$3(error.status, {
		error: error.code,
		message: error.message
	});
	console.error("[paid-export]", error);
	return json$3(500, {
		error: "server_error",
		message: "Something went wrong. Nothing was charged twice; please retry."
	});
}
function publicOrder(o) {
	return {
		orderId: o.orderId,
		status: o.status,
		amountMinor: o.amountMinor,
		currency: o.currency,
		test: o.test,
		provider: o.provider,
		providerOrderId: o.providerOrderId,
		entitlementId: o.status === "paid" ? o.entitlementId : void 0
	};
}
async function handleStatus(_req, svc = paymentService()) {
	return json$3(200, svc.status());
}
async function handleCreateOrder(req, svc = paymentService()) {
	try {
		const body = await readJson(req);
		const doc = parseDoc(body);
		const { order, reused, publicKey } = await svc.createOrder(doc, String(body.idempotencyKey ?? ""), typeof body.planId === "string" ? body.planId : void 0);
		return json$3(reused ? 200 : 201, {
			...publicOrder(order),
			reused,
			publicKey
		});
	} catch (e) {
		return fail$2(e);
	}
}
async function handleVerify(req, svc = paymentService()) {
	try {
		const body = await readJson(req);
		return json$3(200, publicOrder(await svc.verifyPayment(String(body.orderId ?? ""), String(body.paymentId ?? ""), String(body.signature ?? ""))));
	} catch (e) {
		return fail$2(e);
	}
}
async function handleCancel(req, svc = paymentService()) {
	try {
		const body = await readJson(req);
		return json$3(200, publicOrder(await svc.cancelOrder(String(body.orderId ?? ""))));
	} catch (e) {
		return fail$2(e);
	}
}
/** TEST ONLY — 404 unless TRIAL_MODE is on, NODE_ENV isn't production and no live provider is set. */
async function handleSimulate(req, svc = paymentService()) {
	try {
		const body = await readJson(req);
		const outcome = body.outcome === "success" || body.outcome === "failure" || body.outcome === "cancel" ? body.outcome : null;
		if (!outcome) throw new PaymentError(400, "bad_outcome", "outcome must be success|failure|cancel");
		return json$3(200, publicOrder(await svc.simulate(String(body.orderId ?? ""), outcome)));
	} catch (e) {
		return fail$2(e);
	}
}
async function handleWebhook(req, provider, svc = paymentService()) {
	try {
		const raw = await req.text();
		if (raw.length > MAX_BODY) throw new PaymentError(413, "too_large", "Request too large.");
		const signature = req.headers.get("x-razorpay-signature") ?? req.headers.get("x-simulated-signature");
		return json$3(200, await svc.handleWebhook(provider, raw, signature, req.headers.get("x-razorpay-event-id")));
	} catch (e) {
		return fail$2(e);
	}
}
/** The ONLY route that returns a clean PDF/DOCX. Built from canonical CV data, gated by a server entitlement. */
async function handleCleanExport(req, svc = paymentService()) {
	try {
		const body = await readJson(req);
		const format = body.format === "docx" ? "docx" : body.format === "pdf" ? "pdf" : null;
		if (!format) throw new PaymentError(400, "bad_format", "format must be pdf or docx");
		const doc = parseDoc(body);
		const ent = await svc.authorizeCleanExport(typeof body.entitlementId === "string" ? body.entitlementId : void 0, doc);
		const name = fileBase(doc.profile, doc.settings);
		const headers = {
			"cache-control": "no-store",
			"x-entitlement-test": String(ent.test),
			"x-downloads-used": String(ent.downloads)
		};
		const out = await exportGuard.run(async () => format === "pdf" ? buildPdf(doc.profile, doc.settings).output("arraybuffer") : await buildDocxBuffer(doc.profile, doc.settings));
		if (out === null) return busyResponse();
		if (format === "pdf") return new Response(out, {
			status: 200,
			headers: {
				...headers,
				"content-type": "application/pdf",
				"content-disposition": `attachment; filename="${name}.pdf"`
			}
		});
		return new Response(new Uint8Array(out), {
			status: 200,
			headers: {
				...headers,
				"content-type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
				"content-disposition": `attachment; filename="${name}.docx"`
			}
		});
	} catch (e) {
		return fail$2(e);
	}
}
async function handleCredits(req, svc = paymentService()) {
	try {
		const body = await readJson(req);
		return json$3(200, await svc.getCredits(typeof body.entitlementId === "string" ? body.entitlementId : void 0));
	} catch (e) {
		return fail$2(e);
	}
}
/** Form filler: reserve one credit before filling. */
async function handleFormFillStart(req, svc = paymentService()) {
	try {
		const body = await readJson(req);
		return json$3(200, await svc.startFormFill(typeof body.entitlementId === "string" ? body.entitlementId : void 0, String(body.company ?? "")));
	} catch (e) {
		return fail$2(e);
	}
}
/** Form filler: report the outcome. success=false refunds the credit. */
async function handleFormFillComplete(req, svc = paymentService()) {
	try {
		const body = await readJson(req);
		return json$3(200, await svc.completeFormFill(typeof body.entitlementId === "string" ? body.entitlementId : void 0, String(body.reservationId ?? ""), body.success === true));
	} catch (e) {
		return fail$2(e);
	}
}
var b64 = (b) => b.toString("base64url");
var UnlockTokens = class {
	used = /* @__PURE__ */ new Map();
	issued = /* @__PURE__ */ new Map();
	secret;
	ttlMs;
	dailyCap;
	constructor(secret, ttlMs, dailyCap) {
		this.secret = secret;
		this.ttlMs = ttlMs;
		this.dailyCap = dailyCap;
		if (!secret || secret.length < 16) throw new Error("AD_UNLOCK_SECRET missing or too short");
	}
	sign(data) {
		return createHmac("sha256", this.secret).update(data).digest();
	}
	day(now) {
		return new Date(now).toISOString().slice(0, 10);
	}
	sweep(now) {
		for (const [n, exp] of this.used) if (exp < now) this.used.delete(n);
		const today = this.day(now);
		for (const k of this.issued.keys()) if (!k.startsWith(today)) this.issued.delete(k);
	}
	/** Returns a token, or null when the daily cap for this guest or IP is reached. */
	issue(guest, ip, now = Date.now()) {
		this.sweep(now);
		const keys = [`${this.day(now)}|g|${guest}`, `${this.day(now)}|ip|${ip}`];
		if (keys.some((k) => (this.issued.get(k) ?? 0) >= this.dailyCap)) return null;
		keys.forEach((k) => this.issued.set(k, (this.issued.get(k) ?? 0) + 1));
		const payload = {
			g: guest,
			n: b64(randomBytes(16)),
			exp: now + this.ttlMs
		};
		const body = b64(Buffer.from(JSON.stringify(payload)));
		return `${body}.${b64(this.sign(body))}`;
	}
	/** Verifies and consumes a token. Returns the reason on failure. */
	redeem(token, guest, now = Date.now()) {
		const [body, sig] = String(token ?? "").split(".");
		if (!body || !sig) return {
			ok: false,
			reason: "malformed"
		};
		const want = this.sign(body);
		const got = Buffer.from(sig, "base64url");
		if (got.length !== want.length || !timingSafeEqual(got, want)) return {
			ok: false,
			reason: "signature"
		};
		let p;
		try {
			p = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
		} catch {
			return {
				ok: false,
				reason: "malformed"
			};
		}
		if (typeof p.exp !== "number" || p.exp < now) return {
			ok: false,
			reason: "expired"
		};
		if (p.g !== guest) return {
			ok: false,
			reason: "guest"
		};
		if (this.used.has(p.n)) return {
			ok: false,
			reason: "used"
		};
		this.used.set(p.n, p.exp);
		return { ok: true };
	}
};
var tokensSingleton;
function envTokens() {
	if (tokensSingleton === void 0) {
		const secret = processModule.env.AD_UNLOCK_SECRET ?? "";
		tokensSingleton = secret.length >= 16 ? new UnlockTokens(secret, WATCH_AD_UNLOCK.ttlMs, WATCH_AD_UNLOCK.dailyCap) : null;
	}
	return tokensSingleton;
}
var json$2 = (status, body) => new Response(JSON.stringify(body), {
	status,
	headers: {
		"content-type": "application/json",
		"cache-control": "no-store"
	}
});
function setup(opts) {
	const enabled = opts.enabled ?? WATCH_AD_UNLOCK.enabled;
	const tokens = opts.tokens === void 0 ? envTokens() : opts.tokens;
	return enabled && tokens ? tokens : null;
}
var guestOf = (req, body) => String(body.guestId ?? req.headers.get("x-guest-id") ?? "").trim().slice(0, 80);
async function body$2(req) {
	const text = await req.text();
	if (text.length > 3e6) return {};
	try {
		const v = JSON.parse(text);
		return v && typeof v === "object" ? v : {};
	} catch {
		return {};
	}
}
function handleUnlockStatus(_req, opts = {}) {
	return setup(opts) ? json$2(200, { enabled: true }) : json$2(404, { error: "not_found" });
}
/** Called after the rewarded ad reports "granted". Issues one signed, one-time token. */
async function handleUnlockGrant(req, opts = {}) {
	const tokens = setup(opts);
	if (!tokens) return json$2(404, { error: "not_found" });
	const guest = guestOf(req, await body$2(req));
	if (!guest) return json$2(400, { error: "guest_required" });
	const token = tokens.issue(guest, clientIp(req.headers));
	return token ? json$2(200, { token }) : json$2(429, { error: "daily_limit" });
}
/** Redeems a token for ONE clean PDF/DOCX. */
async function handleUnlockDownload(req, opts = {}) {
	const tokens = setup(opts);
	if (!tokens) return json$2(404, { error: "not_found" });
	const b = await body$2(req);
	const format = b.format === "docx" ? "docx" : b.format === "pdf" ? "pdf" : null;
	if (!format) return json$2(400, { error: "bad_format" });
	const result = tokens.redeem(String(b.token ?? ""), guestOf(req, b));
	if (!result.ok) return json$2(403, { error: `token_${result.reason}` });
	const doc = parseDoc(b);
	const name = fileBase(doc.profile, doc.settings);
	const out = await exportGuard.run(async () => format === "pdf" ? buildPdf(doc.profile, doc.settings).output("arraybuffer") : await buildDocxBuffer(doc.profile, doc.settings));
	if (out === null) return busyResponse();
	const type = format === "pdf" ? "application/pdf" : "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
	return new Response(format === "pdf" ? out : new Uint8Array(out), {
		status: 200,
		headers: {
			"content-type": type,
			"cache-control": "no-store",
			"content-disposition": `attachment; filename="${name}.${format}"`
		}
	});
}
var notFound$2 = () => new Response(JSON.stringify({ error: "not_found" }), {
	status: 404,
	headers: { "content-type": "application/json" }
});
/** Opt-in rewarded-ad free download. 404 unless WATCH_AD_UNLOCK.enabled and AD_UNLOCK_SECRET are set. */
var Route$3 = createFileRoute("/api/ad-unlock/$")({ server: { handlers: {
	GET: async ({ request, params }) => params._splat === "status" ? handleUnlockStatus(request) : notFound$2(),
	POST: async ({ request, params }) => {
		if (params._splat === "grant") return handleUnlockGrant(request);
		if (params._splat === "download") return handleUnlockDownload(request);
		return notFound$2();
	}
} } });
/** Supabase-backed ClientStore. Server-only (service_role); RLS has no anon policies. */
var SupabaseClientStore = class {
	db;
	constructor(db) {
		this.db = db;
	}
	async putLink(l) {
		await this.db.upsert("cv_client_links", {
			token: l.token,
			owner_entitlement_id: l.ownerEntitlementId,
			revoked: !!l.revoked,
			data: l
		});
	}
	async getLink(token) {
		return (await this.db.select("cv_client_links", `select=data&token=${eq(token)}&limit=1`))[0]?.data;
	}
	async linksByOwner(owner) {
		return (await this.db.select("cv_client_links", `select=data&owner_entitlement_id=${eq(owner)}`)).map((r) => r.data);
	}
	async putClient(c) {
		await this.db.upsert("cv_client_submissions", {
			client_id: c.clientId,
			token: c.token,
			owner_entitlement_id: c.ownerEntitlementId,
			submitted_at: new Date(c.submittedAt).toISOString(),
			data: c
		});
	}
	async clientsByOwner(owner) {
		return (await this.db.select("cv_client_submissions", `select=data&owner_entitlement_id=${eq(owner)}`)).map((r) => r.data);
	}
	async getClient(id) {
		return (await this.db.select("cv_client_submissions", `select=data&client_id=${eq(id)}&limit=1`))[0]?.data;
	}
	async deleteClient(id) {
		return (await this.db.delete("cv_client_submissions", `client_id=${eq(id)}`)).length > 0;
	}
	async purgeOlderThan(cutoff) {
		return (await this.db.delete("cv_client_submissions", `submitted_at=lt.${encodeURIComponent(new Date(cutoff).toISOString())}`)).length;
	}
};
var FileClientStore = class {
	file;
	links = /* @__PURE__ */ new Map();
	clients = /* @__PURE__ */ new Map();
	constructor(file) {
		this.file = file;
		if (!file) return;
		try {
			const snap = JSON.parse(readFileSync(file, "utf8"));
			for (const l of snap.links ?? []) this.links.set(l.token, l);
			for (const c of snap.clients ?? []) this.clients.set(c.clientId, c);
		} catch {}
	}
	flush() {
		if (!this.file) return;
		try {
			mkdirSync(dirname(this.file), { recursive: true });
			const tmp = `${this.file}.tmp`;
			writeFileSync(tmp, JSON.stringify({
				links: [...this.links.values()],
				clients: [...this.clients.values()]
			}));
			renameSync(tmp, this.file);
		} catch (e) {
			console.error("[clients] could not write snapshot", e);
		}
	}
	async putLink(link) {
		this.links.set(link.token, { ...link });
		this.flush();
	}
	async getLink(token) {
		const l = this.links.get(token);
		return l ? { ...l } : void 0;
	}
	async linksByOwner(owner) {
		return [...this.links.values()].filter((l) => l.ownerEntitlementId === owner).map((l) => ({ ...l }));
	}
	async putClient(c) {
		this.clients.set(c.clientId, structuredClone(c));
		this.flush();
	}
	async clientsByOwner(owner) {
		return [...this.clients.values()].filter((c) => c.ownerEntitlementId === owner).map((c) => structuredClone(c));
	}
	async getClient(id) {
		const c = this.clients.get(id);
		return c ? structuredClone(c) : void 0;
	}
	async deleteClient(id) {
		const ok = this.clients.delete(id);
		if (ok) this.flush();
		return ok;
	}
	async purgeOlderThan(cutoff) {
		let n = 0;
		for (const [k, c] of this.clients) if (c.submittedAt < cutoff) {
			this.clients.delete(k);
			n++;
		}
		if (n) this.flush();
		return n;
	}
};
/** Fields a client may submit — existing Personal model fields used by the form filler. No new semantics. */
var CLIENT_PERSONAL_FIELDS = [
	"givenName",
	"familyName",
	"fatherName",
	"motherName",
	"dateOfBirth",
	"placeOfBirth",
	"sex",
	"maritalStatus",
	"nationality",
	"email",
	"phoneCode",
	"phone",
	"street",
	"city",
	"region",
	"postalCode",
	"country",
	"nationalId",
	"passportNumber",
	"positionApplied"
];
var EDU_FIELDS = [
	"institution",
	"qualification",
	"field",
	"start",
	"end",
	"details"
];
var store$1 = null;
function clientStore() {
	if (!store$1) {
		const sb = supabaseFromEnv();
		store$1 = sb ? new SupabaseClientStore(new SupabaseRest(sb)) : new FileClientStore(processModule.env.CLIENTS_STORE_FILE || join(tmpdir(), "cvstudio-clients.json"));
	}
	return store$1;
}
function json$1(status, body) {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			"content-type": "application/json",
			"cache-control": "no-store"
		}
	});
}
var id$1 = (p, n = 24) => `${p}_${randomBytes(n).toString("base64url")}`;
var str$1 = (v, max = 300) => typeof v === "string" ? v.trim().slice(0, max) : "";
async function body$1(req) {
	const t = await req.text();
	if (t.length > 1e5) throw new PaymentError(413, "too_large", "Request too large.");
	try {
		const v = JSON.parse(t);
		if (v && typeof v === "object") return v;
	} catch {}
	throw new PaymentError(400, "bad_json", "Invalid JSON.");
}
function fail$1(e) {
	if (e instanceof PaymentError) return json$1(e.status, {
		error: e.code,
		message: e.message
	});
	console.error("[clients]", e);
	return json$1(500, {
		error: "server_error",
		message: "Something went wrong."
	});
}
/** Sanitise an untrusted client submission into a Profile using only existing model fields. */
function sanitizeClient(raw) {
	const p = raw.personal ?? {};
	const personal = emptyPersonal();
	for (const k of CLIENT_PERSONAL_FIELDS) personal[k] = str$1(p[k]);
	return {
		personal,
		experience: [],
		education: (Array.isArray(raw.education) ? raw.education.slice(0, 6) : []).map((e) => {
			const r = e ?? {};
			const out = emptyEducation();
			for (const k of EDU_FIELDS) out[k] = str$1(r[k]);
			return out;
		}).filter((e) => e.institution || e.qualification),
		skills: [],
		languages: [],
		certifications: [],
		children: [],
		travel: []
	};
}
var lastPurge$1 = 0;
async function purgeExpired$1(st, now = Date.now()) {
	if (now - lastPurge$1 < 36e5) return;
	lastPurge$1 = now;
	const n = await st.purgeOlderThan(now - 15552e6);
	if (n) console.log(`[clients] retention purge removed ${n} record(s)`);
}
async function handleClients(req, path, svc = paymentService(), st = clientStore()) {
	try {
		await purgeExpired$1(st).catch((e) => console.error("[clients] purge failed", e));
		if (req.method === "GET" && path.startsWith("intake/")) {
			const link = await st.getLink(path.slice(7));
			if (!link || link.revoked) return json$1(404, {
				error: "not_found",
				message: "This link is not valid."
			});
			return json$1(200, { businessName: link.businessName });
		}
		if (req.method !== "POST" && req.method !== "DELETE") return json$1(404, { error: "not_found" });
		const b = await body$1(req);
		if (req.method === "DELETE") {
			if (path === "self") {
				const c = await st.getClient(str$1(b.clientId, 100));
				const key = str$1(b.deleteKey, 100);
				if (!c || !c.deleteKey || !key || c.deleteKey !== key) throw new PaymentError(404, "not_found", "Record not found (it may already be deleted).");
				await st.deleteClient(c.clientId);
				return json$1(200, {
					ok: true,
					deleted: true
				});
			}
			const owner = await svc.commercialOwner(str$1(b.entitlementId, 200) || void 0);
			if (path === "client") {
				const c = await st.getClient(str$1(b.clientId, 100));
				if (!c || c.ownerEntitlementId !== owner.entitlementId) throw new PaymentError(404, "not_found", "Client not found.");
				await st.deleteClient(c.clientId);
				return json$1(200, {
					ok: true,
					deleted: true
				});
			}
			if (path === "link") {
				const links = (await st.linksByOwner(owner.entitlementId)).filter((l) => !l.revoked);
				for (const l of links) await st.putLink({
					...l,
					revoked: true
				});
				return json$1(200, {
					ok: true,
					revoked: links.length
				});
			}
			return json$1(404, { error: "not_found" });
		}
		if (path === "submit") {
			const link = await st.getLink(str$1(b.token, 100));
			if (!link || link.revoked) throw new PaymentError(404, "not_found", "This link is not valid.");
			await svc.commercialOwner(link.ownerEntitlementId).catch(() => {
				throw new PaymentError(404, "not_found", "This link is no longer active.");
			});
			if (b.consent !== true) throw new PaymentError(400, "consent_required", "Please tick the consent box.");
			const profile = sanitizeClient(b.profile ?? {});
			const name = [profile.personal.givenName, profile.personal.familyName].filter(Boolean).join(" ").trim();
			if (!profile.personal.givenName) throw new PaymentError(400, "name_required", "Name is required.");
			const now = Date.now();
			const clientId = id$1("cli");
			const deleteKey = id$1("del", 18);
			await st.putClient({
				clientId,
				token: link.token,
				ownerEntitlementId: link.ownerEntitlementId,
				name,
				profile,
				consentAt: now,
				submittedAt: now,
				deleteKey
			});
			return json$1(201, {
				ok: true,
				clientId,
				deleteKey,
				retentionDays: 180
			});
		}
		const ent = await svc.commercialOwner(str$1(b.entitlementId, 200) || void 0);
		if (path === "link") {
			const existing = (await st.linksByOwner(ent.entitlementId)).find((l) => !l.revoked);
			const businessName = str$1(b.businessName, 80) || existing?.businessName || "FormZalo business";
			let link = existing;
			if (!link || b.rotate === true) {
				if (link) await st.putLink({
					...link,
					revoked: true
				});
				link = {
					token: id$1("c", 18),
					ownerEntitlementId: ent.entitlementId,
					ownerGuestId: str$1(b.guestId, 80),
					businessName,
					createdAt: Date.now()
				};
			} else link = {
				...link,
				businessName
			};
			await st.putLink(link);
			return json$1(200, {
				token: link.token,
				path: `/c/${link.token}`,
				businessName: link.businessName
			});
		}
		if (path === "list") return json$1(200, { clients: (await st.clientsByOwner(ent.entitlementId)).sort((a, c) => c.submittedAt - a.submittedAt).map((c) => ({
			clientId: c.clientId,
			name: c.name,
			submittedAt: c.submittedAt
		})) });
		if (path === "get") {
			const c = await st.getClient(str$1(b.clientId, 100));
			if (!c || c.ownerEntitlementId !== ent.entitlementId) throw new PaymentError(404, "not_found", "Client not found.");
			return json$1(200, {
				clientId: c.clientId,
				name: c.name,
				submittedAt: c.submittedAt,
				profile: c.profile
			});
		}
		return json$1(404, { error: "not_found" });
	} catch (e) {
		return fail$1(e);
	}
}
/** Commercial "Clients" API: owner link/list/get (entitlement-gated) + public intake/submit by token. */
var Route$2 = createFileRoute("/api/clients/$")({ server: { handlers: {
	GET: async ({ request, params }) => handleClients(request, params._splat ?? ""),
	POST: async ({ request, params }) => handleClients(request, params._splat ?? ""),
	DELETE: async ({ request, params }) => handleClients(request, params._splat ?? "")
} } });
var FileComplaintStore = class {
	file;
	complaints = /* @__PURE__ */ new Map();
	constructor(file) {
		this.file = file;
		if (!file) return;
		try {
			const snap = JSON.parse(readFileSync(file, "utf8"));
			for (const c of snap.complaints ?? []) this.complaints.set(c.complaintId, c);
		} catch {}
	}
	flush() {
		if (!this.file) return;
		try {
			mkdirSync(dirname(this.file), { recursive: true });
			const tmp = `${this.file}.tmp`;
			writeFileSync(tmp, JSON.stringify({ complaints: [...this.complaints.values()] }));
			renameSync(tmp, this.file);
		} catch (e) {
			console.error("[complaints] could not write snapshot", e);
		}
	}
	async putComplaint(c) {
		this.complaints.set(c.complaintId, { ...c });
		this.flush();
	}
	async listComplaints() {
		return [...this.complaints.values()].map((c) => ({ ...c }));
	}
	async getComplaint(id) {
		const c = this.complaints.get(id);
		return c ? { ...c } : void 0;
	}
	async resolveComplaint(id, at) {
		const c = this.complaints.get(id);
		if (!c) return false;
		this.complaints.set(id, {
			...c,
			status: "resolved",
			resolvedAt: at
		});
		this.flush();
		return true;
	}
	async purgeOlderThan(cutoff) {
		let n = 0;
		for (const [k, c] of this.complaints) if (c.submittedAt < cutoff) {
			this.complaints.delete(k);
			n++;
		}
		if (n) this.flush();
		return n;
	}
};
var COMPLAINT_TYPES = [
	"not-working",
	"payment",
	"other"
];
var store = null;
function complaintStore() {
	if (!store) store = new FileComplaintStore(processModule.env.COMPLAINTS_STORE_FILE || join(tmpdir(), "formzalo-complaints.json"));
	return store;
}
function json(status, body) {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			"content-type": "application/json",
			"cache-control": "no-store"
		}
	});
}
var id = (p, n = 24) => `${p}_${randomBytes(n).toString("base64url")}`;
var str = (v, max = 2e3) => typeof v === "string" ? v.trim().slice(0, max) : "";
var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
async function body(req) {
	const t = await req.text();
	if (t.length > 1e5) throw new PaymentError(413, "too_large", "Request too large.");
	try {
		const v = JSON.parse(t);
		if (v && typeof v === "object") return v;
	} catch {}
	throw new PaymentError(400, "bad_json", "Invalid JSON.");
}
function fail(e) {
	if (e instanceof PaymentError) return json(e.status, {
		error: e.code,
		message: e.message
	});
	console.error("[complaints]", e);
	return json(500, {
		error: "server_error",
		message: "Something went wrong."
	});
}
/** Validate an untrusted report submission; throws PaymentError(400) on bad input. */
function sanitizeComplaint(raw) {
	const type = str(raw.type, 50);
	if (!COMPLAINT_TYPES.includes(type)) throw new PaymentError(400, "bad_type", "Choose an issue type.");
	const name = str(raw.name, 100);
	if (!name) throw new PaymentError(400, "name_required", "Name is required.");
	const email = str(raw.email, 200);
	if (!EMAIL_RE.test(email)) throw new PaymentError(400, "bad_email", "Enter a valid email address.");
	const message = str(raw.message, 2e3);
	if (message.length < 10) throw new PaymentError(400, "message_too_short", "Describe what happened (at least 10 characters).");
	if (raw.consent !== true) throw new PaymentError(400, "consent_required", "Please tick the consent box.");
	return {
		type,
		name,
		email,
		message
	};
}
/** DPDP retention: reports are auto-deleted after this many days. */
var lastPurge = 0;
async function purgeExpired(st, now = Date.now()) {
	if (now - lastPurge < 36e5) return;
	lastPurge = now;
	const n = await st.purgeOlderThan(now - 15552e6);
	if (n) console.log(`[complaints] retention purge removed ${n} record(s)`);
}
/** Owner gate: a valid Commercial-plan entitlement, like the clients list. */
async function owner(svc, entitlementId) {
	try {
		return await svc.commercialOwner(typeof entitlementId === "string" ? entitlementId : void 0);
	} catch {
		throw new PaymentError(403, "not_commercial", "Problem reports are available only on an active Commercial plan.");
	}
}
async function handleComplaints(req, path, svc = paymentService(), st = complaintStore()) {
	try {
		await purgeExpired(st).catch((e) => console.error("[complaints] purge failed", e));
		if (req.method !== "POST") return json(404, { error: "not_found" });
		const b = await body(req);
		if (path === "submit") {
			const c = sanitizeComplaint(b);
			const complaintId = id("cmp");
			await st.putComplaint({
				...c,
				complaintId,
				status: "new",
				submittedAt: Date.now()
			});
			return json(201, {
				ok: true,
				complaintId,
				retentionDays: 180
			});
		}
		await owner(svc, b.entitlementId);
		if (path === "list") {
			const list = await st.listComplaints();
			list.sort((a, c) => c.submittedAt - a.submittedAt);
			return json(200, { complaints: list });
		}
		if (path === "resolve") {
			if (!await st.resolveComplaint(str(b.complaintId, 100), Date.now())) throw new PaymentError(404, "not_found", "Report not found.");
			return json(200, {
				ok: true,
				resolved: true
			});
		}
		return json(404, { error: "not_found" });
	} catch (e) {
		return fail(e);
	}
}
/** Public problem reports: submit (any visitor) + owner list/resolve (Commercial plan). */
var Route$1 = createFileRoute("/api/complaints/$")({ server: { handlers: {
	GET: async ({ request, params }) => handleComplaints(request, params._splat ?? ""),
	POST: async ({ request, params }) => handleComplaints(request, params._splat ?? "")
} } });
/**
* Server-only API for the one-time paid export. Every clean PDF/DOCX in the
* app is produced by POST /api/paid-export/download and nowhere else.
*/
var notFound$1 = () => new Response(JSON.stringify({ error: "not_found" }), {
	status: 404,
	headers: { "content-type": "application/json" }
});
var Route = createFileRoute("/api/paid-export/$")({ server: { handlers: {
	GET: async ({ request, params }) => params._splat === "status" ? handleStatus(request) : notFound$1(),
	POST: async ({ request, params }) => {
		const path = params._splat ?? "";
		if (path === "order") return handleCreateOrder(request);
		if (path === "verify") return handleVerify(request);
		if (path === "cancel") return handleCancel(request);
		if (path === "simulate") return handleSimulate(request);
		if (path === "credits") return handleCredits(request);
		if (path === "formfill/start") return handleFormFillStart(request);
		if (path === "formfill/complete") return handleFormFillComplete(request);
		if (path === "download") return handleCleanExport(request);
		if (path === "webhook/razorpay") return handleWebhook(request, "razorpay");
		if (path === "webhook/simulated") return handleWebhook(request, "simulated");
		return notFound$1();
	}
} } });
var IndexRoute = Route$31.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$32
});
var AboutRoute = Route$30.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$32
});
var ContactRoute = Route$29.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$32
});
var CvMakerRoute = Route$28.update({
	id: "/cv-maker",
	path: "/cv-maker",
	getParentRoute: () => Route$32
});
var DashboardRoute = Route$27.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => Route$32
});
var FaqRoute = Route$26.update({
	id: "/faq",
	path: "/faq",
	getParentRoute: () => Route$32
});
var NextStepsRoute = Route$25.update({
	id: "/next-steps",
	path: "/next-steps",
	getParentRoute: () => Route$32
});
var PrivacyRoute = Route$24.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$32
});
var PrivacyPolicyRoute = Route$23.update({
	id: "/privacy-policy",
	path: "/privacy-policy",
	getParentRoute: () => Route$32
});
var RefundPolicyRoute = Route$22.update({
	id: "/refund-policy",
	path: "/refund-policy",
	getParentRoute: () => Route$32
});
var ReportRoute = Route$21.update({
	id: "/report",
	path: "/report",
	getParentRoute: () => Route$32
});
var ServicesRoute = Route$20.update({
	id: "/services",
	path: "/services",
	getParentRoute: () => Route$32
});
var TemplatesRoute = Route$19.update({
	id: "/templates",
	path: "/templates",
	getParentRoute: () => Route$32
});
var TermsRoute = Route$18.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => Route$32
});
var ArCvMakerRoute = Route$17.update({
	id: "/ar/cv-maker",
	path: "/ar/cv-maker",
	getParentRoute: () => Route$32
});
var CTokenRoute = Route$16.update({
	id: "/c/$token",
	path: "/c/$token",
	getParentRoute: () => Route$32
});
var DeCvMakerRoute = Route$15.update({
	id: "/de/cv-maker",
	path: "/de/cv-maker",
	getParentRoute: () => Route$32
});
var EsCvMakerRoute = Route$14.update({
	id: "/es/cv-maker",
	path: "/es/cv-maker",
	getParentRoute: () => Route$32
});
var FrCvMakerRoute = Route$13.update({
	id: "/fr/cv-maker",
	path: "/fr/cv-maker",
	getParentRoute: () => Route$32
});
var GuidesIndexRoute = Route$12.update({
	id: "/guides/",
	path: "/guides/",
	getParentRoute: () => Route$32
});
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	ContactRoute,
	CvMakerRoute,
	DashboardRoute,
	FaqRoute,
	NextStepsRoute,
	PrivacyRoute,
	PrivacyPolicyRoute,
	RefundPolicyRoute,
	ReportRoute,
	ServicesRoute,
	TemplatesRoute,
	TermsRoute,
	ArCvMakerRoute,
	CTokenRoute,
	DeCvMakerRoute,
	EsCvMakerRoute,
	FrCvMakerRoute,
	GuidesSlugRoute: Route$11.update({
		id: "/guides/$slug",
		path: "/guides/$slug",
		getParentRoute: () => Route$32
	}),
	HiCvMakerRoute: Route$10.update({
		id: "/hi/cv-maker",
		path: "/hi/cv-maker",
		getParentRoute: () => Route$32
	}),
	ItCvMakerRoute: Route$9.update({
		id: "/it/cv-maker",
		path: "/it/cv-maker",
		getParentRoute: () => Route$32
	}),
	JaCvMakerRoute: Route$8.update({
		id: "/ja/cv-maker",
		path: "/ja/cv-maker",
		getParentRoute: () => Route$32
	}),
	PlCvMakerRoute: Route$7.update({
		id: "/pl/cv-maker",
		path: "/pl/cv-maker",
		getParentRoute: () => Route$32
	}),
	PtCvMakerRoute: Route$6.update({
		id: "/pt/cv-maker",
		path: "/pt/cv-maker",
		getParentRoute: () => Route$32
	}),
	RuCvMakerRoute: Route$5.update({
		id: "/ru/cv-maker",
		path: "/ru/cv-maker",
		getParentRoute: () => Route$32
	}),
	ZhCnCvMakerRoute: Route$4.update({
		id: "/zh-cn/cv-maker",
		path: "/zh-cn/cv-maker",
		getParentRoute: () => Route$32
	}),
	GuidesIndexRoute,
	ApiAdUnlockSplatRoute: Route$3.update({
		id: "/api/ad-unlock/$",
		path: "/api/ad-unlock/$",
		getParentRoute: () => Route$32
	}),
	ApiClientsSplatRoute: Route$2.update({
		id: "/api/clients/$",
		path: "/api/clients/$",
		getParentRoute: () => Route$32
	}),
	ApiComplaintsSplatRoute: Route$1.update({
		id: "/api/complaints/$",
		path: "/api/complaints/$",
		getParentRoute: () => Route$32
	}),
	ApiPaidExportSplatRoute: Route.update({
		id: "/api/paid-export/$",
		path: "/api/paid-export/$",
		getParentRoute: () => Route$32
	})
};
var routeTree = Route$32._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { emptyPersonal as $, c$2 as A, COPY as B, p$7 as C, p$10 as D, Route$16 as E, ADSENSE_PUB_ID as F, addressLines as G, SAMPLE_CV as H, WATCH_AD_UNLOCK as I, displayName as J, defaultSettings as K, adAllowed as L, InfoPage as M, c$3 as N, c as O, ADS as P, emptyExperience as Q, downloadGateActive as R, Route$11 as S, p$9 as T, SAMPLE_FORM as U, COUNTRIES as V, TEMPLATES as W, emptyChild as X, dossierCode as Y, emptyEducation as Z, p$2 as _, getPlan as a, phoneLine as at, p$5 as b, downloadPreviewPdf as c, splitDisplayName as ct, signatureLine as d, GUIDES as dt, emptyProfile as et, signaturePatch as f, ContentShell as ft, p$1 as g, p as h, WATERMARK_LINES as i, lifeLines as it, p$11 as j, c$1 as k, checkSignatureFile as l, summaryLines as lt, trimToPng as m, DEFAULT_PLAN_ID as n, formatSpan as nt, planPriceLabel as o, placeLine as ot, templateSigns as p, SEO_PAGES as pt, degreeLine as q, LAUNCH_NOTE as r, formatWhen as rt, visiblePlans as s, sampleProfile as st, router_exports as t, emptyTrip as tt, clearSignaturePatch as u, uid as ut, p$3 as v, p$8 as w, p$6 as x, p$4 as y, CALLING_CODES as z };
