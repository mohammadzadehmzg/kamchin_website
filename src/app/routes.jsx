import { Navigate } from "react-router-dom";

import Home from "../pages/Home.jsx";
import Market from "../pages/Market.jsx";
import ProductDetail from "../pages/ProductDetail.jsx";
import About from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";

export const routes = [
  { path: "/", element: <Home /> },

  // legacy
  { path: "/products", element: <Navigate to="/market/domestic" replace /> },

  { path: "/market/:market", element: <Market /> },
  { path: "/market/:market/:category", element: <Market /> },

  { path: "/product/:id", element: <ProductDetail /> },

  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
];
