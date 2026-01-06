import { useCallback, useEffect, useMemo, useState } from "react";
import { I18nContext } from "./I18nContext.js";
import { LANGS, translations } from "./translations.js";

const STORAGE_KEY = "kamchin.lang";

function readStoredLang() {
    try {
        const v = window.localStorage.getItem(STORAGE_KEY);
        return v === LANGS.en ? LANGS.en : LANGS.fa;
    } catch {
        return LANGS.fa;
    }
}

function writeStoredLang(v) {
    try {
        window.localStorage.setItem(STORAGE_KEY, v);
    } catch {
        // ignore
    }
}

export default function I18nProvider({ children }) {
    const [lang, setLangState] = useState(() => {
        if (typeof window === "undefined") return LANGS.fa;
        return readStoredLang();
    });

    const dir = lang === LANGS.en ? "ltr" : "rtl";

    const setLang = useCallback((next) => {
        const v = next === LANGS.en ? LANGS.en : LANGS.fa;
        setLangState(v);
        if (typeof window !== "undefined") writeStoredLang(v);
    }, []);

    useEffect(() => {
        document.documentElement.lang = lang;
        document.documentElement.dir = dir;
    }, [lang, dir]);

    const t = useCallback(
        (key) => {
            const dict = translations[lang] ?? translations[LANGS.fa];
            const parts = String(key).split(".");
            let cur = dict;

            for (const p of parts) {
                if (!cur || typeof cur !== "object" || !(p in cur)) return key;
                cur = cur[p];
            }
            return typeof cur === "string" ? cur : key;
        },
        [lang]
    );

    const value = useMemo(() => ({ lang, dir, setLang, t }), [lang, dir, setLang, t]);

    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
