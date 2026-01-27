import React, { useMemo, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Avatar,
  Surface,
  Text,
} from "react-native-paper";
import { COLORS } from "../common/colors";
import {
  Dropdown,
  InputField,
  TextArea,
  UIButton,
  UISwitch,
} from "../common/ui";

const categoryOptions = [
  "Accessories",
  "Apparel",
  "Beverages",
  "Electronics",
  "Home",
  "Stationery",
];

const ProductForm = ({
  mode = "edit",
  initial = {},
  onSubmit = () => {},
  onCancel = () => {},
  onDelete = null,
  useFixedFooter = false,
}) => {
  const [name, setName] = useState(initial.name || "");
  const [category, setCategory] = useState(initial.category || "");
  const [sku, setSku] = useState(initial.sku || "");
  const [description, setDescription] = useState(
    initial.description ||
      "Handcrafted premium leather satchel with antique brass hardware and adjustable shoulder strap. Perfect for everyday professional use."
  );
  const [costPrice, setCostPrice] = useState(initial.costPrice || "");
  const [sellingPrice, setSellingPrice] = useState(initial.sellingPrice || "");
  const [taxRate, setTaxRate] = useState(initial.taxRate || "");
  const [trackStock, setTrackStock] = useState(
    initial.trackStock !== undefined ? initial.trackStock : true
  );
  const [openingStock, setOpeningStock] = useState(
    initial.openingStock !== undefined ? String(initial.openingStock) : ""
  );

  const margin = useMemo(() => {
    const cp = parseFloat(costPrice.replace(/[^0-9.]/g, ""));
    const sp = parseFloat(sellingPrice.replace(/[^0-9.]/g, ""));
    if (!cp || !sp) return "";
    const pct = Math.max(0, ((sp - cp) / sp) * 100);
    return `${pct.toFixed(0)}%`;
  }, [costPrice, sellingPrice]);

  const handleSubmit = () => {
    onSubmit({
      name,
      category,
      sku,
      description,
      costPrice,
      sellingPrice,
      taxRate,
      trackStock,
      openingStock,
    });
  };

  const isAddMode = mode === "add";
  const heroImage =
    initial.image ||
    "https://images.unsplash.com/photo-1612810432635-6815c0a1dd35?w=800";

  const actionButtons = (
    <>
      <UIButton
        style={styles.saveButton}
        onPress={handleSubmit}
        icon={isAddMode ? "check-circle-outline" : undefined}
      >
        {isAddMode ? "Save Product" : "Save Changes"}
      </UIButton>
      {isAddMode ? (
        <UIButton
          variant={useFixedFooter ? "ghostPrimary" : "ghost"}
          onPress={onCancel}
        >
          Cancel
        </UIButton>
      ) : null}
    </>
  );

  const formBody = (
    <>
      {isAddMode ? (
        <Surface style={styles.uploadCard} elevation={0}>
          <TouchableOpacity style={styles.uploadBox} activeOpacity={0.9}>
            <Avatar.Icon
              size={52}
              icon="camera-plus-outline"
              color={COLORS.primary}
              style={styles.uploadIcon}
            />
            <Text style={styles.uploadTitle}>Tap to Upload</Text>
            <Text style={styles.uploadHint}>Upload product image (JPEG, PNG)</Text>
            <UIButton size="md" style={styles.uploadButton}>
              Select Image
            </UIButton>
          </TouchableOpacity>
        </Surface>
      ) : (
        <Surface elevation={1} style={styles.heroCard}>
          <Image source={{ uri: heroImage }} style={styles.hero} />
          <UIButton
            variant="secondary"
            buttonColor={COLORS.overlayDark}
            textColor={COLORS.white}
            icon="camera-outline"
            style={styles.heroButton}
            onPress={() => {}}
          >
            Change Photo
          </UIButton>
        </Surface>
      )}

      <View style={styles.fieldBlock}>
        <Text style={styles.label}>PRODUCT NAME</Text>
        <InputField
          value={name}
          onChangeText={setName}
          placeholder="e.g. Organic Coffee Beans"
          style={[styles.input, styles.inputLg]}
        />
      </View>

      <View style={styles.row}>
        <View style={[styles.col, styles.colLeft, styles.inlineFieldBlock]}>
          <Dropdown
            label="CATEGORY"
            value={category}
            options={categoryOptions}
            onSelect={setCategory}
            containerStyle={styles.inlineFieldBlock}
          />
        </View>
        <View style={[styles.col, styles.inlineFieldBlock]}>
          <Text style={styles.label}>SKU</Text>
          <InputField
            value={sku}
            onChangeText={setSku}
            placeholder="e.g. BEAN-001"
            style={[styles.input, styles.inputLg]}
          />
        </View>
      </View>

      <View style={styles.fieldBlock}>
        <Text style={styles.label}>DESCRIPTION</Text>
        <TextArea
          value={description}
          onChangeText={setDescription}
          placeholder="Enter product details..."
          style={[styles.input, styles.textarea]}
        />
      </View>

      <Surface elevation={1} style={styles.card}>
        <Text style={styles.cardTitle}>Financials</Text>
        <View style={styles.row}>
          <View style={[styles.col, styles.colLeft]}>
            <Text style={styles.label}>Cost Price</Text>
            <InputField
              value={costPrice}
              onChangeText={setCostPrice}
              placeholder="$ 0.00"
              keyboardType="decimal-pad"
              style={[styles.input, styles.inputLg]}
            />
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Selling Price</Text>
            <InputField
              value={sellingPrice}
              onChangeText={setSellingPrice}
              placeholder="$ 0.00"
              keyboardType="decimal-pad"
              style={[styles.input, styles.inputLg]}
            />
          </View>
        </View>
        <View style={[styles.row, styles.rowGapSmall]}>
          <View style={[styles.col, styles.colLeft]}>
            <Text style={styles.label}>Tax Rate (%)</Text>
            <InputField
              value={taxRate}
              onChangeText={setTaxRate}
              placeholder="e.g. 5"
              keyboardType="decimal-pad"
              style={[styles.input, styles.inputLg]}
            />
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Margin</Text>
            <InputField
              value={margin}
              editable={false}
              style={[styles.input, styles.inputLg]}
            />
          </View>
        </View>
      </Surface>

      <Surface elevation={1} style={styles.card}>
        <View style={styles.trackRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Track Stock</Text>
            <Text style={styles.trackHint}>Manage quantities and alerts</Text>
          </View>
          <UISwitch value={trackStock} onValueChange={setTrackStock} />
        </View>
        {isAddMode ? (
          <View style={styles.fieldBlock}>
            <Text style={styles.label}>Opening Stock</Text>
            <InputField
              value={openingStock}
              onChangeText={setOpeningStock}
              placeholder="0"
              keyboardType="numeric"
              style={[styles.input, styles.inputLg]}
            />
          </View>
        ) : null}
      </Surface>

      {onDelete && !isAddMode ? (
        <UIButton
          variant="ghost"
          textColor={COLORS.danger}
          style={styles.deleteButton}
          icon="delete-outline"
          onPress={onDelete}
        >
          Delete Product
        </UIButton>
      ) : null}
    </>
  );

  if (useFixedFooter) {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={[styles.formContent, styles.formContentWithFooter]}
        >
          {formBody}
        </ScrollView>

        <View style={styles.actionsBar}>{actionButtons}</View>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.formContent}>
      {formBody}
      <View style={styles.actions}>{actionButtons}</View>
    </ScrollView>
  );
};

export default ProductForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContent: {
    paddingHorizontal: 20,
    paddingBottom: 160,
  },
  formContentWithFooter: {
    paddingBottom: 200,
  },
  heroCard: {
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: COLORS.surface,
  },
  hero: {
    width: "100%",
    height: 220,
  },
  heroButton: {
    position: "absolute",
    bottom: 12,
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: COLORS.overlayDark,
  },
  uploadCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: "dashed",
    padding: 16,
    backgroundColor: COLORS.surface,
  },
  uploadBox: {
    alignItems: "center",
  },
  uploadIcon: {
    backgroundColor: COLORS.greenTint,
  },
  uploadTitle: {
    marginTop: 10,
    fontWeight: "700",
    color: COLORS.text,
  },
  uploadHint: {
    marginTop: 4,
    color: COLORS.muted,
  },
  uploadButton: {
    marginTop: 12,
    borderRadius: 10,
  },
  fieldBlock: {
    marginTop: 14,
  },
  inlineFieldBlock: {
    marginTop: 0,
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
  },
  inputLg: {
    height: 56,
  },
  textarea: {
    minHeight: 100,
  },
  row: {
    flexDirection: "row",
    marginTop: 12,
  },
  rowGapSmall: {
    marginTop: 8,
  },
  col: {
    flex: 1,
  },
  colLeft: {
    marginRight: 12,
  },
  card: {
    marginTop: 16,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
    padding: 14,
  },
  cardTitle: {
    color: COLORS.text,
    fontWeight: "700",
    marginBottom: 6,
  },
  trackRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  trackHint: {
    color: COLORS.muted,
    marginTop: 4,
  },
  deleteButton: {
    marginTop: 16,
  },
  actions: {
    marginTop: 20,
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
  saveContent: {
    height: 54,
  },
  saveLabel: {
    fontWeight: "700",
  },
});
