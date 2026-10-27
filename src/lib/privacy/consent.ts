/** DPDP-style consent + local data erase helpers (browser only). Not legal advice. */
export const CONSENT_KEY = "cvstudio.consent.v1";
export const SUPPORT_EMAIL = "team@clickwisewe24in.we24.in";
export const RETENTION_DAYS = 180;

export type Consent = { at: number; version: 1 };

export function readConsent(): Consent | null {
  try {
    const v = JSON.parse(localStorage.getItem(CONSENT_KEY) ?? "null");
    return v && typeof v.at === "number" ? v : null;
  } catch {
    return null;
  }
}
export function giveConsent() {
  localStorage.setItem(CONSENT_KEY, JSON.stringify({ at: Date.now(), version: 1 } satisfies Consent));
  window.dispatchEvent(new Event("cvstudio-consent"));
}

/** Removes every CV Studio key (meridian*, cvstudio*) from this browser, including the consent record. */
export function eraseAllLocalData() {
  try {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k.startsWith("meridian") || k.startsWith("cvstudio"))) keys.push(k);
    }
    keys.forEach((k) => localStorage.removeItem(k));
    for (let i = sessionStorage.length - 1; i >= 0; i--) {
      const k = sessionStorage.key(i);
      if (k && (k.startsWith("meridian") || k.startsWith("cvstudio"))) sessionStorage.removeItem(k);
    }
  } catch {
    // storage unavailable
  }
  window.dispatchEvent(new Event("cvstudio-consent"));
}

export const NOTICE = {
  en: [
    "Your data is being collected.",
    "It is needed only to fill your forms / build your CV.",
    "You can keep it or have it deleted — entirely your choice.",
    "CV Studio has no interest in your data either way.",
  ],
  hi: [
    "आपका डेटा एकत्र किया जा रहा है।",
    "यह केवल आपके फ़ॉर्म भरने / CV बनाने के लिए आवश्यक है।",
    "आप इसे रख सकते हैं या हटवा सकते हैं — पूरी तरह आपकी पसंद।",
    "CV Studio को आपके डेटा में किसी भी तरह से कोई रुचि नहीं है।",
  ],
};
