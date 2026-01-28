import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Appbar, Icon, Snackbar, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { COLORS } from "./components/common/colors";

const WarehouseDetailScreen = () => {
  const router = useRouter();
  const [snackbar, setSnackbar] = useState({ visible: false, message: "" });

  const showToast = (message) => setSnackbar({ visible: true, message });

  return (
    <View style={styles.root}>
      <Appbar.Header mode="small" style={styles.appbar}>
        <Appbar.Action icon="chevron-left" onPress={() => router.back()} />
        <Appbar.Content title="Warehouse Detail" titleStyle={styles.title} />
        <Appbar.Action icon="dots-horizontal" onPress={() => showToast("More")} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerCard}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=400&q=80",
            }}
            style={styles.headerImage}
          />
          <View style={styles.headerInfo}>
            <Text style={styles.warehouseName}>Northside Hub</Text>
            <View style={styles.addressRow}>
              <Icon source="map-marker" size={16} color={COLORS.primary} />
              <Text style={styles.addressText}>123 Industrial Way, Sector 4</Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>ACTIVE</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>SNAPSHOT</Text>
        <View style={styles.snapshotRow}>
          <View style={[styles.snapshotCard, styles.snapshotLeft]}>
            <Text style={styles.snapshotLabel}>Total Products</Text>
            <Text style={styles.snapshotValue}>1,240</Text>
            <View style={styles.trendRow}>
              <Icon source="trending-up" size={14} color={COLORS.primary} />
              <Text style={styles.trendText}>+2%</Text>
            </View>
          </View>
          <View style={styles.snapshotCard}>
            <Text style={styles.snapshotLabel}>Total Quantity</Text>
            <Text style={styles.snapshotValue}>45,800</Text>
            <View style={styles.trendRow}>
              <Icon source="trending-up" size={14} color={COLORS.primary} />
              <Text style={styles.trendText}>+5%</Text>
            </View>
          </View>
        </View>

        <View style={styles.alertCard}>
          <View>
            <Text style={styles.alertLabel}>LOW STOCK ITEMS</Text>
            <View style={styles.alertValueRow}>
              <Text style={styles.alertValue}>12</Text>
              <Text style={styles.alertUnit}>SKUs</Text>
            </View>
          </View>
          <View style={styles.alertIcon}>
            <Icon source="alert" size={22} color={COLORS.white} />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Management Menu</Text>
        <View style={styles.menuCard}>
          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => router.push("/inventory")}
            activeOpacity={0.8}
          >
            <View style={styles.menuIcon}>
              <Icon source="archive-outline" size={22} color={COLORS.primary} />
            </View>
            <View style={styles.menuText}>
              <Text style={styles.menuTitle}>View Inventory</Text>
              <Text style={styles.menuSubtitle}>Manage stock and pricing</Text>
            </View>
            <Icon source="chevron-right" size={22} color={COLORS.mutedAlt} />
          </TouchableOpacity>
          <View style={styles.menuDivider} />
          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => router.push("/stock-movement")}
            activeOpacity={0.8}
          >
            <View style={styles.menuIcon}>
              <Icon source="swap-vertical" size={22} color={COLORS.primary} />
            </View>
            <View style={styles.menuText}>
              <Text style={styles.menuTitle}>Recent Movements</Text>
              <Text style={styles.menuSubtitle}>Inbound and outbound logs</Text>
            </View>
            <Icon source="chevron-right" size={22} color={COLORS.mutedAlt} />
          </TouchableOpacity>
          <View style={styles.menuDivider} />
          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => router.push("/warehouse-transfer")}
            activeOpacity={0.8}
          >
            <View style={styles.menuIcon}>
              <Icon source="truck-outline" size={22} color={COLORS.primary} />
            </View>
            <View style={styles.menuText}>
              <Text style={styles.menuTitle}>Transfer History</Text>
              <Text style={styles.menuSubtitle}>Inter-warehouse stock logs</Text>
            </View>
            <Icon source="chevron-right" size={22} color={COLORS.mutedAlt} />
          </TouchableOpacity>
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

export default WarehouseDetailScreen;

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
  headerCard: {
    flexDirection: "row",
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 14,
    marginTop: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  headerImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  warehouseName: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  addressText: {
    marginLeft: 6,
    color: COLORS.muted,
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: COLORS.primaryTint,
    marginTop: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.primary,
    letterSpacing: 0.4,
  },
  sectionTitle: {
    marginTop: 18,
    marginBottom: 10,
    color: COLORS.text,
    fontWeight: "700",
    letterSpacing: 0.6,
    fontSize: 13,
  },
  snapshotRow: {
    flexDirection: "row",
  },
  snapshotCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  snapshotLeft: {
    marginRight: 12,
  },
  snapshotLabel: {
    fontSize: 12,
    color: COLORS.muted,
  },
  snapshotValue: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
  },
  trendRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  trendText: {
    marginLeft: 6,
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 12,
  },
  alertCard: {
    marginTop: 14,
    backgroundColor: COLORS.primaryTint,
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  alertLabel: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "700",
  },
  alertValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 4,
  },
  alertValue: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
  },
  alertUnit: {
    marginLeft: 6,
    color: COLORS.muted,
    fontSize: 12,
  },
  alertIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  menuCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.primaryTint,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontWeight: "700",
    color: COLORS.text,
  },
  menuSubtitle: {
    color: COLORS.muted,
    marginTop: 2,
    fontSize: 12,
  },
  menuDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 14,
  },
});
