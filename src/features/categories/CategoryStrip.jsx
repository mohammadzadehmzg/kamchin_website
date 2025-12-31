// src/features/categories/CategoryStrip.jsx
import { useMemo, useRef } from "react";
import styles from "./CategoryStrip.module.scss";
import { CookingPot, Soup, Leaf, Beef, Salad } from "lucide-react";

const iconMap = {
    pan: Soup,
    pot: CookingPot,
    leaf: Leaf,
    meat: Beef,
    veggie: Salad,
};

export default function CategoryStrip({ title = "محصولات کامچین", items = [], onSelect }) {
    const scrollerRef = useRef(null);

    const icons = useMemo(() => iconMap, []);

    const scrollByCards = (dir) => {
        const el = scrollerRef.current;
        if (!el) return;

        // عرض یک کارت + gap (با fallback)
        const first = el.querySelector(`.${styles.item}`);
        const cardW = first ? first.getBoundingClientRect().width : 200;
        const gap = 14;
        const step = Math.round(cardW + gap);

        // در RTL حس کاربر: "بعدی" یعنی حرکت به سمت چپِ بصری
        // scrollLeft در مرورگرها در RTL رفتارهای متفاوت دارد.
        // ساده‌ترین راه: از scrollBy با علامت ثابت استفاده می‌کنیم و با تجربه تنظیم می‌کنیم.
        const delta = dir === "next" ? step : -step;

        el.scrollBy({ left: delta, behavior: "smooth" });
    };

    return (
        <section className={styles.wrap} aria-label="دسته‌بندی محصولات">
            <div className={styles.head}>
                <h2 className={styles.h2}>{title}</h2>
                <span className={styles.underline} />
            </div>

            <div className={styles.viewport}>
                <button
                    type="button"
                    className={styles.arrow}
                    aria-label="قبلی"
                    onClick={() => scrollByCards("prev")}
                >
                    ‹
                </button>

                <div ref={scrollerRef} className={styles.scroller}>
                    {items.map((c) => {
                        const Icon = icons[c.icon] ?? Leaf;
                        return (
                            <button
                                key={c.id}
                                type="button"
                                className={styles.item}
                                onClick={() => onSelect?.(c.id)}
                            >
                                <Icon className={styles.icon} size={42} />
                                <span className={styles.label}>{c.titleFa}</span>
                            </button>
                        );
                    })}
                </div>

                <button
                    type="button"
                    className={styles.arrow}
                    aria-label="بعدی"
                    onClick={() => scrollByCards("next")}
                >
                    ›
                </button>
            </div>
        </section>
    );
}