import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../features/cart/CartContext.jsx";
import { toast } from "../components/ui/ToastHost.jsx";
import styles from "./ProductDetail.module.scss";

import { getProducts } from "../services/productsService.js";
import categories from "../features/categories/categories.mock.js";

function categoryTitle(id) {
  return categories.find((c) => c.id === id)?.titleFa ?? id;
}

export default function ProductDetail() {
  const cart = useCart();
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((list) => setProducts(Array.isArray(list) ? list : []));
  }, []);

  const product = useMemo(() => products.find((p) => p?.id === id) ?? null, [products, id]);

  if (!product) {
    return (
      <section className="container section">
        <h1 className="h1">محصول پیدا نشد</h1>
        <p className="muted">این محصول در لیست فعلی وجود ندارد.</p>
        <Link to="/market/domestic" className={styles.back}>بازگشت به محصولات</Link>
      </section>
    );
  }

  const marketLabel = product.market === "export" ? "صادراتی" : "داخلی";

  return (
    <section className={`container section ${styles.wrap}`}>
      <div className={styles.topRow}>
        <div className={styles.breadcrumbs}>
          <Link to={`/market/${product.market}`}>{product.market === "export" ? "محصولات صادراتی" : "محصولات داخلی"}</Link>
          <span>/</span>
          <Link to={`/market/${product.market}/${product.categoryId}`}>{categoryTitle(product.categoryId)}</Link>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.media}>
          {product.image ? <img className={styles.img} src={product.image} alt={product.nameFa} /> : <div className={styles.imgFallback}>بدون تصویر</div>}
        </div>

        <div className={styles.body}>
          <h1 className={styles.title}>{product.nameFa}</h1>

          <div className={styles.meta}>
            <span>بازار: {marketLabel}</span>
            {product.netWeightFa ? <span>وزن خالص: {product.netWeightFa}</span> : null}
            {product.categoryId ? <span>دسته: {categoryTitle(product.categoryId)}</span> : null}
          </div>

          <div className={styles.desc}>
            {product.description ? product.description : "توضیحات این محصول به‌زودی تکمیل می‌شود."}
          </div>

          <div className={styles.actions}>
            <Link to={`/market/${product.market}/${product.categoryId}`} className={styles.back}>بازگشت به لیست</Link>
            <button type="button" className={styles.add} onClick={() => { cart.add(product.id); toast(`«${product.name}» به سبد خرید اضافه شد`, "success"); }}>
              افزودن به سبد خرید
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
