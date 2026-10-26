import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import type { Profile } from "../cv/model.ts";

/**
 * Persistence boundary for the Commercial "Clients" feature.
 *
 * Preview ships FileClientStore (in-memory + JSON file snapshot). On Render's
 * free tier the disk is ephemeral, so links and client submissions are LOST on
 * every restart/redeploy. Before real use, implement this on Supabase — see
 * docs/CLIENTS_SUPABASE_MIGRATION.sql (proposed, NOT applied).
 */
export type ClientLink = {
  token: string; // unguessable bearer for the PUBLIC intake page only
  ownerEntitlementId: string; // owner = the commercial entitlement (held only in the owner's browser)
  ownerGuestId: string;
  businessName: string;
  createdAt: number;
  revoked?: boolean;
};

export type ClientRecord = {
  clientId: string;
  token: string;
  ownerEntitlementId: string;
  name: string;
  profile: Profile;
  consentAt: number;
  submittedAt: number;
};

export interface ClientStore {
  putLink(link: ClientLink): Promise<void>;
  getLink(token: string): Promise<ClientLink | undefined>;
  linksByOwner(ownerEntitlementId: string): Promise<ClientLink[]>;
  putClient(c: ClientRecord): Promise<void>;
  clientsByOwner(ownerEntitlementId: string): Promise<ClientRecord[]>;
  getClient(clientId: string): Promise<ClientRecord | undefined>;
}

type Snapshot = { links: ClientLink[]; clients: ClientRecord[] };

export class FileClientStore implements ClientStore {
  links = new Map<string, ClientLink>();
  clients = new Map<string, ClientRecord>();
  constructor(private readonly file: string | null) {
    if (!file) return;
    try {
      const snap = JSON.parse(readFileSync(file, "utf8")) as Snapshot;
      for (const l of snap.links ?? []) this.links.set(l.token, l);
      for (const c of snap.clients ?? []) this.clients.set(c.clientId, c);
    } catch {
      // no snapshot yet
    }
  }
  private flush() {
    if (!this.file) return;
    try {
      mkdirSync(dirname(this.file), { recursive: true });
      const tmp = `${this.file}.tmp`;
      writeFileSync(tmp, JSON.stringify({ links: [...this.links.values()], clients: [...this.clients.values()] } satisfies Snapshot));
      renameSync(tmp, this.file);
    } catch (e) {
      console.error("[clients] could not write snapshot", e);
    }
  }
  async putLink(link: ClientLink) {
    this.links.set(link.token, { ...link });
    this.flush();
  }
  async getLink(token: string) {
    const l = this.links.get(token);
    return l ? { ...l } : undefined;
  }
  async linksByOwner(owner: string) {
    return [...this.links.values()].filter((l) => l.ownerEntitlementId === owner).map((l) => ({ ...l }));
  }
  async putClient(c: ClientRecord) {
    this.clients.set(c.clientId, structuredClone(c));
    this.flush();
  }
  async clientsByOwner(owner: string) {
    return [...this.clients.values()].filter((c) => c.ownerEntitlementId === owner).map((c) => structuredClone(c));
  }
  async getClient(id: string) {
    const c = this.clients.get(id);
    return c ? structuredClone(c) : undefined;
  }
}
