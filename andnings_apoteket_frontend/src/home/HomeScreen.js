import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBook, faCheckCircle, faHeart, faHeartbeat, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import colors from "../common/colors/Colors";
import { useTranslation } from "react-i18next";
import QuickActions from "./QuickActions";
import DayJourney from "./DayJourney";
import MostPlayedSessions from "./MostPlayedSessions";

const HomeScreen = ({ navigation }) => {
  const navigateToOption = (option) => {
    navigation?.navigate(option);
  };
  const { t } = useTranslation();

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
      {/* Welcome Text */}
      <Text style={styles.greetingText}>Good afternoon</Text>

      {/* Rounded buttons for quick actions */}

      <QuickActions />

      {/* Start Your 7 Day Journey */}
      
      <DayJourney />

      {/* Start Your 7 Day Journey */}

      <MostPlayedSessions />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingBottom: 120,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  rightHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  userIcon: {
    marginLeft: 15,
  },
  greetingText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  journeyContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  journeyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  horizontalScroll: {
    flexDirection: "row",
  },
  card: {
    width: 250,
    marginRight: 15,
    borderRadius: 10,
    overflow: "hidden",
  },
  cardImage: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  cardOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
    width: "100%",
  },
  cardDayText: {
    fontSize: 14,
    color: "#fff",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#fff",
    marginTop: 10,
  },
  cardButton: {
    backgroundColor: "#0066FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 15,
  },
  cardButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default HomeScreen;
