import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./CartPage.module.scss";
import page from "./Page.module.scss";
import { useCart } from "../features/cart/CartContext.jsx";

const WHATSAPP_E164 = "989919725830";
const CUSTOMER_STORAGE_KEY = "kamchin.customer.v1";

function readCustomer() {
  try {
    const raw = window.localStorage.getItem(CUSTOMER_STORAGE_KEY);
    if (!raw) return { name: "", phone: "", address: "" };
    const v = JSON.parse(raw);
    return {
      name: typeof v?.name === "string" ? v.name : "",
      phone: typeof v?.phone === "string" ? v.phone : "",
      address: typeof v?.address === "string" ? v.address : "",
    };
  } catch {
    return { name: "", phone: "", address: "" };
  }
}

function writeCustomer(v) {
  try {
    window.localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(v));
  } catch {
    // ignore
  }
}

function normalizePhone(s) {
  const x = String(s || "").replace(/[\s-]+/g, "");
  // keep digits and +
  return x.replace(/[^0-9+]/g, "");
}

function isValidCustomer(c) {
  const nameOk = String(c.name || "").trim().length >= 2;
  const addrOk = String(c.address || "").trim().length >= 8;

  // Accept: 09xxxxxxxxx , +98xxxxxxxxxx , 98xxxxxxxxxx
  const p = normalizePhone(c.phone);
  const phoneOk =
    /^09\d{9}$/.test(p) ||
    /^\+98\d{10}$/.test(p) ||
    /^98\d{10}$/.test(p);

  return nameOk && addrOk && phoneOk;
}

function formatMoneyIRR(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) return "";
  return new Intl.NumberFormat("fa-IR").format(Math.round(n));
}

function buildWhatsAppText(lines, customer) {
  const parts = ["سلام، سفارش جدید از وبسایت کامچین:"];

  // Customer
  parts.push("");
  parts.push("اطلاعات مشتری:");
  parts.push(`نام: ${customer.name}`);
  parts.push(`شماره تماس: ${customer.phone}`);
  parts.push(`آدرس: ${customer.address}`);

  // Lines
  parts.push("");
  parts.push("اقلام سفارش:");
  let total = 0;
  let hasPrice = false;

  for (const l of lines) {
    const name = l.product?.nameFa || l.id;
    const w = l.product?.netWeightFa ? ` (${l.product.netWeightFa})` : "";
    const price = l.product?.price;
    const lineTotal =
      Number.isFinite(Number(price)) ? Number(price) * l.qty : 0;

    if (Number.isFinite(Number(price))) {
      hasPrice = true;
      total += lineTotal;
      parts.push(`- ${name}${w} × ${l.qty} | ${formatMoneyIRR(price)} ریال`);
    } else {
      parts.push(`- ${name}${w} × ${l.qty}`);
    }
  }

  if (hasPrice) {
    parts.push("");
    parts.push(`جمع کل: ${formatMoneyIRR(total)} ریال`);
  }

  return parts.join("\n");
}

export default function CartPage() {
  const cart = useCart();

  const [tab, setTab] = useState("cart");
  const [customer, setCustomer] = useState(() => {
    if (typeof window === "undefined") return { name: "", phone: "", address: "" };
    return readCustomer();
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    writeCustomer(customer);
  }, [customer]);

  const customerOk = useMemo(() => isValidCustomer(customer), [customer]);

  const waHref = useMemo(() => {
    if (!cart.lines.length || !customerOk) return "";
    const text = buildWhatsAppText(cart.lines, customer);
    return `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(text)}`;
  }, [cart.lines, customer, customerOk]);

  const goCheckout = () => {
    if (!cart.lines.length) return;
    if (!customerOk) {
      setTab("customer");
      return;
    }
    window.open(waHref, "_blank", "noreferrer");
  };

  return (
    <section className="container section">
      <div className={styles.head}>
        <h1 className="h1">سبد خرید</h1>

        <div className={styles.headActions}>
          <Link className={styles.back} to="/products">بازگشت به فراورده‌ها</Link>
</div>
      </div>

      <div className={page.card}>
        <div className={styles.tabs} role="tablist" aria-label="Cart tabs">
          <button
            type="button"
            className={`${styles.tab} ${tab === "cart" ? styles.tabActive : ""}`.trim()}
            onClick={() => setTab("cart")}
            role="tab"
            aria-selected={tab === "cart"}
          >
            سبد
          </button>

          <button
            type="button"
            className={`${styles.tab} ${tab === "customer" ? styles.tabActive : ""}`.trim()}
            onClick={() => setTab("customer")}
            role="tab"
            aria-selected={tab === "customer"}
          >
            اطلاعات مشتری
            {!customerOk ? <span className={styles.badDot} aria-hidden="true" /> : null}
          </button>
        </div>

        {tab === "cart" ? (
          <>
            <p className={styles.checkoutHint}>برای نهایی کردن خرید به قسمت اطلاعات مشتری بروید.</p>
            {!cart.lines.length ? (
              <p className="muted">سبد خرید خالی است.</p>
            ) : (
              <div className={styles.list}>
                {cart.lines.map((l) => {
                  const price = l.product?.price;
                  const hasPrice = Number.isFinite(Number(price));
                  return (
                    <div key={l.id} className={styles.row}>
                      <div className={styles.info}>
                        <div className={styles.name}>{l.product?.nameFa || "فراورده"}</div>
                        <div className="muted">
                          {l.product?.netWeightFa ? `وزن خالص: ${l.product.netWeightFa}` : null}
                        </div>
                        {hasPrice ? (
                          <div className={styles.price}>
                            {formatMoneyIRR(price)} ریال
                          </div>
                        ) : null}
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
                  );
                })}
              </div>
            )}

            {!customerOk && cart.lines.length ? (
              <div className={styles.callout}>
                برای نهایی کردن خرید، اطلاعات مشتری را کامل کنید.
                <button type="button" onClick={() => setTab("customer")}>تکمیل اطلاعات</button>
              </div>
            ) : null}
          </>
        ) : (
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.field}>
              <label htmlFor="c_name">نام و نام خانوادگی</label>
              <input
                id="c_name"
                className={styles.input}
                value={customer.name}
                onChange={(e) => setCustomer((p) => ({ ...p, name: e.target.value }))}
                autoComplete="name"
                placeholder="مثلاً علی رضایی"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="c_phone">شماره تلفن</label>
              <input
                id="c_phone"
                className={styles.input}
                value={customer.phone}
                onChange={(e) => setCustomer((p) => ({ ...p, phone: e.target.value }))}
                autoComplete="tel"
                inputMode="tel"
                placeholder="مثلاً 09123456789"
              />
              <div className={styles.hint}>فرمت قابل قبول: 09xxxxxxxxx یا +98xxxxxxxxxx</div>
            </div>

            <div className={styles.field}>
              <label htmlFor="c_addr">آدرس</label>
              <textarea
                id="c_addr"
                className={styles.textarea}
                value={customer.address}
                onChange={(e) => setCustomer((p) => ({ ...p, address: e.target.value }))}
                autoComplete="street-address"
                placeholder="آدرس کامل..."
                rows={4}
              />
            </div>

            <div className={styles.formActions}>
              <button type="button" className={styles.secondary} onClick={() => setTab("cart")}>
                بازگشت به سبد
              </button>

              <button
                type="button"
                className={styles.primary}
                onClick={goCheckout}
                disabled={!cart.lines.length || !customerOk}
              >
                ثبت خرید
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
