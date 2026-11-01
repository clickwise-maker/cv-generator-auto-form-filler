import { tr, useLang } from "@/lib/i18n/i18n";
import { LOCALE_SEO } from "@/lib/seo-locales";
import { readSession } from "@/lib/auth/supa";
import { goToSignIn } from "@/components/landing/auth-gate";
import { useMode, type StudioMode } from "@/lib/cv/mode";

declare const __HERO_VIDEO__: boolean;
const HAS_VIDEO = typeof __HERO_VIDEO__ !== "undefined" && __HERO_VIDEO__;

/** Homepage hero: the page's single H1 and the two entry points. No video. */
export function LandingHero() {
  const setMode = useMode((state) => state.setMode);

  const start = (mode: StudioMode) => {
    setMode(mode);
    if (!readSession()) return goToSignIn();
    requestAnimationFrame(() =>
      document.getElementById("studio")?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  };

  return (
    <section
      className="relative overflow-hidden text-ink"
      style={{
        background:
          "radial-gradient(900px 420px at 85% -10%, rgba(166,132,86,.14), transparent), linear-gradient(180deg, #F4F8F5, #E7F1EB)",
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
            preload="auto"
            aria-hidden
          />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sheet/55 via-sheet/45 to-sheet/80 lg:hidden" />
        </>
      ) : null}
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:py-20 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <p className="hidden w-fit rounded-full border border-forest/15 bg-white/70 px-2.5 py-0.5 text-[11px] font-medium text-forest/80 sm:ml-auto sm:block">{tr("formzolo · Free CV maker & form filler")}</p>
          <h1 className="mt-3 font-serif text-3xl font-medium leading-tight text-forest sm:mt-3 sm:text-5xl">
            {LOCALE_SEO[useLang.getState().lang].h1}
          </h1>
          <p className="mt-3 text-base font-medium text-ink/80 sm:hidden">{tr("Your CV and forms, done in minutes.")}</p>
          <p className="mt-4 hidden max-w-xl text-lg text-ink/75 sm:block">
            {tr("Enter your details once. Get a finished CV in PDF or Word, or let any form fill itself from a photo, image, or PDF.")}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            <button
              type="button"
              onClick={() => start("generator")}
              className="h-12 rounded-full bg-forest px-6 text-base font-semibold text-white shadow-md hover:bg-[#24624F] transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              {tr("Build your CV")}
            </button>
            <button
              type="button"
              onClick={() => start("filler")}
              className="hidden h-12 rounded-full border border-forest/40 bg-white/60 px-6 text-sm font-semibold text-forest transition hover:-translate-y-0.5 hover:bg-white sm:block"
            >
              {tr("Fill your form")}
            </button>
          </div>
          <p className="mt-3 hidden text-xs text-ink/60 sm:block">{tr("Guest mode — no email, phone or OTP needed")}</p>
        </div>
        {HAS_VIDEO ? (
          <div className="hidden justify-center lg:row-span-2 lg:flex">
            <div className="relative aspect-[720/990] w-full max-w-[340px] overflow-hidden rounded-3xl border border-forest/10 bg-[#0f2a22] shadow-[0_24px_50px_rgba(27,77,62,.18)] ring-4 ring-forest/10">
              <video
                className="hero-video h-full w-full scale-[1.025] object-cover"
                src="/media/hero.mp4"
                poster="/media/hero-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                disablePictureInPicture
                preload="auto"
                aria-hidden
              />
              <img src="/media/hero-poster.jpg" alt="" aria-hidden className="hero-poster absolute inset-0 hidden h-full w-full object-cover" />
            </div>
          </div>
        ) : null}
        <ul className={HAS_VIDEO ? "hidden gap-3 text-sm sm:grid sm:grid-cols-3 lg:col-start-1 lg:grid-cols-3" : "hidden gap-3 text-sm sm:grid"}>
          {[
            ["01", tr("CV generator"), tr("A finished page, then PDF or Word.")],
            ["02", tr("Auto form filler"), tr("Photo, PDF, or a letter. The fields fill themselves.")],
            ["03", tr("One profile"), tr("Your details stay in one place for every CV and form.")],
          ].map(([n, title, body]) => (
            <li key={n} className="rounded-2xl border border-forest/10 bg-white/70 p-5 backdrop-blur-sm">
              <span className="font-serif text-xs text-forest/60">{n}</span>
              <p className="mt-1 font-serif text-lg text-forest">{title}</p>
              <p className="mt-1 text-ink/70">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
