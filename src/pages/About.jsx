import styles from "./Page.module.scss";

export default function About() {
    return (
        <section className="container section">
            <h1 className="h1">درباره کامچین</h1>
            <div className={styles.card}>
                <p className="muted" style={{ whiteSpace: "pre-line" }}>
                    {"شركت کامچین در سال 1359 با هدف توليد محصولات غذايى با كيفيت بالا، فعاليت خود را در\n" +
                        "شهريار تهران اغاز كرد\n\n" +
                        "کامچین با تمركز بر توليد رب كوجه فرنكى، مربا و كميوت، به تدريج سبد محصولات خود را\n" +
                        "گسترش داد  و با  شعار غذاى ايراني، هميشه و همه جا  دسترس، به يكى از\n" +
                        "بزركترين توليدكنندكان غذاى آماده در ايران تبديل شد"}
                </p>

                <div style={{ marginTop: 18 }}>
                    <img
                        src="https://kamchin.com/wp-content/uploads/2024/09/qc-2048x1903.webp"
                        alt="کامچین"
                        style={{ width: "100%", borderRadius: 18, border: "1px solid rgba(0,0,0,.08)" }}
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    );
}
