import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import {
  Appbar,
  Avatar,
  Button,
  Card,
  Chip,
  Surface,
  Text,
} from "react-native-paper";
import { useRouter } from "expo-router";
import { COLORS } from "./components/common/colors";
import SectionHeader from "./components/common/SectionHeader";

const product = {
  name: "Vintage Leather Satchel",
  image:
    "https://images.unsplash.com/photo-1612810432635-6815c0a1dd35?w=800",
  status: "In Stock",
  units: "45 Units",
  category: "Accessories",
  sku: "VLS-2023",
  costPrice: "$65.00",
  sellingPrice: "$120.00",
  margin: "46%",
};

const recentActivity = [
  {
    id: "restock-1",
    title: "Restock Received",
    time: "Oct 24, 10:00 AM",
    amount: "+50",
    icon: "inbox-arrow-down",
    iconTint: COLORS.greenTint,
    iconColor: COLORS.success,
  },
  {
    id: "sale-1",
    title: "Sold via POS",
    time: "Oct 23, 06:10 PM",
    amount: "-3",
    icon: "cart-outline",
    iconTint: COLORS.orangeTint,
    iconColor: "#C66A10",
  },
];

const TagPill = ({ icon, label, background, textColor }) => (
  <Chip
    icon={icon}
    mode="flat"
    style={[styles.tag, { backgroundColor: background || COLORS.surface }]}
    textStyle={[styles.tagText, { color: textColor || COLORS.primary }]}
  >
    {label}
  </Chip>
);

const StatCell = ({ label, value, accent }) => (
  <View style={styles.statCell}>
    <Text variant="labelMedium" style={styles.statLabel}>
      {label}
    </Text>
    <Text variant="titleMedium" style={[styles.statValue, accent && { color: accent }]}>
      {value}
    </Text>
  </View>
);

const ActivityItem = ({ title, time, amount, icon, iconTint, iconColor }) => (
  <Card mode="elevated" style={styles.activityCard}>
    <Card.Content style={styles.activityRow}>
      <Surface style={[styles.activityIcon, { backgroundColor: iconTint }]}>
        <Avatar.Icon
          size={32}
          icon={icon}
          color={iconColor}
          style={styles.activityIconInner}
        />
      </Surface>
      <View style={styles.activityInfo}>
        <Text variant="titleSmall" style={styles.activityTitle}>
          {title}
        </Text>
        <Text variant="bodySmall" style={styles.activityTime}>
          {time}
        </Text>
      </View>
      <Surface style={styles.activityAmount}>
        <Text style={styles.activityAmountText}>{amount}</Text>
      </Surface>
    </Card.Content>
  </Card>
);

const ProductScreen = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const maxWidthStyle = width >= 768 ? styles.maxWidth : null;

  return (
    <View style={styles.root}>
      <Appbar.Header mode="small" style={styles.appbar}>
        <Appbar.Action icon="chevron-left" onPress={() => router.back()} />
        <Appbar.Content title="Product Details" titleStyle={styles.appbarTitle} />
        <Appbar.Action icon="share-variant" onPress={() => {}} />
        <Appbar.Action icon="dots-vertical" onPress={() => {}} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={[styles.content, maxWidthStyle]}>
        <Image source={{ uri: product.image }} style={styles.hero} />

        <View style={styles.titleRow}>
          <Text variant="titleLarge" style={styles.title}>
            {product.name}
          </Text>
          <Avatar.Icon
            size={36}
            icon="heart-outline"
            color={COLORS.primary}
            style={styles.heart}
          />
        </View>

        <View style={styles.tagsRow}>
          <TagPill
            icon="check-circle"
            label={product.status.toUpperCase()}
            background={COLORS.greenTint}
            textColor={COLORS.success}
          />
          <TagPill icon="cube-outline" label={product.units} background="#E8F1F8" textColor="#0E6F8E" />
          <TagPill icon="tag-outline" label={product.category} background="#EEF1F5" textColor={COLORS.muted} />
        </View>

        <Card mode="elevated" style={styles.statsCard}>
          <View style={styles.statsGrid}>
            <StatCell label="SKU" value={product.sku} />
            <StatCell label="COST PRICE" value={product.costPrice} />
            <StatCell label="SELLING PRICE" value={product.sellingPrice} />
            <StatCell label="MARGIN" value={product.margin} accent={COLORS.success} />
          </View>
        </Card>

        <SectionHeader title="Recent Activity" actionLabel="View All" onActionPress={() => {}} />
        {recentActivity.map((item) => (
          <ActivityItem
            key={item.id}
            title={item.title}
            time={item.time}
            amount={item.amount}
            icon={item.icon}
            iconTint={item.iconTint}
            iconColor={item.iconColor}
          />
        ))}
      </ScrollView>

      <Surface elevation={6} style={styles.bottomBar}>
        <Button
          mode="outlined"
          icon="pencil"
          style={styles.bottomButton}
          labelStyle={styles.bottomButtonLabel}
          textColor={COLORS.text}
          onPress={() => router.push("/product-edit")}
        >
          Edit Product
        </Button>
        <Button
          mode="contained"
          icon="plus-circle"
          style={[styles.bottomButton, styles.bottomPrimary]}
          labelStyle={styles.bottomButtonLabel}
          buttonColor={COLORS.primary}
          onPress={() => router.push("/adjust-stock")}
        >
          Adjust Stock
        </Button>
      </Surface>
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
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
  appbar: {
    backgroundColor: COLORS.background,
  },
  appbarTitle: {
    color: COLORS.text,
    fontWeight: "700",
  },
  hero: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    marginTop: 10,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },
  title: {
    flex: 1,
    color: COLORS.text,
  },
  heart: {
    backgroundColor: COLORS.surface,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
  },
  tag: {
    marginRight: 8,
    marginBottom: 8,
    height: 32,
    borderRadius: 16,
  },
  tagText: {
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  statsCard: {
    marginTop: 14,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  statCell: {
    width: "50%",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderColor: COLORS.border,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  statLabel: {
    color: COLORS.muted,
    letterSpacing: 0.5,
  },
  statValue: {
    marginTop: 6,
    color: COLORS.text,
    fontWeight: "700",
  },
  activityCard: {
    marginTop: 12,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  activityIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  activityIconInner: {
    backgroundColor: "transparent",
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    color: COLORS.text,
  },
  activityTime: {
    color: COLORS.muted,
    marginTop: 2,
  },
  activityAmount: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: COLORS.greenTint,
  },
  activityAmountText: {
    color: COLORS.success,
    fontWeight: "700",
  },
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.surface,
  },
  bottomButton: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 12,
  },
  bottomPrimary: {
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  bottomButtonLabel: {
    fontWeight: "700",
  },
});
