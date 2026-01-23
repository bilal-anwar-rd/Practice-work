import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import { COLORS } from "./components/common/colors";

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: COLORS.brandPrimary,
    secondary: COLORS.brandSecondary,
    tertiary: COLORS.brandTertiary,
    background: COLORS.backgroundWarm,
    surface: COLORS.surfaceWarm,
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
