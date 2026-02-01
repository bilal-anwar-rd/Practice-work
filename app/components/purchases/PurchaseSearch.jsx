import React from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Searchbar, Surface } from "react-native-paper";
import { COLORS } from "../common/colors";

const PurchaseSearch = ({
  value,
  onChangeText,
  onFilterPress = () => {},
}) => {
  return (
    <View style={styles.row}>
      <Searchbar
        placeholder="Search supplier or invoice #"
        value={value}
        onChangeText={onChangeText}
        style={styles.search}
        inputStyle={styles.searchInput}
        iconColor={COLORS.muted}
      />
      <Surface elevation={2} style={styles.filterButton}>
        <IconButton icon="tune-variant" onPress={onFilterPress} size={22} />
      </Surface>
    </View>
  );
};

export default PurchaseSearch;

const styles = StyleSheet.create({
  row: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  search: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
  },
  searchInput: {
    color: COLORS.text,
  },
  filterButton: {
    marginLeft: 12,
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
    justifyContent: "center",
    alignItems: "center",
  },
});
