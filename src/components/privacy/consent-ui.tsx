import { useEffect, useState, type ReactNode } from "react";
import { eraseAllLocalData, giveConsent, NOTICE, readConsent, SUPPORT_EMAIL } from "@/lib/privacy/consent";

const btn = "h-12 flex-1 rounded-full border-2 border-forest px-4 text-sm font-medium text-forest bg-paper disabled:opacity-40";

/**
 * Data-collection notice (EN + Hindi) shown BEFORE data is collected.
 * Unticked checkbox; two equal-weight choices; nothing pre-selected.
 */
export function ConsentNotice({
  title = "Before you start / शुरू करने से पहले",
  extra,
  onKeep,
  onDelete,
  testId = "consent-dialog",
}: {
  title?: string;
  extra?: ReactNode;
  onKeep: () => void;
  onDelete: () => void;
  testId?: string;
}) {
  const [ticked, setTicked] = useState(false);
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/50 p-3" role="dialog" aria-modal="true" aria-labelledby="consent-title" data-testid={testId}>
      <div className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-2xl bg-sheet p-5 text-ink shadow-xl">
        <h2 id="consent-title" className="font-serif text-xl text-forest">{title}</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
          {NOTICE.en.map((t) => <li key={t}>{t}</li>)}
        </ul>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted" lang="hi">
          {NOTICE.hi.map((t) => <li key={t}>{t}</li>)}
        </ul>
        {extra}
        <p className="mt-2 text-xs text-muted">
          <a className="underline" href="/privacy" target="_blank" rel="noreferrer">Privacy notice / गोपनीयता सूचना</a> · {SUPPORT_EMAIL}
        </p>
        <label className="mt-3 flex items-start gap-3 rounded-xl bg-paper p-3 text-sm">
          <input type="checkbox" className="mt-1 size-5" checked={ticked} onChange={(e) => setTicked(e.target.checked)} data-testid="consent-check" />
          <span>
            I have read this notice and agree to my data being stored for this purpose. I can withdraw at any time.
            <br />
            <span className="text-muted">मैंने यह सूचना पढ़ ली है और इस उद्देश्य के लिए अपना डेटा संग्रहीत करने की सहमति देता/देती हूँ। मैं कभी भी सहमति वापस ले सकता/सकती हूँ।</span>
          </span>
        </label>
        <div className="mt-4 flex gap-2">
          <button type="button" className={btn} disabled={!ticked} onClick={onKeep} data-testid="consent-keep">
            Keep my data
            <br />
            <span className="text-xs">डेटा रखें</span>
          </button>
          <button type="button" className={btn} onClick={onDelete} data-testid="consent-delete">
            Delete my data
            <br />
            <span className="text-xs">डेटा हटाएँ</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/** Editor/dashboard gate: blocks the CV editor until the user chooses. */
export function ConsentGate({ floating = true }: { floating?: boolean } = {}) {
  const [state, setState] = useState<"unknown" | "ok" | "ask" | "declined">("unknown");
  useEffect(() => {
    const sync = () => setState((s) => (readConsent() ? "ok" : s === "declined" ? "declined" : "ask"));
    sync();
    window.addEventListener("cvstudio-consent", sync);
    return () => window.removeEventListener("cvstudio-consent", sync);
  }, []);
  if (state === "ok" || state === "unknown") return floating ? <WithdrawFloating /> : null;
  if (state === "declined")
    return (
      <div className="fixed inset-0 z-[100] grid place-items-center bg-black/50 p-3" data-testid="consent-declined">
        <div className="w-full max-w-md rounded-2xl bg-sheet p-5 text-sm">
          <p className="font-serif text-xl text-forest">Deleted / हटा दिया गया</p>
          <p className="mt-2">Nothing from CV Studio is stored in this browser now. You can close this tab.</p>
          <p className="text-muted">इस ब्राउज़र में अब CV Studio का कोई डेटा संग्रहीत नहीं है। आप यह टैब बंद कर सकते हैं।</p>
          <button type="button" className={`${btn} mt-4 w-full`} onClick={() => setState("ask")}>Show the notice again / सूचना फिर दिखाएँ</button>
        </div>
      </div>
    );
  return (
    <ConsentNotice
      onKeep={() => {
        giveConsent();
        setState("ok");
      }}
      onDelete={() => {
        eraseAllLocalData();
        setState("declined");
        setTimeout(() => window.location.reload(), 50);
      }}
    />
  );
}

/** Always-visible withdraw control in the editor. */
export function WithdrawFloating() {
  return (
    <div className="fixed bottom-24 left-2 z-40 print:hidden sm:bottom-3 sm:left-3">
      <WithdrawButton className="rounded-full border border-line bg-sheet/95 px-3 py-1.5 text-[11px] text-ink shadow" label="Withdraw consent / सहमति वापस लें" />
    </div>
  );
}

export function WithdrawButton({ className, label = "Withdraw consent & delete my data / सहमति वापस लें व डेटा हटाएँ" }: { className?: string; label?: string }) {
  return (
    <button
      type="button"
      className={className}
      data-testid="withdraw-consent"
      onClick={() => {
        if (!window.confirm("Withdraw consent and delete all CV Studio data saved in this browser (CVs, drafts, plan key, history)? This cannot be undone.\n\nसहमति वापस लें और इस ब्राउज़र में सहेजा गया सारा CV Studio डेटा हटाएँ? यह पूर्ववत नहीं किया जा सकता।")) return;
        eraseAllLocalData();
        window.location.href = "/";
      }}
    >
      {label}
    </button>
  );
}
