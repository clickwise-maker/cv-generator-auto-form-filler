import { ChevronDown } from "lucide-react";
import { FORM_FIELDS, fieldsByUsage, type FormFieldDef } from "@/lib/cv/form-fields";
import { MODE_TEXT, useMode } from "@/lib/cv/mode";
import { useStudio } from "@/lib/cv/store";
import { Area, Field, Panel, TextInput } from "@/components/studio/ui";
import { cn } from "@/lib/utils";

function FieldInput({ def, compact }: { def: FormFieldDef; compact?: boolean }) {
  const value = useStudio((s) => String(s.profile.personal[def.key] ?? ""));
  const patch = useStudio((s) => s.patchPersonal);
  const lang = useMode((s) => s.lang);
  const label = lang === "hi" ? `${def.hi} · ${def.en}` : def.en;
  const onChange = (v: string) => patch({ [def.key]: v });
  return (
    <Field label={label}>
      {def.input === "area" ? (
        <Area className={compact ? "min-h-16" : undefined} value={value} data-field={def.key} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <TextInput
          className={compact ? "h-9" : undefined}
          type={def.input === "date" ? "date" : def.input === "email" ? "email" : "text"}
          inputMode={def.input === "tel" ? "tel" : undefined}
          value={value}
          data-field={def.key}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </Field>
  );
}

export function FormFiller() {
  const lang = useMode((s) => s.lang);
  const detected = useMode((s) => s.detected);
  const source = useMode((s) => s.source);
  const personal = useStudio((s) => s.profile.personal);
  const T = MODE_TEXT[lang];

  // Main: fields the form asks for (registry order), or all "used" fields if no form read yet.
  const main: FormFieldDef[] = detected?.length
    ? FORM_FIELDS.filter((f) => detected.includes(f.key) && f.usage !== "unused")
    : fieldsByUsage("used");
  const mainKeys = new Set(main.map((f) => f.key));
  // Optional: the remaining used + extra fields, collapsed. Unused fields never shown here.
  const optional = FORM_FIELDS.filter((f) => f.usage !== "unused" && !mainKeys.has(f.key));
  const filledCount = main.filter((f) => String(personal[f.key] ?? "").trim()).length;
  const missing = main.filter((f) => !String(personal[f.key] ?? "").trim());

  return (
    <div className="flex flex-col gap-4" data-testid="form-filler">
      <Panel
        title={detected?.length ? T.needed : T.common}
        action={
          <span className="rounded-full bg-brass-soft px-2.5 py-1 text-xs font-medium" data-testid="filled-count">
            {filledCount}/{main.length} {T.filled}
          </span>
        }
      >
        {detected?.length ? (
          <p className="-mt-2 mb-3 text-xs text-muted">
            {T.detectedFrom}: {source || "—"}
          </p>
        ) : (
          <p className="-mt-2 mb-3 text-xs text-muted">{T.neededEmpty}</p>
        )}
        <div className="grid gap-3 sm:grid-cols-2" data-testid="filler-main">
          {main.map((def) => (
            <div key={def.key} className={cn(def.input === "area" && "sm:col-span-2")}>
              <FieldInput def={def} />
            </div>
          ))}
        </div>
        {detected?.length && missing.length ? (
          <p className="mt-3 rounded-xl bg-brass-soft px-3 py-2 text-xs" data-testid="filler-missing">
            {T.missing} ({missing.length}): {missing.map((f) => (lang === "hi" ? f.hi : f.en)).join(", ")}
          </p>
        ) : null}
        <p className="mt-3 text-xs text-muted">{T.sections}</p>
      </Panel>

      {optional.length ? (
        <details className="group rounded-2xl border border-line bg-sheet" data-testid="filler-more">
          <summary className="flex h-12 cursor-pointer list-none items-center justify-between gap-2 px-4 text-sm font-medium">
            <span className="flex items-center gap-2">
              {T.more}
              <span className="rounded-full bg-paper px-2 py-0.5 text-xs text-muted" data-testid="more-count">
                {optional.length}
              </span>
            </span>
            <ChevronDown className="size-4 transition group-open:rotate-180" aria-hidden />
          </summary>
          <div className="grid gap-2 px-4 pb-4 sm:grid-cols-2">
            {optional.map((def) => (
              <FieldInput key={def.key} def={def} compact />
            ))}
          </div>
        </details>
      ) : null}
    </div>
  );
}

export function ModeSwitch() {
  const mode = useMode((s) => s.mode);
  const setMode = useMode((s) => s.setMode);
  const lang = useMode((s) => s.lang);
  const setLang = useMode((s) => s.setLang);
  const T = MODE_TEXT[lang];
  return (
    <div className="flex items-center gap-2" data-testid="mode-switch">
      <span className="kicker shrink-0 text-muted">{T.switchLabel}</span>
      <div role="tablist" className="grid min-w-0 flex-1 grid-cols-2 rounded-full border border-line bg-sheet p-1">
        {(["generator", "filler"] as const).map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            title={m === "generator" ? T.generatorHint : T.fillerHint}
            data-testid={`mode-${m}`}
            className={cn("h-9 rounded-full text-sm font-medium", mode === m ? "bg-forest text-sheet" : "text-muted")}
            onClick={() => setMode(m)}
          >
            {T[m]}
          </button>
        ))}
      </div>
      <button type="button" data-testid="lang-toggle" className="h-11 shrink-0 px-2 text-sm font-medium text-forest" onClick={() => setLang(lang === "en" ? "hi" : "en")}>
        {T.lang}
      </button>
    </div>
  );
}
