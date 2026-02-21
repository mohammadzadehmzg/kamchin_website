import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useI18n from "../i18n/useI18n.js";
import { useAuth } from "../features/auth/AuthContext.jsx";
import styles from "./Auth.module.scss";
import { toast } from "../components/ui/ToastHost.jsx";

export default function Login() {
    const { t } = useI18n();
    const { requestOtp, login } = useAuth();
    const navigate = useNavigate();

    const [phone, setPhone] = useState("");
    const [code, setCode] = useState("");
    const [step, setStep] = useState("phone"); // phone | code
    const [loading, setLoading] = useState(false);

    const canRequest = useMemo(() => /^09\d{9}$/.test(phone.trim()), [phone]);
    const canVerify = useMemo(() => /^\d{6}$/.test(code.trim()) && canRequest, [code, canRequest]);

    const onRequest = async () => {
        setLoading(true);
        try {
            const res = await requestOtp({ phone, purpose: "login" });
            toast(`${t("auth.hints.code_sent")} ${t("auth.hints.test_code")}: ${res.test_code}`);
            setStep("code");
        } catch (e) {
            toast(e?.code === "INVALID_PHONE" ? t("auth.fields.phone") : "Error", "error");
        } finally {
            setLoading(false);
        }
    };

    const onVerify = async () => {
        setLoading(true);
        try {
            await login({ phone, code });
            toast(t("auth.toast.login_success"), "success");
            navigate("/", { replace: true });
        } catch (e) {
            toast(e?.code ?? "Error", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h1 className={styles.title}>{t("auth.login.title")}</h1>

                <label className={styles.label}>{t("auth.fields.phone")}</label>
                <input
                    className={styles.input}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t("auth.placeholders.phone")}
                    inputMode="tel"
                />

                {step === "code" && (
                    <>
                        <label className={styles.label}>{t("auth.fields.otp")}</label>
                        <input
                            className={styles.input}
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder={t("auth.placeholders.otp")}
                            inputMode="numeric"
                        />
                    </>
                )}

                <div className={styles.actions}>
                    {step === "phone" ? (
                        <button
                            className={styles.primary}
                            type="button"
                            disabled={!canRequest || loading}
                            onClick={onRequest}
                        >
                            {t("auth.actions.request_code")}
                        </button>
                    ) : (
                        <>
                            <button
                                className={styles.primary}
                                type="button"
                                disabled={!canVerify || loading}
                                onClick={onVerify}
                            >
                                {t("auth.actions.verify_login")}
                            </button>
                            <button
                                className={styles.secondary}
                                type="button"
                                disabled={loading}
                                onClick={() => setStep("phone")}
                            >
                                {t("auth.actions.change_phone")}
                            </button>
                        </>
                    )}
                </div>

                <div className={styles.footer}>
                    <Link to="/signup">{t("auth.signup.title")}</Link>
                </div>
            </div>
        </div>
    );
}
