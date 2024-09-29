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
        style={[styles.actionButton, styles.shadowEffect]}
        onPress={() => navigateToOption("Library")}
        activeOpacity={0.9}
      >
        <FontAwesomeIcon
          icon={faCheckCircle}
          size={24}
          color={colors.iconColor}
        />
        <Text style={styles.actionText}>{t("breathwork_library")}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, styles.shadowEffect]}
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
        style={[styles.actionButton, styles.shadowEffect]}
        onPress={() => navigateToOption("Favorites")}
      >
        <FontAwesomeIcon icon={faHeart} size={20} color={colors.iconColor} />
        <Text style={styles.actionText}>{t("favorites")}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, styles.shadowEffect]}
        onPress={() => navigateToOption("Categories")}
      >
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
    borderRadius: 15,
    padding: 16,
    width: "48%",
    marginBottom: 15,
    background: `linear-gradient(145deg, ${colors.secondary}, #cccccc)`,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  shadowEffect: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 15,
  },
  actionText: {
    fontSize: 14,
    color: "#fff",
    marginTop: 10,
    textAlign: "center",
    fontWeight: "600",
  },
});

export default QuickActions;
