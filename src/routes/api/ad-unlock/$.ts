import { createFileRoute } from "@tanstack/react-router";
import { handleUnlockDownload, handleUnlockGrant, handleUnlockStatus } from "@/lib/ads/unlock-http.server";

const notFound = () => new Response(JSON.stringify({ error: "not_found" }), { status: 404, headers: { "content-type": "application/json" } });

/** Opt-in rewarded-ad free download. 404 unless WATCH_AD_UNLOCK.enabled and AD_UNLOCK_SECRET are set. */
export const Route = createFileRoute("/api/ad-unlock/$")({
  server: {
    handlers: {
      GET: async ({ request, params }) => (params._splat === "status" ? handleUnlockStatus(request) : notFound()),
      POST: async ({ request, params }) => {
        if (params._splat === "grant") return handleUnlockGrant(request);
        if (params._splat === "download") return handleUnlockDownload(request);
        return notFound();
      },
    },
  },
});
