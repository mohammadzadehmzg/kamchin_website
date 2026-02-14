import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";
import MobileMenu from "../components/layout/MobileMenu.jsx";
import BottomActions from "../components/sections/BottomActions.jsx";
import styles from "./AppShell.module.scss";

export default function AppShell() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on navigation to avoid "stuck open" states
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navItems = useMemo(
    () => [
      { id: "home", labelKey: "nav.home" },
      { id: "products", labelKey: "nav.products" },
      { id: "about", labelKey: "nav.about" },
      { id: "contact", labelKey: "nav.contact" },
    ],
    []
  );

  const onOpenMenu = () => setMenuOpen((v) => !v);

  return (
    <div className={`${styles.shell} ${isHome ? styles.shellHome : styles.shellInner}`}>
      <Header onOpenMenu={onOpenMenu} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} navItems={navItems} />
      <main className={styles.main}>
        <Outlet />
      </main>
      <BottomActions />
      <Footer />
    </div>
  );
}
