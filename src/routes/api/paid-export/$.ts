import { createFileRoute } from "@tanstack/react-router";
import {
  handleCancel,
  handleCleanExport,
  handleCreateOrder,
  handleSimulate,
  handleStatus,
  handleVerify,
  handleWebhook,
} from "@/lib/payments/http.server";

/**
 * Server-only API for the one-time paid export. Every clean PDF/DOCX in the
 * app is produced by POST /api/paid-export/download and nowhere else.
 */
const notFound = () => new Response(JSON.stringify({ error: "not_found" }), { status: 404, headers: { "content-type": "application/json" } });

export const Route = createFileRoute("/api/paid-export/$")({
  server: {
    handlers: {
      GET: async ({ request, params }) => (params._splat === "status" ? handleStatus(request) : notFound()),
      POST: async ({ request, params }) => {
        const path = params._splat ?? "";
        if (path === "order") return handleCreateOrder(request);
        if (path === "verify") return handleVerify(request);
        if (path === "cancel") return handleCancel(request);
        if (path === "simulate") return handleSimulate(request);
        if (path === "download") return handleCleanExport(request);
        if (path === "webhook/razorpay") return handleWebhook(request, "razorpay");
        if (path === "webhook/simulated") return handleWebhook(request, "simulated");
        return notFound();
      },
    },
  },
});
