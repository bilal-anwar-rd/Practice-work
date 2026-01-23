import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import { COLORS } from "../common/colors";

const CustomerListItem = ({
  name,
  phone,
  status,
  metricValue,
  metricColors,
  avatar,
  onPress = () => {},
}) => {
  const isActiveNow = status?.toLowerCase().includes("active");
  const avatarNode = avatar?.uri ? (
    <Avatar.Image
      size={52}
      source={{ uri: avatar.uri }}
      style={[styles.avatar, avatar?.style]}
    />
  ) : (
    <Avatar.Text
      size={52}
      label={avatar?.initials || "?"}
      color={avatar?.textColor || COLORS.text}
      style={[
        styles.avatar,
        { backgroundColor: avatar?.bg || COLORS.surface },
        avatar?.style,
      ]}
      labelStyle={styles.avatarLabel}
    />
  );

  return (
    <Card mode="elevated" style={styles.card} onPress={onPress}>
      <Card.Content style={styles.row}>
        {avatarNode}
        <View style={styles.info}>
          <Text variant="titleMedium" style={styles.name}>
            {name}
          </Text>
          <Text variant="bodyMedium" style={styles.phone}>
            {phone}
          </Text>
          <Text
            variant="bodySmall"
            style={[styles.status, isActiveNow && styles.statusActive]}
          >
            {status}
          </Text>
        </View>
        <View
          style={[
            styles.metric,
            { backgroundColor: metricColors?.bg || COLORS.surface },
          ]}
        >
          <Text
            style={[
              styles.metricValue,
              { color: metricColors?.value || COLORS.text },
            ]}
          >
            {metricValue}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export default CustomerListItem;

const styles = StyleSheet.create({
  card: {
    marginTop: 12,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  avatar: {
    marginRight: 12,
  },
  avatarLabel: {
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  info: {
    flex: 1,
  },
  name: {
    color: COLORS.text,
  },
  phone: {
    color: COLORS.muted,
    marginTop: 2,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  status: {
    color: COLORS.mutedLight,
  },
  statusActive: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginRight: 6,
  },
  metric: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: "center",
    minWidth: 98,
  },
  metricValue: {
    fontSize: 17,
    fontWeight: "800",
  },
});
