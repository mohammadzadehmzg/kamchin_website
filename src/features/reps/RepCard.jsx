import React from "react";
import Card from "../../components/ui/Card.jsx";
import styles from "./RepCard.module.scss";

export default function RepCard({ rep }) {
    const phones = Array.isArray(rep?.phonesFa) ? rep.phonesFa : [];
    return (
        <Card className={styles.card}>
            <div className={styles.title}>{rep?.provinceFa ?? "—"}</div>
            <div className={styles.muted}>{rep?.companyFa ?? "—"}</div>
            <div className={styles.phone}>{phones.length ? phones.join(" ، ") : "—"}</div>
        </Card>
    );
}
