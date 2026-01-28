import React, { useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Divider, Icon, Surface, Text } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import { COLORS } from "./components/common/colors";
import UIButton from "./components/common/ui/Button";

const ITEMS = [
  {
    id: "cappuccino",
    sku: "COF-221",
    name: "Artisan Cappuccino",
    note: "Medium Roast - Oat Milk",
    qty: 2,
    unitPrice: 6.0,
  },
  {
    id: "toast",
    sku: "BRD-118",
    name: "Avocado Toast",
    note: "Sourdough - Extra Egg",
    qty: 1,
    unitPrice: 18.5,
  },
  {
    id: "pastry",
    sku: "PST-402",
    name: "Pastry Selection Box",
    note: "Gift Wrapped",
    qty: 1,
    unitPrice: 84.5,
  },
];

const formatMoney = (value) => {
  const safeValue = Number(value);
  return `$${(Number.isNaN(safeValue) ? 0 : safeValue).toFixed(2)}`;
};

const TransactionResultScreen = () => {
  const router = useRouter();
  const { total } = useLocalSearchParams();
  const parsedTotal = useMemo(() => Number(total) || 125, [total]);
  const tax = useMemo(() => 10.0, []);
  const discount = useMemo(() => 8.0, []);
  const promoDiscount = useMemo(() => 4.5, []);
  const subtotal = useMemo(
    () =>
      ITEMS.reduce((sum, item) => {
        const qty = Number(item.qty);
        const price = Number(item.unitPrice);
        const safeQty = Number.isNaN(qty) ? 0 : qty;
        const safePrice = Number.isNaN(price) ? 0 : price;
        return sum + safeQty * safePrice;
      }, 0),
    []
  );
  const serviceFee = useMemo(
    () => Math.max(parsedTotal - subtotal + discount + promoDiscount - tax, 0),
    [parsedTotal, subtotal, discount, promoDiscount, tax]
  );

  return (
    <View style={styles.root}>
      <Appbar.Header mode="small" style={styles.appbar}>
        <Appbar.Action icon="chevron-left" onPress={() => router.back()} />
        <Appbar.Content title="Transaction Result" titleStyle={styles.title} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.statusWrap}>
          <View style={styles.successBadge}>
            <View style={styles.successInner}>
              <Icon source="check" size={30} color={COLORS.primary} />
            </View>
          </View>
          <Text style={styles.statusTitle}>Payment Successful</Text>
          <Text style={styles.statusAmount}>{formatMoney(parsedTotal)}</Text>
        </View>

        <Surface elevation={1} style={styles.receiptCard}>
          <View style={styles.receiptHeader}>
            <View style={styles.receiptLogo}>
              <Icon source="leaf" size={18} color={COLORS.primary} />
            </View>
            <Text style={styles.receiptName}>Coffee House Central</Text>
            <Text style={styles.receiptMeta}>RECEIPT ID: #882910</Text>
          </View>

          <Divider style={styles.receiptDivider} />

          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, styles.tableName]}>Item</Text>
            <Text style={[styles.tableCell, styles.tableQty]}>Qty</Text>
            <Text style={[styles.tableCell, styles.tablePrice]}>Price</Text>
            <Text style={[styles.tableCell, styles.tableTotal]}>Total</Text>
          </View>

          {ITEMS.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>
                  ({item.sku || "SKU"}) {item.name || "Item"}
                </Text>
                <Text style={styles.itemNote}>{item.note || ""}</Text>
              </View>
              <Text style={[styles.tableCell, styles.tableQty]}>
                {Number.isNaN(Number(item.qty)) ? 0 : item.qty}
              </Text>
              <Text style={[styles.tableCell, styles.tablePrice]}>
                {formatMoney(item.unitPrice)}
              </Text>
              <Text style={[styles.tableCell, styles.tableTotal]}>
                {formatMoney(Number(item.unitPrice) * Number(item.qty))}
              </Text>
            </View>
          ))}

          <Divider style={styles.summaryDivider} />

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>{formatMoney(subtotal)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax</Text>
            <Text style={styles.summaryValue}>{formatMoney(tax)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Discount</Text>
            <Text style={styles.summaryValue}>-{formatMoney(discount)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Promo Discount</Text>
            <Text style={styles.summaryValue}>-{formatMoney(promoDiscount)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Service Fee (10%)</Text>
            <Text style={styles.summaryValue}>{formatMoney(serviceFee)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatMoney(parsedTotal)}</Text>
          </View>
        </Surface>
      </ScrollView>

      <View style={styles.actionsBar}>
        <UIButton
          variant="primary"
          size="lg"
          icon="plus-circle-outline"
          onPress={() => router.replace("/invoice")}
          style={styles.primaryButton}
        >
          New Sale
        </UIButton>
        <View style={styles.secondaryRow}>
          <UIButton
            variant="ghost"
            size="md"
            icon="printer-outline"
            onPress={() => {}}
            style={styles.secondaryButton}
            labelStyle={styles.secondaryGhostLabel}
          >
            Print
          </UIButton>
          <UIButton
            variant="ghost"
            size="md"
            icon="whatsapp"
            onPress={() => {}}
            style={styles.secondaryButton}
            labelStyle={styles.secondaryGhostLabel}
          >
            WhatsApp
          </UIButton>
        </View>
      </View>
    </View>
  );
};

export default TransactionResultScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  appbar: {
    backgroundColor: COLORS.background,
  },
  title: {
    color: COLORS.text,
    fontWeight: "700",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 220,
  },
  statusWrap: {
    alignItems: "center",
    paddingVertical: 12,
  },
  successBadge: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    marginBottom: 14,
  },
  successInner: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  statusTitle: {
    color: COLORS.text,
    fontWeight: "800",
    fontSize: 20,
    marginBottom: 4,
  },
  statusAmount: {
    color: COLORS.primary,
    fontWeight: "800",
    fontSize: 28,
  },
  receiptCard: {
    marginTop: 18,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    padding: 16,
  },
  receiptHeader: {
    alignItems: "center",
  },
  receiptLogo: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.primaryTint,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  receiptName: {
    color: COLORS.text,
    fontWeight: "800",
    fontSize: 16,
  },
  receiptMeta: {
    color: COLORS.muted,
    fontSize: 11,
    letterSpacing: 0.8,
    marginTop: 4,
  },
  receiptDivider: {
    marginVertical: 14,
  },
  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  tableCell: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "700",
  },
  tableName: {
    flex: 1,
  },
  tableQty: {
    width: 36,
    textAlign: "center",
  },
  tablePrice: {
    width: 72,
    textAlign: "right",
  },
  tableTotal: {
    width: 78,
    textAlign: "right",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  itemInfo: {
    flex: 1,
    paddingRight: 10,
  },
  itemName: {
    color: COLORS.text,
    fontWeight: "700",
  },
  itemNote: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 2,
  },
  summaryDivider: {
    marginTop: 6,
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    color: COLORS.muted,
    fontWeight: "600",
  },
  summaryValue: {
    color: COLORS.text,
    fontWeight: "700",
  },
  totalLabel: {
    color: COLORS.text,
    fontWeight: "800",
  },
  totalValue: {
    color: COLORS.text,
    fontWeight: "800",
  },
  actionsBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  primaryButton: {
    borderRadius: 18,
  },
  secondaryRow: {
    flexDirection: "row",
    marginTop: 12,
  },
  secondaryButton: {
    flex: 1,
    borderRadius: 14,
  },
  secondaryGhostLabel: {
    color: COLORS.primary,
    fontWeight: "700",
  },
});


