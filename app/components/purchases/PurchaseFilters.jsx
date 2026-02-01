import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Badge } from "../common/ui";
import { COLORS } from "../common/colors";

const filterOptions = ["All", "Received", "Draft", "Returned"];

const PurchaseFilters = ({ value, onChange = () => {} }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {filterOptions.map((label) => {
        const selected = value === label;
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

export default PurchaseFilters;

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
