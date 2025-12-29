// src/pages/Home.jsx
import { useEffect, useMemo, useState } from "react";
import styles from "./Home.module.scss";

import Button from "../components/ui/Button.jsx";
import CategoryStrip from "../features/categories/CategoryStrip.jsx";
import categories from "../features/categories/categories.mock.js";

import { getProducts } from "../services/productsService.js";
import ProductCard from "../features/products/ProductCard.jsx";

import AboutStrip from "../components/sections/AboutStrip.jsx";
import ProductShowcase from "../components/sections/ProductShowcase.jsx";

export default function Home() {
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

    const onCategorySelect = () => {
        // فعلاً فقط اسکرول به بخش محصولات. (بعداً اگر فیلتر خواستی همینجا وصل می‌کنی)
        const el = document.getElementById("products");
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const heroText = useMemo(
        () => ({
            p1: "شرکت کامچین در سال ۱۳۵۹ با هدف تولید محصولات غذایی با کیفیت بالا، فعالیت خود را در شهر تهران آغاز کرد.",
            p2: "کامچین با تمرکز بر تولید رب گوجه‌فرنگی، مربا و کمپوت، به تدریج سبد محصولات خود را گسترش داد و با برند «کامچین» و شعار «غذای ایرانی، همیشه و همه‌جا در دسترس»، به یکی از بزرگ‌ترین تولیدکنندگان غذای آماده در ایران تبدیل شد.",
        }),
        []
    );

    return (
        <div className={styles.page}>
            {/* 1) Hero معرفی کامچین (اول صفحه) */}
            <section className={styles.hero}>
                <div className={styles.heroCard}>
                    <h1 className={styles.h1}>کامچین</h1>
                    <p className={styles.p}>{heroText.p1}</p>
                    <p className={styles.p}>{heroText.p2}</p>

                    <div className={styles.heroActions}>
                        <Button to="/products" variant="primary">
                            مشاهده محصولات
                        </Button>
                        <Button to="/contact" variant="ghost">
                            تماس
                        </Button>
                    </div>
                </div>

                <div className={styles.heroMedia} aria-hidden="true" />
            </section>

            {/* 2) دسته‌بندی */}
            <CategoryStrip title="محصولات کامچین" items={categories} onSelect={onCategorySelect} />

            {/* 3) محصولات منتخب (مثل نمونه کاله) */}
            <ProductShowcase />

            {/* 4) لیست محصولات */}
            <section id="products" className={styles.products}>
                <div className={styles.sectionHead}>
                    <h2 className={styles.h2}>محصولات منتخب</h2>
                    <span className={styles.underline} />
                </div>

                {loading ? (
                    <div className={styles.loading}>در حال دریافت محصولات...</div>
                ) : (
                    <div className={styles.grid}>
                        {products.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                )}
            </section>

            {/* 5) درباره ما پایین‌تر */}
            <AboutStrip />
        </div>
    );
}
