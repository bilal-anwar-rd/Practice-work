import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { COLORS } from "../common/colors";

const STATUS_STYLE = { bg: COLORS.primaryTint, text: COLORS.primary };

const AMOUNT_TONES = {
  positive: COLORS.primary,
  negative: COLORS.primary,
  neutral: COLORS.primary,
};

const PurchaseCard = ({
  supplier,
  invoice,
  date,
  status,
  amount,
  amountTone = "positive",
  onPress = () => {},
}) => {
  const statusTone = STATUS_STYLE;
  const amountColor = AMOUNT_TONES[amountTone] || AMOUNT_TONES.neutral;

  return (
    <TouchableRipple onPress={onPress} borderless style={styles.touch}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={[styles.statusPill, { backgroundColor: statusTone.bg }]}>
            <Text style={[styles.statusText, { color: statusTone.text }]}>
              {status}
            </Text>
          </View>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.info}>
            <Text style={styles.supplier}>{supplier}</Text>
            <Text style={styles.meta}>
              {invoice} • {date}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.cardFooter}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={[styles.amount, { color: amountColor }]}>{amount}</Text>
        </View>
      </View>
    </TouchableRipple>
  );
};

export default PurchaseCard;

const styles = StyleSheet.create({
  touch: {
    borderRadius: 18,
    marginBottom: 16,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 14,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 14,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  cardBody: {
    flexDirection: "row",
    alignItems: "center",
  },
  info: {
    flex: 1,
    paddingRight: 12,
  },
  supplier: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.text,
  },
  meta: {
    marginTop: 4,
    color: COLORS.muted,
    fontSize: 13,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 12,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalLabel: {
    color: COLORS.muted,
    fontWeight: "700",
  },
  amount: {
    fontSize: 20,
    fontWeight: "800",
  },
});
