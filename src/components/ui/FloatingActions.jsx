import { useNavigate } from "react-router-dom";
import styles from "./FloatingChatButton.module.scss";

export default function FloatingChatButton() {
    const navigate = useNavigate();

    return (
        <button
            type="button"
            className={styles.chatBtn}
            aria-label="چت با کامچین"
            // طبق درخواست کارفرما لینک‌های بدون مسیر معتبر، به Home برگردن
            onClick={() => navigate("/")}
        >
            💬
        </button>
    );
}