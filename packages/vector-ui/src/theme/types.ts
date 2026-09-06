import type { ReactNode } from "react";

const VUI_THEMES = {
    LIGHT: "light",
    DARK: "dark",
    CUSTOM: "custom",
} as const;

type Themes = typeof VUI_THEMES;
type Theme = Themes[keyof Themes];

interface IThemeContext {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

interface IThemeProvider {
    theme?: Theme;
    children: ReactNode;
}

export { VUI_THEMES, type Themes, type Theme, type IThemeContext, type IThemeProvider };
