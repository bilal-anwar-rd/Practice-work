import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { MD3LightTheme, PaperProvider } from "react-native-paper";

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#0D3B66",
    secondary: "#F4D35E",
    tertiary: "#EE964B",
    background: "#F7F1E3",
    surface: "#FDFBF7",
  },
};

const RootLayout = () => {
  return (
    <PaperProvider theme={theme}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }} />
    </PaperProvider>
  );
};

export default RootLayout;
