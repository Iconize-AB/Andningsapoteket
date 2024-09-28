// src/components/QuickActions.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCheckCircle,
  faHeartbeat,
  faHeart,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import colors from "../common/colors/Colors";

const QuickActions = ({ navigateToOption }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.quickActionsContainer}>
      <TouchableOpacity
        style={styles.actionButton}
      >
        <FontAwesomeIcon
          icon={faCheckCircle}
          size={20}
          color={colors.iconColor}
        />
        <Text style={styles.actionText}>{t("breathwork_library")}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigateToOption("Condition")}
      >
        <FontAwesomeIcon
          icon={faHeartbeat}
          size={20}
          color={colors.iconColor}
        />
        <Text style={styles.actionText}>{t("condition")}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigateToOption("Favorites")}
      >
        <FontAwesomeIcon icon={faHeart} size={20} color={colors.iconColor} />
        <Text style={styles.actionText}>{t("favorites")}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={() => navigateToOption("Categories")}>
        <FontAwesomeIcon icon={faBook} size={20} color={colors.iconColor} />
        <Text style={styles.actionText}>{t("breatwork_journeys")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  quickActionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  actionButton: {
    alignItems: "center",
    backgroundColor: colors.secondary,
    borderRadius: 8,
    padding: 16,
    width: "48%",
    marginBottom: 15,
  },
  actionText: {
    fontSize: 14,
    color: "#fff",
    marginTop: 10,
    textAlign: "center",
  },
});

export default QuickActions;
