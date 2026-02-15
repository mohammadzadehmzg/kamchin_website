import styles from "./AboutStrip.module.scss";
import Button from "../ui/Button.jsx";
import { Link } from "react-router-dom";
import useI18n from "../../i18n/useI18n.js";

// local asset (bundled under /pic)
const ABOUT_IMG =
    "/pic/U062fU0631U0628U0627U0631U0647 U06cc U06a9U0627U0645U0686U06ccU0646.webp";

export default function AboutStrip() {
    const { t } = useI18n();

    return (
        <section className={styles.wrap}>
            <div className="container">
                <div className={styles.inner}>
                    <div className={styles.content}>
                        <h2 className="h2">{t("about_strip.title")}</h2>

                        <p className="muted" style={{ whiteSpace: "pre-line" }}>
                            {t("about_strip.body")}
                        </p>

                        <div className={styles.actions}>
                            <Button as={Link} to="/about">
                                {t("ui.read_more")}
                            </Button>
                        </div>
                    </div>

                    <div className={styles.media} aria-hidden="true">
                        <img className={styles.image} src={ABOUT_IMG} alt="" loading="lazy" />
                    </div>
                </div>
            </div>
        </section>
    );
}
