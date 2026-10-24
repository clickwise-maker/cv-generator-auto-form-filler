import { createFileRoute } from "@tanstack/react-router";
import { InfoPage, infoHead, type InfoContent } from "@/components/info-page";
import data from "@/content/terms.json";

const c = data as unknown as InfoContent;

export const Route = createFileRoute("/terms")({
  head: () => infoHead(c),
  component: TermsPage,
});

function TermsPage() {
  return <InfoPage c={c} />;
}
