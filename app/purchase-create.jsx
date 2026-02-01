import React from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { Appbar, Icon, Text, TouchableRipple } from "react-native-paper";
import { useRouter } from "expo-router";
import { COLORS } from "./components/common/colors";
import { UIButton, Dropdown } from "./components/common/ui";

const ITEMS = [
  {
    id: "bean-espresso",
    name: "Organic Espresso Beans",
    sku: "BEAN-ORG-500",
    qty: "10",
    cost: "12.50",
    tax: "6.25",
    subtotal: "131.25",
  },
  {
    id: "filter-paper",
    name: "Commercial Filter Paper (100pk)",
    sku: "ACC-FLT-COM",
    qty: "5",
    cost: "8.00",
    tax: "2.00",
    subtotal: "42.00",
  },
];

const PurchaseCreateScreen = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const maxWidthStyle = width >= 768 ? styles.maxWidth : null;

  return (
    <View style={styles.root}>
      <Appbar.Header mode="small" style={styles.appbar}>
        <Appbar.Action icon="chevron-left" onPress={() => router.back()} />
        <Appbar.Content title="Create New Purchase" titleStyle={styles.title} />
        <Appbar.Action icon="backup-restore" onPress={() => {}} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={[styles.content, maxWidthStyle]}>
        <Dropdown
          label="Supplier"
          value=""
          options={["Global Wholesale Co.", "Green Valley Co.", "Eco Packaging"]}
          onSelect={() => {}}
          placeholder="Select supplier"
          fieldStyle={styles.selector}
        />

        <View style={styles.row}>
          <View style={[styles.col, styles.colLeft]}>
            <Text style={styles.sectionLabel}>Date</Text>
            <View style={styles.inputWrap}>
              <TextInput
                value="10/27/2023"
                style={styles.input}
                placeholderTextColor={COLORS.mutedLight}
              />
              <Icon source="calendar-blank" size={20} color={COLORS.muted} />
            </View>
          </View>
          <View style={styles.col}>
            <Text style={styles.sectionLabel}>Invoice #</Text>
            <View style={styles.inputWrap}>
              <TextInput
                value="INV-00123"
                style={styles.input}
                placeholder="INV-00123"
                placeholderTextColor={COLORS.mutedLight}
              />
            </View>
          </View>
        </View>

        <View style={styles.searchBar}>
          <Icon source="magnify" size={20} color={COLORS.muted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search name, SKU, or scan"
            placeholderTextColor={COLORS.mutedLight}
          />
          <Icon source="barcode-scan" size={20} color={COLORS.successDark} />
        </View>

        <Text style={[styles.sectionLabel, styles.itemsLabel]}>Items</Text>
        {ITEMS.map((item) => (
          <View key={item.id} style={styles.itemCard}>
            <View style={styles.itemHeader}>
              <View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemSku}>SKU: {item.sku}</Text>
              </View>
              <Icon
                source="trash-can-outline"
                size={22}
                color={COLORS.danger}
              />
            </View>

            <View style={styles.fieldRow}>
              <View style={styles.miniField}>
                <Text style={styles.miniLabel}>QTY</Text>
                <TextInput value={item.qty} style={styles.miniInput} />
              </View>
              <View style={styles.miniField}>
                <Text style={styles.miniLabel}>COST</Text>
                <TextInput value={item.cost} style={styles.miniInput} />
              </View>
              <View style={[styles.miniField, styles.miniFieldLast]}>
                <Text style={styles.miniLabel}>TAX (5%)</Text>
                <TextInput value={item.tax} style={styles.miniInput} />
              </View>
            </View>

            <View style={styles.subtotalRow}>
              <Text style={styles.subtotalLabel}>Subtotal</Text>
              <Text style={styles.subtotalValue}>${item.subtotal}</Text>
            </View>
          </View>
        ))}

        <View style={styles.totalsCard}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValueMuted}>$165.00</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Tax</Text>
            <Text style={styles.totalValueMuted}>$8.25</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalAmountLabel}>Total Amount</Text>
            <Text style={styles.totalAmountValue}>$173.25</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <UIButton
          variant="outline"
          onPress={() => {}}
          style={styles.footerBtn}
          contentStyle={styles.footerBtnContent}
        >
          Save as Draft
        </UIButton>
        <UIButton
          variant="primary"
          icon="checkbox-marked-circle-outline"
          onPress={() => router.push("/purchase-confirm")}
          style={[styles.footerBtn, styles.primaryBtn]}
          contentStyle={styles.footerBtnContent}
        >
          Receive Purchase
        </UIButton>
      </View>
    </View>
  );
};

export default PurchaseCreateScreen;

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
    fontWeight: "800",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 140,
  },
  maxWidth: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 760,
  },
  sectionLabel: {
    marginTop: 10,
    marginBottom: 6,
    color: COLORS.muted,
    fontWeight: "700",
  },
  selector: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    height: 56,
  },
  row: {
    flexDirection: "row",
    marginTop: 8,
  },
  col: {
    flex: 1,
  },
  colLeft: {
    marginRight: 12,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    paddingHorizontal: 14,
    height: 54,
  },
  input: {
    flex: 1,
    color: COLORS.text,
    fontSize: 15,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    color: COLORS.text,
  },
  itemsLabel: {
    marginTop: 18,
  },
  itemCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.text,
  },
  itemSku: {
    color: COLORS.muted,
    marginTop: 2,
  },
  fieldRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginTop: 8,
  },
  miniField: {
    flex: 1,
  },
  miniLabel: {
    color: COLORS.muted,
    fontWeight: "700",
    marginBottom: 4,
  },
  miniInput: {
    height: 44,
    backgroundColor: COLORS.neutralSoftAlt,
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    color: COLORS.text,
  },
  miniFieldLast: {
    marginRight: 0,
  },
  subtotalRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subtotalLabel: {
    color: COLORS.muted,
    fontWeight: "700",
  },
  subtotalValue: {
    fontWeight: "800",
    color: COLORS.primary,
    fontSize: 16,
  },
  totalsCard: {
    marginTop: 8,
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  totalLabel: {
    color: COLORS.muted,
  },
  totalValueMuted: {
    color: COLORS.text,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 8,
  },
  totalAmountLabel: {
    fontWeight: "800",
    color: COLORS.text,
  },
  totalAmountValue: {
    fontWeight: "800",
    color: COLORS.primary,
    fontSize: 18,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: "row",
    gap: 12,
  },
  footerBtn: {
    flex: 1,
    borderRadius: 14,
  },
  footerBtnContent: {
    height: 52,
  },
  primaryBtn: {
    backgroundColor: COLORS.primary,
  },
});
