import React from "react";
import styles from "./Section.module.scss";

/**
 * Section:
 * Reusable layout block with optional title/subtitle.
 */
export default function Section({ title, subtitle, children }) {
    return (
        <section className="container section">
            {title ? (
                <header className={styles.head}>
                    <h2 className={styles.title}>{title}</h2>
                    {subtitle ? <div className={styles.subtitle}>{subtitle}</div> : null}
                </header>
            ) : null}
            <div className={styles.body}>{children}</div>
        </section>
    );
}
