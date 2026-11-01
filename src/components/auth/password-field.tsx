import { useState } from "react";
import { tr } from "@/lib/i18n/i18n";

export const MIN_PW = 8;

/** 0 = weak, 1 = medium, 2 = strong — by length + character variety. */
export function pwStrength(pw: string): 0 | 1 | 2 {
  const variety = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/].filter((r) => r.test(pw)).length;
  if (pw.length >= 12 && variety >= 3) return 2;
  if (pw.length >= MIN_PW && variety >= 2) return 1;
  return 0;
}

/** Friendly text for Supabase weak-password errors; passes other messages through. */
export function pwError(message: string): string {
  return /weak|password should|at least \d+ char|weak_password/i.test(message) ? tr("Password is too weak. Use at least 8 characters with letters and numbers.") : message;
}

type Props = {
  value: string;
  onChange: (v: string) => void;
  label: string;
  autoComplete: string;
  meter?: boolean;
  error?: string;
  className?: string;
  testId?: string;
};

export function PasswordField({ value, onChange, label, autoComplete, meter, error, className = "", testId }: Props) {
  const [show, setShow] = useState(false);
  const s = pwStrength(value);
  const meta = [
    { t: tr("Weak"), c: "bg-red-500", w: "w-1/3", tc: "text-red-600" },
    { t: tr("Medium"), c: "bg-amber-500", w: "w-2/3", tc: "text-amber-700" },
    { t: tr("Strong"), c: "bg-emerald-600", w: "w-full", tc: "text-emerald-700" },
  ][s]!;
  return (
    <div className="grid gap-1">
      <div className="relative">
        <input
          className={`h-11 w-full rounded-xl border border-line bg-sheet py-0 pl-3 pr-11 text-sm ${className}`}
          type={show ? "text" : "password"}
          required
          autoComplete={autoComplete}
          placeholder={label}
          aria-label={label}
          aria-invalid={error ? true : undefined}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          data-testid={testId}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? tr("Hide password") : tr("Show password")}
          aria-pressed={show}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-xl text-ink/60 hover:text-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest"
          data-testid={testId ? `${testId}-toggle` : undefined}
        >
          {show ? (
            <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a19.8 19.8 0 0 1 5.06-5.94M9.9 4.24A10.4 10.4 0 0 1 12 4c7 0 11 8 11 8a19.9 19.9 0 0 1-3.17 4.19M14.12 14.12a3 3 0 1 1-4.24-4.24M1 1l22 22" /></svg>
          ) : (
            <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" /><circle cx="12" cy="12" r="3" /></svg>
          )}
        </button>
      </div>
      {meter && value ? (
        <div className="flex items-center gap-2" data-testid="pw-strength" aria-live="polite">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line"><div className={`h-full rounded-full transition-all ${meta.c} ${meta.w}`} /></div>
          <span className={`text-xs font-medium ${meta.tc}`}>{tr("Strength: {level}", { level: meta.t })}</span>
        </div>
      ) : null}
      {error ? <p className="text-xs text-red-600" role="alert" data-testid="pw-error">{error}</p> : null}
    </div>
  );
}
