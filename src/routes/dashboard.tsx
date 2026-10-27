import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Dashboard } from "@/components/studio/dashboard";
import { useStudio } from "@/lib/cv/store";
import { SiteFooter } from "@/components/site-footer";
import { ConsentGate } from "@/components/privacy/consent-ui";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard · CV Studio" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  const hydrate = useStudio((state) => state.hydrate);
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <a href="/" className="grid size-9 shrink-0 place-items-center rounded-lg bg-forest font-serif text-sm text-sheet" aria-label="CV Studio home">
            CV
          </a>
          <div className="min-w-0 flex-1">
            <p className="font-serif text-lg leading-none">CV Studio</p>
            <p className="truncate text-xs text-muted">Guest mode — no email, phone or OTP needed</p>
          </div>
          <a href="/" className="h-11 content-center px-2 text-sm font-medium text-forest">
            Editor
          </a>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Dashboard />
      </main>
      <SiteFooter />
      <ConsentGate />
    </div>
  );
}
