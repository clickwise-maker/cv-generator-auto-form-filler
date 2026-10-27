import { tr } from "@/lib/i18n/i18n";
import { AFFILIATES } from "@/config/ads";

/** Sponsored/affiliate cards. Visually distinct from ad units; links are rel="sponsored noopener". */
export function AffiliateBlocks() {
  return (
    <section className="mt-10" data-testid="affiliate-blocks" aria-label={tr("Sponsored")}>
      <p className="text-xs uppercase tracking-wider text-muted">{tr("Sponsored / affiliate links")}</p>
      <p className="mt-1 text-xs text-muted">{tr("We may earn a commission if you use these partners. It does not change the price you pay.")}</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {AFFILIATES.map((a) => (
          <a key={a.id} href={a.url} target="_blank" rel="sponsored noopener" className="rounded-2xl border-2 border-brass-soft bg-sheet p-4 text-sm hover:border-forest" data-testid={`affiliate-${a.id}`}>
            <span className="block font-semibold">{tr(a.title)}</span>
            <span className="mt-1 block text-muted">{tr(a.text)}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
