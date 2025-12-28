import React from "react";
import styles from "./Page.module.scss";

export default function About() {
    return (
        <section className="container section">
            <h1 className="h1">درباره کامچین</h1>
            <div className={styles.card}>
                <p className="muted">
                    متن کامل درباره شرکت کامچین اینجا قرار می‌گیرد. (از واحد مارکتینگ بگیر و جایگزین کن)
                </p>
            </div>
        </section>
    );
}
