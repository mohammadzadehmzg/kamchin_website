import styles from "./Footer.module.scss";
import { MapPin, Mail, Phone, Instagram, MessageCircle } from "lucide-react";
import useI18n from "../../i18n/useI18n.js";

export default function Footer() {
    const { t } = useI18n();

    return (
        <footer className={styles.footer}>
            <div className={styles.top}>
                <div className={`${styles.row} ${styles.addrRow}`}>
                    <MapPin size={18} />
                    <div className={styles.addrLines}>
                        <div>{t("footer.office_address")}</div>
                        <div>{t("footer.factory_address")}</div>
                    </div>
                </div>

                <div className={styles.row}>
                    <Mail size={18} />
                    <a href="mailto:info@kamchin.com">info@kamchin.com</a>
                </div>

                <div className={styles.row}>
                    <Phone size={18} />
                    <a href="tel:+989919725830">09919725830</a>
                </div>
            </div>

            <div className={styles.bottom}>
                <div className={styles.socials}>
                    <a
                        href="https://www.instagram.com/kamchin.foods/"
                        aria-label="Instagram"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Instagram size={18} />
                    </a>

                    <a
                        href="https://wa.me/989919725830"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="WhatsApp"
                    >
                        <MessageCircle size={18} />
                    </a>

                    <a
                        href="https://t.me/+989919725830"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Telegram"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                            <path d="M12 0C5.372 0 0 5.372 0 12c0 6.627 5.372 12 12 12s12-5.373 12-12C24 5.372 18.628 0 12 0zm5.895 8.221-1.971 9.285c-.148.66-.54.82-1.092.51l-3.021-2.23-1.458 1.402c-.161.161-.297.297-.608.297l.217-3.076 5.6-5.061c.243-.217-.054-.34-.378-.123L8.833 13.2l-2.948-.923c-.64-.203-.653-.64.135-.949l11.52-4.44c.533-.197.999.128.825 1.333z" />
                        </svg>
                    </a>
                </div>

                <div className={styles.copy}>{t("footer.made_by")}</div>
            </div>
        </footer>
    );
}
