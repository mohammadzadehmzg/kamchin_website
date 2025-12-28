import productsMock from "../data/products.mock.js";
import { mapProduct } from "../features/products/productMapper.js";

export async function getProducts() {
    // وقتی API آماده شد:
    // const { data } = await axiosClient.get("/products");
    // return data.map(mapProduct);

    return productsMock.map(mapProduct);
}
