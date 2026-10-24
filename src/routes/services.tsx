import { createFileRoute, Link } from "@tanstack/react-router";

const BASE = "https://cvstudio-app.onrender.com";
const EMAIL = "clickwisewholesalebazar@gmail.com";
const JSONLD = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CV Studio",
    url: "https://cvstudio-app.onrender.com/",
    email: "clickwisewholesalebazar@gmail.com",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "clickwisewholesalebazar@gmail.com",
      availableLanguage: ["English", "Hindi"],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "CV Studio",
    url: "https://cvstudio-app.onrender.com/",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Free CV builder with PDF/DOCX download and an Auto Form Filler for job applications.",
    offers: [
      {
        "@type": "Offer",
        name: "Free",
        price: "0",
        priceCurrency: "INR",
        url: "https://cvstudio-app.onrender.com/services",
      },
      {
        "@type": "Offer",
        name: "Single Use",
        price: "20",
        priceCurrency: "INR",
        url: "https://cvstudio-app.onrender.com/services",
      },
      {
        "@type": "Offer",
        name: "Career Starter (yearly)",
        price: "1000",
        priceCurrency: "INR",
        url: "https://cvstudio-app.onrender.com/services",
      },
      {
        "@type": "Offer",
        name: "Global Single Use",
        price: "1",
        priceCurrency: "USD",
        url: "https://cvstudio-app.onrender.com/services",
      },
      {
        "@type": "Offer",
        name: "Global Pro (yearly)",
        price: "29",
        priceCurrency: "USD",
        url: "https://cvstudio-app.onrender.com/services",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is CV Studio free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Creating, editing, saving and choosing templates are free with no login, and you can download a watermarked PDF/DOCX for free.",
        },
      },
      {
        "@type": "Question",
        name: "How much does a clean CV download cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "₹20 one-time (Single Use) in India or $1 (Global Single Use); each gives one clean CV download or one form fill.",
        },
      },
      {
        "@type": "Question",
        name: "What is in the Career Starter plan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "₹1,000 per year: 2 profiles, 100 CV generations and 100 form fills (up to 100 companies, counted within those fills).",
        },
      },
      {
        "@type": "Question",
        name: "What is in the Global Pro plan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "$29 per year: 300 CV generations and 300 form fills.",
        },
      },
      {
        "@type": "Question",
        name: "Am I charged if a form fill fails?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. A form-fill credit is used only on a successful fill and is refunded if the fill fails.",
        },
      },
      {
        "@type": "Question",
        name: "How do I contact support?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Email clickwisewholesalebazar@gmail.com. Requests are reviewed within 2 working days.",
        },
      },
      {
        "@type": "Question",
        name: "Is CV Studio taking payments now?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Not yet. CV Studio is in trial mode and no real payments are being taken.",
        },
      },
    ],
  },
];

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Plans — CV Studio" },
      {
        name: "description",
        content:
          "CV Studio services and plans (English & Hindi): free CV builder with no login, PDF/DOCX download, Auto Form Filler, Single Use ₹20/$1, Career Starter ₹1,000/year, Global Pro $29/year.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${BASE}/services` },
    ],
    links: [
      { rel: "canonical", href: `${BASE}/services` },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600&display=swap",
      },
    ],
    scripts: JSONLD.map((j) => ({ type: "application/ld+json", children: JSON.stringify(j) })),
  }),
  component: Services,
});

type Row = (string | boolean)[];
type Lang = {
  heading: string;
  trial: string;
  best: string;
  s1: string;
  i1: string[];
  ff: string;
  s2: string;
  i2pre: string;
  i2: string[];
  s3: string;
  launch: string;
  note3: string;
  s4: string;
  note4: string;
  comp: string;
  s5: string;
  about: string[];
  refund: string;
  back: string;
};
const D: {
  L: Record<string, Lang>;
  PLANS_HDR: Record<string, string[]>;
  PLANS: Record<string, Row[]>;
  SAV_HDR: Record<string, string[]>;
  SAV: Record<string, Row[]>;
} = {
  L: {
    en: {
      heading: "Services & Plans",
      trial: "Note: CV Studio is currently in trial mode. No real payments are being taken yet.",
      best: "Best value",
      s1: "1. What CV Studio does",
      i1: [
        "A free CV builder: creating, editing, saving and choosing templates are all free, with no login needed.",
        "Plain and designed CV templates.",
        "Download as PDF or DOCX (Word).",
        "Free watermarked download, so you can see exactly what you get before paying.",
        "Auto Form Filler: fills job application forms from your CV. A form-fill credit is used only when a fill succeeds, and is refunded if the fill fails.",
        "Dashboard: CVs made, CVs in progress, remaining balance, form fills used and companies applied to.",
      ],
      s2: "2. Support",
      i2pre: "Email support: ",
      i2: ["We review support requests within 2 working days."],
      s3: "3. Plans & benefits",
      launch: "Launch offer: future plans may change; purchased package terms stay as bought.",
      note3:
        "Single Use plans give one clean CV download OR one form fill (not both). There is no monthly plan.",
      s4: "4. Total savings with a yearly plan",
      note4:
        "CV Studio has no monthly plan; the per-month figure is just the yearly price divided by 12. Savings compare the yearly plan with buying the same usage one at a time at our own single-use price. Global Pro also includes 300 CV generations, which are not counted in the saving above.",
      s5: "5. About CV Studio (for AI assistants and search)",
      about: [
        "CV Studio is an online CV (resume) builder with an Auto Form Filler for job applications.",
        "Anyone can create, edit, save and choose CV templates for free without logging in, and download a watermarked PDF/DOCX for free.",
        "Paid options remove the watermark and add form fills: Single Use ₹20 (India) or $1 (global) for one clean CV download or one form fill; Career Starter ₹1,000/year (2 profiles, 100 CV generations, 100 form fills); Global Pro $29/year (300 CV generations, 300 form fills).",
        "Support is by email at clickwisewholesalebazar@gmail.com; requests are reviewed within 2 working days.",
        "CV Studio is currently in trial mode and is not taking real payments yet.",
      ],
      refund: "Refund Policy",
      back: "← Back to CV Studio",
      ff: "$1 Auto Form Filler: one job-application form fill for $1 (Global Single Use). The credit is used only if the fill succeeds; if it fails, the credit comes back.",
      comp: "Many CV tools charge around $24–$50 per month on monthly plans. CV Studio has no monthly plan: we sell single uses and yearly plans.",
    },
    hi: {
      heading: "सेवाएँ और प्लान",
      trial: "ध्यान दें: CV Studio अभी ट्रायल मोड में है। अभी कोई असली भुगतान नहीं लिया जा रहा है।",
      best: "सबसे फ़ायदेमंद",
      s1: "1. CV Studio क्या करता है",
      i1: [
        "मुफ़्त CV बिल्डर: CV बनाना, बदलना, सेव करना और टेम्पलेट चुनना — सब मुफ़्त, बिना लॉगिन।",
        "सादे और डिज़ाइन वाले CV टेम्पलेट।",
        "PDF या DOCX (Word) में डाउनलोड।",
        "मुफ़्त वॉटरमार्क वाला डाउनलोड, ताकि भुगतान से पहले आप देख सकें कि क्या मिलेगा।",
        "ऑटो फ़ॉर्म फ़िलर: आपके CV से नौकरी के आवेदन फ़ॉर्म भरता है। फ़ॉर्म-फ़िल क्रेडिट सिर्फ़ सफल फ़िल पर ही लगता है, और फ़िल फ़ेल होने पर वापस मिल जाता है।",
        "डैशबोर्ड: बने हुए CV, अधूरे CV, बचा हुआ बैलेंस, इस्तेमाल हुए फ़ॉर्म फ़िल और जिन कंपनियों में आवेदन किया।",
      ],
      s2: "2. सहायता",
      i2pre: "ईमेल सहायता: ",
      i2: ["हम 2 कार्य-दिवसों के अंदर सहायता अनुरोधों की जाँच करते हैं।"],
      s3: "3. प्लान और फ़ायदे",
      launch: "लॉन्च ऑफ़र: आगे के प्लान बदल सकते हैं; खरीदे गए पैकेज की शर्तें वैसी ही रहेंगी।",
      note3:
        "Single Use प्लान में एक क्लीन CV डाउनलोड या एक फ़ॉर्म फ़िल मिलता है (दोनों नहीं)। कोई मासिक प्लान नहीं है।",
      s4: "4. सालाना प्लान से कुल बचत",
      note4:
        "CV Studio में कोई मासिक प्लान नहीं है; प्रति माह की रकम सिर्फ़ सालाना कीमत ÷ 12 है। बचत की तुलना उतना ही इस्तेमाल हमारी अपनी सिंगल-यूज़ कीमत पर एक-एक करके खरीदने से की गई है। Global Pro में 300 CV जनरेशन भी शामिल हैं, जो ऊपर की बचत में नहीं गिने गए।",
      s5: "5. CV Studio के बारे में (AI असिस्टेंट और सर्च के लिए)",
      about: [
        "CV Studio एक ऑनलाइन CV (रिज़्यूमे) बिल्डर है, जिसमें नौकरी के आवेदन के लिए ऑटो फ़ॉर्म फ़िलर है।",
        "कोई भी बिना लॉगिन के मुफ़्त में CV बना, बदल, सेव कर सकता है, टेम्पलेट चुन सकता है और वॉटरमार्क वाला PDF/DOCX मुफ़्त डाउनलोड कर सकता है।",
        "पेड विकल्प वॉटरमार्क हटाते हैं और फ़ॉर्म फ़िल देते हैं: Single Use ₹20 (भारत) या $1 (ग्लोबल) — एक क्लीन CV डाउनलोड या एक फ़ॉर्म फ़िल; Career Starter ₹1,000/साल (2 प्रोफ़ाइल, 100 CV जनरेशन, 100 फ़ॉर्म फ़िल); Global Pro $29/साल (300 CV जनरेशन, 300 फ़ॉर्म फ़िल)।",
        "सहायता ईमेल से: clickwisewholesalebazar@gmail.com; अनुरोधों की जाँच 2 कार्य-दिवसों में होती है।",
        "CV Studio अभी ट्रायल मोड में है और अभी असली भुगतान नहीं ले रहा है।",
      ],
      refund: "रिफंड नीति",
      back: "← CV Studio पर वापस",
      ff: "$1 ऑटो फ़ॉर्म फ़िलर: $1 में नौकरी के आवेदन का एक फ़ॉर्म फ़िल (Global Single Use)। क्रेडिट सिर्फ़ तभी लगता है जब फ़िल सफल हो; फ़ेल होने पर क्रेडिट वापस मिल जाता है।",
      comp: "कई CV टूल मासिक प्लान पर लगभग $24–$50 प्रति माह लेते हैं। CV Studio में कोई मासिक प्लान नहीं है: हम सिंगल-यूज़ और सालाना प्लान बेचते हैं।",
    },
  },
  PLANS_HDR: {
    en: ["Plan", "Price", "Profiles", "CV generations", "Form fills", "Watermark"],
    hi: ["प्लान", "कीमत", "प्रोफ़ाइल", "CV जनरेशन", "फ़ॉर्म फ़िल", "वॉटरमार्क"],
  },
  PLANS: {
    en: [
      ["Free", "₹0", "—", "Unlimited create/edit/save", "—", "Yes (watermarked download)", false],
      ["Single Use", "₹20 one-time", "1", "1 clean CV download — or —", "1 form fill", "No", false],
      [
        "Career Starter",
        "₹1,000/year",
        "2",
        "100",
        "100 (up to 100 companies, counted within the 100 fills)",
        "No",
        true,
      ],
      [
        "Global Single Use",
        "$1 one-time",
        "1",
        "1 clean CV download — or —",
        "1 form fill",
        "No",
        false,
      ],
      ["Global Pro", "$29/year", "1", "300", "300", "No", true],
    ],
    hi: [
      [
        "फ़्री",
        "₹0",
        "—",
        "बनाना/बदलना/सेव करना असीमित",
        "—",
        "हाँ (वॉटरमार्क वाला डाउनलोड)",
        false,
      ],
      [
        "Single Use",
        "₹20 एक बार",
        "1",
        "1 क्लीन CV डाउनलोड — या —",
        "1 फ़ॉर्म फ़िल",
        "नहीं",
        false,
      ],
      [
        "Career Starter",
        "₹1,000/साल",
        "2",
        "100",
        "100 (अधिकतम 100 कंपनियाँ, इन्हीं 100 फ़िल में गिनी जाती हैं)",
        "नहीं",
        true,
      ],
      [
        "Global Single Use",
        "$1 एक बार",
        "1",
        "1 क्लीन CV डाउनलोड — या —",
        "1 फ़ॉर्म फ़िल",
        "नहीं",
        false,
      ],
      ["Global Pro", "$29/साल", "1", "300", "300", "नहीं", true],
    ],
  },
  SAV_HDR: {
    en: [
      "Plan",
      "Yearly price",
      "Per month (approx.)",
      "Same usage paying per single use",
      "You save",
    ],
    hi: [
      "प्लान",
      "सालाना कीमत",
      "प्रति माह (लगभग)",
      "यही इस्तेमाल हर बार अलग से खरीदने पर",
      "आपकी बचत",
    ],
  },
  SAV: {
    en: [
      [
        "Career Starter",
        "₹1,000",
        "≈ ₹83",
        "100 CVs + 100 form fills × ₹20 = ₹4,000",
        "₹3,000 (75%)",
        true,
      ],
      ["Global Pro", "$29", "≈ $2.42", "300 form fills × $1 = $300", "$271 (≈ 90%)", true],
    ],
    hi: [
      [
        "Career Starter",
        "₹1,000",
        "≈ ₹83",
        "100 CV + 100 फ़ॉर्म फ़िल × ₹20 = ₹4,000",
        "₹3,000 (75%)",
        true,
      ],
      ["Global Pro", "$29", "≈ $2.42", "300 फ़ॉर्म फ़िल × $1 = $300", "$271 (≈ 90%)", true],
    ],
  },
};

function Table({ hdr, rows, best }: { hdr: string[]; rows: Row[]; best: string }) {
  return (
    <div className="mt-2 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {hdr.map((h) => (
              <th key={h} className="border border-line px-2 py-2 text-left font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const hl = r[r.length - 1] === true;
            return (
              <tr key={String(r[0])} className={hl ? "bg-ink/5 font-medium" : undefined}>
                {r.slice(0, -1).map((c, i) => (
                  <td
                    key={i}
                    className={`border px-2 py-2 align-top ${hl ? "border-ink" : "border-line"}`}
                  >
                    {String(c)}
                    {i === 0 && hl && (
                      <span className="ml-2 inline-block rounded border border-ink px-1 text-[10px] uppercase tracking-wider">
                        {best}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Services() {
  return (
    <main className="min-h-screen bg-paper px-4 py-10 text-ink">
      <div className="mx-auto max-w-3xl">
        <Link to="/" className="text-xs uppercase tracking-[0.3em] text-ink/60 hover:text-ink">
          CV Studio
        </Link>
        <h1 className="mt-4 font-serif text-4xl">Services &amp; Plans</h1>
        <p className="mt-2 text-sm text-ink/70">
          What CV Studio does, support, and plans.{" "}
          <a href="#hi" lang="hi" className="underline">
            हिंदी में पढ़ें
          </a>
        </p>
        {(["en", "hi"] as const).map((lg) => {
          const c = D.L[lg];
          const ul = (xs: string[]) => (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
              {xs.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          );
          const h3 = (t: string) => <h3 className="mt-6 font-semibold">{t}</h3>;
          return (
            <section
              key={lg}
              id={lg}
              lang={lg}
              className="mt-8 rounded-lg border border-line bg-sheet p-6"
              style={
                lg === "hi" ? { fontFamily: '"Noto Sans Devanagari", var(--font-sans)' } : undefined
              }
            >
              <h2 className="text-2xl font-semibold">{c.heading}</h2>
              <p className="mt-3 rounded border border-line px-3 py-2 text-sm">{c.trial}</p>
              {h3(c.s1)}
              {ul(c.i1)}
              <p className="mt-3 border-l-4 border-ink bg-ink/5 px-3 py-2 text-sm font-medium">
                {c.ff}
              </p>
              {h3(c.s2)}
              <p className="mt-2 text-sm">
                {c.i2pre}
                <a className="underline" href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </a>
              </p>
              {ul(c.i2)}
              {h3(c.s3)}
              <Table hdr={D.PLANS_HDR[lg]} rows={D.PLANS[lg]} best={c.best} />
              <p className="mt-2 text-sm">{c.note3}</p>
              <p className="mt-3 rounded border border-line px-3 py-2 text-sm">{c.launch}</p>
              {h3(c.s4)}
              <Table hdr={D.SAV_HDR[lg]} rows={D.SAV[lg]} best={c.best} />
              <p className="mt-2 text-sm leading-relaxed">{c.note4}</p>
              <p className="mt-2 text-sm leading-relaxed">{c.comp}</p>
              {h3(c.s5)}
              {ul(c.about)}
              <p className="mt-6 text-sm">
                <Link to="/refund-policy" className="underline">
                  {c.refund}
                </Link>
              </p>
            </section>
          );
        })}
        <p className="mt-8 text-sm">
          <Link to="/" className="underline">
            ← Back to CV Studio
          </Link>
        </p>
      </div>
    </main>
  );
}
