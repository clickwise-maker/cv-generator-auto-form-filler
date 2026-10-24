import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: "Refund Policy — CV Studio" },
      { name: "description", content: "CV Studio refund policy in English and Hindi." },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600&display=swap",
      },
    ],
  }),
  component: RefundPolicy,
});

const EMAIL = "team@clickwisewe24in.we24.in";

type Section = { title: string; items?: string[]; intro?: string; mail?: boolean };
type Lang = { id: string; lang: string; heading: string; trial: string; sections: Section[] };

const CONTENT: Lang[] = [
  {
    id: "en",
    lang: "en",
    heading: "Refund Policy",
    trial: "Note: CV Studio is currently in trial mode. No real payments are being taken yet.",
    sections: [
      {
        title: "1. ₹20 one-time clean download (no watermark)",
        items: [
          "You can always try the free watermarked download first, so you see exactly what you will get.",
          "If you paid ₹20 and the PDF/DOCX does not generate, or the download fails because of a technical error on our side, you get a full refund.",
        ],
      },
      {
        title: "2. Yearly plans — Career Starter (₹1,000/year) and Global Pro ($29/year)",
        items: [
          "Full refund if you ask within 7 days of purchase and have not used the plan.",
          "No refund once credits have been actively used.",
        ],
      },
      {
        title: "3. How to request a refund",
        intro: "Email us with:",
        mail: true,
        items: [
          "Payment / order ID",
          "Date of payment",
          "Email address used for the purchase",
          "Reason for the refund",
        ],
      },
      {
        title: "4. Processing time",
        items: [
          "We review your request within 2 working days.",
          "Approved refunds go back to your original payment method within 5–7 working days.",
        ],
      },
    ],
  },
  {
    id: "hi",
    lang: "hi",
    heading: "रिफंड नीति",
    trial: "ध्यान दें: CV Studio अभी ट्रायल मोड में है। अभी कोई असली भुगतान नहीं लिया जा रहा है।",
    sections: [
      {
        title: "1. ₹20 वन-टाइम क्लीन डाउनलोड (बिना वॉटरमार्क)",
        items: [
          "आप पहले हमेशा मुफ़्त वॉटरमार्क वाला डाउनलोड आज़मा सकते हैं, ताकि आपको पता रहे कि आपको क्या मिलेगा।",
          "अगर आपने ₹20 दिए और PDF/DOCX नहीं बना, या हमारी तरफ़ की तकनीकी गड़बड़ी से डाउनलोड नहीं हुआ, तो आपको पूरा पैसा वापस मिलेगा।",
        ],
      },
      {
        title: "2. सालाना प्लान — Career Starter (₹1,000/साल) और Global Pro ($29/साल)",
        items: [
          "खरीद के 7 दिनों के अंदर अनुरोध करने पर, अगर प्लान इस्तेमाल नहीं हुआ है, तो पूरा रिफंड मिलेगा।",
          "क्रेडिट इस्तेमाल हो जाने के बाद रिफंड नहीं मिलेगा।",
        ],
      },
      {
        title: "3. रिफंड कैसे माँगें",
        intro: "ईमेल करें और ये जानकारी दें:",
        mail: true,
        items: [
          "पेमेंट / ऑर्डर ID",
          "भुगतान की तारीख",
          "खरीद में इस्तेमाल किया गया ईमेल",
          "रिफंड का कारण",
        ],
      },
      {
        title: "4. प्रक्रिया का समय",
        items: [
          "हम 2 कार्य-दिवसों के अंदर आपके अनुरोध की जाँच करते हैं।",
          "मंज़ूर रिफंड 5–7 कार्य-दिवसों में आपके मूल भुगतान माध्यम में वापस आ जाता है।",
        ],
      },
    ],
  },
];

function RefundPolicy() {
  return (
    <>
      <main className="min-h-screen bg-paper px-4 py-10 text-ink">
        <div className="mx-auto max-w-3xl">
          <Link to="/" className="text-xs uppercase tracking-[0.3em] text-ink/60 hover:text-ink">
            CV Studio
          </Link>
          <h1 className="mt-4 font-serif text-4xl">Refund Policy</h1>
          <p className="mt-2 text-sm text-ink/70">
            Plain and simple.{" "}
            <a href="#hi" lang="hi" className="underline">
              हिंदी में पढ़ें
            </a>
          </p>
          {CONTENT.map((c) => (
            <section
              key={c.id}
              id={c.id}
              lang={c.lang}
              className="mt-8 rounded-lg border border-line bg-sheet p-6"
              style={
                c.lang === "hi"
                  ? { fontFamily: '"Noto Sans Devanagari", var(--font-sans)' }
                  : undefined
              }
            >
              <h2 className="text-2xl font-semibold">{c.heading}</h2>
              <p className="mt-3 rounded border border-line px-3 py-2 text-sm">{c.trial}</p>
              {c.sections.map((s) => (
                <div key={s.title} className="mt-6">
                  <h3 className="font-semibold">{s.title}</h3>
                  {s.intro && (
                    <p className="mt-2 text-sm leading-relaxed">
                      {s.mail && (
                        <>
                          <a
                            className="underline"
                            href={`mailto:${EMAIL}?subject=Refund%20request`}
                          >
                            {EMAIL}
                          </a>{" "}
                          —{" "}
                        </>
                      )}
                      {s.intro}
                    </p>
                  )}
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
                    {s.items?.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          ))}
          <p className="mt-8 text-sm">
            <Link to="/" className="underline">
              ← Back to CV Studio
            </Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
