import {
  AlignmentType,
  BorderStyle,
  Document,
  ImageRun,
  Packer,
  Paragraph,
  TextRun,
  type FileChild,
} from "docx";
import {
  COPY,
  addressLines,
  degreeLine,
  displayName,
  dossierCode,
  formatSpan,
  formatWhen,
  lifeLines,
  phoneLine,
  placeLine,
  summaryLines,
  type Profile,
  type Settings,
} from "./model";
import { signatureLine, templateSigns } from "./signature.ts";

const INK = "1C1915";
const FOREST = "1B4D3E";
const MUTED = "5C554C";

function run(
  text: string,
  opts: { bold?: boolean; italics?: boolean; size?: number; color?: string; font?: string } = {},
) {
  return new TextRun({
    text,
    bold: opts.bold,
    italics: opts.italics,
    size: opts.size ?? 22,
    color: opts.color ?? INK,
    font: opts.font ?? "Georgia",
  });
}

function photoBlock(dataUrl: string): Paragraph | null {
  if (!dataUrl.startsWith("data:image/")) return null;
  const base64 = dataUrl.split(",")[1];
  if (!base64) return null;
  const bytes = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
  return new Paragraph({
    alignment: AlignmentType.RIGHT,
    spacing: { after: 120 },
    children: [new ImageRun({ type: "jpg", data: bytes, transformation: { width: 84, height: 104 } })],
  });
}

function signatureBlocks(profile: Profile, settings: Settings): FileChild[] {
  const line = templateSigns(settings) ? signatureLine(profile.personal, settings) : null;
  if (!line) return [];
  const bytes = Uint8Array.from(atob(line.image.split(",")[1] ?? ""), (char) => char.charCodeAt(0));
  return [
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: { before: 360 },
      children: [new ImageRun({ type: "png", data: bytes, transformation: { width: 160, height: 54 } })],
    }),
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      border: { top: { style: BorderStyle.SINGLE, size: 6, color: INK, space: 2 } },
      children: [run(`${line.text ? `${line.text} · ` : ""}${line.label}`, { size: 18, color: MUTED, font: "Calibri" })],
    }),
  ];
}

function para(children: TextRun[], after = 80): Paragraph {
  return new Paragraph({ spacing: { after }, children });
}

function heading(label: string): Paragraph {
  return new Paragraph({
    border: { bottom: { color: "A68456", space: 1, style: BorderStyle.SINGLE, size: 8 } },
    spacing: { before: 280, after: 120 },
    children: [run(label.toUpperCase(), { bold: true, size: 18, color: FOREST, font: "Calibri" })],
  });
}

function body(text: string, opts: { italics?: boolean; size?: number; after?: number } = {}): Paragraph {
  return para([run(text, { italics: opts.italics, size: opts.size ?? 21 })], opts.after ?? 80);
}

function experienceBlocks(profile: Profile, settings: Settings): FileChild[] {
  const copy = COPY[settings.locale];
  if (!profile.experience.length) return [];
  const blocks: FileChild[] = [heading(copy.experience)];
  for (const role of profile.experience) {
    const when = formatSpan(role.start, role.end, role.current, settings);
    blocks.push(
      para([
        run(role.title || "Role", { bold: true, size: 24 }),
        run(when ? `    ${when}` : "", { italics: true, size: 20, color: MUTED }),
      ], 40),
    );
    const org = [role.organization, role.location].filter(Boolean).join("  |  ");
    if (org) blocks.push(para([run(org, { italics: true, size: 20, color: MUTED })], 40));
    for (const line of summaryLines(role.summary)) {
      blocks.push(body(`•  ${line}`, { size: 21, after: 40 }));
    }
  }
  return blocks;
}

function educationBlocks(profile: Profile, settings: Settings): FileChild[] {
  const copy = COPY[settings.locale];
  if (!profile.education.length) return [];
  const blocks: FileChild[] = [heading(copy.education)];
  for (const item of profile.education) {
    const when = formatSpan(item.start, item.end, false, settings);
    blocks.push(para([run([degreeLine(item), item.institution].filter(Boolean).join(" — ") || "Study", { bold: true, size: 22 })], 40));
    const meta = [item.location, when].filter(Boolean).join("  |  ");
    if (meta) blocks.push(para([run(meta, { italics: true, size: 20, color: MUTED })], 40));
    if (item.details) blocks.push(body(item.details, { after: 80 }));
  }
  return blocks;
}

function skillBlocks(profile: Profile, settings: Settings, includeLanguages: boolean): FileChild[] {
  const copy = COPY[settings.locale];
  const blocks: FileChild[] = [];
  if (profile.skills.length) {
    blocks.push(heading(copy.skills), body(profile.skills.join("  ·  ")));
  }
  if (includeLanguages && profile.languages.length) {
    blocks.push(
      heading(copy.languages),
      body(profile.languages.map((item) => `${item.name} (${item.level})`).join("  ·  ")),
    );
  }
  if (profile.certifications.length) {
    blocks.push(heading(copy.certifications));
    for (const item of profile.certifications) {
      blocks.push(body([item.name, item.issuer, item.year].filter(Boolean).join(" — ")));
    }
  }
  return blocks;
}

function childrenFor(profile: Profile, settings: Settings): FileChild[] {
  const copy = COPY[settings.locale];
  const personal = profile.personal;
  const name = displayName(personal, settings.nameOrder) || "Your name";
  const contact = [placeLine(personal), personal.email, phoneLine(personal), personal.linkedin, personal.website]
    .filter(Boolean)
    .join("  |  ");

  if (settings.template === "consulate") {
    const fields: [string, string][] = [
      ["Full name", name],
      [copy.born, formatWhen(personal.dateOfBirth, settings.dateStyle) || "—"],
      [copy.place, personal.placeOfBirth || "—"],
      [copy.nationality, personal.nationality || "—"],
      [copy.passport, personal.passportNumber || "—"],
      ["Occupation", personal.headline || "—"],
      ["Email", personal.email || "—"],
      ["Telephone", phoneLine(personal) || "—"],
      ["Address", addressLines(personal).join(", ") || "—"],
      ...lifeLines(profile, settings, "full"),
    ];
    return [
      para([run(`MERIDIAN  ${dossierCode(profile)}`, { bold: true, size: 16, color: FOREST, font: "Calibri" })], 40),
      ...(photoBlock(personal.photo) ? [photoBlock(personal.photo)!] : []),
      para([run(copy.particulars.toUpperCase(), { bold: true, size: 32 })], 160),
      ...fields.flatMap(([label, value]) => [
        para([run(label.toUpperCase(), { bold: true, size: 16, color: MUTED, font: "Calibri" })], 20),
        para([run(value, { size: 22 })], 120),
      ]),
      ...(personal.summary ? [heading(copy.profile), body(personal.summary)] : []),
      ...experienceBlocks(profile, settings),
      ...educationBlocks(profile, settings),
      ...skillBlocks(profile, settings, true),
      para([run(copy.declaration, { italics: true, size: 18, color: MUTED })], 0),
      ...signatureBlocks(profile, settings),
    ];
  }

  const blocks: FileChild[] = [];
  const portrait = settings.template === "meridian" ? photoBlock(personal.photo) : null;
  if (portrait) blocks.push(portrait);
  blocks.push(
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { after: 40 },
      children: [run(name, { bold: true, size: settings.template === "atlas" ? 40 : 44 })],
    }),
  );
  if (personal.headline) blocks.push(para([run(personal.headline, { italics: true, size: 24, color: FOREST })], 60));
  blocks.push(para([run(contact || "Add contact details", { size: 18, color: MUTED, font: "Calibri" })], 160));
  if (settings.template === "meridian" && personal.nationality) {
    blocks.push(para([run(`${copy.nationality}: ${personal.nationality}`, { italics: true, size: 20, color: MUTED })]));
  }
  if (personal.summary) blocks.push(heading(copy.profile), body(personal.summary));
  blocks.push(...experienceBlocks(profile, settings));
  blocks.push(...educationBlocks(profile, settings));
  blocks.push(...skillBlocks(profile, settings, true));
  for (const [label, value] of lifeLines(profile, settings, "cv")) {
    blocks.push(body(`${label}: ${value}`));
  }
  blocks.push(...signatureBlocks(profile, settings));
  return blocks;
}

export async function buildDocxBuffer(profile: Profile, settings: Settings) {
  const doc = new Document({
    creator: "Meridian",
    title: displayName(profile.personal, settings.nameOrder) || "Meridian dossier",
    sections: [
      {
        properties: {
          page: {
            size: {
              width: settings.paper === "a4" ? 11906 : 12240,
              height: settings.paper === "a4" ? 16838 : 15840,
            },
            margin: { top: 850, bottom: 850, left: 1000, right: 1000 },
          },
        },
        children: childrenFor(profile, settings),
      },
    ],
  });
  return Packer.toBuffer(doc);
}
