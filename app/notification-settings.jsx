import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Icon, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { COLORS } from "./components/common/colors";
import { UISwitch, UIButton } from "./components/common/ui";

const toggles = [
  { id: "orders", label: "Order Updates", desc: "New orders, payments, and refunds" },
  { id: "inventory", label: "Inventory Alerts", desc: "Low stock and restock reminders" },
  { id: "promotions", label: "Promotions", desc: "Campaign performance and tips" },
  { id: "system", label: "System Messages", desc: "App updates and billing notices" },
];

const channels = [
  { id: "push", label: "Push Notifications" },
  { id: "email", label: "Email" },
  { id: "sms", label: "SMS" },
];

const NotificationSettingsScreen = () => {
  const router = useRouter();
  const [enabled, setEnabled] = useState(
    toggles.reduce((acc, t) => ({ ...acc, [t.id]: true }), {})
  );
  const [channelEnabled, setChannelEnabled] = useState(
    channels.reduce((acc, c) => ({ ...acc, [c.id]: true }), {})
  );

  const flip = (id) => setEnabled((prev) => ({ ...prev, [id]: !prev[id] }));
  const flipChannel = (id) =>
    setChannelEnabled((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <View style={styles.root}>
      <Appbar.Header mode="small" style={styles.appbar}>
        <Appbar.Action icon="chevron-left" onPress={() => router.back()} />
        <Appbar.Content title="Notification Settings" titleStyle={styles.title} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionLabel}>NOTIFICATION TYPES</Text>
        {toggles.map((item) => (
          <View key={item.id} style={styles.rowCard}>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>{item.label}</Text>
              <Text style={styles.rowDesc}>{item.desc}</Text>
            </View>
            <UISwitch value={enabled[item.id]} onValueChange={() => flip(item.id)} />
          </View>
        ))}

        <Text style={[styles.sectionLabel, styles.sectionSpacing]}>DELIVERY CHANNELS</Text>
        {channels.map((item) => (
          <View key={item.id} style={styles.rowCard}>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>{item.label}</Text>
            </View>
            <UISwitch
              value={channelEnabled[item.id]}
              onValueChange={() => flipChannel(item.id)}
            />
          </View>
        ))}

        <View style={styles.infoCard}>
          <Icon source="information-outline" size={20} color={COLORS.primary} />
          <Text style={styles.infoText}>
            You can customize alerts per channel. Turning off all channels will pause alerts.
          </Text>
        </View>

        <View style={styles.footerSpace} />
      </ScrollView>

      <View style={styles.footer}>
        <UIButton
          variant="primary"
          icon="check-circle-outline"
          onPress={() => router.back()}
          style={styles.saveBtn}
          contentStyle={styles.saveContent}
        >
          Save Preferences
        </UIButton>
        <UIButton
          variant="ghostPrimary"
          onPress={() => router.back()}
          style={styles.cancelBtn}
          contentStyle={styles.saveContent}
        >
          Cancel
        </UIButton>
      </View>
    </View>
  );
};

export default NotificationSettingsScreen;

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
  sectionLabel: {
    marginTop: 10,
    marginBottom: 6,
    color: COLORS.muted,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  rowCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  rowText: {
    flex: 1,
    marginRight: 10,
  },
  rowTitle: {
    color: COLORS.text,
    fontWeight: "800",
  },
  rowDesc: {
    color: COLORS.muted,
    marginTop: 2,
    lineHeight: 18,
  },
  infoCard: {
    marginTop: 12,
    borderRadius: 12,
    backgroundColor: COLORS.blueTint,
    padding: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  infoText: {
    color: COLORS.text,
    lineHeight: 18,
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
  footerSpace: {
    height: 120,
  },
  saveBtn: {
    borderRadius: 16,
  },
  cancelBtn: {
    marginTop: 8,
  },
  saveContent: {
    height: 54,
  },
});
