import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import EnhancedText from "./EnhancedText";

const ActionMenu = ({ isVisible, options, onSelectOption }) => {
  return (
    <View style={[styles.menu, { display: isVisible ? "flex" : "none" }]}>
      {options.map(
        (option) =>
          option.isShow && (
            <TouchableOpacity
              key={option.label}
              style={styles.menuItem}
              onPress={() => onSelectOption(option)}
            >
              <EnhancedText style={styles.menuItemText}>{option.label}</EnhancedText>
              <View style={styles.iconContainer}>{option.icon}</View>
            </TouchableOpacity>
          )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    position: "absolute",
    top: 50,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    display: "flex",
    gap: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuItemText: {
    fontSize: 16,
    color: "#000",
  },
});

export default ActionMenu;
