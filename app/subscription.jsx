import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Card, Icon, Text, TouchableRipple } from "react-native-paper";
import { useRouter } from "expo-router";
import { COLORS } from "./components/common/colors";
import { UIButton } from "./components/common/ui";

const PLANS = {
  Monthly: [
    {
      id: "basic",
      name: "Basic",
      price: "$0",
      period: "/month",
      desc: "Essential features for individuals starting out.",
      features: [
        "Up to 100 transactions/mo",
        "Single device login",
        { text: "Inventory management", muted: true },
      ],
    },
    {
      id: "pro",
      name: "Pro",
      price: "$29",
      period: "/month",
      desc: "The complete toolkit for growing shops.",
      features: [
        "Unlimited transactions",
        "Up to 5 devices",
        "Advanced Inventory & Reports",
        "Staff management",
      ],
      highlight: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "$99",
      period: "/month",
      desc: "Tailored for large multi-location businesses.",
      features: [
        "Multiple locations",
        "Priority 24/7 Support",
        "Custom API Integration",
      ],
    },
  ],
  Yearly: [
    {
      id: "basic-y",
      name: "Basic",
      price: "$0",
      period: "/year",
      desc: "Essential features for individuals starting out.",
      features: [
        "Up to 1200 transactions/yr",
        "Single device login",
        { text: "Inventory management", muted: true },
      ],
    },
    {
      id: "pro-y",
      name: "Pro",
      price: "$299",
      period: "/year",
      desc: "Save two months with yearly billing.",
      features: [
        "Unlimited transactions",
        "Up to 7 devices",
        "Advanced Inventory & Reports",
        "Staff management",
      ],
      highlight: true,
    },
    {
      id: "enterprise-y",
      name: "Enterprise",
      price: "$999",
      period: "/year",
      desc: "Tailored for large multi-location businesses.",
      features: [
        "Multiple locations",
        "Priority 24/7 Support",
        "Custom API Integration",
      ],
    },
  ],
};

const PlanCard = ({ plan }) => {
  return (
    <Card
      style={[
        styles.planCard,
        plan.highlight && styles.planCardHighlight,
      ]}
      mode="elevated"
    >
      {plan.highlight ? (
        <View style={styles.ribbon}>
          <Text style={styles.ribbonText}>MOST POPULAR</Text>
        </View>
      ) : null}
      <Text style={styles.planName}>{plan.name}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.price}>{plan.price}</Text>
        <Text style={styles.period}>{plan.period}</Text>
      </View>
      <Text style={styles.planDesc}>{plan.desc}</Text>
      <View style={styles.features}>
        {plan.features.map((f, idx) => {
          const item = typeof f === "string" ? { text: f } : f;
          return (
            <View key={idx} style={styles.featureRow}>
              <Icon
                source={item.muted ? "close-circle-outline" : "check-circle"}
                size={18}
                color={item.muted ? COLORS.mutedLight : COLORS.primary}
              />
              <Text
                style={[
                  styles.featureText,
                  item.muted && styles.featureMuted,
                ]}
              >
                {item.text}
              </Text>
            </View>
          );
        })}
      </View>
    </Card>
  );
};

const SubscriptionScreen = () => {
  const router = useRouter();
  const [billing, setBilling] = useState("Monthly");

  const currentPlan = {
    name: "Pro Plan",
    status: "ACTIVE",
    statusColor: COLORS.primary,
    statusBg: COLORS.primaryTint,
    expires: "Expires in 12 days",
  };

  const plans = useMemo(() => PLANS[billing], [billing]);

  return (
    <View style={styles.root}>
      <Appbar.Header mode="small" style={styles.appbar}>
        <Appbar.Action icon="chevron-left" onPress={() => router.back()} />
        <Appbar.Content title="Subscription" titleStyle={styles.title} />
        <Appbar.Action icon="history" onPress={() => {}} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.currentCard} mode="elevated">
          <View style={styles.currentRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.smallLabel}>YOUR CURRENT PLAN</Text>
              <Text style={styles.currentName}>{currentPlan.name}</Text>
              <View style={styles.statusPill}>
                <Text style={[styles.statusText, { color: currentPlan.statusColor }]}>
                  {currentPlan.status}
                </Text>
              </View>
              <View style={styles.expiryRow}>
                <Icon source="calendar-clock" size={18} color={COLORS.warningDeep} />
                <Text style={styles.expiryText}>{currentPlan.expires}</Text>
              </View>
            </View>
            <View style={styles.shield}>
              <Icon source="shield-check" size={30} color={COLORS.primary} />
            </View>
          </View>
        </Card>

        <View style={styles.toggle}>
          <TouchableRipple
            style={[
              styles.toggleItem,
              billing === "Monthly" && styles.toggleItemActive,
            ]}
            borderless
            onPress={() => setBilling("Monthly")}
          >
            <Text
              style={[
                styles.toggleText,
                billing === "Monthly" && styles.toggleTextActive,
              ]}
            >
              Monthly
            </Text>
          </TouchableRipple>
          <TouchableRipple
            style={[
              styles.toggleItem,
              billing === "Yearly" && styles.toggleItemActive,
            ]}
            borderless
            onPress={() => setBilling("Yearly")}
          >
            <Text
              style={[
                styles.toggleText,
                billing === "Yearly" && styles.toggleTextActive,
              ]}
            >
              Yearly
            </Text>
          </TouchableRipple>
        </View>

        {plans.map((p) => (
          <PlanCard key={p.id} plan={p} />
        ))}

        <View style={styles.footerSpace} />
      </ScrollView>

      <View style={styles.footer}>
        <UIButton
          variant="primary"
          onPress={() => {}}
          style={styles.renewBtn}
          contentStyle={styles.renewContent}
        >
          Renew Pro Plan
        </UIButton>
        <Text style={styles.disclaimer}>
          Secure payment via Apple Pay. You can cancel at any time from your settings.
        </Text>
      </View>
    </View>
  );
};

export default SubscriptionScreen;

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
    paddingBottom: 160,
  },
  currentCard: {
    borderRadius: 16,
    padding: 14,
    marginTop: 8,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  currentRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  smallLabel: {
    color: COLORS.muted,
    letterSpacing: 0.6,
    fontWeight: "800",
  },
  currentName: {
    fontSize: 22,
    fontWeight: "900",
    color: COLORS.text,
    marginTop: 4,
    marginBottom: 6,
  },
  statusPill: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: COLORS.successTint,
  },
  statusText: {
    fontWeight: "800",
  },
  expiryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  expiryText: {
    marginLeft: 6,
    color: COLORS.warningDeep,
    fontWeight: "700",
  },
  shield: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.primaryTint,
    alignItems: "center",
    justifyContent: "center",
  },
  toggle: {
    flexDirection: "row",
    backgroundColor: COLORS.neutralSoftAlt,
    borderRadius: 26,
    padding: 6,
    marginTop: 18,
    marginBottom: 12,
  },
  toggleItem: {
    flex: 1,
    borderRadius: 20,
    alignItems: "center",
    paddingVertical: 10,
  },
  toggleItemActive: {
    backgroundColor: COLORS.surface,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  toggleText: {
    color: COLORS.muted,
    fontWeight: "800",
  },
  toggleTextActive: {
    color: COLORS.text,
  },
  planCard: {
    borderRadius: 18,
    padding: 14,
    marginTop: 12,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  planCardHighlight: {
    borderColor: COLORS.primary,
    borderWidth: 2,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
  },
  ribbon: {
    position: "absolute",
    top: -12,
    alignSelf: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  ribbonText: {
    color: COLORS.white,
    fontWeight: "800",
    letterSpacing: 0.4,
  },
  planName: {
    fontWeight: "800",
    color: COLORS.text,
    marginTop: 6,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 6,
  },
  price: {
    fontSize: 28,
    fontWeight: "900",
    color: COLORS.text,
    marginRight: 6,
  },
  period: {
    color: COLORS.muted,
    marginBottom: 4,
  },
  planDesc: {
    color: COLORS.muted,
    marginTop: 6,
    lineHeight: 20,
  },
  features: {
    marginTop: 12,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  featureText: {
    marginLeft: 10,
    color: COLORS.text,
  },
  featureMuted: {
    color: COLORS.muted,
    textDecorationLine: "line-through",
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  renewBtn: {
    borderRadius: 16,
  },
  renewContent: {
    height: 54,
  },
  disclaimer: {
    textAlign: "center",
    marginTop: 8,
    color: COLORS.muted,
  },
  footerSpace: {
    height: 120,
  },
});
