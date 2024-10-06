import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import EnhancedText from "./EnhancedText";
import colors from "../common/colors/Colors";

const Tabs = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.tabButton,
            activeTab === tab.value && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab(tab.value)}
        >
          <EnhancedText
            style={[
              styles.tabText,
              activeTab === tab.value && styles.activeTabText,
            ]}
          >
            {tab.label}
          </EnhancedText>
        </TouchableOpacity>
      ))}
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
