import React, { useState } from "react";
import { ScrollView, StyleSheet, View, useWindowDimensions } from "react-native";
import { Snackbar } from "react-native-paper";
import { useRouter } from "expo-router";
import HeaderBar from "./components/home/HeaderBar";
import MetricCard from "./components/home/MetricCard";
import PrimaryAction from "./components/home/PrimaryAction";
import QuickActions from "./components/home/QuickActions";
import ActivityCard from "./components/home/ActivityCard";
import BottomBar from "./components/common/BottomBar";
import { COLORS } from "./components/common/colors";

const HomeScreen = () => {
  const { width } = useWindowDimensions();
  const isNarrow = width < 360;
  const [snackbar, setSnackbar] = useState({ visible: false, message: "" });
  const router = useRouter();

  const showToast = (message) => {
    setSnackbar({ visible: true, message });
  };
  const handleTabPress = (tab) => {
    if (tab === "History") {
      router.push("/history");
      return;
    }
    if (tab === "Inventory") {
      router.push("/inventory");
      return;
    }
    if (tab === "Home") {
      return;
    }
    showToast(tab);
  };

  return (
    <View style={styles.root}>
      <HeaderBar onBellPress={() => showToast("Notifications")} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.metricRow, isNarrow && styles.metricColumn]}>
          <View style={[styles.metricWrap, !isNarrow && styles.metricLeft]}>
            <MetricCard
              title="Today's Sales"
              value="$1,240.50"
              icon="cash-multiple"
              change="+12%"
              onPress={() => showToast("Today's Sales")}
            />
          </View>
          <View style={styles.metricWrap}>
            <MetricCard
              title="Orders"
              value="34"
              icon="shopping-outline"
              change="+5%"
              onPress={() => showToast("Orders")}
            />
          </View>
        </View>

        <PrimaryAction onPress={() => showToast("New Sale")} />
        <QuickActions
          containerWidth={width - 40}
          onActionPress={(label) => showToast(label)}
          onEditPress={() => showToast("Edit Quick Actions")}
        />
        <ActivityCard
          onPress={() => showToast("Order #1024")}
          onViewAllPress={() => showToast("Recent Activity")}
        />
      </ScrollView>

      <BottomBar active="Home" onTabPress={handleTabPress} />

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

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
    paddingBottom: 160,
  },
  metricRow: {
    flexDirection: "row",
  },
  metricColumn: {
    flexDirection: "column",
  },
  metricWrap: {
    flex: 1,
  },
  metricLeft: {
    marginRight: 16,
  },
});
