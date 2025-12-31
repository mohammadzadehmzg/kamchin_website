import styles from "./ProductCard.module.scss";

export default function ProductCard({ product, onOpen }) {
    const title =
        product?.titleFa ??
        product?.title ??
        product?.nameFa ??
        product?.name ??
        "محصول";

    const img = product?.image ?? product?.img ?? product?.cover ?? "";
    const desc = product?.description ?? product?.desc ?? "";
    const weight = product?.weight ?? product?.netWeight ?? product?.size ?? "";
    const sku = product?.sku ?? product?.code ?? "";

    const handleOpen = () => onOpen?.(product);

    return (
        <article className={styles.card} onClick={handleOpen} role="button" tabIndex={0}
                 onKeyDown={(e) => {
                     if (e.key === "Enter" || e.key === " ") handleOpen();
                 }}
                 aria-label={`مشاهده جزئیات ${title}`}
        >
            <div className={styles.media}>
                {img ? <img src={img} alt={title} loading="lazy" /> : null}
            </div>

            <div className={styles.body}>
                <div className={styles.title}>{title}</div>

                {(weight || sku) && (
                    <div className={styles.metaRow}>
                        {weight ? <span>وزن: {weight}</span> : null}
                        {sku ? <span>کد: {sku}</span> : null}
                    </div>
                )}

                {desc ? <div className={styles.desc}>{desc}</div> : null}

                <div className={styles.more}>مشاهده جزئیات ←</div>
            </div>
        </article>
    );
}
