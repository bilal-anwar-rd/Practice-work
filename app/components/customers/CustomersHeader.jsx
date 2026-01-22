import React from "react";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { COLORS } from "../common/colors";

const CustomersHeader = ({
  onBackPress = () => {},
  onMenuPress = () => {},
}) => {
  return (
    <Appbar.Header mode="small" style={styles.appbar}>
      <Appbar.Action icon="chevron-left" onPress={onBackPress} />
      <Appbar.Content title="Customers" titleStyle={styles.title} />
      <Appbar.Action icon="dots-horizontal" onPress={onMenuPress} />
    </Appbar.Header>
  );
};

export default CustomersHeader;

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: COLORS.background,
  },
  title: {
    color: COLORS.text,
    fontWeight: "700",
  },
});
