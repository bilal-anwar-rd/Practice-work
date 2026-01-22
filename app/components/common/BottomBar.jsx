import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Surface, Text, TouchableRipple } from "react-native-paper";
import { COLORS } from "./colors";

const BAR_COLORS = {
  background: COLORS.surface,
  active: COLORS.primary,
  inactive: COLORS.muted,
  activePill: "#E9F2FB",
};

const BottomBar = ({ active = "Home", onTabPress = () => {} }) => {
  const items = [
    { key: "Home", icon: "home", label: "Home" },
    { key: "Inventory", icon: "view-grid-outline", label: "Inventory" },
    { key: "History", icon: "history", label: "History" },
    { key: "Settings", icon: "cog-outline", label: "Settings" },
  ];

  return (
    <Surface elevation={6} style={styles.bar}>
      {items.map((item) => {
        const isActive = active === item.key;
        const color = isActive ? BAR_COLORS.active : BAR_COLORS.inactive;
        return (
          <TouchableRipple
            key={item.key}
            borderless
            onPress={() => onTabPress(item.key)}
            style={[styles.item, isActive && styles.itemActive]}
          >
            <View style={styles.itemInner}>
              <View style={[styles.iconWrap, isActive && styles.iconWrapActive]}>
                <Icon source={item.icon} size={22} color={color} />
              </View>
              <Text style={[styles.label, { color }]}>{item.label}</Text>
            </View>
          </TouchableRipple>
        );
      })}
    </Surface>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  bar: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 12,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: BAR_COLORS.background,
    borderRadius: 24,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
  },
  item: {
    borderRadius: 16,
    overflow: "hidden",
  },
  itemActive: {
    backgroundColor: BAR_COLORS.activePill,
  },
  itemInner: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    paddingVertical: 6,
    minWidth: 64,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapActive: {
    backgroundColor: "#FFFFFF",
  },
  label: {
    fontSize: 12,
    color: BAR_COLORS.inactive,
    marginTop: 2,
  },
});
