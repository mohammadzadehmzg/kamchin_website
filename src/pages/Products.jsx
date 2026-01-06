import { useEffect, useMemo, useState } from "react";
import styles from "./Products.module.scss";
import { getProducts } from "../services/productsService.js";
import ProductCard from "../features/products/ProductCard.jsx";
import { categories } from "../features/categories/categories.mock.js";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [cat, setCat] = useState("all");

    useEffect(() => {
        getProducts().then(setProducts);
    }, []);

    const filtered = useMemo(() => {
        if (cat === "all") return products;
        return products.filter((p) => p.categoryId === cat);
    }, [products, cat]);

    return (
        <section className="container section">
            <div className={styles.head}>
                <h1 className="h1">محصولات کامچین</h1>
            </div>

            <div className={styles.filters}>
                <button className={`${styles.pill} ${cat === "all" ? styles.active : ""}`} onClick={() => setCat("all")}>
                    همه
                </button>
                {categories.map((c) => (
                    <button
                        key={c.id}
                        className={`${styles.pill} ${cat === c.id ? styles.active : ""}`}
                        onClick={() => setCat(c.id)}
                    >
                        {c.titleFa}
                    </button>
                ))}
            </div>

            <div className={styles.grid}>
                {filtered.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </section>
    );
}
