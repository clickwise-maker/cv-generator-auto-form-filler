import { COPY, formatWhen, type Personal, type Settings } from "./model.ts";

/** Upload limit for signature images (before trim/re-encode). */
export const SIGNATURE_MAX_BYTES = 1_000_000;
/** Hard cap on the stored PNG data URL so exports stay small. */
export const SIGNATURE_MAX_DATA_URL = 400_000;
export const SIGNATURE_TYPES = ["image/png", "image/jpeg"] as const;

export type SignatureCheck = { ok: true } | { ok: false; reason: "type" | "size" };

export function checkSignatureFile(file: { type: string; size: number }): SignatureCheck {
  if (!(SIGNATURE_TYPES as readonly string[]).includes(file.type)) return { ok: false, reason: "type" };
  if (file.size > SIGNATURE_MAX_BYTES) return { ok: false, reason: "size" };
  return { ok: true };
}

/** Only PNG data URLs within the size cap are stored or rendered. */
export function isSignatureDataUrl(value: unknown): value is string {
  return typeof value === "string" && value.startsWith("data:image/png;base64,") && value.length <= SIGNATURE_MAX_DATA_URL;
}

/** Patch to store a signature on the guest's profile; invalid input clears nothing and returns null. */
export function signaturePatch(dataUrl: string): Pick<Personal, "signature"> | null {
  return isSignatureDataUrl(dataUrl) ? { signature: dataUrl } : null;
}

export function clearSignaturePatch(): Pick<Personal, "signature"> {
  return { signature: "" };
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

/** What the CV output shows on the signature line, or null when there is no signature. */
export function signatureLine(personal: Personal, settings: Settings, now = today()) {
  if (!isSignatureDataUrl(personal.signature)) return null;
  const copy = COPY[settings.locale];
  const place = (personal.signaturePlace || personal.city || "").trim();
  const date = formatWhen(personal.signatureDate || now, settings.dateStyle);
  return { image: personal.signature, place, date, text: [place, date].filter(Boolean).join(", "), label: copy.signature };
}

/** Templates that carry a signature line (Atlas is a compact résumé without one). */
export function templateSigns(settings: Settings): boolean {
  return settings.template !== "atlas";
}

/**
 * Browser only: trim near-white / transparent margins and re-encode as PNG with a transparent
 * background (white pixels become transparent so the ink sits on any paper).
 */
export function trimToPng(canvas: HTMLCanvasElement): string {
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas.toDataURL("image/png");
  const { width, height } = canvas;
  const img = ctx.getImageData(0, 0, width, height);
  const d = img.data;
  let minX = width, minY = height, maxX = -1, maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const white = d[i]! > 235 && d[i + 1]! > 235 && d[i + 2]! > 235;
      if (white) d[i + 3] = 0;
      if (d[i + 3]! > 16) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) return "";
  ctx.putImageData(img, 0, 0);
  const pad = 6;
  const sx = Math.max(0, minX - pad), sy = Math.max(0, minY - pad);
  const w = Math.min(width, maxX + pad) - sx, h = Math.min(height, maxY + pad) - sy;
  const out = document.createElement("canvas");
  const scale = Math.min(1, 600 / w, 200 / h);
  out.width = Math.max(1, Math.round(w * scale));
  out.height = Math.max(1, Math.round(h * scale));
  out.getContext("2d")?.drawImage(canvas, sx, sy, w, h, 0, 0, out.width, out.height);
  return out.toDataURL("image/png");
}
