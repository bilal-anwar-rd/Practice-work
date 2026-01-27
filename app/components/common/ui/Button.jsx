import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { COLORS } from "../colors";

const VARIANTS = {
  primary: {
    mode: "contained",
    buttonColor: COLORS.primary,
    textColor: COLORS.white,
    style: null,
  },
  smallPrimary: {
    mode: "contained",
    buttonColor: COLORS.primary,
    textColor: COLORS.white,
    style: null,
  },
  outline: {
    mode: "outlined",
    buttonColor: COLORS.white,
    textColor: COLORS.primary,
    style: { borderColor: COLORS.border },
  },
  smallOutlinePrimary: {
    mode: "outlined",
    buttonColor: COLORS.white,
    textColor: COLORS.primary,
    style: { borderColor: COLORS.border },
  },
  ghost: {
    mode: "text",
    buttonColor: COLORS.transparent,
    textColor: COLORS.muted,
    style: null,
  },
  ghostPrimary: {
    mode: "text",
    buttonColor: COLORS.transparent,
    textColor: COLORS.primary,
    style: null,
  },
  danger: {
    mode: "contained",
    buttonColor: COLORS.danger,
    textColor: COLORS.white,
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
  label: {
    fontWeight: "700",
  },
});
