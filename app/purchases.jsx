import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View, useWindowDimensions } from "react-native";
import { Appbar, Snackbar, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { COLORS } from "./components/common/colors";
import { UIButton } from "./components/common/ui";
import PurchaseSearch from "./components/purchases/PurchaseSearch";
import PurchaseFilters from "./components/purchases/PurchaseFilters";
import PurchaseCard from "./components/purchases/PurchaseCard";

const PURCHASES = [
  {
    id: "inv-2024-001",
    supplier: "Global Organics Ltd.",
    invoice: "#INV-2024-001",
    date: "Oct 24, 2024",
    status: "Received",
    amount: "$2,450.00",
    amountTone: "positive",
    image:
      "https://images.unsplash.com/photo-1503389152951-9f343605f61e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "inv-2024-012",
    supplier: "Fresh Produce Wholesalers",
    invoice: "#INV-2024-012",
    date: "Oct 22, 2024",
    status: "Draft",
    amount: "$820.50",
    amountTone: "neutral",
    image:
      "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "inv-2024-009",
    supplier: "Eco Packaging Co.",
    invoice: "#INV-2024-009",
    date: "Oct 20, 2024",
    status: "Returned",
    amount: "$1,120.00",
    amountTone: "negative",
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "inv-2024-008",
    supplier: "North Dairy Supplies",
    invoice: "#INV-2024-008",
    date: "Oct 18, 2024",
    status: "Received",
    amount: "$435.00",
    amountTone: "positive",
    image:
      "https://images.unsplash.com/photo-1475855581690-80accde3ae2b?auto=format&fit=crop&w=600&q=80",
  },
];

const PurchasesScreen = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [snackbar, setSnackbar] = useState({ visible: false, message: "" });
  const maxWidthStyle = width >= 768 ? styles.maxWidth : null;

  const showToast = (message) => setSnackbar({ visible: true, message });

  const filteredPurchases = useMemo(() => {
    let results = PURCHASES;
    if (statusFilter !== "All") {
      results = results.filter((item) => item.status === statusFilter);
    }
    if (query.trim()) {
      const needle = query.toLowerCase();
      results = results.filter((item) =>
        `${item.supplier} ${item.invoice}`.toLowerCase().includes(needle)
      );
    }
    return results;
  }, [statusFilter, query]);

  const handleAddPress = () => {
    router.push("/purchase-create");
  };

  return (
    <View style={styles.root}>
      <Appbar.Header mode="small" style={styles.appbar}>
        <Appbar.Action icon="chevron-left" onPress={() => router.back()} />
        <Appbar.Content title="Purchases" titleStyle={styles.title} />
        <Appbar.Action icon="dots-horizontal" onPress={() => showToast("More actions")} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={[styles.content, maxWidthStyle]}>
        <PurchaseSearch
          value={query}
          onChangeText={setQuery}
          onFilterPress={() => showToast("Filters")}
        />
        <PurchaseFilters
          value={statusFilter}
          onChange={setStatusFilter}
          onDatePress={() => showToast("Pick a date range")}
        />

        <Text style={styles.sectionLabel}>RECENT PURCHASES</Text>
        {filteredPurchases.map((purchase) => (
          <PurchaseCard
            key={purchase.id}
            supplier={purchase.supplier}
            invoice={purchase.invoice}
            date={purchase.date}
            status={purchase.status}
            amount={purchase.amount}
            amountTone={purchase.amountTone}
            image={purchase.image}
            onPress={() => showToast(`Viewing ${purchase.invoice}`)}
          />
        ))}

        {!filteredPurchases.length ? (
          <Text style={styles.emptyText}>No purchases found with that search.</Text>
        ) : null}
      </ScrollView>

      <View style={styles.footer}>
        <UIButton
          variant="primary"
          size="lg"
          icon="plus"
          onPress={handleAddPress}
          style={styles.addButton}
          contentStyle={styles.addButtonContent}
        >
          New Purchase
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

export default PurchasesScreen;

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
    marginTop: 18,
    marginBottom: 8,
    color: COLORS.muted,
    fontWeight: "800",
    letterSpacing: 0.7,
  },
  emptyText: {
    marginTop: 16,
    textAlign: "center",
    color: COLORS.muted,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: -4 },
    shadowRadius: 12,
  },
  addButton: {
    borderRadius: 14,
  },
  addButtonContent: {
    height: 54,
  },
});
