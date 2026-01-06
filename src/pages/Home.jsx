import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.scss";

import { getProducts } from "../services/productsService.js";
import ProductCard from "../features/products/ProductCard.jsx";

import AboutStrip from "../components/sections/AboutStrip.jsx";
import ProductShowcase from "../components/sections/ProductShowcase.jsx";

import useI18n from "../i18n/useI18n.js";

export default function Home() {
  const { t } = useI18n();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      setLoading(true);
      try {
        const res = await getProducts();
        if (mounted) setProducts(Array.isArray(res) ? res : []);
      } catch {
        if (mounted) setProducts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const featured = useMemo(() => {
    return products.filter((p) => p?.featured).slice(0, 8);
  }, [products]);

  const openProduct = (p) => {
    if (!p?.id) return;
    window.open(`/product/${p.id}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={styles.page}>
      <section id="hero" className={styles.sectionHero}>
        <ProductShowcase products={products} />
      </section>

      <section id="products" className={styles.section}>
        <div className="container">
          <div className={styles.marketRow}>
            <Link to="/market/domestic" className={styles.marketCard}>
              <div className={styles.marketTitle}>محصولات داخلی</div>
              <div className={styles.marketDesc}>مشاهده دسته‌بندی و محصولات بازار داخلی</div>
            </Link>
            <Link to="/market/export" className={styles.marketCard}>
              <div className={styles.marketTitle}>محصولات صادراتی</div>
              <div className={styles.marketDesc}>مشاهده دسته‌بندی و محصولات بازار صادرات</div>
            </Link>
          </div>

          <div className={styles.featuredHeader}>
            <h2 className="h2">{loading ? "در حال دریافت محصولات..." : "منتخب محصولات"}</h2>
            <p className="muted">برای دیدن جزئیات هر محصول، روی کارت آن کلیک کنید.</p>
          </div>

          <div className={styles.grid}>
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} onOpen={openProduct} />
            ))}
          </div>
        </div>
      </section>

      <section id="about" className={styles.section}>
        <AboutStrip />
      </section>

      <section id="contact" className={styles.section}>
        <div className="container">
          <div className={styles.contactCard}>
            <h2 className={styles.contactTitle}>{t("sections.contact")}</h2>
            <p className={styles.contactText}>info@kamchin.com</p>
          </div>
        </div>
      </section>
    </div>
  );
}
