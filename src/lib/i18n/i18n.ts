import { create } from "zustand";
import hi from "./messages/hi.json";
import ja from "./messages/ja.json";
import ar from "./messages/ar.json";
import zhCN from "./messages/zh-CN.json";

/**
 * Site-wide UI language. English source strings are the keys; every other language has a
 * JSON catalogue keyed by the same English text (src/lib/i18n/messages/*.json).
 * The user's own entered data is never passed through t().
 */
export type UiLang = "en" | "hi" | "ja" | "ar" | "zh-CN";

export const LANGS: { id: UiLang; label: string; dir: "ltr" | "rtl" }[] = [
  { id: "en", label: "English", dir: "ltr" },
  { id: "hi", label: "हिंदी", dir: "ltr" },
  { id: "ja", label: "日本語", dir: "ltr" },
  { id: "ar", label: "العربية", dir: "rtl" },
  { id: "zh-CN", label: "简体中文", dir: "ltr" },
];

export const CATALOGS: Record<Exclude<UiLang, "en">, Record<string, string>> = { hi, ja, ar, "zh-CN": zhCN };

export const LANG_KEY = "cvstudio.lang.v1";

export function isLang(value: unknown): value is UiLang {
  return LANGS.some((l) => l.id === value);
}

export function dirOf(lang: UiLang): "ltr" | "rtl" {
  return lang === "ar" ? "rtl" : "ltr";
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
      const saved = localStorage.getItem(LANG_KEY);
      if (isLang(saved)) lang = saved;
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
export const LANG_BOOT = `try{var l=localStorage.getItem(${JSON.stringify(LANG_KEY)});if(l&&${JSON.stringify(
  LANGS.map((l) => l.id),
)}.indexOf(l)>=0){document.documentElement.lang=l;document.documentElement.dir=l==="ar"?"rtl":"ltr"}}catch(e){}`;

/**
 * Non-hook translator. Safe in any render path because the root remounts the page tree
 * when the language changes (see LangRoot in __root.tsx).
 */
export function tr(en: string, vars?: Vars): string {
  return translate(useLang.getState().lang, en, vars);
}
