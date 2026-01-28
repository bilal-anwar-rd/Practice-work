import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Card, Icon, Text } from "react-native-paper";
import { COLORS } from "../common/colors";

const SupplierListItem = ({
  name,
  phone,
  outstanding,
  outstandingTone = "primary",
  image,
  onPress = () => {},
  onCall = () => {},
  onPurchases = () => {},
}) => {
  const toneStyles =
    outstandingTone === "danger"
      ? { bg: COLORS.dangerTint, text: COLORS.dangerBright }
      : { bg: COLORS.primaryTint, text: COLORS.primaryDark };

  return (
    <Card mode="elevated" style={styles.card} onPress={onPress}>
      <Card.Content style={styles.content}>
        <View style={styles.row}>
          <View style={styles.info}>
            <View style={[styles.pill, { backgroundColor: toneStyles.bg }]}>
              <Text style={[styles.pillText, { color: toneStyles.text }]}>
                Outstanding: {outstanding}
              </Text>
            </View>
            <Text variant="titleMedium" style={styles.name}>
              {name}
            </Text>
            <View style={styles.phoneRow}>
              <Icon source="phone" size={16} color={COLORS.muted} />
              <Text style={styles.phone}>{phone}</Text>
            </View>
          </View>

          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : null}
        </View>

        <View style={styles.actions}>
          <Button
            mode="contained"
            icon="phone"
            onPress={onCall}
            style={[styles.actionButton, styles.callButton]}
            contentStyle={styles.actionContent}
            labelStyle={styles.actionLabel}
          >
            Call
          </Button>
          <Button
            mode="outlined"
            icon="clipboard-list-outline"
            onPress={onPurchases}
            style={[styles.actionButton, styles.purchaseButton]}
            contentStyle={styles.actionContent}
            labelStyle={[styles.actionLabel, styles.purchaseLabel]}
          >
            Purchases
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
};

export default SupplierListItem;

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    marginBottom: 14,
    backgroundColor: COLORS.surface,
  },
  content: {
    paddingVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  info: {
    flex: 1,
  },
  pill: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  pillText: {
    fontWeight: "700",
    fontSize: 12,
  },
  name: {
    marginTop: 8,
    color: COLORS.text,
    fontWeight: "700",
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  phone: {
    marginLeft: 6,
    color: COLORS.muted,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginLeft: 12,
  },
  actions: {
    flexDirection: "row",
    marginTop: 14,
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
  },
  actionContent: {
    height: 44,
  },
  actionLabel: {
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  callButton: {
    backgroundColor: COLORS.primary,
    marginRight: 10,
  },
  purchaseButton: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryTint,
  },
  purchaseLabel: {
    color: COLORS.primaryDark,
  },
});
