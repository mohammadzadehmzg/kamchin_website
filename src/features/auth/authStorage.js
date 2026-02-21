const AUTH_KEY = "golvash_auth_v1";
const OTP_KEY = "golvash_otp_v1";

export function loadAuth() {
    try {
        const raw = window.localStorage.getItem(AUTH_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

export function saveAuth(auth) {
    try {
        window.localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
    } catch {
        // ignore
    }
}

export function clearAuth() {
    try {
        window.localStorage.removeItem(AUTH_KEY);
    } catch {
        // ignore
    }
}

export function saveOtp({ phone, code, purpose }) {
    try {
        window.localStorage.setItem(
            OTP_KEY,
            JSON.stringify({ phone, code, purpose, ts: Date.now() })
        );
    } catch {
        // ignore
    }
}

export function loadOtp() {
    try {
        const raw = window.localStorage.getItem(OTP_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

export function clearOtp() {
    try {
        window.localStorage.removeItem(OTP_KEY);
    } catch {
        // ignore
    }
}
