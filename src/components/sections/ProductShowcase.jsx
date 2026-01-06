import { useEffect, useMemo, useState } from "react";
import styles from "./ProductShowcase.module.scss";
import showcaseData from "../../data/showcase.mock.js";
import useI18n from "../../i18n/useI18n.js";

function defaultSlidesFromProducts(products) {
    const list = Array.isArray(products) ? products : [];
    const featured = list.filter((p) => p && p.featured);
    if (!featured.length) return [];

    return featured.slice(0, 6).map((p) => ({
        id: p.id,
        titleFa: p.nameFa,
        titleEn: p.nameEn ?? p.nameFa,
        descFa: p.netWeightFa ?? "",
        descEn: p.netWeightEn ?? p.netWeightFa ?? "",
        leftImage: p.heroLeftImage ?? p.image,
        productImage: p.image,
        href: `/product/${p.id}`,
        ctaFa: "مشاهده جزئیات",
        ctaEn: "View details",
        splashColor: "green",
    }));
}

export default function ProductShowcase({ products = [] }) {
    const { lang, t } = useI18n();

    const slides = useMemo(() => {
        const fromProducts = defaultSlidesFromProducts(products);
        if (fromProducts.length) return fromProducts;
        return Array.isArray(showcaseData) ? showcaseData : [];
    }, [products]);

    const [idx, setIdx] = useState(0);

    useEffect(() => {
        if (!slides.length) return undefined;
        const id = window.setInterval(() => setIdx((v) => (v + 1) % slides.length), 6500);
        return () => window.clearInterval(id);
    }, [slides.length]);

    if (!slides.length) return null;

    const active = slides[idx];

    const title = lang === "en" ? (active.titleEn ?? active.titleFa) : (active.titleFa ?? active.titleEn);
    const desc = lang === "en" ? (active.descEn ?? active.descFa) : (active.descFa ?? active.descEn);
    const cta = lang === "en" ? (active.ctaEn ?? t("ui.more")) : (active.ctaFa ?? t("ui.more"));

    const prev = () => setIdx((v) => (v - 1 + slides.length) % slides.length);
    const next = () => setIdx((v) => (v + 1) % slides.length);

    return (
        <section id="hero" className={styles.wrap} aria-label="Showcase">
            <div className={styles.grid}>
                <div className={styles.left}>
                    {/*
                      اسلایدر قبلی با translateX روی بعضی مرورگرها/RTL جابجا می‌پرید.
                      اینجا فقط تصویر فعال را عوض می‌کنیم تا همیشه دقیقاً سرِ جایش بماند.
                    */}
                    <div className={styles.singleFrame}>
                        <img
                            key={active.id}
                            className={styles.leftImg}
                            src={active.leftImage}
                            alt={active.titleFa || ""}
                            loading="eager"
                        />
                    </div>
                    <div className={styles.leftShade} />
                </div>

                <div className={styles.middle}>
                    <div className={styles.center}>
                        <h1 className={styles.title}>{title}</h1>
                        <p className={styles.desc}>{desc}</p>
                        <a className={styles.cta} href={active.href || "#"} target="_blank" rel="noreferrer">
                            {cta}
                        </a>

                        <div className={styles.dots} aria-label="Slides">
                            {slides.map((s, i) => (
                                <button
                                    key={s.id}
                                    type="button"
                                    className={`${styles.dot} ${i === idx ? styles.dotActive : ""}`.trim()}
                                    onClick={() => setIdx(i)}
                                    aria-label={`Slide ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.right}>
                    <div className={styles.splash} data-color={active.splashColor || "green"} />

                    <div className={styles.prodSingle}>
                        <div className={styles.prodSlide}>
                            <img
                                key={active.id}
                                className={styles.productImg}
                                src={active.productImage}
                                alt={active.titleFa || ""}
                                loading="eager"
                            />
                        </div>
                    </div>

                    <div className={styles.nav}>
                        <button type="button" className={styles.navBtn} onClick={prev} aria-label="Prev">
                            ‹
                        </button>
                        <button type="button" className={styles.navBtn} onClick={next} aria-label="Next">
                            ›
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
