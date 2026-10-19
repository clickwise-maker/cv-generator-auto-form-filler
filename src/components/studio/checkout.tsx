import { useState } from "react";
import { Button } from "@/components/studio/ui";
import { cn } from "@/lib/utils";

type Method = "upi" | "card" | "bank";

const BANKS = ["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank"];

function orderId() {
  return `MD-${Date.now().toString(36).toUpperCase()}`;
}

export function PaymentGateway({
  open,
  fileLabel,
  busy,
  onClose,
  onPaid,
}: {
  open: boolean;
  fileLabel: string;
  busy: boolean;
  onClose: () => void;
  onPaid: (receipt: string) => void;
}) {
  const [method, setMethod] = useState<Method>("upi");
  const [upi, setUpi] = useState("");
  const [bank, setBank] = useState(BANKS[0]);
  const [error, setError] = useState("");

  if (!open) return null;

  function pay(receipt: string) {
    setError("");
    onPaid(receipt);
  }

  function payUpi() {
    const value = upi.trim();
    if (!/^[a-z0-9._-]{2,}@[a-z]{2,}$/i.test(value)) {
      setError("UPI ID aise likhein: name@okaxis");
      return;
    }
    pay(`${orderId()} · UPI ${value}`);
  }

  return (
    <div className="fixed inset-0 z-40 grid place-items-end bg-ink/40 p-4 sm:place-items-center" role="presentation" onClick={onClose}>
      <section
        role="dialog"
        aria-labelledby="pay-title"
        className="w-full max-w-md rounded-2xl border border-line bg-sheet p-5 text-ink"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="kicker text-forest">Payment gateway</p>
        <h2 id="pay-title" className="mt-2 font-serif text-2xl">
          Take this {fileLabel}
        </h2>
        <p className="mt-2 text-sm text-muted">
          Free download stays free. A paid desk order is recorded on this device only — no card number is collected, and no bank is charged.
        </p>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {(
            [
              ["upi", "UPI"],
              ["card", "Card"],
              ["bank", "Bank"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={cn(
                "h-11 rounded-full border text-sm font-medium",
                method === id ? "border-forest bg-forest text-sheet" : "border-line bg-paper text-ink",
              )}
              onClick={() => {
                setMethod(id);
                setError("");
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {method === "upi" ? (
          <label className="mt-4 flex flex-col gap-1.5 text-sm" htmlFor="upi-id">
            <span>UPI ID · ₹199 desk pack</span>
            <input
              id="upi-id"
              value={upi}
              onChange={(event) => setUpi(event.target.value)}
              placeholder="name@okaxis"
              autoComplete="off"
              className="h-12 rounded-xl border border-line bg-paper px-3 outline-none focus:border-forest"
            />
          </label>
        ) : null}

        {method === "card" ? (
          <p className="mt-4 text-sm text-muted">
            Card numbers are not typed into Meridian. This button records a card-desk order without a PAN or CVV.
          </p>
        ) : null}

        {method === "bank" ? (
          <label className="mt-4 flex flex-col gap-1.5 text-sm" htmlFor="bank-name">
            <span>Netbanking · ₹199 desk pack</span>
            <select
              id="bank-name"
              value={bank}
              onChange={(event) => setBank(event.target.value)}
              className="h-12 rounded-xl border border-line bg-paper px-3"
            >
              {BANKS.map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </label>
        ) : null}

        {error ? (
          <p role="alert" className="mt-3 text-sm text-forest">
            {error}
          </p>
        ) : null}

        <div className="mt-5 flex flex-col gap-2">
          {method === "upi" ? (
            <Button type="button" disabled={busy} onClick={payUpi}>
              {busy ? "Building…" : "Pay ₹199 with UPI"}
            </Button>
          ) : null}
          {method === "card" ? (
            <Button type="button" disabled={busy} onClick={() => pay(`${orderId()} · card desk`)}>
              {busy ? "Building…" : "Record card order"}
            </Button>
          ) : null}
          {method === "bank" ? (
            <Button type="button" disabled={busy} onClick={() => pay(`${orderId()} · ${bank}`)}>
              {busy ? "Building…" : "Pay ₹199 with this bank"}
            </Button>
          ) : null}
          <Button type="button" tone="quiet" disabled={busy} onClick={() => pay(`${orderId()} · free`)}>
            {busy ? "Building…" : "Download free"}
          </Button>
        </div>
      </section>
    </div>
  );
}
