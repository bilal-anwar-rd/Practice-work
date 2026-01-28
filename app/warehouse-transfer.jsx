import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Appbar, Icon, Snackbar, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { COLORS } from "./components/common/colors";
import { Dropdown, UIButton } from "./components/common/ui";

const WAREHOUSE_OPTIONS = [
  "Main Distribution Center",
  "Downtown Store A",
  "Westside Annex",
];

const INITIAL_ITEMS = [
  {
    id: "eco-mug",
    name: "Eco-Friendly Coffee Mug",
    sku: "ECO-MUG-001",
    onHand: 124,
    qty: 12,
    tone: "normal",
  },
  {
    id: "arabica-beans",
    name: "Premium Arabica Beans (1kg)",
    sku: "COF-ARA-100",
    onHand: 8,
    qty: 5,
    tone: "warning",
  },
  {
    id: "tea-infuser",
    name: "Organic Tea Infuser",
    sku: "TEA-INF-X01",
    onHand: 42,
    qty: 1,
    tone: "normal",
  },
];

const WarehouseTransferScreen = () => {
  const router = useRouter();
  const [sourceWarehouse, setSourceWarehouse] = useState(
    "Main Distribution Center"
  );
  const [destinationWarehouse, setDestinationWarehouse] = useState("");
  const [query, setQuery] = useState("");
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [snackbar, setSnackbar] = useState({ visible: false, message: "" });

  const showToast = (message) => setSnackbar({ visible: true, message });

  const handleIncrement = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: Math.min(item.qty + 1, item.onHand) }
          : item
      )
    );
  };

  const handleDecrement = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(item.qty - 1, 0) } : item
      )
    );
  };

  const handleRemove = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const visibleItems = items.filter((item) => {
    if (!query.trim()) return true;
    const needle = query.toLowerCase();
    return (
      item.name.toLowerCase().includes(needle) ||
      item.sku.toLowerCase().includes(needle)
    );
  });

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <View style={styles.root}>
      <Appbar.Header mode="small" style={styles.appbar}>
        <Appbar.Action icon="chevron-left" onPress={() => router.back()} />
        <Appbar.Content title="Internal Stock Transfer" titleStyle={styles.title} />
        <Appbar.Action icon="history" onPress={() => showToast("History")} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Warehouse Details</Text>

        <Text style={styles.fieldLabel}>Source Warehouse</Text>
        <Dropdown
          label=""
          value={sourceWarehouse}
          options={WAREHOUSE_OPTIONS}
          onSelect={setSourceWarehouse}
          containerStyle={styles.dropdown}
        />

        <View style={styles.swapWrap}>
          <View style={styles.swapCircle}>
            <Icon source="arrow-down" size={20} color={COLORS.white} />
          </View>
        </View>

        <Text style={styles.fieldLabel}>Destination Warehouse</Text>
        <Dropdown
          label=""
          value={destinationWarehouse}
          options={WAREHOUSE_OPTIONS}
          onSelect={setDestinationWarehouse}
          containerStyle={styles.dropdown}
          placeholder="Select destination"
        />

        <View style={styles.itemsHeader}>
          <Text style={styles.sectionTitle}>Items to Transfer</Text>
          <TouchableOpacity
            style={styles.addProduct}
            onPress={() => showToast("Add Product")}
          >
            <Icon source="plus" size={16} color={COLORS.primary} />
            <Text style={styles.addProductText}>Add Product</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <Icon source="magnify" size={20} color={COLORS.muted} />
          <TextInput
            placeholder="Search by name or SKU..."
            placeholderTextColor={COLORS.mutedLight}
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
          />
        </View>

        {visibleItems.map((item) => {
          const isWarning = item.tone === "warning";
          const showWarn = isWarning && item.qty / item.onHand > 0.5;
          return (
            <View
              key={item.id}
              style={[styles.itemCard, isWarning && styles.itemCardWarning]}
            >
              <View style={styles.itemHeader}>
                <View>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemSku}>SKU: {item.sku}</Text>
                </View>
                <TouchableOpacity onPress={() => handleRemove(item.id)}>
                  <Icon
                    source="trash-can-outline"
                    size={20}
                    color={COLORS.muted}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.itemRow}>
                <View
                  style={[styles.stockBadge, isWarning && styles.stockBadgeWarning]}
                >
                  <Text
                    style={[styles.stockLabel, isWarning && styles.stockLabelWarning]}
                  >
                    {isWarning ? "LOW STOCK" : "ON HAND"}
                  </Text>
                  <Text
                    style={[styles.stockValue, isWarning && styles.stockValueWarning]}
                  >
                    {item.onHand} units
                  </Text>
                </View>
                <View style={styles.qtyControls}>
                  <TouchableOpacity
                    style={styles.qtyButton}
                    onPress={() => handleDecrement(item.id)}
                  >
                    <Icon source="minus" size={18} color={COLORS.text} />
                  </TouchableOpacity>
                  <View
                    style={[styles.qtyValue, isWarning && styles.qtyValueWarning]}
                  >
                    <Text style={styles.qtyText}>{item.qty}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.qtyButton}
                    onPress={() => handleIncrement(item.id)}
                  >
                    <Icon source="plus" size={18} color={COLORS.text} />
                  </TouchableOpacity>
                </View>
              </View>
              {showWarn ? (
                <View style={styles.warnRow}>
                  <Icon
                    source="alert-circle-outline"
                    size={16}
                    color={COLORS.warningDeep}
                  />
                  <Text style={styles.warnText}>
                    Transferring over 50% of available source stock.
                  </Text>
                </View>
              ) : null}
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryIcon}>
            <Icon source="check-circle" size={20} color={COLORS.primary} />
          </View>
          <Text style={styles.summaryText}>
            You are transferring{" "}
            <Text style={styles.summaryBold}>{totalItems} items</Text>{" "}
            from <Text style={styles.summaryBold}>Main Distribution Center</Text>{" "}
            to <Text style={styles.summaryBold}>Downtown Store A</Text>.
          </Text>
        </View>
        <UIButton
          style={styles.confirmButton}
          icon="swap-horizontal"
          onPress={() => showToast("Confirm Transfer")}
        >
          Confirm Transfer
        </UIButton>
      </View>

      <Snackbar
        visible={snackbar.visible}
        onDismiss={() => setSnackbar({ visible: false, message: "" })}
        duration={1200}
      >
        {snackbar.message}
      </Snackbar>
    </View>
  );
};

export default WarehouseTransferScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.backgroundAlt,
  },
  appbar: {
    backgroundColor: COLORS.backgroundAlt,
  },
  title: {
    color: COLORS.text,
    fontWeight: "700",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 240,
  },
  sectionTitle: {
    marginTop: 18,
    marginBottom: 10,
    color: COLORS.text,
    fontWeight: "700",
    fontSize: 18,
  },
  fieldLabel: {
    color: COLORS.muted,
    fontWeight: "600",
    marginBottom: 8,
  },
  dropdown: {
    marginTop: 0,
  },
  swapWrap: {
    alignItems: "center",
    marginVertical: 10,
  },
  swapCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  itemsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
  },
  addProduct: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: COLORS.primaryTint,
  },
  addProductText: {
    marginLeft: 6,
    color: COLORS.primary,
    fontWeight: "700",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: COLORS.text,
    fontSize: 14,
  },
  itemCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    marginTop: 16,
  },
  itemCardWarning: {
    borderColor: COLORS.warningTintAlt,
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemName: {
    fontWeight: "700",
    color: COLORS.text,
    fontSize: 16,
  },
  itemSku: {
    color: COLORS.mutedAlt,
    marginTop: 4,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
  },
  stockBadge: {
    backgroundColor: COLORS.neutralSoftAlt,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    minWidth: 140,
  },
  stockBadgeWarning: {
    backgroundColor: COLORS.warningSoft,
  },
  stockLabel: {
    fontSize: 11,
    color: COLORS.muted,
    fontWeight: "700",
    letterSpacing: 0.6,
  },
  stockLabelWarning: {
    color: COLORS.warningDeep,
  },
  stockValue: {
    marginTop: 6,
    fontWeight: "700",
    fontSize: 18,
    color: COLORS.primary,
  },
  stockValueWarning: {
    color: COLORS.warningDeep,
  },
  qtyControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.neutralSoftAlt,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyValue: {
    width: 60,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
    backgroundColor: COLORS.surface,
  },
  qtyValueWarning: {
    borderColor: COLORS.warningDeep,
  },
  qtyText: {
    fontWeight: "700",
    fontSize: 16,
    color: COLORS.text,
  },
  warnRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  warnText: {
    marginLeft: 6,
    color: COLORS.warningDeep,
    fontSize: 12,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.backgroundAlt,
  },
  summaryCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: COLORS.primaryTint,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.primarySoft,
    marginBottom: 12,
  },
  summaryIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  summaryText: {
    flex: 1,
    color: COLORS.text,
    lineHeight: 20,
  },
  summaryBold: {
    fontWeight: "700",
    color: COLORS.text,
  },
  confirmButton: {
    borderRadius: 16,
  },
});
