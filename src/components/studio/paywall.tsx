import { tr } from "@/lib/i18n/i18n";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/studio/ui";
import { DEFAULT_PLAN_ID, LAUNCH_NOTE, visiblePlans, getPlan, planPriceLabel, type ExportFormat, type PaywallStatus, type PlanId } from "@/lib/payments/config";
import {
  ApiError,
  cancelOrder,
  createOrder,
  downloadClean,
  newIdempotencyKey,
  openRazorpay,
  readGuest,
  readLocal,
  writeGuest,
  simulatePayment,
  verifyPayment,
  writeLocal,
  type PublicOrder,
} from "@/lib/payments/client";
import { layeredProfile, useStudio } from "@/lib/cv/store";
import { downloadPreviewPdf } from "@/lib/cv/export-pdf";
import { WATERMARK_LINES } from "@/lib/payments/config";
import { WatchAdOption } from "@/components/ads/watch-ad-unlock";

type Phase =
  | { kind: "confirm" }
  | { kind: "loading"; label: string }
  | { kind: "paying"; order: PublicOrder }
  | { kind: "cancelled" }
  | { kind: "failed"; message: string }
  | { kind: "success"; test: boolean }
  | { kind: "edited"; message: string };

/**
 * Unlock dialog: confirmation (price + entitlement) → payment → server
 * verification → clean download from the server. The browser never decides
 * that a payment succeeded; it only shows what the server returns.
 */
export function UnlockDialog({ open, format, status, onClose }: { open: boolean; format: ExportFormat; status: PaywallStatus | null; onClose: () => void }) {
  const [phase, setPhase] = useState<Phase>({ kind: "confirm" });
  const [planId, setPlanId] = useState<PlanId>(DEFAULT_PLAN_ID);
  const plan = getPlan(planId)!;
  const planLabel = planPriceLabel(plan);
  const idem = useRef<string>("");
  const closeRef = useRef<HTMLButtonElement>(null);
  const label = format === "docx" ? tr("Word (DOCX)") : "PDF";

  useEffect(() => {
    if (!open) return;
    idem.current = newIdempotencyKey();
    setPhase({ kind: "confirm" });
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !status) return null;
  const isTest = status.mode === "test";
  const busy = phase.kind === "loading";

  async function fetchFile(entitlementId: string, test: boolean) {
    const { settings } = useStudio.getState();
      const profile = layeredProfile();
    setPhase({ kind: "loading", label: `Building your clean ${label}…` });
    try {
      await downloadClean(format, entitlementId, profile, settings);
      setPhase({ kind: "success", test });
    } catch (e) {
      if (e instanceof ApiError && (e.code === "edited_after_purchase" || e.code === "download_limit" || e.code === "test_entitlement")) {
        setPhase({ kind: "edited", message: e.message });
      } else setPhase({ kind: "failed", message: e instanceof Error ? e.message : tr("Download failed.") });
    }
  }

  async function settled(order: PublicOrder) {
    if (order.status === "paid" && order.entitlementId) {
      if (plan.singleUse) writeLocal({ ...readLocal(), entitlementId: order.entitlementId, orderId: order.orderId, test: order.test });
      writeGuest({ ...readGuest(), planEntitlementId: order.entitlementId, planTest: order.test });
      await fetchFile(order.entitlementId, order.test);
    } else if (order.status === "cancelled") setPhase({ kind: "cancelled" });
    else setPhase({ kind: "failed", message: tr("The payment did not go through. You were not charged for a clean file.") });
  }

  async function start() {
    const guest = readGuest();
    // Active multi-use package? Use its CV credits — never charge twice.
    if (guest.planEntitlementId && guest.planEntitlementId !== readLocal().entitlementId) {
      const { settings } = useStudio.getState();
      const profile = layeredProfile();
      setPhase({ kind: "loading", label: tr("Using your plan credits…") });
      try {
        await downloadClean(format, guest.planEntitlementId, profile, settings);
        setPhase({ kind: "success", test: Boolean(guest.planTest) });
        return;
      } catch {
        // no credits / expired / not a package: continue to the normal flow
      }
    }
    const local = readLocal();
    // Already unlocked? Try the existing entitlement first — never charge twice.
    if (local.entitlementId) {
      const { settings } = useStudio.getState();
      const profile = layeredProfile();
      setPhase({ kind: "loading", label: tr("Checking your existing unlock…") });
      try {
        await downloadClean(format, local.entitlementId, profile, settings);
        setPhase({ kind: "success", test: Boolean(local.test) });
        return;
      } catch (e) {
        if (!(e instanceof ApiError) || e.status === 0) {
          setPhase({ kind: "failed", message: e instanceof Error ? e.message : tr("Download failed.") });
          return;
        }
        // not valid for this version: fall through to a new purchase after confirming
        if (e.code === "edited_after_purchase") {
          setPhase({ kind: "edited", message: `${e.message} Continue below to unlock this version.` });
          writeLocal({ docId: local.docId });
          return;
        }
        writeLocal({ docId: local.docId });
      }
    }
    setPhase({ kind: "loading", label: tr("Creating your order…") });
    try {
      const { settings } = useStudio.getState();
      const profile = layeredProfile();
      const order = await createOrder(profile, settings, idem.current, planId);
      if (order.status !== "created") return settled(order);
      if (order.provider === "simulated") setPhase({ kind: "paying", order });
      else {
        const result = await openRazorpay(order, `Clean ${label} export`);
        if (result === "dismissed") {
          await cancelOrder(order.orderId).catch(() => undefined);
          idem.current = newIdempotencyKey();
          return setPhase({ kind: "cancelled" });
        }
        setPhase({ kind: "loading", label: tr("Verifying payment with the server…") });
        await settled(await verifyPayment(order.orderId, result.razorpay_payment_id, result.razorpay_signature));
      }
    } catch (e) {
      setPhase({ kind: "failed", message: e instanceof Error ? e.message : tr("Something went wrong.") });
    }
  }

  async function simulate(order: PublicOrder, outcome: "success" | "failure" | "cancel") {
    setPhase({ kind: "loading", label: tr("TEST: server is simulating the payment…") });
    try {
      await settled(await simulatePayment(order.orderId, outcome));
    } catch (e) {
      setPhase({ kind: "failed", message: e instanceof Error ? e.message : tr("Simulated payment failed.") });
    }
    idem.current = newIdempotencyKey();
  }

  return (
    <div className="fixed inset-0 z-40 grid place-items-end bg-ink/40 p-4 sm:place-items-center" role="presentation" onClick={() => !busy && onClose()}>
      <section role="dialog" aria-modal="true" aria-labelledby="unlock-title" aria-describedby="unlock-desc" className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-line bg-sheet p-5 text-ink" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start gap-2">
          <p className="kicker flex-1 text-forest">{tr("Unlock clean download")}</p>
          {isTest ? (
            <span className="rounded-full bg-amber-200 px-2 py-0.5 text-xs font-bold text-amber-900" role="note">
              {tr("TEST MODE — no real payment")}
            </span>
          ) : status.mode === "live" ? (
            <span className="rounded-full bg-forest px-2 py-0.5 text-xs font-bold text-sheet">{tr("Real payment")}</span>
          ) : null}
          <button ref={closeRef} type="button" aria-label={tr("Close")} className="-mt-1 h-9 w-9 rounded-full text-lg" disabled={busy} onClick={onClose}>
            ×
          </button>
        </div>
        <h2 id="unlock-title" className="mt-2 font-serif text-2xl">
          {tr("Clean {label}", { label })}
        </h2>

        {status.mode === "unavailable" ? (
          <div id="unlock-desc">
            <p className="mt-3 text-sm" role="status">
              {status.message}
            </p>
            <div className="mt-5">
              <Button type="button" onClick={onClose}>
                {tr("OK")}
              </Button>
            </div>
          </div>
        ) : (
          <div id="unlock-desc" aria-live="polite">
            {phase.kind === "confirm" || phase.kind === "edited" ? (
              <>
                {phase.kind === "edited" ? (
                  <p className="mt-3 rounded-xl bg-paper p-3 text-sm" role="alert">
                    {phase.message}
                  </p>
                ) : null}
                <fieldset className="mt-3" data-testid="plan-picker">
                  <legend className="text-sm font-semibold">{tr("Choose a plan")}</legend>
                  <div className="mt-2 grid gap-2">
                    <div className="flex gap-3 rounded-xl border border-dashed border-line p-3 text-sm" data-testid="plan-free">
                      <span className="flex-1">
                        <span className="flex justify-between gap-2 font-semibold">
                          <span>{tr("Free preview")}</span>
                          <span>{tr("Free")}</span>
                        </span>
                        <span className="block text-xs text-muted">{tr("Watermarked PDF · unlimited · no sign-in")}</span>
                      </span>
                    </div>
                    {visiblePlans(status.mode === "test").map((p) => (
                      <label key={p.id} className={`flex cursor-pointer gap-3 rounded-xl border p-3 text-sm ${p.id === planId ? "border-forest bg-paper" : "border-line"}`}>
                        <input type="radio" name="plan" value={p.id} checked={p.id === planId} onChange={() => setPlanId(p.id)} className="mt-1" />
                        <span className="flex-1">
                          <span className="flex justify-between gap-2 font-semibold">
                            <span>{p.name}</span>
                            <span>{planPriceLabel(p)}</span>
                          </span>
                          <span className="block text-xs text-muted">{p.bullets.join(" · ")}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-muted">{LAUNCH_NOTE}</p>
                  {plan.singleUse ? <p className="mt-1 text-xs text-muted">{status.policyText}</p> : null}
                </fieldset>
                <p className="mt-3 text-xs text-muted">{tr(status.message)} {tr("Card/UPI details are entered only on the payment provider's page, never here.")}</p>
                <div className="mt-5 flex flex-col gap-2">
                  <Button type="button" onClick={() => void start()}>
                    {isTest ? tr("Continue to TEST payment ({price})", { price: planLabel }) : tr("Pay {price} and unlock", { price: planLabel })}
                  </Button>
                  <Button
                    type="button"
                    tone="quiet"
                    onClick={() => {
                      const { settings } = useStudio.getState();
      const profile = layeredProfile();
                      downloadPreviewPdf(profile, settings, WATERMARK_LINES);
                    }}
                  >
                    {tr("Download FREE watermarked PDF")}
                  </Button>
                  {/* Opt-in rewarded-ad unlock: renders nothing unless WATCH_AD_UNLOCK.enabled (default off). */}
                  <WatchAdOption format={format} />
                  <Button type="button" tone="quiet" onClick={onClose}>
                    {tr("Not now")}
                  </Button>
                </div>
              </>
            ) : null}

            {phase.kind === "loading" ? (
              <p className="mt-4 flex items-center gap-2 text-sm" role="status">
                <span className="inline-block size-4 animate-spin rounded-full border-2 border-forest border-t-transparent" aria-hidden />
                {phase.label}
              </p>
            ) : null}

            {phase.kind === "paying" ? (
              <div className="mt-3 rounded-xl border-2 border-dashed border-amber-400 p-3">
                <p className="text-sm font-semibold">{tr("Simulated payment — TEST ONLY")}</p>
                <p className="mt-1 text-xs text-muted">
                  {tr("Order {id}… · {plan} {price}. These buttons ask the server to simulate an outcome. Nothing is charged, and test unlocks never count as real purchases.", { id: phase.order.orderId.slice(0, 16), plan: plan.name, price: planLabel })}
                </p>
                <div className="mt-3 grid gap-2">
                  <Button type="button" onClick={() => void simulate(phase.order, "success")}>
                    {tr("Simulate success")}
                  </Button>
                  <Button type="button" tone="quiet" onClick={() => void simulate(phase.order, "failure")}>
                    {tr("Simulate failure")}
                  </Button>
                  <Button type="button" tone="quiet" onClick={() => void simulate(phase.order, "cancel")}>
                    {tr("Simulate cancel")}
                  </Button>
                </div>
              </div>
            ) : null}

            {phase.kind === "cancelled" || phase.kind === "failed" ? (
              <>
                <p className="mt-3 text-sm" role="alert">
                  {phase.kind === "cancelled" ? tr("Payment cancelled. Nothing was charged and your CV is unchanged.") : phase.message}
                </p>
                <div className="mt-5 flex flex-col gap-2">
                  <Button type="button" onClick={() => void start()}>
                    {tr("Retry")}
                  </Button>
                  <Button type="button" tone="quiet" onClick={onClose}>
                    {tr("Close")}
                  </Button>
                </div>
              </>
            ) : null}

            {phase.kind === "success" ? (
              <>
                <p className="mt-3 text-sm" role="status">
                  {phase.test ? tr("TEST unlock verified by the server — your clean file is downloading. (Test only: no money moved.)") : tr("Payment verified — your clean file is downloading.")}
                </p>
                <div className="mt-5">
                  <Button type="button" onClick={onClose}>
                    {tr("Done")}
                  </Button>
                  <a href="/next-steps" className="ms-3 text-sm underline" data-testid="next-steps-link">
                    {tr("Next steps: tips and guides")}
                  </a>
                </div>
              </>
            ) : null}
          </div>
        )}
      </section>
    </div>
  );
}
