import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { FAB, Snackbar } from "react-native-paper";
import { useRouter } from "expo-router";
import BottomBar from "./components/common/BottomBar";
import { COLORS } from "./components/common/colors";
import InventoryHeader from "./components/inventory/InventoryHeader";
import InventorySearch from "./components/inventory/InventorySearch";
import InventoryFilters from "./components/inventory/InventoryFilters";
import InventoryStats from "./components/inventory/InventoryStats";
import InventoryItem from "./components/inventory/InventoryItem";

const items = [
  {
    id: "coffee-ethiopian",
    name: "Ethiopian Yirgacheffe",
    sku: "COF-001",
    price: "$18.50",
    stockLabel: "Low Stock",
    stockColor: { background: "#FFF1DA", text: "#C66A10" },
    units: 4,
  },
  {
    id: "mug-matte",
    name: "Matte Black Mug",
    sku: "MUG-029",
    price: "$12.00",
    stockLabel: "In Stock",
    stockColor: { background: "#E6F6EE", text: "#1B8F5D" },
    units: 45,
  },
  {
    id: "tea-organic",
    name: "Organic Green Tea",
    sku: "TEA-104",
    price: "$9.00",
    stockLabel: "In Stock",
    stockColor: { background: "#E6F6EE", text: "#1B8F5D" },
    units: 20,
  },
  {
    id: "lemons",
    name: "Organic Lemons",
    sku: "FRU-003",
    price: "$1.20",
    stockLabel: "Out of Stock",
    stockColor: { background: "#FDE8E8", text: "#D34545" },
    units: 0,
  },
  {
    id: "oat-latte",
    name: "Oat Milk Latte",
    sku: "BEV-201",
    price: "$5.50",
    stockLabel: "In Stock",
    stockColor: { background: "#E6F6EE", text: "#1B8F5D" },
    units: 120,
  },
];

const InventoryScreen = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All Items");
  const [snackbar, setSnackbar] = useState({ visible: false, message: "" });
  const maxWidthStyle = width >= 768 ? styles.maxWidth : null;

  const showToast = (message) => {
    setSnackbar({ visible: true, message });
  };

  const filteredItems = useMemo(() => {
    let results = items;
    if (filter === "Low Stock") {
      results = results.filter((item) => item.units > 0 && item.units < 10);
    }
    if (filter === "Price") {
      results = [...results].sort((a, b) =>
        a.price.replace("$", "") > b.price.replace("$", "") ? -1 : 1
      );
    }
    if (query.trim()) {
      const needle = query.toLowerCase();
      results = results.filter(
        (item) =>
          item.name.toLowerCase().includes(needle) ||
          item.sku.toLowerCase().includes(needle)
      );
    }
    return results;
  }, [query, filter]);

  const handleTabPress = (tab) => {
    if (tab === "Home") {
      router.replace("/");
      return;
    }
    if (tab === "Inventory") {
      return;
    }
    if (tab === "History") {
      router.replace("/history");
      return;
    }
    showToast(tab);
  };

  return (
    <View style={styles.root}>
      <InventoryHeader onFilterPress={() => showToast("Filter")} />

      <ScrollView contentContainerStyle={[styles.content, maxWidthStyle]}>
        <InventorySearch
          value={query}
          onChangeText={setQuery}
          onScanPress={() => showToast("Scan")}
        />
        <InventoryFilters active={filter} onChange={setFilter} />
        <InventoryStats totalValue="$12,450" lowStockCount="3 Items" />

        {filteredItems.map((item) => (
          <InventoryItem
            key={item.id}
            name={item.name}
            sku={item.sku}
            price={item.price}
            stockLabel={item.stockLabel}
            stockColor={item.stockColor}
            units={item.units}
            onPress={() => showToast(item.name)}
          />
        ))}
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => showToast("Add Item")}
        color="#FFFFFF"
      />

      <BottomBar active="Inventory" onTabPress={handleTabPress} />

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

export default InventoryScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 180,
  },
  maxWidth: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 720,
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 104,
    backgroundColor: COLORS.primary,
    zIndex: 5,
    elevation: 6,
  },
});
