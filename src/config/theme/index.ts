import { Theme } from "@material-ui/core";
import { darkTheme } from "./dark";
import { lightTheme } from "./light";

const themes: { [key: string]: Theme } = {
  dark: darkTheme,
  light: lightTheme,
};

export default function getTheme(themeName: string) {
  return themes[themeName];
}
