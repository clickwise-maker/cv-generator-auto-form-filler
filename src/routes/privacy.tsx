import { tr } from "@/lib/i18n/i18n";
import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site-footer";
import { RETENTION_DAYS, SUPPORT_EMAIL } from "@/lib/privacy/consent";

type Sec = [string, string[]];

// i18n-data:start
const EN: Sec[] = [
  ["Who we are", [`CV Studio ("we") is a CV builder and form-filling tool. Contact / Grievance Officer: {email} (we aim to reply within 2 working days).`]],
  ["Data we collect", [
    "CV editor: the details you type or upload (name, contact details, date of birth, address, ID/passport numbers if you enter them, education, experience, skills, photo).",
    "Plan & usage: an anonymous guest id, your plan key, download/form-fill counts and the company names you fill forms for.",
    "Business (Commercial) clients: details a client submits through a share link, the time of consent and submission.",
    "Payments are processed by the payment provider; we do not store card numbers.",
  ]],
  ["Purpose", ["Only to build your CV and fill your forms, and to count plan usage. We do not sell your data or use your CV data for profiling. Ads, if switched on, appear only on content pages and may use Google advertising cookies (see the full privacy policy). CV Studio has no interest in your data beyond this purpose."]],
  ["Consent", ["We ask before storing your data, with an unticked box. You can withdraw consent at any time with “Withdraw consent & delete my data” (editor and dashboard) or “Withdraw consent” on a client link page. Withdrawing is as easy as giving consent."]],
  ["Where it is stored", [
    "Your CVs and drafts are stored in your own browser (localStorage) on your device. They are not uploaded unless you use a feature that needs the server (e.g. reading a document, checkout).",
    "Client submissions and plan records are stored on our server (hosted on Render). Encryption at rest of these records is planned as part of a database migration and is not yet complete.",
  ]],
  ["Retention", [
    "Browser data: kept until you delete it (withdraw consent, or clear site data).",
    `Client submissions: automatically deleted after {days} days, or earlier when the client or the business deletes them.`,
  ]],
  ["Your rights", ["You may ask to access, correct or erase your data, withdraw consent, nominate another person, and raise a grievance. Email us; if you are not satisfied with our response you may approach the Data Protection Board of India."]],
  ["Data breaches", ["If a personal data breach occurs, we will inform affected users and the Data Protection Board of India without delay, and aim to do so within 72 hours of becoming aware of it."]],
  ["Note", ["This notice describes our practices in plain language. It is not legal advice."]],
];
// i18n-data:end



export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy notice (DPDP) · CV Studio" },
      { name: "description", content: "CV Studio privacy notice in English and Hindi: data collected, purpose, storage, retention, your rights, grievance contact." },
    ],
  }),
  component: PrivacyPage,
});

function Block({ secs }: { secs: Sec[] }) {
  return (
    <div className="space-y-4">
      {secs.map(([h, ps]) => (
        <section key={h}>
          <h2 className="font-serif text-lg text-forest">{tr(h)}</h2>
          {ps.map((p) => (
            <p key={p} className="mt-1 text-sm leading-relaxed">{tr(p, { email: SUPPORT_EMAIL, days: RETENTION_DAYS })}</p>
          ))}
        </section>
      ))}
    </div>
  );
}

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-line px-4 py-3">
        <a href="/" className="font-serif text-lg">{tr("CV Studio")}</a>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-6" data-testid="privacy-page">
        <h1 className="font-serif text-3xl text-forest">{tr("Privacy notice")}</h1>
        <p className="mt-1 text-xs text-muted">{tr("Last updated: 27 October 2026 · Digital Personal Data Protection Act, 2023 (India)")}</p>
        <div className="mt-6">
          <Block secs={EN} />
        </div>
        <p className="mt-8 text-sm">
          {tr("Contact")} <a className="underline" href={`mailto:{email}`}>{SUPPORT_EMAIL}</a> · <a className="underline" href="/privacy-policy">{tr("Full privacy policy")}</a>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
