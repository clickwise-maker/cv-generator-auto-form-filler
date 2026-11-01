import type { Profile } from "@/lib/cv/model";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** 6–15 digits once spaces, dashes, dots and brackets are removed (local number, calling code chosen separately). */
export const PHONE_RE = /^\d{6,15}$/;

export function emailError(v: string): string | null {
  return v.trim() && !EMAIL_RE.test(v.trim()) ? "Enter a valid email, like name@example.com." : null;
}
export function phoneError(v: string): string | null {
  return v.trim() && !PHONE_RE.test(v.replace(/[\s\-().]/g, "").replace(/^\+/, "")) ? "Enter a valid phone number (digits only, 6–15)." : null;
}
/** English keys of what is missing or wrong before a preview can be built. */
export function previewProblems(p: Profile): string[] {
  const out: string[] = [];
  if (!p.personal.givenName.trim() && !p.personal.familyName.trim()) out.push("Add your name.");
  if (!p.personal.email.trim()) out.push("Add your email.");
  const e = emailError(p.personal.email);
  if (e) out.push(e);
  const ph = phoneError(p.personal.phone);
  if (ph) out.push(ph);
  return out;
}
// i18n-data:start
// "Enter a valid email, like name@example.com." "Enter a valid phone number (digits only, 6–15)." "Add your name." "Add your email."
// i18n-data:end
