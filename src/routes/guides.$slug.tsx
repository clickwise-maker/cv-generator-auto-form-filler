import { createFileRoute, notFound } from "@tanstack/react-router";
import { Fragment } from "react";
import { tr } from "@/lib/i18n/i18n";
import { GUIDES, guideBySlug } from "@/lib/content/guides";
import { ContentShell, contentHead } from "@/components/content/content-shell";
import { AdSlot } from "@/components/ads/ad-slot";

export const Route = createFileRoute("/guides/$slug")({
  loader: ({ params }) => {
    const g = guideBySlug(params.slug);
    if (!g) throw notFound();
    return g;
  },
  head: ({ loaderData }) => (loaderData ? contentHead(loaderData.title, loaderData.desc, `/guides/${loaderData.slug}`) : {}),
  component: GuidePage,
});

function GuidePage() {
  const g = Route.useLoaderData();
  const others = GUIDES.filter((x) => x.slug !== g.slug).slice(0, 4);
  return (
    <ContentShell>
      <article className="mx-auto max-w-3xl" data-testid="guide-article">
        <a href="/guides" className="text-xs uppercase tracking-[0.2em] text-muted">{tr("Guides")}</a>
        <h1 className="mt-3 font-serif text-4xl">{tr(g.title)}</h1>
        <p className="mt-3 text-base text-muted">{tr(g.lead)}</p>
        {g.sections.map(([h, items], i) => (
          <Fragment key={h}>
            <section className="mt-8">
              <h2 className="font-serif text-2xl">{tr(h)}</h2>
              {items.map((p) => (
                <p key={p} className="mt-3 leading-relaxed">{tr(p)}</p>
              ))}
            </section>
            {i === 1 ? <AdSlot placement="guides" /> : null}
          </Fragment>
        ))}
        <section className="mt-12 rounded-2xl border border-line bg-sheet p-5">
          <h2 className="font-semibold">{tr("More guides")}</h2>
          <ul className="mt-2 list-disc space-y-1 ps-5 text-sm">
            {others.map((o) => (
              <li key={o.slug}><a className="underline" href={`/guides/${o.slug}`}>{tr(o.title)}</a></li>
            ))}
          </ul>
        </section>
      </article>
    </ContentShell>
  );
}
