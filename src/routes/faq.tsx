import { createFileRoute } from "@tanstack/react-router";
import { InfoPage, infoHead, type InfoContent } from "@/components/info-page";
import data from "@/content/faq.json";

const c = data as unknown as InfoContent;

export const Route = createFileRoute("/faq")({
  head: () => infoHead(c),
  component: FaqPage,
});

function FaqPage() {
  return <InfoPage c={c} />;
}
