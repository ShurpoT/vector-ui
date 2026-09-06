import { createContext, useContext } from "react";
import { VUI_THEMES, type IThemeContext } from "./types";

const initialValue: IThemeContext = {
    theme: VUI_THEMES.LIGHT,
    setTheme: () => {},
};

const ThemeContext = createContext<IThemeContext>(initialValue);

const useTheme = () => {
    const context = useContext<IThemeContext>(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be called within a ThemeProvider!");
    }

    return context;
};

export { ThemeContext, useTheme };
