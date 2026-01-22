import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Snackbar } from "react-native-paper";
import { useRouter } from "expo-router";
import { COLORS } from "./components/common/colors";
import ProductForm from "./components/products/ProductForm";

const product = {
  name: "Vintage Leather Satchel",
  category: "Accessories",
  sku: "VLS-2023",
  description:
    "Handcrafted premium leather satchel with antique brass hardware and adjustable shoulder strap. Perfect for everyday professional use.",
  costPrice: "$ 65.00",
  sellingPrice: "$ 120.00",
  taxRate: "12",
  trackStock: true,
  image: "https://images.unsplash.com/photo-1612810432635-6815c0a1dd35?w=800",
};

const ProductEditScreen = () => {
  const router = useRouter();
  const [snackbar, setSnackbar] = useState({ visible: false, message: "" });

  const showToast = (message) => {
    setSnackbar({ visible: true, message });
  };

  return (
    <View style={styles.root}>
      <Appbar.Header mode="small" style={styles.appbar}>
        <Appbar.Action icon="chevron-left" onPress={() => router.back()} />
        <Appbar.Content title="Edit Product" titleStyle={styles.title} />
        <Appbar.Action icon="help-circle-outline" onPress={() => showToast("Help")} />
      </Appbar.Header>

      <ProductForm
        mode="edit"
        initial={product}
        onSubmit={() => showToast("Product saved")}
        onDelete={() => showToast("Product deleted")}
      />

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

export default ProductEditScreen;

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
});
