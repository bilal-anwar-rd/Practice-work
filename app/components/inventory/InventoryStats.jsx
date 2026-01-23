import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { COLORS } from "../common/colors";

const InventoryStats = ({ totalValue, lowStockCount }) => {
  return (
    <View style={styles.row}>
      <Card mode="elevated" style={[styles.card, styles.cardLeft]}>
        <Card.Content>
          <Text variant="labelSmall" style={styles.muted}>
            TOTAL VALUE
          </Text>
          <Text variant="titleLarge" style={styles.title}>
            {totalValue}
          </Text>
        </Card.Content>
      </Card>
      <Card mode="elevated" style={[styles.card, styles.cardRight]}>
        <Card.Content>
          <Text variant="labelSmall" style={styles.mutedWarn}>
            LOW STOCK
          </Text>
          <Text variant="titleLarge" style={styles.title}>
            {lowStockCount}
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
};

export default InventoryStats;

const styles = StyleSheet.create({
  row: {
    marginTop: 12,
    flexDirection: "row",
  },
  card: {
    flex: 1,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
  },
  cardLeft: {
    marginRight: 12,
    backgroundColor: COLORS.primaryTint,
  },
  cardRight: {
    backgroundColor: COLORS.warningSoft,
  },
  title: {
    color: COLORS.text,
  },
  muted: {
    color: COLORS.primary,
    marginBottom: 4,
  },
  mutedWarn: {
    color: COLORS.warningDark,
    marginBottom: 4,
  },
});
