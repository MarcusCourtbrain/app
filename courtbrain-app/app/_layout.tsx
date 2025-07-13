import { Stack } from "expo-router";
import { ThemeProvider } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { MyLightTheme, MyDarkTheme } from "_styles/theme";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? MyDarkTheme : MyLightTheme}>
      <Stack />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
