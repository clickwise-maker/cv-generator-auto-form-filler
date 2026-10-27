import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Studio } from "@/components/studio/studio";
import { useStudio } from "@/lib/cv/store";
import { TEMPLATES, type TemplateId } from "@/lib/cv/model";
import { GuidesTeaser } from "@/components/content/guides-teaser";
import { SiteFooter } from "@/components/site-footer";
import { ConsentGate } from "@/components/privacy/consent-ui";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const hydrate = useStudio((state) => state.hydrate);

  useEffect(() => {
    hydrate();
    // Template chosen in the /templates gallery.
    const pick = new URLSearchParams(window.location.search).get("template");
    if (pick && TEMPLATES.some((t) => t.id === pick)) {
      useStudio.getState().setSettings({ template: pick as TemplateId });
      window.history.replaceState(null, "", "/");
    }
  }, [hydrate]);

  return (
    <>
      <Studio />
      <GuidesTeaser />
      <SiteFooter />
      <ConsentGate />
    </>
  );
}