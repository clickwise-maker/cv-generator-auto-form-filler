import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/brand";
import { SiteFooter } from "@/components/site-footer";
import { tr } from "@/lib/i18n/i18n";
import { consumeHash, updatePassword } from "@/lib/auth/supa";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Reset password · formzolo" }, { name: "robots", content: "noindex" }] }),
  component: ResetPage,
});

function ResetPage() {
  const [token, setToken] = useState<string | null>(null);
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState("");
  useEffect(() => {
    setToken(consumeHash()?.get("access_token") ?? null);
  }, []);
  return (
    <>
      <SiteHeader />
      <main className="min-h-[60vh] bg-paper px-4 py-10 text-ink">
        <div className="mx-auto max-w-sm rounded-2xl border border-line bg-sheet p-5">
          <h1 className="font-serif text-2xl text-forest">{tr("Set a new password")}</h1>
          {token ? (
            <form
              className="mt-4 grid gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                updatePassword(token, pw).then(() => setMsg(tr("Password updated. You can sign in now.")), (err: Error) => setMsg(err.message));
              }}
            >
              <input className="h-11 rounded-xl border border-line px-3 text-sm" type="password" minLength={6} required autoComplete="new-password" placeholder={tr("New password")} aria-label={tr("New password")} value={pw} onChange={(e) => setPw(e.target.value)} />
              <button type="submit" className="h-11 rounded-full bg-forest text-sm font-medium text-white">{tr("Save password")}</button>
            </form>
          ) : (
            <p className="mt-3 text-sm text-muted">{tr("Open this page from the reset link in your email.")}</p>
          )}
          {msg ? <p className="mt-3 text-sm" role="status">{msg}</p> : null}
          <a href="/" className="mt-4 inline-block text-sm text-forest underline">{tr("← Back to formzolo")}</a>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
