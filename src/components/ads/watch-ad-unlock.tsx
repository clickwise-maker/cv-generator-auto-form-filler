import { useState } from "react";
import { tr } from "@/lib/i18n/i18n";
import { Button } from "@/components/studio/ui";
import { WATCH_AD_UNLOCK } from "@/config/ads";
import { readGuest, readLocal } from "@/lib/payments/client";
import { layeredProfile, useStudio } from "@/lib/cv/store";

type GoogleTag = {
  cmd: Array<() => void>;
  defineOutOfPageSlot: (path: string, format: unknown) => { addService: (s: unknown) => void } | null;
  enums: { OutOfPageFormat: { REWARDED: unknown } };
  pubads: () => { addEventListener: (name: string, fn: (e: { makeRewardedVisible?: () => void }) => void) => void };
  enableServices: () => void;
  display: (slot: unknown) => void;
  destroySlots: (slots: unknown[]) => void;
};

function loadGpt(): Promise<GoogleTag> {
  const w = window as unknown as { googletag?: GoogleTag };
  w.googletag = w.googletag || ({ cmd: [] } as unknown as GoogleTag);
  if (!document.querySelector("script[data-gpt]")) {
    const s = document.createElement("script");
    s.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
    s.async = true;
    s.dataset.gpt = "1";
    document.head.appendChild(s);
  }
  return new Promise((resolve) => w.googletag!.cmd.push(() => resolve(w.googletag!)));
}

/** Server round-trip after the ad reports a reward: get a one-time token, then download the clean file once. */
export async function redeemUnlock(format: "pdf" | "docx", fetcher: typeof fetch = fetch) {
  const guestId = readGuest().guestId;
  const grant = await fetcher("/api/ad-unlock/grant", { method: "POST", headers: { "content-type": "application/json", "x-guest-id": guestId }, body: JSON.stringify({ guestId }) });
  if (!grant.ok) throw new Error(grant.status === 429 ? "daily_limit" : "unavailable");
  const { token } = (await grant.json()) as { token: string };
  const { settings } = useStudio.getState();
  const res = await fetcher("/api/ad-unlock/download", {
    method: "POST",
    headers: { "content-type": "application/json", "x-guest-id": guestId },
    body: JSON.stringify({ format, token, guestId, docId: readLocal().docId, profile: layeredProfile(), settings }),
  });
  if (!res.ok) throw new Error("unavailable");
  const blob = await res.blob();
  const name = /filename="([^"]+)"/.exec(res.headers.get("content-disposition") ?? "")?.[1] ?? `cv.${format}`;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Opt-in alternative to the ₹20 unlock. Renders nothing unless WATCH_AD_UNLOCK.enabled.
 * Nothing loads until the user clicks; closing the ad simply returns to the dialog.
 */
export function WatchAdOption({ format, enabled = WATCH_AD_UNLOCK.enabled }: { format: "pdf" | "docx"; enabled?: boolean }) {
  const [state, setState] = useState<"idle" | "loading" | "error" | "limit">("idle");
  if (!enabled) return null;
  async function start() {
    setState("loading");
    try {
      const g = await loadGpt();
      const slot = g.defineOutOfPageSlot(WATCH_AD_UNLOCK.gamAdUnitPath, g.enums.OutOfPageFormat.REWARDED);
      if (!slot) return setState("error");
      slot.addService(g.pubads());
      g.pubads().addEventListener("rewardedSlotReady", (e) => e.makeRewardedVisible?.());
      g.pubads().addEventListener("rewardedSlotGranted", () => {
        redeemUnlock(format)
          .then(() => (window.location.href = "/next-steps"))
          .catch((err: Error) => setState(err.message === "daily_limit" ? "limit" : "error"));
      });
      g.pubads().addEventListener("rewardedSlotClosed", () => {
        g.destroySlots([slot]);
        setState((s) => (s === "loading" ? "idle" : s));
      });
      g.enableServices();
      g.display(slot);
    } catch {
      setState("error");
    }
  }
  return (
    <div className="rounded-xl border border-dashed border-line p-3 text-sm" data-testid="watch-ad-option">
      <p className="font-semibold">{tr("Or watch a short ad to download free")}</p>
      <p className="mt-1 text-xs text-muted">{tr("Optional. You can skip or close the ad. One free clean download per day. Paying ₹20 is always available.")}</p>
      <Button type="button" tone="quiet" className="mt-2" disabled={state === "loading"} onClick={() => void start()}>
        {state === "loading" ? tr("Loading ad…") : tr("Watch ad and download")}
      </Button>
      {state === "error" ? <p className="mt-2 text-xs" role="status">{tr("No ad is available right now. You can still pay ₹20 or download the free watermarked PDF.")}</p> : null}
      {state === "limit" ? <p className="mt-2 text-xs" role="status">{tr("You have used today's free download. Try again tomorrow or pay ₹20.")}</p> : null}
    </div>
  );
}
