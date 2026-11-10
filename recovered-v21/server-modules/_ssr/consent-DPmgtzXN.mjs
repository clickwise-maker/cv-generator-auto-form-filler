//#region ../repo/node_modules/.nitro/vite/services/ssr/assets/consent-DPmgtzXN.js
/** DPDP-style consent + local data erase helpers (browser only). Not legal advice. */
var CONSENT_KEY = "cvstudio.consent.v1";
var SUPPORT_EMAIL = "team@formzalo.com";
function readConsent() {
	try {
		const v = JSON.parse(localStorage.getItem("cvstudio.consent.v1") ?? "null");
		return v && typeof v.at === "number" ? v : null;
	} catch {
		return null;
	}
}
function giveConsent() {
	localStorage.setItem(CONSENT_KEY, JSON.stringify({
		at: Date.now(),
		version: 1
	}));
	window.dispatchEvent(new Event("cvstudio-consent"));
}
/** Removes every CV Studio key (meridian*, cvstudio*) from this browser, including the consent record. */
function eraseAllLocalData() {
	try {
		const keys = [];
		for (let i = 0; i < localStorage.length; i++) {
			const k = localStorage.key(i);
			if (k && (k.startsWith("meridian") || k.startsWith("cvstudio"))) keys.push(k);
		}
		keys.forEach((k) => localStorage.removeItem(k));
		for (let i = sessionStorage.length - 1; i >= 0; i--) {
			const k = sessionStorage.key(i);
			if (k && (k.startsWith("meridian") || k.startsWith("cvstudio"))) sessionStorage.removeItem(k);
		}
	} catch {}
	window.dispatchEvent(new Event("cvstudio-consent"));
}
var NOTICE = {
	en: [
		"Your data is being collected.",
		"It is needed only to fill your forms / build your CV.",
		"You can keep it or have it deleted — entirely your choice.",
		"FormZalo has no interest in your data either way."
	],
	hi: [
		"आपका डेटा एकत्र किया जा रहा है।",
		"यह केवल आपके फ़ॉर्म भरने / CV बनाने के लिए आवश्यक है।",
		"आप इसे रख सकते हैं या हटवा सकते हैं — पूरी तरह आपकी पसंद।",
		"FormZalo को आपके डेटा में किसी भी तरह से कोई रुचि नहीं है।"
	]
};
//#endregion
export { readConsent as a, giveConsent as i, SUPPORT_EMAIL as n, eraseAllLocalData as r, NOTICE as t };
