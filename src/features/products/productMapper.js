export function mapProduct(p) {
  return {
    id: p.id,
    nameFa: p.nameFa,
    netWeightFa: p.netWeightFa,
    categoryId: p.categoryId,
    market: p.market, // "domestic" | "export"
    image: p.image,
    description: p.description ?? "",
    featured: Boolean(p.featured),
  };
}
