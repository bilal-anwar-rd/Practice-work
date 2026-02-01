import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Icon, Text, TouchableRipple, Surface } from "react-native-paper";
import { useRouter } from "expo-router";
import { COLORS } from "./components/common/colors";
import { InputField, UIButton, Dropdown } from "./components/common/ui";

const BusinessProfileScreen = () => {
  const router = useRouter();
  const [hours] = useState([
    { day: "Mon", open: "08:00 AM - 06:00 PM", status: "open" },
    { day: "Tue", open: "08:00 AM - 06:00 PM", status: "open" },
    { day: "Sun", open: "CLOSED", status: "closed" },
  ]);

  return (
    <View style={styles.root}>
      <Appbar.Header mode="small" style={styles.appbar}>
        <Appbar.Action icon="chevron-left" onPress={() => router.back()} />
        <Appbar.Content title="Business Profile" titleStyle={styles.title} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.logoBlock}>
          <View style={styles.avatarShell}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
              }}
              style={styles.logo}
            />
            <TouchableRipple style={styles.cameraOverlay} borderless>
              <View style={styles.overlayInner}>
                <Icon source="camera-outline" size={26} color={COLORS.white} />
                <Text style={styles.cameraText}>Change Photo</Text>
              </View>
            </TouchableRipple>
          </View>
          <Text style={styles.logoLabel}>Business Logo</Text>
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>BUSINESS NAME</Text>
          <InputField value="Downtown Coffee Shop" style={styles.input} />
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>LEGAL NAME</Text>
          <InputField value="Downtown Coffee & Pastries LLC" style={styles.input} />
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>PHONE NUMBER</Text>
          <InputField value="+1 (555) 0123 4567" style={styles.input} keyboardType="phone-pad" />
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>EMAIL ADDRESS</Text>
          <InputField
            value="hello@downtowncoffee.com"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>WEBSITE</Text>
          <InputField value="www.downtowncoffee.shop" style={styles.input} />
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>STREET ADDRESS</Text>
          <InputField value="123 Barista Street, Suite 4" style={styles.input} />
        </View>
        <View style={styles.fieldBlock}>
          <Text style={styles.label}>CITY</Text>
          <InputField value="San Francisco" style={styles.input} />
        </View>
        <View style={styles.fieldBlock}>
          <Text style={styles.label}>ZIP / POSTAL CODE</Text>
          <InputField value="94103" style={styles.input} keyboardType="numeric" />
        </View>

        <View style={styles.storeHeader}>
          <Text style={styles.sectionLabel}>STORE HOURS</Text>
          <TouchableRipple borderless>
            <Text style={styles.copyLink}>Copy to All</Text>
          </TouchableRipple>
        </View>
        <Surface style={styles.hoursCard} elevation={0}>
          {hours.map((h) => (
            <View key={h.day} style={styles.hourRow}>
              <Text style={[styles.hourDay, h.status === "closed" && styles.closedText]}>{h.day}</Text>
              <Text
                style={[
                  styles.hourTime,
                  h.status === "closed" && styles.closedText,
                ]}
              >
                {h.open}
              </Text>
              <Icon source="pencil-outline" size={18} color={COLORS.muted} />
            </View>
          ))}
        </Surface>

        <Text style={styles.sectionLabel}>LOCALIZATION</Text>
        <View style={styles.fieldBlock}>
          <Text style={styles.label}>CURRENCY</Text>
          <Dropdown
            value="US Dollar ($)"
            options={["US Dollar ($)", "Euro (€)", "GBP (£)"]}
            onSelect={() => {}}
            placeholder="Select currency"
            fieldStyle={styles.input}
          />
        </View>
        <View style={styles.fieldBlock}>
          <Text style={styles.label}>LANGUAGE</Text>
          <Dropdown
            value="English (United States)"
            options={["English (United States)", "English (UK)", "Spanish"]}
            onSelect={() => {}}
            placeholder="Select language"
            fieldStyle={styles.input}
          />
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
          Update Profile
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

export default BusinessProfileScreen;

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
    paddingBottom: 120,
  },
  logoBlock: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 16,
  },
  avatarShell: {
    width: 164,
    height: 164,
    borderRadius: 82,
    overflow: "hidden",
    backgroundColor: COLORS.surface,
    position: "relative",
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  cameraOverlay: {
    position: "absolute",
    width: 164,
    height: 164,
    borderRadius: 82,
    backgroundColor: "rgba(0,0,0,0.28)",
    alignItems: "center",
    justifyContent: "center",
  },
  logoLabel: {
    marginTop: 8,
    color: COLORS.text,
    fontWeight: "700",
  },
  cameraText: {
    marginTop: 6,
    color: COLORS.white,
    fontWeight: "700",
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  overlayInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sectionLabel: {
    marginTop: 4,
    marginBottom: 6,
    color: COLORS.muted,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  fieldCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  fieldBlock: {
    marginTop: 12,
  },
  input: {
    backgroundColor: COLORS.surface,
    height: 54,
    borderRadius: 12,
  },
  storeHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 2,
  },
  copyLink: {
    color: COLORS.primary,
    fontWeight: "700",
  },
  hoursCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  hourRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  hourDay: {
    width: 48,
    color: COLORS.text,
    fontWeight: "700",
  },
  hourTime: {
    flex: 1,
    color: COLORS.text,
  },
  closedText: {
    color: COLORS.danger,
    fontWeight: "700",
  },
  selectRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  selectLabel: {
    color: COLORS.muted,
    flex: 1,
  },
  selectValue: {
    color: COLORS.text,
    marginRight: 8,
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: -8,
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
    height: 80,
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
