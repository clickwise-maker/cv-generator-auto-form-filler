import { createFileRoute } from "@tanstack/react-router";
import { tr } from "@/lib/i18n/i18n";
import { GUIDES } from "@/lib/content/guides";
import { ContentShell, contentHead } from "@/components/content/content-shell";
import { AdSlot } from "@/components/ads/ad-slot";

export const Route = createFileRoute("/guides/")({
  head: () => contentHead("CV and job application guides", "Free guides on writing a CV, cover letters, government job forms and photo/signature specifications.", "/guides"),
  component: GuidesIndex,
});

function GuidesIndex() {
  return (
    <ContentShell>
      <h1 className="font-serif text-4xl">{tr("CV and job application guides")}</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">{tr("Practical, free guides for writing your CV and filling application forms correctly.")}</p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2" data-testid="guide-list">
        {GUIDES.map((g) => (
          <li key={g.slug}>
            <a href={`/guides/${g.slug}`} className="block h-full rounded-2xl border border-line bg-sheet p-5 hover:border-forest">
              <h2 className="font-serif text-xl">{tr(g.title)}</h2>
              <p className="mt-2 text-sm text-muted">{tr(g.desc)}</p>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm">
        <a href="/templates" className="underline">{tr("Browse the CV templates gallery")}</a>
      </p>
      <AdSlot placement="guides" />
    </ContentShell>
  );
}
