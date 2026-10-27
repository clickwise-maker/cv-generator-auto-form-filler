import { useRef, useState } from "react";
import { FileUp, ScanLine } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/studio/ui";
import { applyProposals, proposeFromText, type Proposal } from "@/lib/cv/parse";
import { SAMPLE_CV, SAMPLE_FORM } from "@/lib/cv/model";
import { readDocument } from "@/lib/cv/read-document";
import { useStudio } from "@/lib/cv/store";
import { cn } from "@/lib/utils";
import { detectFormFields } from "@/lib/cv/form-fields";
import { MODE_TEXT, useMode } from "@/lib/cv/mode";

export function ScanCard() {
  const profile = useStudio((state) => state.profile);
  const commit = useStudio((state) => state.commitProfile);
  const loadSample = useStudio((state) => state.loadSample);
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [method, setMethod] = useState("");
  const [raw, setRaw] = useState("");
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const setDetected = useMode((state) => state.setDetected);
  const setMode = useMode((state) => state.setMode);
  const mode = useMode((state) => state.mode);
  const detected = useMode((state) => state.detected);
  const lang = useMode((state) => state.lang);

  function show(text: string, how: string) {
    const next = proposeFromText(text);
    setRaw(text);
    setMethod(how);
    setProposals(next);
    const asked = detectFormFields(text);
    setDetected(asked.length ? asked : null, how);
    // Arrived via the form-filler entry point (/#document-file): go straight to Form Filler mode.
    if (asked.length && typeof window !== "undefined" && window.location.hash === "#document-file") setMode("filler");
    setError(next.length ? "" : "Nothing recognizable was mapped. The extracted text is below if you want to copy from it.");
  }

  async function onFile(file: File) {
    setBusy(true);
    setError("");
    setProposals([]);
    setStatus("Opening the file…");
    try {
      const result = await readDocument(file, setStatus);
      setStatus("");
      show(result.text, result.method);
    } catch (err) {
      setStatus("");
      setError(err instanceof Error ? err.message : "Could not read that file.");
    } finally {
      setBusy(false);
    }
  }

  function apply() {
    const selected = proposals.filter((item) => item.selected);
    if (!selected.length) return;
    commit(applyProposals(profile, proposals), true);
    toast.success(`Mapped ${selected.length} items onto the form.`);
    setProposals([]);
  }

  return (
    <section className="rounded-2xl border border-line bg-sheet p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-forest text-sheet">
          <ScanLine className="size-5" aria-hidden />
        </span>
        <div>
          <h2 className="font-serif text-xl">Read a document</h2>
          <p className="mt-1 text-sm text-muted">
            PDF, photo, or image. The reader autofills the form on this device.
          </p>
          <p className="mt-1 text-xs text-muted">
            Free CV generator · auto form filler · international CB generator
          </p>
        </div>
      </div>

      <div
        className={cn(
          "mt-4 flex flex-col items-center gap-3 rounded-2xl border border-dashed px-4 py-6 text-center",
          drag ? "border-forest bg-brass-soft" : "border-line bg-paper",
        )}
        onDragOver={(event) => {
          event.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDrag(false);
          const file = event.dataTransfer.files[0];
          if (file) void onFile(file);
        }}
      >
        <FileUp className="size-5 text-forest" aria-hidden />
        <p className="text-sm">Drop a file here, or choose one from this device.</p>
        <Button type="button" tone="quiet" className="h-11" onClick={() => inputRef.current?.click()} disabled={busy}>
          {busy ? "Reading…" : "Choose a file"}
        </Button>
        <input
          id="document-file"
          ref={inputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.webp,.gif,.txt,.md,.csv,application/pdf,image/*,text/plain"
          className="sr-only"
          onChange={(event) => {
            const file = event.target.files?.[0];
            event.target.value = "";
            if (file) void onFile(file);
          }}
        />
      </div>

      {status ? (
        <p role="status" className="mt-3 text-sm text-forest">
          {status}
        </p>
      ) : null}
      {error ? (
        <p role="alert" className="mt-3 text-sm text-ink">
          {error}
        </p>
      ) : null}

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Button type="button" tone="ghost" className="h-11 px-4" onClick={() => show(SAMPLE_CV, "Sample CV")}>
          Read a sample CV
        </Button>
        <Button type="button" tone="ghost" className="h-11 px-4" onClick={() => show(SAMPLE_FORM, "Sample form")}>
          Read a sample form
        </Button>
        <Button type="button" tone="quiet" className="h-11 px-4" onClick={loadSample}>
          Fill the sample dossier
        </Button>
      </div>

      {detected?.length && mode !== "filler" ? (
        <button type="button" data-testid="use-filler" className="mt-3 h-11 rounded-full border border-forest px-4 text-sm font-medium text-forest" onClick={() => setMode("filler")}>
          {MODE_TEXT[lang].useFiller} ({detected.length})
        </button>
      ) : null}

      {proposals.length ? (
        <div className="mt-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-medium">
              {method ? `${method} · ` : ""}
              {proposals.length} mapped fields
            </h3>
            <button type="button" className="text-sm text-muted" onClick={() => setProposals([])}>
              Dismiss
            </button>
          </div>
          <ul className="mt-3 flex max-h-80 flex-col gap-2 overflow-auto">
            {proposals.map((item) => (
              <li key={item.id}>
                <label className="flex cursor-pointer gap-3 rounded-xl border border-line bg-paper px-3 py-2">
                  <input
                    type="checkbox"
                    className="mt-1 size-4"
                    checked={item.selected}
                    onChange={() =>
                      setProposals((list) =>
                        list.map((entry) => (entry.id === item.id ? { ...entry, selected: !entry.selected } : entry)),
                      )
                    }
                  />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium">{item.label}</span>
                    <span className="block text-sm break-words text-muted">{item.detail}</span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
          <Button type="button" className="mt-3" onClick={apply} disabled={!proposals.some((item) => item.selected)}>
            Apply to the form
          </Button>
        </div>
      ) : null}

      {raw ? (
        <details className="mt-4 text-sm">
          <summary className="cursor-pointer text-forest">Show extracted text</summary>
          <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap rounded-xl bg-paper p-3 text-xs text-ink">
            {raw}
          </pre>
        </details>
      ) : null}
    </section>
  );
}
