import { create } from "zustand";
import type { Personal } from "@/lib/cv/model";

export type StudioMode = "generator" | "filler";
export type UiLang = "en" | "hi";

type ModeState = {
  mode: StudioMode;
  lang: UiLang;
  /** Fields the last uploaded/read form asks for (null = no form read yet). */
  detected: Array<keyof Personal> | null;
  source: string;
  setMode: (mode: StudioMode) => void;
  setLang: (lang: UiLang) => void;
  setDetected: (keys: Array<keyof Personal> | null, source?: string) => void;
};

/** UI-only state. Profile data stays in the single studio store, shared by both modes. */
export const useMode = create<ModeState>((set) => ({
  mode: "generator",
  lang: "en",
  detected: null,
  source: "",
  setMode: (mode) => set({ mode }),
  setLang: (lang) => set({ lang }),
  setDetected: (detected, source = "") => set({ detected, source }),
}));

export const MODE_TEXT = {
  en: {
    switchLabel: "Mode",
    generator: "CV Generator",
    filler: "Form Filler",
    generatorHint: "Collects every CV field.",
    fillerHint: "Only the fields your form needs.",
    lang: "हिंदी",
    needed: "Fields this form needs",
    neededEmpty: "Upload or read a form above — we'll show only the fields it asks for.",
    common: "Common form fields",
    more: "More details (optional)",
    detectedFrom: "Detected from",
    filled: "filled",
    missing: "Still missing",
    useFiller: "Fill only this form's fields",
    sections: "Work history, education, skills and languages are shared with the CV Generator.",
  },
  hi: {
    switchLabel: "मोड",
    generator: "सीवी जनरेटर",
    filler: "फ़ॉर्म फ़िलर",
    generatorHint: "सीवी की सभी जानकारी भरें।",
    fillerHint: "सिर्फ़ वही जानकारी जो फ़ॉर्म माँगता है।",
    lang: "English",
    needed: "इस फ़ॉर्म के लिए ज़रूरी जानकारी",
    neededEmpty: "ऊपर फ़ॉर्म अपलोड करें — हम सिर्फ़ उसकी माँगी गई जानकारी दिखाएँगे।",
    common: "सामान्य फ़ॉर्म जानकारी",
    more: "अधिक जानकारी (वैकल्पिक)",
    detectedFrom: "इससे पहचाना गया",
    filled: "भरा गया",
    missing: "अभी बाकी",
    useFiller: "सिर्फ़ इस फ़ॉर्म की जानकारी भरें",
    sections: "कार्य अनुभव, शिक्षा, कौशल और भाषाएँ सीवी जनरेटर के साथ साझा हैं।",
  },
} as const;
