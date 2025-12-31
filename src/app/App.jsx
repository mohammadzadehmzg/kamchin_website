import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { routes } from "./routes.jsx";

import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";
import styles from "./AppShell.module.scss";

const HEADER_REVEAL_PX = 8; // با اولین اسکرول، هدر بیاد بالا. اگر خواستی دیرتر بیاد عدد رو زیاد کن.

export default function App() {
    const location = useLocation();
    const isHome = location.pathname === "/";

    const [headerVisible, setHeaderVisible] = useState(() => (
        !isHome || ((typeof window !== "undefined") && ((window.scrollY || 0) > HEADER_REVEAL_PX))
    ));

    useEffect(() => {
        if (!isHome) {
            setHeaderVisible(true);
            return;
        }

        let ticking = false;

        const update = () => {
            ticking = false;
            const y = window.scrollY || document.documentElement.scrollTop || 0;
            setHeaderVisible(y > HEADER_REVEAL_PX);
        };

        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, [isHome]);

    return (
        <div className={`${styles.shell} ${isHome ? styles.shellHome : ""}`}>
            <Header visible={isHome ? headerVisible : true} />
            <main className={styles.main}>
                <Routes>
                    {routes.map((r) => (
                        <Route key={r.path} path={r.path} element={r.element} />
                    ))}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </div>
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
