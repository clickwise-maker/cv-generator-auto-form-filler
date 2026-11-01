import { useEffect, useState } from "react";
import { tr } from "@/lib/i18n/i18n";
import { LanguageSelect } from "@/components/language-select";
import { captureRedirectSession, readSession, sendReset, signInEmail, signInGoogle, signOutSupa, signUpEmail, supaEnabled, type SupaSession } from "@/lib/auth/supa";

const input = "h-11 w-full rounded-xl border border-line bg-sheet px-3 text-sm";

/** Compact sign-in card: language, Google, email + password. Guest mode stays the default. */
export function AuthPanel() {
  const [session, setSession] = useState<SupaSession | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const sync = () => setSession(readSession());
    sync();
    captureRedirectSession().then((p) => {
      if (p?.get("type") === "recovery") location.href = `/reset-password#${p.toString()}`;
    }, () => {});
    window.addEventListener("cvstudio-auth", sync);
    return () => window.removeEventListener("cvstudio-auth", sync);
  }, []);

  const run = async (fn: () => Promise<string | void>) => {
    setBusy(true);
    setMsg("");
    try {
      const m = await fn();
      if (m) setMsg(m);
    } catch (e) {
      setMsg((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-md px-4 py-6" aria-label={tr("Sign in")} data-testid="auth-panel">
      <div className="rounded-2xl border border-line bg-sheet p-4 shadow-sm">
        <LanguageSelect className="w-full" />
        {session ? (
          <div className="mt-3 flex items-center justify-between gap-2 text-sm">
            <span className="truncate text-muted">{tr("Signed in as {email}", { email: session.email ?? "" })}</span>
            <button type="button" className="h-10 rounded-full border border-line px-4 text-forest" onClick={signOutSupa}>{tr("Sign out")}</button>
          </div>
        ) : (
          <form
            className="mt-3 grid gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              run(() => signInEmail(email, password));
            }}
          >
            <button type="button" disabled={!supaEnabled || busy} onClick={signInGoogle} className="flex h-11 items-center justify-center gap-2 rounded-full border border-line bg-white text-sm font-medium text-ink" data-testid="google-login">
              <svg aria-hidden viewBox="0 0 48 48" className="size-5"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>
              {tr("Continue with Google")}
            </button>
            <input className={input} type="email" required autoComplete="email" placeholder={tr("Email")} aria-label={tr("Email")} value={email} onChange={(e) => setEmail(e.target.value)} data-testid="auth-email" />
            <input className={input} type="password" required minLength={6} autoComplete="current-password" placeholder={tr("Password")} aria-label={tr("Password")} value={password} onChange={(e) => setPassword(e.target.value)} data-testid="auth-password" />
            <div className="grid grid-cols-2 gap-2">
              <button type="submit" disabled={!supaEnabled || busy} className="h-11 rounded-full bg-forest text-sm font-medium text-white">{tr("Sign in")}</button>
              <button type="button" disabled={!supaEnabled || busy} className="h-11 rounded-full border border-forest text-sm font-medium text-forest" onClick={() => run(async () => ((await signUpEmail(email, password)) ? undefined : tr("Check your email to confirm your account.")))}>{tr("Create account")}</button>
            </div>
            <button type="button" className="justify-self-start text-xs text-forest underline" onClick={() => run(async () => { if (!email) return tr("Enter your email first."); await sendReset(email); return tr("If that email has an account, a reset link is on its way."); })}>
              {tr("Forgot password?")}
            </button>
          </form>
        )}
        {msg ? <p className="mt-2 text-xs text-muted" role="status">{msg}</p> : null}
      </div>
    </section>
  );
}
