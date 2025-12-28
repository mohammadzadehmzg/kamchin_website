import React from "react";
import styles from "./Button.module.scss";

export default function Button({ as = "button", variant = "primary", className = "", ...props }) {
    const Comp = as;
    return <Comp className={`${styles.btn} ${styles[variant]} ${className}`} {...props} />;
}
