import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { COLORS } from "../colors";

const INPUT_RADIUS = 12;

const InputField = ({
  leftIcon,
  rightIcon,
  style,
  outlineStyle,
  theme,
  ...props
}) => {
  return (
    <TextInput
      mode="outlined"
      outlineColor={COLORS.border}
      activeOutlineColor={COLORS.primary}
      style={[styles.input, style]}
      outlineStyle={[styles.outline, outlineStyle]}
      theme={{ roundness: INPUT_RADIUS, ...theme }}
      left={leftIcon ? <TextInput.Icon icon={leftIcon} /> : props.left}
      right={rightIcon ? <TextInput.Icon icon={rightIcon} /> : props.right}
      {...props}
    />
  );
};

export default InputField;

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.surface,
    height: 56,
  },
  outline: {
    borderRadius: INPUT_RADIUS,
  },
});
