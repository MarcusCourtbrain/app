import { DefaultTheme, DarkTheme, Theme } from "@react-navigation/native";
import { colors } from "./colors";

export const MyLightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: "#ffffff",
    text: "#000000",
  },
};

export const MyDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.primary,
    background: colors.background,
    text: colors.textPrimary,
  },
};
