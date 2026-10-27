import type { ReactNode } from "react";
import { tr } from "@/lib/i18n/i18n";
import { SiteFooter } from "@/components/site-footer";

/** Shared header/nav for content pages (guides, templates, next steps). */
export function ContentShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-line bg-paper">
        <nav className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-4 gap-y-1 px-4 py-3 text-sm" aria-label={tr("Main")}>
          <a href="/" className="me-auto font-serif text-lg">
            {tr("CV Studio")}
          </a>
          <a href="/" className="text-forest">{tr("CV generator")}</a>
          <a href="/guides" className="text-forest">{tr("Guides")}</a>
          <a href="/templates" className="text-forest">{tr("Templates")}</a>
          <a href="/about" className="text-forest">{tr("About & Contact")}</a>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function contentHead(title: string, desc: string, path: string) {
  const url = `https://cvstudio-app.onrender.com${path}`;
  return {
    meta: [
      { title: `${title} — CV Studio` },
      { name: "description", content: desc },
      { property: "og:title", content: `${title} — CV Studio` },
      { property: "og:description", content: desc },
      { property: "og:url", content: url },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
