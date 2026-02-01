import { Link } from "react-router-dom";
import styles from "./Products.module.scss";

export default function Products() {
  return (
    <section className="container section">
      <h1 className="h1">محصولات</h1>
      <p className="muted">لطفاً بازار مورد نظر را انتخاب کنید.</p>

      <div className={styles.grid}>
        <Link className={styles.card} to="/market/domestic">
          <div className={styles.title}>محصولات داخلی</div>
          <div className={styles.desc}>مشاهده دسته‌بندی‌ها و لیست محصولات داخلی</div>
        </Link>

        <Link className={styles.card} to="/market/export">
          <div className={styles.title}>محصولات صادراتی</div>
          <div className={styles.desc}>مشاهده دسته‌بندی‌ها و لیست محصولات صادراتی</div>
        </Link>
      </div>
    </section>
  );
}
