import { resolvePic } from "../../utils/asset.js";

function toNumber(value) {
    const n = Number(String(value ?? "").replaceAll(",", "").trim());
    return Number.isFinite(n) ? n : 0;
}

// API sample fields:
// { id: "210", name: "...", n_weight: "480", price: "123000", food_category: "1", type: "4" }
export function mapProduct(p) {
    if (!p) return null;

    const idRaw = p?.id ?? p?.pk ?? p?.product_id ?? p?.productId ?? null;
    const id = idRaw !== null ? Number.parseInt(String(idRaw), 10) : null;

    const nameFa = p?.nameFa ?? p?.titleFa ?? p?.name ?? p?.title ?? "";
    const nameEn = p?.nameEn ?? p?.titleEn ?? p?.name_en ?? nameFa;

    const netWeightFa =
        p?.netWeightFa ??
        p?.net_weight_fa ??
        (p?.n_weight ? `${p.n_weight} گرم` : p?.n_weight ?? "");
    const netWeightEn =
        p?.netWeightEn ??
        p?.net_weight_en ??
        (p?.n_weight ? `${p.n_weight} g` : p?.n_weight ?? netWeightFa);

    const categoryId = p?.categoryId ?? p?.food_category ?? p?.category ?? null;

    // Market: API doesn't provide. Keep domestic by default; UI should not hard-filter export.
    const market = p?.market ?? "domestic";

    // Image: API list doesn't include image; keep null unless present.
    const image = resolvePic(p?.image ?? p?.image_url ?? p?.thumbnail ?? null);

    const price = toNumber(p?.price);
    const discount = p?.discount != null ? toNumber(p.discount) : null;
    const finalPrice = discount != null ? Math.max(0, price - discount) : price;

    return {
        id,
        // naming
        nameFa,
        nameEn,
        // weight
        netWeightFa,
        netWeightEn,
        // category/market
        categoryId,
        market,
        type: p?.type ?? null,
        // pricing
        price,
        discount,
        finalPrice,
        // media
        image,
        // raw passthrough for future use
        raw: p,
    };
}
