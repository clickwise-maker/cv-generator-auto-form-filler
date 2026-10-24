import { Link } from "@tanstack/react-router";
import { SiteFooter } from "./site-footer";

export const EMAIL = "clickwisewholesalebazar@gmail.com";

type Sec = [string, string[]];
export type InfoContent = {
  slug: string;
  title: string;
  hi_title: string;
  desc: string;
  lead: string;
  en: Sec[];
  hi: Sec[];
  faq?: boolean;
  faqld?: unknown;
};

export function infoHead(c: InfoContent) {
  const url = `https://cvstudio-app.onrender.com/${c.slug}`;
  return {
    meta: [
      { title: `${c.title} — CV Studio` },
      { name: "description", content: c.desc },
      { property: "og:title", content: `CV Studio — ${c.title}` },
      { property: "og:description", content: c.desc },
      { property: "og:url", content: url },
    ],
    links: [
      { rel: "canonical", href: url },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600&display=swap",
      },
    ],
    scripts: c.faqld ? [{ type: "application/ld+json", children: JSON.stringify(c.faqld) }] : [],
  };
}

function Items({ items, plain }: { items: string[]; plain: boolean }) {
  const mail = (
    <p className="mt-2 text-sm leading-relaxed">
      Email / ईमेल:{" "}
      <a className="underline" href={`mailto:${EMAIL}`}>
        {EMAIL}
      </a>
    </p>
  );
  const rest = items.filter((i) => i !== "mail");
  return (
    <>
      {items.includes("mail") && mail}
      {plain || rest.length === 1 ? (
        rest.map((i) => (
          <p key={i} className="mt-2 text-sm leading-relaxed">
            {i}
          </p>
        ))
      ) : (
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
          {rest.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export function InfoPage({ c }: { c: InfoContent }) {
  const langs = [
    { id: "en", heading: c.title, secs: c.en },
    { id: "hi", heading: c.hi_title, secs: c.hi },
  ];
  return (
    <>
      <main className="min-h-screen bg-paper px-4 py-10 text-ink">
        <div className="mx-auto max-w-3xl">
          <Link to="/" className="text-xs uppercase tracking-[0.3em] text-ink/60 hover:text-ink">
            CV Studio
          </Link>
          <h1 className="mt-4 font-serif text-4xl">{c.title}</h1>
          <p className="mt-2 text-sm text-ink/70">
            {c.lead}{" "}
            <a href="#hi" lang="hi" className="underline">
              हिंदी में पढ़ें
            </a>
          </p>
          {langs.map((l) => (
            <section
              key={l.id}
              id={l.id}
              lang={l.id}
              className="mt-8 rounded-lg border border-line bg-sheet p-6"
              style={l.id === "hi" ? { fontFamily: '"Noto Sans Devanagari", var(--font-sans)' } : undefined}
            >
              <h2 className="text-2xl font-semibold">{l.heading}</h2>
              {l.secs.map(([t, items]) => (
                <div key={t} className="mt-6">
                  <h3 className="font-semibold">{t}</h3>
                  <Items items={items} plain={!!c.faq} />
                </div>
              ))}
            </section>
          ))}
          <p className="mt-8 text-sm">
            <Link to="/" className="underline">
              ← Back to CV Studio
            </Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
