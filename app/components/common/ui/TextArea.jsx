import React from "react";
import { StyleSheet } from "react-native";
import InputField from "./InputField";

const TextArea = ({ style, ...props }) => {
  return (
    <InputField
      multiline
      numberOfLines={4}
      style={[styles.textarea, style]}
      {...props}
    />
  );
};

export default TextArea;

const styles = StyleSheet.create({
  textarea: {
    minHeight: 110,
    height: "auto",
  },
});
