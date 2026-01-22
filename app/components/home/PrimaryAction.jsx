import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { COLORS } from "../common/colors";

const PrimaryAction = ({ onPress }) => {
  return (
    <Button
      mode="contained"
      icon="plus"
      contentStyle={styles.content}
      style={styles.button}
      buttonColor={COLORS.primary}
      onPress={onPress}
    >
      New Sale
    </Button>
  );
};

export default PrimaryAction;

const styles = StyleSheet.create({
  button: {
    marginTop: 24,
    borderRadius: 18,
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  content: {
    height: 56,
  },
});
