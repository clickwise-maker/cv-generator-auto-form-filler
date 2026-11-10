var Route$2 = createFileRoute("/api/clients/$")({ server: { handlers: {
	GET: async ({ request, params }) => handleClients(request, params._splat ?? ""),
	POST: async ({ request, params }) => handleClients(request, params._splat ?? ""),
	DELETE: async ({ request, params }) => handleClients(request, params._splat ?? "")
} } });
var FileComplaintStore = class {
	file;
	complaints = /* @__PURE__ */ new Map();
	constructor(file) {
		this.file = file;
		if (!file) return;
		try {
			const snap = JSON.parse(readFileSync(file, "utf8"));
			for (const c of snap.complaints ?? []) this.complaints.set(c.complaintId, c);
		} catch {}
	}
	flush() {
		if (!this.file) return;
		try {
			mkdirSync(dirname(this.file), { recursive: true });
			const tmp = `${this.file}.tmp`;
			writeFileSync(tmp, JSON.stringify({ complaints: [...this.complaints.values()] }));
			renameSync(tmp, this.file);
		} catch (e) {
			console.error("[complaints] could not write snapshot", e);
		}
	}
	async putComplaint(c) {
		this.complaints.set(c.complaintId, { ...c });
		this.flush();
	}
	async listComplaints() {
		return [...this.complaints.values()].map((c) => ({ ...c }));
	}
	async getComplaint(id) {
		const c = this.complaints.get(id);
		return c ? { ...c } : void 0;
	}
	async resolveComplaint(id, at) {
		const c = this.complaints.get(id);
		if (!c) return false;
		this.complaints.set(id, {
			...c,
			status: "resolved",
			resolvedAt: at
		});
		this.flush();
		return true;
	}
	async purgeOlderThan(cutoff) {
		let n = 0;
		for (const [k, c] of this.complaints) if (c.submittedAt < cutoff) {
			this.complaints.delete(k);
			n++;
		}
		if (n) this.flush();
		return n;
	}
};
var COMPLAINT_TYPES = [
	"not-working",
	"payment",
	"other"
];
var store = null;
function complaintStore() {
	if (!store) store = new FileComplaintStore(processModule.env.COMPLAINTS_STORE_FILE || join(tmpdir(), "formzalo-complaints.json"));
	return store;
}
function json(status, body) {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			"content-type": "application/json",
			"cache-control": "no-store"
		}
	});
}
var id = (p, n = 24) => `${p}_${randomBytes(n).toString("base64url")}`;
var str = (v, max = 2e3) => typeof v === "string" ? v.trim().slice(0, max) : "";
var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
async function body(req) {
	const t = await req.text();
	if (t.length > 1e5) throw new PaymentError(413, "too_large", "Request too large.");
	try {
		const v = JSON.parse(t);
		if (v && typeof v === "object") return v;
	} catch {}
	throw new PaymentError(400, "bad_json", "Invalid JSON.");
}
function fail(e) {
	if (e instanceof PaymentError) return json(e.status, {
		error: e.code,
		message: e.message
	});
	console.error("[complaints]", e);
	return json(500, {
		error: "server_error",
		message: "Something went wrong."
	});
}
/** Validate an untrusted report submission; throws PaymentError(400) on bad input. */
function sanitizeComplaint(raw) {
	const type = str(raw.type, 50);
	if (!COMPLAINT_TYPES.includes(type)) throw new PaymentError(400, "bad_type", "Choose an issue type.");
	const name = str(raw.name, 100);
	if (!name) throw new PaymentError(400, "name_required", "Name is required.");
	const email = str(raw.email, 200);
	if (!EMAIL_RE.test(email)) throw new PaymentError(400, "bad_email", "Enter a valid email address.");
	const message = str(raw.message, 2e3);
	if (message.length < 10) throw new PaymentError(400, "message_too_short", "Describe what happened (at least 10 characters).");
	if (raw.consent !== true) throw new PaymentError(400, "consent_required", "Please tick the consent box.");
	return {
		type,
		name,
		email,
		message
	};
}
/** DPDP retention: reports are auto-deleted after this many days. */
var lastPurge = 0;
async function purgeExpired(st, now = Date.now()) {
	if (now - lastPurge < 36e5) return;
	lastPurge = now;
	const n = await st.purgeOlderThan(now - 15552e6);
	if (n) console.log(`[complaints] retention purge removed ${n} record(s)`);
}
/** Owner gate: a valid Commercial-plan entitlement, like the clients list. */
async function owner(svc, entitlementId) {
	try {
		return await svc.commercialOwner(typeof entitlementId === "string" ? entitlementId : void 0);
	} catch {
		throw new PaymentError(403, "not_commercial", "Problem reports are available only on an active Commercial plan.");
	}
}
async function handleComplaints(req, path, svc = paymentService(), st = complaintStore()) {
	try {
		await purgeExpired(st).catch((e) => console.error("[complaints] purge failed", e));
		if (req.method !== "POST") return json(404, { error: "not_found" });
		const b = await body(req);
		if (path === "submit") {
			const c = sanitizeComplaint(b);
			const complaintId = id("cmp");
			await st.putComplaint({
				...c,
				complaintId,
				status: "new",
				submittedAt: Date.now()
			});
			return json(201, {
				ok: true,
				complaintId,
				retentionDays: 180
			});
		}
		await owner(svc, b.entitlementId);
		if (path === "list") {
			const list = await st.listComplaints();
			list.sort((a, c) => c.submittedAt - a.submittedAt);
			return json(200, { complaints: list });
		}
		if (path === "resolve") {
			if (!await st.resolveComplaint(str(b.complaintId, 100), Date.now())) throw new PaymentError(404, "not_found", "Report not found.");
			return json(200, {
				ok: true,
				resolved: true
			});
		}
		return json(404, { error: "not_found" });
	} catch (e) {
		return fail(e);
	}
}
/** Public problem reports: submit (any visitor) + owner list/resolve (Commercial plan). */
var Route$1 = createFileRoute("/api/complaints/$")({ server: { handlers: {
	GET: async ({ request, params }) => handleComplaints(request, params._splat ?? ""),
	POST: async ({ request, params }) => handleComplaints(request, params._splat ?? "")
} } });
/**
