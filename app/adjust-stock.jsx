import React, { useMemo, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  Appbar,
  Avatar,
  Snackbar,
  Surface,
  Text,
} from "react-native-paper";
import { useRouter } from "expo-router";
import { COLORS } from "./components/common/colors";
import { Dropdown, UIButton } from "./components/common/ui";

const product = {
  name: "Vintage Leather Satchel",
  stock: 45,
  image:
    "https://images.unsplash.com/photo-1612810432635-6815c0a1dd35?w=400",
};

const reasons = [
  "Correction",
  "Damaged",
  "Theft/Loss",
  "Return to Vendor",
  "Inventory Count",
  "Other",
];

const keypadRows = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["", "0", "back"],
];

const ModeToggle = ({ mode, onChange }) => (
  <Surface elevation={1} style={styles.modeWrap}>
    <TouchableOpacity
      style={[
        styles.modeButton,
        mode === "add" ? styles.modeActive : styles.modeInactive,
        styles.modeLeft,
      ]}
      onPress={() => onChange("add")}
    >
      <Text
        style={[
          styles.modeText,
          { color: mode === "add" ? COLORS.primary : COLORS.muted },
        ]}
      >
        Add
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[
        styles.modeButton,
        mode === "remove" ? styles.modeActive : styles.modeInactive,
        styles.modeRight,
      ]}
      onPress={() => onChange("remove")}
    >
      <Text
        style={[
          styles.modeText,
          { color: mode === "remove" ? COLORS.danger : COLORS.muted },
        ]}
      >
        Remove
      </Text>
    </TouchableOpacity>
  </Surface>
);

const AdjustStockScreen = () => {
  const router = useRouter();
  const [mode, setMode] = useState("add");
  const [amount, setAmount] = useState("12");
  const [reason, setReason] = useState("Correction");
  const [snackbar, setSnackbar] = useState({ visible: false, message: "" });

  const amountLabel = useMemo(() => (amount.length ? amount : "0"), [amount]);

  const handleKeyPress = (key) => {
    if (key === "back") {
      setAmount((prev) => prev.slice(0, -1));
      return;
    }
    if (!key) return;
    setAmount((prev) => {
      const next = (prev || "") + key;
      if (next.length > 6) return prev;
      return next.replace(/^0+(?=\d)/, "");
    });
  };

  const confirm = () => {
    setSnackbar({
      visible: true,
      message: `${mode === "add" ? "Added" : "Removed"} ${amountLabel} units (${reason})`,
    });
  };

  return (
    <View style={styles.root}>
      <Appbar.Header mode="small" style={styles.appbar}>
        <Appbar.Action icon="close" onPress={() => router.back()} />
        <Appbar.Content title="Adjust Stock" titleStyle={styles.title} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <Surface elevation={1} style={styles.productCard}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text variant="titleMedium" style={styles.productName}>
              {product.name}
            </Text>
            <Text variant="bodyMedium" style={styles.productStock}>
              Current Stock: <Text style={styles.productStockBold}>{product.stock} units</Text>
            </Text>
          </View>
        </Surface>

        <ModeToggle mode={mode} onChange={setMode} />

        <View style={styles.amountBlock}>
          <Text style={styles.amountValue}>{amountLabel}</Text>
          <Text style={styles.amountUnits}>units</Text>
          <Text style={styles.amountLabel}>ADJUSTMENT AMOUNT</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>REASON FOR ADJUSTMENT</Text>
          <Dropdown
            value={reason}
            options={reasons}
            onSelect={setReason}
            fieldStyle={styles.reasonField}
          />
        </View>

        <View style={styles.keypad}>
          {keypadRows.map((row, idx) => (
            <View key={idx} style={styles.keypadRow}>
              {row.map((key, colIdx) => (
                <TouchableOpacity
                  key={key || `empty-${idx}-${colIdx}`}
                  style={styles.key}
                  onPress={() => handleKeyPress(key)}
                  disabled={!key}
                >
                  {key === "back" ? (
                    <Avatar.Icon
                      size={44}
                      icon="backspace-outline"
                      color={COLORS.text}
                      style={styles.keyIcon}
                    />
                  ) : (
                    <Text style={styles.keyText}>{key}</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

      <Surface elevation={8} style={styles.bottomBar}>
        <UIButton
          style={styles.confirmButton}
          onPress={confirm}
        >
          Confirm Adjustment
        </UIButton>
      </Surface>

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

export default AdjustStockScreen;

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
  content: {
    paddingHorizontal: 20,
    paddingBottom: 140,
  },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
  },
  productImage: {
    width: 58,
    height: 58,
    borderRadius: 12,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    color: COLORS.text,
  },
  productStock: {
    marginTop: 2,
    color: COLORS.muted,
  },
  productStockBold: {
    fontWeight: "700",
    color: COLORS.text,
  },
  modeWrap: {
    flexDirection: "row",
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    marginTop: 14,
    overflow: "hidden",
  },
  modeButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  modeActive: {
    backgroundColor: COLORS.primaryTint,
  },
  modeInactive: {
    backgroundColor: COLORS.surface,
  },
  modeLeft: {
    borderRightWidth: 1,
    borderColor: COLORS.border,
  },
  modeRight: {},
  modeText: {
    fontWeight: "700",
  },
  amountBlock: {
    marginTop: 18,
    alignItems: "center",
  },
  amountValue: {
    fontSize: 42,
    fontWeight: "800",
    color: COLORS.text,
  },
  amountUnits: {
    color: COLORS.muted,
    marginTop: -6,
  },
  amountLabel: {
    marginTop: 10,
    color: COLORS.muted,
    letterSpacing: 1,
  },
  section: {
    marginTop: 22,
  },
  sectionLabel: {
    color: COLORS.muted,
    fontWeight: "700",
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  reasonField: {
    height: 48,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  keypad: {
    marginTop: 24,
  },
  keypadRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
  },
  key: {
    width: 64,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  keyText: {
    fontSize: 22,
    color: COLORS.text,
    fontWeight: "600",
  },
  keyIcon: {
    backgroundColor: COLORS.transparent,
  },
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.surface,
  },
  confirmButton: {
    borderRadius: 14,
  },
});
