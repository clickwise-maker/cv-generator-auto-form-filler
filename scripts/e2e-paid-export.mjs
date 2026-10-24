// Manual end-to-end check against a running dev server (TRIAL_MODE=true, NODE_ENV!=production):
//   npm run dev   (then)   node scripts/e2e-paid-export.mjs [baseUrl]
// Not part of `npm test` because it needs a server and a Chromium.
import { chromium } from "playwright";
import assert from "node:assert/strict";
import { readFileSync, mkdirSync } from "node:fs";

const base = process.argv[2] ?? "http://127.0.0.1:8080";
const out = "/tmp/e2e-paid-export";
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const results = [];
const step = (name) => results.push(name) && console.log("ok -", name);

for (const viewport of [{ width: 1280, height: 900 }, { width: 390, height: 844 }]) {
  const ctx = await browser.newContext({ viewport, acceptDownloads: true });
  const page = await ctx.newPage();
  await page.goto(base, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Fill the sample dossier" }).click();
  if (viewport.width < 1024) await page.getByRole("button", { name: "Preview", exact: true }).click();
  await page.getByText("FREE PREVIEW", { exact: true }).waitFor();
  assert.equal(await page.getByText(/Career Starter|Global Pro|Single Use|₹\d|\$\d+(\/year)?$|one-time/).count(), 0, "home/dashboard must not show any price");
  if (viewport.width < 1024) await page.getByRole("button", { name: "Compose", exact: true }).click();
  assert.equal(await page.getByTestId("dash-cv-credits").textContent(), "0");
  assert.equal(await page.getByTestId("dash-drafts").textContent(), "1");
  await page.getByRole("button", { name: "See download plans" }).waitFor();
  if (viewport.width < 1024) await page.getByRole("button", { name: "Preview", exact: true }).click();
  step(`${viewport.width}px: guest dashboard (0 credits, 1 draft, plans link), no plans on home`);
  step(`${viewport.width}px: no login needed, sample CV created, Free Preview label shown`);
  const wm = page.getByTestId("cv-watermark");
  const box = await wm.boundingBox();
  const bg = await wm.evaluate((el) => getComputedStyle(el).backgroundImage);
  assert.ok(bg.includes("UNPAID") && box.height > 200);
  await page.locator(".cv-preview").screenshot({ path: `${out}/preview-${viewport.width}.png` });
  step(`${viewport.width}px: watermark overlay covers preview (screenshot ${out}/preview-${viewport.width}.png)`);

  // print emulation: page content replaced by notice
  await page.emulateMedia({ media: "print" });
  assert.equal(await page.locator(".cv-preview").isVisible(), false);
  await page.emulateMedia({ media: "screen" });
  await page.waitForTimeout(300);
  step(`${viewport.width}px: print media hides the CV`);

  // watermarked preview PDF download
  const [dl0] = await Promise.all([page.waitForEvent("download"), page.getByRole("button", { name: /Preview PDF \(watermarked\)/ }).click()]);
  const prev = readFileSync(await dl0.path(), "latin1");
  assert.ok(prev.includes("UNPAID PREVIEW"));
  step(`${viewport.width}px: preview PDF download is watermarked`);

  // Unlock: cancel → retry → failure → retry → success
  await page.getByRole("button", { name: /Unlock Clean Download · PDF/ }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByText("TEST MODE — no real payment").waitFor();
  await dialog.getByTestId("plan-picker").waitFor();
  for (const t of ["Single Use", "₹20", "Career Starter", "₹1,000/year", "Free preview", "Global Single Use", "$1", "Global Pro", "$29/year", "Launch offer, future plans may change; purchased package terms stay as bought."]) await dialog.getByText(t, { exact: true }).first().waitFor();
  const [freeDl] = await Promise.all([page.waitForEvent("download"), dialog.getByRole("button", { name: "Download FREE watermarked PDF" }).click()]);
  assert.ok(readFileSync(await freeDl.path(), "latin1").includes("UNPAID PREVIEW"));
  step(`${viewport.width}px: plans + free watermarked option shown only in the download paywall`);
  await dialog.screenshot({ path: `${out}/confirm-${viewport.width}.png` });
  await dialog.getByRole("button", { name: /Continue to TEST payment/ }).click();
  await dialog.getByRole("button", { name: "Simulate cancel" }).click();
  await dialog.getByText(/Payment cancelled/).waitFor();
  await dialog.getByRole("button", { name: "Retry" }).click();
  await dialog.getByRole("button", { name: "Simulate failure" }).click();
  await dialog.getByText(/did not go through/).waitFor();
  step(`${viewport.width}px: cancel and failure states shown, no file`);
  await dialog.getByRole("button", { name: "Retry" }).click();
  const [dl] = await Promise.all([page.waitForEvent("download"), dialog.getByRole("button", { name: "Simulate success" }).click()]);
  const pdf = readFileSync(await dl.path(), "latin1");
  assert.ok(pdf.startsWith("%PDF") && !pdf.includes("UNPAID PREVIEW"));
  await dialog.getByText(/TEST unlock verified by the server/).waitFor();
  step(`${viewport.width}px: clean PDF after server-verified TEST payment`);
  await dialog.getByRole("button", { name: "Done" }).click();
  if (viewport.width < 1024) await page.getByRole("button", { name: "Compose", exact: true }).click();
  await page.getByTestId("dash-completed").filter({ hasText: "1" }).waitFor();
  assert.equal(await page.getByTestId("dash-drafts").textContent(), "0");
  if (viewport.width < 1024) await page.getByRole("button", { name: "Preview", exact: true }).click();
  step(`${viewport.width}px: dashboard counts the completed CV`);

  // DOCX reuses the entitlement: no second order
  await page.getByRole("button", { name: /Unlock Clean Download · Word/ }).click();
  const [dl2] = await Promise.all([page.waitForEvent("download"), page.getByRole("dialog").getByRole("button", { name: /Continue to TEST payment/ }).click()]);
  assert.equal(readFileSync(await dl2.path()).subarray(0, 2).toString(), "PK");
  step(`${viewport.width}px: clean DOCX via the same entitlement (no second charge)`);
  await page.getByRole("dialog").getByRole("button", { name: "Done" }).click();

  // Edit after purchase → needs a new unlock (policy=version)
  if (viewport.width < 1024) await page.getByRole("button", { name: "Compose", exact: true }).click();
  await page.evaluate(() => {
    const raw = JSON.parse(localStorage.getItem("meridian.dossier.v1"));
    raw.profile.personal.headline = "Edited after purchase";
    localStorage.setItem("meridian.dossier.v1", JSON.stringify(raw));
  });
  await page.reload({ waitUntil: "networkidle" });
  if (viewport.width < 1024) await page.getByRole("button", { name: "Preview", exact: true }).click();
  await page.getByRole("button", { name: /Unlock Clean Download · PDF/ }).click();
  await page.getByRole("dialog").getByRole("button", { name: /Continue to TEST payment/ }).click();
  await page.getByRole("dialog").getByText(/changed after it was unlocked/).waitFor();
  step(`${viewport.width}px: edit after purchase asks for a new unlock`);
  await ctx.close();
}
await browser.close();
console.log(`\n${results.length} checks passed`);
