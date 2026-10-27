import { FORM_FIELDS, type FormFieldDef } from "./form-fields.ts";
import type { CustomDetail, Personal } from "./model.ts";

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

/** Add or update custom rows by label (case-insensitive). Empty values are skipped, never invented. */
export function mergeCustom(existing: CustomDetail[], incoming: { label: string; value: string }[]): CustomDetail[] {
  const out = existing.map((item) => ({ ...item }));
  for (const { label, value } of incoming) {
    const l = label.trim();
    const v = value.trim();
    if (!l || !v) continue;
    const hit = out.find((item) => item.label.trim().toLowerCase() === l.toLowerCase());
    if (hit) hit.value = v;
    else out.push({ id: uid(), label: l, value: v });
  }
  return out;
}

export type MissingReport = {
  /** Known profile fields the form asks for that are still empty. */
  fields: FormFieldDef[];
  /** Form labels we have no profile field for and no saved custom detail with a value. */
  custom: string[];
};

const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

/** Labels written on a form: "Label:" / "Label: ____" / "Label ......" lines. */
export function formLabels(text: string): string[] {
  const out: string[] = [];
  for (const raw of text.split(/\r?\n/)) {
    const m = /^\s*([\p{L}][\p{L}\p{N} '’/()&.,-]{1,60}?)\s*(?::|_{3,}|\.{3,})/u.exec(raw);
    if (!m) continue;
    const label = m[1]!.replace(/[\s.,-]+$/, "").trim();
    if (label.length >= 2 && !out.some((x) => norm(x) === norm(label))) out.push(label);
  }
  return out;
}

const filled = (personal: Personal, key: keyof Personal) => {
  const v = personal[key];
  return typeof v === "string" ? v.trim() !== "" : Array.isArray(v) && v.length > 0;
};

/**
 * Which fields does this form need that the profile cannot answer yet?
 * Nothing is guessed: a field is "missing" only when the profile value is empty.
 */
export function findMissing(text: string, personal: Personal, detected?: Array<keyof Personal> | null): MissingReport {
  const keys = detected ?? FORM_FIELDS.filter((f) => f.usage !== "unused" && f.detect?.test(text)).map((f) => f.key);
  const fields = FORM_FIELDS.filter((f) => keys.includes(f.key) && f.usage !== "unused" && !filled(personal, f.key));
  const saved = new Map((personal.customDetails ?? []).map((c) => [norm(c.label), c.value.trim()]));
  const custom = formLabels(text).filter((label) => {
    const known = FORM_FIELDS.some((f) => f.detect && f.detect.test(`${label}:`));
    if (known) return false;
    return !saved.get(norm(label));
  });
  return { fields, custom };
}
