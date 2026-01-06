import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Header.module.scss";
import { Globe, Search, Instagram, MessageCircle, Phone, Send, Menu, X } from "lucide-react";
import useI18n from "../../i18n/useI18n.js";

const LOGO_SRC = "/images/cropped-Kamchin-logo-1-1-300x290-1.png";

export default function Header({
                                   visible = true,
                                   isHome = false,
                                   activeSection = null,
                                   navItems = [],
                                   onOpenMenu,
                                   onNavigateSection,
                               }) {
    const { lang, setLang, t } = useI18n();
    const [langOpen, setLangOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const langRef = useRef(null);

    const socials = useMemo(
        () => [
            {
                id: "instagram",
                href: "https://www.instagram.com/kamchin.foods?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
                icon: Instagram,
                label: "Instagram",
            },
            {
                id: "whatsapp",
                href: "https://wa.me/989919725830",
                icon: MessageCircle,
                label: "WhatsApp",
            },
            {
                id: "telegram",
                href: "https://t.me/+989919725830",
                icon: Send,
                label: "Telegram",
            },
            {
                id: "contact",
                href: "tel:+989919725830",
                icon: Phone,
                label: "Contact",
            },
        ],
        []
    );

    const toggleLang = () => setLang((prev) => (prev === "fa" ? "en" : "fa"));

    useEffect(() => {
        const onDoc = (e) => {
            if (!langRef.current) return;
            if (!langRef.current.contains(e.target)) setLangOpen(false);
        };
        document.addEventListener("mousedown", onDoc);
        return () => document.removeEventListener("mousedown", onDoc);
    }, []);

    const go = (id) => {
        if (typeof onNavigateSection === "function") onNavigateSection(id);
    };

    return (
        <>
            {!visible && isHome && (
                <div className={styles.floating} aria-label="Quick actions">
                    <button
                        type="button"
                        className={styles.floatPill}
                        onClick={toggleLang}
                        aria-label={t("ui.language")}
                        title={t("ui.language")}
                    >
                        {lang === "fa" ? "FA" : "EN"}
                    </button>

                    {socials.map((s) => {
                        const I = s.icon;
                        return (
                            <a
                                key={s.id}
                                className={styles.floatLink}
                                href={s.href}
                                target={s.href.startsWith("http") ? "_blank" : undefined}
                                rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                                aria-label={s.label}
                                title={s.label}
                            >
                                <I size={18} />
                            </a>
                        );
                    })}
                </div>
            )}

            <header className={`${styles.header} ${visible ? "" : styles.hidden}`.trim()}>
                <div className={styles.leftIcons}>
                    <div className={styles.iconRow}>
                        <button
                            type="button"
                            className={styles.iconBtn}
                            onClick={() => setSearchOpen(true)}
                            aria-label={t("ui.search")}
                            title={t("ui.search")}
                        >
                            <Search size={18} />
                        </button>

                        <div className={styles.langWrap} ref={langRef}>
                            <button
                                type="button"
                                className={styles.iconBtn}
                                onClick={() => setLangOpen((s) => !s)}
                                aria-label={t("ui.language")}
                                title={t("ui.language")}
                            >
                                <Globe size={18} />
                            </button>

                            {langOpen && (
                                <div className={styles.langDrop}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setLang("fa");
                                            setLangOpen(false);
                                        }}
                                        aria-current={lang === "fa" ? "true" : "false"}
                                    >
                                        فارسی
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setLang("en");
                                            setLangOpen(false);
                                        }}
                                        aria-current={lang === "en" ? "true" : "false"}
                                    >
                                        English
                                    </button>
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
                                    target={s.href.startsWith("http") ? "_blank" : undefined}
                                    rel={s.href.startsWith("http") ? "noreferrer" : undefined}
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
                    <img className={styles.logo} src={LOGO_SRC} alt={t("brand")} />
                </div>

                <div className={styles.right}>
                    <nav className={styles.nav} aria-label="Primary">
                        {(Array.isArray(navItems) ? navItems : []).map((it) => {
                            const isActive = Boolean(isHome && activeSection && it.id === activeSection);
                            return (
                                <button
                                    key={it.id}
                                    type="button"
                                    className={`${styles.navLink} ${isActive ? styles.navActive : ""}`.trim()}
                                    onClick={() => go(it.id)}
                                >
                                    {t(it.labelKey)}
                                </button>
                            );
                        })}
                    </nav>

                    <button
                        type="button"
                        className={styles.burger}
                        onClick={onOpenMenu}
                        aria-label="Menu"
                    >
                        <Menu size={22} />
                    </button>
                </div>
            </header>

            {searchOpen && (
                <div className={styles.searchModal} role="dialog" aria-modal="true">
                    <div className={styles.searchBackdrop} onClick={() => setSearchOpen(false)} />
                    <div className={styles.searchBox}>
                        <div className={styles.searchHead}>
                            <span>{t("ui.search")}</span>
                            <button
                                className={styles.closeBtn}
                                onClick={() => setSearchOpen(false)}
                                aria-label={t("ui.close")}
                            >
                                <X size={18} />
                            </button>
                        </div>
                        <input className={styles.searchInput} placeholder={t("ui.search")} />
                    </div>
                </div>
            )}
        </>
    );
}
