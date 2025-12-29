// src/components/sections/ProductShowcase.jsx
import { useMemo, useState } from "react";
import styles from "./ProductShowcase.module.scss";
import showcaseData from "../../data/showcase.mock.js";

export default function ProductShowcase() {
    const items = useMemo(() => (Array.isArray(showcaseData) ? showcaseData : []), []);
    const [idx, setIdx] = useState(0);

    const active = items[idx];

    const prev = () => setIdx((v) => (v - 1 + items.length) % items.length);
    const next = () => setIdx((v) => (v + 1) % items.length);

    if (!items.length) return null;

    return (
        <section className={styles.wrap} aria-label="محصولات منتخب">
            <div className={styles.grid}>
                <div className={styles.left}>
                    <img className={styles.leftImg} src={active.leftImage} alt={active.titleFa} loading="lazy" />
                </div>

                <div className={styles.middle}>
                    <div className={styles.center}>
                        <div className={styles.logoRow}>
                            <img className={styles.logo} src="/images/logo.png" alt="Kamchin" />
                        </div>

                        <h3 className={styles.title}>{active.titleFa}</h3>
                        <p className={styles.desc}>{active.descFa}</p>

                        <a className={styles.cta} href={active.href} target="_blank" rel="noreferrer">
                            {active.ctaFa}
                        </a>
                    </div>
                </div>

                <div className={styles.right}>
                    <div className={styles.splash} data-color={active.splashColor} />
                    <img className={styles.productImg} src={active.productImage} alt={active.titleFa} loading="lazy" />

                    <div className={styles.nav}>
                        <button type="button" className={styles.navBtn} onClick={prev} aria-label="قبلی">
                            ‹
                        </button>
                        <button type="button" className={styles.navBtn} onClick={next} aria-label="بعدی">
                            ›
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
