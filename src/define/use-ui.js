import { useContext } from "react";
import UIContext from "./ui-context.js";

export default function useUI() {
    const ctx = useContext(UIContext);
    if (!ctx) throw new Error("useUI must be used within UIProvider");
    return ctx;
}
