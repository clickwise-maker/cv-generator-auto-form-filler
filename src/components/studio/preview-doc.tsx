import { tr } from "@/lib/i18n/i18n";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Ink } from "@/components/studio/ink";
import { UnlockDialog } from "@/components/studio/paywall";
import { Button, Select } from "@/components/studio/ui";
import { downloadPreviewPdf } from "@/lib/cv/export-pdf";
import { watermarkDataUrl } from "@/lib/cv/watermark";
import { WATERMARK_LINES, type ExportFormat, type PaywallStatus } from "@/lib/payments/config";
import { fetchStatus } from "@/lib/payments/client";
import {
  COPY,
  addressLines,
  degreeLine,
  displayName,
  dossierCode,
  formatSpan,
  formatWhen,
  lifeLines,
  phoneLine,
  placeLine,
  splitDisplayName,
  summaryLines,
} from "@/lib/cv/model";
import { layeredProfile, useStudio } from "@/lib/cv/store";
import { PreparedFor } from "@/components/studio/target-company";
import { signatureLine, templateSigns } from "@/lib/cv/signature";

export function PreviewColumn() {
  const settings = useStudio((state) => state.settings);
  const setSettings = useStudio((state) => state.setSettings);
  const [busy, setBusy] = useState(false);
  const [unlockFor, setUnlockFor] = useState<ExportFormat | null>(null);
  const [status, setStatus] = useState<PaywallStatus | null>(null);
  const closeUnlock = useCallback(() => setUnlockFor(null), []);

  useEffect(() => {
    void fetchStatus().then(setStatus);
    const open = () => {
      void fetchStatus().then(setStatus);
      setUnlockFor("pdf");
    };
    window.addEventListener("meridian-open-plans", open);
    if (window.location.hash === "#plans") open();
    return () => window.removeEventListener("meridian-open-plans", open);
  }, []);

  function previewPdf() {
    const { settings: current } = useStudio.getState();
    const profile = layeredProfile();
    setBusy(true);
    try {
      downloadPreviewPdf(profile, current, WATERMARK_LINES);
      toast.success(tr("Watermarked preview PDF downloaded."));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : tr("Could not build that file."));
    } finally {
      setBusy(false);
    }
  }

  async function unlock(format: ExportFormat) {
    setStatus(status ?? (await fetchStatus()));
    setUnlockFor(format);
  }

  return (
    <div className="lg:sticky lg:top-32">
      <div className="mb-3 grid grid-cols-2 gap-2">
        <label className="flex flex-col gap-1 text-xs font-medium text-muted">
          {tr("Headings")}
          <Select value={settings.locale} onChange={(event) => setSettings({ locale: event.target.value as typeof settings.locale })}>
            <option value="en">{tr("English")}</option>
            <option value="fr">{tr("Français")}</option>
            <option value="de">{tr("Deutsch")}</option>
            <option value="es">{tr("Español")}</option>
          </Select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium text-muted">
          {tr("Dates")}
          <Select value={settings.dateStyle} onChange={(event) => setSettings({ dateStyle: event.target.value as typeof settings.dateStyle })}>
            <option value="dmy">{tr("DD Mon YYYY")}</option>
            <option value="mdy">{tr("Mon DD, YYYY")}</option>
            <option value="iso">{tr("YYYY-MM-DD")}</option>
          </Select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium text-muted">
          {tr("Name order")}
          <Select value={settings.nameOrder} onChange={(event) => setSettings({ nameOrder: event.target.value as typeof settings.nameOrder })}>
            <option value="given-family">{tr("Given name first")}</option>
            <option value="family-given">{tr("Family name first")}</option>
          </Select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium text-muted">
          {tr("Paper")}
          <Select value={settings.paper} onChange={(event) => setSettings({ paper: event.target.value as typeof settings.paper })}>
            <option value="a4">A4</option>
            <option value="letter">{tr("US Letter")}</option>
          </Select>
        </label>
      </div>
      <div className="mb-3 rounded-2xl border border-line bg-sheet p-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-paper px-2.5 py-1 text-xs font-bold tracking-wide text-forest" aria-label={tr("Free preview")}>
            {tr("FREE PREVIEW")}
          </span>
          {status?.mode === "test" ? <span className="rounded-full bg-amber-200 px-2 py-0.5 text-xs font-bold text-amber-900">{tr("TEST MODE")}</span> : null}
          <p className="min-w-0 flex-1 text-xs text-muted">{tr("Editing, templates and the watermarked preview are free. A clean, watermark-free file needs an unlock — options appear when you download.")}</p>
        </div>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
          <Button type="button" onClick={() => void unlock("pdf")} disabled={busy}>
            {tr("Unlock Clean Download · PDF")}
          </Button>
          <Button type="button" tone="quiet" onClick={() => void unlock("docx")} disabled={busy}>
            {tr("Unlock Clean Download · Word")}
          </Button>
          <Button type="button" tone="quiet" onClick={previewPdf} disabled={busy}>
            {busy ? tr("Building…") : tr("Preview PDF (watermarked)")}
          </Button>
        </div>
      </div>
      <UnlockDialog open={unlockFor !== null} format={unlockFor ?? "pdf"} status={status} onClose={closeUnlock} />
      <p className="mb-3 text-xs text-muted">{tr("Click any line on the page to edit it. The form stays in step.")}</p>
      <article key={settings.template} className="cv-preview sheet-shadow rise relative overflow-hidden rounded-2xl border border-line bg-sheet" aria-describedby="preview-watermark-note">
        {settings.template === "consulate" ? <ConsulatePage /> : settings.template === "atlas" ? <AtlasPage /> : <MeridianPage />}
        <div
          className="cv-watermark pointer-events-none absolute inset-0 z-10"
          aria-hidden
          data-testid="cv-watermark"
          style={{ backgroundImage: watermarkDataUrl(WATERMARK_LINES, settings.paper), backgroundRepeat: "repeat-y", backgroundSize: "100% auto" }}
        />
      </article>
      <p id="preview-watermark-note" className="cv-print-note mt-2 text-xs text-muted">
        Preview carries a “{WATERMARK_LINES[1]}” watermark on every page. Use “Unlock Clean Download” for a clean file. (The watermark deters casual reuse; screenshots cannot be prevented.)
      </p>
    </div>
  );
}

function MeridianPage() {
  const personal = useStudio((state) => state.profile.personal);
  const experience = useStudio((state) => state.profile.experience);
  const education = useStudio((state) => state.profile.education);
  const skills = useStudio((state) => state.profile.skills);
  const languages = useStudio((state) => state.profile.languages);
  const certifications = useStudio((state) => state.profile.certifications);
  const settings = useStudio((state) => state.settings);
  const patch = useStudio((state) => state.patchPersonal);
  const updateExperience = useStudio((state) => state.updateExperience);
  const updateEducation = useStudio((state) => state.updateEducation);
  const copy = COPY[settings.locale];
  const name = displayName(personal, settings.nameOrder);

  return (
    <div className="paper">
      <header className="flex items-start gap-4 bg-forest px-5 py-6 text-sheet sm:px-8">
        <div className="min-w-0 flex-1">
        <Ink
          value={name}
          placeholder={tr(tr("Your name"))}
          onChange={(value) => patch(splitDisplayName(value, settings.nameOrder))}
          className="on-forest block font-serif text-3xl text-sheet"
        />
        <Ink
          value={personal.headline}
          placeholder={tr("Headline")}
          onChange={(value) => patch({ headline: value })}
          className="on-forest mt-1 block text-sm italic text-mist"
        />
        <PreparedFor className="mt-1 text-brass-soft" />
        <p className="mt-3 text-xs break-words text-mist">{[placeLine(personal), personal.email, phoneLine(personal)].filter(Boolean).join("  ·  ") || tr("City, email, phone")}</p>
        </div>
        {personal.photo ? <img src={personal.photo} alt="" className="size-16 shrink-0 rounded-md object-cover" /> : null}
      </header>
      <div className="h-1 bg-brass" />
      <div className="grid gap-6 px-5 py-6 sm:grid-cols-[minmax(0,1fr)_11rem] sm:px-8">
        <div className="min-w-0">
          <Section label={copy.profile} />
          <Ink multiline value={personal.summary} placeholder={tr("A short profile")} onChange={(value) => patch({ summary: value })} className="text-sm" />
          {experience.length ? (
            <>
              <Section label={copy.experience} />
              <div className="flex flex-col gap-4">
                {experience.map((role) => (
                  <div key={role.id}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <Ink value={role.title} placeholder={tr("Role")} onChange={(value) => updateExperience(role.id, { title: value })} className="font-serif text-base" />
                      <span className="text-xs italic text-muted">{formatSpan(role.start, role.end, role.current, settings)}</span>
                    </div>
                    <p className="text-sm italic text-muted">{[role.organization, role.location].filter(Boolean).join(" · ")}</p>
                    <Ink multiline value={role.summary} placeholder={tr("What changed in this role")} onChange={(value) => updateExperience(role.id, { summary: value })} className="mt-1 text-sm" />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="mt-6 text-sm italic text-muted">{tr("Roles you add show up here.")}</p>
          )}
          {education.length ? (
            <>
              <Section label={copy.education} />
              <div className="flex flex-col gap-3">
                {education.map((item) => (
                  <div key={item.id}>
                    <p className="font-serif text-base">{degreeLine(item) || tr("Study")}</p>
                    <Ink value={item.institution} placeholder={tr("Institution")} onChange={(value) => updateEducation(item.id, { institution: value })} className="text-sm italic text-muted" />
                    <p className="text-xs text-muted">{[item.location, formatSpan(item.start, item.end, false, settings)].filter(Boolean).join(" · ")}</p>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
        <aside className="min-w-0 text-sm">
          <Section label={copy.contact} />
          {addressLines(personal).map((line) => (
            <p key={line} className="break-words">{line}</p>
          ))}
          {personal.nationality ? <p className="mt-2">{copy.nationality}: {personal.nationality}</p> : null}
          {personal.linkedin ? <p className="mt-2 break-words">{personal.linkedin}</p> : null}
          {personal.website ? <p className="break-words">{personal.website}</p> : null}
          {languages.length ? (
            <>
              <Section label={copy.languages} />
              <ul>
                {languages.map((item) => (
                  <li key={item.id}>{item.name} · {item.level}</li>
                ))}
              </ul>
            </>
          ) : null}
          {skills.length ? (
            <>
              <Section label={copy.skills} />
              <ul>
                {skills.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          ) : null}
          {certifications.length ? (
            <>
              <Section label={copy.certifications} />
              <ul>
                {certifications.map((item) => (
                  <li key={item.id}>{[item.name, item.year].filter(Boolean).join(" · ")}</li>
                ))}
              </ul>
            </>
          ) : null}
          <LifeLines mode="cv" />
        </aside>
      </div>
      <div className="px-5 pb-6 sm:px-8">
        <SignatureLine />
      </div>
    </div>
  );
}

function AtlasPage() {
  const personal = useStudio((state) => state.profile.personal);
  const experience = useStudio((state) => state.profile.experience);
  const education = useStudio((state) => state.profile.education);
  const skills = useStudio((state) => state.profile.skills);
  const settings = useStudio((state) => state.settings);
  const patch = useStudio((state) => state.patchPersonal);
  const updateExperience = useStudio((state) => state.updateExperience);
  const copy = COPY[settings.locale];

  return (
    <div className="px-5 py-6 sm:px-8">
      <Ink
        value={displayName(personal, settings.nameOrder)}
        placeholder={tr(tr("Your name"))}
        onChange={(value) => patch(splitDisplayName(value, settings.nameOrder))}
        className="block font-serif text-3xl"
      />
      <Ink value={personal.headline} placeholder={tr("Headline")} onChange={(value) => patch({ headline: value })} className="mt-1 block text-sm text-forest" />
      <PreparedFor className="mt-1 text-muted" />
      <p className="mt-2 text-xs break-words text-muted">{[placeLine(personal), personal.email, phoneLine(personal), personal.linkedin].filter(Boolean).join("  |  ")}</p>
      <div className="mt-3 h-px bg-forest" />
      <p className="mt-4 text-xs text-muted">{tr("Date of birth, nationality, and passport stay off this résumé.")}</p>
      <Section label={copy.profile} />
      <Ink multiline value={personal.summary} placeholder={tr("A short profile")} onChange={(value) => patch({ summary: value })} className="text-sm" />
      {experience.map((role) => (
        <div key={role.id} className="mt-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <Ink value={role.title} placeholder={tr("Role")} onChange={(value) => updateExperience(role.id, { title: value })} className="font-medium" />
            <span className="text-xs text-muted">{formatSpan(role.start, role.end, role.current, settings)}</span>
          </div>
          <p className="text-sm text-muted">{[role.organization, role.location].filter(Boolean).join(", ")}</p>
          <ul className="mt-1 list-disc ps-4 text-sm">
            {summaryLines(role.summary).map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      ))}
      {education.length ? (
        <>
          <Section label={copy.education} />
          {education.map((item) => (
            <p key={item.id} className="text-sm">
              <span className="font-medium">{[degreeLine(item), item.institution].filter(Boolean).join(", ")}</span>
              <span className="text-muted"> · {[item.location, formatSpan(item.start, item.end, false, settings)].filter(Boolean).join(", ")}</span>
            </p>
          ))}
        </>
      ) : null}
      {skills.length ? (
        <>
          <Section label={copy.skills} />
          <p className="text-sm">{skills.join(" · ")}</p>
        </>
      ) : null}
      <LifeLines mode="cv" />
    </div>
  );
}

function ConsulatePage() {
  const profile = useStudio((state) => state.profile);
  const personal = profile.personal;
  const settings = useStudio((state) => state.settings);
  const patch = useStudio((state) => state.patchPersonal);
  const copy = COPY[settings.locale];
  const fields: { label: string; value: string; onChange?: (value: string) => void; placeholder: string }[] = [
    {
      label: tr("Full name"),
      value: displayName(personal, settings.nameOrder),
      placeholder: tr("Your name"),
      onChange: (value) => patch(splitDisplayName(value, settings.nameOrder)),
    },
    {
      label: copy.born,
      value: formatWhen(personal.dateOfBirth, settings.dateStyle),
      placeholder: tr("Date of birth"),
    },
    {
      label: copy.place,
      value: personal.placeOfBirth,
      placeholder: tr("Place of birth"),
      onChange: (value) => patch({ placeOfBirth: value }),
    },
    {
      label: copy.nationality,
      value: personal.nationality,
      placeholder: tr("Nationality"),
      onChange: (value) => patch({ nationality: value }),
    },
    {
      label: copy.passport,
      value: personal.passportNumber,
      placeholder: tr("Passport number"),
      onChange: (value) => patch({ passportNumber: value }),
    },
    {
      label: tr("Occupation"),
      value: personal.headline,
      placeholder: tr("Occupation"),
      onChange: (value) => patch({ headline: value }),
    },
    {
      label: tr("Email"),
      value: personal.email,
      placeholder: tr("Email"),
      onChange: (value) => patch({ email: value }),
    },
    {
      label: tr("Telephone"),
      value: phoneLine(personal),
      placeholder: tr("Telephone"),
    },
    {
      label: tr("Address"),
      value: addressLines(personal).join(", "),
      placeholder: tr("Address"),
    },
  ];

  return (
    <div className="paper px-5 py-6 sm:px-8">
      <p className="kicker text-forest">CV Studio {dossierCode(profile)}</p>
      {personal.photo ? <img src={personal.photo} alt="" className="mt-3 size-20 rounded-md object-cover" /> : null}
      <h3 className="mt-2 font-serif text-2xl">{copy.particulars}</h3>
      <PreparedFor className="mt-1 text-muted" />
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.label} className="border-b border-line pb-2">
            <p className="kicker text-muted">{field.label}</p>
            {field.onChange ? (
              <Ink value={field.value} placeholder={field.placeholder} onChange={field.onChange} className="mt-1 block text-sm" />
            ) : (
              <p className="mt-1 text-sm">{field.value || "—"}</p>
            )}
          </div>
        ))}
      </div>
      <Section label={copy.profile} />
      <Ink multiline value={personal.summary} placeholder={tr("Statement")} onChange={(value) => patch({ summary: value })} className="text-sm" />
      <p className="mt-6 text-xs italic text-muted">{copy.declaration}</p>
      <LifeLines mode="full" />
      <SignatureLine />
    </div>
  );
}

function LifeLines({ mode }: { mode: "cv" | "full" }) {
  const profile = useStudio((state) => state.profile);
  const settings = useStudio((state) => state.settings);
  const lines = lifeLines(profile, settings, mode);
  if (!lines.length) return null;
  return (
    <>
      <Section label={mode === "full" ? tr("Family and travel") : tr("More")} />
      {lines.map(([label, value], index) => (
        <p key={`${label}-${index}`} className="text-sm">
          <span className="text-muted">{label}. </span>
          {value}
        </p>
      ))}
    </>
  );
}

function SignatureLine() {
  const personal = useStudio((state) => state.profile.personal);
  const settings = useStudio((state) => state.settings);
  const line = templateSigns(settings) ? signatureLine(personal, settings) : null;
  if (!line) return null;
  return (
    <div className="mt-8 flex items-end justify-between gap-4" data-testid="cv-signature">
      <p className="text-sm">{line.text}</p>
      <div className="w-48 text-center">
        <img src={line.image} alt={line.label} className="mx-auto h-14 max-w-full object-contain" />
        <div className="border-t border-ink pt-1 text-xs text-muted">{line.label}</div>
      </div>
    </div>
  );
}

function Section({ label }: { label: string }) {
  return (
    <h3 className="kicker mb-2 mt-5 text-forest">
      <span className="border-b border-brass pb-1">{label}</span>
    </h3>
  );
}
