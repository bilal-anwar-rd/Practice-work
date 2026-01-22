import React from "react";
import { StyleSheet, View } from "react-native";
import { Chip } from "react-native-paper";
import { COLORS } from "../common/colors";

const filters = ["All Items", "Low Stock", "Category", "Price"];

const InventoryFilters = ({ active, onChange = () => {} }) => {
  return (
    <View style={styles.row}>
      {filters.map((label) => {
        const selected = active === label;
        return (
          <Chip
            key={label}
            selected={selected}
            onPress={() => onChange(label)}
            style={[styles.chip, selected && styles.chipActive]}
            textStyle={[styles.chipText, selected && styles.chipTextActive]}
          >
            {label}
          </Chip>
        );
      })}
    </View>
  );
};

export default InventoryFilters;

const styles = StyleSheet.create({
  row: {
    marginTop: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    backgroundColor: COLORS.surface,
  },
  chipActive: {
    backgroundColor: COLORS.text,
  },
  chipText: {
    color: COLORS.muted,
  },
  chipTextActive: {
    color: "#FFFFFF",
  },
});
