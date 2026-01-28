import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text } from "react-native-paper";
import { COLORS } from "../common/colors";

const WarehouseImagePicker = ({
  images = [],
  onAdd = () => {},
  onRemove = () => {},
}) => {
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.label}>Warehouse Images</Text>
        <Text style={styles.helper}>{images.length}/4 uploaded</Text>
      </View>
      <View style={styles.grid}>
        {images.map((image) => (
          <View key={image.id} style={styles.thumbWrap}>
            <Image source={{ uri: image.uri }} style={styles.thumb} />
            <TouchableOpacity
              onPress={() => onRemove(image.id)}
              style={styles.removeButton}
            >
              <Icon source="close" size={14} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity
          style={styles.addTile}
          onPress={onAdd}
          activeOpacity={0.9}
        >
          <View style={styles.addIcon}>
            <Icon source="image-plus" size={22} color={COLORS.primary} />
          </View>
          <Text style={styles.addText}>Upload images</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WarehouseImagePicker;

const styles = StyleSheet.create({
  root: {
    marginTop: 18,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.7,
    color: COLORS.muted,
  },
  helper: {
    fontSize: 12,
    color: COLORS.mutedAlt,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  thumbWrap: {
    width: 88,
    height: 88,
    borderRadius: 16,
    overflow: "hidden",
  },
  thumb: {
    width: "100%",
    height: "100%",
  },
  removeButton: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  addTile: {
    width: 120,
    height: 88,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  addIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primaryTint,
    alignItems: "center",
    justifyContent: "center",
  },
  addText: {
    marginTop: 6,
    fontSize: 11,
    color: COLORS.muted,
    textAlign: "center",
  },
});
