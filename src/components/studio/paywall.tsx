import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/studio/ui";
import type { ExportFormat, PaywallStatus } from "@/lib/payments/config";
import {
  ApiError,
  cancelOrder,
  createOrder,
  downloadClean,
  newIdempotencyKey,
  openRazorpay,
  readLocal,
  simulatePayment,
  verifyPayment,
  writeLocal,
  type PublicOrder,
} from "@/lib/payments/client";
import { useStudio } from "@/lib/cv/store";

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
  const idem = useRef<string>("");
  const closeRef = useRef<HTMLButtonElement>(null);
  const label = format === "docx" ? "Word (DOCX)" : "PDF";

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
    const { profile, settings } = useStudio.getState();
    setPhase({ kind: "loading", label: `Building your clean ${label}…` });
    try {
      await downloadClean(format, entitlementId, profile, settings);
      setPhase({ kind: "success", test });
    } catch (e) {
      if (e instanceof ApiError && (e.code === "edited_after_purchase" || e.code === "download_limit" || e.code === "test_entitlement")) {
        setPhase({ kind: "edited", message: e.message });
      } else setPhase({ kind: "failed", message: e instanceof Error ? e.message : "Download failed." });
    }
  }

  async function settled(order: PublicOrder) {
    if (order.status === "paid" && order.entitlementId) {
      writeLocal({ ...readLocal(), entitlementId: order.entitlementId, orderId: order.orderId, test: order.test });
      await fetchFile(order.entitlementId, order.test);
    } else if (order.status === "cancelled") setPhase({ kind: "cancelled" });
    else setPhase({ kind: "failed", message: "The payment did not go through. You were not charged for a clean file." });
  }

  async function start() {
    const local = readLocal();
    // Already unlocked? Try the existing entitlement first — never charge twice.
    if (local.entitlementId) {
      const { profile, settings } = useStudio.getState();
      setPhase({ kind: "loading", label: "Checking your existing unlock…" });
      try {
        await downloadClean(format, local.entitlementId, profile, settings);
        setPhase({ kind: "success", test: Boolean(local.test) });
        return;
      } catch (e) {
        if (!(e instanceof ApiError) || e.status === 0) {
          setPhase({ kind: "failed", message: e instanceof Error ? e.message : "Download failed." });
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
    setPhase({ kind: "loading", label: "Creating your order…" });
    try {
      const { profile, settings } = useStudio.getState();
      const order = await createOrder(profile, settings, idem.current);
      if (order.status !== "created") return settled(order);
      if (order.provider === "simulated") setPhase({ kind: "paying", order });
      else {
        const result = await openRazorpay(order, `Clean ${label} export`);
        if (result === "dismissed") {
          await cancelOrder(order.orderId).catch(() => undefined);
          idem.current = newIdempotencyKey();
          return setPhase({ kind: "cancelled" });
        }
        setPhase({ kind: "loading", label: "Verifying payment with the server…" });
        await settled(await verifyPayment(order.orderId, result.razorpay_payment_id, result.razorpay_signature));
      }
    } catch (e) {
      setPhase({ kind: "failed", message: e instanceof Error ? e.message : "Something went wrong." });
    }
  }

  async function simulate(order: PublicOrder, outcome: "success" | "failure" | "cancel") {
    setPhase({ kind: "loading", label: "TEST: server is simulating the payment…" });
    try {
      await settled(await simulatePayment(order.orderId, outcome));
    } catch (e) {
      setPhase({ kind: "failed", message: e instanceof Error ? e.message : "Simulated payment failed." });
    }
    idem.current = newIdempotencyKey();
  }

  return (
    <div className="fixed inset-0 z-40 grid place-items-end bg-ink/40 p-4 sm:place-items-center" role="presentation" onClick={() => !busy && onClose()}>
      <section role="dialog" aria-modal="true" aria-labelledby="unlock-title" aria-describedby="unlock-desc" className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-line bg-sheet p-5 text-ink" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start gap-2">
          <p className="kicker flex-1 text-forest">Unlock clean download</p>
          {isTest ? (
            <span className="rounded-full bg-amber-200 px-2 py-0.5 text-xs font-bold text-amber-900" role="note">
              TEST MODE — no real payment
            </span>
          ) : status.mode === "live" ? (
            <span className="rounded-full bg-forest px-2 py-0.5 text-xs font-bold text-sheet">Real payment</span>
          ) : null}
          <button ref={closeRef} type="button" aria-label="Close" className="-mt-1 h-9 w-9 rounded-full text-lg" disabled={busy} onClick={onClose}>
            ×
          </button>
        </div>
        <h2 id="unlock-title" className="mt-2 font-serif text-2xl">
          Clean {label}
        </h2>

        {status.mode === "unavailable" ? (
          <div id="unlock-desc">
            <p className="mt-3 text-sm" role="status">
              {status.message}
            </p>
            <div className="mt-5">
              <Button type="button" onClick={onClose}>
                OK
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
                <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                  <dt className="text-muted">Price</dt>
                  <dd className="font-semibold">
                    {status.priceLabel} one-time{isTest ? " (TEST — not charged)" : ""}
                  </dd>
                  <dt className="text-muted">You get</dt>
                  <dd>Watermark-free PDF and Word of this CV, generated from your CV data.</dd>
                  <dt className="text-muted">Edits</dt>
                  <dd>{status.policyText}</dd>
                </dl>
                <p className="mt-3 text-xs text-muted">{status.message} Card/UPI details are entered only on the payment provider's page, never here.</p>
                <div className="mt-5 flex flex-col gap-2">
                  <Button type="button" onClick={() => void start()}>
                    {isTest ? `Continue to TEST payment (${status.priceLabel})` : `Pay ${status.priceLabel} and unlock`}
                  </Button>
                  <Button type="button" tone="quiet" onClick={onClose}>
                    Not now
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
                <p className="text-sm font-semibold">Simulated payment — TEST ONLY</p>
                <p className="mt-1 text-xs text-muted">
                  Order {phase.order.orderId.slice(0, 16)}… · {status.priceLabel}. These buttons ask the server to simulate an outcome. Nothing is charged, and test unlocks never count as real purchases.
                </p>
                <div className="mt-3 grid gap-2">
                  <Button type="button" onClick={() => void simulate(phase.order, "success")}>
                    Simulate success
                  </Button>
                  <Button type="button" tone="quiet" onClick={() => void simulate(phase.order, "failure")}>
                    Simulate failure
                  </Button>
                  <Button type="button" tone="quiet" onClick={() => void simulate(phase.order, "cancel")}>
                    Simulate cancel
                  </Button>
                </div>
              </div>
            ) : null}

            {phase.kind === "cancelled" || phase.kind === "failed" ? (
              <>
                <p className="mt-3 text-sm" role="alert">
                  {phase.kind === "cancelled" ? "Payment cancelled. Nothing was charged and your CV is unchanged." : phase.message}
                </p>
                <div className="mt-5 flex flex-col gap-2">
                  <Button type="button" onClick={() => void start()}>
                    Retry
                  </Button>
                  <Button type="button" tone="quiet" onClick={onClose}>
                    Close
                  </Button>
                </div>
              </>
            ) : null}

            {phase.kind === "success" ? (
              <>
                <p className="mt-3 text-sm" role="status">
                  {phase.test ? "TEST unlock verified by the server — your clean file is downloading. (Test only: no money moved.)" : "Payment verified — your clean file is downloading."}
                </p>
                <div className="mt-5">
                  <Button type="button" onClick={onClose}>
                    Done
                  </Button>
                </div>
              </>
            ) : null}
          </div>
        )}
      </section>
    </div>
  );
}
