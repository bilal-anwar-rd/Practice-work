import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { Appbar, FAB, Icon, Snackbar, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import SupplierListItem from "./components/suppliers/SupplierListItem";
import BottomBar from "./components/common/BottomBar";
import { COLORS } from "./components/common/colors";

const SUPPLIERS = [
  {
    id: "global-produce",
    name: "Global Produce Co.",
    phone: "+1 (555) 0123",
    outstanding: "$450.00",
    tone: "primary",
    image:
      "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "apex-wholesalers",
    name: "Apex Wholesalers",
    phone: "+1 (555) 9876",
    outstanding: "$0.00",
    tone: "primary",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "sunshine-dairy",
    name: "Sunshine Dairy",
    phone: "+1 (555) 4321",
    outstanding: "$1,280.50",
    tone: "primary",
    image:
      "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "north-star-logistics",
    name: "North Star Logistics",
    phone: "+1 (555) 0909",
    outstanding: "$12.00",
    tone: "primary",
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=400&q=80",
  },
];

const SuppliersScreen = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [query, setQuery] = useState("");
  const [snackbar, setSnackbar] = useState({ visible: false, message: "" });
  const maxWidthStyle = width >= 768 ? styles.maxWidth : null;

  const showToast = (message) =>
    setSnackbar({
      visible: true,
      message,
    });

  const filteredSuppliers = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return SUPPLIERS;
    return SUPPLIERS.filter((supplier) =>
      `${supplier.name} ${supplier.phone}`.toLowerCase().includes(needle)
    );
  }, [query]);

  const handleTabPress = (tab) => {
    if (tab === "Home") {
      router.replace("/");
      return;
    }
    if (tab === "Inventory") {
      router.replace("/inventory");
      return;
    }
    if (tab === "History") {
      router.replace("/history");
      return;
    }
    if (tab === "Settings") {
      router.replace("/settings");
      return;
    }
    showToast(tab);
  };

  return (
    <View style={styles.root}>
      <Appbar.Header mode="small" style={styles.appbar}>
        <Appbar.Action icon="chevron-left" onPress={() => router.back()} />
        <Appbar.Content title="Suppliers" titleStyle={styles.title} />
        <Appbar.Action icon="dots-horizontal" onPress={() => showToast("More")} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={[styles.content, maxWidthStyle]}>
        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
            <Icon source="magnify" size={20} color={COLORS.muted} />
            <TextInput
              placeholder="Search suppliers..."
              placeholderTextColor={COLORS.mutedLight}
              value={query}
              onChangeText={setQuery}
              style={styles.searchInput}
            />
          </View>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => showToast("Filter suppliers")}
          >
            <Icon source="tune-variant" size={22} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.sectionLabelRow}>
          <Text style={styles.sectionLabel}>ACTIVE SUPPLIERS</Text>
          <Text style={styles.sectionCount}>{filteredSuppliers.length}</Text>
        </View>

        {filteredSuppliers.map((supplier) => (
          <SupplierListItem
            key={supplier.id}
            name={supplier.name}
            phone={supplier.phone}
            outstanding={supplier.outstanding}
            outstandingTone={supplier.tone}
            image={supplier.image}
            onPress={() => router.push("/supplier-edit")}
            onCall={() => showToast(`Calling ${supplier.name}`)}
            onPurchases={() => showToast("Viewing purchases")}
          />
        ))}

        {!filteredSuppliers.length ? (
          <Text style={styles.emptyText}>No suppliers match your search.</Text>
        ) : null}
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push("/supplier-add")}
        color={COLORS.white}
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

export default SuppliersScreen;

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
    paddingBottom: 190,
  },
  maxWidth: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 720,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: COLORS.text,
    fontSize: 14,
  },
  filterButton: {
    marginLeft: 10,
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 6,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.8,
    color: COLORS.muted,
  },
  sectionCount: {
    marginLeft: 8,
    color: COLORS.mutedLight,
    fontWeight: "700",
  },
  emptyText: {
    marginTop: 14,
    textAlign: "center",
    color: COLORS.muted,
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
