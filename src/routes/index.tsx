import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Studio } from "@/components/studio/studio";
import { useStudio } from "@/lib/cv/store";
import { SiteFooter } from "@/components/site-footer";
import { ConsentGate } from "@/components/privacy/consent-ui";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const hydrate = useStudio((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <>
      <Studio />
      <SiteFooter />
      <ConsentGate />
    </>
  );
}