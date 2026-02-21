import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../features/cart/CartContext.jsx";
import styles from "./ProductDetail.module.scss";

import { getProductById } from "../services/productsService.js";
import useI18n from "../i18n/useI18n.js";
import { formatPrice } from "../utils/money.js";
import categories from "../features/categories/categories.mock.js";

function categoryTitle(id) {
  return categories.find((c) => c.id === id)?.titleFa ?? id;
}

export default function ProductDetail() {
  const cart = useCart();
  const { lang, t } = useI18n();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(null);
    getProductById(id)
      .then((p) => {
        if (!alive) return;
        setProduct(p);
      })
      .catch((e) => {
        if (!alive) return;
        setError(e);
        setProduct(null);
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [id]);

  if (loading) {
    return (
      <section className="container section">
        <h1 className="h1">{t("products.detail.loading")}</h1>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="container section">
        <h1 className="h1">{t("products.detail.not_found")}</h1>
        <p className="muted">{error ? t("products.detail.load_error") : t("products.detail.not_found_desc")}</p>
        <Link to="/products" className={styles.back}>بازگشت به فراورده‌ها</Link>
      </section>
    );
  }

  const name = lang === "en" ? product.nameEn : product.nameFa;
  const marketLabel = product.market === "export" ? (lang === "en" ? "Export" : "صادراتی") : (lang === "en" ? "Domestic" : "داخلی");
  const priceLabel = formatPrice(product.finalPrice ?? product.price, lang);
  const currency = lang === "en" ? t("products.price.currency_en") : t("products.price.currency_fa");

  return (
    <section className={`container section ${styles.wrap}`}>
      <div className={styles.topRow}>
        <div className={styles.breadcrumbs}>
          <Link to="/products">{t("nav.products")}</Link>
          {product.categoryId ? (
            <>
              <span>/</span>
              <span>{categoryTitle(product.categoryId)}</span>
            </>
          ) : null}
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.media}>
          {product.image ? <img className={styles.img} src={product.image} alt={product.nameFa} /> : <div className={styles.imgFallback}>بدون تصویر</div>}
        </div>

        <div className={styles.body}>
          <h1 className={styles.title}>{name}</h1>

          <div className={styles.meta}>
            <span>بازار: {marketLabel}</span>
            {product.netWeightFa ? <span>وزن خالص: {product.netWeightFa}</span> : null}
            {product.categoryId ? <span>دسته: {categoryTitle(product.categoryId)}</span> : null}
            {product.raw?.code ? <span>کد: {String(product.raw.code)}</span> : null}
          </div>

          <div className={styles.priceRow}>
            <span className={styles.price}>{priceLabel} {currency}</span>
          </div>

          <div className={styles.desc}>
            {product.description ? product.description : "توضیحات این فراورده به‌زودی تکمیل می‌شود."}
          </div>

          <div className={styles.actions}>
            <Link to="/products" className={styles.back}>بازگشت به لیست</Link>
            <button type="button" className={styles.add} onClick={() => cart.add(product.id)}>
              افزودن به سبد خرید
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
