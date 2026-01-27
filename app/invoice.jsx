import React, { useMemo, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Appbar, Divider, Surface, Text, TextInput } from "react-native-paper";
import { useRouter } from "expo-router";
import { COLORS } from "./components/common/colors";
import InputField from "./components/common/ui/InputField";
import UIButton from "./components/common/ui/Button";

const initialItems = [
  {
    id: "coffee",
    name: "Premium Coffee Beans",
    price: 18.0,
    sku: "SKU: 10293",
    image:
      "https://images.unsplash.com/photo-1459257868276-5e65389e2722?w=400&auto=format&fit=crop",
  },
  {
    id: "mug",
    name: "Eco-friendly Mug",
    price: 12.5,
    sku: "SKU: 55432",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&auto=format&fit=crop",
  },
];

const InvoiceScreen = () => {
  const router = useRouter();
  const [items, setItems] = useState(
    initialItems.map((item) => ({ ...item, qty: item.id === "coffee" ? 2 : 1 }))
  );
  const [discountPct, setDiscountPct] = useState(10);
  const [taxPct, setTaxPct] = useState(10);
  const [promoCode, setPromoCode] = useState("");

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items]
  );
  const discountAmount = useMemo(() => {
    const pct = Number(discountPct) || 0;
    return (subtotal * pct) / 100;
  }, [subtotal, discountPct]);
  const tax = useMemo(() => {
    const pct = Number(taxPct) || 0;
    return (subtotal * pct) / 100;
  }, [subtotal, taxPct]);
  const total = useMemo(() => subtotal - discountAmount + tax, [subtotal, discountAmount, tax]);
  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items]
  );

  const updateQty = (id, delta) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(0, item.qty + delta) }
          : item
      )
    );
  };

  return (
    <View style={styles.root}>
      <Appbar.Header mode="small" style={styles.appbar}>
        <Appbar.Action icon="chevron-left" onPress={() => router.back()} />
        <Appbar.Content title="Create Invoice" titleStyle={styles.appbarTitle} />
        <Appbar.Action icon="barcode-scan" onPress={() => {}} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <InputField
          placeholder="Search product or scan barcode"
          leftIcon="magnify"
          rightIcon="qrcode-scan"
          style={styles.search}
        />

        <View style={styles.sectionHeader}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Cart Items
          </Text>
          <Surface style={styles.countPill}>
            <Text style={styles.countText}>{totalItems} Items</Text>
          </Surface>
        </View>

        {items.map((item) => (
          <Surface key={item.id} elevation={1} style={styles.itemCard}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemMeta}>
              <Text variant="titleMedium" style={styles.itemName} numberOfLines={2}>
                {item.name}
              </Text>
              {item.sku && <Text style={styles.itemSku}>{item.sku}</Text>}
              <Text style={styles.itemPrice}>${item.price.toFixed(2)} each</Text>
            </View>
            <View style={styles.qtyControl}>
              <TouchableOpacity
                style={styles.qtyButton}
                onPress={() => updateQty(item.id, -1)}
              >
                <Text style={styles.qtyButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qtyValue}>{item.qty}</Text>
              <TouchableOpacity
                style={[styles.qtyButton, styles.qtyButtonPrimary]}
                onPress={() => updateQty(item.id, 1)}
              >
                <Text style={[styles.qtyButtonText, styles.qtyButtonTextPrimary]}>+</Text>
              </TouchableOpacity>
            </View>
          </Surface>
        ))}

        <Surface elevation={1} style={styles.adjustCard}>
          <Text style={styles.adjustLabel}>Adjustments</Text>
          <View style={styles.adjustRow}>
            <Surface style={[styles.adjustCell, styles.adjustCellLeft]} elevation={0}>
              <View style={styles.adjustCellHeader}>
                <View style={styles.adjustTitleRow}>
                  <Text style={styles.adjustTitle}>Discount</Text>
                </View>
              </View>
              <InputField
                placeholder="Discount %"
                value={String(discountPct)}
                onChangeText={setDiscountPct}
                keyboardType="numeric"
                style={styles.adjustInput}
                leftIcon="tag-multiple-outline"
              />
            </Surface>

            <Surface style={[styles.adjustCell, styles.adjustCellRight]} elevation={0}>
              <View style={styles.adjustCellHeader}>
                <View style={styles.adjustTitleRow}>
                  <Text style={styles.adjustTitle}>Tax</Text>
                </View>
              </View>
              <InputField
                placeholder="Tax %"
                value={String(taxPct)}
                onChangeText={setTaxPct}
                keyboardType="numeric"
                style={styles.adjustInput}
                leftIcon="percent"
              />
            </Surface>
          </View>
        </Surface>

        <Surface elevation={1} style={styles.promoSection}>
          <Text style={styles.promoLabel}>Promotions</Text>
          <View style={styles.promoRow}>
            <InputField
              placeholder="Enter Promo Code"
              leftIcon="ticket-percent"
              value={promoCode}
              onChangeText={setPromoCode}
              style={styles.promoInput}
            />
            <UIButton
              variant="primary"
              size="md"
              style={styles.promoButton}
              onPress={() => {}}
            >
              Apply
            </UIButton>
          </View>
        </Surface>

        <Surface elevation={1} style={styles.customerCard}>
          <Text style={styles.customerLabel}>Customer</Text>
          <InputField
            placeholder="Search or select customer"
            leftIcon="account-search"
            rightIcon="chevron-down"
            style={styles.customerInput}
          />
          <TouchableOpacity style={styles.addCustomerButton}>
            <Text style={styles.addCustomerText}>+ Add New Customer</Text>
          </TouchableOpacity>
        </Surface>

        <Surface elevation={1} style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, styles.discountLabel]}>
              Discount ({discountPct}%)
            </Text>
            <Text style={[styles.summaryValue, styles.discountValue]}>
              -${discountAmount.toFixed(2)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax</Text>
            <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
          </View>
          <Divider style={styles.summaryDivider} />
          <View style={styles.summaryRow}>
            <Text variant="titleMedium" style={styles.totalLabel}>
              Total Amount
            </Text>
            <Text variant="headlineSmall" style={styles.totalValue}>
              ${total.toFixed(2)}
            </Text>
          </View>
          <Surface style={styles.pointsPill}>
            <Text style={styles.pointsText}>POINTS: +60</Text>
          </Surface>
        </Surface>

      </ScrollView>

      <View style={styles.actionsBar}>
        <UIButton
          variant="primary"
          size="lg"
          icon="arrow-right"
          onPress={() =>
            router.push({
              pathname: "/checkout",
              params: {
                subtotal: subtotal.toFixed(2),
                discount: discountAmount.toFixed(2),
                tax: tax.toFixed(2),
                total: total.toFixed(2),
              },
            })
          }
          style={styles.primaryButton}
          labelStyle={styles.primaryButtonLabel}
        >
          Proceed to Payment
        </UIButton>
        <UIButton
          variant="ghostPrimary"
          size="md"
          icon="archive-outline"
          onPress={() => {}}
          style={styles.secondaryButton}
          labelStyle={styles.secondaryLabel}
        >
          Save Draft
        </UIButton>
      </View>
    </View>
  );
};

export default InvoiceScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  appbar: {
    backgroundColor: COLORS.background,
  },
  appbarTitle: {
    color: COLORS.text,
    fontWeight: "700",
  },
  content: {
    padding: 20,
    paddingBottom: 140,
  },
  search: {
    marginTop: 4,
    marginBottom: 16,
  },
  sectionTitle: {
    color: COLORS.muted,
    letterSpacing: 1,
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  countPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: COLORS.neutralSoft,
  },
  countText: {
    color: COLORS.muted,
    fontWeight: "700",
    fontSize: 12,
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    marginBottom: 10,
  },
  itemImage: {
    width: 62,
    height: 62,
    borderRadius: 14,
    marginRight: 12,
  },
  itemMeta: {
    flex: 1,
  },
  itemName: {
    color: COLORS.text,
    fontWeight: "700",
  },
  itemSku: {
    color: COLORS.muted,
    marginTop: 2,
    fontSize: 12,
  },
  itemPrice: {
    color: COLORS.muted,
    marginTop: 2,
  },
  qtyControl: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.neutralSoft,
  },
  qtyButtonPrimary: {
    backgroundColor: COLORS.primary,
  },
  qtyButtonText: {
    color: COLORS.text,
    fontWeight: "800",
    fontSize: 18,
  },
  qtyButtonTextPrimary: {
    color: COLORS.white,
  },
  qtyValue: {
    width: 28,
    textAlign: "center",
    fontWeight: "700",
    color: COLORS.text,
  },
  adjustCard: {
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    padding: 14,
    marginTop: 4,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  adjustLabel: {
    color: COLORS.muted,
    letterSpacing: 1,
    fontWeight: "700",
    marginBottom: 10,
  },
  adjustRow: {
    flexDirection: "row",
  },
  adjustCell: {
    flex: 1,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
    padding: 8,
  },
  adjustCellLeft: {
    marginRight: 10,
  },
  adjustCellRight: {
    marginRight: 0,
  },
  adjustCellHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  adjustTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  adjustIcon: {
    marginRight: 6,
    fontSize: 14,
    color: COLORS.primary,
  },
  adjustTitle: {
    color: COLORS.text,
    fontWeight: "800",
  },
  adjustBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    backgroundColor: COLORS.primaryTint,
  },
  adjustBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.primary,
  },
  adjustInput: {
    backgroundColor: COLORS.surface,
    height: 56,
  },
  affix: {
    color: COLORS.muted,
    fontWeight: "700",
  },
  customerCard: {
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    padding: 14,
    marginBottom: 12,
  },
  promoSection: {
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    padding: 14,
    marginBottom: 12,
  },
  promoLabel: {
    color: COLORS.muted,
    letterSpacing: 1,
    marginBottom: 8,
    fontWeight: "700",
  },
  promoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  promoInput: {
    flex: 1,
    marginRight: 10,
  },
  promoButton: {
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  customerLabel: {
    color: COLORS.muted,
    letterSpacing: 1,
    marginBottom: 8,
  },
  customerInput: {
    marginBottom: 10,
  },
  addCustomerButton: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
  },
  addCustomerText: {
    color: COLORS.primary,
    fontWeight: "700",
  },
  summaryCard: {
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    padding: 16,
    marginBottom: 18,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  discountLabel: {
    color: COLORS.warningDeep,
  },
  discountValue: {
    color: COLORS.warningDeep,
  },
  summaryDivider: {
    marginVertical: 10,
  },
  totalLabel: {
    color: COLORS.text,
    fontWeight: "800",
  },
  totalValue: {
    color: COLORS.primary,
    fontWeight: "800",
  },
  pointsPill: {
    marginTop: 8,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: COLORS.warningTint,
  },
  pointsText: {
    color: COLORS.warningDeep,
    fontWeight: "800",
    fontSize: 12,
  },
  actionsBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  primaryButton: {
    borderRadius: 18,
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    marginBottom: 10,
  },
  primaryButtonLabel: {
    fontSize: 16,
  },
  secondaryButton: {
    borderRadius: 14,
  },
  secondaryLabel: {
    fontWeight: "700",
  },
});
