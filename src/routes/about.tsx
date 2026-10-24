import { createFileRoute } from "@tanstack/react-router";
import { InfoPage, infoHead, type InfoContent } from "@/components/info-page";
import data from "@/content/about.json";

const c = data as unknown as InfoContent;

export const Route = createFileRoute("/about")({
  head: () => infoHead(c),
  component: AboutPage,
});

function AboutPage() {
  return <InfoPage c={c} />;
}
