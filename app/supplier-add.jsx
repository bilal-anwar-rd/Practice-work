import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Appbar, Snackbar, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { COLORS } from "./components/common/colors";
import { InputField, TextArea, UIButton } from "./components/common/ui";

const SupplierAddScreen = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [snackbar, setSnackbar] = useState({ visible: false, message: "" });

  const showToast = (message) => setSnackbar({ visible: true, message });

  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setNotes("");
    showToast("Form reset");
  };

  const handleSave = () => {
    showToast("Supplier saved");
  };

  return (
    <View style={styles.root}>
      <Appbar.Header mode="small" style={styles.appbar}>
        <Appbar.Action icon="chevron-left" onPress={() => router.back()} />
        <Appbar.Content title="Add Supplier" titleStyle={styles.title} />
        <TouchableOpacity onPress={resetForm} style={styles.cancelTop}>
          <Text style={styles.cancelTopText}>Reset</Text>
        </TouchableOpacity>
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.fieldBlock}>
          <Text style={styles.label}>SUPPLIER NAME *</Text>
          <InputField
            value={name}
            onChangeText={setName}
            placeholder="e.g., Global Foods Inc."
            style={styles.input}
          />
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>PHONE NUMBER</Text>
          <InputField
            value={phone}
            onChangeText={setPhone}
            placeholder="+1 (555) 000-0000"
            keyboardType="phone-pad"
            leftIcon="phone-outline"
            style={styles.input}
          />
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>EMAIL ADDRESS</Text>
          <InputField
            value={email}
            onChangeText={setEmail}
            placeholder="supplier@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon="email-outline"
            style={styles.input}
          />
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>NOTES</Text>
          <TextArea
            value={notes}
            onChangeText={setNotes}
            placeholder="Add delivery schedules, credit terms, or specific contact persons..."
            style={styles.textarea}
          />
        </View>

        <Text style={styles.helperText}>
          Fields marked with * are required to create a supplier profile.
        </Text>
      </ScrollView>

      <View style={styles.actionsBar}>
        <UIButton
          style={styles.saveButton}
          onPress={handleSave}
          icon="content-save-outline"
        >
          Save Supplier
        </UIButton>
        <UIButton variant="ghostPrimary" onPress={() => router.back()}>
          Cancel
        </UIButton>
      </View>

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

export default SupplierAddScreen;

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
  cancelTop: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  cancelTopText: {
    color: COLORS.primary,
    fontWeight: "700",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 200,
  },
  fieldBlock: {
    marginTop: 16,
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
  textarea: {
    backgroundColor: COLORS.surface,
  },
  helperText: {
    marginTop: 14,
    color: COLORS.mutedLight,
    textAlign: "center",
  },
  actionsBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.background,
  },
  saveButton: {
    borderRadius: 14,
  },
});
