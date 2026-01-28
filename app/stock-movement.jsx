import React, { useMemo, useState } from "react";
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

const FILTERS = ["All", "Purchases", "Sales", "Adjustments"];

const MOVEMENTS = [
  {
    id: "arabica",
    name: "Premium Arabica Beans (1kg)",
    meta: "POS Sale • #REF-8821",
    amount: "-2 units",
    time: "2:20 PM",
    tone: "out",
    icon: "cart-outline",
  },
  {
    id: "paper-cups",
    name: "Paper Cups (S-Size)",
    meta: "Restock • #PO-5509",
    amount: "+500 units",
    time: "10:45 AM",
    tone: "in",
    icon: "truck-outline",
  },
  {
    id: "milk-carton",
    name: "Milk Carton (Full Cream)",
    meta: "Adjustment • Spoilage",
    amount: "-12 units",
    time: "OCT 23, 17:30",
    tone: "out",
    icon: "wrench-outline",
  },
  {
    id: "espresso-cleaner",
    name: "Espresso Machine Cleaner",
    meta: "POS Sale • #REF-8815",
    amount: "-1 units",
    time: "OCT 23, 16:15",
    tone: "out",
    icon: "cart-outline",
  },
];

const StockMovementScreen = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [snackbar, setSnackbar] = useState({ visible: false, message: "" });

  const showToast = (message) => setSnackbar({ visible: true, message });

  const filtered = useMemo(() => {
    let results = MOVEMENTS;
    if (activeFilter !== "All") {
      const needle = activeFilter.toLowerCase();
      results = results.filter((item) => item.meta.toLowerCase().includes(needle));
    }
    if (query.trim()) {
      const needle = query.toLowerCase();
      results = results.filter(
        (item) =>
          item.name.toLowerCase().includes(needle) ||
          item.meta.toLowerCase().includes(needle)
      );
    }
    return results;
  }, [activeFilter, query]);

  return (
    <View style={styles.root}>
      <Appbar.Header mode="small" style={styles.appbar}>
        <Appbar.Action icon="chevron-left" onPress={() => router.back()} />
        <Appbar.Content title="Stock Movement" titleStyle={styles.title} />
        <Appbar.Action icon="tune-vertical" onPress={() => showToast("Filters")} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.searchBar}>
          <Icon source="magnify" size={20} color={COLORS.muted} />
          <TextInput
            placeholder="Search Product or Ref #"
            placeholderTextColor={COLORS.mutedLight}
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
          />
        </View>

        <View style={styles.statsRow}>
          <View style={[styles.statCard, styles.statCardLeft]}>
            <Text style={styles.statLabel}>Total In (7d)</Text>
            <Text style={styles.statValue}>+1,240</Text>
            <View style={styles.statDeltaRow}>
              <Icon source="arrow-up" size={12} color={COLORS.success} />
              <Text style={[styles.statDeltaText, styles.statDeltaUp]}>12%</Text>
            </View>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total Out (7d)</Text>
            <Text style={styles.statValue}>850</Text>
            <View style={styles.statDeltaRow}>
              <Icon source="arrow-down" size={12} color={COLORS.danger} />
              <Text style={[styles.statDeltaText, styles.statDeltaDown]}>5%</Text>
            </View>
          </View>
        </View>

        <View style={styles.filterRow}>
          {FILTERS.map((filter) => {
            const active = filter === activeFilter;
            return (
              <TouchableOpacity
                key={filter}
                style={[styles.filterPill, active && styles.filterPillActive]}
                onPress={() => setActiveFilter(filter)}>
                <Text style={[styles.filterText, active && styles.filterTextActive]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Today</Text>
        <View style={styles.listCard}>
          {filtered.slice(0, 2).map((item, index) => (
            <View key={item.id} style={styles.listRow}>
              <View style={styles.listIcon}>
                <Icon source={item.icon} size={20} color={COLORS.primary} />
              </View>
              <View style={styles.listText}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text style={styles.itemMeta}>{item.meta}</Text>
              </View>
              <View style={styles.listMetaRight}>
                <Text style={styles.itemAmount}>{item.amount}</Text>
                <Text style={styles.itemTime}>{item.time}</Text>
              </View>
              {index === 0 ? <View style={styles.listDivider} /> : null}
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Yesterday</Text>
        <View style={styles.listCard}>
          {filtered.slice(2).map((item, index) => (
            <View key={item.id} style={styles.listRow}>
              <View style={styles.listIcon}>
                <Icon source={item.icon} size={20} color={COLORS.primary} />
              </View>
              <View style={styles.listText}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text style={styles.itemMeta}>{item.meta}</Text>
              </View>
              <View style={styles.listMetaRight}>
                <Text style={styles.itemAmount}>{item.amount}</Text>
                <Text style={styles.itemTime}>{item.time}</Text>
              </View>
              {index === 0 ? <View style={styles.listDivider} /> : null}
            </View>
          ))}
        </View>
      </ScrollView>

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

export default StockMovementScreen;

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
    paddingBottom: 40,
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
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: COLORS.text,
    fontSize: 14,
  },
  statsRow: {
    flexDirection: "row",
    marginTop: 14,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statCardLeft: {
    marginRight: 12,
  },
  statLabel: {
    color: COLORS.muted,
    fontSize: 12,
  },
  statValue: {
    marginTop: 8,
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
  },
  statDeltaRow: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  statDeltaText: {
    marginLeft: 4,
    fontWeight: "700",
    fontSize: 12,
  },
  statDeltaUp: {
    color: COLORS.success,
  },
  statDeltaDown: {
    color: COLORS.danger,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 14,
  },
  filterPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  filterPillActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    color: COLORS.muted,
    fontWeight: "700",
    fontSize: 12,
  },
  filterTextActive: {
    color: COLORS.white,
  },
  sectionTitle: {
    marginTop: 18,
    marginBottom: 10,
    color: COLORS.text,
    fontWeight: "700",
    letterSpacing: 0.6,
    fontSize: 13,
  },
  listCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  listIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: COLORS.primaryTint,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  listText: {
    flex: 1,
  },
  itemTitle: {
    fontWeight: "700",
    color: COLORS.text,
  },
  itemMeta: {
    color: COLORS.muted,
    marginTop: 2,
    fontSize: 12,
  },
  listMetaRight: {
    alignItems: "flex-end",
  },
  itemAmount: {
    fontWeight: "700",
    color: COLORS.primary,
    fontSize: 12,
  },
  itemTime: {
    color: COLORS.mutedAlt,
    fontSize: 11,
    marginTop: 2,
  },
  listDivider: {
    position: "absolute",
    left: 62,
    right: 14,
    bottom: 0,
    height: 1,
    backgroundColor: COLORS.border,
  },
});
