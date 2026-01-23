import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";
import { COLORS } from "../common/colors";

const OrderItem = ({
  title,
  time,
  channel,
  amount,
  icon = "receipt-outline",
  tint = COLORS.blueTint,
  iconColor = COLORS.primary,
  onPress = () => {},
}) => {
  return (
    <Card mode="elevated" style={styles.card} onPress={onPress}>
      <Card.Content style={styles.content}>
        <View style={styles.left}>
          <View style={[styles.iconWrap, { backgroundColor: tint }]}>
            <IconButton
              icon={icon}
              size={20}
              iconColor={iconColor}
              style={styles.iconButton}
            />
          </View>
          <View>
            <Text variant="titleMedium" style={styles.titleText}>
              {title}
            </Text>
            <Text variant="bodySmall" style={styles.mutedText}>
              {time} - {channel}
            </Text>
          </View>
        </View>
        <Text
          variant="titleMedium"
          style={[
            styles.amount,
            amount.startsWith("-") && styles.negativeAmount,
          ]}
        >
          {amount}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    marginBottom: 12,
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
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  iconButton: {
    margin: 0,
  },
  titleText: {
    color: COLORS.text,
  },
  mutedText: {
    color: COLORS.muted,
  },
  amount: {
    color: COLORS.text,
  },
  negativeAmount: {
    color: COLORS.dangerBright,
  },
});
