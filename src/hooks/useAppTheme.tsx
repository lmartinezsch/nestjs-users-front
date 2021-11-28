import { useCallback, useContext, useEffect } from "react";
import RCCThemeContext from "../context/RCCThemeProvider";
import eventEmitter from "../utils/event_emitter";

export default function useAppTheme() {
  const { themeName, setThemeName } = useContext(RCCThemeContext);

  const isDarkTheme = () => {
    return themeName === "dark";
  };

  const isLightTheme = () => {
    return themeName === "light";
  };

  const changeTheme = useCallback(
    (theme) => {
      setThemeName(theme);
    },
    [setThemeName]
  );

  const setDarkTheme = () => {
    changeTheme("dark");
    setTimeout(() => {
      eventEmitter.emit("appThemeChanged", "dark");
    }, 0);
  };

  const setLightTheme = () => {
    changeTheme("light");
    setTimeout(() => {
      eventEmitter.emit("appThemeChanged", "light");
    }, 0);
  };

  useEffect(() => {
    eventEmitter.off("appThemeChanged");
  }, []);

  return {
    darkTheme: isDarkTheme(),
    setDarkTheme,
    lightTheme: isLightTheme(),
    setLightTheme,
    onThemeChanged: (callback: any) => {
      eventEmitter.on("appThemeChanged", callback);
    },
  };
}
