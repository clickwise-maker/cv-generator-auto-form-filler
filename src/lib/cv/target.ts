import type { Profile } from "./model.ts";

/** Optional "tailor for a company" layer, stored apart from the base profile. */
export type Target = { on: boolean; company: string };

export const TARGET_STORAGE = "meridian.target.v1";

export function emptyTarget(): Target {
  return { on: false, company: "" };
}

export function parseTarget(raw: unknown): Target {
  if (!raw || typeof raw !== "object") return emptyTarget();
  const r = raw as Record<string, unknown>;
  return { on: r.on === true, company: typeof r.company === "string" ? r.company.slice(0, 120) : "" };
}

/** The company to use, or "" when the toggle is off or empty. */
export function activeCompany(target: Target): string {
  return target.on ? target.company.trim() : "";
}

/**
 * Layer the target company on top of the base CV for preview/export. The base profile object
 * is never mutated; with the toggle off any stale layer is stripped.
 */
export function applyTarget(profile: Profile, target: Target): Profile {
  const company = activeCompany(target);
  const { preparedFor: _drop, ...base } = profile.personal;
  void _drop;
  return { ...profile, personal: company ? { ...base, preparedFor: company } : base };
}
