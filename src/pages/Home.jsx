import React, { useEffect, useMemo, useState } from "react";
import styles from "./Home.module.scss";
import Button from "../components/ui/Button.jsx";
import CategoryStrip from "../features/categories/CategoryStrip.jsx";
import { categories } from "../features/categories/categories.mock.js";
import { getProducts } from "../services/productsService.js";
import ProductCard from "../features/products/ProductCard.jsx";
import AboutStrip from "../components/sections/AboutStrip.jsx";

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts().then(setProducts);
    }, []);

    const featured = useMemo(
        () => products.filter((p) => p.featured).slice(0, 6),
        [products]
    );

    return (
        <>
            <section className={`container ${styles.hero}`}>
                <div className={styles.heroText}>
                    <h1 className="h1">کامچین</h1>
                    <p className="muted">
                        متن معرفی رسمی شرکت را اینجا قرار دهید. کوتاه، شفاف و مدیرپسند.
                    </p>
                    <div className={styles.actions}>
                        <Button as="a" href="/products">مشاهده محصولات</Button>
                        <Button as="a" href="/contact" variant="ghost">تماس</Button>
                    </div>
                </div>

                <div className={styles.heroMedia}>
                    <img className={styles.heroImg} src="/images/banners/hero.jpg" alt="Kamchin hero" />
                </div>
            </section>

            <CategoryStrip title="محصولات کامچین" items={categories} onSelect={() => {}} />

            <section className="container section">
                <div className={styles.sectionHead}>
                    <h2 className="h2">محصولات منتخب</h2>
                    <span className={styles.underline} />
                </div>

                <div className={styles.grid}>
                    {featured.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </section>

            <AboutStrip />
        </>
    );
}
