import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";
import { COLORS } from "../common/colors";

const MetricCard = ({ title, value, icon, change, onPress }) => {
  return (
    <Card mode="elevated" style={styles.card} onPress={onPress}>
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleMedium" style={styles.mutedText}>
            {title}
          </Text>
          <IconButton
            icon={icon}
            size={22}
            iconColor={COLORS.muted}
            style={styles.icon}
          />
        </View>
        <Text variant="headlineMedium" style={styles.titleText}>
          {value}
        </Text>
        <View style={styles.badge}>
          <IconButton
            icon="trending-up"
            size={16}
            iconColor={COLORS.success}
            style={styles.trendIcon}
          />
          <Text style={styles.badgeText}>{change}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export default MetricCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 18,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    margin: 0,
  },
  badge: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: COLORS.successBg,
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  trendIcon: {
    margin: 0,
  },
  badgeText: {
    color: COLORS.success,
    fontWeight: "600",
  },
  titleText: {
    color: COLORS.text,
  },
  mutedText: {
    color: COLORS.muted,
  },
});
