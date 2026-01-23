import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Badge from "../common/ui/Badge";
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
          <Badge
            key={label}
            label={label}
            selected={selected}
            onPress={() => onChange(label)}
            style={styles.chip}
            textStyle={selected ? styles.chipTextActive : styles.chipTextInactive}
          />
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
    paddingLeft: 4,
  },
  chip: {
    marginRight: 10,
    height: 34,
    borderRadius: 17,
  },
  chipTextInactive: {
    color: COLORS.mutedAlt,
  },
  chipTextActive: {
    color: COLORS.white,
    fontWeight: "700",
  },
});
