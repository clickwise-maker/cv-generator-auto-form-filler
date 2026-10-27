import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Plus, X } from "lucide-react";
import { FORM_FIELDS, fieldsByUsage, type FormFieldDef } from "@/lib/cv/form-fields";
import { findMissing, TARGET_COMPANY } from "@/lib/cv/missing";
import { activeCompany } from "@/lib/cv/target";
import { useMode } from "@/lib/cv/mode";
import type { Personal } from "@/lib/cv/model";
import { useStudio } from "@/lib/cv/store";
import { useT } from "@/lib/i18n/i18n";
import { LanguageSelect } from "@/components/language-select";
import { Area, Button, Field, Panel, TextInput } from "@/components/studio/ui";
import { CustomDetails } from "@/components/studio/custom-details";
import { SignatureSection } from "@/components/studio/signature-pad";
import { cn } from "@/lib/utils";

function Control({ def, value, onChange, compact }: { def: FormFieldDef; value: string; onChange: (v: string) => void; compact?: boolean }) {
  if (def.input === "signature") return <SignatureSection compact />;
  if (def.input === "area") {
    return <Area dir="auto" className={compact ? "min-h-16" : undefined} value={value} data-field={def.key} onChange={(e) => onChange(e.target.value)} />;
  }
  return (
    <TextInput
      dir={def.input === "date" || def.input === "email" || def.input === "tel" ? "ltr" : "auto"}
      className={compact ? "h-9" : undefined}
      type={def.input === "date" ? "date" : def.input === "email" ? "email" : "text"}
      inputMode={def.input === "tel" ? "tel" : undefined}
      value={value}
      data-field={def.key}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function FieldInput({ def, compact }: { def: FormFieldDef; compact?: boolean }) {
  const t = useT();
  const raw = useStudio((s) => s.profile.personal[def.key]);
  const patch = useStudio((s) => s.patchPersonal);
  return (
    <Field label={t(def.en)}>
      <Control def={def} compact={compact} value={typeof raw === "string" ? raw : ""} onChange={(v) => patch({ [def.key]: v } as Partial<Personal>)} />
    </Field>
  );
}

/**
 * Pop-up listing what the form needs and the profile lacks. Answers are saved back to the
 * profile (known fields) or to "More details" (custom rows) so they are reused next time.
 * Nothing is pre-filled or guessed.
 */
export function MissingFieldsDialog({ open, onClose, fields, custom, askCompany = false }: { open: boolean; onClose: () => void; fields: FormFieldDef[]; custom: string[]; askCompany?: boolean }) {
  const t = useT();
  const saveAnswers = useStudio((s) => s.saveAnswers);
  const setTarget = useStudio((s) => s.setTarget);
  const [company, setCompany] = useState("");
  const [values, setValues] = useState<Record<string, string>>({});
  const [extra, setExtra] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    if (!open) return;
    setValues({});
    setCompany("");
    setExtra(custom.map((label) => ({ label, value: "" })));
  }, [open, custom]);

  if (!open) return null;

  const save = () => {
    const known: Partial<Record<keyof Personal, string>> = {};
    for (const def of fields) {
      const v = values[def.key]?.trim();
      if (v && def.input !== "signature") known[def.key] = v;
    }
    saveAnswers(known as Partial<Personal>, extra);
    if (company.trim()) setTarget({ on: true, company: company.trim() });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 grid place-items-end bg-ink/40 p-4 sm:place-items-center" role="presentation" onClick={onClose}>
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="missing-title"
        data-testid="missing-dialog"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-line bg-sheet p-5 text-ink"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-start gap-2">
          <h2 id="missing-title" className="flex-1 font-serif text-xl">
            {fields.length || custom.length || askCompany ? t("This form needs a few more details") : t("Add more details")}
          </h2>
          <button type="button" className="grid size-9 place-items-center text-muted" aria-label={t("Close")} onClick={onClose}>
            <X className="size-4" aria-hidden />
          </button>
        </div>
        <p className="mb-4 text-xs text-muted">{t("Fill in what you know. Empty answers are skipped, and nothing is guessed. Answers are saved to your profile for next time.")}</p>
        <div className="flex flex-col gap-3" data-testid="missing-fields">
          {fields.map((def) => (
            <Field key={def.key} label={t(def.en)}>
              <Control def={def} value={values[def.key] ?? ""} onChange={(v) => setValues((s) => ({ ...s, [def.key]: v }))} />
            </Field>
          ))}
          {askCompany ? (
            <Field label={t("Company you are applying to")}>
              <TextInput dir="auto" data-testid="missing-company" value={company} onChange={(e) => setCompany(e.target.value)} />
            </Field>
          ) : null}
          {extra.map((row, index) => (
            <div key={index} className="grid grid-cols-[1fr_1.4fr] gap-2" data-testid="missing-custom">
              <TextInput dir="auto" aria-label={t("Detail name")} placeholder={t("Detail name")} value={row.label} onChange={(e) => setExtra((rows) => rows.map((r, i) => (i === index ? { ...r, label: e.target.value } : r)))} />
              <TextInput dir="auto" aria-label={t("Value")} placeholder={t("Value")} value={row.value} onChange={(e) => setExtra((rows) => rows.map((r, i) => (i === index ? { ...r, value: e.target.value } : r)))} />
            </div>
          ))}
          <Button tone="quiet" className="h-11 self-start px-4" data-testid="missing-add-row" onClick={() => setExtra((rows) => [...rows, { label: "", value: "" }])}>
            <Plus className="size-4" aria-hidden /> {t("Add another detail")}
          </Button>
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <Button tone="quiet" className="h-11" onClick={onClose}>
            {t("Later")}
          </Button>
          <Button className="h-11" data-testid="missing-save" onClick={save}>
            {t("Save to profile")}
          </Button>
        </div>
      </section>
    </div>
  );
}

export function FormFiller() {
  const t = useT();
  const detected = useMode((s) => s.detected);
  const source = useMode((s) => s.source);
  const formText = useMode((s) => s.formText);
  const personal = useStudio((s) => s.profile.personal);
  const target = useStudio((s) => s.target);
  const setTarget = useStudio((s) => s.setTarget);
  const [dialog, setDialog] = useState(false);
  const [askedFor, setAskedFor] = useState("");

  const main: FormFieldDef[] = detected?.length
    ? FORM_FIELDS.filter((f) => detected.includes(f.key) && f.usage !== "unused")
    : fieldsByUsage("used");
  const mainKeys = new Set(main.map((f) => f.key));
  const optional = FORM_FIELDS.filter((f) => f.usage !== "unused" && !mainKeys.has(f.key));
  const isFilled = (f: FormFieldDef) => {
    const v = personal[f.key];
    return typeof v === "string" && v.trim() !== "";
  };
  const filledCount = main.filter(isFilled).length;
  const report = useMemo(() => (formText ? findMissing(formText, personal, detected, activeCompany(target)) : { fields: [], custom: [], targetCompany: false }), [formText, personal, detected, target]);

  // Pop up once per newly read form when something is missing.
  useEffect(() => {
    if (!formText || formText === askedFor) return;
    setAskedFor(formText);
    if (report.fields.length || report.custom.length || report.targetCompany) setDialog(true);
  }, [formText, askedFor, report]);

  return (
    <div className="flex flex-col gap-4" data-testid="form-filler">
      <Panel
        title={detected?.length ? t("Fields this form needs") : t("Common form fields")}
        action={
          <span className="rounded-full bg-brass-soft px-2.5 py-1 text-xs font-medium" data-testid="filled-count">
            {t("{n}/{total} filled", { n: filledCount, total: main.length })}
          </span>
        }
      >
        {detected?.length ? (
          <p className="-mt-2 mb-3 text-xs text-muted">
            {t("Detected from")}: {source ? t(source) : "—"}
          </p>
        ) : (
          <p className="-mt-2 mb-3 text-xs text-muted">{t("Upload or read a form above. We'll show only the fields it asks for.")}</p>
        )}
        <div className="grid gap-3 sm:grid-cols-2" data-testid="filler-main">
          {main.map((def) => (
            <div key={def.key} className={cn((def.input === "area" || def.input === "signature") && "sm:col-span-2")}>
              <FieldInput def={def} />
            </div>
          ))}
        </div>
        {formText && TARGET_COMPANY.test(formText) ? (
          <div className="mt-3">
            <Field label={t("Company you are applying to")}>
              <TextInput dir="auto" data-testid="filler-company" value={target.company} onChange={(e) => setTarget({ on: true, company: e.target.value })} />
            </Field>
          </div>
        ) : null}
        {report.fields.length || report.custom.length || report.targetCompany ? (
          <button type="button" className="mt-3 w-full rounded-xl bg-brass-soft px-3 py-2 text-start text-xs" data-testid="filler-missing" onClick={() => setDialog(true)}>
            {t("Still missing")} ({report.fields.length + report.custom.length + (report.targetCompany ? 1 : 0)}): {[...report.fields.map((f) => t(f.en)), ...(report.targetCompany ? [t("Company you are applying to")] : []), ...report.custom].join(", ")}
          </button>
        ) : null}
        <p className="mt-3 text-xs text-muted">{t("Work history, education, skills and languages are shared with the CV Generator.")}</p>
      </Panel>

      <Panel
        title={t("More details")}
        action={
          <Button tone="quiet" className="h-10 px-3" data-testid="filler-add-more" onClick={() => setDialog(true)}>
            <Plus className="size-4" aria-hidden /> {t("Add more details")}
          </Button>
        }
      >
        <p className="-mt-2 mb-3 text-xs text-muted">{t("Anything else your CV or forms need. Add as many as you like.")}</p>
        <CustomDetails />
      </Panel>

      {optional.length ? (
        <details className="group rounded-2xl border border-line bg-sheet" data-testid="filler-more">
          <summary className="flex h-12 cursor-pointer list-none items-center justify-between gap-2 px-4 text-sm font-medium">
            <span className="flex items-center gap-2">
              {t("More details (optional)")}
              <span className="rounded-full bg-paper px-2 py-0.5 text-xs text-muted" data-testid="more-count">
                {optional.length}
              </span>
            </span>
            <ChevronDown className="size-4 transition group-open:rotate-180" aria-hidden />
          </summary>
          <div className="grid gap-2 px-4 pb-4 sm:grid-cols-2">
            {optional.map((def) => (
              <div key={def.key} className={cn(def.input === "signature" && "sm:col-span-2")}>
                <FieldInput def={def} compact />
              </div>
            ))}
          </div>
        </details>
      ) : null}

      <MissingFieldsDialog open={dialog} onClose={() => setDialog(false)} fields={report.fields} custom={report.custom} askCompany={report.targetCompany} />
    </div>
  );
}

export function ModeSwitch() {
  const t = useT();
  const mode = useMode((s) => s.mode);
  const setMode = useMode((s) => s.setMode);
  return (
    <div className="flex items-center gap-2" data-testid="mode-switch">
      <span className="kicker shrink-0 text-muted">{t("Mode")}</span>
      <div role="tablist" className="grid min-w-0 flex-1 grid-cols-2 rounded-full border border-line bg-sheet p-1">
        {(["generator", "filler"] as const).map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            title={m === "generator" ? t("Collects every CV field.") : t("Only the fields your form needs.")}
            data-testid={`mode-${m}`}
            className={cn("h-9 rounded-full text-sm font-medium", mode === m ? "bg-forest text-sheet" : "text-muted")}
            onClick={() => setMode(m)}
          >
            {m === "generator" ? t("CV Generator") : t("Form Filler")}
          </button>
        ))}
      </div>
      <LanguageSelect />
    </div>
  );
}
