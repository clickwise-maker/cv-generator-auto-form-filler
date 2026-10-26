import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { intakeInfo, submitIntake } from "@/lib/clients/client";

export const Route = createFileRoute("/c/$token")({
  head: () => ({ meta: [{ title: "Share your details · CV Studio" }, { name: "robots", content: "noindex" }] }),
  component: IntakePage,
});

/** [model field, English label, Hindi label, input type] — existing Personal fields only. */
const FIELDS: [string, string, string, string?][] = [
  ["givenName", "First name *", "पहला नाम *"],
  ["familyName", "Surname", "उपनाम"],
  ["fatherName", "Father's name", "पिता का नाम"],
  ["motherName", "Mother's name", "माता का नाम"],
  ["dateOfBirth", "Date of birth", "जन्म तिथि", "date"],
  ["placeOfBirth", "Place of birth", "जन्म स्थान"],
  ["sex", "Gender", "लिंग", "sex"],
  ["maritalStatus", "Marital status", "वैवाहिक स्थिति", "marital"],
  ["nationality", "Nationality", "राष्ट्रीयता"],
  ["phone", "Mobile number", "मोबाइल नंबर", "tel"],
  ["email", "Email", "ईमेल", "email"],
  ["street", "Address", "पता"],
  ["city", "City", "शहर"],
  ["region", "State", "राज्य"],
  ["postalCode", "PIN code", "पिन कोड"],
  ["country", "Country", "देश"],
  ["nationalId", "National ID (e.g. Aadhaar)", "राष्ट्रीय पहचान (जैसे आधार)"],
  ["passportNumber", "Passport number", "पासपोर्ट नंबर"],
  ["positionApplied", "Post applied for", "आवेदित पद"],
];
const EDU: [string, string, string][] = [
  ["qualification", "Qualification (e.g. 10th, 12th, B.A.)", "योग्यता"],
  ["institution", "School / College / Board", "स्कूल / कॉलेज / बोर्ड"],
  ["field", "Subject / Stream", "विषय"],
  ["end", "Year passed", "उत्तीर्ण वर्ष"],
  ["details", "Marks / Grade", "अंक / ग्रेड"],
];
const SEXES = ["Female", "Male", "Unspecified"];
const MARITAL = ["Single", "Married", "Registered partnership", "Separated", "Divorced", "Widow(er)", "Other"];
const input = "h-12 w-full rounded-lg border border-line bg-paper px-3 text-base";

function L({ en, hi, children }: { en: string; hi: string; children: ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="font-medium">{en}</span> <span className="text-muted">/ {hi}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function IntakePage() {
  const { token } = Route.useParams();
  const [biz, setBiz] = useState<string | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "invalid" | "sending" | "done">("loading");
  const [error, setError] = useState("");
  const [p, setP] = useState<Record<string, string>>({ phoneCode: "+91", country: "India" });
  const [edu, setEdu] = useState<Record<string, string>[]>([{}]);
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    intakeInfo(token).then(
      (r) => {
        setBiz(r.businessName);
        setState("ready");
      },
      () => setState("invalid"),
    );
  }, [token]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!p.givenName?.trim()) return setError("Name is required / नाम आवश्यक है");
    if (!consent) return setError("Please tick the consent box / कृपया सहमति दें");
    setState("sending");
    try {
      await submitIntake(token, { personal: p, education: edu }, true);
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
      setState("ready");
    }
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-line px-4 py-3">
        <p className="font-serif text-lg">CV Studio</p>
        <p className="text-xs text-muted">Secure client details form / ग्राहक विवरण फ़ॉर्म</p>
      </header>
      <main className="mx-auto max-w-xl px-4 py-6" data-testid="intake">
        {state === "loading" ? <p>Loading… / लोड हो रहा है…</p> : null}
        {state === "invalid" ? <p data-testid="intake-invalid">This link is not valid or has expired. / यह लिंक मान्य नहीं है।</p> : null}
        {state === "done" ? (
          <div className="rounded-xl border border-forest bg-sheet p-4" data-testid="intake-done">
            <p className="font-serif text-xl text-forest">Thank you! / धन्यवाद!</p>
            <p className="mt-1 text-sm">Your details were sent to {biz}. / आपका विवरण {biz} को भेज दिया गया है।</p>
          </div>
        ) : null}
        {state === "ready" || state === "sending" ? (
          <form onSubmit={submit} className="space-y-4">
            <div>
              <h1 className="font-serif text-2xl text-forest">Share your details with {biz}</h1>
              <p className="text-sm text-muted">{biz} को अपना विवरण भेजें — they will use it to fill application forms for you.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {FIELDS.map(([k, en, hi, type]) => (
                <L key={k} en={en} hi={hi}>
                  {type === "sex" || type === "marital" ? (
                    <select className={input} name={k} value={p[k] ?? ""} onChange={(e) => setP({ ...p, [k]: e.target.value })}>
                      <option value="">—</option>
                      {(type === "sex" ? SEXES : MARITAL).map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  ) : (
                    <input className={input} name={k} type={type ?? "text"} required={k === "givenName"} value={p[k] ?? ""} onChange={(e) => setP({ ...p, [k]: e.target.value })} />
                  )}
                </L>
              ))}
            </div>
            <fieldset className="rounded-xl border border-line p-3">
              <legend className="px-1 text-sm font-medium">Education / शिक्षा</legend>
              {edu.map((row, i) => (
                <div key={i} className="mb-3 grid gap-2 border-b border-line pb-3 sm:grid-cols-2">
                  {EDU.map(([k, en, hi]) => (
                    <L key={k} en={en} hi={hi}>
                      <input className={input} name={`edu${i}.${k}`} value={row[k] ?? ""} onChange={(e) => setEdu(edu.map((r, j) => (j === i ? { ...r, [k]: e.target.value } : r)))} />
                    </L>
                  ))}
                </div>
              ))}
              {edu.length < 6 ? (
                <button type="button" className="h-11 text-sm font-medium text-forest underline" onClick={() => setEdu([...edu, {}])}>
                  + Add education / शिक्षा जोड़ें
                </button>
              ) : null}
            </fieldset>
            <label className="flex items-start gap-3 rounded-xl bg-sheet p-3 text-sm">
              <input type="checkbox" className="mt-1 size-5" name="consent" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
              <span>
                I agree my details are shared with <b>{biz}</b> for form filling.
                <br />
                <span className="text-muted">मैं सहमत हूँ कि मेरा विवरण फ़ॉर्म भरने के लिए {biz} के साथ साझा किया जाए।</span>
              </span>
            </label>
            {error ? <p className="text-sm text-red-700" role="alert">{error}</p> : null}
            <button type="submit" disabled={state === "sending"} className="h-12 w-full rounded-full bg-forest text-sheet font-medium" data-testid="intake-submit">
              {state === "sending" ? "Sending… / भेजा जा रहा है…" : "Submit / जमा करें"}
            </button>
          </form>
        ) : null}
      </main>
    </div>
  );
}
