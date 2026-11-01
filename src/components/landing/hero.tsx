import { tr, useLang } from "@/lib/i18n/i18n";
import { LOCALE_SEO } from "@/lib/seo-locales";
import { useMode, type StudioMode } from "@/lib/cv/mode";

declare const __HERO_VIDEO__: boolean;
const HAS_VIDEO = typeof __HERO_VIDEO__ !== "undefined" && __HERO_VIDEO__;

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
    <section
      className="relative overflow-hidden text-sheet"
      style={{
        background:
          "radial-gradient(900px 420px at 85% -10%, rgba(166,132,86,.28), transparent), linear-gradient(180deg, #1B4D3E, #102E26)",
      }}
    >
      {HAS_VIDEO ? (
        <>
          <video
            className="hero-video pointer-events-none absolute inset-0 h-full w-full object-cover lg:hidden"
            src="/media/hero.mp4"
            poster="/media/hero-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
          />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-forest/85 to-forest-deep/90 lg:hidden" />
        </>
      ) : null}
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-20 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <p className="inline-block rounded-full border border-sheet/20 bg-sheet/10 px-3.5 py-1 text-sm font-semibold text-brass-soft">{tr("formzolo · Free CV maker & form filler")}</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
            {LOCALE_SEO[useLang.getState().lang].h1}
          </h1>
          <p className="mt-4 max-w-xl text-base text-mist sm:text-lg">
            {tr("Enter your details once. Get a finished CV in PDF or Word, or let any form fill itself from a photo, image, or PDF.")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => start("generator")}
              className="h-12 rounded-full bg-brass px-6 text-sm font-bold text-ink shadow-lg hover:bg-[#C2A273] transition hover:-translate-y-0.5 hover:shadow-xl"
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
        {HAS_VIDEO ? (
          <div className="hidden justify-center lg:row-span-2 lg:flex">
            <div className="relative aspect-[720/990] w-full max-w-[340px] overflow-hidden rounded-3xl border border-sheet/15 shadow-[0_30px_60px_rgba(0,0,0,.35)] ring-4 ring-brass/30">
              <video
                className="hero-video h-full w-full object-cover"
                src="/media/hero.mp4"
                poster="/media/hero-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden
              />
              <img src="/media/hero-poster.jpg" alt="" aria-hidden className="hero-poster absolute inset-0 hidden h-full w-full object-cover" />
            </div>
          </div>
        ) : null}
        <ul className={HAS_VIDEO ? "grid gap-3 text-sm sm:grid-cols-3 lg:col-start-1 lg:grid-cols-3" : "grid gap-3 text-sm"}>
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
