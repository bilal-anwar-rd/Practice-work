import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";
import { COLORS } from "../common/colors";
import SectionHeader from "../common/SectionHeader";

const ActivityCard = ({
  onPress = () => {},
  onViewAllPress = () => {},
}) => {
  return (
    <View>
      <SectionHeader
        title="Recent Activity"
        actionLabel="View All"
        onActionPress={onViewAllPress}
      />

      <Card mode="elevated" style={styles.card} onPress={onPress}>
        <Card.Content style={styles.content}>
          <View style={styles.left}>
            <View style={styles.iconWrap}>
              <IconButton
                icon="receipt-outline"
                size={22}
                iconColor={COLORS.muted}
                style={styles.iconButton}
              />
            </View>
            <View>
              <Text variant="titleMedium" style={styles.titleText}>
                Order #1024
              </Text>
              <Text variant="bodySmall" style={styles.mutedText}>
                10:30 AM - Walk-in
              </Text>
            </View>
          </View>
          <Text variant="titleMedium" style={styles.titleText}>
            $45.00
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
};

export default ActivityCard;

const styles = StyleSheet.create({
  titleText: {
    color: COLORS.text,
  },
  mutedText: {
    color: COLORS.muted,
  },
  card: {
    marginTop: 16,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F1F3F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  iconButton: {
    margin: 0,
  },
});
