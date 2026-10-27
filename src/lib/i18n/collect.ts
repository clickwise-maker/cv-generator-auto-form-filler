/**
 * Collects every English UI key used by the app (test + catalogue tooling).
 * Sources: t("…")/tr("…") literals, data blocks fenced with `// i18n-data:start|end`,
 * the form-field registry, consent notice, reader method names and info-page JSON.
 */
import fs from "node:fs";
import path from "node:path";

const DEV = /[\u0900-\u097F]/;
const ID = /^[a-z][A-Za-z]*$/;

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    if (d.isDirectory()) return walk(p);
    return /\.(tsx?|json)$/.test(d.name) && !d.name.endsWith(".test.ts") ? [p] : [];
  });
}

function unq(raw: string): string {
  return JSON.parse(`"${raw.replace(/\\'/g, "'").replace(/\\`/g, "`")}"`) as string;
}

export function collectKeys(src: string): Set<string> {
  const keys = new Set<string>();
  const add = (s: string) => {
    const v = s.trim() ? s : "";
    if (!v || DEV.test(v) || ID.test(v) || !/\p{L}/u.test(v)) return;
    keys.add(v);
  };
  for (const file of walk(src)) {
    const text = fs.readFileSync(file, "utf8");
    if (file.endsWith(".json")) continue;
    for (const m of text.matchAll(/\bt[r]?\(\s*"((?:[^"\\]|\\.)*)"/g)) add(unq(m[1]!));
    for (const block of text.matchAll(/\/\/ i18n-data:start([\s\S]*?)\/\/ i18n-data:end/g)) {
      for (const m of block[1]!.matchAll(/"((?:[^"\\]|\\.)*)"|`((?:[^`\\]|\\.)*)`/g)) {
        const s = m[1] !== undefined ? unq(m[1]) : m[2]!.replace(/\$\{SUPPORT_EMAIL\}/g, "{email}").replace(/\$\{RETENTION_DAYS\}/g, "{days}");
        if (/^(?:mailto:|https?:|text-|bg-)/.test(s)) continue;
        add(s);
      }
    }
  }
  const ff = fs.readFileSync(path.join(src, "lib/cv/form-fields.ts"), "utf8");
  for (const m of ff.matchAll(/\ben: "((?:[^"\\]|\\.)*)"/g)) add(unq(m[1]!));
  const consent = fs.readFileSync(path.join(src, "lib/privacy/consent.ts"), "utf8");
  const en = /en:\s*\[([\s\S]*?)\]/.exec(consent.slice(consent.indexOf("NOTICE")));
  for (const m of en?.[1]?.matchAll(/"((?:[^"\\]|\\.)*)"/g) ?? []) add(unq(m[1]!));
  const reader = fs.readFileSync(path.join(src, "lib/cv/read-document.ts"), "utf8");
  for (const m of reader.matchAll(/method:[^"\n]*"([^"]+)"(?:\s*:\s*"([^"]+)")?/g)) {
    add(m[1]!);
    if (m[2]) add(m[2]);
  }
  const model = fs.readFileSync(path.join(src, "lib/cv/model.ts"), "utf8");
  const tpl = model.slice(model.indexOf("export const TEMPLATES"), model.indexOf("export const COUNTRIES"));
  for (const m of tpl.matchAll(/(?:label|hint): "((?:[^"\\]|\\.)*)"/g)) add(unq(m[1]!));
  for (const f of ["about", "faq", "terms", "privacy-policy"]) {
    const c = JSON.parse(fs.readFileSync(path.join(src, "content", `${f}.json`), "utf8")) as { title: string; lead: string; en: [string, string[]][] };
    add(c.title);
    add(c.lead);
    for (const [h, items] of c.en) {
      add(h);
      items.filter((i) => i !== "mail").forEach(add);
    }
  }
  return keys;
}
