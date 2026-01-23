import React from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Avatar, IconButton, Surface, Text } from "react-native-paper";
import { COLORS } from "../common/colors";

const HeaderBar = ({ onBellPress = () => {} }) => {
  return (
    <Appbar.Header mode="small" style={styles.appbar}>
      <View style={styles.headerRow}>
        <View style={styles.profileBlock}>
          <View>
            <Avatar.Text size={52} label="DT" style={styles.avatar} />
            <View style={styles.statusDot} />
          </View>
          <View style={styles.profileText}>
            <Text variant="titleSmall" style={styles.mutedText}>
              Good Morning,
            </Text>
            <Text variant="titleLarge" style={styles.titleText}>
              Downtown Coffee
            </Text>
          </View>
        </View>
        <Surface elevation={2} style={styles.iconSurface}>
          <IconButton icon="bell-outline" size={22} onPress={onBellPress} />
        </Surface>
      </View>
    </Appbar.Header>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    height: 96,
  },
  headerRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileBlock: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: COLORS.primary,
  },
  statusDot: {
    position: "absolute",
    right: 2,
    bottom: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.successBright,
    borderWidth: 2,
    borderColor: COLORS.surface,
  },
  profileText: {
    marginLeft: 12,
  },
  iconSurface: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    color: COLORS.text,
  },
  mutedText: {
    color: COLORS.muted,
  },
});
