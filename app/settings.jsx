import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Avatar, Card, Text, TouchableRipple, Button } from "react-native-paper";
import { useRouter } from "expo-router";
import { COLORS } from "./components/common/colors";
import BottomBar from "./components/common/BottomBar";

const profile = {
  name: "John Doe",
  role: "Owner",
  business: "Downtown Coffee Shop",
  avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=200",
};

const sections = [
  {
    title: "BUSINESS MANAGEMENT",
    items: [
      {
        key: "business-profile",
        title: "Business Profile",
        subtitle: "Locations, hours, and details",
        icon: "storefront-outline",
        tint: COLORS.blueTint,
        iconColor: COLORS.primary,
      },
      {
        key: "tax-discounts",
        title: "Tax & Discounts",
        subtitle: "Configure taxes and promos",
        icon: "percent-outline",
        tint: COLORS.greenTint,
        iconColor: COLORS.success,
      },
      {
        key: "subscription-plan",
        title: "Subscription Plan",
        subtitle: "Pro Plan - Expires in 12 days",
        subtitleColor: COLORS.warningDeep,
        icon: "monitor-dashboard",
        tint: COLORS.orangeTint,
        iconColor: COLORS.warningDeep,
      },
    ],
  },
  {
    title: "OPERATIONS",
    items: [
      {
        key: "staff",
        title: "Staff Management",
        subtitle: "Roles, permissions, schedules",
        icon: "account-group-outline",
        tint: COLORS.greenTint,
        iconColor: COLORS.successTeal,
      },
      {
        key: "printer",
        title: "Printer Settings",
        subtitle: "Epson TM-T88V (Connected)",
        icon: "printer-outline",
        tint: COLORS.purpleTint,
        iconColor: COLORS.purple,
      },
    ],
  },
  {
    title: "PREFERENCES & SUPPORT",
    items: [
      {
        key: "notifications",
        title: "Notification Settings",
        subtitle: "Set alerts for your team",
        icon: "bell-outline",
        tint: COLORS.orangeTint,
        iconColor: COLORS.warningDeep,
      },
      {
        key: "help",
        title: "Help & Support",
        subtitle: "Guides, FAQs, and chat",
        icon: "help-circle-outline",
        tint: COLORS.blueTint,
        iconColor: COLORS.primary,
      },
    ],
  },
];

const SettingsItem = ({
  title,
  subtitle,
  subtitleColor,
  icon,
  tint,
  iconColor,
  onPress = () => {},
}) => (
  <Card mode="elevated" style={styles.itemCard}>
    <TouchableRipple onPress={onPress} borderless>
      <View style={styles.itemRow}>
        <View style={[styles.itemIconWrap, { backgroundColor: tint }]}>
          <Avatar.Icon
            size={32}
            icon={icon}
            color={iconColor}
            style={styles.itemIcon}
          />
        </View>
        <View style={styles.itemInfo}>
          <Text variant="titleMedium" style={styles.itemTitle}>
            {title}
          </Text>
          {subtitle ? (
            <Text
              variant="bodySmall"
              style={[styles.itemSubtitle, subtitleColor && { color: subtitleColor }]}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>
        <Avatar.Icon
          size={28}
          icon="chevron-right"
          color={COLORS.muted}
          style={styles.chevron}
        />
      </View>
    </TouchableRipple>
  </Card>
);

const SettingsScreen = () => {
  const router = useRouter();

  const handleTabPress = (tab) => {
    if (tab === "Home") {
      router.replace("/");
      return;
    }
    if (tab === "Inventory") {
      router.replace("/inventory");
      return;
    }
    if (tab === "History") {
      router.replace("/history");
      return;
    }
    if (tab === "Settings") {
      return;
    }
  };

  return (
    <View style={styles.root}>
      <Appbar.Header mode="small" style={styles.appbar}>
        <Appbar.Action icon="chevron-left" onPress={() => router.back()} />
        <Appbar.Content title="Settings" titleStyle={styles.title} />
        <Appbar.Action icon="account-edit" onPress={() => router.push("/profile-edit")} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <Card mode="elevated" style={styles.profileCard}>
          <View style={styles.profileRow}>
            <View style={styles.avatarWrap}>
              <Avatar.Image size={58} source={{ uri: profile.avatar }} />
              <Avatar.Icon
                size={22}
                icon="cog-outline"
                color={COLORS.primary}
                style={styles.avatarBadge}
              />
            </View>
            <View style={styles.profileInfo}>
              <Text variant="titleMedium" style={styles.profileName}>
                {profile.name}
              </Text>
              <Text variant="bodyMedium" style={styles.profileRole}>
                {profile.role}
              </Text>
              <Text variant="bodySmall" style={styles.profileBusiness}>
                {profile.business}
              </Text>
            </View>
          </View>
        </Card>

        {sections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionLabel}>{section.title}</Text>
            {section.items.map((item) => (
              <SettingsItem
                key={item.key}
                title={item.title}
                subtitle={item.subtitle}
                subtitleColor={item.subtitleColor}
                icon={item.icon}
                tint={item.tint}
                iconColor={item.iconColor}
              onPress={() => {
                if (item.key === "help") {
                  router.push("/componentsview");
                  return;
                }
                if (item.key === "tax-discounts") {
                  router.push("/tax-discounts");
                  return;
                }
                if (item.key === "subscription-plan") {
                  router.push("/subscription");
                  return;
                }
                if (item.key === "business-profile") {
                  router.push("/business-profile");
                  return;
                }
                if (item.key === "notifications") {
                  router.push("/notification-settings");
                  return;
                }
              }}
            />
            ))}
          </View>
        ))}

        <Card mode="elevated" style={styles.logoutCard}>
          <TouchableRipple onPress={() => {}} borderless>
            <View style={styles.logoutRow}>
              <Avatar.Icon
                size={28}
                icon="logout"
                color={COLORS.danger}
                style={styles.logoutIcon}
              />
              <Text style={styles.logoutText}>Log Out</Text>
            </View>
          </TouchableRipple>
        </Card>

        <Text style={styles.version}>VERSION 4.2.0 (BUILD 392)</Text>
      </ScrollView>
      <BottomBar active="Settings" onTabPress={handleTabPress} />
    </View>
  );
};

export default SettingsScreen;

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
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  profileCard: {
    borderRadius: 14,
    padding: 12,
    marginTop: 8,
    backgroundColor: COLORS.backgroundAlt,
    borderWidth: 1,
    borderColor: COLORS.borderAlt,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarWrap: {
    position: "relative",
  },
  avatarBadge: {
    position: "absolute",
    right: -4,
    bottom: -4,
    backgroundColor: COLORS.infoTint,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 12,
  },
  profileName: {
    color: COLORS.text,
  },
  profileRole: {
    color: COLORS.muted,
    marginTop: 2,
  },
  profileBusiness: {
    color: COLORS.muted,
    marginTop: 2,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  profileEdit: {
    backgroundColor: COLORS.infoTint,
  },
  section: {
    marginTop: 22,
  },
  sectionLabel: {
    color: COLORS.muted,
    fontWeight: "700",
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  itemCard: {
    borderRadius: 14,
    marginBottom: 12,
    backgroundColor: COLORS.surface,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  itemIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  itemIcon: {
    backgroundColor: COLORS.transparent,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    color: COLORS.text,
  },
  itemSubtitle: {
    color: COLORS.muted,
    marginTop: 2,
  },
  chevron: {
    backgroundColor: COLORS.transparent,
  },
  logoutCard: {
    borderRadius: 14,
    marginTop: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  logoutRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
  },
  logoutIcon: {
    backgroundColor: COLORS.transparent,
    marginRight: 8,
  },
  logoutText: {
    color: COLORS.danger,
    fontWeight: "700",
  },
  version: {
    marginTop: 12,
    textAlign: "center",
    color: COLORS.muted,
    letterSpacing: 0.4,
    fontSize: 12,
  },
});
