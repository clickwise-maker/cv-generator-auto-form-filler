import { eq, SupabaseRest } from "../db/supabase-rest.server.ts";
import type { EntitlementRecord, OrderRecord, PaymentStore } from "./store.server.ts";

/** Supabase-backed PaymentStore (orders, plans/credits entitlements, webhook replay guard). Records kept as jsonb. */
export class SupabasePaymentStore implements PaymentStore {
  constructor(private readonly db: SupabaseRest) {}
  private async one<T>(table: string, q: string) {
    const rows = await this.db.select<{ data: T }>(table, `select=data&${q}&limit=1`);
    return rows[0]?.data;
  }
  getOrder(id: string) {
    return this.one<OrderRecord>("cv_orders", `order_id=${eq(id)}`);
  }
  getOrderByProviderId(pid: string) {
    return this.one<OrderRecord>("cv_orders", `provider_order_id=${eq(pid)}`);
  }
  findOrderByIdempotencyKey(key: string) {
    return this.one<OrderRecord>("cv_orders", `idempotency_key=${eq(key)}`);
  }
  async putOrder(o: OrderRecord) {
    await this.db.upsert("cv_orders", { order_id: o.orderId, provider_order_id: o.providerOrderId, idempotency_key: o.idempotencyKey, status: o.status, data: o });
  }
  getEntitlement(id: string) {
    return this.one<EntitlementRecord>("cv_entitlements", `entitlement_id=${eq(id)}`);
  }
  async putEntitlement(e: EntitlementRecord) {
    await this.db.upsert("cv_entitlements", { entitlement_id: e.entitlementId, order_id: e.orderId, plan_id: e.planId ?? null, data: e });
  }
  async markEventProcessed(id: string) {
    const rows = await this.db.insertIgnore("cv_webhook_events", { event_key: id });
    return rows.length > 0;
  }
}
