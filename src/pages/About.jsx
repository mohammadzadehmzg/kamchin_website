import styles from "./Page.module.scss";

const ABOUT_IMG =
  "/pic/U062fU0631U0628U0627U0631U0647 U06cc U06a9U0627U0645U0686U06ccU0646.webp";

export default function About() {
  const text =
    "شرکت کامچین در سال ۱۳۵۹ با هدف تولید محصولات غذایی با کیفیت بالا، فعالیت خود را در شهریار تهران آغاز کرد.\n\n"
    + "امروز کامچین با تمرکز بر کیفیت و استانداردهای تولید، تلاش می‌کند غذای ایرانی را همیشه و همه‌جا در دسترس قرار دهد.";

  return (
    <section className="container section">
      <h1 className="h1">درباره کامچین</h1>

      <div className={styles.card}>
        <p className="muted" style={{ whiteSpace: "pre-line" }}>
          {text}
        </p>

        <div style={{ marginTop: 18 }}>
          <img
            src={ABOUT_IMG}
            alt="کامچین"
            style={{
              width: "100%",
              borderRadius: 18,
              border: "1px solid rgba(0,0,0,.08)",
            }}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
