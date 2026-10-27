import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { collectKeys } from "./collect.ts";

const here = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(here, "../..");
const LANGS = ["hi", "ja", "ar", "zh-CN"] as const;
const load = (l: string) => JSON.parse(fs.readFileSync(path.join(here, "messages", `${l}.json`), "utf8")) as Record<string, string>;
const placeholders = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(",");

test("every UI key used in the app exists in all languages (en + hi/ja/ar/zh-CN)", () => {
  const keys = collectKeys(SRC);
  assert.ok(keys.size > 400, `expected many keys, got ${keys.size}`);
  for (const lang of LANGS) {
    const cat = load(lang);
    const missing = [...keys].filter((k) => typeof cat[k] !== "string" || !cat[k].trim());
    assert.deepEqual(missing, [], `${lang} is missing ${missing.length} keys`);
  }
});

test("all catalogues have the same key set and keep {placeholders}", () => {
  const base = Object.keys(load("hi")).sort();
  for (const lang of LANGS) {
    const cat = load(lang);
    assert.deepEqual(Object.keys(cat).sort(), base, `${lang} key set differs`);
    for (const [k, v] of Object.entries(cat)) assert.equal(placeholders(v), placeholders(k), `${lang}: ${k}`);
  }
});

test("non-Latin catalogues are actually translated (not English copies)", () => {
  const scripts: Record<string, RegExp> = { hi: /[\u0900-\u097F]/, ja: /[\u3040-\u30FF\u4E00-\u9FFF]/, ar: /[\u0600-\u06FF]/, "zh-CN": /[\u4E00-\u9FFF]/ };
  for (const lang of LANGS) {
    const cat = load(lang);
    const prose = Object.entries(cat).filter(([k]) => /[a-z]{3,}\s+[a-z]{3,}/.test(k));
    const untranslated = prose.filter(([, v]) => !scripts[lang]!.test(v)).map(([k]) => k);
    assert.deepEqual(untranslated, [], `${lang} has English left`);
  }
});

test("no visible hardcoded English text nodes left in main components (best effort)", () => {
  const files = ["components/studio/form-filler.tsx", "components/studio/signature-pad.tsx", "components/studio/custom-details.tsx", "components/studio/target-company.tsx", "components/studio/profile-form.tsx", "components/studio/studio.tsx", "components/studio/scan-card.tsx", "components/studio/dashboard.tsx", "components/studio/paywall.tsx", "components/site-footer.tsx", "components/info-page.tsx", "components/privacy/consent-ui.tsx"];
  const offenders: string[] = [];
  for (const f of files) {
    const text = fs.readFileSync(path.join(SRC, f), "utf8");
    for (const m of text.matchAll(/>\s*([A-Za-z][A-Za-z ,.'!?-]{3,})\s*</g)) offenders.push(`${f}: ${m[1]}`);
  }
  assert.deepEqual(offenders, []);
});
