import { useMemo } from "react";
import { Link } from "react-router-dom";
import styles from "./CartPage.module.scss";
import page from "./Page.module.scss";
import { useCart } from "../features/cart/CartContext.jsx";

const WHATSAPP_E164 = "989919725830";

function buildWhatsAppText(lines) {
  const parts = ["سلام، سفارش جدید از وبسایت کامچین:"];
  for (const l of lines) {
    const name = l.product?.nameFa || l.id;
    const w = l.product?.netWeightFa ? ` (${l.product.netWeightFa})` : "";
    parts.push(`- ${name}${w} × ${l.qty}`);
  }
  return parts.join("\n");
}

export default function CartPage() {
  const cart = useCart();

  const waHref = useMemo(() => {
    const text = buildWhatsAppText(cart.lines);
    return `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(text)}`;
  }, [cart.lines]);

  return (
    <section className="container section">
      <div className={styles.head}>
        <h1 className="h1">سبد خرید</h1>
        <div className={styles.headActions}>
          <Link className={styles.back} to="/products">بازگشت به محصولات</Link>
          {cart.lines.length ? (
            <a className={styles.checkout} href={waHref} target="_blank" rel="noreferrer">
              نهایی کردن خرید
            </a>
          ) : null}
        </div>
      </div>

      <div className={page.card}>
        {!cart.lines.length ? (
          <p className="muted">سبد خرید خالی است.</p>
        ) : (
          <div className={styles.list}>
            {cart.lines.map((l) => (
              <div key={l.id} className={styles.row}>
                <div className={styles.info}>
                  <div className={styles.name}>{l.product?.nameFa || "محصول"}</div>
                  <div className="muted">
                    {l.product?.netWeightFa ? `وزن خالص: ${l.product.netWeightFa}` : null}
                  </div>
                </div>

                <div className={styles.qty}>
                  <button type="button" onClick={() => cart.removeOne(l.id)} aria-label="کم کردن">−</button>
                  <span>{l.qty}</span>
                  <button type="button" onClick={() => cart.add(l.id)} aria-label="زیاد کردن">+</button>
                </div>

                <div className={styles.actions}>
                  <Link className={styles.detail} to={`/product/${l.id}`} target="_blank" rel="noreferrer">
                    جزئیات
                  </Link>
                  <button type="button" className={styles.remove} onClick={() => cart.setQty(l.id, 0)}>
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
