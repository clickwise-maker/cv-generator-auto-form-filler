import type { Profile } from "@/lib/cv/model";

const API = "/api/clients";
export type ClientSummary = { clientId: string; name: string; submittedAt: number };

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}/${path}`, { ...init, headers: { "content-type": "application/json" } });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(body.message ?? "Request failed."), { status: res.status, code: body.error });
  return body as T;
}
const post = <T,>(path: string, data: unknown) => call<T>(path, { method: "POST", body: JSON.stringify(data) });

export const createClientLink = (entitlementId: string, guestId: string, businessName: string) =>
  post<{ token: string; path: string; businessName: string }>("link", { entitlementId, guestId, businessName });
export const listClients = (entitlementId: string) => post<{ clients: ClientSummary[] }>("list", { entitlementId });
export const getClient = (entitlementId: string, clientId: string) =>
  post<ClientSummary & { profile: Profile }>("get", { entitlementId, clientId });
export const intakeInfo = (token: string) => call<{ businessName: string }>(`intake/${encodeURIComponent(token)}`);
export const submitIntake = (token: string, profile: unknown, consent: boolean) =>
  post<{ ok: true; clientId: string; deleteKey: string; retentionDays: number }>("submit", { token, profile, consent });
const del = <T,>(path: string, data: unknown) => call<T>(path, { method: "DELETE", body: JSON.stringify(data) });
export const deleteClient = (entitlementId: string, clientId: string) => del<{ ok: true }>("client", { entitlementId, clientId });
export const revokeClientLinks = (entitlementId: string) => del<{ ok: true; revoked: number }>("link", { entitlementId });
export const deleteOwnSubmission = (clientId: string, deleteKey: string) => del<{ ok: true }>("self", { clientId, deleteKey });
