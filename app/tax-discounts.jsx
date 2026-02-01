import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Icon, Text, TouchableRipple, Avatar, Surface } from "react-native-paper";
import { useRouter } from "expo-router";
import { COLORS } from "./components/common/colors";
import { UISwitch, UIButton } from "./components/common/ui";

const initialTaxes = [
  {
    id: "gst",
    name: "GST 5%",
    description: "Standard Goods & Service Tax",
    enabled: true,
  },
  {
    id: "vat",
    name: "VAT 12%",
    description: "Value Added Tax",
    enabled: false,
  },
];

const initialDiscounts = [
  {
    id: "seasonal",
    name: "Seasonal Sale 10%",
    description: "Applied to all categories",
    status: "ACTIVE",
    statusColor: COLORS.primary,
  },
  {
    id: "flat5",
    name: "Flat $5 Off",
    description: "Minimum order $50",
    status: "PAUSED",
    statusColor: COLORS.primary,
  },
];

const RowCard = ({
  icon,
  tint,
  title,
  description,
  rightContent,
  onEdit,
}) => (
  <Surface style={styles.card} elevation={1}>
    <View style={styles.cardRow}>
      <View style={[styles.iconBadge, { backgroundColor: tint }]}>
        <Icon source={icon} size={22} color={COLORS.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDesc}>{description}</Text>
      </View>
      {rightContent}
      <TouchableRipple borderless onPress={onEdit} style={styles.editBtn}>
        <Icon source="pencil-outline" size={20} color={COLORS.muted} />
      </TouchableRipple>
    </View>
  </Surface>
);

const TaxDiscountScreen = () => {
  const router = useRouter();
  const [taxes, setTaxes] = useState(initialTaxes);
  const [discounts] = useState(initialDiscounts);

  const toggleTax = (id) => {
    setTaxes((prev) =>
      prev.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t))
    );
  };

  return (
    <View style={styles.root}>
      <Appbar.Header mode="small" style={styles.appbar}>
        <Appbar.Action icon="chevron-left" onPress={() => router.back()} />
        <Appbar.Content title="Tax & Discounts" titleStyle={styles.title} />
        <Appbar.Action icon="information-outline" onPress={() => {}} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionLabelRow}>
            <Avatar.Icon
              size={32}
              icon="wallet-outline"
              style={styles.sectionIcon}
              color={COLORS.primary}
            />
            <Text style={styles.sectionTitle}>TAX RULES</Text>
          </View>
          <TouchableRipple onPress={() => {}} borderless style={styles.linkWrap}>
            <View style={styles.linkRow}>
              <Icon source="plus" size={16} color={COLORS.primary} />
              <Text style={[styles.linkText, styles.linkPrimary]}>Add Tax</Text>
            </View>
          </TouchableRipple>
        </View>

        {taxes.map((tax) => (
          <RowCard
            key={tax.id}
            icon="cash-multiple"
            tint={COLORS.primaryTint}
            title={tax.name}
            description={tax.description}
            rightContent={
              <UISwitch value={tax.enabled} onValueChange={() => toggleTax(tax.id)} />
            }
            onEdit={() => {}}
          />
        ))}

        <View style={[styles.sectionHeader, styles.sectionSpacing]}>
          <View style={styles.sectionLabelRow}>
            <Avatar.Icon
              size={32}
              icon="tag-outline"
              style={styles.sectionIcon}
              color={COLORS.primary}
            />
            <Text style={styles.sectionTitle}>DISCOUNT RULES</Text>
          </View>
          <TouchableRipple onPress={() => {}} borderless style={styles.linkWrap}>
            <View style={styles.linkRow}>
              <Icon source="plus" size={16} color={COLORS.primary} />
              <Text style={[styles.linkText, styles.linkPrimary]}>Add Discount</Text>
            </View>
          </TouchableRipple>
        </View>

        {discounts.map((d) => (
          <RowCard
            key={d.id}
            icon="percent-outline"
            tint={COLORS.primaryTint}
            title={d.name}
            description={d.description}
            rightContent={
              <View style={[styles.statusPill, { backgroundColor: d.statusColor + "22" }]}>
                <Text style={[styles.statusText, { color: d.statusColor }]}>
                  {d.status}
                </Text>
              </View>
            }
            onEdit={() => {}}
          />
        ))}

        <Surface style={styles.infoCard} elevation={0}>
          <View style={styles.infoRow}>
            <Icon source="information-outline" size={22} color={COLORS.primary} />
            <Text style={styles.infoText}>
              Taxes are automatically calculated at checkout based on enabled rules. You can stack
              multiple discounts if configured in rule settings.
            </Text>
          </View>
        </Surface>
      </ScrollView>
    </View>
  );
};

export default TaxDiscountScreen;

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
    paddingHorizontal: 16,
    paddingBottom: 140,
  },
  sectionHeader: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionLabelRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionIcon: {
    backgroundColor: COLORS.greenTint,
    marginRight: 8,
  },
  sectionTitle: {
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: 0.5,
  },
  linkWrap: {
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  linkText: {
    fontWeight: "800",
    color: COLORS.primary,
  },
  linkPrimary: {
    color: COLORS.primary,
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  card: {
    marginTop: 12,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  cardTitle: {
    color: COLORS.text,
    fontWeight: "800",
  },
  cardDesc: {
    color: COLORS.muted,
    marginTop: 2,
  },
  editBtn: {
    marginLeft: 8,
    borderRadius: 14,
    padding: 6,
  },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  statusText: {
    fontWeight: "800",
    fontSize: 12,
  },
  infoCard: {
    marginTop: 16,
    borderRadius: 14,
    backgroundColor: COLORS.blueTint,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    padding: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  infoText: {
    marginLeft: 10,
    color: COLORS.text,
    lineHeight: 18,
  },
  sectionSpacing: {
    marginTop: 18,
  },
});
