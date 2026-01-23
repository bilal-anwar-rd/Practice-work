import React from "react";
import { StyleSheet } from "react-native";
import { Chip } from "react-native-paper";
import { COLORS } from "../colors";

const Badge = ({
  label,
  selected = false,
  onPress,
  style,
  textStyle,
  icon,
}) => {
  return (
    <Chip
      icon={icon}
      selected={selected}
      mode={selected ? "flat" : "outlined"}
      showSelectedCheck={false}
      theme={{ roundness: 17 }}
      onPress={onPress}
      style={[styles.chip, selected ? styles.active : styles.inactive, style]}
      contentStyle={styles.content}
      textStyle={[styles.text, selected ? styles.textActive : styles.textInactive, textStyle]}
    >
      {label}
    </Chip>
  );
};

export default Badge;

const styles = StyleSheet.create({
  chip: {
    height: 34,
    borderRadius: 17,
  },
  content: {
    height: 34,
    paddingHorizontal: 14,
    paddingVertical: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  inactive: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  active: {
    backgroundColor: COLORS.neutral,
    borderColor: COLORS.neutral,
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
  },
  textInactive: {
    color: COLORS.mutedAlt,
  },
  textActive: {
    color: COLORS.white,
    fontWeight: "700",
  },
});
