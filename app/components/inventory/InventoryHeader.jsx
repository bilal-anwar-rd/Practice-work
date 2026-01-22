import React from "react";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { COLORS } from "../common/colors";

const InventoryHeader = ({ onFilterPress = () => {} }) => {
  return (
    <Appbar.Header mode="small" style={styles.appbar}>
      <Appbar.Content title="Inventory" titleStyle={styles.title} />
      <Appbar.Action icon="tune-variant" onPress={onFilterPress} />
    </Appbar.Header>
  );
};

export default InventoryHeader;

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: COLORS.background,
  },
  title: {
    color: COLORS.text,
    fontWeight: "600",
  },
});
