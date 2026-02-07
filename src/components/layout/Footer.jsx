import styles from "./Footer.module.scss";
import { MapPin, Mail, Phone, Instagram, MessageCircle } from "lucide-react";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            {/* بخش صورتی */}
            <div className={styles.top}>
                <div className={`${styles.row} ${styles.addrRow}`}>
                    <MapPin size={18} />
                    <div className={styles.addrLines}>
                        <div>دفتر مرکزی : تهران، فلکه اول صادقیه ، خیابان گلناز شمالی ، نبش خیابان پانزده ،پلاک ، طبقه اول ، واحد 3</div>
                        <div>کارخانه : تهران ، شهریار، شاهد شهر ،بلوار شهدا ، خیابان شهید صدرزاده ،پلاک 33</div>
                    </div>
                </div>

                <div className={styles.row}>
                    <Mail size={18} />
                    <a href="mailto:info@kamchin.com">info@kamchin.com</a>
                </div>

                <div className={styles.row}>
                    <Phone size={18} />
                    <a href="tel:+989919725830">09919725830</a>
                </div>
            </div>


            <div className={styles.bottom}>
                <div className={styles.socials}>
                    {/* Instagram (handle not provided) */}
                    <a href="https://www.instagram.com/kamchin.foods/" aria-label="Instagram">
                        <Instagram size={18} />
                    </a>

                    {/* WhatsApp */}
                    <a href="https://wa.me/989919725830" target="_blank" rel="noreferrer" aria-label="WhatsApp">
                        <MessageCircle size={18} />
                    </a>

                    {/* Telegram */}
                    <a href="https://t.me/+989919725830" target="_blank" rel="noreferrer" aria-label="Telegram">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                            <path d="M12 0C5.372 0 0 5.372 0 12c0 6.627 5.372 12 12 12s12-5.373 12-12C24 5.372 18.627 0 12 0zm5.25 8.625l-1.875 8.625c-.143.625-.518.775-1.05.488l-2.906-2.144-1.4 1.35c-.155.155-.287.287-.587.287l.21-2.975 5.412-4.875c.238-.21-.05-.33-.37-.12l-6.675 4.2-2.868-.9c-.625-.195-.637-.625.13-.925l11.212-4.35c.518-.195.975.125.8.9z"/>
                        </svg>
                    </a>
                </div>

                <div className={styles.copy}>
                    made by golvash company
                </div>
            </div>
        </footer>
    );
}
