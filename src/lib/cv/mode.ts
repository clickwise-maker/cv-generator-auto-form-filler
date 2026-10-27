import { create } from "zustand";
import type { Personal } from "@/lib/cv/model";

export type StudioMode = "generator" | "filler";

type ModeState = {
  mode: StudioMode;
  /** Fields the last uploaded/read form asks for (null = no form read yet). */
  detected: Array<keyof Personal> | null;
  source: string;
  /** Raw text of the last form read, used to find labels the profile has no field for. */
  formText: string;
  setMode: (mode: StudioMode) => void;
  setDetected: (keys: Array<keyof Personal> | null, source?: string, formText?: string) => void;
};

/** UI-only state. Profile data stays in the single studio store, shared by both modes. */
export const useMode = create<ModeState>((set) => ({
  mode: "generator",
  detected: null,
  source: "",
  formText: "",
  setMode: (mode) => set({ mode }),
  setDetected: (detected, source = "", formText = "") => set({ detected, source, formText }),
}));
