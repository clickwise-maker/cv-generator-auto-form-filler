import { tr } from "@/lib/i18n/i18n";
import { useEffect, useRef, useState } from "react";
import { Eraser, PenLine, Trash2, Undo2, Upload } from "lucide-react";
import { Button, Field, TextInput } from "@/components/studio/ui";
import { useStudio } from "@/lib/cv/store";
import { checkSignatureFile, clearSignaturePatch, signaturePatch, trimToPng } from "@/lib/cv/signature";
import { useT } from "@/lib/i18n/i18n";
import { cn } from "@/lib/utils";

type Point = { x: number; y: number };

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(tr("image")));
    img.src = src;
  });
}

async function fileToSignature(file: File): Promise<string> {
  const url = URL.createObjectURL(file);
  try {
    const img = await loadImage(url);
    const scale = Math.min(1, 1200 / img.width, 600 / img.height);
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(img.width * scale));
    canvas.height = Math.max(1, Math.round(img.height * scale));
    canvas.getContext("2d")?.drawImage(img, 0, 0, canvas.width, canvas.height);
    return trimToPng(canvas);
  } finally {
    URL.revokeObjectURL(url);
  }
}

function DrawPad({ onSave }: { onSave: (dataUrl: string) => void }) {
  const t = useT();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [strokes, setStrokes] = useState<Point[][]>([]);
  const [undone, setUndone] = useState<Point[][]>([]);
  const drawing = useRef<Point[] | null>(null);

  const paint = (all: Point[][]) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#1c1915";
    for (const stroke of all) {
      ctx.beginPath();
      stroke.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
      if (stroke.length === 1) ctx.lineTo(stroke[0]!.x + 0.1, stroke[0]!.y);
      ctx.stroke();
    }
  };

  useEffect(() => paint(strokes), [strokes]);

  const at = (e: React.PointerEvent<HTMLCanvasElement>): Point => {
    const rect = e.currentTarget.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * e.currentTarget.width,
      y: ((e.clientY - rect.top) / rect.height) * e.currentTarget.height,
    };
  };

  return (
    <div className="flex flex-col gap-2">
      <canvas
        ref={canvasRef}
        width={600}
        height={200}
        data-testid="signature-canvas"
        aria-label={t("Draw your signature here")}
        className="h-36 w-full touch-none rounded-xl border border-dashed border-line bg-paper"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          const stroke = [at(e)];
          drawing.current = stroke;
          setUndone([]);
          setStrokes((s) => [...s, stroke]);
        }}
        onPointerMove={(e) => {
          if (!drawing.current) return;
          drawing.current.push(at(e));
          paint([...strokes.slice(0, -1), drawing.current]);
        }}
        onPointerUp={() => {
          const stroke = drawing.current;
          drawing.current = null;
          if (stroke) setStrokes((s) => [...s.slice(0, -1), [...stroke]]);
        }}
        onPointerCancel={() => (drawing.current = null)}
      />
      <div className="flex flex-wrap gap-2">
        <Button tone="quiet" className="h-10 px-3" disabled={!strokes.length} onClick={() => { setUndone((u) => [...u, strokes[strokes.length - 1]!]); setStrokes((s) => s.slice(0, -1)); }}>
          <Undo2 className="size-4 rtl:-scale-x-100" aria-hidden /> {t("Undo")}
        </Button>
        <Button tone="quiet" className="h-10 px-3" disabled={!undone.length} onClick={() => { setStrokes((s) => [...s, undone[undone.length - 1]!]); setUndone((u) => u.slice(0, -1)); }}>
          <Undo2 className="size-4 -scale-x-100 rtl:scale-x-100" aria-hidden /> {t("Redo")}
        </Button>
        <Button tone="quiet" className="h-10 px-3" disabled={!strokes.length} onClick={() => { setStrokes([]); setUndone([]); }}>
          <Eraser className="size-4" aria-hidden /> {t("Clear")}
        </Button>
        <Button
          className="h-10 px-4"
          data-testid="signature-save"
          disabled={!strokes.length}
          onClick={() => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const copy = document.createElement("canvas");
            copy.width = canvas.width;
            copy.height = canvas.height;
            copy.getContext("2d")?.drawImage(canvas, 0, 0);
            onSave(trimToPng(copy));
          }}
        >
          {t("Use this signature")}
        </Button>
      </div>
    </div>
  );
}

/** Signature section: upload an image OR draw one; preview; remove. Stored on the guest's profile. */
export function SignatureSection({ compact }: { compact?: boolean }) {
  const t = useT();
  const signature = useStudio((s) => s.profile.personal.signature);
  const place = useStudio((s) => s.profile.personal.signaturePlace);
  const date = useStudio((s) => s.profile.personal.signatureDate);
  const patch = useStudio((s) => s.patchPersonal);
  const [mode, setMode] = useState<"upload" | "draw">("draw");
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const save = (dataUrl: string) => {
    const next = signaturePatch(dataUrl);
    if (!next) {
      setError(t("That signature could not be saved. Try a smaller or clearer image."));
      return;
    }
    setError("");
    patch(next);
  };

  return (
    <div className="flex flex-col gap-3" data-testid="signature-section">
      {signature ? (
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-paper p-3">
          <img src={signature} alt={t("Your signature")} data-testid="signature-preview" className="h-16 max-w-56 object-contain" />
          <Button tone="quiet" className="h-10 px-3" data-testid="signature-remove" onClick={() => patch(clearSignaturePatch())}>
            <Trash2 className="size-4" aria-hidden /> {t("Remove signature")}
          </Button>
        </div>
      ) : (
        <>
          <div role="tablist" className="grid grid-cols-2 rounded-full border border-line bg-sheet p-1">
            {(["draw", "upload"] as const).map((m) => (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={mode === m}
                data-testid={`signature-${m}`}
                className={cn("flex h-9 items-center justify-center gap-2 rounded-full text-sm font-medium", mode === m ? "bg-forest text-sheet" : "text-muted")}
                onClick={() => setMode(m)}
              >
                {m === "draw" ? <PenLine className="size-4" aria-hidden /> : <Upload className="size-4" aria-hidden />}
                {m === "draw" ? t("Draw") : t("Upload image")}
              </button>
            ))}
          </div>
          {mode === "draw" ? (
            <DrawPad onSave={save} />
          ) : (
            <div className="flex flex-col gap-2">
              <input
                ref={fileRef}
                type="file"
                accept="image/png,image/jpeg"
                className="hidden"
                data-testid="signature-file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  e.target.value = "";
                  if (!file) return;
                  const check = checkSignatureFile(file);
                  if (!check.ok) {
                    setError(check.reason === "type" ? t("Use a PNG or JPG image.") : t("The image must be 1 MB or smaller."));
                    return;
                  }
                  void fileToSignature(file).then(save, () => setError(t("That image could not be read.")));
                }}
              />
              <Button tone="quiet" className="h-11 self-start px-4" onClick={() => fileRef.current?.click()}>
                <Upload className="size-4" aria-hidden /> {t("Choose PNG or JPG (max 1 MB)")}
              </Button>
              <p className="text-xs text-muted">{t("White or transparent margins are trimmed automatically.")}</p>
            </div>
          )}
        </>
      )}
      {error ? <p className="text-xs text-red-700" role="alert">{error}</p> : null}
      {!compact ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label={t("Place (signature)")} hint={t("Leave empty to use your city.")}>
            <TextInput dir="auto" value={place} onChange={(e) => patch({ signaturePlace: e.target.value })} />
          </Field>
          <Field label={t("Date (signature)")} hint={t("Leave empty to use the export date.")}>
            <TextInput type="date" value={date} onChange={(e) => patch({ signatureDate: e.target.value })} />
          </Field>
        </div>
      ) : null}
    </div>
  );
}
