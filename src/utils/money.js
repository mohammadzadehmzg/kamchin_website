export function formatPrice(amount, lang = "fa") {
    const n = Number(amount);
    if (!Number.isFinite(n)) return "";
    const locale = lang === "fa" ? "fa-IR" : "en-US";
    return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(n);
}
