import { useMemo } from "react";
import UIContext from "./ui-context.js";

export default function UIProvider({ openMenu, closeMenu, children }) {
    const value = useMemo(
        () => ({
            openMenu: typeof openMenu === "function" ? openMenu : () => {},
            closeMenu: typeof closeMenu === "function" ? closeMenu : () => {},
        }),
        [openMenu, closeMenu]
    );

    return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
