import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { COLORS } from "../colors";

const VARIANTS = {
  primary: {
    mode: "contained",
    buttonColor: COLORS.primary,
    textColor: "white",
    style: null,
  },
  secondary: {
    mode: "contained-tonal",
    buttonColor: COLORS.surface,
    textColor: COLORS.primary,
    style: { borderWidth: 1, borderColor: COLORS.border },
  },
  outline: {
    mode: "outlined",
    buttonColor: "transparent",
    textColor: COLORS.text,
    style: { borderColor: COLORS.border },
  },
  ghost: {
    mode: "text",
    buttonColor: "transparent",
    textColor: COLORS.muted,
    style: null,
  },
  danger: {
    mode: "contained",
    buttonColor: "#D34545",
    textColor: "white",
    style: null,
  },
};

const SIZES = {
  sm: 38,
  md: 46,
  lg: 54,
};

const UIButton = ({
  variant = "primary",
  size = "lg",
  style,
  contentStyle,
  labelStyle,
  ...props
}) => {
  const config = VARIANTS[variant] || VARIANTS.primary;
  const height = SIZES[size] || SIZES.lg;

  return (
    <Button
      mode={config.mode}
      buttonColor={config.buttonColor}
      textColor={config.textColor}
      style={[styles.base, config.style, style]}
      contentStyle={[styles.content, { height }, contentStyle]}
      labelStyle={[styles.label, labelStyle]}
      {...props}
    />
  );
};

export default UIButton;

const styles = StyleSheet.create({
  base: {
    borderRadius: 14,
  },
  content: {
    paddingHorizontal: 18,
  },
  label: {
    fontWeight: "700",
  },
});
