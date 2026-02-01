import styles from "./AboutStrip.module.scss";
import Button from "../ui/Button.jsx";
import useI18n from "../../i18n/useI18n.js";

// local asset (bundled under /pic)
const ABOUT_IMG =
    "/pic/U062fU0631U0628U0627U0631U0647 U06cc U06a9U0627U0645U0686U06ccU0646.webp";

export default function AboutStrip() {
    const { lang, t } = useI18n();

    const faText =
        "شرکت کامچین در سال ۱۳۵۹ با هدف تولید محصولات غذایی با کیفیت بالا، فعالیت خود را در شهریار تهران آغاز کرد.\n\n" +
        "این مجموعه با تمرکز بر تولید رب گوجه‌فرنگی، مربا و کمپوت، به‌تدریج سبد محصولات خود را گسترش داد و با تکیه بر کیفیت، " +
        "نوآوری و اعتماد مصرف‌کنندگان، جایگاه ویژه‌ای در صنعت غذایی کشور به دست آورد.\n\n" +
        "امروز کامچین با شعار «غذای ایرانی، همیشه و همه‌جا در دسترس»، به‌عنوان یکی از بزرگ‌ترین تولیدکنندگان غذای آماده در ایران شناخته می‌شود.";

    return (
        <section className={styles.wrap}>
            <div className="container">
                <div className={styles.inner}>
                    <div className={styles.content}>
                        {/* 🔹 عنوان اصلاح شد */}
                        <h2 className="h2">
                            {lang === "en" ? t("sections.about") : "چگونه کامچین متولد شد؟"}
                        </h2>

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
                        <img
                            className={styles.image}
                            src={ABOUT_IMG}
                            alt=""
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}