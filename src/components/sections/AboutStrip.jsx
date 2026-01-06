import styles from "./AboutStrip.module.scss";
import Button from "../ui/Button.jsx";
import useI18n from "../../i18n/useI18n.js";

const ABOUT_IMG = "https://kamchin.com/wp-content/uploads/2024/09/qc-2048x1903.webp";

export default function AboutStrip() {
    const { lang, t } = useI18n();

    const faText =
        "شركت کامچین در سال 1359 با هدف توليد محصولات غذايى با كيفيت بالا، فعاليت خود را در\n" +
        "شهريار تهران اغاز كرد.\n\n" +
        "کامچین با تمركز بر توليد رب كوجه فرنكى، مربا و كميوت، به تدريج سبد محصولات خود را\n" +
        "گسترش داد و با شعار «غذاى ايراني، هميشه و همه جا دسترس»، به يكى از\n" +
        "بزركترين توليدكنندكان غذاى آماده در ايران تبديل شد.";

    return (
        <section className={styles.wrap}>
            <div className="container">
                <div className={styles.inner}>
                    <div className={styles.content}>
                        <h2 className="h2">{t("sections.about")}</h2>
                        <p className="muted" style={{ whiteSpace: "pre-line" }}>
                            {lang === "en" ? "Kamchin Food Company" : faText}
                        </p>
                        <div className={styles.actions}>
                            <Button as="a" href="/about">
                                {lang === "en" ? "Read more" : "بیشتر بخوانید"}
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
