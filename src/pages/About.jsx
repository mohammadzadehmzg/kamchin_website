import styles from "./Page.module.scss";
import useI18n from "../i18n/useI18n.js";

const ABOUT_IMG =
  "/pic/U062fU0631U0628U0627U0631U0647 U06cc U06a9U0627U0645U0686U06ccU0646.webp";

export default function About() {
  const { t } = useI18n();

  return (
    <section className="container section">
      <h1 className="h1">{t("pages.about.title")}</h1>

      <div className={styles.card}>
        <p className="muted" style={{ whiteSpace: "pre-line" }}>
          {t("pages.about.body")}
        </p>

        <div style={{ marginTop: 18 }}>
          <img
            src={ABOUT_IMG}
            alt={t("pages.about.title")}
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
