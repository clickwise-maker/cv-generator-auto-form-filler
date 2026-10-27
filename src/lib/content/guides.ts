import data from "@/content/guides/en.json";

/** Guides are authored in English (the i18n source); every string is translated at render time with tr(). */
export type Guide = { slug: string; title: string; desc: string; lead: string; sections: [string, string[]][] };
export const GUIDES = data as unknown as Guide[];
export const guideBySlug = (slug: string) => GUIDES.find((g) => g.slug === slug);
export const SITE = "https://cvstudio-app.onrender.com";
