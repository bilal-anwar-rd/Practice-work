import React, { useMemo, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { Appbar, Button, FAB, Icon, Snackbar, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import BottomBar from "./components/common/BottomBar";
import { COLORS } from "./components/common/colors";

const WAREHOUSES = [
  {
    id: "main-store",
    name: "Main Store",
    address: "123 Industrial Way, North Wing",
    skus: "1,240",
    quantity: "45,000",
    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "downtown-godown",
    name: "Downtown Godown",
    address: "456 Central Ave, Suite B",
    skus: "850",
    quantity: "12,200",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "westside-annex",
    name: "Westside Annex",
    address: "789 Logistics Blvd",
    skus: "320",
    quantity: "5,400",
    image:
      "https://images.unsplash.com/photo-1524666041070-9d87656c25bb?auto=format&fit=crop&w=1200&q=80",
  },
];

const WarehousesScreen = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [query, setQuery] = useState("");
  const [snackbar, setSnackbar] = useState({ visible: false, message: "" });
  const maxWidthStyle = width >= 768 ? styles.maxWidth : null;

  const showToast = (message) => setSnackbar({ visible: true, message });

  const filteredWarehouses = useMemo(() => {
    if (!query.trim()) return WAREHOUSES;
    const needle = query.toLowerCase();
    return WAREHOUSES.filter(
      (warehouse) =>
        warehouse.name.toLowerCase().includes(needle) ||
        warehouse.address.toLowerCase().includes(needle)
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
        <Appbar.Content title="Warehouses" titleStyle={styles.title} />
        <Appbar.Action icon="dots-horizontal" onPress={() => showToast("More")} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={[styles.content, maxWidthStyle]}>
        <View style={styles.searchBar}>
          <Icon source="magnify" size={20} color={COLORS.muted} />
          <TextInput
            placeholder="Search warehouses or locations"
            placeholderTextColor={COLORS.mutedLight}
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
          />
        </View>

        {filteredWarehouses.map((warehouse) => (
          <View key={warehouse.id} style={styles.card}>
            <Image source={{ uri: warehouse.image }} style={styles.image} />
            <View style={styles.cardBody}>
              <TouchableOpacity
                style={styles.cardHeader}
                onPress={() => router.push("/warehouse-detail")}
                activeOpacity={0.8}
              >
                <Text style={styles.cardTitle}>{warehouse.name}</Text>
                <Icon source="chevron-right" size={22} color={COLORS.mutedAlt} />
              </TouchableOpacity>
              <View style={styles.addressRow}>
                <Icon source="map-marker" size={16} color={COLORS.primary} />
                <Text style={styles.addressText}>{warehouse.address}</Text>
              </View>
              <View style={styles.statsRow}>
                <View style={styles.statCol}>
                  <Text style={styles.statLabel}>TOTAL SKUS</Text>
                  <Text style={styles.statValue}>{warehouse.skus}</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statCol}>
                  <Text style={styles.statLabel}>TOTAL QUANTITY</Text>
                  <Text style={styles.statValue}>{warehouse.quantity}</Text>
                </View>
              </View>
              <Button
                mode="contained"
                onPress={() => router.push("/inventory")}
                contentStyle={styles.buttonContent}
                style={styles.button}
                labelStyle={styles.buttonLabel}
              >
                View Inventory
              </Button>
            </View>
          </View>
        ))}
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push("/warehouse-add")}
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

export default WarehousesScreen;

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
    paddingBottom: 180,
  },
  maxWidth: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 720,
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
    marginTop: 6,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: COLORS.text,
    fontSize: 14,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    marginBottom: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  image: {
    width: "100%",
    height: 160,
  },
  cardBody: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  addressText: {
    marginLeft: 6,
    color: COLORS.muted,
  },
  statsRow: {
    flexDirection: "row",
    marginTop: 14,
    marginBottom: 14,
    alignItems: "center",
  },
  statCol: {
    flex: 1,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.mutedAlt,
    letterSpacing: 0.6,
    fontWeight: "700",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.border,
    marginHorizontal: 12,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
  },
  buttonContent: {
    paddingVertical: 6,
  },
  buttonLabel: {
    fontWeight: "700",
    color: COLORS.white,
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
