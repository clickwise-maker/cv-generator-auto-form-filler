import { useEffect, useState, type ReactNode } from "react";
import { Copy, Share2, Users, Briefcase, CheckCircle2, ClipboardList, CreditCard, FilePlus2, FileText, PenLine, Upload, Wallet } from "lucide-react";
import type { Credits } from "@/lib/payments/config";
import { fetchCredits, fingerprint, readGuest, type GuestState } from "@/lib/payments/client";
import { useStudio } from "@/lib/cv/store";
import { emptyProfile, TEMPLATES } from "@/lib/cv/model";
import { purgeOrphanClientDrafts, tagClientDraft } from "@/lib/clients/local-drafts";
import { createClientLink, deleteClient, getClient, listClients, revokeClientLinks, type ClientSummary } from "@/lib/clients/client";
import { WithdrawButton } from "@/components/privacy/consent-ui";
import { readConsent, RETENTION_DAYS, SUPPORT_EMAIL } from "@/lib/privacy/consent";

/** All dashboard copy in one place so it can be translated later. */
export const DASH_TEXT = {
  title: "Your dashboard",
  subtitle: "Everything you have created with CV Studio, saved in this browser.",
  guestBadge: "Guest session · saved in this browser",
  cvsMade: "CVs made",
  cvsInProgress: "CVs in progress",
  balance: "Remaining balance",
  balanceCv: "CV downloads",
  balanceFill: "Form fills",
  formFillsUsed: "Form fills used",
  companiesApplied: "Companies applied",
  planTitle: "Your plan",
  noPlan: "No active plan",
  noPlanHint: "Pick a plan to download clean CVs and auto-fill forms.",
  viewPlans: "View plans",
  validUntil: "Valid until",
  noExpiry: "No expiry date",
  test: "TEST",
  companyLimit: "Company limit",
  quickActions: "Quick actions",
  buildCv: "Build new CV",
  fillForm: "Fill a form",
  recentCvs: "Recent CVs",
  draft: "Draft · in progress",
  exported: "Downloaded",
  untitled: "Untitled CV",
  exportedCv: "Downloaded CV",
  noCvs: "No CVs yet. Start building your first CV — it only takes a few minutes.",
  companiesTitle: "Companies applied",
  noCompanies: "No applications yet. Use “Fill a form” to apply to a company.",
  clientsTitle: "Clients",
  clientsHint: "Share this link with a client. They fill their details once; you can then fill any form for them.",
  businessName: "Your business name (shown to clients)",
  createLink: "Create share link",
  copy: "Copy link",
  copied: "Copied!",
  whatsapp: "Share on WhatsApp",
  noClients: "No client details yet. Share the link above.",
  submitted: "Submitted",
  fillForClient: "Fill form for this client",
  refresh: "Refresh",
  shareMsg: "Please fill your details here so we can fill your form:",
  privacyTitle: "Privacy & data / गोपनीयता व डेटा",
  privacyHint: "Your CVs, drafts and plan key are stored only in this browser. You can withdraw consent and delete them at any time.",
  consentGiven: "Consent given",
  deleteClient: "Delete client data",
  confirmDeleteClient: "Permanently delete this client's details from CV Studio?",
  revokeLink: "Revoke share link",
  confirmRevoke: "Revoke the share link? Clients will no longer be able to open it. You can create a new link later.",
  revoked: "Link revoked.",
  retention: `Client details are auto-deleted after ${RETENTION_DAYS} days, or earlier on request.`,
} as const;

/** Opens the download paywall (where plans live). Plans are never shown elsewhere. */
export function openPlans() {
  // The paywall lives in the editor; from the standalone dashboard route, go there.
  if (window.location.pathname.startsWith("/dashboard")) {
    window.location.href = "/#plans";
    return;
  }
  window.dispatchEvent(new Event("meridian-open-plans"));
}

function StatCard({ icon, label, value, testId, children }: { icon: ReactNode; label: string; value: string | number; testId: string; children?: ReactNode }) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-line bg-paper p-4 shadow-sm">
      <div className="flex items-center gap-2 text-muted">
        <span className="grid size-8 place-items-center rounded-lg bg-forest/10 text-forest" aria-hidden>
          {icon}
        </span>
        <p className="text-xs font-medium">{label}</p>
      </div>
      <p className="font-serif text-3xl leading-none" data-testid={testId}>
        {value}
      </p>
      {children}
    </div>
  );
}

function Bar({ left, max, label }: { left: number; max: number; label: string }) {
  const pct = max > 0 ? Math.max(0, Math.min(100, (left / max) * 100)) : 0;
  return (
    <div>
      <div className="flex justify-between text-[11px] text-muted">
        <span>{label}</span>
        <span>
          {left}/{max}
        </span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-line" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={max} aria-valuenow={left}>
        <div className="h-full rounded-full bg-forest" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Panel({ title, children, testId }: { title: string; children: ReactNode; testId?: string }) {
  return (
    <div className="rounded-xl border border-line bg-paper p-4 shadow-sm" data-testid={testId}>
      <h3 className="kicker text-muted">{title}</h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}

/** Guest dashboard — local storage only, no account needed. */
export function Dashboard() {
  const T = DASH_TEXT;
  const profile = useStudio((s) => s.profile);
  const settings = useStudio((s) => s.settings);
  const [guest, setGuest] = useState<GuestState | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);

  useEffect(() => {
    const load = () => {
      const g = readGuest();
      setGuest(g);
      if (g.planEntitlementId) fetchCredits(g.planEntitlementId).then(setCredits, () => setCredits(null));
      else setCredits(null);
    };
    load();
    window.addEventListener("meridian-guest", load);
    return () => window.removeEventListener("meridian-guest", load);
  }, []);

  if (!guest) return null;
  const hasContent = JSON.stringify(profile) !== JSON.stringify(emptyProfile());
  const currentFp = fingerprint(profile, settings);
  const currentExported = guest.exported.includes(currentFp);
  const inProgress = hasContent && !currentExported ? 1 : 0;
  const cvLeft = credits?.cvGenerationsLeft ?? 0;
  const fillLeft = credits?.formFillsLeft ?? 0;
  const balance = cvLeft + fillLeft;
  const companies = guest.companies;
  const companiesCount = credits ? credits.companiesUsed : companies.length;
  const draftName = [profile.personal.givenName, profile.personal.familyName].filter(Boolean).join(" ") || T.untitled;
  const templateLabel = TEMPLATES.find((t) => t.id === settings.template)?.label ?? "";
  const pastExports = guest.exported.filter((fp) => !(hasContent && fp === currentFp));

  return (
    <section className="rounded-2xl border border-line bg-sheet p-4 sm:p-6" aria-labelledby="dash-title" data-testid="dashboard">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
        <div className="flex-1">
          <h2 id="dash-title" className="font-serif text-2xl text-forest">
            {T.title}
          </h2>
          <p className="text-sm text-muted">{T.subtitle}</p>
        </div>
        <span className="self-start rounded-full bg-paper px-3 py-1 text-xs text-muted">{T.guestBadge}</span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <a href="/" className="flex h-12 items-center justify-center gap-2 rounded-full bg-forest px-4 text-sm font-medium text-sheet" data-testid="dash-build-cv">
          <FilePlus2 className="size-4" aria-hidden /> {T.buildCv}
        </a>
        <a href="/#document-file" className="flex h-12 items-center justify-center gap-2 rounded-full border border-forest px-4 text-sm font-medium text-forest" data-testid="dash-fill-form">
          <Upload className="size-4" aria-hidden /> {T.fillForm}
        </a>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3">
        <StatCard icon={<CheckCircle2 className="size-4" />} label={T.cvsMade} value={guest.exported.length} testId="dash-completed" />
        <StatCard icon={<PenLine className="size-4" />} label={T.cvsInProgress} value={inProgress} testId="dash-drafts" />
        <div className="col-span-2 lg:col-span-1">
          <StatCard icon={<Wallet className="size-4" />} label={T.balance} value={balance} testId="dash-balance">
            <span className="sr-only" data-testid="dash-cv-credits">{cvLeft}</span>
            <span className="sr-only" data-testid="dash-fill-credits">{fillLeft}</span>
            <Bar label={T.balanceCv} left={cvLeft} max={credits?.cvGenerationsMax ?? 0} />
            <Bar label={T.balanceFill} left={fillLeft} max={credits?.formFillsMax ?? 0} />
          </StatCard>
        </div>
        <StatCard icon={<ClipboardList className="size-4" />} label={T.formFillsUsed} value={guest.formFillsUsed} testId="dash-fills-used" />
        <StatCard icon={<Briefcase className="size-4" />} label={T.companiesApplied} value={companiesCount} testId="dash-companies" />
        <div className="col-span-2 lg:col-span-1">
          <Panel title={T.planTitle} testId="dash-plan">
            <div className="flex items-start gap-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-forest/10 text-forest" aria-hidden>
                <CreditCard className="size-4" />
              </span>
              {credits ? (
                <div className="text-sm">
                  <p className="font-medium" data-testid="dash-plan-name">
                    {credits.planName}
                    {credits.test && !credits.planName.includes(`(${T.test})`) ? ` (${T.test})` : ""}
                  </p>
                  <p className="text-xs text-muted">
                    {credits.expiresAt ? `${T.validUntil} ${new Date(credits.expiresAt).toLocaleDateString()}` : T.noExpiry}
                  </p>
                  {credits.companyLimit ? (
                    <p className="text-xs text-muted">
                      {T.companyLimit}: {credits.companiesUsed}/{credits.companyLimit}
                    </p>
                  ) : null}
                  {balance === 0 ? (
                    <button type="button" className="mt-2 font-medium text-forest underline" onClick={openPlans}>
                      {T.viewPlans}
                    </button>
                  ) : null}
                </div>
              ) : (
                <div className="text-sm">
                  <p className="font-medium" data-testid="dash-plan-name">{T.noPlan}</p>
                  <p className="text-xs text-muted">{T.noPlanHint}</p>
                  <button type="button" className="mt-2 font-medium text-forest underline" onClick={openPlans} data-testid="dash-view-plans">
                    {T.viewPlans}
                  </button>
                </div>
              )}
            </div>
          </Panel>
        </div>
      </div>

      <PrivacyCard />
      {credits?.clients && guest.planEntitlementId ? <ClientsCard entitlementId={guest.planEntitlementId} guestId={guest.guestId} /> : null}

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <Panel title={T.recentCvs} testId="dash-recent">
          {hasContent || pastExports.length ? (
            <ul className="divide-y divide-line text-sm">
              {hasContent ? (
                <li className="flex items-center gap-3 py-2">
                  <FileText className="size-4 shrink-0 text-forest" aria-hidden />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{draftName}</p>
                    <p className="truncate text-xs text-muted">
                      {[profile.personal.headline, templateLabel].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-sheet px-2 py-0.5 text-[11px] text-muted">{currentExported ? T.exported : T.draft}</span>
                </li>
              ) : null}
              {pastExports
                .slice(-5)
                .reverse()
                .map((fp) => (
                  <li key={fp} className="flex items-center gap-3 py-2">
                    <CheckCircle2 className="size-4 shrink-0 text-forest" aria-hidden />
                    <p className="flex-1 truncate">
                      {T.exportedCv} <span className="text-xs text-muted">#{fp.slice(0, 6)}</span>
                    </p>
                    <span className="shrink-0 rounded-full bg-sheet px-2 py-0.5 text-[11px] text-muted">{T.exported}</span>
                  </li>
                ))}
            </ul>
          ) : (
            <p className="text-sm text-muted">{T.noCvs}</p>
          )}
        </Panel>
        <Panel title={T.companiesTitle} testId="dash-companies-list">
          {companies.length ? (
            <ul className="flex flex-wrap gap-2">
              {companies.map((c) => (
                <li key={c} className="flex items-center gap-1 rounded-full border border-line bg-sheet px-3 py-1 text-sm">
                  <Briefcase className="size-3 text-forest" aria-hidden /> {c}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted">{T.noCompanies}</p>
          )}
        </Panel>
      </div>
    </section>
  );
}


function PrivacyCard() {
  const T = DASH_TEXT;
  const [at, setAt] = useState<number | null>(null);
  useEffect(() => setAt(readConsent()?.at ?? null), []);
  return (
    <div className="mt-4">
      <Panel title={T.privacyTitle} testId="dash-privacy">
        <p className="text-sm text-muted">{T.privacyHint}</p>
        {at ? (
          <p className="mt-1 text-xs text-muted" data-testid="consent-at">
            {T.consentGiven}: {new Date(at).toLocaleString()}
          </p>
        ) : null}
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <WithdrawButton className="h-11 rounded-full border-2 border-red-700 px-4 text-sm font-medium text-red-700" label="Withdraw consent & delete my data" />
          <a href="/privacy" className="text-sm text-forest underline">Privacy notice</a>
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-sm text-forest underline">{SUPPORT_EMAIL}</a>
        </div>
      </Panel>
    </div>
  );
}

/** Commercial plan only: share an intake link and fill forms with a client's saved details. */
function ClientsCard({ entitlementId, guestId }: { entitlementId: string; guestId: string }) {
  const T = DASH_TEXT;
  const commitProfile = useStudio((s) => s.commitProfile);
  const [biz, setBiz] = useState("");
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [clients, setClients] = useState<ClientSummary[]>([]);
  const [err, setErr] = useState("");

  const purge = (live: string[] | null, removedId?: string) => {
    try {
      if (purgeOrphanClientDrafts(localStorage, live, removedId)) {
        // Reload the working draft from storage (own draft restored or empty).
        useStudio.setState({ hydrated: false });
        useStudio.getState().hydrate();
      }
    } catch {
      // storage unavailable
    }
  };
  const refresh = () =>
    listClients(entitlementId).then(
      (r) => {
        setClients(r.clients);
        purge(r.clients.map((c) => c.clientId));
      },
      (e: Error) => setErr(e.message),
    );
  useEffect(() => {
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entitlementId]);

  async function makeLink() {
    setErr("");
    try {
      const r = await createClientLink(entitlementId, guestId, biz);
      setBiz(r.businessName);
      setUrl(`${window.location.origin}${r.path}`);
    } catch (e) {
      setErr((e as Error).message);
    }
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // clipboard blocked; the link is still visible to select
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }
  async function remove(c: ClientSummary) {
    if (!window.confirm(`${T.confirmDeleteClient}\n\n${c.name}`)) return;
    setErr("");
    try {
      await deleteClient(entitlementId, c.clientId);
      purge(null, c.clientId);
      await refresh();
    } catch (e) {
      setErr((e as Error).message);
    }
  }
  async function revoke() {
    if (!window.confirm(T.confirmRevoke)) return;
    setErr("");
    try {
      await revokeClientLinks(entitlementId);
      setUrl("");
      setErr(T.revoked);
      await refresh();
    } catch (e) {
      setErr((e as Error).message);
    }
  }
  async function fillFor(c: ClientSummary) {
    setErr("");
    try {
      const full = await getClient(entitlementId, c.clientId);
      const base = emptyProfile();
      try {
        tagClientDraft(localStorage, c.clientId);
      } catch {
        // ignore
      }
      commitProfile({ ...base, ...full.profile, personal: { ...base.personal, ...full.profile.personal } });
      window.location.href = "/#document-file";
    } catch (e) {
      setErr((e as Error).message);
    }
  }

  return (
    <div className="mt-4">
      <Panel title={T.clientsTitle} testId="dash-clients">
        <p className="text-sm text-muted">{T.clientsHint}</p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            className="h-11 flex-1 rounded-lg border border-line bg-paper px-3 text-sm"
            placeholder={T.businessName}
            aria-label={T.businessName}
            value={biz}
            onChange={(e) => setBiz(e.target.value)}
            data-testid="clients-biz"
          />
          <button type="button" className="flex h-11 items-center justify-center gap-2 rounded-full bg-forest px-4 text-sm font-medium text-sheet" onClick={() => void makeLink()} data-testid="clients-create-link">
            <Users className="size-4" aria-hidden /> {T.createLink}
          </button>
        </div>
        {url ? (
          <div className="mt-3 rounded-lg border border-line bg-sheet p-3">
            <p className="break-all font-mono text-xs" data-testid="clients-link">{url}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button type="button" className="flex h-10 items-center gap-1 rounded-full border border-forest px-3 text-sm text-forest" onClick={() => void copy()} data-testid="clients-copy">
                <Copy className="size-4" aria-hidden /> {copied ? T.copied : T.copy}
              </button>
              <a
                className="flex h-10 items-center gap-1 rounded-full border border-forest px-3 text-sm text-forest"
                href={`https://wa.me/?text=${encodeURIComponent(`${T.shareMsg} ${url}`)}`}
                target="_blank"
                rel="noreferrer"
                data-testid="clients-whatsapp"
              >
                <Share2 className="size-4" aria-hidden /> {T.whatsapp}
              </a>
            </div>
          </div>
        ) : null}
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <button type="button" className="h-10 text-sm text-red-700 underline" onClick={() => void revoke()} data-testid="clients-revoke">
            {T.revokeLink}
          </button>
          <span className="text-xs text-muted">{T.retention}</span>
        </div>
        {err ? <p className="mt-2 text-sm text-red-700" role="alert">{err}</p> : null}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm font-medium">{T.clientsTitle} ({clients.length})</p>
          <button type="button" className="h-10 text-sm text-forest underline" onClick={() => void refresh()} data-testid="clients-refresh">
            {T.refresh}
          </button>
        </div>
        {clients.length ? (
          <ul className="mt-2 divide-y divide-line text-sm" data-testid="clients-list">
            {clients.map((c) => (
              <li key={c.clientId} className="flex flex-col gap-2 py-2 sm:flex-row sm:items-center">
                <div className="flex-1">
                  <p className="font-medium">{c.name}</p>
                  <p className="text-xs text-muted">
                    {T.submitted} {new Date(c.submittedAt).toLocaleString()}
                  </p>
                </div>
                <button type="button" className="h-10 rounded-full bg-forest px-4 text-sm font-medium text-sheet" onClick={() => void fillFor(c)} data-testid="clients-fill">
                  {T.fillForClient}
                </button>
                <button type="button" className="h-10 rounded-full border border-red-700 px-4 text-sm font-medium text-red-700" onClick={() => void remove(c)} data-testid="clients-delete">
                  {T.deleteClient}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-muted">{T.noClients}</p>
        )}
      </Panel>
    </div>
  );
}
