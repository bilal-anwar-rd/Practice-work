import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { COLORS } from "../common/colors";

const InventoryItem = ({
  name,
  sku,
  price,
  stockLabel,
  stockColor,
  units,
  onPress = () => {},
}) => {
  return (
    <Card mode="elevated" style={styles.card} onPress={onPress}>
      <Card.Content style={styles.content}>
        <View style={styles.thumb} />
        <View style={styles.info}>
          <Text variant="titleMedium" style={styles.title}>
            {name}
          </Text>
          <Text variant="bodySmall" style={styles.muted}>
            SKU: {sku}
          </Text>
          <View style={[styles.badge, { backgroundColor: stockColor.background }]}>
            <Text style={[styles.badgeText, { color: stockColor.text }]}>
              {stockLabel}
            </Text>
          </View>
        </View>
        <View style={styles.right}>
          <Text variant="titleMedium" style={styles.title}>
            {price}
          </Text>
          <Text variant="bodySmall" style={styles.muted}>
            {units} units
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export default InventoryItem;

const styles = StyleSheet.create({
  card: {
    marginTop: 12,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  thumb: {
    width: 54,
    height: 54,
    borderRadius: 12,
    backgroundColor: COLORS.neutralSoft2,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  right: {
    alignItems: "flex-end",
    marginLeft: 10,
  },
  title: {
    color: COLORS.text,
  },
  muted: {
    color: COLORS.muted,
    marginTop: 2,
  },
  badge: {
    marginTop: 6,
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
