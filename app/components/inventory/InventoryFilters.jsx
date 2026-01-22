import React from "react";
import { ScrollView, StyleSheet } from "react-native";
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
            mode={selected ? "flat" : "outlined"}
            showSelectedCheck={false}
            theme={{ roundness: 17 }}
            onPress={() => onChange(label)}
            style={[
              styles.chip,
              selected ? styles.chipActive : styles.chipInactive,
            ]}
            contentStyle={styles.chipContent}
            textStyle={[
              styles.chipText,
              selected ? styles.chipTextActive : styles.chipTextInactive,
            ]}
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
    paddingLeft: 4,
  },
  chip: {
    marginRight: 10,
    height: 34,
    borderRadius: 17,
  },
  chipContent: {
    height: 34,
    paddingHorizontal: 14,
    paddingVertical: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  chipInactive: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: "#DDE3EA",
  },
  chipActive: {
    backgroundColor: "#0F151A",
    borderColor: "#0F151A",
  },
  chipText: {
    fontSize: 14,
    fontWeight: "600",
  },
  chipTextInactive: {
    color: "#7A8693",
  },
  chipTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
