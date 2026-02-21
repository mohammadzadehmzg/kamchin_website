import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useI18n from "../i18n/useI18n.js";
import { useAuth } from "../features/auth/AuthContext.jsx";
import styles from "./Auth.module.scss";
import { toast } from "../components/ui/ToastHost.jsx";

export default function Signup() {
    const { t } = useI18n();
    const { requestOtp, signup } = useAuth();
    const navigate = useNavigate();

    const [phone, setPhone] = useState("");
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [step, setStep] = useState("phone"); // phone | form
    const [loading, setLoading] = useState(false);

    const canRequest = useMemo(() => /^09\d{9}$/.test(phone.trim()), [phone]);
    const canVerify = useMemo(
        () =>
            /^\d{6}$/.test(code.trim()) &&
            canRequest &&
            name.trim().length >= 2 &&
            address.trim().length >= 5,
        [code, canRequest, name, address]
    );

    const onRequest = async () => {
        setLoading(true);
        try {
            const res = await requestOtp({ phone, purpose: "signup" });
            toast(`${t("auth.hints.code_sent")} ${t("auth.hints.test_code")}: ${res.test_code}`);
            setStep("form");
        } catch (e) {
            toast(e?.code === "INVALID_PHONE" ? t("auth.fields.phone") : "Error", "error");
        } finally {
            setLoading(false);
        }
    };

    const onVerify = async () => {
        setLoading(true);
        try {
            await signup({ phone, code, name, address });
            toast(t("auth.toast.signup_success"), "success");
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
                <h1 className={styles.title}>{t("auth.signup.title")}</h1>

                <label className={styles.label}>{t("auth.fields.phone")}</label>
                <input
                    className={styles.input}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t("auth.placeholders.phone")}
                    inputMode="tel"
                />

                {step === "form" && (
                    <>
                        <label className={styles.label}>{t("auth.fields.otp")}</label>
                        <input
                            className={styles.input}
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder={t("auth.placeholders.otp")}
                            inputMode="numeric"
                        />

                        <label className={styles.label}>{t("auth.fields.name")}</label>
                        <input
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={t("auth.placeholders.name")}
                        />

                        <label className={styles.label}>{t("auth.fields.address")}</label>
                        <input
                            className={styles.input}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder={t("auth.placeholders.address")}
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
                                {t("auth.actions.verify_signup")}
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
                    <Link to="/login">{t("auth.login.title")}</Link>
                </div>
            </div>
        </div>
    );
}
