import React from "react";
import styles from "./AboutStrip.module.scss";
import Button from "../ui/Button.jsx";

export default function AboutStrip() {
    return (
        <section className={styles.wrap}>
            <div className="container">
                <div className={styles.inner}>
                    <h2 className="h2">درباره کامچین</h2>
                    <p className="muted">
                        اینجا متن رسمی معرفی کامچین را قرار دهید. کوتاه، شفاف و مدیرپسند.
                        بعداً متن نهایی را جایگزین می‌کنید.
                    </p>
                    <div className={styles.actions}>
                        <Button as="a" href="/about">بیشتر بخوانید</Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
