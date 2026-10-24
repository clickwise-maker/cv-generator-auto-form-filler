import { createFileRoute } from "@tanstack/react-router";
import { InfoPage, infoHead, type InfoContent } from "@/components/info-page";
import data from "@/content/privacy-policy.json";

const c = data as unknown as InfoContent;

export const Route = createFileRoute("/privacy-policy")({
  head: () => infoHead(c),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return <InfoPage c={c} />;
}
