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
        <EnhancedText
          style={[
            styles.tabText,
            activeTab === "playlists" && styles.activeTabText,
          ]}
        >
          {t("playlists")}
        </EnhancedText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tabButton,
          activeTab === "library" && styles.activeTabButton,
        ]}
        onPress={() => setActiveTab("library")}
      >
        <EnhancedText
          style={[
            styles.tabText,
            activeTab === "library" && styles.activeTabText,
          ]}
        >
          {t("library")}
        </EnhancedText>
      </TouchableOpacity>
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 20,
    marginHorizontal: 20,
    backgroundColor: colors.background,
    borderRadius: 25,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e0e0e0",
    marginHorizontal: 5,
  },
  activeTabButton: {
    backgroundColor: colors.primary,
    elevation: 5,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
