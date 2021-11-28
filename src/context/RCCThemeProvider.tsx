import React, { useState, useCallback, useEffect } from "react";
import { ThemeProvider, CssBaseline, useMediaQuery } from "@material-ui/core";
import getTheme from "../config/theme";

const RCCThemeContext = React.createContext({
  themeName: "",
  setThemeName: (_themeName: any) => {},
});

export function RCCThemeProvider({ children }: { [key: string]: any }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [initialized, setInitialized] = useState(false);

  const [themeName, setTheme] = useState("dark");

  const setThemeName = useCallback(
    (themeName) => {
      setTheme(themeName);
      window.sessionStorage.setItem("app.theme", themeName);
    },
    [setTheme]
  );

  useEffect(() => {
    if (!initialized) {
      const sessionTheme = window.sessionStorage.getItem("app.theme");
      setThemeName(sessionTheme || (prefersDarkMode ? "dark" : "light"));
      setInitialized(true);
    }
  }, [setThemeName, initialized, setInitialized, prefersDarkMode]);

  return initialized ? (
    <RCCThemeContext.Provider value={{ themeName, setThemeName }}>
      <ThemeProvider theme={getTheme(themeName)}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </RCCThemeContext.Provider>
  ) : null;
}

export default RCCThemeContext;
