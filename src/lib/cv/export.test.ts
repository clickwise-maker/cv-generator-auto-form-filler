import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { buildPdf, buildPreviewPdf } from "./export-pdf.ts";
import { buildDocxBuffer } from "./export-docx.ts";
import { defaultSettings, emptyExperience, emptyProfile, formatWhen, sampleProfile, type Profile } from "./model.ts";
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

describe("ISO date style (audit fix 2026-11-09)", () => {
  it("renders the day, not the month, for a full ISO date", () => {
    assert.equal(formatWhen("1998-03-15", "iso"), "1998-03-15");
    assert.equal(formatWhen("1998-03-15", "dmy"), "15 Mar 1998");
    assert.equal(formatWhen("1998-03-15", "mdy"), "Mar 15, 1998");
    assert.equal(formatWhen("2021-03", "iso"), "2021-03");
  });
  it("Consulate PDF shows the correct ISO date of birth", () => {
    const p = sampleProfile();
    p.personal.dateOfBirth = "1998-03-15";
    const out = buildPdf(p, { ...defaultSettings(), template: "consulate", dateStyle: "iso" }).output();
    assert.match(out, /1998-03-15/);
    assert.doesNotMatch(out, /1998-03-03/);
  });
});

describe("long values are not clipped in PDF exports (audit fix 2026-11-09)", () => {
  function longProfile(): Profile {
    const p = sampleProfile();
    p.personal.givenName = "Aarav Krishnan Sharma Venkateshwaran";
    p.personal.familyName = "Iyer-Chandrasekaran";
    p.personal.headline = "Computer Science Fresher with a very long headline that keeps going";
    p.personal.street = "14 Linking Road, Bandra West, Near the very long shopping street";
    p.personal.city = "Mumbai";
    return p;
  }
  it("Meridian header keeps the full long name", () => {
    const out = buildPdf(longProfile(), { ...defaultSettings(), template: "meridian" }).output();
    assert.match(out, /Iyer-Chandrasekaran/);
  });
  it("Consulate rows show every wrapped line, not just the first", () => {
    const out = buildPdf(longProfile(), { ...defaultSettings(), template: "consulate" }).output();
    assert.match(out, /Iyer-Chandrasekaran/);
    assert.match(out, /shopping/);
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

describe("multilingual form detection + US dates (audit fix 2026-11-09)", () => {
  it("US slash dates are read as MM/DD, never as an invalid month", async () => {
    const { proposeFromText, applyProposals } = await import("./parse.ts");
    const us = applyProposals(emptyProfile(), proposeFromText("Full name: Aarav Sharma\nDate of birth: 03/15/1998\n"));
    assert.equal(us.personal.dateOfBirth, "1998-03-15");
    const dmy = applyProposals(emptyProfile(), proposeFromText("Full name: Aarav Sharma\nDate of birth: 15/03/1998\n"));
    assert.equal(dmy.personal.dateOfBirth, "1998-03-15");
    const bad = applyProposals(emptyProfile(), proposeFromText("Full name: Aarav Sharma\nDate of birth: 15/15/1998\n"));
    assert.doesNotMatch(bad.personal.dateOfBirth, /^1998-15-/);
  });
  it("Japanese 年月日 dates parse", async () => {
    const { proposeFromText, applyProposals } = await import("./parse.ts");
    const filled = applyProposals(emptyProfile(), proposeFromText("氏名：田中太郎\n生年月日：1998年3月15日\n"));
    assert.equal(filled.personal.dateOfBirth, "1998-03-15");
  });
  it("Hindi and Arabic labels are detected and mapped", async () => {
    const { detectFormFields, proposeFromText, applyProposals } = await import("./parse.ts").then(async (parse) => ({
      ...parse,
      detectFormFields: (await import("./form-fields.ts")).detectFormFields,
    }));
    const hi = "पूरा नाम: आरव शर्मा\nईमेल: aarav.sharma@example.com\nजन्म तिथि: 15/03/1998\n";
    assert.ok(detectFormFields(hi).includes("givenName"), `Hindi detect: ${detectFormFields(hi)}`);
    const hiFilled = applyProposals(emptyProfile(), proposeFromText(hi));
    assert.match(hiFilled.personal.givenName, /आरव/);
    assert.equal(hiFilled.personal.dateOfBirth, "1998-03-15");
    const ar = "الاسم الكامل: أحمد علي\nتاريخ الميلاد: 15/03/1998\n";
    assert.ok(detectFormFields(ar).includes("givenName"), `Arabic detect: ${detectFormFields(ar)}`);
    const arFilled = applyProposals(emptyProfile(), proposeFromText(ar));
    assert.match(arFilled.personal.givenName, /أحمد/);
    const ja = "氏名：田中太郎\n";
    assert.ok(detectFormFields(ja).includes("givenName"), `Japanese detect: ${detectFormFields(ja)}`);
  });
  it("Devanagari digits are normalised before matching", async () => {
    const { proposeFromText, applyProposals } = await import("./parse.ts");
    const filled = applyProposals(emptyProfile(), proposeFromText("पूरा नाम: आरव शर्मा\nजन्म तिथि: १५/०३/१९९८\n"));
    assert.equal(filled.personal.dateOfBirth, "1998-03-15");
  });
  it("fullwidth colons and matra labels reach the missing-field salvage", async () => {
    const { formLabels } = await import("./missing.ts");
    assert.ok(formLabels("氏名：田中太郎\n生年月日：1998年3月15日\n").includes("氏名"));
    assert.ok(formLabels("जन्म तिथि: 15/03/1998\nईमेल: a@example.com\n").includes("जन्म तिथि"));
  });
  it("+7 calling code splits correctly", async () => {
    const { splitPhone } = await import("./parse.ts");
    assert.deepEqual(splitPhone("+7 916 123 45 67"), { phoneCode: "+7", phone: "916 123 45 67" });
  });
});
