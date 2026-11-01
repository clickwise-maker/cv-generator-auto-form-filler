import { create } from "zustand";
import hi from "./messages/hi.json";
import ja from "./messages/ja.json";
import ar from "./messages/ar.json";
import zhCN from "./messages/zh-CN.json";
import esES from "./messages/es-ES.json";
import frFR from "./messages/fr-FR.json";
import enGB from "./messages/en-GB.json";

/**
 * Site-wide UI language. English source strings are the keys; every other language has a
 * JSON catalogue keyed by the same English text (src/lib/i18n/messages/*.json).
 * The user's own entered data is never passed through t().
 */
export type UiLang = "en" | "en-GB" | "hi" | "ja" | "ar" | "zh-CN" | "es-ES" | "fr-FR";

export const LANGS: { id: UiLang; label: string; dir: "ltr" | "rtl" }[] = [
  { id: "en", label: "English", dir: "ltr" },
  { id: "en-GB", label: "English (UK)", dir: "ltr" },
  { id: "hi", label: "हिंदी", dir: "ltr" },
  { id: "ja", label: "日本語", dir: "ltr" },
  { id: "ar", label: "العربية", dir: "rtl" },
  { id: "zh-CN", label: "简体中文", dir: "ltr" },
  { id: "es-ES", label: "Español (España)", dir: "ltr" },
  { id: "fr-FR", label: "Français (France)", dir: "ltr" },
];

export const CATALOGS: Record<Exclude<UiLang, "en">, Record<string, string>> = {
  "en-GB": enGB,
  hi,
  ja,
  ar,
  "zh-CN": zhCN,
  "es-ES": esES,
  "fr-FR": frFR,
};

export const LANG_KEY = "cvstudio.lang.v1";

export function isLang(value: unknown): value is UiLang {
  return LANGS.some((l) => l.id === value);
}

export function dirOf(lang: UiLang): "ltr" | "rtl" {
  return lang === "ar" ? "rtl" : "ltr";
}

/**
 * First-visit language: an explicit ?lang= in the URL wins, otherwise the browser's preferred
 * languages are matched (ar-*, es-*, fr-*, en-GB, hi, ja, zh-*). Falls back to "en".
 */
export function matchLang(tags: readonly string[]): UiLang | null {
  for (const raw of tags) {
    const t = raw.toLowerCase();
    const exact = LANGS.find((l) => l.id.toLowerCase() === t);
    if (exact) return exact.id;
    const p = t.split("-")[0];
    if (p === "en") return t === "en-gb" || t === "en-uk" ? "en-GB" : "en";
    if (p === "es") return "es-ES";
    if (p === "fr") return "fr-FR";
    if (p === "zh") return "zh-CN";
    if (p === "ar" || p === "hi" || p === "ja") return p;
  }
  return null;
}

export type Vars = Record<string, string | number>;

export function translate(lang: UiLang, en: string, vars?: Vars): string {
  const text = lang === "en" ? en : (CATALOGS[lang][en] ?? en);
  if (!vars) return text;
  return text.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
}

function applyDocument(lang: UiLang) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = lang;
  document.documentElement.dir = dirOf(lang);
}

type LangState = { lang: UiLang; ready: boolean; setLang: (lang: UiLang) => void; load: () => void };

export const useLang = create<LangState>((set) => ({
  lang: "en",
  ready: false,
  setLang: (lang) => {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      // storage blocked: the choice still applies for this visit
    }
    applyDocument(lang);
    set({ lang });
  },
  load: () => {
    let lang: UiLang = "en";
    try {
      const q = new URLSearchParams(location.search).get("lang");
      const fromUrl = q ? matchLang([q]) : null;
      const saved = localStorage.getItem(LANG_KEY);
      if (fromUrl) {
        lang = fromUrl;
        localStorage.setItem(LANG_KEY, lang);
      } else if (isLang(saved)) lang = saved;
      else lang = matchLang(navigator.languages ?? [navigator.language]) ?? "en";
    } catch {
      // ignore
    }
    applyDocument(lang);
    set({ lang, ready: true });
  },
}));

export type T = (en: string, vars?: Vars) => string;

export function useT(): T {
  const lang = useLang((s) => s.lang);
  return (en, vars) => translate(lang, en, vars);
}

/** Inline script for <head>: sets lang/dir before first paint on every route. */
export const LANG_BOOT = `try{var L=${JSON.stringify(LANGS.map((l) => l.id))};var m=function(a){for(var i=0;i<a.length;i++){var t=String(a[i]).toLowerCase();for(var j=0;j<L.length;j++)if(L[j].toLowerCase()===t)return L[j];var p=t.split("-")[0];if(p==="en")return t==="en-gb"||t==="en-uk"?"en-GB":"en";if(p==="es")return"es-ES";if(p==="fr")return"fr-FR";if(p==="zh")return"zh-CN";if(p==="ar"||p==="hi"||p==="ja")return p}return null};var q=new URLSearchParams(location.search).get("lang");var s=localStorage.getItem(${JSON.stringify(LANG_KEY)});var l=(q&&m([q]))||(L.indexOf(s)>=0?s:null)||m(navigator.languages||[navigator.language])||"en";document.documentElement.lang=l;document.documentElement.dir=l==="ar"?"rtl":"ltr"}catch(e){}`;

/**
 * Non-hook translator. Safe in any render path because the root remounts the page tree
 * when the language changes (see LangRoot in __root.tsx).
 */
export function tr(en: string, vars?: Vars): string {
  return translate(useLang.getState().lang, en, vars);
}

/** Translate every string value of a copy object (keys stay the same). */
export function trObj<O extends Record<string, string>>(obj: O, vars?: Vars): { [K in keyof O]: string } {
  const out = {} as { [K in keyof O]: string };
  for (const k of Object.keys(obj) as (keyof O)[]) out[k] = tr(obj[k]!, vars);
  return out;
}

/** BCP-47 tag for Intl date/number formatting in the UI. */
export function uiLocale(): string {
  const lang = useLang.getState().lang;
  return lang === "en" ? "en-IN" : lang;
}
