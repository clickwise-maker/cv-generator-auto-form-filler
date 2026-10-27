import { createFileRoute } from "@tanstack/react-router";
import { tr } from "@/lib/i18n/i18n";
import { TEMPLATES, type TemplateId } from "@/lib/cv/model";
import { ContentShell, contentHead } from "@/components/content/content-shell";
import { AdSlot } from "@/components/ads/ad-slot";

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

function TemplatesPage() {
  const use = (id: TemplateId) => (window.location.href = `/?template=${id}`);
  return (
    <ContentShell>
      <h1 className="font-serif text-4xl">{tr("CV templates gallery")}</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">{tr("All templates are free to edit and preview. Each is shown with sample data; your own details replace it in the editor.")}</p>
      <ul className="mt-8 grid gap-6 md:grid-cols-3" data-testid="template-gallery">
        {TEMPLATES.map((t) => (
          <li key={t.id} className="flex flex-col rounded-2xl border border-line bg-sheet p-4">
            <img src={`/templates/${t.id}.png`} alt={tr("{name} template preview", { name: tr(t.label) })} loading="lazy" className="aspect-[1/1.414] w-full rounded-lg border border-line object-cover object-top" />
            <h2 className="mt-4 font-serif text-xl">{tr(t.label)}</h2>
            <p className="mt-1 text-sm text-muted">{tr(t.hint)}</p>
            <p className="mt-2 flex-1 text-sm">{tr(USE_FOR[t.id])}</p>
            <button type="button" className="mt-4 h-11 rounded-full bg-forest px-4 text-sm font-medium text-sheet" onClick={() => use(t.id)} data-testid={`use-${t.id}`}>
              {tr("Use this template")}
            </button>
          </li>
        ))}
      </ul>
      <section className="mt-12 max-w-3xl">
        <h2 className="font-serif text-2xl">{tr("How to choose")}</h2>
        <p className="mt-3 leading-relaxed">{tr("Follow the employer's instructions first. If none are given, a plain single-column layout is the safest choice for online portals, while a two-column layout reads well when a person opens the PDF.")}</p>
        <p className="mt-3 leading-relaxed"><a className="underline" href="/guides/ats-friendly-cv">{tr("Making your CV ATS-friendly")}</a></p>
      </section>
      <AdSlot placement="gallery" />
    </ContentShell>
  );
}
