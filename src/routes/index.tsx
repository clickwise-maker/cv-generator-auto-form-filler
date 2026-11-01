import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Studio } from "@/components/studio/studio";
import { useStudio } from "@/lib/cv/store";
import { TEMPLATES, type TemplateId } from "@/lib/cv/model";
import { GuidesTeaser } from "@/components/content/guides-teaser";
import { SiteFooter } from "@/components/site-footer";
import { LandingHero } from "@/components/landing/hero";
import { SiteHeader } from "@/components/brand";
import { InsightsSection } from "@/components/landing/insights";
import { AuthPanel } from "@/components/landing/auth-panel";
import { ShareFormzolo, captureRef } from "@/components/landing/share";
import { PricingSection, ThreeSteps, TrustStrip } from "@/components/landing/sections";
import { ConsentGate } from "@/components/privacy/consent-ui";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const hydrate = useStudio((state) => state.hydrate);

  useEffect(() => {
    hydrate();
    captureRef();
    window.addEventListener("cvstudio-consent", captureRef);
    // Template chosen in the /templates gallery.
    const pick = new URLSearchParams(window.location.search).get("template");
    if (pick && TEMPLATES.some((t) => t.id === pick)) {
      useStudio.getState().setSettings({ template: pick as TemplateId });
      window.history.replaceState(null, "", "/");
    }
    return () => window.removeEventListener("cvstudio-consent", captureRef);
  }, [hydrate]);

  return (
    <>
      <SiteHeader current="/" />
      <LandingHero />
      <TrustStrip />
      <AuthPanel />
      <ThreeSteps />
      <div id="studio" className="scroll-mt-0">
        <Studio />
      </div>
      <div className="hidden sm:block">
        <InsightsSection />
        <GuidesTeaser />
      </div>
      <PricingSection />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <ShareFormzolo />
      </div>
      <SiteFooter />
      <ConsentGate />
    </>
  );
}