
import { useMemo, useState } from "react";
import styles from "./Header.module.scss";
import { Search, ShoppingCart, Menu, X, User } from "lucide-react";
import useI18n from "../../i18n/useI18n.js";
import { useCart } from "../../features/cart/CartContext.jsx";

const LOGO_SRC = "/images/cropped-Kamchin-logo-1-1-300x290-1.png";

export default function Header({ visible = true, onOpenMenu }) {
    const { lang, setLang, t } = useI18n();
    const cart = useCart();
    const [searchOpen, setSearchOpen] = useState(false);

    // NOTE: setLang expects a value, not a setter callback.
    const toggleLang = () => setLang(lang === "fa" ? "en" : "fa");

    // Show the current language label (as requested): Persian/English.
    const langLabel = useMemo(() => (lang === "fa" ? "Persian" : "English"), [lang]);

    return (
        <>
            <header className={`${styles.header} ${visible ? "" : styles.hidden}`}>
                <div className={styles.container}>

                    {/* راست: زبان + لوگو (طبق رفرنس کنار هم) */}
                    <div className={styles.brand}>
                        {/* طبق رفرنس: زبان در سمت راست لوگو */}
                        <img className={styles.logo} src={LOGO_SRC} alt="Kamchin" />
                        <button className={styles.langBtn} onClick={toggleLang}>
                            {langLabel}
                        </button>
                    </div>

                    {/* چپ: آیکن‌ها + منو */}
                    <div className={styles.rightSide}>

                        <button className={styles.iconBtn}>
                            <User size={20} />
                        </button>

                        <button
                            className={styles.iconBtn}
                            onClick={() => setSearchOpen(true)}
                        >
                            <Search size={20} />
                        </button>

                        <a className={styles.iconLink} href="/cart">
                            <ShoppingCart size={20} />
                            {cart.count > 0 && (
                                <span className={styles.badge}>{cart.count}</span>
                            )}
                        </a>

                        <button className={styles.burgerBtn} onClick={onOpenMenu}>
                            <Menu size={24} />
                        </button>
                    </div>

                </div>
            </header>

            {searchOpen && (
                <div className={styles.searchModal}>
                    <div
                        className={styles.searchBackdrop}
                        onClick={() => setSearchOpen(false)}
                    />
                    <div className={styles.searchBox}>
                        <div className={styles.searchHead}>
                            <button onClick={() => setSearchOpen(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <input
                            className={styles.searchInput}
                            placeholder={t("ui.search_placeholder")}
                            autoFocus
                        />
                    </div>
                </div>
            )}
        </>
    );
}
