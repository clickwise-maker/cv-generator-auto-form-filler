import { useEffect, useRef, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { tr } from "@/lib/i18n/i18n";
import { useMode } from "@/lib/cv/mode";
import { ADS, ADSENSE_PUB_ID, adAllowed, type AdPlacement } from "@/config/ads";

/** Layout preview for reviewers: localStorage "cvstudio.adpreview" = "1" shows an empty labelled box. Never loads an ad. */
const PREVIEW_KEY = "cvstudio.adpreview";

/**
 * One manual AdSense unit, labelled "Advertisement". Renders nothing when ads are
 * disabled or on a route that is not on the allow-list (src/config/ads.ts).
 * Keyed by pathname so a new route = one new request; never refreshed on a timer.
 */
export function AdSlot({ placement, className = "" }: { placement: AdPlacement; className?: string }) {
  const { pathname } = useLocation();
  const mode = useMode((m) => m.mode);
  const [preview, setPreview] = useState(false);
  useEffect(() => {
    try {
      setPreview(localStorage.getItem(PREVIEW_KEY) === "1");
    } catch {
      setPreview(false);
    }
  }, []);
  if (!adAllowed(pathname, placement)) return null;
  // The home page doubles as the form filler: no ads at all while it is in filler mode.
  if (pathname === "/" && mode === "filler") return null;
  if (!ADS.enabled && !preview) return null;
  return (
    <aside className={`my-10 ${className}`} aria-label={tr("Advertisement")} data-testid={`ad-slot-${placement}`}>
      <p className="mb-1 text-[11px] uppercase tracking-wider text-muted">{tr("Advertisement")}</p>
      {ADS.enabled ? <AdUnit key={pathname} slot={ADS.slots[placement]} /> : <div className="h-28 rounded-lg border border-dashed border-line bg-paper" />}
    </aside>
  );
}

function AdUnit({ slot }: { slot: string }) {
  const pushed = useRef(false);
  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      const w = window as unknown as { adsbygoogle?: unknown[] };
      (w.adsbygoogle = w.adsbygoogle || []).push({});
    } catch {
      /* ad blockers: ignore */
    }
  }, []);
  return <ins className="adsbygoogle" style={{ display: "block" }} data-ad-client={ADSENSE_PUB_ID} data-ad-slot={slot} data-ad-format="auto" data-full-width-responsive="true" />;
}
