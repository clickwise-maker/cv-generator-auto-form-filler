import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { deleteOwnSubmission, intakeInfo, submitIntake } from "@/lib/clients/client";
import { ConsentNotice } from "@/components/privacy/consent-ui";
import { RETENTION_DAYS, SUPPORT_EMAIL } from "@/lib/privacy/consent";

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
  const [noticeDone, setNoticeDone] = useState<"no" | "keep" | "delete">("no");
  const [sub, setSub] = useState<{ clientId: string; deleteKey: string } | null>(null);
  const [withdrawn, setWithdrawn] = useState(false);
  const SUB_KEY = `cvstudio.intake.${token}`;
  useEffect(() => {
    try {
      const v = JSON.parse(localStorage.getItem(SUB_KEY) ?? "null");
      if (v?.clientId) setSub(v);
    } catch {
      // ignore
    }
  }, [SUB_KEY]);
  async function withdraw() {
    if (!window.confirm("Withdraw consent and delete the details you sent? / सहमति वापस लें और भेजा गया विवरण हटाएँ?")) return;
    if (sub) {
      try {
        await deleteOwnSubmission(sub.clientId, sub.deleteKey);
      } catch (err) {
        return setError(err instanceof Error ? err.message : "Failed");
      }
    }
    try {
      localStorage.removeItem(SUB_KEY);
    } catch {
      // ignore
    }
    setSub(null);
    setP({ phoneCode: "+91", country: "India" });
    setEdu([{}]);
    setConsent(false);
    setWithdrawn(true);
    setState("ready");
    setNoticeDone("no");
  }

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
      const r = await submitIntake(token, { personal: p, education: edu }, true);
      const keep = { clientId: r.clientId, deleteKey: r.deleteKey };
      setSub(keep);
      try {
        localStorage.setItem(SUB_KEY, JSON.stringify(keep));
      } catch {
        // ignore — the email route still works
      }
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
        {state === "ready" && noticeDone === "no" ? (
          <ConsentNotice
            testId="intake-consent-dialog"
            title={`${biz ?? "This business"} is asking for your details / आपका विवरण माँगा जा रहा है`}
            extra={<p className="mt-2 text-sm">Shared only with <b>{biz}</b> to fill your forms. Auto-deleted after {RETENTION_DAYS} days. / केवल <b>{biz}</b> के साथ, {RETENTION_DAYS} दिन बाद स्वतः हटाया जाता है।</p>}
            onKeep={() => setNoticeDone("keep")}
            onDelete={() => {
              setNoticeDone("delete");
              void (sub ? deleteOwnSubmission(sub.clientId, sub.deleteKey).catch(() => undefined) : Promise.resolve()).then(() => {
                try {
                  localStorage.removeItem(SUB_KEY);
                } catch {
                  // ignore
                }
                setSub(null);
              });
            }}
          />
        ) : null}
        {noticeDone === "delete" ? (
          <div className="mb-4 rounded-xl border border-line bg-sheet p-4 text-sm" data-testid="intake-declined">
            Nothing was collected and nothing is stored. You can close this page. / कुछ भी एकत्र या संग्रहीत नहीं किया गया। आप यह पेज बंद कर सकते हैं।
            <button type="button" className="mt-2 block underline text-forest" onClick={() => setNoticeDone("no")}>Show the notice again / सूचना फिर दिखाएँ</button>
          </div>
        ) : null}
        {withdrawn ? <p className="mb-3 rounded-xl bg-sheet p-3 text-sm" data-testid="intake-withdrawn">Consent withdrawn; your submitted details were deleted. / सहमति वापस ली गई; आपका विवरण हटा दिया गया।</p> : null}
        {state === "loading" ? <p>Loading… / लोड हो रहा है…</p> : null}
        {state === "invalid" ? <p data-testid="intake-invalid">This link is not valid or has expired. / यह लिंक मान्य नहीं है।</p> : null}
        {state === "done" ? (
          <div className="rounded-xl border border-forest bg-sheet p-4" data-testid="intake-done">
            <p className="font-serif text-xl text-forest">Thank you! / धन्यवाद!</p>
            <p className="mt-1 text-sm">Your details were sent to {biz}. / आपका विवरण {biz} को भेज दिया गया है।</p>
            <p className="mt-2 text-xs text-muted">They are auto-deleted after {RETENTION_DAYS} days. / {RETENTION_DAYS} दिन बाद स्वतः हटा दिए जाते हैं।</p>
          </div>
        ) : null}
        {(state === "ready" || state === "sending") && noticeDone === "keep" ? (
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
              <input type="checkbox" className="mt-1 size-5" name="consent" required data-testid="intake-consent" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
              <span>
                I agree my details are shared with <b>{biz}</b> for form filling.
                <br />
                <span className="text-muted">मैं सहमत हूँ कि मेरा विवरण फ़ॉर्म भरने के लिए {biz} के साथ साझा किया जाए।</span>
              </span>
            </label>
            <p className="text-xs text-muted" data-testid="intake-deletion-note">
              To delete your details later, use “Withdraw consent” below or email <a className="underline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> with the business name. See our <a className="underline" href="/privacy">privacy notice</a>. / बाद में विवरण हटवाने के लिए नीचे “सहमति वापस लें” दबाएँ या ईमेल करें।
            </p>
            {error ? <p className="text-sm text-red-700" role="alert">{error}</p> : null}
            <button type="submit" disabled={state === "sending"} className="h-12 w-full rounded-full bg-forest text-sheet font-medium" data-testid="intake-submit">
              {state === "sending" ? "Sending… / भेजा जा रहा है…" : "Submit / जमा करें"}
            </button>
          </form>
        ) : null}
        {state !== "loading" && state !== "invalid" ? (
          <div className="mt-6 border-t border-line pt-4 text-sm">
            <button type="button" className="h-11 rounded-full border-2 border-red-700 px-4 font-medium text-red-700" onClick={() => void withdraw()} data-testid="intake-withdraw">
              Withdraw consent / सहमति वापस लें
            </button>
            <p className="mt-2 text-xs text-muted">Or email {SUPPORT_EMAIL} to request deletion. / या हटाने के लिए ईमेल करें।</p>
          </div>
        ) : null}
        {error && state === "done" ? <p className="text-sm text-red-700" role="alert">{error}</p> : null}
      </main>
    </div>
  );
}
