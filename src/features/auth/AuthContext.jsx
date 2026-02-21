import { createContext, useContext, useMemo, useState } from "react";
import { getCurrentUser, loginWithOtp, logout as doLogout, requestOtp, signupWithOtp } from "./authService.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => getCurrentUser());

    const api = useMemo(
        () => ({
            user,
            async requestOtp(payload) {
                return requestOtp(payload);
            },
            async login(payload) {
                const u = await loginWithOtp(payload);
                setUser(u);
                return u;
            },
            async signup(payload) {
                const u = await signupWithOtp(payload);
                setUser(u);
                return u;
            },
            logout() {
                doLogout();
                setUser(null);
            },
        }),
        [user]
    );

    return <AuthContext.Provider value={api}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
