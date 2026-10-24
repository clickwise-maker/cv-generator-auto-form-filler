import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { buildPdf, buildPreviewPdf } from "./export-pdf.ts";
import { buildDocxBuffer } from "./export-docx.ts";
import { defaultSettings, emptyExperience, emptyProfile, sampleProfile, type Profile } from "./model.ts";
import { watermarkSvg } from "./watermark.ts";
import { WATERMARK_LINES } from "../payments/config.ts";

function longProfile(): Profile {
  const p = sampleProfile();
  for (let i = 0; i < 14; i += 1) {
    p.experience.push({ ...emptyExperience(), title: `Role ${i}`, organization: `Company ${i}`, start: "2010-01", end: "2012-01", summary: "Did a great many things. ".repeat(20) });
  }
  return p;
}

function pageCount(pdf: string) {
  return (pdf.match(/\/Type \/Page\b(?!s)/g) ?? []).length;
}

describe("watermarked preview PDF", () => {
  for (const template of ["meridian", "consulate", "atlas"] as const) {
    for (const paper of ["a4", "letter"] as const) {
      it(`${template}/${paper}: both lines on every page of a multi-page CV`, () => {
        const settings = { ...defaultSettings(), template, paper };
        const out = buildPreviewPdf(longProfile(), settings, WATERMARK_LINES).output();
        const pages = pageCount(out);
        assert.ok(pages >= 2, `expected multi-page, got ${pages}`);
        assert.equal((out.match(/\(UNPAID PREVIEW\) Tj/g) ?? []).length, pages);
        assert.equal((out.match(/\(SAMPLE - NOT FOR OFFICIAL USE\) Tj/g) ?? []).length, pages);
        assert.match(out, /\/ca 0\.18/, "watermark is semi-transparent");
      });
    }
  }
  it("CV text stays present (readable) under the watermark", () => {
    const out = buildPreviewPdf(sampleProfile(), defaultSettings(), WATERMARK_LINES).output();
    assert.match(out, /Amira/i);
  });
  it("the clean builder (server-only) has no watermark", () => {
    const out = buildPdf(longProfile(), defaultSettings()).output();
    assert.ok(!out.includes("UNPAID PREVIEW"));
  });
});

describe("on-screen watermark tile", () => {
  it("contains both configured lines, diagonal and semi-transparent", () => {
    const svg = watermarkSvg(WATERMARK_LINES, "a4");
    assert.ok(svg.includes("SAMPLE — NOT FOR OFFICIAL USE") && svg.includes("UNPAID PREVIEW"));
    assert.match(svg, /rotate\(-5\d\.\d+\)/);
    assert.match(svg, /fill-opacity="0\.16"/);
  });
});

describe("no-login creation and regressions", () => {
  it("an empty, anonymous profile still renders PDF and DOCX", async () => {
    assert.ok(buildPreviewPdf(emptyProfile(), defaultSettings(), WATERMARK_LINES).output().startsWith("%PDF"));
    const buf = await buildDocxBuffer(emptyProfile(), defaultSettings());
    assert.equal(Buffer.from(buf).subarray(0, 2).toString(), "PK");
  });
  it("the Studio has no mandatory login gate", () => {
    const studio = readFileSync(new URL("../../components/studio/studio.tsx", import.meta.url), "utf8");
    const route = readFileSync(new URL("../../routes/index.tsx", import.meta.url), "utf8");
    assert.ok(!/OtpGate|signIn|verifiedEmail/.test(studio + route));
  });
  it("no client component builds a clean DOCX or calls the clean PDF builder directly", () => {
    const preview = readFileSync(new URL("../../components/studio/preview-doc.tsx", import.meta.url), "utf8");
    const paywall = readFileSync(new URL("../../components/studio/paywall.tsx", import.meta.url), "utf8");
    for (const src of [preview, paywall]) {
      assert.ok(!/export-docx|buildDocxBuffer|\bbuildPdf\b|downloadPdf\b|window\.print/.test(src));
    }
  });
  it("print CSS replaces the page with an unlock notice", () => {
    const css = readFileSync(new URL("../../styles.css", import.meta.url), "utf8");
    assert.match(css, /@media print[\s\S]*body > \*[\s\S]*display: none/);
  });
});

describe("auto form filler regression (text → profile)", () => {
  it("SAMPLE_CV and SAMPLE_FORM still fill the profile", async () => {
    const { proposeFromText, applyProposals } = await import("./parse.ts");
    const { SAMPLE_CV, SAMPLE_FORM } = await import("./model.ts");
    for (const text of [SAMPLE_CV, SAMPLE_FORM]) {
      const filled = applyProposals(emptyProfile(), proposeFromText(text));
      assert.match(`${filled.personal.givenName} ${filled.personal.familyName}`, /Amira/i);
    }
  });
});
