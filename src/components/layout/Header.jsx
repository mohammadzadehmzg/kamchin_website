import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Header.module.scss";
import MobileMenu from "./MobileMenu.jsx";
import {
    Globe, Search, Instagram, Twitter, Menu, X,
} from "lucide-react";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const langRef = useRef(null);

    const socials = useMemo(() => ([
        { id: "instagram", href: "https://instagram.com/", icon: Instagram, label: "Instagram" },
        { id: "twitter", href: "https://x.com/", icon: Twitter, label: "X / Twitter" },
    ]), []);

    useEffect(() => {
        const onDoc = (e) => {
            if (!langRef.current) return;
            if (!langRef.current.contains(e.target)) setLangOpen(false);
        };
        document.addEventListener("mousedown", onDoc);
        return () => document.removeEventListener("mousedown", onDoc);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    return (
        <>
            <header className={styles.header}>
                <div className={styles.leftIcons}>
                    <div className={styles.iconRow}>
                        <button
                            type="button"
                            className={styles.iconBtn}
                            onClick={() => setSearchOpen(true)}
                            aria-label="جستجو"
                            title="جستجو"
                        >
                            <Search size={18} />
                        </button>

                        <div className={styles.langWrap} ref={langRef}>
                            <button
                                type="button"
                                className={styles.iconBtn}
                                onClick={() => setLangOpen((s) => !s)}
                                aria-label="زبان"
                                title="زبان"
                            >
                                <Globe size={18} />
                            </button>

                            {langOpen && (
                                <div className={styles.langDrop}>
                                    <button type="button" onClick={() => setLangOpen(false)}>فارسی</button>
                                    <button type="button" onClick={() => setLangOpen(false)}>English</button>
                                </div>
                            )}
                        </div>

                        {socials.map((s) => {
                            const I = s.icon;
                            return (
                                <a
                                    key={s.id}
                                    className={styles.iconLink}
                                    href={s.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={s.label}
                                    title={s.label}
                                >
                                    <I size={18} />
                                </a>
                            );
                        })}
                    </div>
                </div>

                <div className={styles.brand}>
                    <img className={styles.logo} src="/images/logo.png" alt="Kamchin" />
                </div>

                <div className={styles.right}>
                    <button
                        type="button"
                        className={styles.burger}
                        onClick={() => setMenuOpen(true)}
                        aria-label="منو"
                    >
                        <Menu size={22} />
                    </button>
                </div>
            </header>

            <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

            {searchOpen && (
                <div className={styles.searchModal} role="dialog" aria-modal="true">
                    <div className={styles.searchBackdrop} onClick={() => setSearchOpen(false)} />
                    <div className={styles.searchBox}>
                        <div className={styles.searchHead}>
                            <span>جستجو</span>
                            <button className={styles.closeBtn} onClick={() => setSearchOpen(false)} aria-label="بستن">
                                <X size={18} />
                            </button>
                        </div>
                        <input className={styles.searchInput} placeholder="چی می‌خوای پیدا کنی؟" />
                    </div>
                </div>
            )}
        </>
    );
}
