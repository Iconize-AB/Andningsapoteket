import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons"; // Importing lock icon
import { LinearGradient } from 'expo-linear-gradient';
import colors from "../common/colors/Colors";
import { useTranslation } from "react-i18next";
import EnhancedText from "../regular/EnhancedText";

const daysData = [
  { day: 1, status: "completed" }, // Green: Completed
  { day: 2, status: "current" },    // White: Current day
  { day: 3, status: "upcoming" },   // Gray: Upcoming
  { day: 4, status: "upcoming" },
  { day: 5, status: "upcoming" },
  { day: 6, status: "upcoming" },
];

const JourneyOverviewScreen = ({ navigation }) => {
  const { t } = useTranslation();

  // Handle navigation or any other action when a day is selected
  const handleDayPress = (day) => {
    if (day.status !== "upcoming") {
      navigation.navigate("IndividualDayScreen", { day: day.day });
    }
  };

  return (
    <View style={styles.container}>
      {/* Journey Title */}
      <EnhancedText style={styles.title}>{t("6 dagars utmaning")}</EnhancedText>

      {/* Scrollable Days List */}
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {daysData.map((dayItem) => (
          <TouchableOpacity
            key={dayItem.day}
            style={[
              styles.dayContainer,
              dayItem.status === "completed" && styles.dayCompleted,
              dayItem.status === "upcoming" && styles.dayUpcoming,
            ]}
            onPress={() => handleDayPress(dayItem)}
            disabled={dayItem.status === "upcoming"} // Disable interaction for upcoming days
          >
            {dayItem.status === "current" ? (
              <LinearGradient
                colors={[colors.primary, colors.secondary]} // Define the gradient colors
                start={[0, 0]}
                end={[1, 1]}
                style={[styles.dayContainer, styles.dayCurrent]} // Apply gradient to the current day
              >
                <EnhancedText style={styles.dayText}>{`Dag ${dayItem.day}`}</EnhancedText>
                <EnhancedText style={styles.currentTag}>{t("Kommande")}</EnhancedText>
              </LinearGradient>
            ) : dayItem.status === "upcoming" ? (
              <View style={styles.lockContainer}>
                <EnhancedText style={styles.dayText}>{`Dag ${dayItem.day}`}</EnhancedText>
                <FontAwesomeIcon icon={faLock} size={24} color="#888" style={styles.lockIcon} />
              </View>
            ) : (
              <EnhancedText style={styles.dayText}>{`Dag ${dayItem.day}`}</EnhancedText>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Buttons at the bottom */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.buttonText}>{t("Avbryt")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.buttonText}>{t("Fortsätt")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.primary,
    marginVertical: 20,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 20,
  },
  dayContainer: {
    height: 120, // Increased height for larger boxes
    marginVertical: 10,
    justifyContent: "center",
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  dayCompleted: {
    backgroundColor: colors.secondary,
  },
  dayCurrent: {
    borderRadius: 12,
    elevation: 8,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 0,
  },
  dayUpcoming: {
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    position: "relative", // For lock icon positioning
  },
  dayText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#FFF",
  },
  currentTag: {
    position: "absolute",
    right: 0,
    backgroundColor: "#3A7BD5",
    paddingHorizontal: 8,
    paddingVertical: 3,
    top: 0,
    borderRadius: 5,
    color: "#FFF",
    fontSize: 14,
  },
  lockIcon: {
    position: "absolute",
    top: -10, // Push the lock above the container
    right: -10, // Push the lock outside the container
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  continueButton: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
});

export default JourneyOverviewScreen;
