import React from "react";
import Card from "../../components/ui/Card.jsx";
import styles from "./ProductCard.module.scss";

export default function ProductCard({ product }) {
    return (
        <Card className={styles.card}>
            <div className={styles.media}>
                <img className={styles.img} src={product.image} alt={product.nameFa} loading="lazy" />

                <div className={styles.overlay}>
                    <div className={styles.overlayInner}>
                        <div className={styles.overlayTitle}>{product.nameFa}</div>
                        <div className={styles.overlaySub}>مشاهده جزئیات</div>
                        <span className={styles.line} />
                    </div>
                </div>
            </div>

            <div className={styles.body}>
                <div className={styles.name}>{product.nameFa}</div>
                <div className={styles.meta}>{product.netWeightFa}</div>
            </div>
        </Card>
    );
}