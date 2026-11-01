import { SiteHeader } from "@/components/brand";
import { SiteFooter } from "@/components/site-footer";
import { tr } from "@/lib/i18n/i18n";

export function NotFoundPage() {
  return (
    <>
      <SiteHeader />
      <main className="grid min-h-[60vh] place-items-center bg-paper px-4 py-16 text-center text-ink" data-testid="not-found">
        <div className="max-w-md">
          <p className="font-serif text-6xl text-forest/30">404</p>
          <h1 className="mt-2 font-serif text-3xl text-forest">{tr("Page not found")}</h1>
          <p className="mt-3 text-ink/75">{tr("This page does not exist or has moved.")}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <a href="/" className="h-11 content-center rounded-full bg-forest px-5 text-sm font-medium text-white">{tr("Build your first CV")}</a>
            <a href="/templates" className="h-11 content-center rounded-full border border-forest px-5 text-sm font-medium text-forest">{tr("CV Templates")}</a>
            <a href="/services" className="h-11 content-center rounded-full border border-forest px-5 text-sm font-medium text-forest">{tr("Plans")}</a>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
