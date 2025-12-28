import React from "react";
import styles from "./Footer.module.scss";
import { MapPin, Mail, Phone, Instagram, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.grid}>
                {/* Left block (logo/mark) */}
                <div className={styles.left}>
                    <img className={styles.mark} src="/images/logo.png" alt="Kamchin" />
                    <div className={styles.rights}>
                        All Rights Reserved to <span>Kamchin</span>
                    </div>
                </div>

                {/* Center illustration + CTA */}
                <div className={styles.center}>
                    <div className={styles.illusWrap}>
                        {/* اگر تصویر نداری همین رو بگذار خالی، بعداً عکس می‌گذاری */}
                        <img
                            className={styles.illus}
                            src="/images/banners/footer-illus.png"
                            alt=""
                            loading="lazy"
                            onError={(e) => (e.currentTarget.style.display = "none")}
                        />
                    </div>

                    <a className={styles.cta} href="#" target="_blank" rel="noreferrer">
                        دانلود اپلیکیشن
                    </a>
                </div>

                {/* Right contact column */}
                <div className={styles.right}>
                    <div className={styles.row}>
                        <span className={styles.text}>تهران، ...</span>
                        <span className={styles.icon}><MapPin size={20} /></span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.text}>info@kamchin.com</span>
                        <span className={styles.icon}><Mail size={20} /></span>
                    </div>

                    <div className={styles.row}>
                        <span className={styles.text}>021-44293648</span>
                        <span className={styles.icon}><Phone size={20} /></span>
                    </div>

                    <div className={styles.social}>
                        <a className={styles.socialBtn} href="#" aria-label="Instagram">
                            <Instagram size={18} />
                        </a>
                        <a className={styles.socialBtn} href="#" aria-label="Twitter">
                            <Twitter size={18} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
