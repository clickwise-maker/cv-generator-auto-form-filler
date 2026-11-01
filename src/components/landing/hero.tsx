import { tr } from "@/lib/i18n/i18n";
import { useMode, type StudioMode } from "@/lib/cv/mode";

/** Homepage hero: the page's single H1 and the two entry points. No video. */
export function LandingHero() {
  const setMode = useMode((state) => state.setMode);

  const start = (mode: StudioMode) => {
    setMode(mode);
    requestAnimationFrame(() =>
      document.getElementById("studio")?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  };

  return (
    <section className="relative overflow-hidden border-b border-line bg-forest-deep text-sheet">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 80% at 15% 10%, rgba(255,253,248,0.14), transparent 60%), radial-gradient(50% 70% at 90% 90%, rgba(255,253,248,0.10), transparent 60%)",
        }}
      />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-20 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <p className="kicker text-sheet/70">{tr("CV Studio")}</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
            {tr("Free CV generator and auto form filler")}
          </h1>
          <p className="mt-4 max-w-xl text-base text-sheet/80 sm:text-lg">
            {tr("Enter your details once. Get a finished CV in PDF or Word, or let any form fill itself from a photo, image, or PDF.")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => start("generator")}
              className="h-12 rounded-full bg-sheet px-6 text-sm font-semibold text-forest-deep shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              {tr("Build your first CV")}
            </button>
            <button
              type="button"
              onClick={() => start("filler")}
              className="h-12 rounded-full border border-sheet/40 px-6 text-sm font-semibold text-sheet transition hover:-translate-y-0.5 hover:bg-sheet/10"
            >
              {tr("Fill your form")}
            </button>
          </div>
          <p className="mt-4 text-xs text-sheet/60">{tr("Guest mode — no email, phone or OTP needed")}</p>
        </div>
        <ul className="grid gap-3 text-sm">
          {[
            ["01", tr("CV generator"), tr("A finished page, then PDF or Word.")],
            ["02", tr("Auto form filler"), tr("Photo, PDF, or a letter. The fields fill themselves.")],
            ["03", tr("One profile"), tr("Your details stay in one place for every CV and form.")],
          ].map(([n, title, body]) => (
            <li key={n} className="rounded-2xl border border-sheet/15 bg-sheet/5 p-5 backdrop-blur-sm">
              <span className="font-serif text-xs text-sheet/50">{n}</span>
              <p className="mt-1 font-serif text-lg">{title}</p>
              <p className="mt-1 text-sheet/70">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
