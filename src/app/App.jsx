import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { routes } from "./routes.jsx";

import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";
import MobileMenu from "../components/layout/MobileMenu.jsx";
import styles from "./AppShell.module.scss";

import UIProvider from "@/define/ui.jsx";
import useI18n from "../i18n/useI18n.js";

const HEADER_REVEAL_PX = 8;
const HOME_SECTIONS = ["hero", "products", "about", "contact"];

function useHeaderVisible(enabled) {
    const get = () => {
        if (!enabled || typeof window === "undefined") return true;
        const y = window.scrollY || document.documentElement.scrollTop || 0;
        return y > HEADER_REVEAL_PX;
    };

    return useSyncExternalStore(
        (onStoreChange) => {
            if (!enabled || typeof window === "undefined") return () => {};

            let last = get();
            let ticking = false;

            const handler = () => {
                if (ticking) return;
                ticking = true;
                window.requestAnimationFrame(() => {
                    ticking = false;
                    const next = get();
                    if (next !== last) {
                        last = next;
                        onStoreChange();
                    }
                });
            };

            window.addEventListener("scroll", handler, { passive: true });
            return () => window.removeEventListener("scroll", handler);
        },
        get,
        () => true
    );
}

export default function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const isHome = location.pathname === "/";
    const { t } = useI18n();

    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");

    const homeHeaderVisible = useHeaderVisible(isHome);
    const headerVisible = !isHome || homeHeaderVisible;

    const openMenu = useCallback(() => setMenuOpen(true), []);
    const closeMenu = useCallback(() => setMenuOpen(false), []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    const scrollToSection = useCallback(
        (id) => {
            const target = String(id || "");
            if (!target) return;

            if (location.pathname !== "/") {
                navigate(`/#${target}`);
                return;
            }

            const el = document.getElementById(target);
            if (!el) return;
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            window.history.replaceState(null, "", `/#${target}`);
        },
        [location.pathname, navigate]
    );

    useEffect(() => {
        if (!isHome) return;
        const id = (location.hash || "").replace("#", "");
        if (!id) return;
        const el = document.getElementById(id);
        if (!el) return;
        const r = window.requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth", block: "start" }));
        return () => window.cancelAnimationFrame(r);
    }, [isHome, location.hash]);

    useEffect(() => {
        if (!isHome) return;

        const els = HOME_SECTIONS.map((id) => document.getElementById(id)).filter(Boolean);
        if (!els.length) return;

        const io = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0));

                if (!visible.length) return;
                const id = visible[0].target?.id;
                if (id) setActiveSection(id);
            },
            {
                root: null,
                threshold: [0.15, 0.25, 0.4, 0.55, 0.7],
                rootMargin: "-20% 0px -55% 0px",
            }
        );

        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, [isHome, location.key]);

    useEffect(() => {
        const map = {
            "/": () => {
                const hash = (location.hash || "").replace("#", "");
                const sec = hash || activeSection || "hero";
                const labelKey = HOME_SECTIONS.includes(sec) ? `sections.${sec}` : "title.home";
                return `${t(labelKey)}`;
            },
            "/about": () => `${t("title.about")}`,
            "/contact": () => `${t("title.contact")}`,
        };

        const path = location.pathname || "/";
        if (path.startsWith("/market/domestic")) {
            document.title = "محصولات داخلی";
            return;
        }
        if (path.startsWith("/market/export")) {
            document.title = "محصولات صادراتی";
            return;
        }
        if (path.startsWith("/product/")) {
            document.title = "جزئیات محصول";
            return;
        }

        const fn = map[path] || (() => `${t("brand")}`);
        document.title = fn();
    }, [activeSection, location.hash, location.pathname, t]);

    const headerNav = useMemo(
        () => [
            { id: "hero", labelKey: "nav.home" },
            { id: "products", labelKey: "nav.products" },
            { id: "about", labelKey: "nav.about" },
            { id: "contact", labelKey: "nav.contact" },
        ],
        []
    );

    return (
        <UIProvider openMenu={openMenu} closeMenu={closeMenu}>
            <div className={`${styles.shell} ${isHome ? styles.shellHome : styles.shellInner}`.trim()}>
                <Header
                    visible={isHome ? headerVisible : true}
                    isHome={isHome}
                    activeSection={isHome ? activeSection : null}
                    navItems={headerNav}
                    onOpenMenu={openMenu}
                    onNavigateSection={scrollToSection}
                />

                <main className={styles.main}>
                    <Routes>
                        {routes.map((r) => (
                            <Route key={r.path} path={r.path} element={r.element} />
                        ))}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>

                <Footer />

                <MobileMenu
                    open={menuOpen}
                    onClose={closeMenu}
                    navItems={headerNav}
                    onNavigateSection={scrollToSection}
                />
            </div>
        </UIProvider>
    );
}

function NotFound() {
    return (
        <section className="container section">
            <h1 className="h1">صفحه پیدا نشد</h1>
            <p className="muted">این مسیر وجود ندارد.</p>
        </section>
    );
}



