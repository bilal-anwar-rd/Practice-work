import React, { useState } from "react";
import {
  Image,
  Share,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { Appbar, Avatar, Card, Chip, Surface, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { COLORS } from "./components/common/colors";
import SectionHeader from "./components/common/SectionHeader";
import { UIButton } from "./components/common/ui";

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
    iconColor: COLORS.warningDark,
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
  const [isFavorite, setIsFavorite] = useState(false);
  const addToFavorite = () => {
    setIsFavorite(true);
  };
  const removeFromFavorite = () => {
    setIsFavorite(false);
  };
  const shareProduct = async () => {
    try {
      await Share.share({
        message: `${product.name} - ${product.sellingPrice}`,
      });
    } catch (error) {
      // no-op: share cancelled or failed
    }
  };
  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorite();
      return;
    }
    addToFavorite();
  };

  return (
    <View style={styles.root}>
      <Appbar.Header mode="small" style={styles.appbar}>
        <Appbar.Action icon="chevron-left" onPress={() => router.back()} />
        <Appbar.Content title="Product Details" titleStyle={styles.appbarTitle} />
        <Appbar.Action icon="share-variant" onPress={shareProduct} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={[styles.content, maxWidthStyle]}>
        <Image source={{ uri: product.image }} style={styles.hero} />

        <View style={styles.titleRow}>
          <Text variant="titleLarge" style={styles.title}>
            {product.name}
          </Text>
          <TouchableOpacity
            onPress={toggleFavorite}
            accessibilityRole="button"
            accessibilityLabel={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
            activeOpacity={0.8}
          >
            <Avatar.Icon
              size={36}
              icon={isFavorite ? "heart" : "heart-outline"}
              color={COLORS.primary}
              style={styles.heart}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.tagsRow}>
          <TagPill
            icon="check-circle"
            label={product.status.toUpperCase()}
            background={COLORS.greenTint}
            textColor={COLORS.success}
          />
          <TagPill
            icon="cube-outline"
            label={product.units}
            background={COLORS.infoTint}
            textColor={COLORS.info}
          />
          <TagPill
            icon="tag-outline"
            label={product.category}
            background={COLORS.neutralTint}
            textColor={COLORS.muted}
          />
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
        <UIButton
          variant="smallOutlinePrimary"
          size="sm"
          icon="pencil"
          style={styles.bottomButton}
          onPress={() => router.push("/product-edit")}
        >
          Edit Product
        </UIButton>
        <UIButton
          variant="smallPrimary"
          size="sm"
          icon="plus-circle"
          style={[styles.bottomButton, styles.bottomPrimary]}
          onPress={() => router.push("/adjust-stock")}
        >
          Adjust Stock
        </UIButton>
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
    backgroundColor: COLORS.transparent,
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
});
