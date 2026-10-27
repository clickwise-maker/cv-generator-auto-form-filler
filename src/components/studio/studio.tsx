import { tr } from "@/lib/i18n/i18n";
import { ProfileForm } from "@/components/studio/profile-form";
import { PreviewColumn } from "@/components/studio/preview-doc";
import { TargetCompanyToggle } from "@/components/studio/target-company";
import { ScanCard } from "@/components/studio/scan-card";
import { Dashboard } from "@/components/studio/dashboard";
import { FormFiller, ModeSwitch } from "@/components/studio/form-filler";
import { useMode } from "@/lib/cv/mode";
import { TEMPLATES, type TemplateId } from "@/lib/cv/model";
import { useStudio } from "@/lib/cv/store";
import { cn } from "@/lib/utils";

export function Studio() {
  const tab = useStudio((state) => state.tab);
  const setTab = useStudio((state) => state.setTab);
  const settings = useStudio((state) => state.settings);
  const setSettings = useStudio((state) => state.setSettings);
  const undo = useStudio((state) => state.undo);
  const undoProfile = useStudio((state) => state.undoProfile);
  const mode = useMode((state) => state.mode);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-forest font-serif text-sm text-sheet" aria-hidden>
              {tr("CV")}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-serif text-lg leading-none">{tr("CV Studio")}</p>
              <p className="truncate text-xs text-muted">{tr("Guest mode — no email, phone or OTP needed")}</p>
            </div>
            <a href="/guides" className="hidden h-11 content-center px-2 text-sm font-medium text-forest sm:block">
              {tr("Guides")}
            </a>
            <a href="/dashboard" className="h-11 content-center px-2 text-sm font-medium text-forest">
              {tr("Dashboard")}
            </a>
            {undo ? (
              <button type="button" className="h-11 px-2 text-sm font-medium text-forest" onClick={undoProfile}>
                {tr("Undo")}
              </button>
            ) : null}
          </div>
          <label className="flex items-center gap-3 text-sm" htmlFor="document-kind">
            <span className="kicker shrink-0 text-muted">{tr("Document")}</span>
            <select
              id="document-kind"
              value={settings.template}
              onChange={(event) => setSettings({ template: event.target.value as TemplateId })}
              className="h-11 min-w-0 flex-1 rounded-full border border-line bg-sheet px-3 text-sm"
            >
              {TEMPLATES.map((template) => (
                <option key={template.id} value={template.id}>
                  {tr(template.label)} — {tr(template.hint)}
                </option>
              ))}
            </select>
          </label>
          <ModeSwitch />
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 pb-28 lg:grid-cols-2 lg:items-start lg:pb-10">
        <div className={cn("flex min-w-0 flex-col gap-4", tab !== "compose" && "hidden lg:flex")}>
          <Dashboard />
          <ScanCard />
          {mode === "filler" ? null : <TargetCompanyToggle />}
          {mode === "filler" ? <FormFiller /> : <ProfileForm />}
        </div>
        <div className={cn("min-w-0", tab !== "preview" && "hidden lg:block")}>
          <PreviewColumn />
        </div>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-30 grid h-16 grid-cols-2 border-t border-line bg-sheet lg:hidden">
        <button
          type="button"
          className={cn("text-sm font-medium", tab === "compose" ? "text-forest" : "text-muted")}
          onClick={() => setTab("compose")}
        >
          {tr("Compose")}
        </button>
        <button
          type="button"
          className={cn("text-sm font-medium", tab === "preview" ? "text-forest" : "text-muted")}
          onClick={() => setTab("preview")}
        >
          {tr("Preview")}
        </button>
      </nav>
    </div>
  );
}
