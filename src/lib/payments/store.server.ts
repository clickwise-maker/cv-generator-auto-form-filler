/**
 * Persistence boundary for orders and entitlements.
 *
 * MemoryPaymentStore is the only implementation shipped: it is fine for local
 * trial/testing, but it is NOT durable (lost on restart, not shared between
 * serverless instances). Before enabling live payments, implement this
 * interface on a real database — see docs/PAID_EXPORT.md for the proposed
 * Supabase table + RLS design (not created).
 */
export type OrderStatus = "created" | "paid" | "failed" | "cancelled";

export type OrderRecord = {
  orderId: string; // our unique id (receipt)
  providerOrderId: string;
  provider: "simulated" | "razorpay";
  test: boolean;
  amountMinor: number;
  currency: string;
  status: OrderStatus;
  docId: string;
  versionHash: string;
  cvKey: string;
  idempotencyKey: string;
  planId?: string;
  createdAt: number;
  paidAt?: number;
  paymentId?: string;
  entitlementId?: string;
};

export type EntitlementRecord = {
  entitlementId: string;
  orderId: string;
  test: boolean;
  policy: "version" | "cv";
  versionHash: string;
  cvKey: string;
  maxDownloads: number;
  downloads: number;
  createdAt: number;
  // Package credits (see PLANS in config.ts). Optional for backward compatibility.
  planId?: string;
  expiresAt?: number | null;
  cvGenerationsLeft?: number;
  formFillsLeft?: number;
  companies?: string[];
  /** version hashes already charged a CV generation (repeat downloads of a version are free). */
  chargedVersions?: string[];
  /** Pending form-fill reservations: id -> company. Credit is held, refunded on failure. */
  pendingFills?: Record<string, string>;
};

export interface PaymentStore {
  getOrder(orderId: string): Promise<OrderRecord | undefined>;
  getOrderByProviderId(providerOrderId: string): Promise<OrderRecord | undefined>;
  findOrderByIdempotencyKey(key: string): Promise<OrderRecord | undefined>;
  putOrder(order: OrderRecord): Promise<void>;
  getEntitlement(id: string): Promise<EntitlementRecord | undefined>;
  putEntitlement(ent: EntitlementRecord): Promise<void>;
  /** Returns false if the event id was already processed (webhook replay). */
  markEventProcessed(eventId: string): Promise<boolean>;
}

export class MemoryPaymentStore implements PaymentStore {
  orders = new Map<string, OrderRecord>();
  entitlements = new Map<string, EntitlementRecord>();
  events = new Set<string>();

  async getOrder(id: string) {
    const o = this.orders.get(id);
    return o ? { ...o } : undefined;
  }
  async getOrderByProviderId(pid: string) {
    for (const o of this.orders.values()) if (o.providerOrderId === pid) return { ...o };
    return undefined;
  }
  async findOrderByIdempotencyKey(key: string) {
    for (const o of this.orders.values()) if (o.idempotencyKey === key) return { ...o };
    return undefined;
  }
  async putOrder(order: OrderRecord) {
    this.orders.set(order.orderId, { ...order });
  }
  async getEntitlement(id: string) {
    const e = this.entitlements.get(id);
    return e ? { ...e } : undefined;
  }
  async putEntitlement(ent: EntitlementRecord) {
    this.entitlements.set(ent.entitlementId, { ...ent });
  }
  async markEventProcessed(id: string) {
    if (this.events.has(id)) return false;
    this.events.add(id);
    return true;
  }
}
