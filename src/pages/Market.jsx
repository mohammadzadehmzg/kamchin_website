import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Market.module.scss";

import { getProducts } from "../services/productsService.js";
import ProductCard from "../features/products/ProductCard.jsx";
import categories from "../features/categories/categories.mock.js";

const MARKET_TITLES = {
  domestic: "محصولات داخلی",
  export: "محصولات صادراتی",
};

const MARKET_CATEGORIES = {
  domestic: ["fried", "stew-meat", "food-meat", "food-veg"],
  export: ["fried", "stew-veg", "food"],
};

function categoryTitle(id) {
  return categories.find((c) => c.id === id)?.titleFa ?? id;
}

export default function Market() {
  const { market = "domestic", category } = useParams();
  const safeMarket = market === "export" ? "export" : "domestic";

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

  return (
    <section className={`container section ${styles.wrap}`}>
      <div className={styles.header}>
        <h1 className="h1">{MARKET_TITLES[safeMarket]}</h1>

        <div className={styles.marketTabs}>
          <Link className={`${styles.marketTab} ${safeMarket === "domestic" ? styles.active : ""}`.trim()} to="/market/domestic">
            محصولات داخلی
          </Link>
          <Link className={`${styles.marketTab} ${safeMarket === "export" ? styles.active : ""}`.trim()} to="/market/export">
            محصولات صادراتی
          </Link>
        </div>
      </div>

      <div className={styles.catTabs} role="tablist" aria-label="Categories">
        {catList.map((id) => (
          <Link
            key={id}
            to={`/market/${safeMarket}/${id}`}
            className={`${styles.catTab} ${id === activeCategory ? styles.catActive : ""}`.trim()}
            role="tab"
            aria-selected={id === activeCategory}
          >
            {categoryTitle(id)}
          </Link>
        ))}
      </div>

      <div className={styles.grid}>
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} onOpen={openProduct} />
        ))}
      </div>
    </section>
  );
}
