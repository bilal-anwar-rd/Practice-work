import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Chip } from "react-native-paper";
import { COLORS } from "../common/colors";

const filters = ["All Items", "Low Stock", "Category", "Price"];

const InventoryFilters = ({ active, onChange = () => {} }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
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
    </ScrollView>
  );
};

export default InventoryFilters;

const styles = StyleSheet.create({
  row: {
    marginTop: 12,
    paddingRight: 8,
  },
  chip: {
    backgroundColor: COLORS.surface,
    marginRight: 8,
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
