import { jsPDF } from "jspdf";
import {
  COPY,
  addressLines,
  degreeLine,
  displayName,
  dossierCode,
  fileBase,
  formatSpan,
  formatWhen,
  lifeLines,
  phoneLine,
  placeLine,
  summaryLines,
  type Profile,
  type Settings,
} from "./model";

const INK: [number, number, number] = [28, 25, 21];
const FOREST: [number, number, number] = [27, 77, 62];
const MUTED: [number, number, number] = [92, 85, 76];
const BRASS: [number, number, number] = [166, 132, 86];
const SHEET: [number, number, number] = [255, 253, 248];
const RULE: [number, number, number] = [227, 218, 203];

function personalPhoto(profile: Profile) {
  return profile.personal.photo.startsWith("data:image/");
}

function pdfText(value: string): string {
  return value
    .replace(/[–—]/g, "-")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[•·]/g, "-");
}

class Pen {
  y: number;

  constructor(
    readonly doc: jsPDF,
    readonly margin = 16,
  ) {
    this.y = 18;
  }

  get pageW() {
    return this.doc.internal.pageSize.getWidth();
  }

  get pageH() {
    return this.doc.internal.pageSize.getHeight();
  }

  get width() {
    return this.pageW - this.margin * 2;
  }

  ensure(height: number) {
    if (this.y + height <= this.pageH - 14) return;
    this.doc.addPage();
    this.y = 18;
  }

  rule(color: [number, number, number] = BRASS, length = 28) {
    this.doc.setDrawColor(...color);
    this.doc.setLineWidth(0.35);
    this.doc.line(this.margin, this.y, this.margin + length, this.y);
    this.y += 4;
  }

  write(
    value: string,
    opts: {
      size?: number;
      font?: "times" | "helvetica";
      style?: "normal" | "bold" | "italic" | "bolditalic";
      color?: [number, number, number];
      width?: number;
      gap?: number;
      x?: number;
    } = {},
  ) {
    const size = opts.size ?? 11;
    const width = opts.width ?? this.width;
    const x = opts.x ?? this.margin;
    this.doc.setFont(opts.font ?? "times", opts.style ?? "normal");
    this.doc.setFontSize(size);
    this.doc.setTextColor(...(opts.color ?? INK));
    const lines = this.doc.splitTextToSize(pdfText(value), width) as string[];
    const lineHeight = size * 0.42;
    this.ensure(lines.length * lineHeight + 1);
    this.doc.text(lines, x, this.y);
    this.y += lines.length * lineHeight + (opts.gap ?? 1.6);
  }

  heading(label: string) {
    this.ensure(12);
    this.y += 2;
    this.write(label.toUpperCase(), {
      size: 9,
      font: "helvetica",
      style: "bold",
      color: FOREST,
      gap: 1.2,
    });
    this.rule();
  }

  footer(name: string) {
    const pages = this.doc.getNumberOfPages();
    for (let page = 1; page <= pages; page += 1) {
      this.doc.setPage(page);
      this.doc.setFont("helvetica", "normal");
      this.doc.setFontSize(8);
      this.doc.setTextColor(...MUTED);
      this.doc.text(pdfText(name), this.margin, this.pageH - 8);
      this.doc.text(`${page} / ${pages}`, this.pageW - this.margin, this.pageH - 8, { align: "right" });
    }
  }
}

function contactBits(profile: Profile, includeStreet: boolean): string[] {
  const personal = profile.personal;
  return [
    includeStreet ? addressLines(personal).join(", ") : placeLine(personal),
    personal.email,
    phoneLine(personal),
    personal.linkedin,
    personal.website,
  ].filter(Boolean);
}

function drawExperience(pen: Pen, profile: Profile, settings: Settings) {
  const copy = COPY[settings.locale];
  if (!profile.experience.length) return;
  pen.heading(copy.experience);
  for (const role of profile.experience) {
    pen.ensure(16);
    const when = formatSpan(role.start, role.end, role.current, settings);
    pen.doc.setFont("times", "bold");
    pen.doc.setFontSize(12);
    pen.doc.setTextColor(...INK);
    const title = role.title || "Role";
    const dateWidth = when ? pen.doc.getTextWidth(pdfText(when)) : 0;
    const titleWidth = pen.width - (when ? dateWidth + 4 : 0);
    pen.doc.text(pdfText(title), pen.margin, pen.y, { maxWidth: titleWidth });
    if (when) {
      pen.doc.setFont("times", "italic");
      pen.doc.setFontSize(10);
      pen.doc.setTextColor(...MUTED);
      pen.doc.text(pdfText(when), pen.margin + pen.width, pen.y, { align: "right" });
    }
    pen.y += 5;
    const org = [role.organization, role.location].filter(Boolean).join("  |  ");
    if (org) pen.write(org, { size: 10, style: "italic", color: MUTED, gap: 1.2 });
    for (const line of summaryLines(role.summary)) {
      pen.write(`-  ${line}`, { size: 10.5, gap: 0.8 });
    }
    pen.y += 2;
  }
}

function drawEducation(pen: Pen, profile: Profile, settings: Settings) {
  const copy = COPY[settings.locale];
  if (!profile.education.length) return;
  pen.heading(copy.education);
  for (const item of profile.education) {
    const when = formatSpan(item.start, item.end, false, settings);
    pen.write([degreeLine(item) || "Study", item.institution].filter(Boolean).join("  -  "), {
      size: 12,
      style: "bold",
      gap: 0.6,
    });
    const meta = [item.location, when].filter(Boolean).join("  |  ");
    if (meta) pen.write(meta, { size: 10, style: "italic", color: MUTED, gap: 1 });
    if (item.details) pen.write(item.details, { size: 10.5, gap: 2 });
  }
}

function drawSkills(pen: Pen, profile: Profile, settings: Settings) {
  const copy = COPY[settings.locale];
  if (profile.skills.length) {
    pen.heading(copy.skills);
    pen.write(profile.skills.join("   ·   ").replace(/·/g, "|"), { size: 10.5, gap: 2 });
  }
  if (profile.languages.length) {
    pen.heading(copy.languages);
    pen.write(profile.languages.map((item) => `${item.name} (${item.level})`).join("   |   "), { size: 10.5 });
  }
  if (profile.certifications.length) {
    pen.heading(copy.certifications);
    for (const item of profile.certifications) {
      pen.write([item.name, item.issuer, item.year].filter(Boolean).join("  -  "), { size: 10.5, gap: 1 });
    }
  }
  drawLife(pen, profile, settings, "cv");
}

function drawMeridian(pen: Pen, profile: Profile, settings: Settings) {
  const copy = COPY[settings.locale];
  const name = displayName(profile.personal, settings.nameOrder) || "Your name";
  pen.doc.setFillColor(...FOREST);
  pen.doc.rect(0, 0, pen.pageW, 34, "F");
  pen.doc.setFillColor(...BRASS);
  pen.doc.rect(0, 34, pen.pageW, 1.2, "F");
  pen.doc.setTextColor(...SHEET);
  pen.doc.setFont("times", "bold");
  pen.doc.setFontSize(22);
  pen.doc.text(pdfText(name), pen.margin, 16);
  pen.doc.setFont("times", "italic");
  pen.doc.setFontSize(12);
  pen.doc.text(pdfText(profile.personal.headline || "Add a headline"), pen.margin, 23);
  pen.doc.setFont("times", "normal");
  pen.doc.setFontSize(9);
  const contact = contactBits(profile, false).join("   |   ");
  pen.doc.text(pdfText(contact || "Contact details appear here"), pen.margin, 30, {
    maxWidth: personalPhoto(profile) ? pen.width - 28 : pen.width,
  });
  if (personalPhoto(profile)) pen.doc.addImage(profile.personal.photo, "JPEG", pen.pageW - pen.margin - 22, 5, 22, 26);
  pen.y = 44;
  if (profile.personal.nationality) {
    pen.write(`${copy.nationality}: ${profile.personal.nationality}`, {
      size: 10,
      style: "italic",
      color: MUTED,
      gap: 2,
    });
  }
  if (profile.personal.summary) {
    pen.heading(copy.profile);
    pen.write(profile.personal.summary, { size: 11, gap: 1 });
  }
  drawExperience(pen, profile, settings);
  drawEducation(pen, profile, settings);
  drawSkills(pen, profile, settings);
}

function drawAtlas(pen: Pen, profile: Profile, settings: Settings) {
  const copy = COPY[settings.locale];
  const name = displayName(profile.personal, settings.nameOrder) || "Your name";
  pen.write(name, { size: 22, style: "bold", gap: 1 });
  if (profile.personal.headline) pen.write(profile.personal.headline, { size: 12, style: "italic", gap: 1 });
  pen.write(contactBits(profile, false).join("  |  ") || "City, email, phone", {
    size: 9,
    font: "helvetica",
    color: MUTED,
    gap: 1,
  });
  pen.rule(FOREST, pen.width);
  if (profile.personal.summary) {
    pen.heading(copy.profile);
    pen.write(profile.personal.summary, { size: 10.5 });
  }
  drawExperience(pen, profile, settings);
  drawEducation(pen, profile, settings);
  drawSkills(pen, profile, settings);
}

function drawConsulate(pen: Pen, profile: Profile, settings: Settings) {
  const copy = COPY[settings.locale];
  const personal = profile.personal;
  const name = displayName(personal, settings.nameOrder) || "Your name";
  pen.doc.setFont("helvetica", "bold");
  pen.doc.setFontSize(8);
  pen.doc.setTextColor(...FOREST);
  pen.doc.text(`MERIDIAN  ${dossierCode(profile)}`, pen.margin, 14);
  pen.doc.setFont("times", "bold");
  pen.doc.setFontSize(16);
  pen.doc.setTextColor(...INK);
  pen.doc.text(copy.particulars.toUpperCase(), pen.margin, 22);
  if (personalPhoto(profile)) pen.doc.addImage(profile.personal.photo, "JPEG", pen.pageW - pen.margin - 24, 12, 24, 30);
  pen.y = personalPhoto(profile) ? 46 : 26;
  pen.rule(BRASS, pen.width);
  pen.y += 2;

  const rows: [string, string][] = [
    ["Full name", name],
    [copy.born, formatWhen(personal.dateOfBirth, settings.dateStyle)],
    [copy.place, personal.placeOfBirth],
    [copy.nationality, personal.nationality],
    [copy.passport, personal.passportNumber],
    ["Occupation", personal.headline],
    ["Email", personal.email],
    ["Telephone", phoneLine(personal)],
    ["Address", addressLines(personal).join(", ")],
    ["LinkedIn", personal.linkedin],
    ...lifeLines(profile, settings, "full"),
  ];

  for (let index = 0; index < rows.length; index += 2) {
    pen.ensure(14);
    const left = rows[index];
    const right = rows[index + 1];
    const col = pen.width / 2;
    const y = pen.y;
    const paint = (pair: [string, string] | undefined, x: number) => {
      if (!pair) return;
      pen.doc.setFont("helvetica", "bold");
      pen.doc.setFontSize(7.5);
      pen.doc.setTextColor(...MUTED);
      pen.doc.text(pdfText(pair[0].toUpperCase()), x, y);
      pen.doc.setFont("times", "normal");
      pen.doc.setFontSize(11);
      pen.doc.setTextColor(...INK);
      const lines = pen.doc.splitTextToSize(pdfText(pair[1] || "-"), col - 6) as string[];
      pen.doc.text(lines[0] ?? "-", x, y + 5);
      pen.doc.setDrawColor(...RULE);
      pen.doc.setLineWidth(0.2);
      pen.doc.line(x, y + 7.5, x + col - 6, y + 7.5);
    };
    paint(left, pen.margin);
    paint(right, pen.margin + col);
    pen.y = y + 13;
  }

  if (personal.summary) {
    pen.heading(copy.profile);
    pen.write(personal.summary, { size: 11 });
  }
  drawExperience(pen, profile, settings);
  drawEducation(pen, profile, settings);
  if (profile.languages.length) {
    pen.heading(copy.languages);
    pen.write(profile.languages.map((item) => `${item.name} (${item.level})`).join("   |   "), { size: 10.5 });
  }
  pen.y += 2;
  pen.write(copy.declaration, { size: 9, style: "italic", color: MUTED });
}

function drawLife(pen: Pen, profile: Profile, settings: Settings, mode: "cv" | "full") {
  const lines = lifeLines(profile, settings, mode);
  if (!lines.length) return;
  pen.heading(mode === "full" ? "Family and travel" : "More");
  for (const [label, value] of lines) pen.write(`${label}: ${value}`, { size: 10.5, gap: 1 });
}

export function buildPdf(profile: Profile, settings: Settings): jsPDF {
  const doc = new jsPDF({ unit: "mm", format: settings.paper });
  const pen = new Pen(doc);
  if (settings.template === "consulate") drawConsulate(pen, profile, settings);
  else if (settings.template === "atlas") drawAtlas(pen, profile, settings);
  else drawMeridian(pen, profile, settings);
  const name = displayName(profile.personal, settings.nameOrder) || "Meridian";
  pen.footer(name);
  doc.setProperties({ title: `${name} - Meridian`, creator: "Meridian" });
  return doc;
}

/**
 * Two diagonal, semi-transparent lines across EVERY page. Drawn last (on top)
 * at low opacity so the CV text underneath stays readable.
 */
export function stampWatermark(doc: jsPDF, lines: readonly string[]) {
  const pages = doc.getNumberOfPages();
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();
  const angle = (Math.atan2(h, w) * 180) / Math.PI;
  for (let page = 1; page <= pages; page += 1) {
    doc.setPage(page);
    doc.saveGraphicsState();
    doc.setGState(doc.GState({ opacity: 0.18 }));
    doc.setFont("helvetica", "bold");
    doc.setTextColor(150, 30, 30);
    lines.forEach((line, index) => {
      const size = index === 0 ? 30 : 40;
      doc.setFontSize(size);
      const text = pdfText(line);
      const len = doc.getTextWidth(text);
      // Centre each line on the diagonal, offset perpendicular to it.
      const cx = w / 2 + (index === 0 ? -1 : 1) * 22 * Math.sin((angle * Math.PI) / 180);
      const cy = h / 2 + (index === 0 ? -1 : 1) * 22 * Math.cos((angle * Math.PI) / 180);
      const rad = (angle * Math.PI) / 180;
      const x = cx - (len / 2) * Math.cos(rad);
      const y = cy + (len / 2) * Math.sin(rad);
      doc.text(text, x, y, { angle });
    });
    doc.restoreGraphicsState();
  }
}

/** Free, watermarked preview PDF. This is the ONLY PDF the browser builds. */
export function buildPreviewPdf(profile: Profile, settings: Settings, lines: readonly string[]): jsPDF {
  const doc = buildPdf(profile, settings);
  stampWatermark(doc, lines);
  doc.setProperties({ title: "UNPAID PREVIEW - Meridian", subject: lines.join(" / "), creator: "Meridian" });
  return doc;
}

export function downloadPreviewPdf(profile: Profile, settings: Settings, lines: readonly string[]) {
  buildPreviewPdf(profile, settings, lines).save(`${fileBase(profile, settings)}-PREVIEW.pdf`);
}
