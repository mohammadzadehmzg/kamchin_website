import axios from "axios";

/**
 * Axios client (SRP):
 * Central config & interceptors, no UI logic.
 */
export const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "",
    timeout: 15000
});

axiosClient.interceptors.response.use(
    (res) => res,
    (err) => Promise.reject(err)
);
