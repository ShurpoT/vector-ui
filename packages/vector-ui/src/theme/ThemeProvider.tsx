import { useState, useEffect, useRef, useMemo } from "react";
import { VUI_THEMES, type IThemeContext, type IThemeProvider, type Theme } from "./types";
import { ThemeContext } from "./ThemeContext";

const ThemeProvider = ({ theme = VUI_THEMES.LIGHT, children }: IThemeProvider) => {
    const isFirstRender = useRef<boolean>(true);

    const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
        if (typeof window !== "undefined") {
            const localTheme = localStorage.getItem("vui-theme") as Theme | null;

            if (localTheme && (Object.values(VUI_THEMES) as string[]).includes(localTheme)) {
                return localTheme;
            }
        }
        return theme || VUI_THEMES.LIGHT;
    });

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        setCurrentTheme(theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem("vui-theme", currentTheme);
    }, [currentTheme]);

    const currentValue: IThemeContext = useMemo<IThemeContext>(
        () => ({
            theme: currentTheme,
            setTheme: setCurrentTheme,
        }),
        [currentTheme],
    );

    return (
        <div className={currentTheme}>
            <ThemeContext.Provider value={currentValue}>{children}</ThemeContext.Provider>
        </div>
    );
};

export { ThemeProvider };
