/**
 * Central, client-safe configuration for the watermarked preview and the
 * one-time paid export. Change the price HERE (and only here).
 *
 * Nothing in this file grants anything: whether a clean export is allowed is
 * decided exclusively on the server (see service.server.ts).
 */

/** Price of one clean export, in the smallest currency unit (paise). ₹29 = 2900. */
export const EXPORT_PRICE_MINOR = 2900;
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
