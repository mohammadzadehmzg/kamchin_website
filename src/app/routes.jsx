import React from "react";
import Home from "../pages/Home.jsx";
import Products from "../pages/Products.jsx";
import About from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";

export const routes = [
    { path: "/", element: <Home /> },
    { path: "/products", element: <Products /> },
    { path: "/about", element: <About /> },
    { path: "/contact", element: <Contact /> },
];
