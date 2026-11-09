import {
  CALLING_CODES,
  uid,
  type Certification,
  type Education,
  type Experience,
  type Language,
  type Personal,
  type Profile,
} from "@/lib/cv/model";

export type Proposal = {
  id: string;
  label: string;
  detail: string;
  selected: boolean;
  apply: (profile: Profile) => Profile;
};

type SectionName =
  | "header"
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "languages"
  | "certifications";

const HEADINGS: Record<string, SectionName> = {
  summary: "summary",
  "professional summary": "summary",
  profile: "summary",
  "about me": "summary",
  about: "summary",
  objective: "summary",
  profil: "summary",
  zusammenfassung: "summary",
  perfil: "summary",
  experience: "experience",
  "work experience": "experience",
  "professional experience": "experience",
  "employment history": "experience",
  "work history": "experience",
  employment: "experience",
  expérience: "experience",
  "expérience professionnelle": "experience",
  berufserfahrung: "experience",
  "berufliche erfahrung": "experience",
  experiencia: "experience",
  "experiencia profesional": "experience",
  "experiencia laboral": "experience",
  education: "education",
  "education and training": "education",
  "academic background": "education",
  studies: "education",
  formation: "education",
  études: "education",
  etudes: "education",
  ausbildung: "education",
  educación: "education",
  educacion: "education",
  formación: "education",
  formacion: "education",
  skills: "skills",
  "core skills": "skills",
  "key skills": "skills",
  competencies: "skills",
  competences: "skills",
  compétences: "skills",
  kompetenzen: "skills",
  kenntnisse: "skills",
  habilidades: "skills",
  competencias: "skills",
  languages: "languages",
  "language skills": "languages",
  langues: "languages",
  sprachen: "languages",
  idiomas: "languages",
  certifications: "certifications",
  certificates: "certifications",
  licenses: "certifications",
  licences: "certifications",
  certificats: "certifications",
  zertifikate: "certifications",
  certificaciones: "certifications",
};

const MONTH =
  "jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?|janv(?:ier)?|févr(?:ier)?|fevr(?:ier)?|mars|avr(?:il)?|mai|juin|juil(?:let)?|ao[uû]t|sept(?:embre)?|octobre|novembre|d[ée]cembre|märz|maerz|okt|dez|ene|abr|ago|dic|जनवरी|फ़रवरी|फरवरी|मार्च|अप्रैल|मई|जून|जुलाई|अगस्त|सितंबर|सितम्बर|अक्टूबर|नवंबर|दिसंबर|يناير|فبراير|مارس|أبريل|ابريل|مايو|يونيو|يوليو|أغسطس|اغسطس|سبتمبر|أكتوبر|اكتوبر|نوفمبر|ديسمبر";

const DATE_TOKEN = `(?:(?:${MONTH})\\.?\\s+\\d{4}|\\d{1,2}[\\/.\\-]\\d{4}|\\d{4}[\\/.\\-]\\d{1,2}|\\d{4})`;
const RANGE = new RegExp(
  `(${DATE_TOKEN})\\s*(?:–|—|-|to|à|bis)\\s*(${DATE_TOKEN}|present|current|now|aujourd['’]hui|heute|actualidad|actual|en cours|présent|presente)`,
  "i",
);

const DEGREE =
  /\b(Ph\.?D\.?|M\.?Sc\.?|B\.?Sc\.?|M\.?Eng\.?|B\.?Eng\.?|MBA|LL\.?M\.?|M\.?A\.?|B\.?A\.?|Bachelor(?:'s)?|Master(?:'s)?|Doctorate|Licence|Diplom)\b/i;

const MONTH_INDEX: Record<string, string> = {
  jan: "01",
  feb: "02",
  mar: "03",
  apr: "04",
  may: "05",
  jun: "06",
  jul: "07",
  aug: "08",
  sep: "09",
  oct: "10",
  nov: "11",
  dec: "12",
  janv: "01",
  févr: "02",
  fevr: "02",
  mars: "03",
  avr: "04",
  mai: "05",
  juin: "06",
  juil: "07",
  aou: "08",
  aoû: "08",
  sept: "09",
  okt: "10",
  dez: "12",
  ene: "01",
  ago: "08",
  dic: "12",
  mär: "03",
  maerz: "03",
  // Hindi month names (Devanagari)
  जनवरी: "01",
  फ़रवरी: "02",
  फरवरी: "02",
  मार्च: "03",
  अप्रैल: "04",
  मई: "05",
  जून: "06",
  जुलाई: "07",
  अगस्त: "08",
  सितंबर: "09",
  सितम्बर: "09",
  अक्टूबर: "10",
  नवंबर: "11",
  दिसंबर: "12",
  // Arabic month names
  يناير: "01",
  فبراير: "02",
  مارس: "03",
  أبريل: "04",
  ابريل: "04",
  مايو: "05",
  يونيو: "06",
  يوليو: "07",
  أغسطس: "08",
  اغسطس: "08",
  سبتمبر: "09",
  أكتوبر: "10",
  اكتوبر: "10",
  نوفمبر: "11",
  ديسمبر: "12",
};

function monthKey(token: string): string | undefined {
  const cleaned = token
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\./g, "");
  if (MONTH_INDEX[cleaned]) return MONTH_INDEX[cleaned];
  return MONTH_INDEX[cleaned.slice(0, 4)] ?? MONTH_INDEX[cleaned.slice(0, 3)];
}

/** Devanagari (०-९), Arabic-Indic (٠-٩) and Eastern Arabic (۰-۹) digits → ASCII 0-9. */
function normalizeDigits(text: string): string {
  return text.replace(/[\u0966-\u096F\u0660-\u0669\u06F0-\u06F9]/g, (ch) => {
    const code = ch.codePointAt(0) ?? 0;
    if (code >= 0x0966 && code <= 0x096f) return String(code - 0x0966);
    if (code >= 0x0660 && code <= 0x0669) return String(code - 0x0660);
    return String(code - 0x06f0);
  });
}

function normalize(text: string): string {
  return normalizeDigits(text)
    .replace(/\r/g, "")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function matchHeading(line: string): SectionName | null {
  const raw = line.trim();
  if (!raw || raw.length > 48 || raw.includes("@")) return null;
  if (/^(cv|curriculum vitae|resume|résumé)$/i.test(raw)) return null;
  const cleaned = raw
    .replace(/[:|.\-–—]+$/g, "")
    .trim()
    .toLowerCase();
  if (HEADINGS[cleaned]) return HEADINGS[cleaned];
  const letters = raw.replace(/[^A-Za-zÀ-ÿ]/g, "");
  const isCaps = letters.length > 3 && raw === raw.toUpperCase();
  if (!isCaps) return null;
  for (const [key, section] of Object.entries(HEADINGS)) {
    if (cleaned === key || cleaned.startsWith(`${key} `)) return section;
  }
  return null;
}

function chunks(lines: string[]): string[][] {
  const groups: string[][] = [];
  let current: string[] = [];
  for (const line of lines) {
    if (!line.trim()) {
      if (current.length) groups.push(current);
      current = [];
    } else current.push(line.trim());
  }
  if (current.length) groups.push(current);
  return groups;
}

function isBullet(line: string): boolean {
  return /^([•·*\-–]|\d+[.)])\s+/.test(line);
}

function cleanBullet(line: string): string {
  return line.replace(/^([•·*\-–]|\d+[.)])\s+/, "").trim();
}

function isLocation(line: string): boolean {
  if (line.length > 64 || /\d{3,}/.test(line) || line.includes("@")) return false;
  return /^[\p{L}][\p{L} .'-]+,\s*[\p{L}][\p{L} .'-]+$/u.test(line);
}

function toYearMonth(token: string): { value: string; current: boolean } {
  const trimmed = token.trim();
  const lower = trimmed.toLowerCase();
  if (/present|current|now|aujourd|heute|actual|cours|présent|presente/.test(lower)) {
    return { value: "", current: true };
  }
  const iso = /^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(trimmed);
  if (iso) return { value: `${iso[1]}-${iso[2]}`, current: false };
  // Japanese / Chinese 年月日 form, e.g. 1998年3月15日 → 1998-03 (month precision).
  const ymd = /^(\d{4})年(\d{1,2})月(?:\d{1,2}日)?$/.exec(trimmed);
  if (ymd) return { value: `${ymd[1]}-${(ymd[2] ?? "").padStart(2, "0")}`, current: false };
  if (/^\d{4}$/.test(trimmed)) return { value: trimmed, current: false };
  const named = new RegExp(`^(${MONTH})\\.?\\s+(\\d{4})$`, "i").exec(trimmed);
  if (named) {
    const month = monthKey(named[1]);
    return { value: month ? `${named[2]}-${month}` : named[2], current: false };
  }
  const slash = /^(\d{1,2})[/.\\-](\d{4})$/.exec(trimmed);
  if (slash) return { value: `${slash[2]}-${slash[1].padStart(2, "0")}`, current: false };
  const yearFirst = /^(\d{4})[/.\\-](\d{1,2})$/.exec(trimmed);
  if (yearFirst) return { value: `${yearFirst[1]}-${yearFirst[2].padStart(2, "0")}`, current: false };
  return { value: trimmed, current: false };
}

function splitRole(line: string): { title: string; organization: string } | null {
  if (RANGE.test(line) || isBullet(line) || isLocation(line)) return null;
  const parts = line.split(/\s+[—–|]\s+|\s+-\s+|\s+ at \s+/i);
  if (parts.length < 2) return null;
  const title = parts[0]?.trim() ?? "";
  const organization = parts.slice(1).join(" — ").trim();
  if (!title || !organization || title.length > 80) return null;
  return { title, organization };
}

function parseExperienceChunk(chunk: string[]): Experience | null {
  let title = "";
  let organization = "";
  let location = "";
  let start = "";
  let end = "";
  let current = false;
  const notes: string[] = [];

  for (const line of chunk) {
    const range = line.match(RANGE);
    if (range && !start) {
      const from = toYearMonth(range[1] ?? "");
      const to = toYearMonth(range[2] ?? "");
      start = from.value;
      current = to.current;
      end = to.current ? "" : to.value;
      const rest = line
        .replace(range[0], " ")
        .replace(/[|·•]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      if (rest && !title && !isLocation(rest)) {
        const role = splitRole(rest);
        if (role) {
          title = role.title;
          organization = role.organization;
        } else title = rest;
      }
      continue;
    }
    const role = !title || !organization ? splitRole(line) : null;
    if (role && !title) {
      title = role.title;
      organization = role.organization;
      continue;
    }
    if (!title && !isLocation(line) && !isBullet(line)) {
      title = line;
      continue;
    }
    if (!location && isLocation(line)) {
      location = line;
      continue;
    }
    notes.push(isBullet(line) ? cleanBullet(line) : line);
  }

  if (!title && !organization && notes.length === 0) return null;
  if (!title && !organization) return null;
  return {
    id: uid(),
    title,
    organization,
    location,
    start,
    end,
    current,
    summary: notes.join("\n"),
  };
}

function splitDegree(title: string): { qualification: string; field: string } {
  const match = title.match(DEGREE);
  if (!match || match.index === undefined) return { qualification: title, field: "" };
  const qualification = match[1] ?? title;
  const field = title
    .replace(match[0], " ")
    .replace(/^[\s,–—-]+|[\s,–—-]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return { qualification, field };
}

function parseEducationChunk(chunk: string[]): Education | null {
  let qualification = "";
  let field = "";
  let institution = "";
  let location = "";
  let start = "";
  let end = "";
  const notes: string[] = [];
  const joined = chunk.join(" ");
  if (!DEGREE.test(joined) && !RANGE.test(joined)) return null;

  for (const line of chunk) {
    const range = line.match(RANGE);
    if (range && !start) {
      start = toYearMonth(range[1] ?? "").value;
      const to = toYearMonth(range[2] ?? "");
      end = to.current ? "" : to.value;
      continue;
    }
    const role = splitRole(line);
    if (role && !qualification) {
      const degree = splitDegree(role.title);
      qualification = degree.qualification;
      field = degree.field;
      institution = role.organization;
      continue;
    }
    if (!qualification && DEGREE.test(line)) {
      const degree = splitDegree(line);
      qualification = degree.qualification;
      field = degree.field;
      continue;
    }
    if (!location && isLocation(line)) {
      location = line;
      continue;
    }
    if (!institution && !isBullet(line)) {
      institution = line;
      continue;
    }
    notes.push(isBullet(line) ? cleanBullet(line) : line);
  }

  if (!qualification && !institution) return null;
  return {
    id: uid(),
    institution,
    qualification,
    field,
    location,
    start,
    end,
    details: notes.join("\n"),
  };
}

function parseLanguage(line: string): Language | null {
  const cleaned = cleanBullet(line);
  const match =
    /^([A-Za-zÀ-ÿ][\p{L} -]{1,32}?)\s*[—–:\-|]\s*(native|mother tongue|bilingual|fluent|professional|advanced|intermediate|elementary|basic|c2|c1|b2|b1|a2|a1)$/iu.exec(
      cleaned,
    );
  if (!match) return null;
  const levelRaw = (match[2] ?? "").toLowerCase();
  const level =
    levelRaw === "mother tongue" || levelRaw === "bilingual"
      ? "Native"
      : levelRaw === "fluent" || levelRaw === "advanced"
        ? "C1"
        : levelRaw === "professional"
          ? "B2"
          : levelRaw === "intermediate"
            ? "B1"
            : levelRaw === "elementary" || levelRaw === "basic"
              ? "A2"
              : levelRaw === "native"
                ? "Native"
                : levelRaw.toUpperCase();
  return { id: uid(), name: (match[1] ?? "").trim(), level };
}

function parseCertification(line: string): Certification | null {
  const cleaned = cleanBullet(line);
  if (cleaned.length < 3) return null;
  const year = cleaned.match(/\b(19|20)\d{2}\b/);
  const parts = cleaned
    .split(/\s+[—–|]\s+|\s+-\s+|,\s+/)
    .map((part) => part.replace(/\(?\b(19|20)\d{2}\b\)?/g, "").trim())
    .filter(Boolean);
  const name = parts[0];
  if (!name) return null;
  return { id: uid(), name, issuer: parts[1] ?? "", year: year?.[0] ?? "" };
}

function splitSkills(text: string): string[] {
  const seen = new Set<string>();
  const skills: string[] = [];
  for (const part of text.split(/[\n,;•·|]/)) {
    const skill = cleanBullet(part).replace(/\s+/g, " ").trim();
    if (skill.length < 2 || skill.length > 48) continue;
    if (skill.split(/\s+/).length > 6) continue;
    const key = skill.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    skills.push(skill);
  }
  return skills;
}

const KV: { re: RegExp; key: keyof Personal | "fullName" }[] = [
  { re: /^(?:first name|given name|given names|prénom|prenom|vorname|nombre de pila|पहला नाम|الاسم الأول|名)\s*[:\-–：]\s*(.+)$/i, key: "givenName" },
  { re: /^(?:last name|family name|surname|nom de famille|nachname|apellidos|apellido|उपनाम|اسم العائلة|姓)\s*[:\-–：]\s*(.+)$/i, key: "familyName" },
  { re: /^(?:customer name|applicant name|account name|subscriber name|full name|name|nom complet|nombre completo|पूरा नाम|नाम|الاسم الكامل|الاسم|氏名|姓名|全名)\s*[:\-–：]\s*(.+)$/i, key: "fullName" },
  { re: /^(?:headline|title|occupation|job title|poste|beruf|profesión|profesion|provider|operator|network|पेशा|المهنة|職業|职业)\s*[:\-–：]\s*(.+)$/i, key: "headline" },
  { re: /^(?:e-?mail(?:\s+address)?|courriel|correo|ईमेल|البريد الإلكتروني|メールアドレス|电子邮箱|邮箱)\s*[:\-–：]\s*(.+)$/i, key: "email" },
  { re: /^(?:phone|telephone|téléphone|telefon|teléfono|telefono|mobile|cell|whatsapp|फ़ोन|टेलीफ़ोन|الهاتف|電話番号|電話|电话|手机)(?:\s+(?:number|no\.?|num(?:ber)?))?\s*[:\-–：]\s*(.+)$/i, key: "phone" },
  { re: /^(?:street|address|adresse|dirección|direccion|straße|strasse|पता|العنوان|住所|地址)\s*[:\-–：]\s*(.+)$/i, key: "street" },
  { re: /^(?:postal code|postcode|zip|zip code|code postal|código postal|codigo postal|plz|पिन कोड|c\.?p\.?)\s*[:\-–：]\s*(.+)$/i, key: "postalCode" },
  { re: /^(?:city|ville|stadt|ciudad|शहर|المدينة|市|城市)\s*[:\-–：]\s*(.+)$/i, key: "city" },
  { re: /^(?:region|state|province|région|bundesland|canton|राज्य|المنطقة|都道府県|省)\s*[:\-–：]\s*(.+)$/i, key: "region" },
  { re: /^(?:country|pays|land|país|pais|देश|البلد|国|国家)\s*[:\-–：]\s*(.+)$/i, key: "country" },
  { re: /^(?:nationality|nationalité|staatsangehörigkeit|nacionalidad|राष्ट्रीयता|الجنسية|国籍)\s*[:\-–：]\s*(.+)$/i, key: "nationality" },
  { re: /^(?:date of birth|dob|birth date|born|date de naissance|geburtsdatum|fecha de nacimiento|जन्म तिथि|تاريخ الميلاد|生年月日|出生日期)\s*[:\-–：]\s*(.+)$/i, key: "dateOfBirth" },
  { re: /^(?:place of birth|birth place|lieu de naissance|geburtsort|lugar de nacimiento|जन्म स्थान|مكان الميلاد|出生地)\s*[:\-–：]\s*(.+)$/i, key: "placeOfBirth" },
  { re: /^(?:passport|passport number|n[°ºo]\.\?\s*passeport|passeport|reisepass|pasaporte|पासपोर्ट|جواز السفر|パスポート|护照)\s*[:\-–：]\s*(.+)$/i, key: "passportNumber" },
  { re: /^(?:linkedin)\s*[:\-–：]\s*(.+)$/i, key: "linkedin" },
  { re: /^(?:website|site|web|url|portfolio|वेबसाइट|الموقع|网站)\s*[:\-–：]\s*(.+)$/i, key: "website" },
  { re: /^(?:summary|profile|profil|about|résumé|resumen|सारांश|ملخص|概要|简介)\s*[:\-–：]\s*(.+)$/i, key: "summary" },
];

function splitName(full: string): { givenName: string; familyName: string } {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (parts.length < 2) return { givenName: full.trim(), familyName: "" };
  const particles = new Set(["el", "al", "de", "del", "da", "di", "van", "von", "bin", "ibn"]);
  let index = parts.length - 1;
  while (index > 1 && particles.has((parts[index - 1] ?? "").toLowerCase())) index -= 1;
  return {
    givenName: parts.slice(0, index).join(" "),
    familyName: parts.slice(index).join(" "),
  };
}

function looksLikeName(line: string): boolean {
  if (line.length > 48 || /\d|@|https?:/.test(line)) return false;
  const parts = line.split(/\s+/);
  if (parts.length < 2 || parts.length > 4) return false;
  return parts.every((part) => {
    if (/^(el|al|de|van|von)$/i.test(part)) return true;
    if (!/^[\p{L}][\p{L}'’.-]+$/u.test(part)) return false;
    // Scripts without case (Devanagari, Arabic, CJK, …) have no uppercase
    // letters at all, so they can never satisfy a \p{Lu} check — accept
    // them; cased scripts must still start with an uppercase letter.
    const hasCase = /[\p{Ll}\p{Lu}]/u.test(part);
    return !hasCase || /^[\p{Lu}]/u.test(part);
  });
}

function looseDate(value: string): string {
  const trimmed = normalizeDigits(value.trim());
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
  // Japanese / Chinese 年月日 form, e.g. 1998年3月15日.
  const ymd = /^(\d{4})年(\d{1,2})月(\d{1,2})日$/.exec(trimmed);
  if (ymd) return `${ymd[1]}-${(ymd[2] ?? "").padStart(2, "0")}-${(ymd[3] ?? "").padStart(2, "0")}`;
  const named = new RegExp(`^(\\d{1,2})\\s+(${MONTH})\\.?\\s+(\\d{4})$`, "i").exec(trimmed);
  if (named) {
    const month = monthKey(named[2] ?? "");
    if (month) return `${named[3]}-${month}-${(named[1] ?? "").padStart(2, "0")}`;
  }
  const mdy = new RegExp(`^(${MONTH})\\.?\\s+(\\d{1,2}),?\\s+(\\d{4})$`, "i").exec(trimmed);
  if (mdy) {
    const month = monthKey(mdy[1] ?? "");
    if (month) return `${mdy[3]}-${month}-${(mdy[2] ?? "").padStart(2, "0")}`;
  }
  const slash = /^(\d{1,2})[/.](\d{1,2})[/.](\d{4})$/.exec(trimmed);
  if (slash) {
    const a = Number(slash[1]);
    const b = Number(slash[2]);
    // Never emit an invalid month. DD/MM is the default; when that reading
    // would put an impossible month (>12) in the month slot but MM/DD is
    // valid (US form), use MM/DD; when neither reading is valid, leave the
    // date unparsed instead of emitting corrupt output like 1998-15-03.
    if (b <= 12) return `${slash[3]}-${(slash[2] ?? "").padStart(2, "0")}-${(slash[1] ?? "").padStart(2, "0")}`;
    if (a <= 12) return `${slash[3]}-${(slash[1] ?? "").padStart(2, "0")}-${(slash[2] ?? "").padStart(2, "0")}`;
    return trimmed;
  }
  return trimmed;
}

export function splitPhone(raw: string): { phoneCode: string; phone: string } {
  const compact = raw.replace(/[^\d+]/g, "");
  const codes = [...CALLING_CODES].sort((a, b) => b.code.length - a.code.length);
  for (const entry of codes) {
    if (compact.startsWith(entry.code)) {
      const phone = raw
        .trim()
        .replace(/^\+\d{1,3}[\s.-]*/, "")
        .trim();
      return { phoneCode: entry.code, phone: phone || compact.slice(entry.code.length) };
    }
  }
  return { phoneCode: "", phone: raw.replace(/\s+/g, " ").trim() };
}

function cleanUrl(value: string): string {
  return value.replace(/^https?:\/\//i, "").replace(/^www\./i, "").replace(/\/$/, "").trim();
}

function findWebsite(text: string, email?: string): string | undefined {
  const domain = email?.split("@")[1]?.toLowerCase();
  const local = email?.split("@")[0]?.toLowerCase();
  const matches = text.match(/(?:https?:\/\/|www\.)?[a-z0-9][a-z0-9.-]*\.[a-z]{2,}(?:\/[^\s)]*)?/gi) ?? [];
  for (const item of matches) {
    const host = cleanUrl(item).split("/")[0]?.toLowerCase() ?? "";
    const tld = host.split(".").pop() ?? "";
    if (!host || host.includes("linkedin.com")) continue;
    if (!/^(?:com|org|net|io|co|in|uk|de|fr|ch|edu|gov|app|dev|me|info|biz|us|ca|au|ae|ng|ke|eg|eu|ai)$/i.test(tld)) continue;
    if (domain && (host === domain || host.endsWith(`.${domain}`))) continue;
    if (local && host === local) continue;
    if (email && item.toLowerCase().includes(email.toLowerCase())) continue;
    return cleanUrl(item);
  }
  return undefined;
}

function leadingPlace(line: string): { city: string; country: string } | null {
  const match = /^([\p{L}][\p{L} .'-]{1,40}),\s*([\p{L}][\p{L} .'-]{1,40})/u.exec(line.trim());
  if (!match?.[1] || !match[2]) return null;
  return { city: match[1].trim(), country: match[2].trim() };
}

function titleCaseIfShouting(value: string): string {
  const letters = value.replace(/[^\p{L}]/gu, "");
  if (!letters || letters !== letters.toUpperCase()) return value;
  return value
    .toLowerCase()
    .replace(/(^|[\s\-'])(\p{L})/gu, (_all, sep: string, char: string) => sep + char.toUpperCase());
}

function sectionText(blocks: { section: SectionName; lines: string[] }[], name: SectionName): string {
  return blocks
    .filter((block) => block.section === name)
    .flatMap((block) => block.lines)
    .join("\n");
}

function readKv(lines: string[]): Partial<Personal> & { fullName?: string } {
  const found: Partial<Personal> & { fullName?: string } = {};
  for (const line of lines) {
    for (const field of KV) {
      const match = field.re.exec(line.trim());
      if (!match?.[1]) continue;
      const value = match[1].trim();
      if (field.key === "fullName") found.fullName = value;
      else if (field.key === "dateOfBirth") found.dateOfBirth = looseDate(value);
      else if (field.key === "phone") {
        const phone = splitPhone(value);
        if (phone.phoneCode) found.phoneCode = phone.phoneCode;
        found.phone = phone.phone;
      } else if (field.key === "linkedin" || field.key === "website") found[field.key] = cleanUrl(value);
      else (found as Record<string, unknown>)[field.key] = value;
    }
  }
  return found;
}

function personalProposals(personal: Partial<Personal>): Proposal[] {
  // i18n-data:start
  const labels: { key: keyof Personal; label: string }[] = [
    { key: "givenName", label: "Given name" },
    { key: "familyName", label: "Family name" },
    { key: "headline", label: "Headline" },
    { key: "email", label: "Email" },
    { key: "phoneCode", label: "Calling code" },
    { key: "phone", label: "Phone" },
    { key: "street", label: "Street" },
    { key: "postalCode", label: "Postal code" },
    { key: "city", label: "City" },
    { key: "region", label: "Region" },
    { key: "country", label: "Country" },
    { key: "nationality", label: "Nationality" },
    { key: "dateOfBirth", label: "Date of birth" },
    { key: "placeOfBirth", label: "Place of birth" },
    { key: "passportNumber", label: "Passport" },
    { key: "linkedin", label: "LinkedIn" },
    { key: "website", label: "Website" },
    { key: "summary", label: "Profile" },
  ];
  // i18n-data:end
  return labels.flatMap(({ key, label }) => {
    const raw = personal[key];
    const value = typeof raw === "string" ? raw.trim() : "";
    if (!value) return [];
    return [
      {
        id: `personal.${key}`,
        label,
        detail: value,
        selected: true,
        apply: (profile: Profile) => ({
          ...profile,
          personal: { ...profile.personal, [key]: value },
        }),
      },
    ];
  });
}

export function proposeFromText(source: string): Proposal[] {
  const text = normalize(source);
  if (!text) return [];
  const lines = text.split("\n");
  const kv = readKv(lines);
  const blocks: { section: SectionName; lines: string[] }[] = [{ section: "header", lines: [] }];
  for (const line of lines) {
    const heading = matchHeading(line);
    if (heading) blocks.push({ section: heading, lines: [] });
    else blocks[blocks.length - 1]?.lines.push(line);
  }

  const headerLines = blocks
    .filter((block) => block.section === "header")
    .flatMap((block) => block.lines)
    .map((line) => line.trim())
    .filter(Boolean);

  const { fullName, ...kvPersonal } = kv;
  const personal: Partial<Personal> = { ...kvPersonal };
  if (fullName && !personal.givenName && !personal.familyName) {
    const split = splitName(fullName);
    personal.givenName = titleCaseIfShouting(split.givenName);
    personal.familyName = titleCaseIfShouting(split.familyName);
  }

  const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0];
  if (email && !personal.email) personal.email = email;

  if (!personal.phone) {
    const phoneMatch = text.match(/\+\d{1,3}[\s.-]?(?:\(?\d{1,4}\)?[\s.-]?){2,4}\d{2,4}/);
    const digits = phoneMatch?.[0]?.replace(/\D/g, "") ?? "";
    if (phoneMatch && digits.length >= 8 && digits.length <= 15) {
      const phone = splitPhone(phoneMatch[0]);
      if (phone.phoneCode) personal.phoneCode = phone.phoneCode;
      personal.phone = phone.phone || phoneMatch[0].trim();
    }
  }

  const linkedin = text.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[A-Za-z0-9_\-/%]+/i)?.[0];
  if (linkedin && !personal.linkedin) personal.linkedin = cleanUrl(linkedin);
  if (!personal.website) {
    const site = findWebsite(text, personal.email);
    if (site) personal.website = site;
  }

  const contentLines = headerLines.filter((line) => {
    if (KV.some((field) => field.re.test(line))) return false;
    if (line.includes("@") || /linkedin\.com/i.test(line)) return false;
    return true;
  });

  if (!personal.givenName) {
    const nameLine = contentLines.find(looksLikeName);
    if (nameLine) {
      const split = splitName(nameLine);
      personal.givenName = titleCaseIfShouting(split.givenName);
      personal.familyName = titleCaseIfShouting(split.familyName);
    }
  }

  if (!personal.headline) {
    const headline = contentLines.find((line) => {
      if (line.includes(":") || line.includes("：")) return false; // a "Label: value" line is not a headline
      if (looksLikeName(line) && titleCaseIfShouting(splitName(line).givenName) === personal.givenName) return false;
      if (leadingPlace(line) && line.length < 48) return false;
      return line.length < 80 && !/^[\d\s+().-]+$/.test(line);
    });
    if (headline) personal.headline = headline.split(/\s+[·|]\s+/)[0]?.trim() ?? headline;
  }

  if (!personal.city || !personal.country) {
    for (const line of headerLines) {
      const place = leadingPlace(line);
      if (!place) continue;
      if (!personal.city) personal.city = place.city;
      if (!personal.country) personal.country = place.country;
      break;
    }
  }

  const summaryBody = sectionText(blocks, "summary").trim();
  if (summaryBody && !personal.summary) personal.summary = summaryBody.replace(/\n+/g, " ").replace(/\s+/g, " ").trim();

  const headed = blocks.some((block) => block.section !== "header");
  const experienceSource = headed ? sectionText(blocks, "experience") : text;
  const educationSource = headed ? sectionText(blocks, "education") : text;
  const experience = chunks(experienceSource.split("\n"))
    .map(parseExperienceChunk)
    .filter((item): item is Experience => Boolean(item && (item.title || item.organization) && (headed || item.start || item.current)))
    .filter((item) => headed || !DEGREE.test(`${item.title} ${item.organization}`));
  const education = chunks(educationSource.split("\n"))
    .map(parseEducationChunk)
    .filter((item): item is Education => Boolean(item && (item.qualification || item.institution)))
    .filter((item) => headed || DEGREE.test(`${item.qualification} ${item.field}`));

  const skills = splitSkills(sectionText(blocks, "skills"));
  const languages = sectionText(blocks, "languages")
    .split("\n")
    .map(parseLanguage)
    .filter((item): item is Language => Boolean(item));
  const certifications = sectionText(blocks, "certifications")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map(parseCertification)
    .filter((item): item is Certification => Boolean(item));

  const proposals = personalProposals(personal);
  if (experience.length) {
    proposals.push({
      id: "experience",
      label: "Work history",
      detail: experience
        .map((item) => item.organization || item.title)
        .filter(Boolean)
        .slice(0, 3)
        .join(", "),
      selected: true,
      apply: (profile) => ({ ...profile, experience }),
    });
  }
  if (education.length) {
    proposals.push({
      id: "education",
      label: "Education",
      detail: education
        .map((item) => [item.qualification, item.institution].filter(Boolean).join(" · "))
        .slice(0, 3)
        .join("; "),
      selected: true,
      apply: (profile) => ({ ...profile, education }),
    });
  }
  if (skills.length) {
    proposals.push({
      id: "skills",
      label: "Skills",
      detail: skills.slice(0, 6).join(", "),
      selected: true,
      apply: (profile) => ({ ...profile, skills }),
    });
  }
  if (languages.length) {
    proposals.push({
      id: "languages",
      label: "Languages",
      detail: languages.map((item) => `${item.name} ${item.level}`).join(", "),
      selected: true,
      apply: (profile) => ({ ...profile, languages }),
    });
  }
  if (certifications.length) {
    proposals.push({
      id: "certifications",
      label: "Certifications",
      detail: certifications.map((item) => item.name).join(", "),
      selected: true,
      apply: (profile) => ({ ...profile, certifications }),
    });
  }
  return proposals;
}

export function applyProposals(profile: Profile, proposals: Proposal[]): Profile {
  return proposals.filter((item) => item.selected).reduce((next, item) => item.apply(next), profile);
}
