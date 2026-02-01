import { useMemo, useRef } from "react";
import styles from "./NewProductsStrip.module.scss";
import { resolvePic } from "../../utils/asset.js";
import useI18n from "../../i18n/useI18n.js";

export default function NewProductsStrip({
  title,
  products = [],
  onOpen,
}) {
  const { t, lang } = useI18n();
  const scrollerRef = useRef(null);

  const sectionTitle = title ?? t("sections.new_kamchin_products");

  const items = useMemo(() => {
    const arr = Array.isArray(products) ? products : [];
    // "جدید" واقعی نداریم؛ حداقل خروجی پایدار: اولین‌ها + unique id
    const seen = new Set();
    return arr.filter((p) => {
      const id = p?.id;
      if (!id || seen.has(id)) return false;
      seen.add(id);
      return true;
    });
  }, [products]);

  const scrollByCards = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const first = el.querySelector(`.${styles.card}`);
    const cardW = first ? first.getBoundingClientRect().width : 150;
    const gap = 14;
    const step = Math.round(cardW + gap);
    const delta = dir === "next" ? step : -step;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section className={styles.wrap} aria-label={sectionTitle}>
      <div className={styles.head}>
        <h2 className={styles.h2}>{sectionTitle}</h2>
        <span className={styles.underline} />
      </div>

      <div className={styles.viewport}>
        <button type="button" className={styles.arrow} aria-label={t("ui.prev")} onClick={() => scrollByCards("prev")}>‹</button>

        <div ref={scrollerRef} className={styles.scroller}>
          {items.slice(0, 12).map((p) => {
            const src = resolvePic(p?.image) || "";
            return (
              <button
                key={p.id}
                type="button"
                className={styles.card}
                onClick={() => onOpen?.(p)}
              >
                <div className={styles.imgWrap}>
                  {src ? (
                    <img className={styles.img} src={src} alt={(lang === "en" ? p?.nameEn : p?.nameFa) || t("ui.product")} loading="eager" />
                  ) : (
                    <div className={styles.imgFallback} />
                  )}
                </div>
                <span className={styles.label}>{(lang === "en" ? p?.nameEn : p?.nameFa) || ""}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
