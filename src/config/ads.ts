/**
 * Advertising configuration. EVERYTHING HERE IS OFF BY DEFAULT.
 *
 * ONE value drives all of AdSense: the publisher id "ca-pub-<digits>".
 * The one-line change once Wilson has the id: set the build-time env var
 *     VITE_ADSENSE_CLIENT=ca-pub-1234567890123456
 * (Cloudflare build env / .env), then rebuild. That single value:
 *  - loads the AdSense <script> in <head>,
 *  - adds <meta name="google-adsense-account" content="ca-pub-…"> in <head>,
 *  - renders the <ins class="adsbygoogle"> units in the allowed slots,
 *  - makes /ads.txt serve "google.com, pub-…, DIRECT, f08c47fec0942fa0".
 * While unset/invalid: no script, no meta tag, slots render nothing, /ads.txt is 404.
 * No publisher id is invented here.
 */
export const ADSENSE_CLIENT: string = ((import.meta as { env?: Record<string, string | undefined> }).env?.VITE_ADSENSE_CLIENT || "").trim();

const PUB_RE = /^ca-pub-\d{10,20}$/;
export function adsenseConfigured(client: string = ADSENSE_CLIENT): boolean {
  return PUB_RE.test(client);
}
/** Back-compat alias. */
export const ADSENSE_PUB_ID = ADSENSE_CLIENT;

/** ads.txt body, or null when no valid publisher id is configured. */
export function adsTxt(client: string = ADSENSE_CLIENT): string | null {
  if (!adsenseConfigured(client)) return null;
  return `google.com, ${client.replace(/^ca-/, "")}, DIRECT, f08c47fec0942fa0\n`;
}

export const ADS = {
  enabled: adsenseConfigured(),
  /** Ad unit ids from AdSense → Ads → By ad unit. Placeholders until approved. */
  slots: {
    landing: "",
    guides: "",
    gallery: "",
    dashboard: "",
    belowPreview: "",
  },
} as const;

export type AdPlacement = keyof typeof ADS.slots;

/**
 * Opt-in "watch a short ad to download free" (Google Ad Manager rewarded web ad).
 * OFF by default. Needs a GAM network code AND the AD_UNLOCK_SECRET server env var
 * (the server refuses to issue tokens without it). The paid ₹20 option is always shown.
 */
export const WATCH_AD_UNLOCK = {
  enabled: false,
  gamAdUnitPath: "/NETWORK_CODE/cvstudio_rewarded",
  /** Free unlocks per guest (and per IP) per day. */
  dailyCap: 1,
  /** Token lifetime. */
  ttlMs: 10 * 60_000,
} as const;

/** Affiliate cards on the post-download page. Placeholder URLs: replace after joining each programme. */
export const AFFILIATES: { id: string; title: string; text: string; url: string }[] = [
  // i18n-data:start
  { id: "review", title: "Get your CV reviewed", text: "A human expert checks your CV and suggests improvements.", url: "https://example.com/affiliate/cv-review" },
  { id: "courses", title: "Courses to fill skill gaps", text: "Short online courses in Excel, coding, communication and more.", url: "https://example.com/affiliate/courses" },
  { id: "jobs", title: "Jobs matching your CV", text: "Browse openings on a job portal that suit your profile.", url: "https://example.com/affiliate/jobs" },
  // i18n-data:end
];

/**
 * Routes where an ad slot may render. Anything else (editor, form filler, pricing,
 * paywall, checkout, auth, errors, post-download) never shows ads.
 * Note: "/" is the landing page; the slot there sits in the guides section below the tool.
 */
const AD_ROUTES: { prefix: string; placements: AdPlacement[] }[] = [
  { prefix: "/guides", placements: ["guides"] },
  { prefix: "/templates", placements: ["gallery"] },
  { prefix: "/dashboard", placements: ["dashboard"] },
];

export function adAllowed(pathname: string, placement: AdPlacement): boolean {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/") return placement === "landing";
  return AD_ROUTES.some((r) => (path === r.prefix || path.startsWith(`${r.prefix}/`)) && r.placements.includes(placement));
}

export function adsenseScriptSrc(pub = ADSENSE_PUB_ID): string {
  return `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pub}`;
}
