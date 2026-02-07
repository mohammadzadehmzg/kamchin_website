import { useEffect, useMemo, useState } from "react";
import styles from "./Header.module.scss";
import { useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Menu, X, User } from "lucide-react";
import useI18n from "../../i18n/useI18n.js";
import { useCart } from "../../features/cart/CartContext.jsx";
import { getProducts } from "../../services/productsService.js";

const LOGO_SRC = "/images/cropped-Kamchin-logo-1-1-300x290-1.png";

function normFa(s) {
  return String(s || "")
    .trim()
    .toLowerCase()
    .replace(/\u064a/g, "\u06cc") // ي -> ی
    .replace(/\u0643/g, "\u06a9"); // ك -> ک
}

export default function Header({ visible = true, onOpenMenu }) {
  const { lang, setLang, t } = useI18n();
  const cart = useCart();
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [searchAll, setSearchAll] = useState([]);

  useEffect(() => {
    if (!searchOpen) return;
    if (searchAll.length) return;

    let alive = true;
    getProducts()
      .then((list) => {
        if (!alive) return;
        setSearchAll(Array.isArray(list) ? list : []);
      })
      .catch(() => {
        if (!alive) return;
        setSearchAll([]);
      });

    return () => {
      alive = false;
    };
  }, [searchOpen, searchAll.length]);

  const searchResults = useMemo(() => {
    const q = normFa(searchQ);
    if (q.length < 2) return [];
    const out = [];
    for (const p of searchAll) {
      const hay = `${p?.nameFa || ""} ${p?.nameEn || ""} ${p?.netWeightFa || ""} ${p?.netWeightEn || ""}`;
      if (normFa(hay).includes(q)) out.push(p);
      if (out.length >= 8) break;
    }
    return out;
  }, [searchQ, searchAll]);

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQ("");
  };

  const openHit = (p) => {
    if (!p?.id) return;
    closeSearch();
    navigate(`/product/${p.id}`);
  };

  const toggleLang = () => setLang(lang === "fa" ? "en" : "fa");
  const langLabel = useMemo(() => (lang === "fa" ? "Persian" : "English"), [lang]);

  return (
    <>
      <header className={`${styles.header} ${visible ? "" : styles.hidden}`}>
        <div className={styles.container}>
          <div className={styles.brand}>
            <img className={styles.logo} src={LOGO_SRC} alt="Kamchin" />
            <button className={styles.langBtn} onClick={toggleLang}>
              {langLabel}
            </button>
          </div>

          <div className={styles.rightSide}>
            <button className={styles.iconBtn} type="button" aria-label="User">
              <User size={20} />
            </button>

            <button className={styles.iconBtn} type="button" aria-label="Search" onClick={() => setSearchOpen(true)}>
              <Search size={20} />
            </button>

            <a className={styles.iconLink} href="/cart" aria-label="Cart">
              <ShoppingCart size={20} />
              {cart.count > 0 && <span className={styles.badge}>{cart.count}</span>}
            </a>

            <button className={styles.burgerBtn} type="button" onClick={onOpenMenu} aria-label="Menu">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {searchOpen && (
        <div className={styles.searchModal}>
          <div className={styles.searchBackdrop} onClick={closeSearch} />
          <div className={styles.searchBox}>
            <div className={styles.searchHead}>
              <button type="button" onClick={closeSearch} aria-label="Close">
                <X size={20} />
              </button>
            </div>

            <input
              className={styles.searchInput}
              placeholder={t("ui.search_placeholder")}
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") closeSearch();
                if (e.key === "Enter") {
                  const first = searchResults[0];
                  if (first?.id) openHit(first);
                }
              }}
              autoFocus
            />

            {searchResults.length ? (
              <div className={styles.searchResults}>
                {searchResults.map((p) => (
                  <button key={p.id} type="button" className={styles.searchItem} onClick={() => openHit(p)}>
                    <span className={styles.searchItemTitle}>{p.nameFa || p.nameEn}</span>
                    {p.netWeightFa ? <span className={styles.searchItemMeta}>{p.netWeightFa}</span> : null}
                  </button>
                ))}
              </div>
            ) : searchQ.trim() ? (
              <div className={styles.searchEmpty}>نتیجه‌ای پیدا نشد.</div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}
