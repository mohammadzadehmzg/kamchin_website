import { useEffect } from "react";
import styles from "./ProductModal.module.scss";

export default function ProductModal({ open, product, onClose, onMore }) {
    useEffect(() => {
        if (!open) return;

        const onKey = (e) => {
            if (e.key === "Escape") onClose?.();
        };

        // قفل اسکرول پس‌زمینه
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        window.addEventListener("keydown", onKey);
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [open, onClose]);

    if (!open || !product) return null;

    const title =
        product?.titleFa ??
        product?.title ??
        product?.nameFa ??
        product?.name ??
        "فراورده";

    const img = product?.image ?? product?.img ?? product?.cover ?? "";
    const desc = product?.description ?? product?.desc ?? "";
    const weight = product?.weight ?? product?.netWeight ?? product?.size ?? "";
    const sku = product?.sku ?? product?.code ?? "";
    const category = product?.categoryFa ?? product?.category ?? "";

    return (
        <div
            className={styles.backdrop}
            onMouseDown={(e) => {
                // کلیک بیرون = بستن
                if (e.target === e.currentTarget) onClose?.();
            }}
            role="dialog"
            aria-modal="true"
            aria-label={`جزئیات ${title}`}
        >
            <div className={styles.modal}>
                <div className={styles.header}>
                    <div className={styles.title}>{title}</div>
                    <button className={styles.close} onClick={onClose} aria-label="بستن">
                        ✕
                    </button>
                </div>

                <div className={styles.content}>
                    <div className={styles.media}>{img ? <img src={img} alt={title} /> : null}</div>

                    <div className={styles.info}>
                        <div className={styles.meta}>
                            {category ? <span>دسته: {category}</span> : null}
                            {weight ? <span>وزن: {weight}</span> : null}
                            {sku ? <span>کد: {sku}</span> : null}
                        </div>

                        {desc ? <div className={styles.desc}>{desc}</div> : null}

                        <div className={styles.actions}>
                            <button className={styles.primary} onClick={() => onMore?.(product)}>
                                اطلاعات بیشتر
                            </button>
                            <button className={styles.secondary} onClick={onClose}>
                                بستن
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
