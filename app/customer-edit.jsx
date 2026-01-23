import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Appbar, Icon, Snackbar, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { COLORS } from "./components/common/colors";
import { InputField, UIButton } from "./components/common/ui";

const CustomerEditScreen = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("Robert");
  const [lastName, setLastName] = useState("Chen");
  const [phone, setPhone] = useState("(555) 222-3344");
  const [email, setEmail] = useState("robert.chen@email.com");
  const [address, setAddress] = useState("123 Business Bay, Suite 405");
  const [snackbar, setSnackbar] = useState({ visible: false, message: "" });

  const showToast = (message) => setSnackbar({ visible: true, message });

  return (
    <View style={styles.root}>
      <Appbar.Header mode="small" style={styles.appbar}>
        <Appbar.Action icon="close" onPress={() => router.back()} />
        <Appbar.Content title="Edit Customer" titleStyle={styles.title} />
        <View style={styles.headerSpacer} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.photoBlock}>
          <View style={styles.avatarShell}>
            <Text style={styles.avatarText}>RC</Text>
            <View style={styles.cameraBadge}>
              <Icon source="camera" size={14} color={COLORS.white} />
            </View>
          </View>
          <TouchableOpacity activeOpacity={0.8} onPress={() => showToast("Change photo")}>
            <Text style={styles.photoText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <View style={[styles.col, styles.colLeft]}>
            <Text style={styles.label}>FIRST NAME</Text>
            <InputField
              value={firstName}
              onChangeText={setFirstName}
              style={styles.input}
            />
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>LAST NAME</Text>
            <InputField
              value={lastName}
              onChangeText={setLastName}
              style={styles.input}
            />
          </View>
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>PHONE NUMBER</Text>
          <InputField
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            style={styles.input}
            leftIcon="phone-outline"
          />
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>EMAIL ADDRESS</Text>
          <InputField
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            leftIcon="email-outline"
          />
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>ADDRESS</Text>
          <InputField
            value={address}
            onChangeText={setAddress}
            style={styles.input}
            leftIcon="map-marker-outline"
          />
        </View>

        <View style={styles.actions}>
          <UIButton
            style={styles.saveButton}
            onPress={() => showToast("Changes saved")}
            icon="check-circle-outline"
          >
            Save Changes
          </UIButton>
          <UIButton
            variant="ghost"
            onPress={() => showToast("Delete customer")}
            textColor={COLORS.danger}
            icon="trash-can-outline"
          >
            Delete Customer
          </UIButton>
        </View>
      </ScrollView>

      <Snackbar
        visible={snackbar.visible}
        onDismiss={() => setSnackbar({ visible: false, message: "" })}
        duration={1200}
      >
        {snackbar.message}
      </Snackbar>
    </View>
  );
};

export default CustomerEditScreen;

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
  headerSpacer: {
    width: 40,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 200,
  },
  photoBlock: {
    marginTop: 8,
    alignItems: "center",
  },
  avatarShell: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.primary,
  },
  cameraBadge: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.surface,
  },
  photoText: {
    marginTop: 10,
    color: COLORS.primary,
    fontWeight: "700",
  },
  row: {
    flexDirection: "row",
    marginTop: 18,
  },
  col: {
    flex: 1,
  },
  colLeft: {
    marginRight: 12,
  },
  fieldBlock: {
    marginTop: 14,
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
  },
  actions: {
    marginTop: 22,
    alignItems: "center",
  },
  saveButton: {
    borderRadius: 14,
    alignSelf: "stretch",
  },
});
