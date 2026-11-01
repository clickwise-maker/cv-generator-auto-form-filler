import { createContext, useContext } from "react";
import { useStudio } from "@/lib/cv/store";
import { defaultSettings, sampleProfile, type TemplateId } from "@/lib/cv/model";

type StudioState = ReturnType<typeof useStudio.getState>;

/** When set, CV page components render this read-only state instead of the editor store (gallery / hero mockups). */
export const DocOverride = createContext<StudioState | null>(null);

export function useDoc<T>(select: (s: StudioState) => T): T {
  const override = useContext(DocOverride);
  const live = useStudio(select);
  return override ? select(override) : live;
}

/** Read-only sample state for a template: sample profile, default settings, every action a no-op. */
export function sampleState(template: TemplateId): StudioState {
  const base = useStudio.getState();
  const out = {} as Record<string, unknown>;
  for (const [k, v] of Object.entries(base)) out[k] = typeof v === "function" ? () => {} : v;
  return { ...(out as StudioState), profile: sampleProfile(), settings: { ...defaultSettings(), template }, target: { ...base.target, on: false } };
}
