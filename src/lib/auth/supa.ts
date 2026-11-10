/**
 * Minimal Supabase Auth (GoTrue REST) client for formzalo.com — email/password,
 * Google OAuth redirect, password reset. Session kept in localStorage; guest mode
 * keeps working when nobody signs in. Public anon key only (safe in the browser).
 */
const URL_ = (import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? "";
const KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ?? "";
const SESSION_KEY = "cvstudio.auth.v1";
export const supaEnabled = !!URL_ && !!KEY;

export type SupaSession = { access_token: string; refresh_token?: string; expires_at?: number; email?: string };

async function call(path: string, init: RequestInit & { token?: string } = {}) {
  const res = await fetch(`${URL_}/auth/v1${path}`, {
    ...init,
    headers: { apikey: KEY, "Content-Type": "application/json", Authorization: `Bearer ${init.token ?? KEY}` },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error_description || body.msg || body.message || `Error ${res.status}`);
  return body;
}

export function readSession(): SupaSession | null {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  } catch {
    return null;
  }
}
function saveSession(s: SupaSession | null) {
  if (s) localStorage.setItem(SESSION_KEY, JSON.stringify(s));
  else localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event("cvstudio-auth"));
}
function fromToken(b: { access_token: string; refresh_token?: string; expires_in?: number; user?: { email?: string } }): SupaSession {
  return { access_token: b.access_token, refresh_token: b.refresh_token, expires_at: Date.now() + (b.expires_in ?? 3600) * 1000, email: b.user?.email };
}

export async function signInEmail(email: string, password: string) {
  saveSession(fromToken(await call("/token?grant_type=password", { method: "POST", body: JSON.stringify({ email, password }) })));
}
/** Returns true when a session started immediately, false when a confirmation email was sent. */
export async function signUpEmail(email: string, password: string) {
  const b = await call(`/signup?redirect_to=${encodeURIComponent(location.origin + "/")}`, { method: "POST", body: JSON.stringify({ email, password }) });
  if (b.access_token) {
    saveSession(fromToken(b));
    return true;
  }
  return false;
}
export function signInGoogle() {
  location.href = `${URL_}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(location.origin + "/")}`;
}
export async function sendReset(email: string) {
  await call(`/recover?redirect_to=${encodeURIComponent(location.origin + "/reset-password")}`, { method: "POST", body: JSON.stringify({ email }) });
}
export async function updatePassword(token: string, password: string) {
  await call("/user", { method: "PUT", token, body: JSON.stringify({ password }) });
}
export function signOutSupa() {
  const s = readSession();
  if (s) call("/logout", { method: "POST", token: s.access_token }).catch(() => {});
  saveSession(null);
}

/** Reads #access_token=… from an OAuth / email-link redirect. Returns the hash params (or null). */
export function consumeHash(): URLSearchParams | null {
  if (typeof location === "undefined" || !location.hash.includes("access_token=")) return null;
  const p = new URLSearchParams(location.hash.slice(1));
  history.replaceState(null, "", location.pathname + location.search);
  return p;
}
export async function captureRedirectSession() {
  const p = consumeHash();
  if (!p || p.get("type") === "recovery") return p;
  const token = p.get("access_token")!;
  const user = await call("/user", { token }).catch(() => ({}));
  saveSession({ access_token: token, refresh_token: p.get("refresh_token") ?? undefined, expires_at: Date.now() + Number(p.get("expires_in") ?? 3600) * 1000, email: user.email });
  return p;
}

/** Refreshes an expired session with its refresh token (keeps users signed in across reloads). */
export async function refreshIfNeeded() {
  const s = readSession();
  if (!s || !s.expires_at || s.expires_at - Date.now() > 60_000) return;
  if (!s.refresh_token) return saveSession(null);
  try {
    const b = await call("/token?grant_type=refresh_token", { method: "POST", body: JSON.stringify({ refresh_token: s.refresh_token }) });
    saveSession({ ...fromToken(b), email: b.user?.email ?? s.email });
  } catch {
    saveSession(null);
  }
}

/** Auth-state subscription (like supabase onAuthStateChange): fires on sign-in, sign-out, refresh and other tabs. */
export function onAuthStateChange(cb: (s: SupaSession | null) => void): () => void {
  const fire = () => cb(readSession());
  const storage = (e: StorageEvent) => e.key === SESSION_KEY && fire();
  window.addEventListener("cvstudio-auth", fire);
  window.addEventListener("storage", storage);
  fire();
  void refreshIfNeeded();
  return () => {
    window.removeEventListener("cvstudio-auth", fire);
    window.removeEventListener("storage", storage);
  };
}
