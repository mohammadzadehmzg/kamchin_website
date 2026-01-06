import styles from "./Page.module.scss";

export default function Contact() {
    return (
        <section className="container section">
            <h1 className="h1">تماس با ما</h1>
            <div className={styles.card}>
                <p className="muted">ایمیل: info@kamchin.com</p>
                <p className="muted">تلفن: 021-44293648</p>
                <p className="muted">آدرس: ...</p>
            </div>
        </section>
    );
}
