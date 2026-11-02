import { createFileRoute } from "@tanstack/react-router";
import { adsTxt } from "@/config/ads";

/** /ads.txt: served only when ADSENSE_CLIENT is a real ca-pub id; 404 otherwise. */
export const Route = createFileRoute("/ads.txt")({
  server: {
    handlers: {
      GET: async () => {
        const body = adsTxt();
        return body
          ? new Response(body, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" } })
          : new Response("Not found\n", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
      },
    },
  },
});
