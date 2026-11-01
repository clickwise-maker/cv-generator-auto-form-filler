import type { ReactNode } from "react";
import { tr } from "@/lib/i18n/i18n";
import { SiteHeader } from "@/components/brand";
import { SiteFooter } from "@/components/site-footer";

/** Shared header/nav for content pages (guides, templates, next steps). */
export function ContentShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function contentHead(title: string, desc: string, path: string) {
  const url = `https://formzalo.com${path}`;
  return {
    meta: [
      { title: `${title} — formzolo` },
      { name: "description", content: desc },
      { property: "og:title", content: `${title} — formzolo` },
      { property: "og:description", content: desc },
      { property: "og:url", content: url },
      { name: "twitter:title", content: `${title} — formzolo` },
      { name: "twitter:description", content: desc },
    ],
    links: [],
  };
}
