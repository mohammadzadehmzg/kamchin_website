import styles from "./ProductCard.module.scss";
import { resolvePic } from "../../utils/asset.js";
import useI18n from "../../i18n/useI18n.js";
import { formatPrice } from "../../utils/money.js";

export default function ProductCard({ product, onOpen, onAddToCart }) {
    const { lang } = useI18n();
    if (!product) return null;

    const title =
        product?.titleFa ??
        product?.title ??
        product?.nameFa ??
        product?.name ??
        "فراورده";

    const imgRaw = product?.image ?? product?.img ?? product?.cover ?? "";
    const img = resolvePic(imgRaw) || imgRaw;
    const desc = product?.description ?? product?.desc ?? "";

    const handleOpen = () => onOpen?.(product);
    const handleAdd = (e) => {
        e.stopPropagation(); // 👈 کلیک کارت فعال نشه
        onAddToCart?.(product);
    };

    return (
        <article
            className={styles.card}
            onClick={handleOpen}
            role="button"
            tabIndex={0}
            aria-label={`مشاهده جزئیات ${title}`}
        >
            <div className={styles.media}>
                {img && <img src={img} alt={title} loading="lazy" />}

                {/* دکمه افزودن */}
                <button
                    className={styles.addBtn}
                    onClick={handleAdd}
                    aria-label="افزودن به سبد خرید"
                >
                    +
                </button>
            </div>

            <div className={styles.body}>
                <h3 className={styles.title}>{title}</h3>

                {desc && <p className={styles.desc}>{desc}</p>}

                <div className={styles.more}>مشاهده جزئیات ←</div>
            </div>
        </article>
    );
}
