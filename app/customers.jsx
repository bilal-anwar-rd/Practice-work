import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { Button, Searchbar, Snackbar, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { COLORS } from "./components/common/colors";
import SectionHeader from "./components/common/SectionHeader";
import CustomersHeader from "./components/customers/CustomersHeader";
import CustomerListItem from "./components/customers/CustomerListItem";

const customerData = [
  {
    id: "john-doe",
    name: "John Doe",
    phone: "(555) 123-4567",
    email: "john.doe@email.com",
    status: "Last visit: Oct 24",
    metricValue: "$1,540",
    metricColors: {
      bg: COLORS.greenTint,
      value: COLORS.success,
    },
    avatar: { initials: "JD", bg: COLORS.greenTint, textColor: COLORS.success },
  },
  {
    id: "jane-smith",
    name: "Jane Smith",
    phone: "(555) 987-6543",
    email: "jane.smith@email.com",
    status: "Last visit: Yesterday",
    metricValue: "540 pts",
    metricColors: { bg: "#FFF2E0", value: "#C66A10", label: "#C66A10" },
    avatar: { initials: "JS", bg: COLORS.orangeTint, textColor: "#C66A10" },
  },
  {
    id: "robert-chen",
    name: "Robert Chen",
    phone: "(555) 222-3344",
    email: "robert.chen@email.com",
    status: "Active now",
    metricValue: "$3,120",
    metricColors: { bg: COLORS.blueTint, value: COLORS.primary, label: COLORS.primary },
    avatar: {
      uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
      style: { backgroundColor: COLORS.blueTint },
    },
  },
  {
    id: "eleanor-lewis",
    name: "Eleanor Lewis",
    phone: "(555) 444-9988",
    email: "eleanor.lewis@email.com",
    status: "Last visit: 3 days ago",
    metricValue: "210 pts",
    metricColors: { bg: COLORS.purpleTint, value: "#7A3DF0", label: "#7A3DF0" },
    avatar: { initials: "EL", bg: COLORS.purpleTint, textColor: "#7A3DF0" },
  },
  {
    id: "marcus-polo",
    name: "Marcus Polo",
    phone: "(555) 777-1122",
    email: "marcus.polo@email.com",
    status: "Last visit: 1 week ago",
    metricValue: "$890",
    metricColors: {
      bg: COLORS.blueTint,
      value: COLORS.primaryDark,
      label: COLORS.primaryDark,
    },
    avatar: { initials: "MP", bg: COLORS.blueTint, textColor: COLORS.primaryDark },
  },
];

const CustomersScreen = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [query, setQuery] = useState("");
  const [snackbar, setSnackbar] = useState({ visible: false, message: "" });
  const maxWidthStyle = width >= 768 ? styles.maxWidth : null;

  const filteredCustomers = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return customerData;
    return customerData.filter((customer) =>
      `${customer.name} ${customer.phone} ${customer.email}`
        .toLowerCase()
        .includes(needle)
    );
  }, [query]);

  const showToast = (message) => {
    setSnackbar({ visible: true, message });
  };

  return (
    <View style={styles.root}>
      <CustomersHeader
        onBackPress={() => router.back()}
        onMenuPress={() => showToast("Customer options")}
      />

      <ScrollView contentContainerStyle={[styles.content, maxWidthStyle]}>
        <Searchbar
          placeholder="Search name, phone, or email..."
          value={query}
          onChangeText={setQuery}
          style={styles.search}
          inputStyle={styles.searchInput}
        />

        <Button
          icon="account-plus"
          mode="contained"
          style={styles.addButton}
          contentStyle={styles.addButtonContent}
          labelStyle={styles.addButtonLabel}
          buttonColor={COLORS.primary}
          onPress={() => showToast("Add Customer")}
        >
          Add Customer
        </Button>

        <SectionHeader
          title="Recently Active"
          actionLabel="View All"
          onActionPress={() => showToast("View all customers")}
        />

        {filteredCustomers.map((customer) => (
          <CustomerListItem
            key={customer.id}
            name={customer.name}
            phone={customer.phone}
            status={customer.status}
            metricValue={customer.metricValue}
            metricLabel={customer.metricLabel}
            metricColors={customer.metricColors}
            avatar={customer.avatar}
            onPress={() => showToast(customer.name)}
          />
        ))}

        {!filteredCustomers.length ? (
          <Text style={styles.emptyText}>No customers match your search.</Text>
        ) : null}
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

export default CustomersScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 140,
  },
  maxWidth: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 720,
  },
  search: {
    marginTop: 8,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
  },
  searchInput: {
    color: COLORS.text,
  },
  addButton: {
    marginTop: 12,
    borderRadius: 14,
    shadowColor: COLORS.primaryDark,
  },
  addButtonContent: {
    height: 50,
  },
  addButtonLabel: {
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  emptyText: {
    marginTop: 18,
    textAlign: "center",
    color: COLORS.muted,
  },
});
