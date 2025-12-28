import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";

export default function Navbar() {
    return (
        <nav className={styles.nav} aria-label="منوی اصلی">
            <Item to="/">خانه</Item>
            <Item to="/products">محصولات</Item>
            <Item to="/about">درباره ما</Item>
            <Item to="/contact">تماس</Item>
        </nav>
    );
}

function Item({ to, children }) {
    return (
        <NavLink
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`.trim()
            }
        >
            {children}
        </NavLink>
    );
}
