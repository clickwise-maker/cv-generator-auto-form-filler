import { tr } from "@/lib/i18n/i18n";

/** Honest trust strip: facts about how formzolo works, no counts or ratings. */
export function TrustStrip() {
  const items = [tr("No sign-up needed"), tr("Data stays in your browser"), tr("8 languages"), tr("Free watermarked preview")];
  return (
    <section aria-label={tr("Why formzolo")} className="border-y border-line bg-sheet" data-testid="trust-strip">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-2 px-4 py-4 text-sm text-ink/80 sm:grid-cols-4">
        {items.map((t) => (
          <li key={t} className="flex items-center gap-2">
            <span aria-hidden className="grid size-5 shrink-0 place-items-center rounded-full bg-forest/10 text-xs text-forest">✓</span>
            {t}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ThreeSteps() {
  const steps = [
    [tr("Enter your details once"), tr("Type them in or read them from a photo or PDF of an old CV.")],
    [tr("Pick a template"), tr("Switch templates any time; the page updates as you type.")],
    [tr("Download or fill forms"), tr("Get a free watermarked PDF, or unlock a clean PDF or Word file.")],
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14" aria-labelledby="steps-title" data-testid="three-steps">
      <h2 id="steps-title" className="font-serif text-2xl text-forest sm:text-3xl">{tr("Your CV in 3 steps")}</h2>
      <ol className="mt-6 grid gap-4 sm:grid-cols-3">
        {steps.map(([t, b], i) => (
          <li key={t} className="rounded-2xl border border-line bg-sheet p-5">
            <span className="grid size-9 place-items-center rounded-full bg-forest text-sm font-semibold text-white">{i + 1}</span>
            <p className="mt-3 font-serif text-lg text-forest">{t}</p>
            <p className="mt-1 text-sm text-ink/75">{b}</p>
          </li>
        ))}
      </ol>
      <p className="mt-6"><a href="/templates" className="text-sm font-medium text-forest underline">{tr("Browse all templates")}</a></p>
    </section>
  );
}

/** Mirrors the prices on /services (display only — checkout lives in the editor). */
export function PricingSection() {
  const plans: [string, string, string, boolean][] = [
    [tr("Free"), "₹0", tr("Create, edit and save unlimited CVs. Watermarked download."), false],
    [tr("Single Use"), "₹20 / $1", tr("One clean CV download or one form fill."), false],
    [tr("Career Starter"), tr("₹1,000/year"), tr("2 profiles, 100 CV generations and 100 form fills."), true],
    [tr("Global Pro"), tr("$29/year"), tr("300 CV generations and 300 form fills."), false],
  ];
  return (
    <section className="bg-[#EAF1EC]" aria-labelledby="pricing-title" data-testid="pricing">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <h2 id="pricing-title" className="font-serif text-2xl text-forest sm:text-3xl">{tr("Simple pricing")}</h2>
        <p className="mt-2 max-w-2xl text-sm text-ink/75">{tr("No monthly plan. Editing and the watermarked preview are always free.")}</p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map(([name, price, body, hl]) => (
            <li key={name} className={`rounded-2xl border bg-sheet p-5 ${hl ? "border-forest shadow-md" : "border-line"}`}>
              <p className="font-semibold text-forest">{name}</p>
              <p className="mt-1 font-serif text-2xl text-ink">{price}</p>
              <p className="mt-2 text-sm text-ink/75">{body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6"><a href="/services" className="text-sm font-medium text-forest underline">{tr("See full plan details")}</a></p>
      </div>
    </section>
  );
}
