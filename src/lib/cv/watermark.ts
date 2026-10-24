import type { Paper } from "./model.ts";

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/**
 * One page-sized SVG tile with two diagonal, semi-transparent lines. Tiled
 * vertically over the on-screen preview so every page-length of the CV
 * carries both lines. Purely visual: it deters casual reuse, it is NOT DRM.
 */
export function watermarkSvg(lines: readonly string[], paper: Paper = "a4"): string {
  const [w, h] = paper === "letter" ? [216, 279] : [210, 297];
  const angle = -((Math.atan2(h, w) * 180) / Math.PI);
  const [a = "", b = ""] = lines;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">` +
    `<g transform="translate(${w / 2} ${h / 2}) rotate(${angle.toFixed(2)})" font-family="Helvetica,Arial,sans-serif" font-weight="700" text-anchor="middle" fill="rgb(150,30,30)" fill-opacity="0.16">` +
    `<text y="-22" font-size="13">${esc(a)}</text>` +
    `<text y="30" font-size="19">${esc(b)}</text>` +
    `</g></svg>`
  );
}

export function watermarkDataUrl(lines: readonly string[], paper: Paper = "a4"): string {
  return `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(watermarkSvg(lines, paper))}")`;
}
