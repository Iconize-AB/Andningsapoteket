// src/components/QuickActions.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheckCircle, faHeartbeat, faHeart, faBook } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import colors from "../common/colors/Colors"; // Assuming your colors are here

const QuickActions = () => {
  const { t } = useTranslation(); // Translation hook

  return (
    <View style={styles.quickActions}>
      <TouchableOpacity style={styles.actionButton}>
        <FontAwesomeIcon icon={faCheckCircle} size={20} color={colors.iconColor} />
        <Text style={styles.actionText}>{t('build_habit')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton}>
        <FontAwesomeIcon icon={faHeartbeat} size={20} color={colors.iconColor} />
        <Text style={styles.actionText}>{t('condition')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton}>
        <FontAwesomeIcon icon={faHeart} size={20} color={colors.iconColor} />
        <Text style={styles.actionText}>{t('favorites')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton}>
        <FontAwesomeIcon icon={faBook} size={20} color={colors.iconColor} />
        <Text style={styles.actionText}>{t('library')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  actionButton: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
  },
  actionText: {
    fontSize: 14,
    color: "#000",
    marginTop: 10,
  },
});

export default QuickActions;
