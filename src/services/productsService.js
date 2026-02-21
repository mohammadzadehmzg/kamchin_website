import productsMock from "../data/products.mock.js";
import { axiosClient } from "./http/axiosClient.js";
import { mapProduct } from "../features/products/productMapper.js";

const CACHE_KEY = "golvash_products_cache_v1";

function unwrapListPayload(payload) {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.items)) return payload.items;
    if (Array.isArray(payload?.results)) return payload.results;
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload?.products)) return payload.products;
    return [];
}

function safeLoadCache() {
    try {
        const raw = window.localStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed?.items || !Array.isArray(parsed.items)) return null;
        return parsed.items;
    } catch {
        return null;
    }
}

function safeSaveCache(items) {
    try {
        window.localStorage.setItem(CACHE_KEY, JSON.stringify({ items, ts: Date.now() }));
    } catch {
        // ignore
    }
}

async function fetchAllProductsFromApi() {
    // API defaults: limit=50; total can be 205+; we auto-page.
    const limit = 100;
    let offset = 0;
    const all = [];

    for (let i = 0; i < 30; i += 1) {
        const { data } = await axiosClient.get("/api/v1/public/products", {
            params: { limit, offset },
        });

        const items = unwrapListPayload(data);
        if (!items.length) break;

        all.push(...items);

        const total = Number(data?.total ?? data?.count ?? NaN);
        offset += limit;

        if (Number.isFinite(total) && all.length >= total) break;
        if (items.length < limit) break;
    }

    return all;
}

export async function getProducts() {
    try {
        const items = await fetchAllProductsFromApi();
        safeSaveCache(items);
        return items.map(mapProduct);
    } catch {
        // No mock fallback (causes inconsistency across machines). Use last successful API cache.
        const cached = typeof window !== "undefined" ? safeLoadCache() : null;
        if (cached?.length) return cached.map(mapProduct);

        // As a last resort for local dev only, return mock (prevents blank UI on first run without network)
        return productsMock.map(mapProduct);
    }
}

export async function getProductById(id) {
    const sid = String(id);
    try {
        const { data } = await axiosClient.get(`/api/v1/public/products/${sid}`);
        return mapProduct(data);
    } catch {
        // fallback from cache if present
        const cached = typeof window !== "undefined" ? safeLoadCache() : null;
        const found = cached?.find((x) => String(x?.id) === sid);
        if (found) return mapProduct(found);
        // fallback mock
        const m = productsMock.find((x) => String(x?.id) === sid);
        return m ? mapProduct(m) : null;
    }
}

export async function searchProducts({ q, food_category, limit = 50, offset = 0 } = {}) {
    const { data } = await axiosClient.get("/api/v1/public/products", {
        params: { q, food_category, limit, offset },
    });
    const items = unwrapListPayload(data);
    return items.map(mapProduct);
}
