import React from "react";
import {
  StyleSheet,
  ScrollView,
} from "react-native";
import colors from "../common/colors/Colors";
import { useTranslation } from "react-i18next";
import QuickActions from "./QuickActions";
import DayJourney from "./DayJourney";
import MostPlayedSessions from "./MostPlayedSessions";
import EnhancedText from "../regular/EnhancedText";

const HomeScreen = ({ navigation }) => {
  const navigateToOption = (option) => {
    navigation?.navigate(option);
  };
  const { t } = useTranslation();

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
      {/* Welcome Text */}
      <EnhancedText style={styles.greetingText}>Good afternoon</EnhancedText>

      {/* Rounded buttons for quick actions */}

      <QuickActions navigateToOption={navigateToOption} />

      {/* Start Your 7 Day Journey */}
      
      <DayJourney navigateToOption={navigateToOption} />

      {/* Most played sessions */}

      <MostPlayedSessions navigateToOption={navigateToOption} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingBottom: 120,
    backgroundColor: colors.background,
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
});

export default HomeScreen;
