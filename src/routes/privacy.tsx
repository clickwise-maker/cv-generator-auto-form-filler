import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site-footer";
import { RETENTION_DAYS, SUPPORT_EMAIL } from "@/lib/privacy/consent";

type Sec = [string, string[]];

const EN: Sec[] = [
  ["Who we are", [`CV Studio ("we") is a CV builder and form-filling tool. Contact / Grievance Officer: ${SUPPORT_EMAIL} (we aim to reply within 2 working days).`]],
  ["Data we collect", [
    "CV editor: the details you type or upload (name, contact details, date of birth, address, ID/passport numbers if you enter them, education, experience, skills, photo).",
    "Plan & usage: an anonymous guest id, your plan key, download/form-fill counts and the company names you fill forms for.",
    "Business (Commercial) clients: details a client submits through a share link, the time of consent and submission.",
    "Payments are processed by the payment provider; we do not store card numbers.",
  ]],
  ["Purpose", ["Only to build your CV and fill your forms, and to count plan usage. We do not sell your data, show ads, or use it for profiling. CV Studio has no interest in your data beyond this purpose."]],
  ["Consent", ["We ask before storing your data, with an unticked box. You can withdraw consent at any time with “Withdraw consent & delete my data” (editor and dashboard) or “Withdraw consent” on a client link page. Withdrawing is as easy as giving consent."]],
  ["Where it is stored", [
    "Your CVs and drafts are stored in your own browser (localStorage) on your device. They are not uploaded unless you use a feature that needs the server (e.g. reading a document, checkout).",
    "Client submissions and plan records are stored on our server (hosted on Render). Encryption at rest of these records is planned as part of a database migration and is not yet complete.",
  ]],
  ["Retention", [
    "Browser data: kept until you delete it (withdraw consent, or clear site data).",
    `Client submissions: automatically deleted after ${RETENTION_DAYS} days, or earlier when the client or the business deletes them.`,
  ]],
  ["Your rights", ["You may ask to access, correct or erase your data, withdraw consent, nominate another person, and raise a grievance. Email us; if you are not satisfied with our response you may approach the Data Protection Board of India."]],
  ["Data breaches", ["If a personal data breach occurs, we will inform affected users and the Data Protection Board of India without delay, and aim to do so within 72 hours of becoming aware of it."]],
  ["Note", ["This notice describes our practices in plain language. It is not legal advice."]],
];

const HI: Sec[] = [
  ["हम कौन हैं", [`CV Studio एक CV बनाने और फ़ॉर्म भरने का टूल है। संपर्क / शिकायत अधिकारी: ${SUPPORT_EMAIL}`]],
  ["हम कौन सा डेटा लेते हैं", ["CV संपादक में आपके द्वारा दर्ज विवरण (नाम, संपर्क, जन्मतिथि, पता, पहचान/पासपोर्ट संख्या यदि दर्ज करें, शिक्षा, अनुभव, फ़ोटो); प्लान व उपयोग की गिनती; व्यवसायों के ग्राहकों द्वारा शेयर लिंक से भेजा गया विवरण। कार्ड नंबर हम संग्रहीत नहीं करते।"]],
  ["उद्देश्य", ["केवल आपका CV बनाने और फ़ॉर्म भरने के लिए। हम डेटा नहीं बेचते, विज्ञापन नहीं दिखाते। CV Studio को इसके अलावा आपके डेटा में कोई रुचि नहीं है।"]],
  ["सहमति", ["डेटा संग्रहीत करने से पहले हम बिना-टिक वाले बॉक्स से सहमति माँगते हैं। आप कभी भी “सहमति वापस लें व डेटा हटाएँ” से सहमति वापस ले सकते हैं।"]],
  ["संग्रहण", ["आपके CV आपके ब्राउज़र में रहते हैं। ग्राहक विवरण और प्लान रिकॉर्ड हमारे सर्वर (Render) पर रहते हैं; इनका एन्क्रिप्शन-एट-रेस्ट अभी लंबित है।"]],
  ["अवधि", [`ब्राउज़र डेटा: जब तक आप हटाएँ। ग्राहक विवरण: ${RETENTION_DAYS} दिन बाद स्वतः हटाया जाता है, या अनुरोध पर पहले।`]],
  ["आपके अधिकार", ["पहुँच, सुधार, मिटाने, सहमति वापस लेने, नामांकन और शिकायत का अधिकार। हमें ईमेल करें; संतुष्ट न हों तो भारत के डेटा संरक्षण बोर्ड से संपर्क कर सकते हैं।"]],
  ["डेटा उल्लंघन", ["डेटा उल्लंघन होने पर हम प्रभावित उपयोगकर्ताओं और डेटा संरक्षण बोर्ड को बिना देरी, 72 घंटे के भीतर सूचित करने का प्रयास करेंगे।"]],
  ["नोट", ["यह सूचना सरल भाषा में हमारी प्रक्रियाएँ बताती है; यह कानूनी सलाह नहीं है।"]],
];

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy notice (DPDP) · CV Studio" },
      { name: "description", content: "CV Studio privacy notice in English and Hindi: data collected, purpose, storage, retention, your rights, grievance contact." },
    ],
  }),
  component: PrivacyPage,
});

function Block({ secs, lang }: { secs: Sec[]; lang: string }) {
  return (
    <div lang={lang} className="space-y-4">
      {secs.map(([h, ps]) => (
        <section key={h}>
          <h2 className="font-serif text-lg text-forest">{h}</h2>
          {ps.map((p) => (
            <p key={p} className="mt-1 text-sm leading-relaxed">{p}</p>
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
        <a href="/" className="font-serif text-lg">CV Studio</a>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-6" data-testid="privacy-page">
        <h1 className="font-serif text-3xl text-forest">Privacy notice / गोपनीयता सूचना</h1>
        <p className="mt-1 text-xs text-muted">Last updated: 27 October 2026 · Digital Personal Data Protection Act, 2023 (India)</p>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <Block secs={EN} lang="en" />
          <Block secs={HI} lang="hi" />
        </div>
        <p className="mt-8 text-sm">
          Contact / संपर्क: <a className="underline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> · <a className="underline" href="/privacy-policy">Full privacy policy</a>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
