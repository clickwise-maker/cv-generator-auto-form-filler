import { COPY } from "@/lib/cv/model";
import { useStudio } from "@/lib/cv/store";
import { tr } from "@/lib/i18n/i18n";
import { TextInput } from "@/components/studio/ui";
import { cn } from "@/lib/utils";

/** Optional toggle: tailor this CV for one company. Off = one generic base CV for every application. */
export function TargetCompanyToggle() {
  const target = useStudio((s) => s.target);
  const setTarget = useStudio((s) => s.setTarget);
  return (
    <section className="rounded-2xl border border-line bg-sheet p-4" data-testid="target-company">
      <label className="flex cursor-pointer items-start gap-3">
        <button
          type="button"
          role="switch"
          aria-checked={target.on}
          data-testid="target-toggle"
          onClick={() => setTarget({ on: !target.on })}
          className={cn("relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition", target.on ? "bg-forest" : "bg-line")}
        >
          <span className={cn("absolute top-0.5 size-5 rounded-full bg-sheet shadow transition-all", target.on ? "start-[22px]" : "start-0.5")} />
        </button>
        <span className="min-w-0">
          <span className="block text-sm font-medium">{tr("Tailoring this CV for a specific company?")}</span>
          <span className="block text-xs text-muted">
            {target.on
              ? tr("Enter the company name. A “Prepared for” line is added to the header and file name; your base CV stays unchanged.")
              : tr("Off: one general CV you can reuse for every application.")}
          </span>
        </span>
      </label>
      {target.on ? (
        <TextInput
          dir="auto"
          className="mt-3"
          data-testid="target-input"
          aria-label={tr("Company name")}
          placeholder={tr("Company name")}
          value={target.company}
          onChange={(e) => setTarget({ company: e.target.value })}
        />
      ) : null}
    </section>
  );
}

/** "Prepared for X" line inside the CV preview header, only when the layer is on. */
export function PreparedFor({ className }: { className?: string }) {
  const target = useStudio((s) => s.target);
  const locale = useStudio((s) => s.settings.locale);
  const company = target.on ? target.company.trim() : "";
  if (!company) return null;
  const label = COPY[locale].preparedFor;
  return (
    <p className={cn("text-xs italic", className)} data-testid="cv-prepared-for">
      {label} {company}
    </p>
  );
}
