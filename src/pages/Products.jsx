import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import styles from "./Products.module.scss";

import { getProducts } from "../services/productsService.js";

function pickRandom(list, n) {
  const arr = Array.isArray(list) ? [...list] : [];
  // Fisher-Yates
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, Math.max(0, n | 0));
}

export default function Products() {
  const navigate = useNavigate();
  const [all, setAll] = useState([]);

  useEffect(() => {
    let alive = true;
    getProducts().then((list) => {
      if (!alive) return;
      setAll(Array.isArray(list) ? list : []);
    });
    return () => {
      alive = false;
    };
  }, []);

  const domesticPicks = useMemo(() => pickRandom(all.filter((p) => p?.market === "domestic"), 4), [all]);
  const exportPicks = useMemo(() => pickRandom(all.filter((p) => p?.market === "export"), 4), [all]);

  return (
    <section className="container section">
      <h1 className="h1">فراورده‌ها</h1>
      <p className="muted">از بین فراورده‌های داخلی و صادراتی انتخاب کنید.</p>

      <div className={styles.grid}>
        <Link className={styles.card} to="/market/domestic">
          <div className={styles.title}>فراورده‌ها داخلی</div>
          <div className={styles.desc}>مشاهده دسته‌بندی‌ها و لیست فراورده‌ها داخلی</div>
        </Link>

        <Link className={styles.card} to="/market/export">
          <div className={styles.title}>فراورده‌ها صادراتی</div>
          <div className={styles.desc}>مشاهده دسته‌بندی‌ها و لیست فراورده‌ها صادراتی</div>
        </Link>
      </div>

      <div className={styles.featuredWrap}>
        <div className={styles.featuredHeader}>
          <h2 className={styles.featuredTitle}>چند فراورده پیشنهادی</h2>
          <div className={styles.featuredHint}>روی هر کارت بزنید تا لیست همان بخش را ببینید.</div>
        </div>

        <div className={styles.block}>
          <div className={styles.blockTop}>
            <div className={styles.blockTitle}>داخلی</div>
            <button type="button" className={styles.blockAction} onClick={() => navigate("/market/domestic")}>مشاهده همه</button>
          </div>
          <div className={styles.picksGrid}>
            {domesticPicks.map((p) => (
              <button
                key={p.id}
                type="button"
                className={styles.pickCard}
                onClick={() => navigate("/market/domestic")}
                aria-label={`نمایش فراورده‌های داخلی: ${p.nameFa ?? ""}`}
              >
                <div className={styles.pickMedia}>
                  {p.image ? <img src={p.image} alt={p.nameFa ?? ""} loading="lazy" /> : <div className={styles.pickFallback} />}
                </div>
                <div className={styles.pickBody}>
                  <div className={styles.pickName}>{p.nameFa ?? "فراورده"}</div>
                  {!!p.netWeightFa && <div className={styles.pickMeta}>{p.netWeightFa}</div>}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.block}>
          <div className={styles.blockTop}>
            <div className={styles.blockTitle}>صادراتی</div>
            <button type="button" className={styles.blockAction} onClick={() => navigate("/market/export")}>مشاهده همه</button>
          </div>
          <div className={styles.picksGrid}>
            {exportPicks.map((p) => (
              <button
                key={p.id}
                type="button"
                className={styles.pickCard}
                onClick={() => navigate("/market/export")}
                aria-label={`نمایش فراورده‌های صادراتی: ${p.nameFa ?? ""}`}
              >
                <div className={styles.pickMedia}>
                  {p.image ? <img src={p.image} alt={p.nameFa ?? ""} loading="lazy" /> : <div className={styles.pickFallback} />}
                </div>
                <div className={styles.pickBody}>
                  <div className={styles.pickName}>{p.nameFa ?? "فراورده"}</div>
                  {!!p.netWeightFa && <div className={styles.pickMeta}>{p.netWeightFa}</div>}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
