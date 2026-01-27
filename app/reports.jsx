import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Divider, IconButton, Surface, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { COLORS } from "./components/common/colors";
import Badge from "./components/common/ui/Badge";
import BottomBar from "./components/common/BottomBar";

const ranges = ["Today", "Last 7 Days", "Last 30 Days"];

const categories = [
  { name: "Beverages", percent: 45, color: COLORS.primary },
  { name: "Pastries", percent: 32, color: COLORS.brandPrimary },
  { name: "Merchandise", percent: 23, color: COLORS.warning },
];

const products = [
  {
    name: "Latte Large",
    subtitle: "Hot Coffee",
    sold: "120",
    revenue: "$600.00",
    icon: "coffee",
    tint: COLORS.blueTint,
    color: COLORS.primary,
  },
  {
    name: "Croissant",
    subtitle: "Bakery",
    sold: "85",
    revenue: "$340.00",
    icon: "food-croissant",
    tint: COLORS.purpleTint,
    color: COLORS.purple,
  },
  {
    name: "Espresso",
    subtitle: "Hot Coffee",
    sold: "60",
    revenue: "$180.00",
    icon: "glass-cocktail",
    tint: COLORS.orangeTint,
    color: COLORS.warningDeep,
  },
];

const stats = [
  {
    label: "Avg. Order",
    value: "$45.20",
    icon: "camera-outline",
    tint: COLORS.blueTint,
    color: COLORS.primary,
  },
  {
    label: "Items Sold",
    value: "342",
    icon: "shopping-outline",
    tint: COLORS.orangeTint,
    color: COLORS.warningDeep,
  },
];

const sparkHeights = [90, 130, 110, 150, 70, 140, 160];

const ReportsScreen = () => {
  const router = useRouter();
  const [range, setRange] = useState("Today");

  const peakIndex = useMemo(() => sparkHeights.indexOf(Math.max(...sparkHeights)), []);

  const handleTabPress = (tab) => {
    if (tab === "Home") {
      router.push("/");
      return;
    }
    if (tab === "Inventory") {
      router.push("/inventory");
      return;
    }
    if (tab === "History") {
      router.push("/history");
      return;
    }
    if (tab === "Settings") {
      router.push("/settings");
      return;
    }
  };

  return (
    <View style={styles.root}>
      <Appbar.Header mode="small" style={styles.appbar}>
        <Appbar.Action icon="chevron-left" onPress={() => router.back()} />
        <Appbar.Content title="Sales Analytics" titleStyle={styles.appbarTitle} />
        <Appbar.Action icon="share-variant" onPress={() => {}} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.rangeRow}>
          {ranges.map((item) => (
            <Badge
              key={item}
              label={item}
              selected={range === item}
              onPress={() => setRange(item)}
              style={styles.rangeChip}
              textStyle={range === item ? styles.rangeTextActive : styles.rangeText}
            />
          ))}
        </View>

        <Surface elevation={1} style={styles.salesCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.muted}>Total Sales</Text>
            <View style={styles.trendPill}>
              <IconButton
                icon="trending-up"
                size={16}
                iconColor={COLORS.success}
                style={styles.trendIcon}
              />
              <Text style={styles.trendText}>+12%</Text>
            </View>
          </View>
          <Text variant="displaySmall" style={styles.salesValue}>
            $12,450.00
          </Text>

          <View style={styles.sparkline}>
            <View style={styles.sparklineBg} />
            {sparkHeights.map((height, index) => {
              const left = (index / (sparkHeights.length - 1)) * 100;
              return (
                <View
                  key={index}
                  style={[
                    styles.sparkBar,
                    {
                      left: `${left}%`,
                      height,
                    },
                  ]}
                />
              );
            })}
            <View
              style={[
                styles.sparkDot,
                {
                  left: `${(peakIndex / (sparkHeights.length - 1)) * 100}%`,
                  bottom: sparkHeights[peakIndex] - 6,
                },
              ]}
            />
            <View
              style={[
                styles.sparkLabel,
                {
                  left: `${(peakIndex / (sparkHeights.length - 1)) * 100}%`,
                  bottom: sparkHeights[peakIndex] + 6,
                },
              ]}
            >
              <Text style={styles.sparkLabelText}>$2,100</Text>
            </View>
          </View>

          <View style={styles.daysRow}>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <Text key={day} style={styles.dayText}>
                {day}
              </Text>
            ))}
          </View>
        </Surface>

        <View style={styles.statRow}>
          {stats.map((stat, index) => (
            <Surface
              key={stat.label}
              elevation={1}
              style={[styles.statCard, index === 0 && styles.statCardSpacing]}
            >
              <View style={[styles.iconCircle, { backgroundColor: stat.tint }]}>
                <IconButton
                  icon={stat.icon}
                  size={20}
                  iconColor={stat.color}
                  style={styles.iconButton}
                />
              </View>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text variant="headlineMedium" style={styles.statValue}>
                {stat.value}
              </Text>
            </Surface>
          ))}
        </View>

        <Surface elevation={1} style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Top Categories
            </Text>
            <Text style={styles.linkText}>View Report</Text>
          </View>

          {categories.map((cat) => (
            <View key={cat.name} style={styles.categoryRow}>
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryName}>{cat.name}</Text>
                <Text style={styles.categoryPercent}>{cat.percent}%</Text>
              </View>
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${cat.percent}%`, backgroundColor: cat.color },
                  ]}
                />
              </View>
            </View>
          ))}
        </Surface>

        <Surface elevation={1} style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Top Products
            </Text>
          </View>

          {products.map((product, index) => (
            <View key={product.name}>
              <View style={styles.productRow}>
                <View style={[styles.productIcon, { backgroundColor: product.tint }]}>
                  <IconButton
                    icon={product.icon}
                    size={20}
                    iconColor={product.color}
                    style={styles.iconButton}
                  />
                </View>
                <View style={styles.productMeta}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productSubtitle}>{product.subtitle}</Text>
                </View>
                <Text style={styles.productSold}>{product.sold}</Text>
                <Text style={styles.productRevenue}>{product.revenue}</Text>
              </View>
              {index < products.length - 1 && <Divider style={styles.divider} />}
            </View>
          ))}
        </Surface>
      </ScrollView>

      <BottomBar active="Home" onTabPress={handleTabPress} />
    </View>
  );
};

export default ReportsScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  appbar: {
    backgroundColor: COLORS.background,
  },
  appbarTitle: {
    color: COLORS.text,
    fontWeight: "700",
  },
  content: {
    padding: 20,
    paddingBottom: 160,
  },
  iconButton: {
    margin: 0,
  },
  rangeRow: {
    flexDirection: "row",
    marginTop: 16,
    marginBottom: 12,
  },
  rangeChip: {
    marginRight: 10,
  },
  rangeText: {
    color: COLORS.text,
    fontWeight: "600",
  },
  rangeTextActive: {
    color: COLORS.white,
  },
  salesCard: {
    padding: 18,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  muted: {
    color: COLORS.muted,
    fontWeight: "600",
  },
  trendPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.successBg,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  trendIcon: {
    margin: 0,
    marginRight: -4,
  },
  trendText: {
    color: COLORS.success,
    fontWeight: "700",
  },
  salesValue: {
    color: COLORS.text,
    marginTop: 6,
  },
  sparkline: {
    marginTop: 12,
    height: 180,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: COLORS.primaryTint,
    position: "relative",
  },
  sparklineBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.primaryTint,
  },
  sparkBar: {
    position: "absolute",
    bottom: 0,
    width: 2,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  sparkDot: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },
  sparkLabel: {
    position: "absolute",
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  sparkLabelText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 12,
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  dayText: {
    color: COLORS.muted,
    fontWeight: "600",
  },
  statRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
  },
  statCardSpacing: {
    marginRight: 12,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  statLabel: {
    marginTop: 8,
    color: COLORS.muted,
    fontWeight: "700",
  },
  statValue: {
    color: COLORS.text,
  },
  sectionCard: {
    padding: 16,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    marginBottom: 14,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sectionTitle: {
    color: COLORS.text,
    fontWeight: "800",
  },
  linkText: {
    color: COLORS.primary,
    fontWeight: "700",
  },
  categoryRow: {
    marginTop: 8,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryName: {
    color: COLORS.text,
    fontWeight: "700",
  },
  categoryPercent: {
    color: COLORS.muted,
    fontWeight: "700",
  },
  progressTrack: {
    height: 8,
    borderRadius: 6,
    backgroundColor: COLORS.borderLight,
    marginTop: 6,
  },
  progressFill: {
    height: 8,
    borderRadius: 6,
  },
  productRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  productIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  productMeta: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    color: COLORS.text,
    fontWeight: "700",
  },
  productSubtitle: {
    color: COLORS.muted,
    fontWeight: "600",
  },
  productSold: {
    width: 48,
    textAlign: "right",
    color: COLORS.text,
    fontWeight: "700",
  },
  productRevenue: {
    width: 86,
    textAlign: "right",
    color: COLORS.text,
    fontWeight: "700",
  },
  divider: {
    marginTop: 6,
    marginBottom: 6,
  },
});
