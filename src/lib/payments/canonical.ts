import { createHash } from "node:crypto";
import type { Profile, Settings } from "../cv/model.ts";

/** Stable JSON: object keys sorted recursively, so the same CV always hashes the same. */
export function canonicalJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .filter(([, v]) => v !== undefined)
      .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
    return `{${entries.map(([k, v]) => `${JSON.stringify(k)}:${canonicalJson(v)}`).join(",")}}`;
  }
  return JSON.stringify(value ?? null);
}

export function sha256(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}

/** Hash of the canonical CV data + layout settings that the clean file is generated from. */
export function versionHash(profile: Profile, settings: Settings): string {
  return sha256(canonicalJson({ profile, settings }));
}

/** Identity used by the "cv" policy: the local document id plus the normalised person name. */
export function cvKey(docId: string, profile: Profile): string {
  const p = profile.personal;
  const name = `${p.givenName ?? ""} ${p.familyName ?? ""}`.toLowerCase().replace(/\s+/g, " ").trim();
  return sha256(canonicalJson({ docId, name }));
}
