import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Surface, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { COLORS } from "./components/common/colors";
import {
  Badge,
  Dropdown,
  InputField,
  TextArea,
  UIButton,
  UISwitch,
} from "./components/common/ui";

const dropdownOptions = ["Option A", "Option B", "Option C"];

const ComponentsViewScreen = () => {
  const router = useRouter();
  const [toggleOn, setToggleOn] = useState(true);
  const [dropdownValue, setDropdownValue] = useState("Option A");
  const [inputValue, setInputValue] = useState("Sample input");
  const [textAreaValue, setTextAreaValue] = useState("Multiline text...");
  const [activeBadge, setActiveBadge] = useState("Active");

  return (
    <View style={styles.root}>
      <Appbar.Header mode="small" style={styles.appbar}>
        <Appbar.Action icon="chevron-left" onPress={() => router.back()} />
        <Appbar.Content title="Components View" titleStyle={styles.title} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Buttons</Text>
        <View style={styles.row}>
          <UIButton style={styles.button}>Primary</UIButton>
          <UIButton variant="secondary" style={styles.button}>
            Secondary
          </UIButton>
        </View>
        <View style={styles.row}>
          <UIButton variant="outline" style={styles.button}>
            Outline
          </UIButton>
          <UIButton variant="ghost" style={styles.button}>
            Ghost
          </UIButton>
        </View>
        <View style={styles.row}>
          <UIButton variant="danger" style={styles.button}>
            Danger
          </UIButton>
          <UIButton size="sm" style={styles.button}>
            Small
          </UIButton>
        </View>

        <Text style={styles.sectionTitle}>Inputs</Text>
        <InputField
          value={inputValue}
          onChangeText={setInputValue}
          placeholder="Input field"
          leftIcon="account-outline"
          style={styles.input}
        />
        <InputField
          placeholder="With right icon"
          rightIcon="magnify"
          style={styles.input}
        />
        <TextArea
          value={textAreaValue}
          onChangeText={setTextAreaValue}
          placeholder="Text area"
          style={styles.textarea}
        />

        <Text style={styles.sectionTitle}>Dropdown</Text>
        <Dropdown
          value={dropdownValue}
          options={dropdownOptions}
          onSelect={setDropdownValue}
          fieldStyle={styles.dropdown}
        />

        <Text style={styles.sectionTitle}>Switch</Text>
        <Surface elevation={0} style={styles.switchCard}>
          <Text style={styles.switchLabel}>Enable notifications</Text>
          <UISwitch value={toggleOn} onValueChange={setToggleOn} />
        </Surface>

        <Text style={styles.sectionTitle}>Badges</Text>
        <View style={styles.badgeRow}>
          {["Active", "Pending", "Archived"].map((label) => (
            <Badge
              key={label}
              label={label}
              selected={activeBadge === label}
              onPress={() => setActiveBadge(label)}
              style={styles.badge}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ComponentsViewScreen;

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
    paddingBottom: 160,
  },
  sectionTitle: {
    marginTop: 18,
    marginBottom: 10,
    fontSize: 12,
    letterSpacing: 1,
    fontWeight: "700",
    color: COLORS.muted,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  button: {
    marginRight: 10,
    marginBottom: 10,
  },
  input: {
    marginBottom: 12,
  },
  textarea: {
    marginBottom: 12,
  },
  dropdown: {
    marginBottom: 8,
  },
  switchCard: {
    marginTop: 4,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  switchLabel: {
    color: COLORS.text,
    fontWeight: "600",
  },
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  badge: {
    marginRight: 10,
    marginBottom: 10,
  },
});
