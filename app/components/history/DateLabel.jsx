import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { COLORS } from "../common/colors";

const DateLabel = ({ label }) => {
  return (
    <Text variant="labelSmall" style={styles.label}>
      {label}
    </Text>
  );
};

export default DateLabel;

const styles = StyleSheet.create({
  label: {
    marginTop: 18,
    marginBottom: 8,
    letterSpacing: 0.6,
    color: COLORS.muted,
    fontWeight: "600",
  },
});
