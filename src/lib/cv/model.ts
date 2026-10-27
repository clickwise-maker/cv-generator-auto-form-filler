export type Locale = "en" | "fr" | "de" | "es";
export type DateStyle = "dmy" | "mdy" | "iso";
export type NameOrder = "given-family" | "family-given";
export type TemplateId = "meridian" | "consulate" | "atlas";
export type Paper = "a4" | "letter";

export type Personal = {
  givenName: string;
  familyName: string;
  headline: string;
  email: string;
  phoneCode: string;
  phone: string;
  street: string;
  postalCode: string;
  city: string;
  region: string;
  country: string;
  nationality: string;
  dateOfBirth: string;
  placeOfBirth: string;
  passportNumber: string;
  linkedin: string;
  website: string;
  summary: string;
  photo: string;
  fatherName: string;
  motherName: string;
  maritalStatus: string;
  spouseName: string;
  eyeColour: string;
  hairColour: string;
  merit: string;
  hobbies: string;
  sex: string;
  surnameAtBirth: string;
  nationalityAtBirth: string;
  otherNationalities: string;
  nationalId: string;
  positionApplied: string;
  passportType: string;
  passportIssuedOn: string;
  passportExpires: string;
  passportIssuedBy: string;
  passportIssuedCity: string;
  passportEndorsement: string;
  passportLost: string;
  oldPassport: string;
  drivingLicence: string;
  digitalSkills: string;
  projects: string;
  publications: string;
  volunteering: string;
  memberships: string;
  referencesNote: string;
  guardian: string;
  visaPurpose: string;
  destination: string;
  entryDate: string;
  exitDate: string;
  accommodation: string;
  sponsor: string;
  previousVisa: string;
  /** Signature as a PNG data URL (drawn or uploaded), "" when none. */
  signature: string;
  /** Place written next to the signature line ("" = use the city). */
  signaturePlace: string;
  /** Date written next to the signature line (YYYY-MM-DD, "" = today on export). */
  signatureDate: string;
  /** Unlimited "Add more details" rows, shared by the CV Generator and the Form Filler. */
  customDetails: CustomDetail[];
};

export type CustomDetail = { id: string; label: string; value: string };

export type Child = {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
};

export type Trip = {
  id: string;
  country: string;
  from: string;
  to: string;
  purpose: string;
};

export type Experience = {
  id: string;
  title: string;
  organization: string;
  location: string;
  start: string;
  end: string;
  current: boolean;
  summary: string;
};

export type Education = {
  id: string;
  institution: string;
  qualification: string;
  field: string;
  location: string;
  start: string;
  end: string;
  details: string;
};

export type Language = {
  id: string;
  name: string;
  level: string;
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  year: string;
};

export type Profile = {
  personal: Personal;
  experience: Experience[];
  education: Education[];
  skills: string[];
  languages: Language[];
  certifications: Certification[];
  children: Child[];
  travel: Trip[];
};

export type Settings = {
  template: TemplateId;
  locale: Locale;
  dateStyle: DateStyle;
  nameOrder: NameOrder;
  paper: Paper;
};

export type Copy = {
  profile: string;
  experience: string;
  education: string;
  skills: string;
  languages: string;
  certifications: string;
  contact: string;
  particulars: string;
  born: string;
  nationality: string;
  passport: string;
  place: string;
  declaration: string;
  signature: string;
  signPlace: string;
  signDate: string;
  more: string;
};

export const COPY: Record<Locale, Copy> = {
  en: {
    profile: "Profile",
    experience: "Experience",
    education: "Education",
    skills: "Skills",
    languages: "Languages",
    certifications: "Certifications",
    contact: "Contact",
    particulars: "Personal particulars",
    born: "Date of birth",
    nationality: "Nationality",
    passport: "Passport",
    place: "Place of birth",
    declaration: "Review every line before you file this.",
    signature: "Signature",
    signPlace: "Place",
    signDate: "Date",
    more: "More details",
  },
  fr: {
    profile: "Profil",
    experience: "Expérience",
    education: "Formation",
    skills: "Compétences",
    languages: "Langues",
    certifications: "Certificats",
    contact: "Contact",
    particulars: "État civil",
    born: "Date de naissance",
    nationality: "Nationalité",
    passport: "Passeport",
    place: "Lieu de naissance",
    declaration: "Relisez chaque ligne avant de déposer ce dossier.",
    signature: "Signature",
    signPlace: "Lieu",
    signDate: "Date",
    more: "Informations complémentaires",
  },
  de: {
    profile: "Profil",
    experience: "Berufserfahrung",
    education: "Ausbildung",
    skills: "Kenntnisse",
    languages: "Sprachen",
    certifications: "Zertifikate",
    contact: "Kontakt",
    particulars: "Persönliche Angaben",
    born: "Geburtsdatum",
    nationality: "Staatsangehörigkeit",
    passport: "Reisepass",
    place: "Geburtsort",
    declaration: "Prüfen Sie jede Zeile, bevor Sie das Formular einreichen.",
    signature: "Unterschrift",
    signPlace: "Ort",
    signDate: "Datum",
    more: "Weitere Angaben",
  },
  es: {
    profile: "Perfil",
    experience: "Experiencia",
    education: "Formación",
    skills: "Competencias",
    languages: "Idiomas",
    certifications: "Certificaciones",
    contact: "Contacto",
    particulars: "Datos personales",
    born: "Fecha de nacimiento",
    nationality: "Nacionalidad",
    passport: "Pasaporte",
    place: "Lugar de nacimiento",
    declaration: "Revise cada línea antes de presentar este formulario.",
    signature: "Firma",
    signPlace: "Lugar",
    signDate: "Fecha",
    more: "Más datos",
  },
};

export const TEMPLATES: { id: TemplateId; label: string; hint: string }[] = [
  {
    id: "meridian",
    label: "International CV",
    hint: "International two-column curriculum vitae",
  },
  {
    id: "consulate",
    label: "Particulars",
    hint: "Consular-style personal particulars",
  },
  {
    id: "atlas",
    label: "Atlas résumé",
    hint: "Compact one-column résumé, no personal particulars",
  },
];

export const COUNTRIES = [
  "Argentina",
  "Australia",
  "Austria",
  "Belgium",
  "Brazil",
  "Canada",
  "Chile",
  "China",
  "Colombia",
  "Croatia",
  "Czechia",
  "Denmark",
  "Egypt",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Hungary",
  "India",
  "Indonesia",
  "Ireland",
  "Israel",
  "Italy",
  "Japan",
  "Jordan",
  "Kenya",
  "Lebanon",
  "Malaysia",
  "Mexico",
  "Morocco",
  "Netherlands",
  "New Zealand",
  "Nigeria",
  "Norway",
  "Pakistan",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Romania",
  "Saudi Arabia",
  "Singapore",
  "South Africa",
  "South Korea",
  "Spain",
  "Sweden",
  "Switzerland",
  "Thailand",
  "Turkey",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Vietnam",
];

export const CALLING_CODES: { code: string; label: string }[] = [
  { code: "+1", label: "+1 United States / Canada" },
  { code: "+20", label: "+20 Egypt" },
  { code: "+27", label: "+27 South Africa" },
  { code: "+30", label: "+30 Greece" },
  { code: "+31", label: "+31 Netherlands" },
  { code: "+32", label: "+32 Belgium" },
  { code: "+33", label: "+33 France" },
  { code: "+34", label: "+34 Spain" },
  { code: "+39", label: "+39 Italy" },
  { code: "+41", label: "+41 Switzerland" },
  { code: "+43", label: "+43 Austria" },
  { code: "+44", label: "+44 United Kingdom" },
  { code: "+45", label: "+45 Denmark" },
  { code: "+46", label: "+46 Sweden" },
  { code: "+47", label: "+47 Norway" },
  { code: "+48", label: "+48 Poland" },
  { code: "+49", label: "+49 Germany" },
  { code: "+51", label: "+51 Peru" },
  { code: "+52", label: "+52 Mexico" },
  { code: "+54", label: "+54 Argentina" },
  { code: "+55", label: "+55 Brazil" },
  { code: "+56", label: "+56 Chile" },
  { code: "+57", label: "+57 Colombia" },
  { code: "+60", label: "+60 Malaysia" },
  { code: "+61", label: "+61 Australia" },
  { code: "+62", label: "+62 Indonesia" },
  { code: "+63", label: "+63 Philippines" },
  { code: "+65", label: "+65 Singapore" },
  { code: "+66", label: "+66 Thailand" },
  { code: "+81", label: "+81 Japan" },
  { code: "+82", label: "+82 South Korea" },
  { code: "+84", label: "+84 Vietnam" },
  { code: "+86", label: "+86 China" },
  { code: "+90", label: "+90 Turkey" },
  { code: "+91", label: "+91 India" },
  { code: "+92", label: "+92 Pakistan" },
  { code: "+212", label: "+212 Morocco" },
  { code: "+234", label: "+234 Nigeria" },
  { code: "+254", label: "+254 Kenya" },
  { code: "+351", label: "+351 Portugal" },
  { code: "+353", label: "+353 Ireland" },
  { code: "+358", label: "+358 Finland" },
  { code: "+380", label: "+380 Ukraine" },
  { code: "+420", label: "+420 Czechia" },
  { code: "+880", label: "+880 Bangladesh" },
  { code: "+961", label: "+961 Lebanon" },
  { code: "+962", label: "+962 Jordan" },
  { code: "+966", label: "+966 Saudi Arabia" },
  { code: "+971", label: "+971 United Arab Emirates" },
  { code: "+972", label: "+972 Israel" },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function emptyPersonal(): Personal {
  return {
    givenName: "",
    familyName: "",
    headline: "",
    email: "",
    phoneCode: "+91",
    phone: "",
    street: "",
    postalCode: "",
    city: "",
    region: "",
    country: "",
    nationality: "",
    dateOfBirth: "",
    placeOfBirth: "",
    passportNumber: "",
    linkedin: "",
    website: "",
    summary: "",
    photo: "",
    fatherName: "",
    motherName: "",
    maritalStatus: "",
    spouseName: "",
    eyeColour: "",
    hairColour: "",
    merit: "",
    hobbies: "",
    sex: "",
    surnameAtBirth: "",
    nationalityAtBirth: "",
    otherNationalities: "",
    nationalId: "",
    positionApplied: "",
    passportType: "",
    passportIssuedOn: "",
    passportExpires: "",
    passportIssuedBy: "",
    passportIssuedCity: "",
    passportEndorsement: "",
    passportLost: "",
    oldPassport: "",
    drivingLicence: "",
    digitalSkills: "",
    projects: "",
    publications: "",
    volunteering: "",
    memberships: "",
    referencesNote: "",
    guardian: "",
    visaPurpose: "",
    destination: "",
    entryDate: "",
    exitDate: "",
    accommodation: "",
    sponsor: "",
    previousVisa: "",
    signature: "",
    signaturePlace: "",
    signatureDate: "",
    customDetails: [],
  };
}

export function emptyProfile(): Profile {
  return {
    personal: emptyPersonal(),
    experience: [],
    education: [],
    skills: [],
    languages: [],
    certifications: [],
    children: [],
    travel: [],
  };
}

export function defaultSettings(): Settings {
  return {
    template: "meridian",
    locale: "en",
    dateStyle: "dmy",
    nameOrder: "given-family",
    paper: "a4",
  };
}

export function emptyExperience(): Experience {
  return {
    id: uid(),
    title: "",
    organization: "",
    location: "",
    start: "",
    end: "",
    current: false,
    summary: "",
  };
}

export function emptyChild(): Child {
  return { id: uid(), name: "", dateOfBirth: "", gender: "" };
}

export function emptyTrip(): Trip {
  return { id: uid(), country: "", from: "", to: "", purpose: "" };
}

export function lifeLines(profile: Profile, settings: Settings, mode: "cv" | "full"): [string, string][] {
  const personal = profile.personal;
  const when = (value: string) => formatWhen(value, settings.dateStyle) || value;
  const cvRows: [string, string][] = [
    ["Position applied for", personal.positionApplied],
    ["Digital skills", personal.digitalSkills],
    ["Projects", personal.projects],
    ["Publications", personal.publications],
    ["Volunteering", personal.volunteering],
    ["Memberships", personal.memberships],
    ["Driving licence", personal.drivingLicence],
    ["References", personal.referencesNote],
    ["Merit", personal.merit],
    ["Hobbies", personal.hobbies],
  ];
  const rows: [string, string][] =
    mode === "cv"
      ? cvRows
      : [
          ["Sex", personal.sex],
          ["Surname at birth", personal.surnameAtBirth],
          ["Nationality at birth", personal.nationalityAtBirth],
          ["Other nationalities", personal.otherNationalities],
          ["National ID", personal.nationalId],
          ["Marital status", personal.maritalStatus],
          ["Father", personal.fatherName],
          ["Mother", personal.motherName],
          ["Spouse", personal.spouseName],
          ["Guardian", personal.guardian],
          ["Eye colour", personal.eyeColour],
          ["Hair colour", personal.hairColour],
          ["Passport type", personal.passportType],
          ["Passport number", personal.passportNumber],
          ["Old passport", personal.oldPassport],
          ["Passport issued", when(personal.passportIssuedOn)],
          ["Passport expires", when(personal.passportExpires)],
          ["Issued by", [personal.passportIssuedBy, personal.passportIssuedCity].filter(Boolean).join(", ")],
          ["Endorsement", personal.passportEndorsement],
          ["Passport lost or stolen", personal.passportLost],
          ["Purpose of travel", personal.visaPurpose],
          ["Destination", personal.destination],
          ["Entry", when(personal.entryDate)],
          ["Exit", when(personal.exitDate)],
          ["Accommodation", personal.accommodation],
          ["Costs paid by", personal.sponsor],
          ["Previous visa", personal.previousVisa],
          ...cvRows,
        ];
  if (mode === "full") {
    for (const child of profile.children) {
      const value = [child.name, child.gender, formatWhen(child.dateOfBirth, settings.dateStyle)].filter(Boolean).join(" · ");
      if (value) rows.push(["Child", value]);
    }
    for (const trip of profile.travel) {
      const value = [trip.country, [trip.from, trip.to].filter(Boolean).join(" – "), trip.purpose].filter(Boolean).join(" · ");
      if (value) rows.push(["Past travel", value]);
    }
  }
  for (const item of cleanCustomDetails(personal.customDetails)) rows.push([item.label, item.value]);
  return rows.filter(([, value]) => value.trim());
}

/** Untrusted-safe view of custom details: only rows with a label and a value. */
export function cleanCustomDetails(raw: unknown): CustomDetail[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const { id, label, value } = item as Record<string, unknown>;
    if (typeof label !== "string" || typeof value !== "string") return [];
    if (!label.trim() || !value.trim()) return [];
    return [{ id: typeof id === "string" ? id : uid(), label: label.trim().slice(0, 120), value: value.trim().slice(0, 2000) }];
  });
}

export function emptyEducation(): Education {
  return {
    id: uid(),
    institution: "",
    qualification: "",
    field: "",
    location: "",
    start: "",
    end: "",
    details: "",
  };
}

export function splitDisplayName(full: string, order: NameOrder): { givenName: string; familyName: string } {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { givenName: "", familyName: "" };
  if (parts.length === 1) {
    return order === "family-given"
      ? { givenName: "", familyName: parts[0] ?? "" }
      : { givenName: parts[0] ?? "", familyName: "" };
  }
  if (order === "family-given") {
    return { familyName: parts[0] ?? "", givenName: parts.slice(1).join(" ") };
  }
  const particles = new Set(["el", "al", "de", "del", "da", "di", "van", "von", "bin", "ibn"]);
  let index = parts.length - 1;
  while (index > 1 && particles.has((parts[index - 1] ?? "").toLowerCase())) index -= 1;
  return { givenName: parts.slice(0, index).join(" "), familyName: parts.slice(index).join(" ") };
}

export function displayName(personal: Personal, order: NameOrder): string {
  const given = personal.givenName.trim();
  const family = personal.familyName.trim();
  const parts = order === "family-given" ? [family, given] : [given, family];
  return parts.filter(Boolean).join(" ");
}

export function phoneLine(personal: Personal): string {
  return [personal.phoneCode, personal.phone].filter(Boolean).join(" ").trim();
}

export function placeLine(personal: Personal): string {
  return [personal.city, personal.country].filter(Boolean).join(", ");
}

export function addressLines(personal: Personal): string[] {
  const street = [personal.street, personal.postalCode].filter(Boolean).join(", ");
  const city = [personal.city, personal.region, personal.country].filter(Boolean).join(", ");
  return [street, city].filter(Boolean);
}

export function presentLabel(locale: Locale): string {
  if (locale === "fr") return "Aujourd'hui";
  if (locale === "de") return "Heute";
  if (locale === "es") return "Actualidad";
  return "Present";
}

export function formatWhen(value: string, style: DateStyle): string {
  const raw = value.trim();
  if (!raw) return "";
  const full = /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw);
  const month = /^(\d{4})-(\d{2})$/.exec(raw);
  const year = /^(\d{4})$/.exec(raw);
  if (year) return year[1];
  const y = full?.[1] ?? month?.[1];
  const m = full?.[2] ?? month?.[2];
  if (!y || !m) return raw;
  const label = MONTHS[Number(m) - 1];
  if (!label) return raw;
  if (style === "iso") return full ? `${y}-${m}-${full[2]}` : `${y}-${m}`;
  if (full) {
    const d = Number(full[3]);
    if (style === "mdy") return `${label} ${d}, ${y}`;
    return `${d} ${label} ${y}`;
  }
  return `${label} ${y}`;
}

export function formatSpan(
  start: string,
  end: string,
  current: boolean,
  settings: Settings,
): string {
  const a = formatWhen(start, settings.dateStyle);
  const b = current ? presentLabel(settings.locale) : formatWhen(end, settings.dateStyle);
  if (a && b) return `${a} – ${b}`;
  return a || b;
}

export function degreeLine(item: Education): string {
  return [item.qualification, item.field].filter(Boolean).join(" ");
}

export function dossierCode(profile: Profile): string {
  const seed = `${profile.personal.familyName}|${profile.personal.dateOfBirth}|${profile.personal.givenName}`;
  let hash = 0;
  for (const char of seed) hash = (hash * 33 + char.charCodeAt(0)) >>> 0;
  return `M-${(hash % 900000) + 100000}`;
}

export function fileBase(profile: Profile, settings: Settings): string {
  const name = displayName(profile.personal, settings.nameOrder)
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "");
  const kind =
    settings.template === "consulate" ? "particulars" : settings.template === "atlas" ? "resume" : "cv";
  return `${name || "CV-Studio"}-${kind}`;
}

export function summaryLines(summary: string): string[] {
  return summary
    .split(/\n+/)
    .map((line) => line.replace(/^([•·*\-–]|\d+[.)])\s+/, "").trim())
    .filter(Boolean);
}

export const sampleProfile = (): Profile => ({
  personal: {
    givenName: "Amira",
    familyName: "El-Sayed",
    headline: "Climate policy advisor",
    email: "amira.elsayed@example.com",
    phoneCode: "+41",
    phone: "22 555 0148",
    street: "14 Rue de la Servette",
    postalCode: "1201",
    city: "Geneva",
    region: "Geneva",
    country: "Switzerland",
    nationality: "Egyptian",
    dateOfBirth: "1991-04-17",
    placeOfBirth: "Cairo, Egypt",
    passportNumber: "X0000000",
    linkedin: "linkedin.com/in/amira-elsayed",
    website: "amira.example.org",
    summary:
      "Advisor helping cities finance resilient power grids. Twelve years across Cairo, Nairobi, and Geneva, working in Arabic, English, and French.",
    photo: "",
    fatherName: "Hassan El-Sayed",
    motherName: "Nadia El-Sayed",
    maritalStatus: "Married",
    spouseName: "Yusuf El-Sayed",
    eyeColour: "Brown",
    hairColour: "Black",
    merit: "Distinction, MSc Environmental Policy",
    hobbies: "City walking, Arabic calligraphy",
    sex: "",
    surnameAtBirth: "",
    nationalityAtBirth: "",
    otherNationalities: "",
    nationalId: "",
    positionApplied: "",
    passportType: "",
    passportIssuedOn: "",
    passportExpires: "",
    passportIssuedBy: "",
    passportIssuedCity: "",
    passportEndorsement: "",
    passportLost: "",
    oldPassport: "",
    drivingLicence: "",
    digitalSkills: "",
    projects: "",
    publications: "",
    volunteering: "",
    memberships: "",
    referencesNote: "",
    guardian: "",
    visaPurpose: "",
    destination: "",
    entryDate: "",
    exitDate: "",
    accommodation: "",
    sponsor: "",
    previousVisa: "",
    signature: "",
    signaturePlace: "",
    signatureDate: "",
    customDetails: [],
  },
  experience: [
    {
      id: "exp-helios",
      title: "Senior Policy Advisor",
      organization: "Helios Compact",
      location: "Geneva, Switzerland",
      start: "2021-03",
      end: "",
      current: true,
      summary:
        "Structured a $240m municipal guarantee for distributed solar.\nNegotiated offtake language now used by six city utilities.",
    },
    {
      id: "exp-nile",
      title: "Programme Lead",
      organization: "Nile Grid Cooperative",
      location: "Cairo, Egypt",
      start: "2016-06",
      end: "2021-02",
      current: false,
      summary:
        "Built a bilingual tariff clinic serving 14,000 households.\nPublished the cooperative's first open loss-audit.",
    },
  ],
  education: [
    {
      id: "ed-gi",
      institution: "Graduate Institute",
      qualification: "MSc",
      field: "Environmental Policy",
      location: "Geneva, Switzerland",
      start: "2014",
      end: "2016",
      details: "Thesis on cross-border power pools.",
    },
    {
      id: "ed-cu",
      institution: "Cairo University",
      qualification: "BSc",
      field: "Electrical Engineering",
      location: "Cairo, Egypt",
      start: "2009",
      end: "2013",
      details: "",
    },
  ],
  skills: [
    "Power markets",
    "Climate finance",
    "Tariff design",
    "Stakeholder mapping",
    "Arabic–French negotiation",
  ],
  languages: [
    { id: "lang-ar", name: "Arabic", level: "Native" },
    { id: "lang-en", name: "English", level: "C2" },
    { id: "lang-fr", name: "French", level: "C1" },
    { id: "lang-de", name: "German", level: "B1" },
  ],
  certifications: [
    { id: "cert-esg", name: "CFA ESG Certificate", issuer: "CFA Institute", year: "2022" },
  ],
  children: [{ id: "child-leila", name: "Leila El-Sayed", dateOfBirth: "2018-06-02", gender: "Daughter" }],
  travel: [{ id: "trip-ke", country: "Kenya", from: "2019", to: "2019", purpose: "Work" }],
});

export const SAMPLE_CV = `AMIRA EL-SAYED
Climate Policy Advisor
Geneva, Switzerland · amira.elsayed@example.com · +41 22 555 0148
linkedin.com/in/amira-elsayed · amira.example.org

SUMMARY
Advisor helping cities finance resilient power grids. Twelve years across Cairo, Nairobi, and Geneva.

EXPERIENCE
Senior Policy Advisor — Helios Compact
Geneva, Switzerland
Mar 2021 – Present
- Structured a $240m municipal guarantee for distributed solar.
- Negotiated offtake language used by six city utilities.

Programme Lead — Nile Grid Cooperative
Cairo, Egypt
Jun 2016 – Feb 2021
- Built a bilingual tariff clinic serving 14,000 households.
- Published the cooperative's first open loss-audit.

EDUCATION
MSc Environmental Policy — Graduate Institute
Geneva, Switzerland
2014 – 2016
Thesis on cross-border power pools.

BSc Electrical Engineering — Cairo University
Cairo, Egypt
2009 – 2013

SKILLS
Power markets, Climate finance, Arabic–French negotiation, Stakeholder mapping, Tariff design

LANGUAGES
Arabic — Native
English — C2
French — C1
German — B1

CERTIFICATIONS
CFA ESG Certificate — CFA Institute — 2022
`;

export const SAMPLE_FORM = `Given name: Amira
Family name: El-Sayed
Headline: Climate policy advisor
Email: amira.elsayed@example.com
Phone: +41 22 555 0148
Street: 14 Rue de la Servette
Postal code: 1201
City: Geneva
Region: Geneva
Country: Switzerland
Nationality: Egyptian
Date of birth: 1991-04-17
Place of birth: Cairo, Egypt
Passport: X0000000
LinkedIn: linkedin.com/in/amira-elsayed
Website: amira.example.org
Summary: Advisor helping cities finance resilient power grids.
`;
