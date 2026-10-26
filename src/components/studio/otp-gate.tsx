import { useState } from "react";
import { Button } from "@/components/studio/ui";
import { useStudio } from "@/lib/cv/store";

function validDeskKey(value: string) {
  const trimmed = value.trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return true;
  const digits = trimmed.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

const steps = [
  { n: "01", title: "Email se desk khulega", body: "Code inbox mein nahi aata. Yahi button andar le jaata hai." },
  { n: "02", title: "One international profile", body: "Identity, work, study, languages, and contact." },
  { n: "03", title: "Read a PDF, photo, or text file", body: "The reader maps what it finds onto the form." },
  { n: "04", title: "Edit the page, then download", body: "CV, résumé, or consular particulars as PDF or Word." },
];

export function OtpGate() {
  const verify = useStudio((state) => state.verify);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function openDesk() {
    const key = email.trim();
    if (!validDeskKey(key)) {
      setError("Email ya mobile likhein. Jaise you@studio.org ya 9876543210.");
      return;
    }
    setError("");
    verify(key);
  }

  return (
    <main className="flex min-h-screen flex-col bg-paper text-ink lg:grid lg:grid-cols-2">
      <section className="order-2 flex flex-col justify-between gap-10 px-6 py-10 sm:px-10 lg:order-1 lg:px-14 lg:py-14">
        <div>
          <p className="kicker text-forest">CV Studio · International desk</p>
          <h1 className="mt-4 max-w-xl font-serif text-4xl leading-tight sm:text-5xl">
            The same particulars, on every form.
          </h1>
          <p className="mt-4 max-w-md text-base text-muted">
            Build one profile, read an old CV or a photo of a form, and export a curriculum vitae, a compact résumé, or consular particulars.
          </p>
        </div>
        <ol className="flex flex-col gap-4">
          {steps.map((step) => (
            <li key={step.n} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-3">
              <span className="font-serif text-lg text-brass">{step.n}</span>
              <span>
                <span className="block font-medium">{step.title}</span>
                <span className="block text-sm text-muted">{step.body}</span>
              </span>
            </li>
          ))}
        </ol>
        <p className="text-sm text-muted">Your dossier never leaves this browser.</p>
      </section>

      <section className="order-1 flex flex-col justify-center bg-forest px-6 py-10 text-sheet sm:px-10 lg:order-2 lg:px-14">
        <p className="kicker text-mist">Sign in</p>
        <h2 className="mt-3 font-serif text-3xl">Open the desk</h2>
        <p className="mt-2 max-w-sm text-sm text-mist">
          Verification code email par nahi aayega. Is desk ka mailbox nahi hai. Email likhte hi andar chale jayenge.
        </p>

        <form
          className="mt-8 flex flex-col gap-3"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            openDesk();
          }}
        >
          <label className="flex flex-col gap-1.5 text-sm" htmlFor="desk-email">
            <span className="text-mist">Email or mobile</span>
            <input
              id="desk-email"
              type="text"
              inputMode="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@studio.org or 9876543210"
              className="h-12 rounded-xl border border-mist/40 bg-forest-deep px-3 text-sheet outline-none placeholder:text-mist/70 focus:border-sheet"
            />
          </label>
          <Button type="submit" tone="sheet">
            Open the desk
          </Button>
        </form>

        {error ? (
          <p role="alert" className="mt-4 text-sm text-brass-soft">
            {error}
          </p>
        ) : null}
      </section>
    </main>
  );
}
