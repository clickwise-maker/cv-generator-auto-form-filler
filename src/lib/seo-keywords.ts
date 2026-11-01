/**
 * SEO keyword data (research 2026-11-01, Google autocomplete across en-US/GB/IN/AU/CA + hi-IN).
 * No search volumes: "regions" = number of the 6 locales where the phrase appeared in autocomplete.
 * Full research: docs/seo/KEYWORDS.md
 */
export const SITE_URL = "https://formzalo.com";

export const SEO_TITLE = "Free CV Maker & Auto Form Filler | formzolo";
export const SEO_DESCRIPTION =
  "formzolo: free online CV maker and resume builder with simple, ATS-friendly templates. Reuse your profile to fill job and legal forms, then sign in free and download your CV as PDF or Word.";

export const PRIMARY_KEYWORDS = [
  "free cv maker", "cv maker online free", "free cv generator", "resume builder free",
  "online resume builder", "ats resume builder", "ats friendly cv template",
  "cv template free download", "resume for freshers", "cv format for job",
  "auto form filler", "online form filler", "job application form", "cover letter generator",
];

export const META_KEYWORDS = [
  "free CV maker", "free CV generator", "resume builder", "ATS resume", "CV template",
  "resume for freshers", "CV format pdf word", "auto form filler", "online form filler", "legal form filling for advocates",
  "job application form autofill", "cover letter generator",
].join(", ");

export type KeywordGroup = { group: string; covered: boolean; keywords: { kw: string; regions: number }[] };

export const KEYWORD_GROUPS: KeywordGroup[] = [
  { group: "CV maker / generator", covered: true, keywords: [
    { kw: "cv maker", regions: 6 }, { kw: "cv maker free", regions: 6 }, { kw: "cv maker online free", regions: 6 },
    { kw: "cv maker ai", regions: 6 }, { kw: "cv maker app", regions: 6 }, { kw: "cv maker free download", regions: 6 },
    { kw: "cv generator free", regions: 5 }, { kw: "cv generator ai free", regions: 5 }, { kw: "free cv generator no payment", regions: 4 },
    { kw: "free cv generator from linkedin", regions: 4 }, { kw: "free curriculum vitae generator", regions: 4 } ] },
  { group: "Resume builder", covered: false, keywords: [
    { kw: "resume builder", regions: 6 }, { kw: "resume builder free", regions: 6 }, { kw: "resume builder ai free", regions: 6 },
    { kw: "resume builder free download", regions: 6 }, { kw: "resume builder online free", regions: 5 },
    { kw: "resume maker free download pdf", regions: 5 }, { kw: "resume maker free no sign up", regions: 3 },
    { kw: "resume builder for students", regions: 3 } ] },
  { group: "ATS", covered: true, keywords: [
    { kw: "ats resume", regions: 6 }, { kw: "ats resume checker", regions: 6 }, { kw: "ats resume template", regions: 6 },
    { kw: "ats resume builder", regions: 6 }, { kw: "ats resume score", regions: 6 }, { kw: "ats resume meaning", regions: 6 },
    { kw: "ats resume format", regions: 4 }, { kw: "ats resume full form", regions: 3 } ] },
  { group: "Templates / format", covered: true, keywords: [
    { kw: "cv template free", regions: 6 }, { kw: "cv template word", regions: 6 }, { kw: "cv template free download", regions: 6 },
    { kw: "cv format for job", regions: 6 }, { kw: "cv format pdf or word", regions: 5 }, { kw: "cv template google docs", regions: 4 },
    { kw: "cv format for freshers", regions: 3 } ] },
  { group: "Freshers", covered: true, keywords: [
    { kw: "resume for freshers", regions: 6 }, { kw: "resume for freshers with no experience", regions: 6 },
    { kw: "resume for freshers format", regions: 6 }, { kw: "resume for freshers pdf", regions: 6 },
    { kw: "resume for freshers in word format", regions: 6 }, { kw: "resume maker free for freshers", regions: 5 } ] },
  { group: "Cover letter", covered: true, keywords: [
    { kw: "cover letter generator", regions: 5 }, { kw: "cover letter generator free", regions: 5 },
    { kw: "cover letter generator from resume", regions: 5 }, { kw: "cover letter generator from job description", regions: 5 },
    { kw: "cover letter generator free no sign up", regions: 5 } ] },
  { group: "Form filling", covered: true, keywords: [
    { kw: "auto form filler", regions: 6 }, { kw: "ai form filler", regions: 6 }, { kw: "ai form filler free online", regions: 6 },
    { kw: "ai form filler pdf", regions: 6 }, { kw: "auto form filler chrome extension", regions: 6 },
    { kw: "online form filler", regions: 5 }, { kw: "how to autofill forms", regions: 5 },
    { kw: "job application form", regions: 5 }, { kw: "job application form online", regions: 4 }, { kw: "job application form pdf", regions: 5 } ] },
];
