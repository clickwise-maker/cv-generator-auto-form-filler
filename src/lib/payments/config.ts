/**
 * Central, client-safe configuration for the watermarked preview and the
 * one-time paid export. Change the price HERE (and only here).
 *
 * Nothing in this file grants anything: whether a clean export is allowed is
 * decided exclusively on the server (see service.server.ts).
 */

/** Price of one clean export, in the smallest currency unit (paise). ₹20 = 2000 (matches the Single Use plan below). */
export const EXPORT_PRICE_MINOR = 2000;
export const EXPORT_CURRENCY = "INR" as const;

export function formatPrice(minor: number = EXPORT_PRICE_MINOR, currency: string = EXPORT_CURRENCY): string {
  const value = minor / 100;
  const symbol = currency === "INR" ? "₹" : `${currency} `;
  return `${symbol}${Number.isInteger(value) ? value : value.toFixed(2)}`;
}

/** Watermark lines drawn diagonally on every preview page (screen + preview PDF). */
export const WATERMARK_LINES: readonly [string, string] = ["SAMPLE — NOT FOR OFFICIAL USE", "UNPAID PREVIEW"];

/**
 * Entitlement policy (server default; overridable with EXPORT_ENTITLEMENT_POLICY):
 * - "version": the purchase covers this exact CV content + layout. Any edit = a new version = a new purchase.
 * - "cv":      the purchase covers this CV (same local document id and same person's name); edits stay unlocked.
 * Repeat downloads of the purchased CV are limited by EXPORT_MAX_DOWNLOADS (0 = unlimited).
 */
export type EntitlementPolicy = "version" | "cv";
export const DEFAULT_ENTITLEMENT_POLICY: EntitlementPolicy = "version";
export const DEFAULT_MAX_DOWNLOADS = 10;

export function policyExplanation(policy: EntitlementPolicy, maxDownloads: number): string {
  const repeat = maxDownloads > 0 ? `up to ${maxDownloads} clean downloads (PDF and Word)` : "unlimited clean downloads (PDF and Word)";
  return policy === "version"
    ? `Covers this exact version of your CV: ${repeat}. If you edit the CV afterwards, the edited version needs a new unlock.`
    : `Covers this CV: ${repeat}. Edits to the same CV stay unlocked; a CV for a different person needs a new unlock.`;
}

export type ExportFormat = "pdf" | "docx";

/** What the server tells the browser about the paywall. */
export type PaywallStatus = {
  mode: "test" | "live" | "unavailable";
  trialMode: boolean;
  priceMinor: number;
  currency: string;
  priceLabel: string;
  policy: EntitlementPolicy;
  maxDownloads: number;
  policyText: string;
  provider: "simulated" | "razorpay" | null;
  message: string;
};

// ---------------------------------------------------------------------------
// PLANS — the single central place for every package shown in the paywall.
// Plans are ONLY shown inside the download paywall (never on the home page).
// ---------------------------------------------------------------------------
export type PlanId = "single_inr" | "career_starter" | "global_single" | "global_pro" | "commercial_test";

export type Plan = {
  id: PlanId;
  name: string;
  priceMinor: number; // smallest unit (paise / cents)
  currency: "INR" | "USD";
  period: "one-time" | "year";
  /** 0 = not included. */
  profiles: number;
  cvGenerations: number;
  formFills: number;
  /** Distinct companies allowed; counted WITHIN formFills (0 = no separate cap). */
  companyLimit: number;
  /** Single-use plans: one CV OR one form fill (shared pool of 1). */
  singleUse: boolean;
  bullets: string[];
  /** Hidden plans never appear in public pricing; testOnly ones are only offered in TEST mode. */
  hidden?: boolean;
  testOnly?: boolean;
  /** Commercial feature: share an intake link with clients and fill forms for them. */
  clients?: boolean;
};

export const PLANS: readonly Plan[] = [
  {
    id: "single_inr",
    name: "Single Use",
    priceMinor: 2000,
    currency: "INR",
    period: "one-time",
    profiles: 1,
    cvGenerations: 1,
    formFills: 1,
    companyLimit: 0,
    singleUse: true,
    bullets: ["One clean CV export or one form fill", "PDF and Word"],
  },
  {
    id: "career_starter",
    name: "Career Starter",
    priceMinor: 100000,
    currency: "INR",
    period: "year",
    profiles: 2,
    cvGenerations: 100,
    formFills: 100,
    companyLimit: 100,
    singleUse: false,
    bullets: ["1 year", "2 profiles", "100 CV generations", "100 form-filler uses (up to 100 companies, counted within those 100 fills)"],
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
    bullets: ["One clean CV export or one form fill", "PDF and Word"],
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
    bullets: ["1 year", "300 form-filler uses", "Remaining credits always shown"],
  },
  {
    // COMMERCIAL (business/agency) — TEST ONLY. Price is TBD; the ₹1 below is a
    // placeholder for the simulated checkout and is never charged. Hidden from
    // public pricing and only offered by the paywall while in TEST mode.
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
    bullets: ["TEST ONLY — price TBD", "Share link with clients", "Clients list + fill forms for each client"],
  },
];

/** Plans offered in the paywall. Hidden test-only plans appear only in TEST mode. */
export function visiblePlans(testMode: boolean): Plan[] {
  return PLANS.filter((p) => !p.hidden || (p.testOnly && testMode));
}

export const DEFAULT_PLAN_ID: PlanId = "single_inr";
export const LAUNCH_NOTE = "Launch offer, future plans may change; purchased package terms stay as bought.";

export function getPlan(id: unknown): Plan | undefined {
  return PLANS.find((p) => p.id === id);
}

export function planPriceLabel(p: Plan): string {
  if (p.testOnly) return "Price TBD (TEST)";
  const v = p.priceMinor / 100;
  const amt = Number.isInteger(v) ? v.toLocaleString("en-IN") : v.toFixed(2);
  const sym = p.currency === "INR" ? "₹" : "$";
  return `${sym}${amt}${p.period === "year" ? "/year" : ""}`;
}

/** Remaining credits on an entitlement, as reported by the server. */
export type Credits = {
  planId: PlanId;
  planName: string;
  test: boolean;
  expiresAt: number | null;
  profilesMax: number;
  cvGenerationsLeft: number;
  cvGenerationsMax: number;
  formFillsLeft: number;
  formFillsMax: number;
  companiesUsed: number;
  companyLimit: number;
  singleUse: boolean;
  /** Commercial "Clients" feature unlocked on this entitlement. */
  clients: boolean;
};
