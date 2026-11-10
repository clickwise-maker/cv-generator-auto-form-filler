//#region ../repo/node_modules/.nitro/vite/services/ssr/assets/client-BAtCw8bu.js
var API = "/api/complaints";
async function call(path, init) {
	const res = await fetch(`${API}/${path}`, {
		...init,
		headers: { "content-type": "application/json" }
	});
	const body = await res.json().catch(() => ({}));
	if (!res.ok) throw Object.assign(new Error(body.message ?? "Request failed."), {
		status: res.status,
		code: body.error
	});
	return body;
}
var post = (path, data) => call(path, {
	method: "POST",
	body: JSON.stringify(data)
});
var submitComplaint = (type, name, email, message, consent) => post("submit", {
	type,
	name,
	email,
	message,
	consent
});
var listComplaints = (entitlementId) => post("list", { entitlementId });
var resolveComplaint = (entitlementId, complaintId) => post("resolve", {
	entitlementId,
	complaintId
});
//#endregion
export { resolveComplaint as n, submitComplaint as r, listComplaints as t };
