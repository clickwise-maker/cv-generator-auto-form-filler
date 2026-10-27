/**
 * DPDP: drafts created via "Fill form for this client" hold a client's personal data in the
 * owner's browser. We tag them with the client_id so they can be erased once the client's
 * server record is gone (client withdrew, owner deleted it, or link revoked + purged).
 * The owner's own (non-client) draft is kept in a backup key and restored on purge.
 */
export const DOSSIER_KEY = "meridian.dossier.v1";
export const BACKUP_KEY = "meridian.dossier.backup.v1";
export const CLIENT_TAG_KEY = "meridian.dossier.client.v1";

type KV = Pick<Storage, "getItem" | "setItem" | "removeItem">;

export function readClientTag(s: KV): string | null {
  try {
    const v = JSON.parse(s.getItem(CLIENT_TAG_KEY) ?? "null") as { clientId?: unknown } | null;
    return v && typeof v.clientId === "string" ? v.clientId : null;
  } catch {
    return null;
  }
}

/** Call before loading a client's details into the working draft. */
export function tagClientDraft(s: KV, clientId: string) {
  // Back up the owner's own draft only if the current draft is not already a client draft.
  const own = s.getItem(DOSSIER_KEY);
  if (own && !readClientTag(s) && !s.getItem(BACKUP_KEY)) s.setItem(BACKUP_KEY, own);
  s.setItem(CLIENT_TAG_KEY, JSON.stringify({ clientId, at: Date.now() }));
}

/**
 * Removes the local client draft if its client_id is not in `liveClientIds` (or equals `removedId`).
 * Restores the owner's own backed-up draft if there is one. Returns true if something was purged.
 */
export function purgeOrphanClientDrafts(s: KV, liveClientIds: Iterable<string> | null, removedId?: string): boolean {
  const tagged = readClientTag(s);
  if (!tagged) return false;
  const live = liveClientIds ? new Set(liveClientIds) : null;
  const orphan = tagged === removedId || (live !== null && !live.has(tagged));
  if (!orphan) return false;
  const backup = s.getItem(BACKUP_KEY);
  if (backup) s.setItem(DOSSIER_KEY, backup);
  else s.removeItem(DOSSIER_KEY);
  s.removeItem(BACKUP_KEY);
  s.removeItem(CLIENT_TAG_KEY);
  return true;
}
