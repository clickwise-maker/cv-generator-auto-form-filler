/**
 * Minimal Supabase (PostgREST) client for server-side stores. No SDK dependency.
 * Enabled ONLY when STORE_BACKEND=supabase and SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are set.
 * Tables are defined in docs/SUPABASE_PERSISTENCE_MIGRATION.sql (proposed, NOT applied).
 */
export type SupabaseEnv = { url: string; key: string };

export function supabaseFromEnv(env: Record<string, string | undefined> = process.env): SupabaseEnv | null {
  if (env.STORE_BACKEND !== "supabase") return null;
  const url = env.SUPABASE_URL?.replace(/\/+$/, "");
  const key = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.warn("[db] STORE_BACKEND=supabase but SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY missing — using memory store");
    return null;
  }
  return { url, key };
}

export class SupabaseRest {
  constructor(private readonly env: SupabaseEnv, private readonly fetchImpl: typeof fetch = fetch) {}
  private async req(path: string, init: RequestInit & { prefer?: string } = {}) {
    const res = await this.fetchImpl(`${this.env.url}/rest/v1/${path}`, {
      ...init,
      headers: {
        apikey: this.env.key,
        authorization: `Bearer ${this.env.key}`,
        "content-type": "application/json",
        ...(init.prefer ? { prefer: init.prefer } : {}),
      },
    });
    if (!res.ok) throw new Error(`[db] ${init.method ?? "GET"} ${path.split("?")[0]} -> ${res.status} ${await res.text().catch(() => "")}`);
    const t = await res.text();
    return t ? JSON.parse(t) : null;
  }
  select<T>(table: string, query: string): Promise<T[]> {
    return this.req(`${table}?${query}`) as Promise<T[]>;
  }
  upsert(table: string, row: Record<string, unknown>) {
    return this.req(table, { method: "POST", body: JSON.stringify(row), prefer: "resolution=merge-duplicates,return=minimal" });
  }
  insertIgnore(table: string, row: Record<string, unknown>): Promise<unknown[]> {
    return this.req(table, { method: "POST", body: JSON.stringify(row), prefer: "resolution=ignore-duplicates,return=representation" });
  }
  delete<T>(table: string, query: string): Promise<T[]> {
    return this.req(`${table}?${query}`, { method: "DELETE", prefer: "return=representation" }) as Promise<T[]>;
  }
}

export const eq = (v: string) => `eq.${encodeURIComponent(v)}`;
