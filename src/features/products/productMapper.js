import { resolvePic } from "../../utils/asset.js";

export function mapProduct(p) {
  const image = resolvePic(p?.image);

  return {
    id: p?.id,
    nameFa: p?.nameFa ?? "",
    nameEn: p?.nameEn ?? p?.nameFa ?? "",
    netWeightFa: p?.netWeightFa ?? "",
    netWeightEn: p?.netWeightEn ?? p?.netWeightFa ?? "",
    categoryId: p?.categoryId ?? null,
    market: p?.market ?? "domestic", // "domestic" | "export"
    image: image || "/images/cropped-Kamchin-logo-1-1-300x290-1.png",
    description: p?.description ?? "",
    featured: Boolean(p?.featured),
  };
}
