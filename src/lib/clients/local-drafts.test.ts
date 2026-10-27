import { test } from "node:test";
import assert from "node:assert/strict";
import { BACKUP_KEY, CLIENT_TAG_KEY, DOSSIER_KEY, purgeOrphanClientDrafts, readClientTag, tagClientDraft } from "./local-drafts.ts";

function mem() {
  const m = new Map<string, string>();
  return { m, getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v), removeItem: (k: string) => void m.delete(k) };
}
const OWN = JSON.stringify({ profile: { personal: { givenName: "Own" } } });
const CLIENT = JSON.stringify({ profile: { personal: { givenName: "SampleClient" } } });

test("own draft untouched when no client tag", () => {
  const s = mem();
  s.setItem(DOSSIER_KEY, OWN);
  assert.equal(purgeOrphanClientDrafts(s, []), false);
  assert.equal(s.getItem(DOSSIER_KEY), OWN);
});

test("client draft kept while client still listed", () => {
  const s = mem();
  s.setItem(DOSSIER_KEY, OWN);
  tagClientDraft(s, "c1");
  s.setItem(DOSSIER_KEY, CLIENT);
  assert.equal(purgeOrphanClientDrafts(s, ["c1", "c2"]), false);
  assert.equal(s.getItem(DOSSIER_KEY), CLIENT);
  assert.equal(readClientTag(s), "c1");
});

test("client withdrew: draft removed, own draft restored", () => {
  const s = mem();
  s.setItem(DOSSIER_KEY, OWN);
  tagClientDraft(s, "c1");
  s.setItem(DOSSIER_KEY, CLIENT);
  assert.equal(purgeOrphanClientDrafts(s, ["c2"]), true);
  assert.equal(s.getItem(DOSSIER_KEY), OWN);
  assert.equal(s.getItem(BACKUP_KEY), null);
  assert.equal(s.getItem(CLIENT_TAG_KEY), null);
});

test("owner delete removes immediately; no own draft -> dossier cleared", () => {
  const s = mem();
  tagClientDraft(s, "c1");
  s.setItem(DOSSIER_KEY, CLIENT);
  assert.equal(purgeOrphanClientDrafts(s, null, "c1"), true);
  assert.equal(s.getItem(DOSSIER_KEY), null);
});

test("switching clients keeps the original own backup", () => {
  const s = mem();
  s.setItem(DOSSIER_KEY, OWN);
  tagClientDraft(s, "c1");
  s.setItem(DOSSIER_KEY, CLIENT);
  tagClientDraft(s, "c2");
  assert.equal(s.getItem(BACKUP_KEY), OWN);
  assert.equal(readClientTag(s), "c2");
  assert.equal(purgeOrphanClientDrafts(s, ["c1"]), true);
  assert.equal(s.getItem(DOSSIER_KEY), OWN);
});
