import React from "react";
import { Routes, Route } from "react-router-dom";
import { routes } from "./routes.jsx";

import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";
import styles from "./AppShell.module.scss";

export default function App() {
    return (
        <div className={styles.shell}>
            <Header />
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
