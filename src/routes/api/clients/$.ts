import { createFileRoute } from "@tanstack/react-router";
import { handleClients } from "@/lib/clients/http.server";

/** Commercial "Clients" API: owner link/list/get (entitlement-gated) + public intake/submit by token. */
export const Route = createFileRoute("/api/clients/$")({
  server: {
    handlers: {
      GET: async ({ request, params }) => handleClients(request, params._splat ?? ""),
      POST: async ({ request, params }) => handleClients(request, params._splat ?? ""),
    },
  },
});
