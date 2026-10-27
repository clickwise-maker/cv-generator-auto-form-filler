import { createFileRoute } from "@tanstack/react-router";
import { tr } from "@/lib/i18n/i18n";
import { GUIDES } from "@/lib/content/guides";
import { ContentShell, contentHead } from "@/components/content/content-shell";
import { AffiliateBlocks } from "@/components/ads/affiliate-blocks";

export const Route = createFileRoute("/next-steps")({
  head: () => ({ ...contentHead("After you download your CV", "What to check before you send your CV, and guides for the next steps.", "/next-steps"), meta: [{ title: "After you download your CV — CV Studio" }, { name: "robots", content: "noindex" }] }),
  component: NextSteps,
});

const CHECKLIST = [
  // i18n-data:start
  "Open the downloaded file once and check names, dates and contact details.",
  "Rename the file with your name if the employer asks for a specific format.",
  "Write a short cover letter for each application.",
  "Keep a list of where you applied and on which date.",
  // i18n-data:end
];

function NextSteps() {
  return (
    <ContentShell>
      <h1 className="font-serif text-4xl">{tr("After you download your CV")}</h1>
      <p className="mt-2 text-sm text-muted">{tr("Your file has been prepared. Here is what to do before you send it.")}</p>
      <ol className="mt-6 list-decimal space-y-2 ps-5" data-testid="next-checklist">
        {CHECKLIST.map((c) => <li key={c}>{tr(c)}</li>)}
      </ol>
      <h2 className="mt-10 font-serif text-2xl">{tr("Helpful guides")}</h2>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
        {GUIDES.slice(0, 6).map((g) => (
          <li key={g.slug}><a href={`/guides/${g.slug}`} className="block rounded-xl border border-line bg-sheet p-4 text-sm hover:border-forest"><span className="font-semibold">{tr(g.title)}</span><span className="mt-1 block text-muted">{tr(g.desc)}</span></a></li>
        ))}
      </ul>
      <AffiliateBlocks />
      <p className="mt-10 text-sm"><a href="/" className="underline">{tr("← Back to CV Studio")}</a></p>
    </ContentShell>
  );
}
