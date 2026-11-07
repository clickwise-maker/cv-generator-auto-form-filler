/**
 * Per-locale SEO copy (title / meta description / home H1 / OG locale).
 * Legacy UI metadata; product descriptions reuse reviewed public-copy drafts, not verified keyword-demand evidence.
 * Honest claims only: no "AI-powered", no auto-apply, no ATS score, no user counts.
 * Language is chosen with ?lang= (see src/lib/i18n/i18n.ts).
 */
import { PUBLIC_COPY } from "./public-locales";
import type { UiLang } from "@/lib/i18n/i18n";
import { matchLang } from "@/lib/i18n/i18n";

export const SITE_ORIGIN = "https://formzalo.com";

export type LocaleSeo = { hreflang: string; ogLocale: string; title: string; description: string; h1: string };

export const LOCALE_SEO: Record<UiLang, LocaleSeo> = {
  en: {
    hreflang: "en-IN",
    ogLocale: "en_IN",
    title: "Free CV Maker India & Resume for Freshers | formzolo",
    description: PUBLIC_COPY["en"].pages.home.description,
    h1: "Free CV maker for India, resume for freshers and online form filling",
  },
  "en-GB": {
    hreflang: "en-GB",
    ogLocale: "en_GB",
    title: "Free CV Builder UK, CV Template & Form Filler | formzolo",
    description: PUBLIC_COPY["en"].pages.home.description,
    h1: "Free CV builder and online form filler",
  },
  hi: {
    hreflang: "hi-IN",
    ogLocale: "hi_IN",
    title: "फ्री बायोडाटा और रिज्यूम कैसे बनाएं | formzolo",
    description: PUBLIC_COPY["hi"].pages.home.description,
    h1: "मुफ़्त बायोडाटा / रिज्यूम मेकर और ऑनलाइन फॉर्म भरना",
  },
  ar: {
    hreflang: "ar-SA",
    ogLocale: "ar_SA",
    title: "إنشاء سيرة ذاتية مجانية وتعبئة النماذج | formzolo",
    description: PUBLIC_COPY["ar"].pages.home.description,
    h1: "إنشاء سيرة ذاتية مجانية وتعبئة النماذج أونلاين",
  },
  "es-ES": {
    hreflang: "es-ES",
    ogLocale: "es_ES",
    title: "Hacer currículum gratis y rellenar formularios | formzolo",
    description: PUBLIC_COPY["es"].pages.home.description,
    h1: "Hacer currículum gratis y rellenar formularios online",
  },
  "fr-FR": {
    hreflang: "fr-FR",
    ogLocale: "fr_FR",
    title: "Créer un CV gratuit en ligne et remplir un formulaire | formzolo",
    description: PUBLIC_COPY["fr"].pages.home.description,
    h1: "Créer un CV gratuit et remplir vos formulaires en ligne",
  },
  ja: {
    hreflang: "ja",
    ogLocale: "ja_JP",
    title: "無料の履歴書（CV）作成とフォーム入力 | formzolo",
    description: PUBLIC_COPY["ja"].pages.home.description,
    h1: "無料のCV作成とオンラインフォーム入力",
  },
  "zh-CN": {
    hreflang: "zh-CN",
    ogLocale: "zh_CN",
    title: "免费简历（CV）制作与表格填写 | formzolo",
    description: PUBLIC_COPY["zh-cn"].pages.home.description,
    h1: "免费简历制作与在线表格填写",
  },
};

/** Locales advertised with hreflang (the researched markets) + x-default. */
export const HREFLANG_LANGS: UiLang[] = ["en", "en-GB", "ar", "es-ES", "fr-FR", "hi"];

export function langFromSearch(search: unknown): UiLang {
  const raw = search && typeof search === "object" ? (search as Record<string, unknown>).lang : undefined;
  return (typeof raw === "string" && matchLang([raw])) || "en";
}

export function localeUrl(path: string, lang: UiLang): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return lang === "en" ? `${SITE_ORIGIN}${p}` : `${SITE_ORIGIN}${p}?lang=${encodeURIComponent(lang)}`;
}

export function hreflangLinks(path: string) {
  return [
    ...HREFLANG_LANGS.map((l) => ({ rel: "alternate", hrefLang: LOCALE_SEO[l].hreflang, href: localeUrl(path, l) })),
    { rel: "alternate", hrefLang: "x-default", href: localeUrl(path, "en") },
  ];
}
