import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Snackbar } from "react-native-paper";
import { useRouter } from "expo-router";
import { COLORS } from "./components/common/colors";
import ProductForm from "./components/products/ProductForm";

const ProductAddScreen = () => {
  const router = useRouter();
  const [snackbar, setSnackbar] = useState({ visible: false, message: "" });

  const showToast = (message) => setSnackbar({ visible: true, message });

  return (
    <View style={styles.root}>
      <Appbar.Header mode="small" style={styles.appbar}>
        <Appbar.Action icon="chevron-left" onPress={() => router.back()} />
        <Appbar.Content title="Add Product" titleStyle={styles.title} />
      </Appbar.Header>

      <ProductForm
        mode="add"
        initial={{}}
        onSubmit={() => showToast("Product saved")}
        onCancel={() => router.back()}
        useFixedFooter
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

export default ProductAddScreen;

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
