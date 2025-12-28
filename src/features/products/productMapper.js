export function mapProduct(p) {
    return {
        id: p.id,
        nameFa: p.nameFa,
        netWeightFa: p.netWeightFa,
        categoryId: p.categoryId,
        image: p.image,
        featured: Boolean(p.featured),
    };
}
