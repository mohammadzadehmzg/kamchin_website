import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import I18nProvider from "../i18n/I18nProvider.jsx";
import "../assets/styles/globals.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <I18nProvider>
            <App />
        </I18nProvider>
    </BrowserRouter>
);
