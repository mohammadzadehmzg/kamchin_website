import { Routes, Route } from "react-router-dom";
import AppShell from "./AppShell.jsx";

import Home from "../pages/Home.jsx";
import Products from "../pages/Products.jsx";
import Market from "../pages/Market.jsx";
import ProductDetail from "../pages/ProductDetail.jsx";
import CartPage from "../pages/CartPage.jsx";
import About from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";
import NotFound from "../pages/NotFound.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/market/:market" element={<Market />} />
        <Route path="/market/:market/:category" element={<Market />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
