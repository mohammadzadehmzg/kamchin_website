import axios from "axios";

// Central axios instance for Golvash APIs.
// Base URL is controlled via env (Vite):
//   - VITE_GOLVASH_API_BASE_URL (preferred)
//   - VITE_API_BASE_URL
//   - VITE_API_BASE
const baseURL =
    import.meta.env.VITE_GOLVASH_API_BASE_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_API_BASE ||
    "";

export const axiosClient = axios.create({
    baseURL,
    timeout: 15000,
});

axiosClient.interceptors.request.use((config) => {
    try {
        const token =
            typeof window !== "undefined"
                ? window.localStorage.getItem("auth_token")
                : null;
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
    } catch {
        // ignore storage issues
    }
    return config;
});

axiosClient.interceptors.response.use(
    (res) => res,
    (err) => {
        // Normalize errors so UI can handle consistently.
        const status = err?.response?.status ?? 0;
        const data = err?.response?.data ?? null;
        const message =
            data?.message ||
            err?.message ||
            (status ? `HTTP ${status}` : "Network error");

        return Promise.reject({
            status,
            message,
            data,
            isNetworkError: !err?.response,
            original: err,
        });
    }
);
