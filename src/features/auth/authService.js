import { clearAuth, clearOtp, loadAuth, loadOtp, saveAuth, saveOtp } from "./authStorage.js";

const TEST_CODE = "123456";
const OTP_TTL_MS = 5 * 60 * 1000;

function normalizePhone(raw) {
    const s = String(raw ?? "").trim().replaceAll(" ", "").replaceAll("-", "");
    if (s.startsWith("+98")) return "0" + s.slice(3);
    if (s.startsWith("98")) return "0" + s.slice(2);
    return s;
}

export function getCurrentUser() {
    const auth = loadAuth();
    return auth?.user ?? null;
}

export function logout() {
    clearAuth();
}

export async function requestOtp({ phone, purpose }) {
    const p = normalizePhone(phone);
    if (!/^09\d{9}$/.test(p)) {
        const err = new Error("INVALID_PHONE");
        err.code = "INVALID_PHONE";
        throw err;
    }
    // No backend: simulate SMS
    saveOtp({ phone: p, code: TEST_CODE, purpose });
    return { ok: true, test_code: TEST_CODE };
}

export async function verifyOtp({ phone, code, purpose }) {
    const p = normalizePhone(phone);
    const stored = loadOtp();
    if (!stored || stored.phone !== p || stored.purpose !== purpose) {
        const err = new Error("OTP_NOT_REQUESTED");
        err.code = "OTP_NOT_REQUESTED";
        throw err;
    }
    if (Date.now() - Number(stored.ts ?? 0) > OTP_TTL_MS) {
        clearOtp();
        const err = new Error("OTP_EXPIRED");
        err.code = "OTP_EXPIRED";
        throw err;
    }
    if (String(code ?? "").trim() !== String(stored.code)) {
        const err = new Error("OTP_INVALID");
        err.code = "OTP_INVALID";
        throw err;
    }
    return { ok: true };
}

export async function loginWithOtp({ phone, code }) {
    await verifyOtp({ phone, code, purpose: "login" });
    const p = normalizePhone(phone);
    const user = { id: p, phone: p };
    saveAuth({ user, token: "mock-token" });
    clearOtp();
    return user;
}

export async function signupWithOtp({ phone, code, name, address }) {
    await verifyOtp({ phone, code, purpose: "signup" });
    const p = normalizePhone(phone);
    const user = { id: p, phone: p, name: String(name ?? "").trim(), address: String(address ?? "").trim() };
    saveAuth({ user, token: "mock-token" });
    clearOtp();
    return user;
}
