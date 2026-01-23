import React from "react";
import { Switch } from "react-native-paper";
import { COLORS } from "../colors";

const UISwitch = ({ color = COLORS.primary, ...props }) => {
  return <Switch color={color} {...props} />;
};

export default UISwitch;
