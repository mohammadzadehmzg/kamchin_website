import Home from "../pages/Home.jsx";
import Products from "../pages/Products.jsx";
import Market from "../pages/Market.jsx";
import ProductDetail from "../pages/ProductDetail.jsx";
import CartPage from "../pages/CartPage.jsx";
import About from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";

export const routes = [
  { path: "/", element: <Home /> },

  { path: "/products", element: <Products /> },

  { path: "/market/:market", element: <Market /> },
  { path: "/market/:market/:category", element: <Market /> },

  { path: "/product/:id", element: <ProductDetail /> },

  { path: "/cart", element: <CartPage /> },

  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
];
