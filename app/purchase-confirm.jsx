import React from "react";
import { ScrollView, StyleSheet, View, Image } from "react-native";
import { Appbar, Card, Icon, Text, TouchableRipple } from "react-native-paper";
import { UIButton } from "./components/common/ui";
import { useRouter } from "expo-router";
import { COLORS } from "./components/common/colors";

const items = [
  {
    id: "arabica",
    name: "Organic Arabica...",
    sku: "COF-ARA-001",
    units: "+10 units",
    unitPrice: "$12.50/ea",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=160&q=60",
  },
  {
    id: "portafilter",
    name: "Stainless Portafilter",
    sku: "ACC-POR-58M",
    units: "+5 units",
    unitPrice: "$45.00/ea",
    image:
      "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&w=160&q=60",
  },
  {
    id: "filters",
    name: "V60 Paper Filters...",
    sku: "PAP-V60-WHT",
    units: "+20 units",
    unitPrice: "$6.20/ea",
    image:
      "https://images.unsplash.com/photo-1524749292158-7540c2494485?auto=format&fit=crop&w=160&q=60",
  },
];

const PurchaseConfirmScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <Appbar.Header mode="small" style={styles.appbar}>
        <Appbar.Action icon="chevron-left" onPress={() => router.back()} />
        <Appbar.Content title="Confirm Receipt" titleStyle={styles.title} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.progressDots}>
          <View style={styles.dotInactive} />
          <View style={styles.dotActive} />
          <View style={styles.dotInactive} />
        </View>

        <Card mode="elevated" style={styles.supplierCard}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardTitle}>SUPPLIER DETAILS</Text>
              <Text style={styles.supplierName}>Global Wholesale Co.</Text>
              <Text style={styles.invoice}>Invoice #INV-2023-1024</Text>
            </View>
          </View>
        </Card>

        <View style={styles.notice}>
          <View style={styles.noticeIconWrap}>
            <Icon source="archive-arrow-down-outline" size={22} color={COLORS.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.noticeTitle}>Inventory Impact</Text>
            <Text style={styles.noticeCopy}>
              Stock will be added to inventory. This action is permanent.
            </Text>
          </View>
        </View>

        <View style={styles.summaryHeader}>
          <Text style={styles.summaryTitle}>Summary of Items</Text>
          <View style={styles.chip}>
            <Text style={styles.chipText}>3 SKU's</Text>
          </View>
        </View>

        {items.map((item) => (
          <Card key={item.id} style={styles.itemCard}>
            <View style={styles.itemRow}>
              <Image source={{ uri: item.image }} style={styles.itemImg} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemSku}>SKU: {item.sku}</Text>
                <Text style={styles.itemPrice}>{item.unitPrice}</Text>
              </View>
              <Text style={styles.itemUnits}>{item.units}</Text>
            </View>
          </Card>
        ))}

        <Card style={styles.totalCard}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Items</Text>
            <Text style={styles.totalValue}>35 Units</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Value</Text>
            <Text style={styles.totalValue}>$474.00</Text>
          </View>
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <UIButton
          variant="primary"
          icon="check-circle-outline"
          onPress={() => router.push("/purchase-detail")}
          style={styles.footerBtn}
          contentStyle={styles.footerBtnContent}
        >
          Confirm & Receive Stock
        </UIButton>
        <UIButton
          variant="ghostPrimary"
          onPress={() => router.back()}
          style={[styles.footerBtn, styles.footerBtnSecondary]}
          contentStyle={styles.footerBtnContent}
        >
          Back to Edit
        </UIButton>
      </View>
    </View>
  );
};

export default PurchaseConfirmScreen;

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
  progressDots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 16,
    gap: 8,
  },
  dotInactive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.borderLight,
  },
  dotActive: {
    width: 26,
    height: 10,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },
  supplierCard: {
    borderRadius: 16,
    padding: 14,
    backgroundColor: COLORS.surface,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTitle: {
    color: COLORS.muted,
    fontWeight: "800",
    letterSpacing: 0.6,
  },
  supplierName: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.text,
  },
  invoice: {
    marginTop: 4,
    color: COLORS.muted,
  },
  notice: {
    marginTop: 14,
    flexDirection: "row",
    padding: 14,
    backgroundColor: COLORS.primaryTint,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: "flex-start",
    gap: 12,
  },
  noticeIconWrap: {
    backgroundColor: COLORS.white,
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  noticeTitle: {
    fontWeight: "800",
    color: COLORS.primary,
  },
  noticeCopy: {
    color: COLORS.text,
    marginTop: 2,
  },
  summaryHeader: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  summaryTitle: {
    fontWeight: "800",
    color: COLORS.text,
  },
  chip: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  chipText: {
    color: COLORS.muted,
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
  itemImg: {
    width: 54,
    height: 54,
    borderRadius: 12,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontWeight: "800",
    color: COLORS.text,
  },
  itemSku: {
    color: COLORS.muted,
    marginTop: 2,
  },
  itemPrice: {
    color: COLORS.muted,
    marginTop: 2,
  },
  itemUnits: {
    color: COLORS.primary,
    fontWeight: "800",
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
  totalValue: {
    color: COLORS.text,
    fontWeight: "700",
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    gap: 10,
  },
  footerBtn: {
    borderRadius: 14,
  },
  footerBtnSecondary: {
    marginTop: 2,
  },
  footerBtnContent: {
    height: 52,
  },
});
