import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Icon, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { COLORS } from "./components/common/colors";
import { Badge, UIButton } from "./components/common/ui";

const FILTERS = ["All", "Inventory", "Sales", "Customers"];

const notificationsData = {
  today: [
    {
      id: "low-stock",
      title: "Bagels running low",
      time: "2m ago",
      body: "Only 5 units remaining in stock. Reorder soon to avoid stockouts during the rush.",
      cta: "Reorder Now",
      icon: "alert-outline",
      tint: COLORS.warningTint,
      iconColor: COLORS.warningDark,
      unread: true,
      category: "Inventory",
    },
    {
      id: "order-confirmed",
      title: "Order #4092 Confirmed",
      time: "15m ago",
      body:
        "Takeout order for Table 4. Total: $45.20. Payment processed via Card ending in 4242.",
      icon: "receipt-outline",
      tint: COLORS.blueTint,
      iconColor: COLORS.primary,
      unread: true,
      category: "Sales",
    },
  ],
  yesterday: [
    {
      id: "loyalty",
      title: "New Loyalty Signup",
      time: "1h ago",
      body:
        "Sarah J. joined the rewards program and is now eligible for the “First Coffee Free” promotion.",
      icon: "emoticon-happy-outline",
      tint: COLORS.greenTint,
      iconColor: COLORS.primary,
      category: "Customers",
    },
    {
      id: "report",
      title: "Daily Report Ready",
      time: "5h ago",
      body: "Your sales summary for yesterday is available. Net sales were up 12%.",
      icon: "chart-line",
      tint: COLORS.neutralSoftAlt,
      iconColor: COLORS.primary,
      category: "Sales",
      cta: "View Report",
    },
  ],
};

const NotificationCard = ({
  title,
  time,
  body,
  icon,
  tint,
  iconColor,
  cta,
  unread,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <View style={[styles.iconWrap, { backgroundColor: tint }]}>
          <Icon source={icon} size={26} color={iconColor} />
        </View>
        <View style={styles.cardHeaderText}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardTime}>{time}</Text>
        </View>
        {unread ? <View style={styles.unreadDot} /> : null}
      </View>
      <Text style={styles.cardBody}>{body}</Text>
      {cta ? (
        <UIButton
          variant="outline"
          size="md"
          style={styles.cardCta}
          contentStyle={styles.cardCtaContent}
          onPress={() => {}}
        >
          {cta}
        </UIButton>
      ) : null}
    </View>
  );
};

const NotificationsScreen = () => {
  const router = useRouter();
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    if (filter === "All") return notificationsData;
    const filterSection = (items) =>
      items.filter((n) => n.category === filter);
    return {
      today: filterSection(notificationsData.today),
      yesterday: filterSection(notificationsData.yesterday),
    };
  }, [filter]);

  const empty =
    (filtered.today.length === 0 && filtered.yesterday.length === 0);

  return (
    <View style={styles.root}>
      <Appbar.Header mode="small" style={styles.appbar}>
        <Appbar.Action icon="chevron-left" onPress={() => router.back()} />
        <Appbar.Content title="Notifications" titleStyle={styles.title} />
        <Appbar.Action icon="check-all" onPress={() => {}} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersRow}
        >
          {FILTERS.map((label) => {
            const selected = filter === label;
            return (
              <Badge
                key={label}
                label={label}
                selected={selected}
                onPress={() => setFilter(label)}
                style={styles.filterChip}
                textStyle={
                  selected ? styles.filterChipTextActive : styles.filterChipTextInactive
                }
              />
            );
          })}
        </ScrollView>

        {!empty ? (
          <>
            {filtered.today.length ? <Text style={styles.sectionLabel}>TODAY</Text> : null}
            {filtered.today.map((n) => (
              <NotificationCard key={n.id} {...n} />
            ))}

            {filtered.yesterday.length ? (
              <Text style={[styles.sectionLabel, styles.sectionSpacing]}>YESTERDAY</Text>
            ) : null}
            {filtered.yesterday.map((n) => (
              <NotificationCard key={n.id} {...n} />
            ))}
          </>
        ) : (
          <View style={styles.emptyState}>
            <Icon source="check-circle-outline" size={42} color={COLORS.muted} />
            <Text style={styles.emptyText}>You’re all caught up!</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default NotificationsScreen;

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
    paddingBottom: 120,
  },
  filtersRow: {
    marginTop: 12,
    paddingRight: 8,
    paddingLeft: 4,
  },
  filterChip: {
    marginRight: 10,
    height: 34,
    borderRadius: 17,
  },
  filterChipTextInactive: {
    color: COLORS.mutedAlt,
  },
  filterChipTextActive: {
    color: COLORS.white,
    fontWeight: "700",
  },
  sectionLabel: {
    marginTop: 10,
    marginBottom: 6,
    color: COLORS.muted,
    fontWeight: "800",
    letterSpacing: 0.4,
  },
  sectionSpacing: {
    marginTop: 16,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  cardHeaderText: {
    flex: 1,
  },
  cardTitle: {
    fontWeight: "800",
    color: COLORS.text,
  },
  cardTime: {
    color: COLORS.muted,
    marginTop: 2,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  cardBody: {
    color: COLORS.muted,
    marginTop: 2,
    lineHeight: 20,
  },
  cardCta: {
    marginTop: 10,
    alignSelf: "flex-start",
    borderRadius: 12,
  },
  cardCtaContent: {
    height: 40,
  },
  emptyState: {
    alignItems: "center",
    marginTop: 40,
  },
  emptyText: {
    marginTop: 10,
    color: COLORS.muted,
    fontWeight: "700",
  },
});
