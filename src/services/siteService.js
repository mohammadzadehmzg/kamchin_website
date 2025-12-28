import siteMock from "../data/site.mock.js";

/**
 * Site service:
 * Later can be replaced with API/CMS without changing UI.
 */
export async function getSite() {
    return siteMock;
}
