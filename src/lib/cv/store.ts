import { create } from "zustand";
import { readConsent } from "../privacy/consent.ts";
import { mergeCustom } from "./missing.ts";
import {
  defaultSettings,
  emptyChild,
  emptyEducation,
  emptyExperience,
  emptyPersonal,
  emptyProfile,
  emptyTrip,
  sampleProfile,
  uid,
  type Child,
  type Trip,
  type Education,
  type Experience,
  type Language,
  type Certification,
  type Personal,
  type CustomDetail,
  type Profile,
  type Settings,
} from "@/lib/cv/model";

const STORAGE = "meridian.dossier.v1";
const SESSION = "meridian.session.v1";

type StudioState = {
  hydrated: boolean;
  verifiedEmail: string | null;
  profile: Profile;
  settings: Settings;
  undo: Profile | null;
  tab: "compose" | "preview";
  hydrate: () => void;
  verify: (email: string) => void;
  signOut: () => void;
  setTab: (tab: "compose" | "preview") => void;
  setSettings: (patch: Partial<Settings>) => void;
  patchPersonal: (patch: Partial<Personal>) => void;
  commitProfile: (profile: Profile, rememberUndo?: boolean) => void;
  undoProfile: () => void;
  addExperience: () => void;
  updateExperience: (id: string, patch: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, patch: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addLanguage: () => void;
  updateLanguage: (id: string, patch: Partial<Language>) => void;
  removeLanguage: (id: string) => void;
  addCertification: () => void;
  updateCertification: (id: string, patch: Partial<Certification>) => void;
  removeCertification: (id: string) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  addChild: () => void;
  updateChild: (id: string, patch: Partial<Child>) => void;
  removeChild: (id: string) => void;
  addTrip: () => void;
  updateTrip: (id: string, patch: Partial<Trip>) => void;
  removeTrip: (id: string) => void;
  addCustomDetail: (label?: string, value?: string) => string;
  updateCustomDetail: (id: string, patch: Partial<CustomDetail>) => void;
  removeCustomDetail: (id: string) => void;
  /** Save answers from the form filler's missing-fields pop-up back to the profile. */
  saveAnswers: (fields: Partial<Personal>, custom: { label: string; value: string }[]) => void;
  loadSample: () => void;
  clearDossier: () => void;
};

function persist(profile: Profile, settings: Settings, verifiedEmail: string | null) {
  try {
    // DPDP: nothing personal is written to this browser until the user has consented.
    if (!readConsent()) return;
    localStorage.setItem(STORAGE, JSON.stringify({ profile, settings }));
    if (verifiedEmail) sessionStorage.setItem(SESSION, verifiedEmail);
    else sessionStorage.removeItem(SESSION);
  } catch {
    // Private mode and some embedded previews block storage. The desk still opens in memory.
  }
}

function mergeProfile(raw: unknown): Profile {
  const base = emptyProfile();
  if (!raw || typeof raw !== "object") return base;
  const data = raw as Partial<Profile>;
  return {
    personal: {
      ...emptyPersonal(),
      ...(data.personal ?? {}),
      customDetails: Array.isArray(data.personal?.customDetails) ? data.personal.customDetails : [],
    },
    experience: Array.isArray(data.experience) ? data.experience : [],
    education: Array.isArray(data.education) ? data.education : [],
    skills: Array.isArray(data.skills) ? data.skills.filter((item) => typeof item === "string") : [],
    languages: Array.isArray(data.languages) ? data.languages : [],
    certifications: Array.isArray(data.certifications) ? data.certifications : [],
    children: Array.isArray(data.children) ? data.children : [],
    travel: Array.isArray(data.travel) ? data.travel : [],
  };
}

export const useStudio = create<StudioState>((set, get) => {
  const write = (partial: Partial<StudioState>) => {
    const next = { ...get(), ...partial };
    persist(next.profile, next.settings, next.verifiedEmail);
    set(partial);
  };

  return {
    hydrated: false,
    verifiedEmail: null,
    profile: emptyProfile(),
    settings: defaultSettings(),
    undo: null,
    tab: "compose",
    hydrate: () => {
      if (get().hydrated) return;
      try {
        const saved = localStorage.getItem(STORAGE);
        const parsed = saved ? (JSON.parse(saved) as { profile?: unknown; settings?: Partial<Settings> }) : null;
        const email = sessionStorage.getItem(SESSION);
        set({
          hydrated: true,
          verifiedEmail: get().verifiedEmail || email,
          profile: mergeProfile(parsed?.profile),
          settings: { ...defaultSettings(), ...(parsed?.settings ?? {}) },
        });
      } catch {
        set({ hydrated: true });
      }
    },
    verify: (email) => {
      const profile = get().profile;
      const personal =
        profile.personal.email || !email.includes("@")
          ? profile.personal
          : { ...profile.personal, email };
      write({ hydrated: true, verifiedEmail: email, profile: { ...profile, personal } });
    },
    signOut: () => {
      write({ verifiedEmail: null });
    },
    setTab: (tab) => set({ tab }),
    setSettings: (patch) => write({ settings: { ...get().settings, ...patch } }),
    patchPersonal: (patch) =>
      write({ profile: { ...get().profile, personal: { ...get().profile.personal, ...patch } } }),
    commitProfile: (profile, rememberUndo = true) =>
      write({ profile, undo: rememberUndo ? get().profile : get().undo }),
    undoProfile: () => {
      const previous = get().undo;
      if (!previous) return;
      write({ profile: previous, undo: null });
    },
    addExperience: () =>
      write({ profile: { ...get().profile, experience: [...get().profile.experience, emptyExperience()] } }),
    updateExperience: (id, patch) =>
      write({
        profile: {
          ...get().profile,
          experience: get().profile.experience.map((item) => (item.id === id ? { ...item, ...patch } : item)),
        },
      }),
    removeExperience: (id) =>
      write({
        profile: { ...get().profile, experience: get().profile.experience.filter((item) => item.id !== id) },
      }),
    addEducation: () =>
      write({ profile: { ...get().profile, education: [...get().profile.education, emptyEducation()] } }),
    updateEducation: (id, patch) =>
      write({
        profile: {
          ...get().profile,
          education: get().profile.education.map((item) => (item.id === id ? { ...item, ...patch } : item)),
        },
      }),
    removeEducation: (id) =>
      write({
        profile: { ...get().profile, education: get().profile.education.filter((item) => item.id !== id) },
      }),
    addLanguage: () =>
      write({
        profile: {
          ...get().profile,
          languages: [...get().profile.languages, { id: uid(), name: "", level: "B2" }],
        },
      }),
    updateLanguage: (id, patch) =>
      write({
        profile: {
          ...get().profile,
          languages: get().profile.languages.map((item) => (item.id === id ? { ...item, ...patch } : item)),
        },
      }),
    removeLanguage: (id) =>
      write({
        profile: { ...get().profile, languages: get().profile.languages.filter((item) => item.id !== id) },
      }),
    addCertification: () =>
      write({
        profile: {
          ...get().profile,
          certifications: [...get().profile.certifications, { id: uid(), name: "", issuer: "", year: "" }],
        },
      }),
    updateCertification: (id, patch) =>
      write({
        profile: {
          ...get().profile,
          certifications: get().profile.certifications.map((item) =>
            item.id === id ? { ...item, ...patch } : item,
          ),
        },
      }),
    removeCertification: (id) =>
      write({
        profile: {
          ...get().profile,
          certifications: get().profile.certifications.filter((item) => item.id !== id),
        },
      }),
    addSkill: (skill) => {
      const cleaned = skill.trim();
      if (!cleaned) return;
      const exists = get().profile.skills.some((item) => item.toLowerCase() === cleaned.toLowerCase());
      if (exists) return;
      write({ profile: { ...get().profile, skills: [...get().profile.skills, cleaned] } });
    },
    removeSkill: (skill) =>
      write({ profile: { ...get().profile, skills: get().profile.skills.filter((item) => item !== skill) } }),
    addChild: () => write({ profile: { ...get().profile, children: [...get().profile.children, emptyChild()] } }),
    updateChild: (id, patch) =>
      write({
        profile: {
          ...get().profile,
          children: get().profile.children.map((item) => (item.id === id ? { ...item, ...patch } : item)),
        },
      }),
    removeChild: (id) =>
      write({ profile: { ...get().profile, children: get().profile.children.filter((item) => item.id !== id) } }),
    addTrip: () => write({ profile: { ...get().profile, travel: [...get().profile.travel, emptyTrip()] } }),
    updateTrip: (id, patch) =>
      write({
        profile: {
          ...get().profile,
          travel: get().profile.travel.map((item) => (item.id === id ? { ...item, ...patch } : item)),
        },
      }),
    removeTrip: (id) =>
      write({ profile: { ...get().profile, travel: get().profile.travel.filter((item) => item.id !== id) } }),
    addCustomDetail: (label = "", value = "") => {
      const id = uid();
      const personal = get().profile.personal;
      write({ profile: { ...get().profile, personal: { ...personal, customDetails: [...personal.customDetails, { id, label, value }] } } });
      return id;
    },
    updateCustomDetail: (id, patch) => {
      const personal = get().profile.personal;
      write({
        profile: {
          ...get().profile,
          personal: { ...personal, customDetails: personal.customDetails.map((item) => (item.id === id ? { ...item, ...patch } : item)) },
        },
      });
    },
    removeCustomDetail: (id) => {
      const personal = get().profile.personal;
      write({
        profile: { ...get().profile, personal: { ...personal, customDetails: personal.customDetails.filter((item) => item.id !== id) } },
      });
    },
    saveAnswers: (fields, custom) => {
      const personal = get().profile.personal;
      write({ profile: { ...get().profile, personal: { ...personal, ...fields, customDetails: mergeCustom(personal.customDetails, custom) } } });
    },
    loadSample: () => write({ profile: sampleProfile(), undo: get().profile }),
    clearDossier: () => {
      const email = get().profile.personal.email || get().verifiedEmail || "";
      write({
        profile: { ...emptyProfile(), personal: { ...emptyPersonal(), email } },
        undo: get().profile,
      });
    },
  };
});
