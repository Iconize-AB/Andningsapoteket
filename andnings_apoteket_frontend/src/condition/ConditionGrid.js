// src/components/ConditionGrid.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faClock,
  faSun,
  faMoon,
  faEllipsisH,
  faSmile,
  faMusic,
  faYoga,
  faBook,
  faLeaf,
  faFeatherAlt,
  faQuoteRight,
  faTasks,
  faChalkboardTeacher,
} from "@fortawesome/free-solid-svg-icons";
import colors from "../common/colors/Colors";
import { useTranslation } from "react-i18next";
import EnhancedText from "../regular/EnhancedText";

const allFeatures = [
  { icon: faClock, label: "Depressed", id: "depressed" },
  { icon: faSun, label: "Sad", id: "sad" },
  { icon: faMoon, label: "Sleep", id: "sleep" },
  { icon: faSmile, label: "Stressed", id: "stressed" },
  { icon: faMusic, label: "Tired", id: "tired" },
  { icon: faMusic, label: "Yoga", id: "yoga" },
  { icon: faBook, label: "Journal", id: "journal" },
  { icon: faLeaf, label: "Breathe", id: "breathe" },
  { icon: faQuoteRight, label: "Reflect", id: "reflect" },
  { icon: faTasks, label: "Challenges", id: "challenges" },
  { icon: faChalkboardTeacher, label: "Courses", id: "courses" },
  { icon: faFeatherAlt, label: "Intentions", id: "intentions" },
];

const visibleFeatures = allFeatures.slice(0, 3);

const ConditionGrid = ({ navigation }) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const handleToggleMore = () => {
    setExpanded(!expanded);
  };

  const featuresToRender = expanded ? allFeatures : visibleFeatures;

  const navigateToOption = (condition) => {
    // Navigate to VideoListScreen and pass the selected condition
    navigation?.navigate('BreathworkList', { condition: condition });
  };

  return (
    <View style={styles.gridWrapper}>
      <EnhancedText style={styles.gridTitle}>Change 
      your condition</EnhancedText>
      <View style={styles.gridContainer}>
        {featuresToRender.map((feature, index) => (
          <TouchableOpacity
            key={index}
            style={styles.gridItem}
            onPress={() => navigateToOption(feature.label)}
          >
            <FontAwesomeIcon
              icon={feature.icon}
              size={24}
              color={colors.iconColorSecondary}
            />
            <Text style={styles.gridItemText}>{t(feature.label)}</Text>
          </TouchableOpacity>
        ))}
        {!expanded && (
          <TouchableOpacity style={styles.gridItem} onPress={handleToggleMore}>
            <FontAwesomeIcon
              icon={faEllipsisH}
              size={24}
              color={colors.iconColorSecondary}
            />
            <Text style={styles.gridItemText}>{t("More")}</Text>
          </TouchableOpacity>
        )}
        {expanded && (
          <TouchableOpacity
            style={styles.collapseButton}
            onPress={handleToggleMore}
          >
            <Text style={styles.collapseButtonText}>{t("Close")}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridWrapper: {
    marginTop: 10,
  },
  gridTitle: {
    marginLeft: 20,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  gridItem: {
    width: "23%",
    height: 80,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
  gridItemText: {
    fontSize: 14,
    marginTop: 8,
    color: "#000",
  },
  collapseButton: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  collapseButtonText: {
    fontSize: 16,
    color: colors.primary,
  },
});

export default ConditionGrid;
