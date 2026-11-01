import { SiteHeader, LogoMark } from "@/components/brand";
import { tr } from "@/lib/i18n/i18n";
import { Link } from "@tanstack/react-router";
import { SiteFooter } from "./site-footer";

export const EMAIL = "team@formzalo.com";

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
  const url = `https://formzalo.com/${c.slug}`;
  return {
    meta: [
      { title: `${c.title} — formzolo` },
      { name: "description", content: c.desc },
      { property: "og:title", content: `formzolo — ${c.title}` },
      { property: "og:description", content: c.desc },
      { property: "og:url", content: url },
      { name: "twitter:title", content: `formzolo — ${c.title}` },
      { name: "twitter:description", content: c.desc },
    ],
    links: [
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
      {tr("Email")}:{" "}
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
            {tr(i)}
          </p>
        ))
      ) : (
        <ul className="mt-2 list-disc space-y-1 ps-5 text-sm leading-relaxed">
          {rest.map((i) => (
            <li key={i}>{tr(i)}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export function InfoPage({ c }: { c: InfoContent }) {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-paper px-4 py-10 text-ink">
        <div className="mx-auto max-w-3xl">
          <Link to="/" className="text-xs uppercase tracking-[0.3em] text-ink/60 hover:text-ink">
            {tr("formzolo")}
          </Link>
          <h1 className="mt-4 font-serif text-4xl">{tr(c.title)}</h1>
          <p className="mt-2 text-sm text-ink/70">
            {tr(c.lead)}
          </p>
          <section className="mt-8 rounded-lg border border-line bg-sheet p-6">
            {c.en.map(([t, items]) => (
              <div key={t} className="mt-6 first:mt-0">
                <h3 className="font-semibold">{tr(t)}</h3>
                <Items items={items} plain={!!c.faq} />
              </div>
            ))}
          </section>
          <p className="mt-8 text-sm">
            <Link to="/" className="underline">
              {tr("← Back to formzolo")}
            </Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
