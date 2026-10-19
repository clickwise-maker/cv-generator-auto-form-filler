import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

const tones = {
  forest: "bg-forest text-sheet hover:bg-forest-deep",
  sheet: "bg-sheet text-forest hover:bg-brass-soft",
  quiet: "border border-line bg-sheet text-ink hover:border-forest",
  ghost: "bg-transparent text-forest hover:bg-brass-soft",
};

export function Button({
  tone = "forest",
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { tone?: keyof typeof tones }) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}

export function Panel({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-sheet p-4 sm:p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <h2 className="font-serif text-xl">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="flex min-w-0 flex-col gap-1.5">
      <span className="text-xs font-medium text-muted">{label}</span>
      {children}
      {hint ? <span className="text-xs leading-snug text-muted">{hint}</span> : null}
    </label>
  );
}

export const controlClass =
  "h-11 w-full min-w-0 rounded-xl border border-line bg-paper px-3 text-sm text-ink outline-none transition placeholder:text-muted focus:border-forest";

export function TextInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(controlClass, className)} {...props} />;
}

export function Area({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea className={cn(controlClass, "h-auto min-h-24 py-2 leading-relaxed", className)} {...props} />
  );
}

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn(controlClass, className)} {...props} />;
}
