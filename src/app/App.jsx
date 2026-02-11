import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Domestic from "./pages/Domestic";
import Export from "./pages/Export";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/products" element={<Products />} />
                <Route path="/market/domestic" element={<Domestic />} />
                <Route path="/market/export" element={<Export />} />

                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />

                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
