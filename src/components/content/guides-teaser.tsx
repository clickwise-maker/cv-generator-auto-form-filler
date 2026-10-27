import { tr } from "@/lib/i18n/i18n";
import { GUIDES } from "@/lib/content/guides";
import { AdSlot } from "@/components/ads/ad-slot";

/** Landing-page content block below the tool: guide links, then (if enabled) one ad, far from editor buttons. */
export function GuidesTeaser() {
  return (
    <section className="border-t border-line bg-paper" data-testid="guides-teaser">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-serif text-2xl">{tr("Guides for your CV and job applications")}</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {GUIDES.slice(0, 4).map((g) => (
            <li key={g.slug}>
              <a href={`/guides/${g.slug}`} className="block h-full rounded-xl border border-line bg-sheet p-4 text-sm hover:border-forest">
                <span className="font-semibold">{tr(g.title)}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm">
          <a href="/guides" className="underline">{tr("All guides")}</a>
          <span className="mx-2">·</span>
          <a href="/templates" className="underline">{tr("Templates gallery")}</a>
        </p>
        <AdSlot placement="landing" />
      </div>
    </section>
  );
}
