import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { Snackbar } from "react-native-paper";
import { useRouter } from "expo-router";
import BottomBar from "./components/common/BottomBar";
import { COLORS } from "./components/common/colors";
import HistoryHeader from "./components/history/HistoryHeader";
import HistorySearch from "./components/history/HistorySearch";
import DateLabel from "./components/history/DateLabel";
import OrderItem from "./components/history/OrderItem";

const historySections = [
  {
    label: "TODAY, OCT 24",
    data: [
      {
        id: "1024",
        time: "10:30 AM",
        channel: "Walk-in",
        amount: "$45.00",
        icon: "receipt-outline",
        tint: COLORS.blueTint,
        iconColor: COLORS.primary,
      },
      {
        id: "1023",
        time: "10:15 AM",
        channel: "Online",
        amount: "$12.50",
        icon: "cart-outline",
        tint: COLORS.orangeTint,
        iconColor: "#E86F1E",
      },
      {
        id: "1022",
        time: "09:42 AM",
        channel: "Walk-in",
        amount: "$32.00",
        icon: "receipt-outline",
        tint: COLORS.blueTint,
        iconColor: COLORS.primary,
      },
    ],
  },
  {
    label: "YESTERDAY, OCT 23",
    data: [
      {
        id: "1021",
        time: "06:20 PM",
        channel: "Online",
        amount: "$115.40",
        icon: "cart-outline",
        tint: COLORS.orangeTint,
        iconColor: "#E86F1E",
      },
      {
        id: "1020",
        time: "03:15 PM",
        channel: "Walk-in",
        amount: "$22.00",
        icon: "receipt-outline",
        tint: COLORS.blueTint,
        iconColor: COLORS.primary,
      },
      {
        id: "1019",
        time: "02:40 PM",
        channel: "Refunded",
        amount: "-$15.00",
        icon: "alert-circle-outline",
        tint: COLORS.purpleTint,
        iconColor: "#7A3DF0",
      },
      {
        id: "1018",
        time: "11:05 AM",
        channel: "Walk-in",
        amount: "$68.25",
        icon: "receipt-outline",
        tint: COLORS.blueTint,
        iconColor: COLORS.primary,
      },
    ],
  },
];

const HistoryScreen = () => {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [snackbar, setSnackbar] = useState({ visible: false, message: "" });
  const maxWidthStyle = width >= 768 ? styles.maxWidth : null;

  const showToast = (message) => {
    setSnackbar({ visible: true, message });
  };

  const filteredSections = useMemo(() => {
    if (!query.trim()) return historySections;
    const needle = query.toLowerCase();
    return historySections
      .map((section) => ({
        ...section,
        data: section.data.filter((item) =>
          `${item.id} ${item.channel}`.toLowerCase().includes(needle)
        ),
      }))
      .filter((section) => section.data.length > 0);
  }, [query]);

  const handleTabPress = (tab) => {
    if (tab === "Home") {
      router.replace("/");
      return;
    }
    if (tab === "Settings") {
      router.replace("/settings");
      return;
    }
    if (tab === "Inventory") {
      router.replace("/inventory");
      return;
    }
    if (tab === "History") {
      return;
    }
    showToast(tab);
  };

  return (
    <View style={styles.root}>
      <HistoryHeader
        onBackPress={() => router.replace("/")}
        onMenuPress={() => showToast("Menu")}
      />

      <ScrollView contentContainerStyle={[styles.content, maxWidthStyle]}>
        <HistorySearch
          value={query}
          onChangeText={setQuery}
          onFilterPress={() => showToast("Filters")}
        />

        {filteredSections.map((section) => (
          <View key={section.label}>
            <DateLabel label={section.label} />
            {section.data.map((item) => (
              <OrderItem
                key={item.id}
                title={`Order #${item.id}`}
                time={item.time}
                channel={item.channel}
                amount={item.amount}
                icon={item.icon}
                tint={item.tint}
                iconColor={item.iconColor}
                onPress={() => showToast(`Order #${item.id}`)}
              />
            ))}
          </View>
        ))}
      </ScrollView>

      <BottomBar active="History" onTabPress={handleTabPress} />

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

export default HistoryScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 160,
  },
  maxWidth: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 720,
  },
});
