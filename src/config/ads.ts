/**
 * Advertising configuration. EVERYTHING HERE IS OFF BY DEFAULT.
 * - Replace ADSENSE_PUB_ID with the real "ca-pub-…" id only after AdSense approval,
 *   then set ADS.enabled = true (see research/ADSENSE_APPLICATION.md).
 * - The AdSense <script> is added to <head> only when ADS.enabled is true.
 * - public/ads.txt must be updated with the same publisher id.
 */
export const ADSENSE_PUB_ID = "ca-pub-XXXXXXXXXXXXXXXX";

export const ADS = {
  enabled: false,
  /** Ad unit ids from AdSense → Ads → By ad unit. Placeholders until approved. */
  slots: {
    landing: "0000000001",
    guides: "0000000002",
    gallery: "0000000003",
    dashboard: "0000000004",
    belowPreview: "0000000005",
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
  if (path === "/") return placement === "landing" || placement === "belowPreview";
  return AD_ROUTES.some((r) => (path === r.prefix || path.startsWith(`${r.prefix}/`)) && r.placements.includes(placement));
}

export function adsenseScriptSrc(pub = ADSENSE_PUB_ID): string {
  return `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pub}`;
}
