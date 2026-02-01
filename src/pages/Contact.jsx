import styles from "./Page.module.scss";

export default function Contact() {
    return (
        <section className="container section">
            <h1 className="h1">تماس</h1>
            <div className={styles.card}>
                <p className="muted">
                    ایمیل: <a href="mailto:info@kamchin.com">info@kamchin.com</a>
                </p>
                <p className="muted">
                    تلفن: <a href="tel:+989919725830">09919725830</a>
                </p>
                <p className="muted">
                    واتساپ: <a href="https://wa.me/989919725830" target="_blank" rel="noreferrer">پیام در واتساپ</a>
                </p>
                <p className="muted">
                    تلگرام: <a href="https://t.me/+989919725830" target="_blank" rel="noreferrer">پیام در تلگرام</a>
                </p>
            </div>
        </section>
    );
}
