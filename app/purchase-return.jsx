import React, { useMemo, useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Card, Icon, Text, TouchableRipple, Button, Divider } from "react-native-paper";
import { useRouter } from "expo-router";
import { COLORS } from "./components/common/colors";
import { UIButton, Dropdown } from "./components/common/ui";

const BASE_ITEMS = [
  {
    id: "arabica",
    name: "Organic Arabica Beans",
    sku: "COF-001",
    price: 12.0,
    stock: 10,
    qty: 2,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "filters",
    name: "Paper Filters (100ct)",
    sku: "FIL-202",
    price: 5.5,
    stock: 5,
    qty: 0,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "cleaning",
    name: "Cleaning Tablets",
    sku: "CLN-010",
    price: 9.0,
    stock: 8,
    qty: 1,
    image: "https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=200&q=80",
  },
];

const reasons = ["Damaged Items", "Incorrect Items", "Other"];

const PurchaseReturnScreen = () => {
  const router = useRouter();
  const [reason, setReason] = useState(reasons[0]);
  const [items, setItems] = useState(BASE_ITEMS);

  const totalUnits = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items]
  );
  const refundAmount = useMemo(
    () =>
      `$${items
        .reduce((sum, item) => sum + item.qty * item.price, 0)
        .toFixed(2)}`,
    [items]
  );

  const adjustQty = (id, delta) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const next = Math.max(0, Math.min(item.stock, item.qty + delta));
        return { ...item, qty: next };
      })
    );
  };

  return (
    <View style={styles.root}>
      <Appbar.Header mode="small" style={styles.appbar}>
        <Appbar.Action icon="chevron-left" onPress={() => router.back()} />
        <Appbar.Content title="Process Return" titleStyle={styles.title} />
        <Appbar.Action icon="help-circle-outline" onPress={() => {}} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.summaryCard} mode="elevated">
          <View style={styles.summaryRow}>
            <View style={styles.summaryIcon}>
              <Icon source="file-document-outline" size={26} color={COLORS.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.poTitle}>PO #12345 - Green Valley Co.</Text>
              <Text style={styles.poMeta}>Purchased on June 12, 2023 • 15 Items</Text>
            </View>
          </View>
        </Card>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>Reason for Return</Text>
          <Dropdown
            label={null}
            value={reason}
            options={reasons}
            onSelect={setReason}
            placeholder="Select reason"
            fieldStyle={styles.dropdownField}
          />
        </View>

        <View style={styles.listHeader}>
          <Text style={styles.sectionTitle}>Select Items to Return</Text>
          <TouchableRipple borderless onPress={() => {}}>
            <Text style={styles.link}>Return All</Text>
          </TouchableRipple>
        </View>

        {items.map((item) => (
          <Card key={item.id} style={styles.itemCard} mode="outlined">
            <View style={styles.itemRow}>
              <Image source={{ uri: item.image }} style={styles.itemImg} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemMeta}>Stock: {item.stock} units available</Text>
                <Text style={styles.itemMeta}>
                  SKU: {item.sku} | ${item.price.toFixed(2)}/ea
                </Text>
              </View>
              <View style={styles.qtyControls}>
                <Button
                  mode="outlined"
                  compact
                  onPress={() => adjustQty(item.id, -1)}
                  style={styles.qtyBtn}
                  textColor={COLORS.primary}
                  disabled={item.qty === 0}
                >
                  -
                </Button>
                <Text style={styles.qtyValue}>{item.qty}</Text>
                <Button
                  mode="outlined"
                  compact
                  onPress={() => adjustQty(item.id, +1)}
                  style={styles.qtyBtn}
                  textColor={COLORS.primary}
                  disabled={item.qty >= item.stock}
                >
                  +
                </Button>
              </View>
            </View>
          </Card>
        ))}

        <View style={styles.totalsCard}>
          <View style={styles.totalsRow}>
            <View>
              <Text style={styles.totalsLabel}>Items to Return</Text>
              <Text style={styles.units}>{totalUnits} Units</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.totalsLabel}>Refund Amount</Text>
              <Text style={styles.refund}>{refundAmount}</Text>
            </View>
          </View>
          <Divider style={styles.divider} />
          <UIButton
            variant="primary"
            icon="archive-remove-outline"
            onPress={() => router.back()}
            contentStyle={styles.ctaContent}
            style={styles.ctaButton}
          >
            Confirm & Reduce Inventory
          </UIButton>
          <Text style={styles.disclaimer}>ACTION CANNOT BE UNDONE • STOCK WILL BE UPDATED</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default PurchaseReturnScreen;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  appbar: { backgroundColor: COLORS.background },
  title: { color: COLORS.text, fontWeight: "800" },
  content: { paddingHorizontal: 20, paddingBottom: 120 },
  summaryCard: {
    borderRadius: 16,
    padding: 12,
    marginTop: 6,
    backgroundColor: COLORS.surface,
  },
  summaryRow: { flexDirection: "row", alignItems: "center" },
  summaryIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.primaryTint,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  poTitle: { fontWeight: "800", color: COLORS.text },
  poMeta: { color: COLORS.muted, marginTop: 2 },
  fieldBlock: { marginTop: 16 },
  label: { color: COLORS.muted, fontWeight: "700", marginBottom: 6 },
  dropdownField: {
    borderRadius: 14,
    height: 56,
  },
  listHeader: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: { fontWeight: "800", color: COLORS.text },
  link: { color: COLORS.primary, fontWeight: "700" },
  itemCard: {
    marginTop: 12,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
  },
  itemRow: { flexDirection: "row", alignItems: "center", padding: 12 },
  itemImg: { width: 62, height: 62, borderRadius: 12, marginRight: 12 },
  itemInfo: { flex: 1 },
  itemName: { fontWeight: "800", color: COLORS.text },
  itemMeta: { color: COLORS.muted, marginTop: 2 },
  qtyControls: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.neutralSoftAlt,
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  qtyBtn: {
    minWidth: 32,
    borderColor: COLORS.borderLight,
    borderRadius: 10,
  },
  qtyValue: { marginHorizontal: 8, fontWeight: "700", color: COLORS.text },
  totalsCard: {
    marginTop: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  totalsRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  totalsLabel: { color: COLORS.muted, fontWeight: "700" },
  units: { fontWeight: "800", fontSize: 18, color: COLORS.text, marginTop: 4 },
  refund: { fontWeight: "800", fontSize: 18, color: COLORS.primary, marginTop: 4 },
  divider: { marginVertical: 12 },
  ctaContent: { height: 52 },
  ctaButton: { borderRadius: 14 },
  disclaimer: {
    textAlign: "center",
    marginTop: 8,
    color: COLORS.muted,
    letterSpacing: 0.4,
    fontSize: 12,
  },
});
