import { useEffect, useMemo, useState } from "react";
import styles from "./ProductsCarousel.module.scss";

function normalizeProduct(p) {
    if (!p || typeof p !== "object") return null;

    const id = p.id ?? p._id ?? p.slug ?? p.code ?? `${Math.random()}`;
    const title = p.title ?? p.name ?? p.titleFa ?? "محصول";
    const subtitle = p.subtitle ?? p.shortDesc ?? p.description ?? "";
    const image = p.image ?? p.img ?? p.imageUrl ?? p.cover ?? "";
    const categoryId = p.categoryId ?? p.category ?? p.catId ?? null;

    // optional meta
    const weight = p.weight ?? p.netWeight ?? "";
    const type = p.type ?? "";
    const isExport = Boolean(p.isExport ?? p.export ?? false);

    return { id, title, subtitle, image, categoryId, weight, type, isExport };
}

export default function ProductsCarousel({
                                             title = "محصولات",
                                             products = [],
                                             filterCategoryId = null,
                                         }) {
    const items = useMemo(() => {
        const normalized = (Array.isArray(products) ? products : [])
            .map(normalizeProduct)
            .filter(Boolean);

        if (!filterCategoryId) return normalized;
        return normalized.filter((p) => p.categoryId === filterCategoryId);
    }, [products, filterCategoryId]);

    const [active, setActive] = useState(null);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") setActive(null);
        };
        if (active) window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [active]);

    return (
        <section className={styles.wrap}>
            <div className={styles.head}>
                <h2 className={styles.h2}>{title}</h2>
                <span className={styles.underline} />
            </div>

            <div className={styles.grid}>
                {items.map((p) => (
                    <button
                        key={p.id}
                        type="button"
                        className={styles.card}
                        onClick={() => setActive(p)}
                    >
                        <div className={styles.media}>
                            {p.image ? (
                                <img className={styles.img} src={p.image} alt={p.title} loading="lazy" />
                            ) : (
                                <div className={styles.imgFallback}>بدون تصویر</div>
                            )}
                            <div className={styles.hoverCurtain} />
                            <div className={styles.hoverCta}>مشاهده جزئیات</div>
                        </div>

                        <div className={styles.meta}>
                            <div className={styles.titleRow}>
                                <h3 className={styles.title}>{p.title}</h3>
                                {p.isExport && <span className={styles.badge}>صادراتی</span>}
                            </div>

                            {p.subtitle ? <p className={styles.subtitle}>{p.subtitle}</p> : null}

                            {(p.weight || p.type) && (
                                <div className={styles.specs}>
                                    {p.type ? <span>{p.type}</span> : null}
                                    {p.weight ? <span>{p.weight}</span> : null}
                                </div>
                            )}
                        </div>
                    </button>
                ))}
            </div>

            {active && (
                <div
                    className={styles.modalOverlay}
                    role="dialog"
                    aria-modal="true"
                    aria-label="جزئیات محصول"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) setActive(null);
                    }}
                >
                    <div className={styles.modal}>
                        <button
                            type="button"
                            className={styles.modalClose}
                            onClick={() => setActive(null)}
                            aria-label="بستن"
                        >
                            ×
                        </button>

                        <div className={styles.modalBody}>
                            <div className={styles.modalMedia}>
                                {active.image ? (
                                    <img className={styles.modalImg} src={active.image} alt={active.title} />
                                ) : (
                                    <div className={styles.modalImgFallback}>بدون تصویر</div>
                                )}
                            </div>

                            <div className={styles.modalText}>
                                <div className={styles.modalTitleRow}>
                                    <h3 className={styles.modalTitle}>{active.title}</h3>
                                    {active.isExport && <span className={styles.badge}>صادراتی</span>}
                                </div>

                                {active.subtitle ? (
                                    <p className={styles.modalSubtitle}>{active.subtitle}</p>
                                ) : null}

                                {(active.type || active.weight) && (
                                    <div className={styles.modalSpecs}>
                                        {active.type ? <div>نوع: {active.type}</div> : null}
                                        {active.weight ? <div>وزن: {active.weight}</div> : null}
                                    </div>
                                )}

                                <div className={styles.modalActions}>
                                    <button
                                        type="button"
                                        className={styles.primaryBtn}
                                        onClick={() => setActive(null)}
                                    >
                                        بستن
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
