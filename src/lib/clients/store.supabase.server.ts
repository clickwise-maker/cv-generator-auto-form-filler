import { eq, SupabaseRest } from "../db/supabase-rest.server.ts";
import type { ClientLink, ClientRecord, ClientStore } from "./store.server.ts";

/** Supabase-backed ClientStore. Server-only (service_role); RLS has no anon policies. */
export class SupabaseClientStore implements ClientStore {
  constructor(private readonly db: SupabaseRest) {}
  async putLink(l: ClientLink) {
    await this.db.upsert("cv_client_links", { token: l.token, owner_entitlement_id: l.ownerEntitlementId, revoked: !!l.revoked, data: l });
  }
  async getLink(token: string) {
    return (await this.db.select<{ data: ClientLink }>("cv_client_links", `select=data&token=${eq(token)}&limit=1`))[0]?.data;
  }
  async linksByOwner(owner: string) {
    return (await this.db.select<{ data: ClientLink }>("cv_client_links", `select=data&owner_entitlement_id=${eq(owner)}`)).map((r) => r.data);
  }
  async putClient(c: ClientRecord) {
    await this.db.upsert("cv_client_submissions", {
      client_id: c.clientId,
      token: c.token,
      owner_entitlement_id: c.ownerEntitlementId,
      submitted_at: new Date(c.submittedAt).toISOString(),
      data: c,
    });
  }
  async clientsByOwner(owner: string) {
    return (await this.db.select<{ data: ClientRecord }>("cv_client_submissions", `select=data&owner_entitlement_id=${eq(owner)}`)).map((r) => r.data);
  }
  async getClient(id: string) {
    return (await this.db.select<{ data: ClientRecord }>("cv_client_submissions", `select=data&client_id=${eq(id)}&limit=1`))[0]?.data;
  }
  async deleteClient(id: string) {
    return (await this.db.delete("cv_client_submissions", `client_id=${eq(id)}`)).length > 0;
  }
  async purgeOlderThan(cutoff: number) {
    return (await this.db.delete("cv_client_submissions", `submitted_at=lt.${encodeURIComponent(new Date(cutoff).toISOString())}`)).length;
  }
}
