import styles from "./MobileMenu.module.scss";
import { X } from "lucide-react";
import useI18n from "../../i18n/useI18n.js";

export default function MobileMenu({ open, onClose, navItems = [], onNavigateSection }) {
    const { t } = useI18n();

    if (!open) return null;

    const go = (id) => {
        if (typeof onNavigateSection === "function") onNavigateSection(id);
        if (typeof onClose === "function") onClose();
    };

    return (
        <div className={styles.root} role="dialog" aria-modal="true">
            <div className={styles.backdrop} onClick={onClose} />

            <aside className={styles.panel}>
                <div className={styles.top}>
                    <button className={styles.close} onClick={onClose} aria-label={t("ui.close")}>
                        <X size={20} />
                    </button>
                </div>

                <nav className={styles.nav} aria-label="Mobile">
                    {(Array.isArray(navItems) ? navItems : []).map((it) => (
                        <button key={it.id} type="button" onClick={() => go(it.id)}>
                            {t(it.labelKey)}
                        </button>
                    ))}
                </nav>
            </aside>
        </div>
    );
}
