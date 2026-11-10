import { tr } from "@/lib/i18n/i18n";

const ITEMS: [string, string][] = [
  ["Interview preparation", "Short, practical guides for common interview rounds."],
  ["Salary & offer basics", "How to read an offer letter and what to ask before you accept."],
  ["Application checklists", "Checklists for government, PSU and private job forms so nothing is missed."],
];

/** Career & job insights — own blue accent, intentionally not green. Coming soon. */
export function InsightsSection() {
  return (
    <section aria-labelledby="ins-h" className="border-t-4 border-[#0E5A8A] bg-[#EAF3FA] py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#0E5A8A]">{tr("Insights · Coming soon")}</span>
          <h2 id="ins-h" className="mt-2 font-serif text-3xl text-[#0B3A5B]">{tr("Career & job insights")}</h2>
          <p className="mt-3 text-muted">{tr("Practical guides to help you prepare better applications. We are writing these now — no data or numbers are published yet.")}</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {ITEMS.map(([t, b]) => (
            <article key={t} className="rounded-2xl border border-[#C9DEEE] border-l-4 border-l-[#0E5A8A] bg-white p-6">
              <h3 className="text-lg font-semibold">{tr(t)}</h3>
              <p className="mt-2 text-sm text-muted">{tr(b)}</p>
              <span className="mt-4 inline-block rounded-full bg-[#0E5A8A] px-2.5 py-0.5 text-xs font-bold text-white">{tr("Coming soon")}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
