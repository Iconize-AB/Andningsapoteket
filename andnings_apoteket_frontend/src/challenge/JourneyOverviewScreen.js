import React from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLock, faCheckCircle, faCircle } from "@fortawesome/free-solid-svg-icons";
import { LinearGradient } from 'expo-linear-gradient';
import colors from "../common/colors/Colors";
import { useTranslation } from "react-i18next";
import EnhancedText from "../regular/EnhancedText";

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth * 0.8; // 80% of screen width

const daysData = [
  { day: 1, status: "completed", title: "Introduktion" },
  { day: 2, status: "current", title: "Mindfulness" },
  { day: 3, status: "upcoming", title: "Stresshantering" },
  { day: 4, status: "upcoming", title: "Sömn" },
  { day: 5, status: "upcoming", title: "Kost" },
  { day: 6, status: "upcoming", title: "Reflektion" },
];

const JourneyOverviewScreen = ({ navigation }) => {
  const { t } = useTranslation();

  const handleDayPress = (day) => {
    if (day.status !== "upcoming") {
      navigation.navigate("IndividualDayScreen", { day: day.day });
    }
  };

  const renderDayItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleDayPress(item)}
      disabled={item.status === "upcoming"}
      style={styles.dayItemContainer}
    >
      <LinearGradient
        colors={item.status === "upcoming" ? ['#F0F0F0', '#E0E0E0'] : ['#1E3A5F', '#091D34']}
        style={styles.dayItem}
      >
        <View style={styles.dayIconContainer}>
          {item.status === "completed" && <FontAwesomeIcon icon={faCheckCircle} size={24} color="#FFFFFF" />}
          {item.status === "current" && <FontAwesomeIcon icon={faCircle} size={24} color="#FFFFFF" />}
          {item.status === "upcoming" && <FontAwesomeIcon icon={faLock} size={24} color="#CCCCCC" />}
        </View>
        <View style={styles.dayContent}>
          <EnhancedText style={[styles.dayText, item.status === "upcoming" && styles.upcomingText]}>
            {t("Dag")} {item.day}
          </EnhancedText>
          <EnhancedText style={[styles.dayTitle, item.status === "upcoming" && styles.upcomingText]}>
            {item.title}
          </EnhancedText>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <EnhancedText style={styles.title}>{t("6 dagars utmaning")}</EnhancedText>
        <FlatList
          data={daysData}
          renderItem={renderDayItem}
          keyExtractor={(item) => item.day.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.cancelButton}>
            <EnhancedText style={styles.cancelButtonText}>{t("Avbryt")}</EnhancedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.continueButton}>
            <EnhancedText style={styles.continueButtonText}>{t("Fortsätt")}</EnhancedText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 80, // Add padding at the bottom for the menu
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    marginVertical: 20,
  },
  listContent: {
    paddingBottom: 20, // Add some padding to the bottom of the list
  },
  dayItemContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  dayItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: cardWidth,
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dayIconContainer: {
    width: 40,
    alignItems: 'center',
  },
  dayContent: {
    flex: 1,
    marginLeft: 12,
  },
  dayText: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.8,
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  upcomingText: {
    color: "#888",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 10, // Reduced bottom margin
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 25,
    paddingVertical: 12,
    marginRight: 10,
    alignItems: 'center',
  },
  continueButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 25,
    paddingVertical: 12,
    marginLeft: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default JourneyOverviewScreen;
