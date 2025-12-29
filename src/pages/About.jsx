import React from "react";
import styles from "./Page.module.scss";

export default function About() {
    return (
        <section className="container section">
            <h1 className="h1">درباره کامچین</h1>
            <div className={styles.card}>
                <p className="muted">
                    رکت کامچین در سال ۱۳۹۶ با هدف تولید محصولات غذایی با کیفیت بالا، فعالیت خود را در شهر تهران آغاز کرد.

                    کامچین با تمرکز بر تولید رب گوجه‌فرنگی، مربا و کمپوت، به تدریج سبد محصولات خود را گسترش داد و با برند «کامچین» و شعار «غذای ایرانی، همیشه و همه‌جا در دسترس»، به یکی از بزرگ‌ترین تولیدکنندگان غذای آماده در ایران تبدیل شد.
                </p>
            </div>
        </section>
    );
}
