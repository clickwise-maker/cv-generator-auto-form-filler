import { useEffect, useMemo, useRef, useState } from "react";
import { DocOverride, sampleState } from "@/components/studio/doc-context";
import { TemplatePage } from "@/components/studio/preview-doc";
import type { TemplateId } from "@/lib/cv/model";

const PAGE_W = 720;

/** A real template rendered with sample data, scaled to fit its box (read-only). */
export function ScaledPage({ template, className = "", full = false }: { template: TemplateId; className?: string; full?: boolean }) {
  const box = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.4);
  const [h, setH] = useState(0);
  const state = useMemo(() => sampleState(template), [template]);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setScale(el.clientWidth / PAGE_W);
      setH(inner.current?.offsetHeight ?? 0);
    });
    ro.observe(el);
    if (inner.current) ro.observe(inner.current);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={box} className={`relative w-full overflow-hidden bg-sheet ${full ? "" : "aspect-[1/1.414]"} ${className}`} style={full ? { height: h * scale } : undefined} data-testid={`thumb-${template}`}>
      <div ref={inner} inert aria-hidden dir="ltr" className="pointer-events-none absolute left-0 top-0 origin-top-left select-none" style={{ width: PAGE_W, transform: `scale(${scale})` }}>
        <DocOverride.Provider value={state}>
          <div className="cv-preview bg-sheet">
            <TemplatePage template={template} />
          </div>
        </DocOverride.Provider>
      </div>
    </div>
  );
}
