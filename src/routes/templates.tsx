import { createFileRoute } from "@tanstack/react-router";
import { tr } from "@/lib/i18n/i18n";
import { TEMPLATES, type TemplateId } from "@/lib/cv/model";
import { ContentShell, contentHead } from "@/components/content/content-shell";
import { AdSlot } from "@/components/ads/ad-slot";
import { ScaledPage } from "@/components/studio/scaled-page";
import { useEffect, useState } from "react";
import { readSession } from "@/lib/auth/supa";

export const Route = createFileRoute("/templates")({
  head: () => contentHead("CV templates gallery", "Free CV templates: a modern two-column layout, a classic consular format and a plain ATS-friendly page.", "/templates"),
  component: TemplatesPage,
});

const USE_FOR: Record<TemplateId, string> = {
  // i18n-data:start
  meridian: "Good for private-sector jobs in India, the Gulf and abroad where a modern look helps.",
  consulate: "Good for visa, embassy and government applications that expect a full personal record.",
  atlas: "Good for online portals and applicant tracking systems that prefer a plain single column.",
  // i18n-data:end
};

// Which templates suit which kind of applicant (honest guidance, not a ranking).
const TAGS: Record<TemplateId, Filter[]> = {
  meridian: ["experienced", "international"],
  consulate: ["international", "govt", "legal"],
  atlas: ["fresher", "experienced", "legal"],
};
type Filter = "all" | "fresher" | "experienced" | "international" | "govt" | "legal";
const FILTERS: [Filter, string][] = [
  // i18n-data:start
  ["all", "All"],
  ["fresher", "Fresher"],
  ["experienced", "Experienced"],
  ["international", "International"],
  ["govt", "Govt/PSU"],
  ["legal", "Legal"],
  // i18n-data:end
];

function TemplatesPage() {
  const use = (id: TemplateId) => (window.location.href = readSession() ? `/?template=${id}` : `/?template=${id}#signin`);
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<TemplateId | null>(null);
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);
  const shown = TEMPLATES.filter((t) => filter === "all" || TAGS[t.id].includes(filter));
  return (
    <ContentShell>
      <h1 className="font-serif text-4xl">{tr("CV templates gallery")}</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">{tr("All templates are free to edit and preview. Each is shown with sample data; your own details replace it in the editor.")}</p>
      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label={tr("Filter templates")} data-testid="template-filters">
        {FILTERS.map(([id, label]) => (
          <button key={id} type="button" aria-pressed={filter === id} onClick={() => setFilter(id)} data-testid={`filter-${id}`}
            className={`h-10 rounded-full border px-4 text-sm font-medium ${filter === id ? "border-forest bg-forest text-white" : "border-line bg-sheet text-forest hover:bg-forest/5"}`}>
            {tr(label)}
          </button>
        ))}
      </div>
      <ul className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3" data-testid="template-gallery">
        {shown.map((t) => (
          <li key={t.id} className="flex flex-col rounded-2xl border border-line bg-sheet p-4">
            <button type="button" onClick={() => setOpen(t.id)} className="group relative block w-full overflow-hidden rounded-lg border border-line text-start" aria-label={tr("{name} template preview", { name: tr(t.label) })} data-testid={`preview-${t.id}`}>
              <ScaledPage template={t.id} />
              <span className="absolute inset-x-0 bottom-0 bg-forest/85 py-2 text-center text-sm font-medium text-white opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">{tr("Preview")}</span>
            </button>
            <div className="mt-3 flex flex-wrap gap-1">
              {TAGS[t.id].map((tag) => (
                <span key={tag} className="rounded-full bg-paper px-2 py-0.5 text-xs text-forest">{tr(FILTERS.find(([f]) => f === tag)![1])}</span>
              ))}
            </div>
            <h2 className="mt-4 font-serif text-xl">{tr(t.label)}</h2>
            <p className="mt-1 text-sm text-muted">{tr(t.hint)}</p>
            <p className="mt-2 flex-1 text-sm">{tr(USE_FOR[t.id])}</p>
            <button type="button" className="mt-4 h-11 rounded-full bg-forest px-4 text-sm font-medium text-sheet" onClick={() => use(t.id)} data-testid={`use-${t.id}`}>
              {tr("Use this template")}
            </button>
          </li>
        ))}
      </ul>
      {open ? (
        <div className="fixed inset-0 z-[90] grid place-items-center bg-black/50 p-3" role="dialog" aria-modal="true" aria-labelledby="tpl-modal-title" data-testid="template-modal" onClick={() => setOpen(null)}>
          <div className="flex max-h-[94vh] w-full max-w-2xl flex-col rounded-2xl bg-sheet shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 border-b border-line p-4">
              <h2 id="tpl-modal-title" className="flex-1 font-serif text-xl text-forest">{tr(TEMPLATES.find((t) => t.id === open)!.label)}</h2>
              <button type="button" className="h-10 rounded-full border border-line px-4 text-sm" onClick={() => setOpen(null)}>{tr("Close")}</button>
            </div>
            <div className="overflow-y-auto bg-paper p-3 sm:p-5">
              <ScaledPage template={open} full className="rounded-lg border border-line shadow-sm" />
            </div>
            <div className="border-t border-line p-4">
              <button type="button" className="h-11 w-full rounded-full bg-forest px-4 text-sm font-medium text-white" onClick={() => use(open)} data-testid="modal-use">{tr("Use this template")}</button>
            </div>
          </div>
        </div>
      ) : null}
      <section className="mt-12 max-w-3xl">
        <h2 className="font-serif text-2xl">{tr("How to choose")}</h2>
        <p className="mt-3 leading-relaxed">{tr("Follow the employer's instructions first. If none are given, a plain single-column layout is the safest choice for online portals, while a two-column layout reads well when a person opens the PDF.")}</p>
        <p className="mt-3 leading-relaxed"><a className="underline" href="/guides/ats-friendly-cv">{tr("Making your CV ATS-friendly")}</a></p>
      </section>
      <AdSlot placement="gallery" />
    </ContentShell>
  );
}
