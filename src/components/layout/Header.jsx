import React, { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { Globe, Search, Instagram } from "lucide-react";
import styles from "./Header.module.scss";
import MobileMenu from "./MobileMenu.jsx";

export default function Header() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const items = useMemo(
        () => [
            { to: "/", label: "خانه" },
            { to: "/products", label: "محصولات" },
            { to: "/about", label: "درباره ما" },
            { to: "/contact", label: "تماس با ما" },
        ],
        []
    );

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
                <div className={styles.inner}>
                    <div className={styles.left}>
                        <a className={styles.iconBtn} href="#" title="زبان">
                            <Globe size={18} />
                        </a>
                        <a className={styles.iconBtn} href="#" title="جستجو">
                            <Search size={18} />
                        </a>
                        <a className={styles.iconBtn} href="#" title="اینستاگرام">
                            <Instagram size={18} />
                        </a>
                    </div>

                    <NavLink to="/" className={styles.center} aria-label="کامچین">
                        <img className={styles.logo} src="/images/logo.png" alt="Kamchin" />
                    </NavLink>

                    <button className={styles.hamburger} onClick={() => setOpen(true)} aria-label="منو">
                        <span />
                        <span />
                        <span />
                    </button>
                </div>
            </header>

            <MobileMenu open={open} onClose={() => setOpen(false)} items={items} />
        </>
    );
}
