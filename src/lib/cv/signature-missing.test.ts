import test from "node:test";
import assert from "node:assert/strict";
import { checkSignatureFile, clearSignaturePatch, isSignatureDataUrl, signatureLine, signaturePatch, SIGNATURE_MAX_BYTES } from "./signature.ts";
import { findMissing, formLabels, mergeCustom } from "./missing.ts";
import { defaultSettings, emptyPersonal, cleanCustomDetails } from "./model.ts";

const PNG = "data:image/png;base64,iVBORw0KGgo=";

test("signature upload checks type and size", () => {
  assert.deepEqual(checkSignatureFile({ type: "image/png", size: 1000 }), { ok: true });
  assert.deepEqual(checkSignatureFile({ type: "image/jpeg", size: 1000 }), { ok: true });
  assert.deepEqual(checkSignatureFile({ type: "image/gif", size: 1000 }), { ok: false, reason: "type" });
  assert.deepEqual(checkSignatureFile({ type: "image/png", size: SIGNATURE_MAX_BYTES + 1 }), { ok: false, reason: "size" });
});

test("signature storage only accepts PNG data URLs within the cap", () => {
  assert.deepEqual(signaturePatch(PNG), { signature: PNG });
  assert.equal(signaturePatch("data:image/jpeg;base64,abc"), null);
  assert.equal(signaturePatch("https://evil.example/x.png"), null);
  assert.equal(isSignatureDataUrl(`data:image/png;base64,${"A".repeat(500_000)}`), false);
  assert.deepEqual(clearSignaturePatch(), { signature: "" });
});

test("signature is stored per guest profile object, not shared", () => {
  const a = { ...emptyPersonal(), ...signaturePatch(PNG) };
  const b = emptyPersonal();
  assert.equal(a.signature, PNG);
  assert.equal(b.signature, "");
});

test("signature line uses place (or city) and date", () => {
  const p = { ...emptyPersonal(), signature: PNG, city: "Berlin", signatureDate: "2026-10-27" };
  const de = { ...defaultSettings(), locale: "de" as const };
  const line = signatureLine(p, de)!;
  assert.equal(line.label, "Unterschrift");
  assert.equal(line.place, "Berlin");
  assert.match(line.text, /^Berlin, 27 Oct 2026$/);
  assert.equal(signatureLine(emptyPersonal(), de), null);
});

const FORM = `Applicant name: ____
Email: ____
Father's name: ____
Blood group: ____
Emergency contact: ____
Signature of applicant: ____`;

test("missing-field detection lists only empty fields and unknown labels", () => {
  const personal = { ...emptyPersonal(), givenName: "Asha", familyName: "Rao", email: "a@example.com" };
  const r = findMissing(FORM, personal);
  const keys = r.fields.map((f) => f.key);
  assert.ok(keys.includes("fatherName"));
  assert.ok(keys.includes("signature"));
  assert.ok(!keys.includes("email"));
  assert.ok(!keys.includes("givenName"));
  assert.deepEqual(r.custom, ["Blood group", "Emergency contact"]);
});

test("saved custom details are reused and never invented", () => {
  const saved = mergeCustom([], [{ label: "Blood group", value: "O+" }, { label: "Emergency contact", value: "" }]);
  assert.equal(saved.length, 1);
  const personal = { ...emptyPersonal(), customDetails: saved, fatherName: "R", signature: PNG };
  const r = findMissing(FORM, personal);
  assert.deepEqual(r.custom, ["Emergency contact"]);
  assert.ok(!r.fields.some((f) => f.key === "signature"));
  const updated = mergeCustom(saved, [{ label: "blood group", value: "A+" }]);
  assert.equal(updated.length, 1);
  assert.equal(updated[0]!.value, "A+");
});

test("form labels and custom cleaning", () => {
  assert.deepEqual(formLabels("Name: x\nNo label here\nPIN ......"), ["Name", "PIN"]);
  assert.deepEqual(cleanCustomDetails([{ label: "A", value: "1" }, { label: "", value: "x" }, 5]).map((c) => c.label), ["A"]);
});

test("target company OFF: base CV unchanged, no Prepared-for line, generic filename", async () => {
  const { applyTarget, emptyTarget } = await import("./target.ts");
  const { emptyProfile, preparedLine, fileBase } = await import("./model.ts");
  const base = emptyProfile();
  base.personal.givenName = "Asha";
  const off = applyTarget(base, emptyTarget());
  assert.equal(off.personal.preparedFor, undefined);
  assert.equal(preparedLine(off.personal, "en"), "");
  assert.equal(fileBase(off, defaultSettings()), "Asha-cv");
  // A typed company with the toggle off is ignored.
  assert.equal(applyTarget(base, { on: false, company: "Acme" }).personal.preparedFor, undefined);
});

test("target company ON: Prepared-for layer in header + filename, base untouched, toggling off removes it", async () => {
  const { applyTarget } = await import("./target.ts");
  const { emptyProfile, preparedLine, fileBase } = await import("./model.ts");
  const base = emptyProfile();
  base.personal.givenName = "Asha";
  const on = applyTarget(base, { on: true, company: "Acme Corp" });
  assert.equal(on.personal.preparedFor, "Acme Corp");
  assert.equal(base.personal.preparedFor, undefined);
  assert.equal(preparedLine(on.personal, "en"), "Prepared for Acme Corp");
  assert.equal(preparedLine(on.personal, "de"), "Erstellt für Acme Corp");
  assert.equal(fileBase(on, defaultSettings()), "Asha-cv-for-Acme-Corp");
  const offAgain = applyTarget(on, { on: false, company: "Acme Corp" });
  assert.equal(offAgain.personal.preparedFor, undefined);
});

test("form filler: company-applying-to field uses the target company when set", () => {
  const form = "Company applying to: ____\nEmail: ____";
  const p = { ...emptyPersonal(), email: "a@b.c" };
  assert.equal(findMissing(form, p).targetCompany, true);
  assert.equal(findMissing(form, p, null, "Acme").targetCompany, false);
  assert.deepEqual(findMissing(form, p).custom, []);
});
