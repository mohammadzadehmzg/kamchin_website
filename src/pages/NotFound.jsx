import { Link } from "react-router-dom";
import styles from "./NotFound.module.scss";
import useI18n from "../i18n/useI18n.js";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <h1 className={styles.title}>{t("ui.not_found_title")}</h1>
        <p className={styles.lead}>{t("ui.not_found_desc")}</p>
        <Link className={styles.link} to="/">{t("ui.go_home")}</Link>
      </div>
    </div>
  );
}
