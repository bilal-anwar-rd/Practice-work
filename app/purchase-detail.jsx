import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Avatar, Button, Card, Text, TouchableRipple } from "react-native-paper";
import { Share } from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "./components/common/colors";

const ITEMS = [
  {
    id: "coffee",
    name: "Organic Coffee Beans",
    sku: "OCB-001",
    qty: "10 bags",
    price: "$450.00",
    unit: "$45.00 / unit",
    icon: "archive-outline",
  },
  {
    id: "cups",
    name: "Paper Cups (12oz)",
    sku: "PCU-12B",
    qty: "5 cartons",
    price: "$125.00",
    unit: "$25.00 / unit",
    icon: "cube-outline",
  },
  {
    id: "almond",
    name: "Almond Milk (Bulk)",
    sku: "ALM-BLK",
    qty: "20 cases",
    price: "$600.00",
    unit: "$30.00 / unit",
    icon: "water-outline",
  },
];

const PurchaseDetailScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <Appbar.Header mode="small" style={styles.appbar}>
        <Appbar.Action icon="chevron-left" onPress={() => router.back()} />
        <Appbar.Content title="Purchase Detail" titleStyle={styles.title} />
        <Appbar.Action
          icon="share-variant"
          onPress={async () => {
            try {
              await Share.share({
                title: "Purchase Detail",
                message: "Purchase detail: Invoice #INV-2023-0842",
              });
            } catch (e) {
              // swallow share errors
            }
          }}
        />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.headerCard}>
          <View style={styles.headerRow}>
            <Avatar.Image
              size={64}
              source={{
                uri: "https://images.unsplash.com/photo-1503389152951-9f343605f61e?auto=format&fit=crop&w=200&q=80",
              }}
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.supplierName}>Global Supplies Inc.</Text>
              <Text style={styles.invoice}>Invoice #INV-2023-0842</Text>
              <View style={styles.statusPill}>
                <Text style={styles.statusDot}>●</Text>
                <Text style={styles.statusText}>Received</Text>
              </View>
            </View>
          </View>
        </Card>

        <Card style={styles.infoCard}>
          <InfoRow label="Transaction Date" value="Oct 24, 2023 • 14:30" />
          <InfoRow label="Payment Method" value="Bank Transfer" />
          <InfoRow label="Warehouse Location" value="Main North Hub" />
          <InfoRow label="Received By" value="Alex Johnson" rightAdornment={<Avatar.Text size={28} label="AJ" style={styles.initials} />} />
        </Card>

        <View style={styles.itemsHeader}>
          <Text style={styles.itemsTitle}>Items (3)</Text>
          <TouchableRipple borderless onPress={() => {}}>
            <Text style={styles.editLink}>Edit List</Text>
          </TouchableRipple>
        </View>

        {ITEMS.map((item) => (
          <Card key={item.id} style={styles.itemCard}>
            <View style={styles.itemRow}>
              <Avatar.Icon size={40} icon={item.icon} style={styles.itemIcon} color={COLORS.muted} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemSku}>
                  SKU: {item.sku} • Qty: {item.qty}
                </Text>
              </View>
              <View style={styles.itemAmounts}>
                <Text style={styles.itemPrice}>{item.price}</Text>
                <Text style={styles.itemUnit}>{item.unit}</Text>
              </View>
            </View>
          </Card>
        ))}

        <Card style={styles.totalCard}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValueMuted}>$1,175.00</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tax (8.5%)</Text>
            <Text style={styles.totalValueMuted}>$99.88</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <Text style={styles.grandLabel}>Grand Total</Text>
            <Text style={styles.grandValue}>$1,274.88</Text>
          </View>
        </Card>

        <View style={styles.timeline}>
          <Text style={styles.timelineLabel}>TRANSACTION TIMELINE</Text>
          <View style={styles.timelineRow}>
            <View style={[styles.timelineDot, styles.timelineDotActive]} />
            <View style={styles.timelineBody}>
              <Text style={styles.timelineTitle}>Inventory Received</Text>
              <Text style={styles.timelineMeta}>Oct 24, 2:30 PM by Alex Johnson</Text>
            </View>
          </View>
          <View style={styles.timelineRow}>
            <View style={styles.timelineDot} />
            <View style={styles.timelineBody}>
              <Text style={styles.timelineTitle}>Purchase Order Created</Text>
              <Text style={styles.timelineMeta}>Oct 22, 11:15 AM by System</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          mode="outlined"
          icon="keyboard-return"
          textColor={COLORS.primary}
          style={[styles.footerBtn, styles.outlinePrimary]}
          contentStyle={styles.footerBtnContent}
          onPress={() => router.push("/purchase-return")}
        >
          Return Items
        </Button>
        <Button
          mode="contained"
          icon="printer"
          buttonColor={COLORS.primary}
          textColor={COLORS.white}
          style={styles.footerBtn}
          contentStyle={styles.footerBtnContent}
          onPress={() => {}}
        >
          Print Label
        </Button>
      </View>
    </View>
  );
};

const InfoRow = ({ label, value, rightAdornment }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <View style={styles.infoValueWrap}>
      {rightAdornment ? rightAdornment : null}
      <Text style={[styles.infoValue, rightAdornment && { marginLeft: 8 }]}>{value}</Text>
    </View>
  </View>
);

export default PurchaseDetailScreen;

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
  headerCard: {
    borderRadius: 16,
    padding: 14,
    backgroundColor: COLORS.surface,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  supplierName: {
    fontWeight: "800",
    fontSize: 18,
    color: COLORS.text,
  },
  invoice: {
    color: COLORS.muted,
    marginTop: 4,
  },
  statusPill: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: COLORS.primaryTint,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  statusDot: {
    color: COLORS.primary,
    marginRight: 6,
  },
  statusText: {
    color: COLORS.primary,
    fontWeight: "700",
  },
  infoCard: {
    marginTop: 12,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  infoLabel: {
    color: COLORS.muted,
  },
  infoValueWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoValue: {
    color: COLORS.text,
    fontWeight: "700",
  },
  initials: {
    backgroundColor: COLORS.successTint,
  },
  itemsHeader: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemsTitle: {
    fontWeight: "800",
    color: COLORS.text,
  },
  editLink: {
    color: COLORS.successDark,
    fontWeight: "700",
  },
  itemCard: {
    marginTop: 10,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  itemIcon: {
    backgroundColor: COLORS.neutralSoftAlt,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontWeight: "800",
    color: COLORS.text,
  },
  itemSku: {
    color: COLORS.muted,
    marginTop: 2,
  },
  itemAmounts: {
    alignItems: "flex-end",
  },
  itemPrice: {
    color: COLORS.text,
    fontWeight: "800",
  },
  itemUnit: {
    color: COLORS.muted,
    marginTop: 2,
  },
  totalCard: {
    marginTop: 14,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    padding: 12,
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
  grandLabel: {
    fontWeight: "800",
    color: COLORS.text,
  },
  grandValue: {
    fontWeight: "800",
    color: COLORS.primary,
    fontSize: 18,
  },
  timeline: {
    marginTop: 18,
  },
  timelineLabel: {
    color: COLORS.muted,
    fontWeight: "800",
    letterSpacing: 0.4,
    marginBottom: 8,
  },
  timelineRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.borderLight,
    marginTop: 4,
    marginRight: 10,
  },
  timelineDotActive: {
    backgroundColor: COLORS.successDark,
  },
  timelineBody: {
    flex: 1,
  },
  timelineTitle: {
    color: COLORS.text,
    fontWeight: "700",
  },
  timelineMeta: {
    color: COLORS.muted,
    marginTop: 2,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    gap: 10,
    padding: 16,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  footerBtn: {
    flex: 1,
    borderRadius: 14,
  },
  outlinePrimary: {
    borderColor: COLORS.primary,
  },
  footerBtnContent: {
    height: 52,
  },
});
