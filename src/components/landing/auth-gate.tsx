import { useEffect, useState, type ReactNode } from "react";
import { tr } from "@/lib/i18n/i18n";
import { onAuthStateChange, type SupaSession } from "@/lib/auth/supa";

export function useSupaSession(): SupaSession | null | undefined {
  const [s, setS] = useState<SupaSession | null | undefined>(undefined);
  useEffect(() => onAuthStateChange(setS), []);
  return s;
}

export function goToSignIn() {
  const el = document.getElementById("signin");
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => (document.querySelector('[data-testid="auth-email"]') as HTMLInputElement | null)?.focus({ preventScroll: true }), 400);
  } else window.location.href = "/#signin";
}

/** Shows children only to signed-in users; otherwise a locked placeholder pointing to the sign-in card. */
export function AuthGate({ children }: { children: ReactNode }) {
  const session = useSupaSession();
  if (session) return <>{children}</>;
  return (
    <section className="bg-paper px-4 py-12" data-testid="editor-locked">
      <div className="mx-auto max-w-md rounded-2xl border border-dashed border-forest/30 bg-sheet p-6 text-center">
        <span aria-hidden className="mx-auto grid size-12 place-items-center rounded-full bg-forest/10 text-xl">🔒</span>
        <h2 className="mt-3 font-serif text-2xl text-forest">{tr("Sign in to start building your CV")}</h2>
        <p className="mt-2 text-sm text-ink/75">{tr("Use Google or your email. Your CV editor opens right here after you sign in.")}</p>
        <button type="button" onClick={goToSignIn} className="mt-5 h-11 w-full rounded-full bg-forest px-5 text-sm font-medium text-white" data-testid="locked-signin">
          {tr("Sign in")}
        </button>
      </div>
    </section>
  );
}
