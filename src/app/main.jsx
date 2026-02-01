import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Local font (replaces Google Fonts CDN)
import "@fontsource/vazirmatn/300.css";
import "@fontsource/vazirmatn/400.css";
import "@fontsource/vazirmatn/600.css";
import "@fontsource/vazirmatn/700.css";
import "@fontsource/vazirmatn/800.css";
import App from "./App.jsx";
import I18nProvider from "../i18n/I18nProvider.jsx";
import { CartProvider } from "../features/cart/CartContext.jsx";
import "../assets/styles/globals.scss";
import ErrorBoundary from "../components/ui/ErrorBoundary.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <I18nProvider>
            <CartProvider>
                <ErrorBoundary>
                    <App />
                </ErrorBoundary>
            </CartProvider>
        </I18nProvider>
    </BrowserRouter>
);
