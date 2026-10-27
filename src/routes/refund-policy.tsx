import { tr } from "@/lib/i18n/i18n";
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

// i18n-data:start
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
];
// i18n-data:end

function RefundPolicy() {
  return (
    <>
      <main className="min-h-screen bg-paper px-4 py-10 text-ink">
        <div className="mx-auto max-w-3xl">
          <Link to="/" className="text-xs uppercase tracking-[0.3em] text-ink/60 hover:text-ink">
            {tr("CV Studio")}
          </Link>
          <h1 className="mt-4 font-serif text-4xl">{tr("Refund Policy")}</h1>
          <p className="mt-2 text-sm text-ink/70">
            {tr("Plain and simple.")}
          </p>
          {CONTENT.map((c) => (
            <section
              key={c.id}
              id={c.id}
              className="mt-8 rounded-lg border border-line bg-sheet p-6"
            >
              <h2 className="text-2xl font-semibold">{tr(c.heading)}</h2>
              <p className="mt-3 rounded border border-line px-3 py-2 text-sm">{tr(c.trial)}</p>
              {c.sections.map((s) => (
                <div key={tr(s.title)} className="mt-6">
                  <h3 className="font-semibold">{tr(s.title)}</h3>
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
                      {tr(s.intro)}
                    </p>
                  )}
                  <ul className="mt-2 list-disc space-y-1 ps-5 text-sm leading-relaxed">
                    {s.items?.map((i) => (
                      <li key={i}>{tr(i)}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          ))}
          <p className="mt-8 text-sm">
            <Link to="/" className="underline">
              {tr("← Back to CV Studio")}
            </Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
