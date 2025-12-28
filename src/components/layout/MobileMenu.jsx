import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./MobileMenu.module.scss";

export default function MobileMenu({ open, onClose, items = [] }) {
    useEffect(() => {
        if (!open) return;

        const onKey = (e) => e.key === "Escape" && onClose?.();
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className={styles.overlay} role="dialog" aria-modal="true">
            <div className={styles.backdrop} onClick={onClose} />
            <div className={styles.panel}>
                <button className={styles.close} onClick={onClose} aria-label="بستن">
                    ×
                </button>

                <nav className={styles.nav}>
                    {items.map((it) => (
                        <NavLink
                            key={it.to}
                            to={it.to}
                            className={({ isActive }) =>
                                `${styles.link} ${isActive ? styles.active : ""}`
                            }
                            onClick={onClose}
                        >
                            {it.label}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </div>
    );
}
