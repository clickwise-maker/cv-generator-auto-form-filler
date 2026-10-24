import { useEffect, useState } from "react";
import type { Credits } from "@/lib/payments/config";
import { fetchCredits, fingerprint, readGuest, type GuestState } from "@/lib/payments/client";
import { useStudio } from "@/lib/cv/store";
import { emptyProfile } from "@/lib/cv/model";

/** Opens the download paywall (where plans live). Plans are never shown elsewhere. */
export function openPlans() {
  window.dispatchEvent(new Event("meridian-open-plans"));
}

function Stat({ label, value, testId }: { label: string; value: string | number; testId: string }) {
  return (
    <div className="rounded-xl border border-line bg-paper p-3">
      <p className="text-xs text-muted">{label}</p>
      <p className="font-serif text-2xl" data-testid={testId}>
        {value}
      </p>
    </div>
  );
}

/** Guest dashboard — local storage only, no account needed. */
export function Dashboard() {
  const profile = useStudio((s) => s.profile);
  const settings = useStudio((s) => s.settings);
  const [guest, setGuest] = useState<GuestState | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);

  useEffect(() => {
    const load = () => {
      const g = readGuest();
      setGuest(g);
      if (g.planEntitlementId) fetchCredits(g.planEntitlementId).then(setCredits, () => setCredits(null));
      else setCredits(null);
    };
    load();
    window.addEventListener("meridian-guest", load);
    return () => window.removeEventListener("meridian-guest", load);
  }, []);

  if (!guest) return null;
  const hasContent = JSON.stringify(profile) !== JSON.stringify(emptyProfile());
  const inProgress = hasContent && !guest.exported.includes(fingerprint(profile, settings)) ? 1 : 0;

  return (
    <section className="rounded-2xl border border-line bg-sheet p-4" aria-labelledby="dash-title" data-testid="dashboard">
      <div className="flex items-center gap-2">
        <h2 id="dash-title" className="kicker flex-1 text-forest">
          Your dashboard
        </h2>
        <span className="rounded-full bg-paper px-2 py-0.5 text-xs text-muted">Guest session · saved in this browser</span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        <Stat label="CVs completed" value={guest.exported.length} testId="dash-completed" />
        <Stat label="CVs in progress" value={inProgress} testId="dash-drafts" />
        <Stat label="CV credits left" value={credits?.cvGenerationsLeft ?? 0} testId="dash-cv-credits" />
        <Stat label="Form-fill credits left" value={credits?.formFillsLeft ?? 0} testId="dash-fill-credits" />
        <Stat label="Form fills used" value={guest.formFillsUsed} testId="dash-fills-used" />
        <Stat label="Companies applied" value={credits ? credits.companiesUsed : guest.companies.length} testId="dash-companies" />
      </div>
      <p className="mt-3 text-xs text-muted">
        {credits ? (
          <>
            Active plan: <strong>{credits.planName}</strong>
            {credits.test ? " (TEST)" : ""}
            {credits.companyLimit ? ` · companies ${credits.companiesUsed}/${credits.companyLimit} (within your form fills)` : ""}
            {credits.expiresAt ? ` · valid until ${new Date(credits.expiresAt).toLocaleDateString()}` : ""}
          </>
        ) : (
          <>
            No active plan.{" "}
            <button type="button" className="font-medium text-forest underline" onClick={openPlans}>
              See download plans
            </button>
          </>
        )}
      </p>
    </section>
  );
}
