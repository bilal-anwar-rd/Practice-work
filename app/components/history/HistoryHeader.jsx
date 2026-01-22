import React from "react";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { COLORS } from "../common/colors";

const HistoryHeader = ({ onBackPress = () => {}, onMenuPress = () => {} }) => {
  return (
    <Appbar.Header mode="small" style={styles.appbar}>
      <Appbar.Action icon="chevron-left" onPress={onBackPress} />
      <Appbar.Content title="Recent Activity" titleStyle={styles.title} />
      <Appbar.Action icon="dots-vertical" onPress={onMenuPress} />
    </Appbar.Header>
  );
};

export default HistoryHeader;

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: COLORS.background,
  },
  title: {
    color: COLORS.text,
    fontWeight: "600",
  },
});
