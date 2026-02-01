import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Icon, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { COLORS } from "./components/common/colors";
import { InputField, UIButton } from "./components/common/ui";

const ChangePasswordScreen = () => {
  const router = useRouter();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");

  return (
    <View style={styles.root}>
      <Appbar.Header mode="small" style={styles.appbar}>
        <Appbar.Action icon="chevron-left" onPress={() => router.back()} />
        <Appbar.Content title="Change Password" titleStyle={styles.title} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <View style={styles.heroIconWrap}>
            <Icon source="shield-key" size={30} color={COLORS.primary} />
          </View>
          <Text style={styles.heroTitle}>Keep your account secure</Text>
          <Text style={styles.heroCopy}>
            Create a strong password with at least 8 characters including a number and a symbol.
          </Text>
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>CURRENT PASSWORD</Text>
          <InputField
            value={current}
            onChangeText={setCurrent}
            style={styles.input}
            secureTextEntry
            placeholder="Enter current password"
          />
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>NEW PASSWORD</Text>
          <InputField
            value={next}
            onChangeText={setNext}
            style={styles.input}
            secureTextEntry
            placeholder="Enter new password"
            leftIcon="lock-outline"
          />
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>CONFIRM NEW PASSWORD</Text>
          <InputField
            value={confirm}
            onChangeText={setConfirm}
            style={styles.input}
            secureTextEntry
            placeholder="Re-enter new password"
            leftIcon="lock-check-outline"
          />
        </View>

        <View style={styles.hint}>
          <Icon source="information-outline" size={18} color={COLORS.muted} />
          <Text style={styles.hintText}>Passwords must match and cannot be empty.</Text>
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
          Save Password
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

export default ChangePasswordScreen;

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
    paddingBottom: 140,
  },
  hero: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 18,
  },
  heroIconWrap: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: COLORS.primaryTint,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  heroTitle: {
    fontWeight: "800",
    color: COLORS.text,
  },
  heroCopy: {
    color: COLORS.muted,
    textAlign: "center",
    marginTop: 6,
    lineHeight: 18,
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
  input: {
    backgroundColor: COLORS.surface,
    height: 56,
    borderRadius: 14,
  },
  hint: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  hintText: {
    marginLeft: 8,
    color: COLORS.muted,
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
    height: 60,
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
