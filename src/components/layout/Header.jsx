import { useEffect, useMemo, useState } from "react";
import styles from "./Header.module.scss";
import { useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Menu, X, User } from "lucide-react";
import useI18n from "../../i18n/useI18n.js";
import { useCart } from "../../features/cart/CartContext.jsx";
import { getProducts } from "../../services/productsService.js";
import site from "../../data/site.mock.js";
import { toast } from "../ui/ToastHost.jsx";

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
        const products = (Array.isArray(list) ? list : []).map((p) => {
          const title = lang === "en" ? (p?.nameEn || p?.nameFa || "") : (p?.nameFa || p?.nameEn || "");
          const meta = lang === "en" ? (p?.netWeightEn || p?.netWeightFa || "") : (p?.netWeightFa || p?.netWeightEn || "");
          const hay = `${p?.nameFa || ""} ${p?.nameEn || ""} ${p?.netWeightFa || ""} ${p?.netWeightEn || ""}`.trim();
          return {
            type: "product",
            id: p?.id,
            title,
            meta,
            hay,
            hayNorm: normFa(hay),
          };
        });

        const info = [
          ...((site?.phones || []).map((ph) => ({
            type: "phone",
            id: `phone:${ph}`,
            title: String(ph),
            meta: t("ui.phone_label"),
            hay: `${ph} ${t("ui.phone_label")} ${t("ui.phone_label")}`,
            hayNorm: normFa(`${ph} ${t("ui.phone_label")} ${t("ui.phone_label")}`),
          }))),
          ...((site?.emails || []).map((em) => ({
            type: "email",
            id: `email:${em}`,
            title: String(em),
            meta: t("ui.email_label"),
            hay: `${em} ${t("ui.email_label")}`,
            hayNorm: normFa(`${em} ${t("ui.email_label")}`),
          }))),
          {
            type: "address",
            id: "addr:office",
            title: t("ui.office_label"),
            meta: (lang === "en" ? site?.officeAddressEn : site?.officeAddressFa) || "",
            hay: `${site?.officeAddressFa || ""} دفتر مرکزی آدرس`,
          },
          {
            type: "address",
            id: "addr:factory",
            title: t("ui.factory_label"),
            meta: (lang === "en" ? site?.factoryAddressEn : site?.factoryAddressFa) || "",
            hay: `${site?.factoryAddressFa || ""} کارخانه آدرس`,
          },
          {
            type: "route",
            id: "route:products",
            title: "فراورده‌ها",
            meta: "لیست فراورده‌ها",
            hay: "فراورده فراورده ها محصولات لیست",
          },
          {
            type: "route",
            id: "route:cart",
            title: "سبد خرید",
            meta: "ثبت خرید",
            hay: "سبد خرید ثبت سفارش واتساپ",
          },
          {
            type: "route",
            id: "route:contact",
            title: "تماس با ما",
            meta: "اطلاعات تماس و آدرس",
            hay: "تماس با ما ارتباط شماره تلفن آدرس ایمیل",
          },
        ];

        setSearchAll([...products, ...info]);
      })
      .catch(() => {
        if (!alive) return;
        // حتی اگر محصولات لود نشدن، سرچ تماس/آدرس باید کار کند
        const fallback = [
          ...((site?.phones || []).map((ph) => ({
            type: "phone",
            id: `phone:${ph}`,
            title: String(ph),
            meta: t("ui.phone_label"),
            hay: `${ph} ${t("ui.phone_label")} ${t("ui.phone_label")}`,
            hayNorm: normFa(`${ph} ${t("ui.phone_label")} ${t("ui.phone_label")}`),
          }))),
          ...((site?.emails || []).map((em) => ({
            type: "email",
            id: `email:${em}`,
            title: String(em),
            meta: t("ui.email_label"),
            hay: `${em} ${t("ui.email_label")}`,
            hayNorm: normFa(`${em} ${t("ui.email_label")}`),
          }))),
          {
            type: "address",
            id: "addr:office",
            title: t("ui.office_label"),
            meta: (lang === "en" ? site?.officeAddressEn : site?.officeAddressFa) || "",
            hay: `${site?.officeAddressFa || ""} دفتر مرکزی آدرس`,
          },
          {
            type: "address",
            id: "addr:factory",
            title: t("ui.factory_label"),
            meta: (lang === "en" ? site?.factoryAddressEn : site?.factoryAddressFa) || "",
            hay: `${site?.factoryAddressFa || ""} کارخانه آدرس`,
          },
          {
            type: "route",
            id: "route:products",
            title: "فراورده‌ها",
            meta: "لیست فراورده‌ها",
            hay: "فراورده فراورده ها محصولات لیست",
          },
          {
            type: "route",
            id: "route:cart",
            title: "سبد خرید",
            meta: "ثبت خرید",
            hay: "سبد خرید ثبت سفارش واتساپ",
          },
          {
            type: "route",
            id: "route:contact",
            title: "تماس با ما",
            meta: "اطلاعات تماس و آدرس",
            hay: "تماس با ما ارتباط شماره تلفن آدرس ایمیل",
          },
        ];
        setSearchAll(fallback);
      });

    return () => {
      alive = false;
    };
  }, [searchOpen, searchAll.length]);

  const searchResults = useMemo(() => {
    const q = normFa(searchQ);
    // برای شماره/ایمیل، یک کاراکتر هم مفید است
    if (q.length < 2 && !/\d/.test(q) && !q.includes("@")) return [];
    const out = [];
    for (const it of searchAll) {
      if (normFa(it?.hay || it?.title || "").includes(q)) out.push(it);
      if (out.length >= 8) break;
    }
    return out;
  }, [searchQ, searchAll]);

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQ("");
  };

  const copyToClipboard = async (txt) => {
    try {
      await navigator.clipboard.writeText(String(txt));
      toast("کپی شد", "success");
    } catch {
      toast("امکان کپی وجود ندارد", "error");
    }
  };

  const openHit = (it) => {
    if (!it) return;
    closeSearch();

    if (it.type === "product" && it.id) {
      navigate(`/product/${it.id}`);
      return;
    }

    if (it.type === "route") {
      if (it.id === "route:products") navigate("/products");
      if (it.id === "route:cart") navigate("/cart");
      if (it.id === "route:contact") navigate("/contact");
      return;
    }

    if (it.type === "phone") {
      copyToClipboard(it.title);
      return;
    }

    if (it.type === "email") {
      copyToClipboard(it.title);
      return;
    }

    if (it.type === "address") {
      // آدرس طولانی است؛ بهترین UX: کپی + رفتن به تماس با ما
      copyToClipboard(it.meta);
      navigate("/contact");
    }
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
                {searchResults.map((it) => (
                  <button key={it.id} type="button" className={styles.searchItem} onClick={() => openHit(it)}>
                    <span className={styles.searchItemTitle}>{it.title}</span>
                    {it.meta ? <span className={styles.searchItemMeta}>{it.meta}</span> : null}
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
