import styles from "./BlogStrip.module.scss";
import useI18n from "../../i18n/useI18n.js";

const posts = [
  {
    id: "post-1",
    title: "جدیدترین مطالب سایت",
    subtitle: "نگاه کوتاه به اخبار و مطالب کامچین",
    image: "/pic/U062dU0644U0648U0627-250-160x300.webp",
  },
  {
    id: "post-2",
    title: "راهنمای انتخاب غذای آماده",
    subtitle: "چطور انتخاب سالم‌تری داشته باشیم",
    image: "/pic/U0633U0645U0646U0648-250-160x300.webp",
  },
  {
    id: "post-3",
    title: "نکات نگهداری و مصرف",
    subtitle: "چند توصیه ساده برای کیفیت بهتر",
    image: "/pic/U0634U0644U0647-U0632U0631U062f-250-160x300.webp",
  },
];

export default function BlogStrip() {
  const { t, lang } = useI18n();
  return (
    <section className={styles.wrap} aria-label={t("sections.latest_site_posts")}>
      <div className="container">
        <div className={styles.head}>
          <h2 className="h2">{t("sections.latest_site_posts")}</h2>
          <span className={styles.underline} />
        </div>

        <div className={styles.grid}>
          {posts.map((p) => (
            <a key={p.id} href="#" className={styles.card}>
              <img src={p.image} alt="" loading="lazy" className={styles.img} />
              <div className={styles.body}>
                <div className={styles.title}>{lang === "en" ? t("sections.latest_site_posts") : p.title}</div>
                <div className={styles.sub}>{lang === "en" ? t("sections.latest_site_posts_sub") : p.subtitle}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
