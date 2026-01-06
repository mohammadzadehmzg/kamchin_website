import styles from "./Input.module.scss";

export default function Input({ className = "", ...rest }) {
    return <input className={`${styles.input} ${className}`.trim()} {...rest} />;
}
