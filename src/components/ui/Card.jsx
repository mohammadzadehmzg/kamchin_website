import React from "react";
import styles from "./Card.module.scss";

export default function Card({ className = "", children }) {
    return <div className={`${styles.card} ${className}`}>{children}</div>;
}
