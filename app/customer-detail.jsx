import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Appbar, Button, Icon, Surface, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { COLORS } from "./components/common/colors";

const CustomerDetailScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("details");

  return (
    <View style={styles.root}>
      <Appbar.Header mode="small" style={styles.appbar}>
        <Appbar.Action icon="chevron-left" onPress={() => router.back()} />
        <Appbar.Content title="Customer Profile" titleStyle={styles.title} />
        <Appbar.Action icon="dots-horizontal" onPress={() => {}} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileBlock}>
          <View style={styles.avatarShell}>
            <Text style={styles.avatarText}>RC</Text>
            <View style={styles.avatarBadge}>
              <Icon source="cog" size={14} color="white" />
            </View>
          </View>
          <Text style={styles.name}>Robert Chen</Text>
          <Text style={styles.subtitle}>Customer since Jan 2023</Text>
        </View>

        <View style={styles.metricsRow}>
          <Surface style={styles.metricCard} elevation={0}>
            <Text style={styles.metricLabel}>LIFETIME SPEND</Text>
            <Text style={styles.metricValueBlue}>$3,120.50</Text>
          </Surface>
          <Surface style={styles.metricCard} elevation={0}>
            <Text style={styles.metricLabel}>LOYALTY POINTS</Text>
            <View style={styles.metricInline}>
              <Text style={styles.metricValueOrange}>1,240</Text>
              <Text style={styles.metricUnit}> pts</Text>
            </View>
          </Surface>
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity
            style={[
              styles.tabPill,
              activeTab === "details" && styles.tabPillActive,
            ]}
            onPress={() => setActiveTab("details")}
            activeOpacity={0.85}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "details" && styles.tabTextActive,
              ]}
            >
              Details
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabPill,
              activeTab === "history" && styles.tabPillActive,
            ]}
            onPress={() => setActiveTab("history")}
            activeOpacity={0.85}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "history" && styles.tabTextActive,
              ]}
            >
              Transaction History
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === "details" ? (
          <View style={styles.details}>
            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <Icon source="phone" size={18} color={COLORS.muted} />
              </View>
              <View style={styles.detailInfo}>
                <Text style={styles.detailLabel}>PHONE</Text>
                <Text style={styles.detailValue}>(555) 222-3344</Text>
              </View>
            </View>
            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <Icon source="email-outline" size={18} color={COLORS.muted} />
              </View>
              <View style={styles.detailInfo}>
                <Text style={styles.detailLabel}>EMAIL</Text>
                <Text style={styles.detailValue}>robert.chen@email.com</Text>
              </View>
            </View>
            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <Icon source="map-marker-outline" size={18} color={COLORS.muted} />
              </View>
              <View style={styles.detailInfo}>
                <Text style={styles.detailLabel}>ADDRESS</Text>
                <Text style={styles.detailValue}>
                  123 Business Bay, Suite 405
                </Text>
                <Text style={styles.detailValue}>San Francisco, CA 94105</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.historyEmpty}>
            <Text style={styles.mutedText}>
              No recent transactions to display.
            </Text>
          </View>
        )}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>RECENT ORDERS</Text>
          <Text style={styles.sectionAction}>View All</Text>
        </View>

        <Surface style={styles.orderCard} elevation={0}>
          <View style={styles.orderRow}>
            <View>
              <Text style={styles.orderTitle}>Order #8842</Text>
              <Text style={styles.orderMeta}>Oct 24, 2023 - 2:30 PM</Text>
            </View>
            <Text style={styles.orderAmount}>$145.00</Text>
          </View>
        </Surface>
        <Surface style={styles.orderCard} elevation={0}>
          <View style={styles.orderRow}>
            <View>
              <Text style={styles.orderTitle}>Order #8719</Text>
              <Text style={styles.orderMeta}>Sep 12, 2023 - 11:15 AM</Text>
            </View>
            <Text style={styles.orderAmount}>$89.25</Text>
          </View>
        </Surface>
        <Surface style={styles.orderCard} elevation={0}>
          <View style={styles.orderRow}>
            <View>
              <Text style={styles.orderTitle}>Order #8602</Text>
              <Text style={styles.orderMeta}>Aug 28, 2023 - 4:45 PM</Text>
            </View>
            <Text style={styles.orderAmountMuted}>$210.40</Text>
          </View>
        </Surface>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          mode="outlined"
          style={styles.footerButton}
          textColor={COLORS.primary}
          icon="pencil"
          onPress={() => router.push("/customer-edit")}
        >
          Edit Profile
        </Button>
        <Button
          mode="contained"
          buttonColor={COLORS.primary}
          style={[styles.footerButton, styles.footerPrimary]}
          icon="cart-outline"
          onPress={() => {}}
        >
          New Sale
        </Button>
      </View>
    </View>
  );
};

export default CustomerDetailScreen;

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
    paddingBottom: 200,
  },
  profileBlock: {
    alignItems: "center",
    marginTop: 8,
  },
  avatarShell: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "#DFF1F1",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.primary,
  },
  avatarBadge: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.surface,
  },
  name: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
  },
  subtitle: {
    marginTop: 4,
    color: COLORS.muted,
  },
  metricsRow: {
    flexDirection: "row",
    marginTop: 16,
  },
  metricCard: {
    flex: 1,
    marginRight: 12,
    padding: 12,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  metricLabel: {
    fontSize: 11,
    color: COLORS.muted,
    letterSpacing: 0.6,
  },
  metricValueBlue: {
    marginTop: 6,
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "800",
  },
  metricValueOrange: {
    color: "#F57C00",
    fontSize: 18,
    fontWeight: "800",
  },
  metricUnit: {
    color: COLORS.muted,
    marginTop: 6,
  },
  metricInline: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 6,
  },
  tabs: {
    flexDirection: "row",
    marginTop: 18,
    padding: 4,
    borderRadius: 16,
    backgroundColor: "#EEF1F5",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tabPill: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: "center",
  },
  tabPillActive: {
    backgroundColor: COLORS.surface,
    shadowColor: "rgba(0,0,0,0.08)",
    shadowOpacity: 1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  tabText: {
    fontWeight: "600",
    color: COLORS.muted,
  },
  tabTextActive: {
    color: COLORS.primary,
  },
  details: {
    marginTop: 16,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  detailIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#EFF2F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  detailInfo: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 11,
    color: "#9AA3AD",
    letterSpacing: 0.6,
  },
  detailValue: {
    marginTop: 4,
    color: COLORS.text,
    fontWeight: "600",
  },
  historyEmpty: {
    marginTop: 16,
    alignItems: "center",
  },
  mutedText: {
    color: COLORS.muted,
  },
  sectionHeader: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.6,
    color: COLORS.text,
  },
  sectionAction: {
    color: COLORS.primary,
    fontWeight: "700",
  },
  orderCard: {
    marginTop: 12,
    padding: 14,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  orderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderTitle: {
    fontWeight: "700",
    color: COLORS.text,
  },
  orderMeta: {
    marginTop: 4,
    color: COLORS.muted,
    fontSize: 12,
  },
  orderAmount: {
    fontWeight: "700",
    color: COLORS.text,
  },
  orderAmountMuted: {
    fontWeight: "700",
    color: COLORS.muted,
  },
  footer: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 24,
    flexDirection: "row",
  },
  footerButton: {
    flex: 1,
    borderRadius: 16,
    marginRight: 12,
  },
  footerPrimary: {
    marginRight: 0,
  },
});
