import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon, Surface, Text } from "react-native-paper";
import { COLORS } from "../colors";

const Dropdown = ({
  label,
  value,
  options = [],
  onSelect = () => {},
  placeholder = "Select",
  containerStyle,
  fieldStyle,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={containerStyle}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TouchableOpacity
        style={[styles.field, fieldStyle]}
        activeOpacity={0.9}
        onPress={() => setOpen(true)}
      >
        <Text style={styles.value}>{value || placeholder}</Text>
        <Icon source={open ? "chevron-up" : "chevron-down"} size={20} color={COLORS.muted} />
      </TouchableOpacity>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.scrim} onPress={() => setOpen(false)} />
        <View style={styles.modal} pointerEvents="box-none">
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

export default Dropdown;

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.7,
    color: COLORS.muted,
    marginBottom: 6,
  },
  field: {
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  value: {
    color: COLORS.text,
    fontWeight: "600",
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.scrim,
  },
  modal: {
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
