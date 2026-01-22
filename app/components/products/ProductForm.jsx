import React, { useMemo, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Avatar,
  Button,
  Icon,
  Surface,
  Switch,
  Text,
  TextInput,
} from "react-native-paper";
import { COLORS } from "../common/colors";

const categoryOptions = [
  "Accessories",
  "Apparel",
  "Beverages",
  "Electronics",
  "Home",
  "Stationery",
];

const INPUT_RADIUS = 12;

const SelectField = ({ label, value, options, onSelect, containerStyle }) => {
  const [open, setOpen] = useState(false);
  return (
    <View style={[styles.fieldBlock, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.selectField}
        activeOpacity={0.9}
        onPress={() => setOpen(true)}
      >
        <Text style={styles.selectValue}>{value || "Select"}</Text>
        <Icon source={open ? "chevron-up" : "chevron-down"} size={20} color={COLORS.muted} />
      </TouchableOpacity>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.modalScrim} onPress={() => setOpen(false)} />
        <View style={styles.modalContainer} pointerEvents="box-none">
          <Surface style={styles.sheet}>
            <ScrollView
              style={{ maxHeight: 340 }}
              contentContainerStyle={styles.sheetContent}
              keyboardShouldPersistTaps="handled"
            >
              {options.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={styles.sheetRow}
                  onPress={() => {
                    onSelect(item);
                    setOpen(false);
                  }}
                >
                  <Text style={styles.sheetText}>{item}</Text>
                  {item === value ? (
                    <Icon source="check" size={18} color={COLORS.primary} />
                  ) : null}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Surface>
        </View>
      </Modal>
    </View>
  );
};

const ProductForm = ({
  mode = "edit",
  initial = {},
  onSubmit = () => {},
  onCancel = () => {},
  onDelete = null,
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

  return (
    <ScrollView contentContainerStyle={styles.formContent}>
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
            <Button mode="contained" style={styles.uploadButton} buttonColor={COLORS.primary}>
              Select Image
            </Button>
          </TouchableOpacity>
        </Surface>
      ) : (
        <Surface elevation={1} style={styles.heroCard}>
          <Image source={{ uri: heroImage }} style={styles.hero} />
          <Button
            icon="camera-outline"
            mode="contained-tonal"
            style={styles.heroButton}
            onPress={() => {}}
          >
            Change Photo
          </Button>
        </Surface>
      )}

      <View style={styles.fieldBlock}>
        <Text style={styles.label}>PRODUCT NAME</Text>
        <TextInput
          mode="outlined"
          value={name}
          onChangeText={setName}
          placeholder="e.g. Organic Coffee Beans"
          outlineColor={COLORS.border}
          activeOutlineColor={COLORS.primary}
          style={[styles.input, styles.inputLg]}
          outlineStyle={styles.inputOutline}
          theme={{ roundness: INPUT_RADIUS }}
        />
      </View>

      <View style={styles.row}>
        <View style={[styles.col, styles.colLeft, styles.inlineFieldBlock]}>
          <SelectField
            label="CATEGORY"
            value={category}
            options={categoryOptions}
            onSelect={setCategory}
            containerStyle={styles.inlineFieldBlock}
          />
        </View>
        <View style={[styles.col, styles.inlineFieldBlock]}>
          <Text style={styles.label}>SKU</Text>
          <TextInput
            mode="outlined"
            value={sku}
            onChangeText={setSku}
            placeholder="e.g. BEAN-001"
            outlineColor={COLORS.border}
            activeOutlineColor={COLORS.primary}
            style={[styles.input, styles.inputLg]}
            outlineStyle={styles.inputOutline}
            theme={{ roundness: INPUT_RADIUS }}
          />
        </View>
      </View>

      <View style={styles.fieldBlock}>
        <Text style={styles.label}>DESCRIPTION</Text>
        <TextInput
          mode="outlined"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter product details..."
          outlineColor={COLORS.border}
          activeOutlineColor={COLORS.primary}
          style={[styles.input, styles.textarea]}
          outlineStyle={styles.inputOutline}
          theme={{ roundness: INPUT_RADIUS }}
        />
      </View>

      <Surface elevation={1} style={styles.card}>
        <Text style={styles.cardTitle}>Financials</Text>
        <View style={styles.row}>
          <View style={[styles.col, styles.colLeft]}>
            <Text style={styles.label}>Cost Price</Text>
            <TextInput
              mode="outlined"
              value={costPrice}
            onChangeText={setCostPrice}
              placeholder="$ 0.00"
              keyboardType="decimal-pad"
              outlineColor={COLORS.border}
              activeOutlineColor={COLORS.primary}
              style={[styles.input, styles.inputLg]}
              outlineStyle={styles.inputOutline}
              theme={{ roundness: INPUT_RADIUS }}
            />
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Selling Price</Text>
            <TextInput
            mode="outlined"
            value={sellingPrice}
            onChangeText={setSellingPrice}
              placeholder="$ 0.00"
              keyboardType="decimal-pad"
              outlineColor={COLORS.border}
              activeOutlineColor={COLORS.primary}
              style={[styles.input, styles.inputLg]}
              outlineStyle={styles.inputOutline}
              theme={{ roundness: INPUT_RADIUS }}
            />
          </View>
        </View>
        <View style={[styles.row, styles.rowGapSmall]}>
          <View style={[styles.col, styles.colLeft]}>
            <Text style={styles.label}>Tax Rate (%)</Text>
            <TextInput
              mode="outlined"
              value={taxRate}
            onChangeText={setTaxRate}
              placeholder="e.g. 5"
              keyboardType="decimal-pad"
              outlineColor={COLORS.border}
              activeOutlineColor={COLORS.primary}
              style={[styles.input, styles.inputLg]}
              outlineStyle={styles.inputOutline}
              theme={{ roundness: INPUT_RADIUS }}
            />
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Margin</Text>
            <TextInput
            mode="outlined"
              value={margin}
              editable={false}
              outlineColor={COLORS.border}
              style={[styles.input, styles.inputLg]}
              outlineStyle={styles.inputOutline}
              theme={{ roundness: INPUT_RADIUS }}
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
          <Switch value={trackStock} onValueChange={setTrackStock} />
        </View>
        {isAddMode ? (
          <View style={styles.fieldBlock}>
            <Text style={styles.label}>Opening Stock</Text>
            <TextInput
              mode="outlined"
              value={openingStock}
            onChangeText={setOpeningStock}
              placeholder="0"
              keyboardType="numeric"
              outlineColor={COLORS.border}
              activeOutlineColor={COLORS.primary}
              style={[styles.input, styles.inputLg]}
              outlineStyle={styles.inputOutline}
              theme={{ roundness: INPUT_RADIUS }}
            />
          </View>
        ) : null}
      </Surface>

      {onDelete && !isAddMode ? (
        <Button
          mode="text"
          textColor="#D34545"
          style={styles.deleteButton}
          icon="delete-outline"
          onPress={onDelete}
        >
          Delete Product
        </Button>
      ) : null}

      <View style={styles.actions}>
        <Button
          mode="contained"
          buttonColor={COLORS.primary}
          style={styles.saveButton}
          contentStyle={styles.saveContent}
          labelStyle={styles.saveLabel}
          onPress={handleSubmit}
        >
          {isAddMode ? "Save Product" : "Save Changes"}
        </Button>
        {isAddMode ? (
          <Button mode="text" onPress={onCancel} textColor={COLORS.muted}>
            Cancel
          </Button>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default ProductForm;

const styles = StyleSheet.create({
  formContent: {
    paddingHorizontal: 20,
    paddingBottom: 160,
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
    backgroundColor: "rgba(0,0,0,0.72)",
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
  inputOutline: {
    borderRadius: INPUT_RADIUS,
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
  selectField: {
    height: 56,
    borderRadius: INPUT_RADIUS,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectValue: {
    color: COLORS.text,
    fontWeight: "600",
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
  saveButton: {
    borderRadius: 14,
  },
  saveContent: {
    height: 54,
  },
  saveLabel: {
    fontWeight: "700",
  },
  modalScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.12)",
  },
  modalContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
  },
  sheet: {
    marginHorizontal: 14,
    marginBottom: 18,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    elevation: 10,
  },
  sheetContent: {
    paddingVertical: 8,
  },
  sheetRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sheetText: {
    color: COLORS.text,
    fontWeight: "600",
  },
});
