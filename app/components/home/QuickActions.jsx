import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";
import { COLORS } from "../common/colors";
import SectionHeader from "../common/SectionHeader";

const quickActions = [
  {
    key: "scan",
    label: "Scan Item",
    icon: "barcode-scan",
    tint: COLORS.blueTint,
    color: COLORS.primary,
  },
  {
    key: "warehouses",
    label: "Warehouses",
    icon: "warehouse",
    tint: COLORS.greenTint,
    color: COLORS.successTeal,
  },
  {
    key: "inventory",
    label: "Inventory",
    icon: "archive-outline",
    tint: COLORS.orangeTint,
    color: COLORS.warningDeep,
  },
  {
    key: "customers",
    label: "Customers",
    icon: "account-group-outline",
    tint: COLORS.purpleTint,
    color: COLORS.purple,
  },
  {
    key: "reports",
    label: "Reports",
    icon: "chart-bar",
    tint: COLORS.greenTint,
    color: COLORS.successTeal,
  },
];

const QuickActions = ({
  containerWidth,
  onActionPress = () => {},
  onEditPress = () => {},
}) => {
  const columns = containerWidth >= 768 ? 4 : 2;
  const gap = 16;
  const horizontalPadding = 0;
  const available =
    containerWidth - horizontalPadding * 2 - gap * (columns - 1);
  const cardWidth = Math.floor(available / columns);

  return (
    <View>
      <SectionHeader
        title="Quick Actions"
        actionLabel="Edit"
        onActionPress={onEditPress}
      />

      <View style={[styles.grid, { marginHorizontal: -gap / 2 }]}>
        {quickActions.map((item) => (
          <Card
            key={item.key}
            mode="elevated"
            style={[styles.card, { width: cardWidth, margin: gap / 2 }]}
            onPress={() => onActionPress(item.label)}
          >
            <Card.Content style={styles.cardContent}>
              <View style={[styles.iconWrap, { backgroundColor: item.tint }]}>
                <IconButton
                  icon={item.icon}
                  size={26}
                  iconColor={item.color}
                  style={styles.iconButton}
                />
              </View>
              <Text variant="titleMedium" style={styles.label}>
                {item.label}
              </Text>
            </Card.Content>
          </Card>
        ))}
      </View>
    </View>
  );
};

export default QuickActions;

const styles = StyleSheet.create({
  grid: {
    marginTop: 16,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  card: {
    borderRadius: 18,
    backgroundColor: COLORS.surface,
  },
  cardContent: {
    alignItems: "center",
    paddingVertical: 20,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  iconButton: {
    margin: 0,
  },
  label: {
    marginTop: 12,
  },
});
