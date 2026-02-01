import { useEffect, useRef, useState } from "react";
import styles from "./ToastHost.module.scss";

const EVT = "kamchin:toast";

function uid() {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export default function ToastHost() {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  useEffect(() => {
    function onToast(e) {
      const detail = e?.detail || {};
      const id = uid();
      const toast = {
        id,
        type: detail.type || "info",
        message: String(detail.message || ""),
      };

      setToasts((prev) => [toast, ...prev].slice(0, 3));

      const t = setTimeout(() => {
        setToasts((prev) => prev.filter((x) => x.id !== id));
        timers.current.delete(id);
      }, Math.max(1200, Number(detail.ttlMs || 2200)));

      timers.current.set(id, t);
    }

    window.addEventListener(EVT, onToast);
    return () => {
      window.removeEventListener(EVT, onToast);
      for (const t of timers.current.values()) clearTimeout(t);
      timers.current.clear();
    };
  }, []);

  if (!toasts.length) return null;

  return (
    <div className={styles.host} aria-live="polite" aria-relevant="additions text">
      {toasts.map((t) => (
        <div key={t.id} className={`${styles.toast} ${styles[t.type] || ""}`.trim()} role="status">
          {t.message}
        </div>
      ))}
    </div>
  );
}

export function toast(message, type = "info", ttlMs) {
  window.dispatchEvent(new CustomEvent(EVT, { detail: { message, type, ttlMs } }));
}
