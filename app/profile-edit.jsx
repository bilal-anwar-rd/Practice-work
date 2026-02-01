import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Avatar, Icon, Text, TouchableRipple } from "react-native-paper";
import { useRouter } from "expo-router";
import { COLORS } from "./components/common/colors";
import { InputField, UISwitch, UIButton } from "./components/common/ui";

const ProfileEditScreen = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@downtowncoffee.com");
  const [phone, setPhone] = useState("+1 (555) 000-1234");
  const [business, setBusiness] = useState("Downtown Coffee Shop");
  const [biometric, setBiometric] = useState(true);

  return (
    <View style={styles.root}>
      <Appbar.Header mode="small" style={styles.appbar}>
        <Appbar.Action icon="chevron-left" onPress={() => router.back()} />
        <Appbar.Content title="Edit Profile" titleStyle={styles.title} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.avatarWrap}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
            }}
            style={styles.avatarImage}
          />
          <View style={styles.cameraOverlay}>
            <Icon source="camera-outline" size={26} color={COLORS.white} />
            <Text style={styles.cameraText}>Change Photo</Text>
          </View>
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>FULL NAME</Text>
          <InputField
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
          />
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>EMAIL ADDRESS</Text>
          <InputField
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>PHONE NUMBER</Text>
          <InputField
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>BUSINESS NAME</Text>
          <InputField
            value={business}
            onChangeText={setBusiness}
            style={styles.input}
          />
        </View>

        <Text style={[styles.label, styles.sectionLabel]}>SECURITY</Text>
        <View style={styles.securityCard}>
          <TouchableRipple onPress={() => router.push("/change-password")} borderless>
            <View style={styles.securityRow}>
              <Avatar.Icon
                icon="lock-outline"
                size={32}
                style={styles.securityIcon}
                color={COLORS.muted}
              />
              <Text style={styles.securityText}>Change Password</Text>
              <Icon source="chevron-right" size={20} color={COLORS.muted} />
            </View>
          </TouchableRipple>
          <View style={styles.divider} />
          <View style={styles.securityRow}>
            <Avatar.Icon
              icon="fingerprint"
              size={32}
              style={styles.securityIcon}
              color={COLORS.muted}
            />
            <Text style={styles.securityText}>Biometric Login</Text>
            <UISwitch value={biometric} onValueChange={setBiometric} />
          </View>
        </View>

        <View style={styles.footerSpace} />
      </ScrollView>

      <View style={styles.footer}>
        <UIButton
          variant="primary"
          onPress={() => router.back()}
          style={styles.saveBtn}
          contentStyle={styles.saveContent}
        >
          Save Changes
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

export default ProfileEditScreen;

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
  avatarWrap: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 18,
  },
  avatarImage: {
    width: 164,
    height: 164,
    borderRadius: 82,
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
  cameraText: {
    marginTop: 6,
    color: COLORS.white,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  fieldBlock: {
    marginTop: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.7,
    color: COLORS.muted,
    marginBottom: 6,
  },
  sectionLabel: {
    marginTop: 20,
  },
  input: {
    backgroundColor: COLORS.surface,
    height: 58,
    borderRadius: 14,
  },
  securityCard: {
    marginTop: 6,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  securityRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  securityIcon: {
    backgroundColor: COLORS.neutralSoftAlt,
    marginRight: 10,
  },
  securityText: {
    flex: 1,
    color: COLORS.text,
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  footerSpace: {
    height: 40,
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
