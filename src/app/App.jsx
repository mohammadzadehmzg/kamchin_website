import {
    useCallback,
    useEffect,
    useMemo,
    useState,
    useSyncExternalStore,
} from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import { routes } from "./routes.jsx";

import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";
import MobileMenu from "../components/layout/MobileMenu.jsx";
import ToastHost from "../components/ui/ToastHost.jsx";
import BottomActions from "../components/sections/BottomActions.jsx";

import UIProvider from "@/define/ui.jsx";
import useI18n from "../i18n/useI18n.js";

import styles from "./AppShell.module.scss";
import FloatingChatButton from "@/components/ui/FloatingActions.jsx";

const HEADER_REVEAL_PX = 8;
const HOME_SECTIONS = ["hero", "products", "about", "contact"];

/* ---------------- Header visibility on home ---------------- */

function useHeaderVisible(enabled) {
    const getSnapshot = () => {
        if (!enabled || typeof window === "undefined") return true;
        const y =
            window.scrollY ||
            document.documentElement.scrollTop ||
            0;
        return y > HEADER_REVEAL_PX;
    };

    return useSyncExternalStore(
        (onChange) => {
            if (!enabled || typeof window === "undefined") {
                return () => {};
            }

            let last = getSnapshot();
            let ticking = false;

            const onScroll = () => {
                if (ticking) return;
                ticking = true;

                requestAnimationFrame(() => {
                    ticking = false;
                    const next = getSnapshot();
                    if (next !== last) {
                        last = next;
                        onChange();
                    }
                });
            };

            window.addEventListener("scroll", onScroll, {
                passive: true,
            });

            return () =>
                window.removeEventListener("scroll", onScroll);
        },
        getSnapshot,
        () => true
    );
}

/* ---------------- App ---------------- */

export default function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useI18n();

    const isHome = location.pathname === "/";

    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] =
        useState("hero");

    const homeHeaderVisible = useHeaderVisible(isHome);
    const headerVisible = !isHome || homeHeaderVisible;

    /* ---------------- Menu ---------------- */

    const openMenu = useCallback(() => setMenuOpen((v) => !v), []);

    const closeMenu = useCallback(
        () => setMenuOpen(false),
        []
    );

    useEffect(() => {
        document.body.style.overflow = menuOpen
            ? "hidden"
            : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    /* ---------------- Scroll to section ---------------- */

    const scrollToSection = useCallback(
        (id) => {
            const target = String(id || "");
            if (!target) return;

            if (location.pathname !== "/") {
                navigate(`/#${target}`);
                return;
            }

            const el =
                document.getElementById(target);
            if (!el) return;

            el.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });

            window.history.replaceState(
                null,
                "",
                `/#${target}`
            );
        },
        [location.pathname, navigate]
    );

    /* ---------------- Hash scroll ---------------- */

    useEffect(() => {
        if (!isHome) return;

        const id = (location.hash || "").replace(
            "#",
            ""
        );
        if (!id) return;

        const el =
            document.getElementById(id);
        if (!el) return;

        const r = requestAnimationFrame(() =>
            el.scrollIntoView({
                behavior: "smooth",
                block: "start",
            })
        );

        return () => cancelAnimationFrame(r);
    }, [isHome, location.hash]);

    /* ---------------- Active section observer ---------------- */

    useEffect(() => {
        if (!isHome) return;

        const els = HOME_SECTIONS.map((id) =>
            document.getElementById(id)
        ).filter(Boolean);

        if (!els.length) return;

        const io = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort(
                        (a, b) =>
                            (b.intersectionRatio ||
                                0) -
                            (a.intersectionRatio ||
                                0)
                    );

                if (!visible.length) return;

                const id =
                    visible[0].target?.id;
                if (id) setActiveSection(id);
            },
            {
                threshold: [
                    0.15,
                    0.25,
                    0.4,
                    0.55,
                    0.7,
                ],
                rootMargin:
                    "-20% 0px -55% 0px",
            }
        );

        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, [isHome, location.key]);

    /* ---------------- Page title ---------------- */

    useEffect(() => {
        const map = {
            "/": () => t("brand"),
            "/products": () =>
                t("title.products"),
            "/about": () =>
                t("title.about"),
            "/contact": () =>
                t("title.contact"),
            "/cart": () => "سبد خرید",
        };

        const path = location.pathname || "/";

        if (path.startsWith("/product/")) {
            document.title = "جزئیات فراورده";
            return;
        }

        const fn =
            map[path] ||
            (() => t("brand"));
        document.title = fn();
    }, [
        activeSection,
        location.pathname,
        t,
    ]);

    /* ---------------- Favicon ---------------- */

    useEffect(() => {
        if (typeof document === "undefined") return;

        const ensureLink = () => {
            let link = document.querySelector('link[rel="icon"][data-app="kamchin"]');
            if (!link) {
                link = document.createElement("link");
                link.setAttribute("rel", "icon");
                link.setAttribute("data-app", "kamchin");
                document.head.appendChild(link);
            }
            return link;
        };

        const path = location.pathname || "/";

        let href = "/favicons/kamchin.png";
        let type = "image/png";

        if (path === "/cart") {
            href = "/favicons/cart.svg";
            type = "image/svg+xml";
        }

        const link = ensureLink();
        link.setAttribute("type", type);
        link.setAttribute("href", href);
    }, [location.pathname]);


    /* ---------------- Header nav ---------------- */

    const headerNav = useMemo(
        () => [
            { id: "hero", labelKey: "nav.home" },
            {
                id: "products",
                labelKey: "nav.products",
            },
            { id: "about", labelKey: "nav.about" },
            {
                id: "contact",
                labelKey: "nav.contact",
            },
        ],
        []
    );

    /* ---------------- Render ---------------- */

    return (
        <UIProvider
            openMenu={openMenu}
            closeMenu={closeMenu}
        >
            <div
                className={`${styles.shell} ${
                    isHome
                        ? styles.shellHome
                        : styles.shellInner
                }`}
            >
                <Header
                    visible={
                        isHome
                            ? headerVisible
                            : true
                    }
                    isHome={isHome}
                    activeSection={
                        isHome ? activeSection : null
                    }
                    navItems={headerNav}
                    onOpenMenu={openMenu}
                    onNavigateSection={
                        scrollToSection
                    }
                />

                <main className={styles.main}>
                    <Routes>
                        {routes.map((r) => (
                            <Route
                                key={r.path}
                                path={r.path}
                                element={r.element}
                            />
                        ))}
                        <Route
                            path="*"
                            element={<NotFound />}
                        />
                    </Routes>
                </main>

                <ToastHost />

                {/* 🔴 دکمه برو بالا + ورود به پرتال */}
                <BottomActions />

                <Footer />

                <MobileMenu
                    open={menuOpen}
                    onClose={closeMenu}
                    navItems={headerNav}
                    onNavigateSection={
                        scrollToSection
                    }
                />
            </div>
        </UIProvider>
    );
}

/* ---------------- 404 ---------------- */

function NotFound() {
    return (
        <section className="container section">
            <h1 className="h1">
                صفحه پیدا نشد
            </h1>
            <p className="muted">
                این مسیر وجود ندارد.
            </p>
        </section>
    );
}
