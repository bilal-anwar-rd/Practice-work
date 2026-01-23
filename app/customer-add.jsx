import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Appbar, Button, Icon, Snackbar, Text, TextInput } from "react-native-paper";
import { useRouter } from "expo-router";
import { COLORS } from "./components/common/colors";

const INPUT_RADIUS = 12;

const CustomerAddScreen = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [snackbar, setSnackbar] = useState({ visible: false, message: "" });

  const showToast = (message) => setSnackbar({ visible: true, message });

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setAddress("");
    showToast("Form reset");
  };

  const handleSave = () => {
    showToast("Customer saved");
  };

  return (
    <View style={styles.root}>
      <Appbar.Header mode="small" style={styles.appbar}>
        <Appbar.Action icon="chevron-left" onPress={() => router.back()} />
        <Appbar.Content title="Add New Customer" titleStyle={styles.title} />
        <TouchableOpacity onPress={resetForm} style={styles.resetButton}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.photoBlock}>
          <View style={styles.avatarShell}>
            <View style={styles.avatarCircle}>
              <Icon source="account" size={34} color={COLORS.muted} />
            </View>
            <View style={styles.cameraBadge}>
              <Icon source="camera" size={16} color="white" />
            </View>
          </View>
          <Text style={styles.photoText}>Take Photo</Text>
        </View>

        <View style={styles.row}>
          <View style={[styles.col, styles.colLeft]}>
            <Text style={styles.label}>FIRST NAME</Text>
            <TextInput
              mode="outlined"
              value={firstName}
              onChangeText={setFirstName}
              placeholder="e.g. John"
              outlineColor={COLORS.border}
              activeOutlineColor={COLORS.primary}
              style={styles.input}
              outlineStyle={styles.inputOutline}
              theme={{ roundness: INPUT_RADIUS }}
            />
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>LAST NAME</Text>
            <TextInput
              mode="outlined"
              value={lastName}
              onChangeText={setLastName}
              placeholder="e.g. Doe"
              outlineColor={COLORS.border}
              activeOutlineColor={COLORS.primary}
              style={styles.input}
              outlineStyle={styles.inputOutline}
              theme={{ roundness: INPUT_RADIUS }}
            />
          </View>
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>PHONE NUMBER</Text>
          <TextInput
            mode="outlined"
            value={phone}
            onChangeText={setPhone}
            placeholder="(555) 000-0000"
            keyboardType="phone-pad"
            outlineColor={COLORS.border}
            activeOutlineColor={COLORS.primary}
            style={styles.input}
            outlineStyle={styles.inputOutline}
            theme={{ roundness: INPUT_RADIUS }}
            left={<TextInput.Icon icon="phone-outline" />}
          />
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>EMAIL ADDRESS</Text>
          <TextInput
            mode="outlined"
            value={email}
            onChangeText={setEmail}
            placeholder="john.doe@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            outlineColor={COLORS.border}
            activeOutlineColor={COLORS.primary}
            style={styles.input}
            outlineStyle={styles.inputOutline}
            theme={{ roundness: INPUT_RADIUS }}
            left={<TextInput.Icon icon="email-outline" />}
          />
        </View>

        <View style={styles.fieldBlock}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>ADDRESS</Text>
            <Text style={styles.optional}>OPTIONAL</Text>
          </View>
          <TextInput
            mode="outlined"
            value={address}
            onChangeText={setAddress}
            placeholder="Street, City, State, ZIP"
            outlineColor={COLORS.border}
            activeOutlineColor={COLORS.primary}
            style={styles.input}
            outlineStyle={styles.inputOutline}
            theme={{ roundness: INPUT_RADIUS }}
            left={<TextInput.Icon icon="map-marker-outline" />}
          />
        </View>

        <View style={styles.actions}>
          <Button
            mode="contained"
            buttonColor={COLORS.primary}
            style={styles.saveButton}
            contentStyle={styles.saveContent}
            labelStyle={styles.saveLabel}
            onPress={handleSave}
            icon="check-circle-outline"
          >
            Save Customer
          </Button>
          <Button mode="text" onPress={() => router.back()} textColor={COLORS.muted}>
            Cancel
          </Button>
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

export default CustomerAddScreen;

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
  resetButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  resetText: {
    color: COLORS.primary,
    fontWeight: "700",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 160,
  },
  photoBlock: {
    marginTop: 8,
    alignItems: "center",
  },
  avatarShell: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.surface,
  },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraBadge: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: 30,
    height: 30,
    borderRadius: 15,
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
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.7,
    color: COLORS.muted,
    marginBottom: 6,
  },
  optional: {
    fontSize: 11,
    color: COLORS.muted,
    letterSpacing: 0.6,
  },
  input: {
    backgroundColor: COLORS.surface,
    height: 56,
  },
  inputOutline: {
    borderRadius: INPUT_RADIUS,
  },
  actions: {
    marginTop: 20,
  },
  saveButton: {
    borderRadius: 14,
  },
  saveContent: {
    height: 54,
  },
  saveLabel: {
    fontWeight: "700",
  },
});
