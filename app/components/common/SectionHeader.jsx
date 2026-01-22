import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { COLORS } from "./colors";

const SectionHeader = ({ title, actionLabel, onActionPress }) => {
  return (
    <View style={styles.row}>
      <Text variant="titleLarge" style={styles.titleText}>
        {title}
      </Text>
      {actionLabel ? (
        <Button
          mode="text"
          compact
          textColor={COLORS.primary}
          onPress={onActionPress}
        >
          {actionLabel}
        </Button>
      ) : null}
    </View>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({
  row: {
    marginTop: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleText: {
    color: COLORS.text,
  },
});
