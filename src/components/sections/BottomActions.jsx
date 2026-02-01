import styles from "./BottomActions.module.scss";
import useI18n from "../../i18n/useI18n.js";

export default function BottomActions() {
    const { t } = useI18n();
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <section className={styles.wrap}>
            <div className={styles.inner}>
                {/* دکمه برو بالا */}
                <button
                    type="button"
                    onClick={scrollToTop}
                    className={styles.toTop}
                >
                    {t("ui.back_to_top")}
                </button>

                {/* عکس – فقط لینک رو عوض کن */}
                <img
                    className={styles.image}
                    src="/pic/app-footer.png"
                    alt=""
                    loading="lazy"
                />

                {/* دکمه ورود به پورتال */}
                <a
                    href="https://golvash.org/login"
                    className={styles.portal}
                    target="_blank"
                    rel="noreferrer"
                >
                    {t("ui.portal_login")}
                </a>
            </div>
        </section>
    );
}