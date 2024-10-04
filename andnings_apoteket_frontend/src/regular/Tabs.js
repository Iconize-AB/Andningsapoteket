import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View } from "react-native";
import EnhancedText from "./EnhancedText";
import colors from "../common/colors/Colors";
import { useTranslation } from "react-i18next";

const Tabs = ({ activeTab, setActiveTab }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[
          styles.tabButton,
          activeTab === "playlists" && styles.activeTabButton,
        ]}
        onPress={() => setActiveTab("playlists")}
      >
        <EnhancedText style={styles.tabText}>{t("playlists")}</EnhancedText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tabButton,
          activeTab === "library" && styles.activeTabButton,
        ]}
        onPress={() => setActiveTab("library")}
      >
        <EnhancedText style={styles.tabText}>{t("library")}</EnhancedText>
      </TouchableOpacity>
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  tabButton: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    marginHorizontal: 5,
  },
  activeTabButton: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
