import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Appbar, Surface, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { COLORS } from "./components/common/colors";
import { Dropdown, InputField, TextArea, UIButton, UISwitch } from "./components/common/ui";
import WarehouseImagePicker from "./components/warehouse/WarehouseImagePicker";

const WAREHOUSE_TYPES = [
  "Distribution Center",
  "Retail Store",
  "Cold Storage",
  "Fulfillment Hub",
];

const IMAGE_LIBRARY = [
  {
    id: "warehouse-exterior",
    uri: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "warehouse-aisle",
    uri: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "warehouse-loading",
    uri: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "warehouse-map",
    uri: "https://images.unsplash.com/photo-1524666041070-9d87656c25bb?auto=format&fit=crop&w=800&q=80",
  },
];

const WarehouseAddScreen = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  const [isDefault, setIsDefault] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [images, setImages] = useState([]);

  const handleSave = () => {};
  const handleAddImage = () => {
    if (images.length >= IMAGE_LIBRARY.length) return;
    setImages((prev) => [...prev, IMAGE_LIBRARY[prev.length]]);
  };
  const handleRemoveImage = (id) => {
    setImages((prev) => prev.filter((image) => image.id !== id));
  };

  return (
    <View style={styles.root}>
      <Appbar.Header mode="small" style={styles.appbar}>
        <Appbar.Action icon="chevron-left" onPress={() => router.back()} />
        <Appbar.Content title="Add Warehouse" titleStyle={styles.title} />
        <TouchableOpacity onPress={() => router.back()} style={styles.cancelTop}>
          <Text style={styles.cancelTopText}>Cancel</Text>
        </TouchableOpacity>
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.fieldBlock}>
          <Text style={styles.label}>Warehouse Name</Text>
          <InputField
            value={name}
            onChangeText={setName}
            placeholder="e.g. Central Distribution Center"
            style={styles.input}
          />
        </View>

        <View style={styles.fieldBlock}>
          <Dropdown
            label="Warehouse Type"
            value={type}
            options={WAREHOUSE_TYPES}
            onSelect={setType}
            containerStyle={styles.dropdown}
          />
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>Location Address</Text>
          <TextArea
            value={address}
            onChangeText={setAddress}
            placeholder="Enter the full physical address"
            style={styles.textarea}
          />
        </View>

        <WarehouseImagePicker
          images={images}
          onAdd={handleAddImage}
          onRemove={handleRemoveImage}
        />

        <Text style={styles.sectionTitle}>CONFIGURATION</Text>
        <Surface elevation={0} style={styles.configCard}>
          <View style={styles.configRow}>
            <View style={styles.configText}>
              <Text style={styles.configTitle}>Set as Default</Text>
              <Text style={styles.configHint}>
                Orders will be fulfilled from here by default
              </Text>
            </View>
            <UISwitch value={isDefault} onValueChange={setIsDefault} />
          </View>
          <View style={styles.divider} />
          <View style={styles.configRow}>
            <View style={styles.configText}>
              <Text style={styles.configTitle}>Active Status</Text>
              <Text style={styles.configHint}>
                Enable this warehouse for inventory operations
              </Text>
            </View>
            <UISwitch value={isActive} onValueChange={setIsActive} />
          </View>
        </Surface>
      </ScrollView>

      <View style={styles.actionsBar}>
        <UIButton
          style={styles.saveButton}
          icon="check-circle-outline"
          onPress={handleSave}
        >
          Save Warehouse
        </UIButton>
        <UIButton variant="ghostPrimary" onPress={() => router.back()}>
          Cancel
        </UIButton>
      </View>
    </View>
  );
};

export default WarehouseAddScreen;

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
  dropdown: {
    marginTop: 0,
  },
  textarea: {
    minHeight: 110,
    backgroundColor: COLORS.surface,
  },
  sectionTitle: {
    marginTop: 18,
    marginBottom: 10,
    color: COLORS.primary,
    fontWeight: "700",
    letterSpacing: 0.8,
    fontSize: 12,
  },
  configCard: {
    borderRadius: 14,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
  },
  configRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  configText: {
    flex: 1,
    paddingRight: 12,
  },
  configTitle: {
    color: COLORS.text,
    fontWeight: "700",
  },
  configHint: {
    color: COLORS.muted,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 12,
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
