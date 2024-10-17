import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCheckCircle,
  faHeartbeat,
  faHeart,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import EnhancedText from "../regular/EnhancedText";

const QuickActions = ({ navigateToOption }) => {
  const { t } = useTranslation();

  const actions = [
    { icon: faCheckCircle, text: t("breathwork_library"), route: "Library" },
    { icon: faHeartbeat, text: t("condition"), route: "Condition" },
    { icon: faHeart, text: t("favorites"), route: "Favorites" },
    { icon: faBook, text: t("breatwork_journeys"), route: "Categories" },
  ];

  return (
    <View style={styles.quickActionsContainer}>
      {actions.map((action, index) => (
        <TouchableOpacity
          key={index}
          style={styles.actionButton}
          onPress={() => navigateToOption(action.route)}
          activeOpacity={0.8}
        >
          <FontAwesomeIcon icon={action.icon} size={24} color="#1E3A5F" />
          <EnhancedText style={styles.actionText}>{action.text}</EnhancedText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  quickActionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
  },
  actionButton: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 16,
    width: "48%",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    fontSize: 14,
    color: "#1E3A5F",
    marginTop: 10,
    textAlign: "center",
    fontWeight: "600",
  },
});

export default QuickActions;
