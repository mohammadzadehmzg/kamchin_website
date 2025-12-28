import React from "react";
import styles from "./CategoryStrip.module.scss";
import { CookingPot, Soup, Leaf, Beef, Salad } from "lucide-react";

const iconMap = {
    pan: Soup,
    pot: CookingPot,
    leaf: Leaf,
    meat: Beef,
    veggie: Salad,
};

export default function CategoryStrip({ title, items = [], onSelect }) {
    return (
        <section className={styles.wrap}>
            <div className={styles.head}>
                <h2 className={styles.h2}>{title}</h2>
                <span className={styles.underline} />
            </div>

            <div className={styles.row}>
                {items.map((c) => {
                    const Icon = iconMap[c.icon] ?? Leaf;
                    return (
                        <button key={c.id} className={styles.item} onClick={() => onSelect?.(c.id)}>
                            <Icon className={styles.icon} size={44} />
                            <span className={styles.label}>{c.titleFa}</span>
                        </button>
                    );
                })}
            </div>

            <div className={styles.arrows}>
                <button className={styles.arrow} aria-label="قبلی">←</button>
                <button className={styles.arrow} aria-label="بعدی">→</button>
            </div>
        </section>
    );
}
