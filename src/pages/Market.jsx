import { useEffect, useMemo, useState } from "react";
import useI18n from "../i18n/useI18n.js";
import { Link, useParams } from "react-router-dom";
import styles from "./Market.module.scss";

import { getProducts } from "../services/productsService.js";
import ProductCard from "../features/products/ProductCard.jsx";
import categories from "../features/categories/categories.mock.js";
import { useCart } from "../features/cart/CartContext.jsx";
import { toast } from "../components/ui/ToastHost.jsx";

const MARKET_TITLES = {
  domestic: "ui.domestic_products",
  export: "ui.export_products",
};

const MARKET_CATEGORIES = {
  domestic: ["fried", "stew-meat", "food-meat", "food-veg"],
  export: ["fried", "stew-veg", "food"],
};

function categoryTitle(id, lang) {
  const c = categories.find((x) => x.id === id);
  if (!c) return id;
  return lang === "en" ? (c.titleEn ?? c.titleFa ?? id) : (c.titleFa ?? c.titleEn ?? id);
}

function CategoryIcon({ id }) {
  // آیکن‌های سبک line مثل رفرنس Main pro
  const common = { width: 34, height: 34, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" };

  if (id === "fried" || id === "stew-veg" || id === "stew-meat") {
    // tray
    return (
      <svg {...common}>
        <path d="M3 7h18v7a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 7V5.5A2.5 2.5 0 0 1 10.5 3h3A2.5 2.5 0 0 1 16 5.5V7" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  // heart-hands
  return (
    <svg {...common}>
      <path d="M12 7.2c1.2-1.5 3.5-2.4 5.2-.8 1.6 1.5 1.2 3.8-.5 5.4L12 16.2l-4.7-4.4c-1.7-1.6-2.1-3.9-.5-5.4 1.7-1.6 4-.7 5.2.8z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4.2 13.3c1.1 2.6 3.5 4.7 7.8 7.2 4.3-2.5 6.7-4.6 7.8-7.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Market() {
  const { t, lang } = useI18n();
  const { market = "domestic", category } = useParams();
  const safeMarket = market === "export" ? "export" : "domestic";
  const cart = useCart();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((list) => setProducts(Array.isArray(list) ? list : []));
  }, []);

  const catList = MARKET_CATEGORIES[safeMarket] ?? MARKET_CATEGORIES.domestic;
  const activeCategory = catList.includes(category) ? category : catList[0];

  const filtered = useMemo(() => {
    return products.filter((p) => p && p.market === safeMarket && p.categoryId === activeCategory);
  }, [products, safeMarket, activeCategory]);

  const openProduct = (p) => {
    if (!p?.id) return;
    window.open(`/product/${p.id}`, "_blank", "noopener,noreferrer");
  };

  const addToCart = (p) => {
    if (!p?.id) return;
    cart.add(p.id);
    toast("به سبد خرید اضافه شد", "success");
  };

  return (
    <section className={`container section ${styles.wrap}`}>
      <div className={styles.header}>
        <h1 className="h1">{t(MARKET_TITLES[safeMarket])}</h1>

        <div className={styles.marketTabs}>
          <Link className={`${styles.marketTab} ${safeMarket === "domestic" ? styles.active : ""}`.trim()} to="/market/domestic">
            {t("ui.domestic_products")}
          </Link>
          <Link className={`${styles.marketTab} ${safeMarket === "export" ? styles.active : ""}`.trim()} to="/market/export">
            {t("ui.export_products")}
          </Link>
        </div>
      </div>

      <div className={styles.catCards} aria-label={t("ui.categories")}>
        {catList.map((id) => (
          <Link
            key={id}
            to={`/market/${safeMarket}/${id}`}
            className={`${styles.catCard} ${id === activeCategory ? styles.catActive : ""}`.trim()}
            aria-current={id === activeCategory ? "page" : undefined}
          >
            <div className={styles.catIcon} aria-hidden="true"><CategoryIcon id={id} /></div>
            <div className={styles.catLabel}>{categoryTitle(id, lang)}</div>
          </Link>
        ))}
      </div>

      <div className={styles.grid}>
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} onOpen={openProduct} onAddToCart={addToCart} />
        ))}
      </div>
    </section>
  );
}
