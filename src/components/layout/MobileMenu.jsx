import styles from "./MobileMenu.module.scss";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

export default function MobileMenu({ open, onClose }) {
    if (!open) return null;

    return (
        <div className={styles.root} role="dialog" aria-modal="true">
            <div className={styles.backdrop} onClick={onClose} />

            <aside className={styles.panel}>
                <div className={styles.top}>
                    <button className={styles.close} onClick={onClose} aria-label="بستن">
                        <X size={20} />
                    </button>
                </div>

                <nav className={styles.nav}>
                    <Link to="/" onClick={onClose}>خانه</Link>
                    <Link to="/products" onClick={onClose}>محصولات</Link>
                    <Link to="/about" onClick={onClose}>درباره ما</Link>
                    <Link to="/contact" onClick={onClose}>تماس</Link>
                </nav>
            </aside>
        </div>
    );
}
