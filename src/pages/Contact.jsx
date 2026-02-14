import styles from "./Page.module.scss";
import useI18n from "../i18n/useI18n.js";

export default function Contact() {
    const { t } = useI18n();

    return (
        <section className="container section">
            <h1 className="h1">{t("pages.contact.title")}</h1>
            <div className={styles.card}>
                <p className="muted">
                    {t("ui.email_label")}: <a href="mailto:info@kamchin.com">info@kamchin.com</a>
                </p>
                <p className="muted">
                    {t("ui.phone_label")}: <a href="tel:+989919725830">09919725830</a>
                </p>
                <p className="muted">
                    WhatsApp:{" "}
                    <a href="https://wa.me/989919725830" target="_blank" rel="noreferrer">
                        {t("ui.whatsapp_message")}
                    </a>
                </p>
                <p className="muted">
                    Telegram:{" "}
                    <a href="https://t.me/+989919725830" target="_blank" rel="noreferrer">
                        {t("ui.telegram_message")}
                    </a>
                </p>
            </div>
        </section>
    );
}
