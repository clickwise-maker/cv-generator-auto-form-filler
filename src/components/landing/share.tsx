import { useEffect, useState } from "react";
import { tr } from "@/lib/i18n/i18n";
import { readGuest } from "@/lib/payments/client";
import { readConsent } from "@/lib/privacy/consent";

const SITE = "https://formzalo.com/";
const REF_KEY = "meridian.ref.v1";

/** Saves an incoming ?ref=<id> (no rewards logic — just remembers who shared the link). */
export function captureRef() {
  try {
    const ref = new URLSearchParams(location.search).get("ref") ?? sessionStorage.getItem(REF_KEY);
    if (!ref || !/^[\w-]{4,80}$/.test(ref)) return;
    sessionStorage.setItem(REF_KEY, ref);
    if (readConsent() && !localStorage.getItem(REF_KEY)) localStorage.setItem(REF_KEY, JSON.stringify({ ref, at: Date.now() }));
  } catch {
    // storage unavailable
  }
}

export function myReferralLink(): string {
  return `${SITE}?ref=${encodeURIComponent(readGuest().guestId)}`;
}

/** Share buttons. With `referral`, shares the visitor's own ?ref link and shows it. */
export function ShareFormzolo({ referral = false, className = "" }: { referral?: boolean; className?: string }) {
  const [url, setUrl] = useState(SITE);
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);
  useEffect(() => {
    const load = () => setUrl(referral ? myReferralLink() : SITE);
    load();
    setCanShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
    window.addEventListener("meridian-guest", load);
    return () => window.removeEventListener("meridian-guest", load);
  }, [referral]);
  const text = tr("Make a CV and fill forms for free with formzolo");
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(text);
  const links: [string, string][] = [
    ["WhatsApp", `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`],
    ["X", `https://twitter.com/intent/tweet?text=${t}&url=${u}`],
    ["Facebook", `https://www.facebook.com/sharer/sharer.php?u=${u}`],
    ["LinkedIn", `https://www.linkedin.com/sharing/share-offsite/?url=${u}`],
  ];
  const pill = "inline-flex h-10 items-center rounded-full border border-forest/25 bg-white px-4 text-sm font-medium text-forest hover:bg-forest/5";
  return (
    <section className={`rounded-2xl border border-line bg-sheet p-4 sm:p-5 ${className}`} data-testid={referral ? "referral" : "share"} aria-labelledby={referral ? "ref-title" : "share-title"}>
      <h2 id={referral ? "ref-title" : "share-title"} className="font-serif text-xl text-forest">{referral ? tr("Your referral link") : tr("Share formzolo")}</h2>
      <p className="mt-1 text-sm text-muted">{referral ? tr("Share this link with friends. It is unique to this browser.") : tr("Know someone applying for jobs? Send them formzolo.")}</p>
      {referral ? (
        <input readOnly value={url} onFocus={(e) => e.currentTarget.select()} aria-label={tr("Your referral link")} className="mt-3 h-11 w-full rounded-xl border border-line bg-paper px-3 text-sm" data-testid="ref-link" dir="ltr" />
      ) : null}
      <div className="mt-3 flex flex-wrap gap-2">
        {canShare ? (
          <button type="button" className={`${pill} bg-forest text-white hover:bg-[#24624F]`} onClick={() => navigator.share({ title: "formzolo", text, url }).catch(() => {})}>
            {tr("Share…")}
          </button>
        ) : null}
        {links.map(([n, href]) => (
          <a key={n} className={pill} href={href} target="_blank" rel="noopener noreferrer">{n}</a>
        ))}
        <button
          type="button"
          className={pill}
          data-testid="copy-link"
          onClick={() => navigator.clipboard?.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }, () => {})}
        >
          {copied ? tr("Link copied") : tr("Copy link")}
        </button>
      </div>
    </section>
  );
}
