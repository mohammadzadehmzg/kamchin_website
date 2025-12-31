import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Home.module.scss";
import { Globe, Instagram, MessageCircle, Twitter } from "lucide-react";

import CategoryStrip from "../features/categories/CategoryStrip.jsx";
import categories from "../features/categories/categories.mock.js";

import { getProducts } from "../services/productsService.js";
import ProductsCarousel from "../features/products/ProductsCarousel.jsx";

import AboutStrip from "../components/sections/AboutStrip.jsx";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeCategoryId, setActiveCategoryId] = useState(null);

    const [langOpen, setLangOpen] = useState(false);
    const langRef = useRef(null);

    useEffect(() => {
        let alive = true;

        const run = async () => {
            setLoading(true);
            try {
                const res = await getProducts();
                if (!alive) return;
                setProducts(Array.isArray(res) ? res : []);
            } catch {
                if (!alive) return;
                setProducts([]);
            } finally {
                if (alive) setLoading(false);
            }
        };

        run();

        return () => {
            alive = false;
        };
    }, []);

    const categoryItems = useMemo(() => {
        return Array.isArray(categories) ? categories : [];
    }, []);

    useEffect(() => {
        const onDoc = (e) => {
            if (!langRef.current) return;
            if (!langRef.current.contains(e.target)) setLangOpen(false);
        };
        document.addEventListener("mousedown", onDoc);
        return () => document.removeEventListener("mousedown", onDoc);
    }, []);

    return (
        <div className={styles.page}>
            {/* Hero بالا */}
            <section className={styles.hero}>
                <img
                    className={styles.heroImg}
                    src="/images/banners/hero.jpg"
                    alt="Kamchin hero"
                    loading="eager"
                />

                {/* آیکن‌های کنار وقتی بالای صفحه هستیم (هدر مخفیه) */}
                <aside className={styles.sideBar} aria-label="شبکه‌های اجتماعی و زبان">
                    <a
                        className={styles.sideLink}
                        href="https://instagram.com/"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Instagram"
                        title="Instagram"
                    >
                        <Instagram size={18} />
                    </a>

                    {/* لینک واتساپ رو خودت بذار */}
                    <a className={styles.sideLink} href="#" aria-label="WhatsApp" title="WhatsApp">
                        <MessageCircle size={18} />
                    </a>

                    <a
                        className={styles.sideLink}
                        href="https://x.com/"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="X / Twitter"
                        title="X / Twitter"
                    >
                        <Twitter size={18} />
                    </a>

                    <div className={styles.langWrap} ref={langRef}>
                        <button
                            type="button"
                            className={styles.sideBtn}
                            onClick={() => setLangOpen((v) => !v)}
                            aria-label="زبان"
                            title="زبان"
                        >
                            <Globe size={18} />
                        </button>

                        {langOpen && (
                            <div className={styles.langDrop}>
                                <button type="button" onClick={() => setLangOpen(false)}>فارسی</button>
                                <button type="button" onClick={() => setLangOpen(false)}>English</button>
                            </div>
                        )}
                    </div>
                </aside>
            </section>

            {/* دسته‌بندی‌ها */}
            <section className={styles.section}>
                <CategoryStrip
                    title="محصولات کامچین"
                    items={categoryItems}
                    onSelect={(id) => setActiveCategoryId(id)}
                />
            </section>

            {/* لیست محصولات */}
            <section className={styles.section}>
                <ProductsCarousel
                    title={loading ? "در حال دریافت محصولات..." : "محصولات"}
                    products={products}
                    filterCategoryId={activeCategoryId}
                />
            </section>

            {/* درباره کامچین */}
            <section className={styles.section}>
                <AboutStrip />
            </section>
        </div>
    );
}
