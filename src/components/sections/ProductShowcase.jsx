import { useEffect, useMemo, useState } from "react";
import styles from "./ProductShowcase.module.scss";
import showcaseData from "../../data/showcase.mock.js";
import useI18n from "../../i18n/useI18n.js";
import { resolvePic } from "../../utils/asset.js";
import { useCart } from "../../features/cart/CartContext.jsx";
import { toast } from "../ui/ToastHost.jsx";

function slidesFromProducts(products) {
  const list = Array.isArray(products) ? products : [];
  const featured = list.filter((p) => p?.featured);

  return featured.slice(0, 6).map((p) => ({
    id: p.id,
    titleFa: p.nameFa ?? "",
    titleEn: p.nameEn ?? p.nameFa ?? "",
    // توضیح باید مثل رفرنس زیر عنوان نمایش داده شود (نه وزن)
    descFa: p.shortDescFa ?? p.descriptionFa ?? p.description ?? "",
    descEn: p.shortDescEn ?? p.descriptionEn ?? p.description ?? "",
    // وزن جداگانه (خط کوچک زیر عنوان)
    weightFa: p.netWeightFa ?? "",
    weightEn: p.netWeightEn ?? p.netWeightFa ?? "",
    image: resolvePic(p.image) || "",
    href: `/product/${p.id}`,
    ctaFa: "آشپزی با این فرآورده...",
    ctaEn: "Cook with this product...",
    splashColor: "pink",
  }));
}

export default function ProductShowcase({ products = [] }) {
  const { lang, t } = useI18n();
  const cart = useCart();

  const slides = useMemo(() => {
    const fromProducts = slidesFromProducts(products);
    return fromProducts.length ? fromProducts : showcaseData;
  }, [products]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!slides.length) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6500);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (!slides.length) return null;

  const active = slides[index];

  const title =
    lang === "en" ? active.titleEn ?? active.titleFa : active.titleFa ?? active.titleEn;

  const desc =
    lang === "en" ? active.descEn ?? active.descFa : active.descFa ?? active.descEn;

  const weight =
    lang === "en" ? active.weightEn ?? active.weightFa : active.weightFa ?? active.weightEn;

  const cta = lang === "en" ? active.ctaEn ?? t("ui.more") : active.ctaFa ?? t("ui.more");

  const goPrev = () => {
    if (!slides.length) return;
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  };

  const addToCart = () => {
    if (!active?.id) return;
    cart.add(active.id);
    toast(t("ui.added_to_cart"), "success");
  };

  const imgSrc = active.image || active.productImage || active.leftImage || "";

  return (
    <section className={styles.wrap} aria-label="Product showcase">
      <div className={styles.hero}>
        <div className={styles.media}>
          {imgSrc ? (
            <img src={imgSrc} alt={title} className={styles.product} loading="eager" />
          ) : (
            <div className={styles.productFallback} aria-hidden="true" />
          )}
        </div>

        <button type="button" className={styles.navPrev} onClick={goPrev} aria-label={t("ui.prev")}>
          <span className={styles.iconArrow} />
        </button>

        <button type="button" className={styles.addCart} onClick={addToCart} aria-label={t("ui.add_to_cart")}>
          <span className={styles.iconPlus} />
        </button>

        <div className={styles.content}>
          <h1 className={styles.title}>{title}</h1>
          {!!weight && <div className={styles.weight}>{weight}</div>}
          {!!desc && <p className={styles.desc}>{desc}</p>}

          <a href={active.href ?? "#"} className={styles.cta}>
            {cta}
          </a>

          <div className={styles.dots}>
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.dot} ${i === index ? styles.active : ""}`}
                onClick={() => setIndex(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
