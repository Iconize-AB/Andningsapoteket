import React from "react";
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from "react-i18next";
import QuickActions from "./QuickActions";
import DayJourney from "./DayJourney";
import MostPlayedSessions from "./MostPlayedSessions";
import EnhancedText from "../regular/EnhancedText";
import colors from "../common/colors/Colors";
import HighlightedSessions from "./HighlightedSessions";

const HomeScreen = ({ navigation }) => {
  const navigateToOption = (option) => {
    navigation?.navigate(option);
  };
  const { t } = useTranslation();

  return (
    <LinearGradient colors={[colors.background, colors.background]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* Welcome Text */}
            <EnhancedText style={styles.greetingText}>Good afternoon</EnhancedText>

            {/* Rounded buttons for quick actions */}
            <QuickActions navigateToOption={navigateToOption} />

            {/* Highlighted sessions */}
            <HighlightedSessions navigateToOption={navigateToOption} />

            {/* Start Your 7 Day Journey */}
            <DayJourney navigateToOption={navigateToOption} />

            {/* Most played sessions */}
            <MostPlayedSessions navigateToOption={navigateToOption} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 120,

  },
  greetingText: {
    fontSize: 28,
    paddingLeft: 20,
    fontWeight: "bold",
    color: "#1E3A5F",
    marginBottom: 20,
    marginTop: 20,
  },
});

export default HomeScreen;
