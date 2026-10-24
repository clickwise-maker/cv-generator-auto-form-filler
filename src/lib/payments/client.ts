import type { Profile, Settings } from "@/lib/cv/model";
import type { ExportFormat, PaywallStatus } from "@/lib/payments/config";

/**
 * Browser side of the paid export. Local storage only remembers a document id
 * and the server-issued entitlement id (a reference, like a receipt number).
 * It grants nothing by itself: every clean download is re-checked on the server.
 */
const KEY = "meridian.export.v1";
const API = "/api/paid-export";

type Local = { docId: string; entitlementId?: string; orderId?: string; test?: boolean };

function randomId(prefix: string) {
  const bytes = new Uint8Array(12);
  crypto.getRandomValues(bytes);
  return `${prefix}_${Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("")}`;
}

export function readLocal(): Local {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "null") as Local | null;
    if (raw && typeof raw.docId === "string" && raw.docId.length >= 8) return raw;
  } catch {
    // storage blocked: fall through to an in-memory id
  }
  const fresh = { docId: randomId("doc") };
  writeLocal(fresh);
  return fresh;
}

export function writeLocal(next: Local) {
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
  ) {
    super(message);
  }
}

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API}/${path}`, { ...init, headers: { "content-type": "application/json", ...(init?.headers ?? {}) } });
  } catch {
    throw new ApiError(0, "network", "Could not reach the server. Check your connection and retry.");
  }
  const type = res.headers.get("content-type") ?? "";
  if (!type.includes("application/json")) {
    if (!res.ok) throw new ApiError(res.status, "server_unavailable", "Paid exports are not yet available on this site.");
    return res as unknown as T;
  }
  const body = await res.json();
  if (!res.ok) throw new ApiError(res.status, body.error ?? "error", body.message ?? "Request failed.");
  return body as T;
}

export type PublicOrder = {
  orderId: string;
  status: "created" | "paid" | "failed" | "cancelled";
  amountMinor: number;
  currency: string;
  test: boolean;
  provider: "simulated" | "razorpay";
  providerOrderId: string;
  entitlementId?: string;
  publicKey?: string;
};

export async function fetchStatus(): Promise<PaywallStatus> {
  try {
    return await call<PaywallStatus>("status");
  } catch {
    // Static hosting (e.g. the Render preview) has no server: say so honestly.
    return {
      mode: "unavailable",
      trialMode: true,
      priceMinor: 0,
      currency: "INR",
      priceLabel: "",
      policy: "version",
      maxDownloads: 0,
      policyText: "",
      provider: null,
      message: "Paid clean exports are not yet available. You can keep editing and download the watermarked preview for free.",
    };
  }
}

export function createOrder(profile: Profile, settings: Settings, idempotencyKey: string) {
  const { docId } = readLocal();
  return call<PublicOrder>("order", { method: "POST", body: JSON.stringify({ docId, profile, settings, idempotencyKey }) });
}

export function simulatePayment(orderId: string, outcome: "success" | "failure" | "cancel") {
  return call<PublicOrder>("simulate", { method: "POST", body: JSON.stringify({ orderId, outcome }) });
}

export function verifyPayment(orderId: string, paymentId: string, signature: string) {
  return call<PublicOrder>("verify", { method: "POST", body: JSON.stringify({ orderId, paymentId, signature }) });
}

export function cancelOrder(orderId: string) {
  return call<PublicOrder>("cancel", { method: "POST", body: JSON.stringify({ orderId }) });
}

export function newIdempotencyKey() {
  return randomId("idem");
}

export async function downloadClean(format: ExportFormat, entitlementId: string, profile: Profile, settings: Settings) {
  const { docId } = readLocal();
  const res = await call<Response>("download", { method: "POST", body: JSON.stringify({ format, entitlementId, docId, profile, settings }) });
  const blob = await res.blob();
  const name = /filename="([^"]+)"/.exec(res.headers.get("content-disposition") ?? "")?.[1] ?? `cv.${format}`;
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Razorpay hosted Checkout (card/UPI details are entered on Razorpay, never here). Only used when live is configured. */
type RazorpayResult = { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string };
export async function openRazorpay(order: PublicOrder, description: string): Promise<RazorpayResult | "dismissed"> {
  await new Promise<void>((resolve, reject) => {
    if ((window as unknown as { Razorpay?: unknown }).Razorpay) return resolve();
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve();
    s.onerror = () => reject(new ApiError(0, "checkout_load", "Could not load the payment window."));
    document.head.appendChild(s);
  });
  return new Promise((resolve) => {
    const Rzp = (window as unknown as { Razorpay: new (opts: unknown) => { open(): void } }).Razorpay;
    new Rzp({
      key: order.publicKey,
      order_id: order.providerOrderId,
      amount: order.amountMinor,
      currency: order.currency,
      name: "Meridian CV",
      description,
      handler: (r: RazorpayResult) => resolve(r),
      modal: { ondismiss: () => resolve("dismissed") },
    }).open();
  });
}
