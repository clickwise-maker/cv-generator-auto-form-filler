import type { Personal } from "@/lib/cv/model";

/**
 * Single registry of how each CV profile field relates to the form filler.
 *
 * - "used":   the reader (src/lib/cv/parse.ts → KV + personalProposals) can map it onto a form.
 * - "extra":  optional/international field (editor "International options" panel); never mapped
 *             automatically, offered in the collapsed "More details (optional)" section.
 * - "unused": never read by the form filler (photo, passport book details); hidden in Form Filler mode.
 *
 * `detect` matches a form label (with or without a value) so an uploaded form tells us which
 * fields it actually asks for.
 */
export type FormUsage = "used" | "extra" | "unused";
export type FieldInput = "text" | "date" | "email" | "tel" | "area" | "signature";

export type FormFieldDef = {
  key: keyof Personal;
  usage: FormUsage;
  en: string;
  hi: string;
  input?: FieldInput;
  detect?: RegExp;
};

const L = (words: string) => new RegExp(`^\\s*(?:${words})\\s*(?:[:\\-–]|$)`, "im");

export const FORM_FIELDS: FormFieldDef[] = [
  // used — mapped by parse.ts KV (lines 411-430) and personalProposals (548-567)
  { key: "givenName", usage: "used", en: "Given name", hi: "पहला नाम", detect: L("first name|given names?|prénom|prenom|vorname|nombre de pila|full name|name|applicant name|customer name") },
  { key: "familyName", usage: "used", en: "Family name", hi: "उपनाम", detect: L("last name|family name|surname|nom de famille|nachname|apellidos?|full name|name|applicant name|customer name") },
  { key: "headline", usage: "used", en: "Occupation / headline", hi: "पेशा / शीर्षक", detect: L("headline|title|occupation|job title|poste|beruf|profesi[oó]n") },
  { key: "email", usage: "used", en: "Email", hi: "ईमेल", input: "email", detect: L("e-?mail(?: address)?|courriel|correo") },
  { key: "phoneCode", usage: "used", en: "Calling code", hi: "देश कोड", detect: L("(?:phone|telephone|mobile|cell|whatsapp)(?: number| no\\.?)?") },
  { key: "phone", usage: "used", en: "Phone", hi: "फ़ोन", input: "tel", detect: L("(?:phone|telephone|téléphone|telefon|teléfono|mobile|cell|whatsapp)(?: number| no\\.?)?") },
  { key: "street", usage: "used", en: "Street / address", hi: "पता", detect: L("street|address|adresse|direcci[oó]n|stra(?:ß|ss)e") },
  { key: "postalCode", usage: "used", en: "Postal code", hi: "पिन कोड", detect: L("postal code|postcode|zip(?: code)?|pin(?: code)?|code postal|plz") },
  { key: "city", usage: "used", en: "City", hi: "शहर", detect: L("city|ville|stadt|ciudad") },
  { key: "region", usage: "used", en: "State / region", hi: "राज्य", detect: L("region|state|province|région|bundesland|canton") },
  { key: "country", usage: "used", en: "Country", hi: "देश", detect: L("country|pays|land|pa[ií]s") },
  { key: "nationality", usage: "used", en: "Nationality", hi: "राष्ट्रीयता", detect: L("nationality|nationalité|staatsangehörigkeit|nacionalidad|citizenship") },
  { key: "dateOfBirth", usage: "used", en: "Date of birth", hi: "जन्म तिथि", input: "date", detect: L("date of birth|dob|birth date|born|date de naissance|geburtsdatum|fecha de nacimiento") },
  { key: "placeOfBirth", usage: "used", en: "Place of birth", hi: "जन्म स्थान", detect: L("place of birth|birth place|lieu de naissance|geburtsort|lugar de nacimiento") },
  { key: "passportNumber", usage: "used", en: "Passport number", hi: "पासपोर्ट नंबर", detect: L("passport(?: number| no\\.?)?|passeport|reisepass|pasaporte") },
  { key: "linkedin", usage: "used", en: "LinkedIn", hi: "लिंक्डइन", detect: L("linkedin") },
  { key: "website", usage: "used", en: "Website", hi: "वेबसाइट", detect: L("website|site|web|url|portfolio") },
  { key: "summary", usage: "used", en: "Profile / summary", hi: "प्रोफ़ाइल सारांश", input: "area", detect: L("summary|profile|profil|about|résumé|resumen") },

  { key: "signature", usage: "used", en: "Signature", hi: "हस्ताक्षर", input: "signature", detect: L("(?:applicant'?s |candidate'?s )?signature(?: of (?:the )?applicant)?|sign(?:ed)?(?: here)?|unterschrift|firma|हस्ताक्षर") },

  // extra — "International options" panel (profile-form.tsx 356-518), never auto-mapped
  { key: "sex", usage: "extra", en: "Sex", hi: "लिंग", detect: L("sex|gender") },
  { key: "maritalStatus", usage: "extra", en: "Marital status", hi: "वैवाहिक स्थिति", detect: L("marital status|civil status") },
  { key: "surnameAtBirth", usage: "extra", en: "Surname at birth", hi: "जन्म के समय उपनाम", detect: L("surname at birth|maiden name|birth name") },
  { key: "nationalityAtBirth", usage: "extra", en: "Nationality at birth", hi: "जन्म के समय राष्ट्रीयता", detect: L("nationality at birth") },
  { key: "otherNationalities", usage: "extra", en: "Other nationalities", hi: "अन्य राष्ट्रीयताएँ", detect: L("other nationalit(?:y|ies)") },
  { key: "nationalId", usage: "extra", en: "National ID number", hi: "राष्ट्रीय पहचान संख्या", detect: L("national id(?: number)?|aadhaar(?: number)?|id number") },
  { key: "positionApplied", usage: "extra", en: "Position applied for", hi: "आवेदित पद", detect: L("position(?: applied for)?|post applied for") },
  { key: "drivingLicence", usage: "extra", en: "Driving licence", hi: "ड्राइविंग लाइसेंस", detect: L("driving licen[cs]e|driver'?s licen[cs]e") },
  { key: "fatherName", usage: "extra", en: "Father's name", hi: "पिता का नाम", detect: L("father(?:'s)?(?: name)?") },
  { key: "motherName", usage: "extra", en: "Mother's name", hi: "माता का नाम", detect: L("mother(?:'s)?(?: name)?") },
  { key: "spouseName", usage: "extra", en: "Spouse's name", hi: "जीवनसाथी का नाम", detect: L("spouse(?:'s)?(?: name)?|husband|wife") },
  { key: "guardian", usage: "extra", en: "Guardian", hi: "अभिभावक", detect: L("guardian") },
  { key: "eyeColour", usage: "extra", en: "Eye colour", hi: "आँखों का रंग", detect: L("eye colou?r") },
  { key: "hairColour", usage: "extra", en: "Hair colour", hi: "बालों का रंग", detect: L("hair colou?r") },
  { key: "digitalSkills", usage: "extra", en: "Digital skills", hi: "डिजिटल कौशल", input: "area", detect: L("digital skills") },
  { key: "projects", usage: "extra", en: "Projects", hi: "परियोजनाएँ", input: "area", detect: L("projects") },
  { key: "publications", usage: "extra", en: "Publications", hi: "प्रकाशन", input: "area", detect: L("publications") },
  { key: "volunteering", usage: "extra", en: "Volunteering", hi: "स्वयंसेवा", input: "area", detect: L("volunteering|volunteer work") },
  { key: "memberships", usage: "extra", en: "Memberships", hi: "सदस्यताएँ", input: "area", detect: L("memberships") },
  { key: "referencesNote", usage: "extra", en: "References", hi: "संदर्भ", input: "area", detect: L("references") },
  { key: "merit", usage: "extra", en: "Merit / award", hi: "योग्यता / पुरस्कार", detect: L("merit|awards?") },
  { key: "hobbies", usage: "extra", en: "Hobbies", hi: "शौक", detect: L("hobbies|interests") },
  { key: "visaPurpose", usage: "extra", en: "Purpose of travel", hi: "यात्रा का उद्देश्य", detect: L("purpose of (?:travel|visit)|visa purpose") },
  { key: "destination", usage: "extra", en: "Destination", hi: "गंतव्य", detect: L("destination") },
  { key: "entryDate", usage: "extra", en: "Entry date", hi: "प्रवेश तिथि", input: "date", detect: L("(?:date of )?entry(?: date)?|arrival date") },
  { key: "exitDate", usage: "extra", en: "Exit date", hi: "प्रस्थान तिथि", input: "date", detect: L("(?:date of )?exit(?: date)?|departure date") },
  { key: "accommodation", usage: "extra", en: "Accommodation", hi: "आवास", detect: L("accommodation|address in destination") },
  { key: "sponsor", usage: "extra", en: "Costs paid by", hi: "खर्च कौन देगा", detect: L("sponsor|costs paid by") },
  { key: "signaturePlace", usage: "extra", en: "Place (signature)", hi: "स्थान (हस्ताक्षर)", detect: L("place|ort|lieu|lugar|स्थान") },
  { key: "signatureDate", usage: "extra", en: "Date (signature)", hi: "दिनांक (हस्ताक्षर)", input: "date", detect: L("date|datum|fecha|दिनांक|तारीख") },
  { key: "previousVisa", usage: "extra", en: "Previous visa", hi: "पिछला वीज़ा", detect: L("previous visa") },

  // unused — editor only (Identity photo + Passport panel book details); form filler never reads them
  { key: "photo", usage: "unused", en: "Photo", hi: "फ़ोटो" },
  { key: "passportType", usage: "unused", en: "Passport type", hi: "पासपोर्ट प्रकार" },
  { key: "passportIssuedOn", usage: "unused", en: "Passport issued", hi: "पासपोर्ट जारी", input: "date" },
  { key: "passportExpires", usage: "unused", en: "Passport expires", hi: "पासपोर्ट समाप्ति", input: "date" },
  { key: "passportIssuedBy", usage: "unused", en: "Passport issuing country", hi: "जारीकर्ता देश" },
  { key: "passportIssuedCity", usage: "unused", en: "Passport issuing city", hi: "जारीकर्ता शहर" },
  { key: "passportEndorsement", usage: "unused", en: "Passport endorsement", hi: "पासपोर्ट अनुमोदन" },
  { key: "passportLost", usage: "unused", en: "Passport lost or stolen", hi: "पासपोर्ट खोया/चोरी" },
  { key: "oldPassport", usage: "unused", en: "Previous passport number", hi: "पुराना पासपोर्ट नंबर" },
];

/** List sections of the profile (not Personal keys). */
export const FORM_SECTIONS = {
  experience: "used", // parse.ts proposeFromText → "experience" proposal
  education: "used",
  skills: "used",
  languages: "used",
  certifications: "used",
  children: "extra", // never produced by parse.ts
  travel: "extra",
} as const satisfies Record<string, FormUsage>;

export function fieldsByUsage(usage: FormUsage): FormFieldDef[] {
  return FORM_FIELDS.filter((f) => f.usage === usage);
}

/** Which registry fields does this form text ask for? (labels, with or without values) */
export function detectFormFields(text: string): Array<keyof Personal> {
  const found = FORM_FIELDS.filter((f) => f.usage !== "unused" && f.detect?.test(text)).map((f) => f.key);
  return Array.from(new Set(found));
}
