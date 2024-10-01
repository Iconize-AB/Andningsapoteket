import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import colors from "../common/colors/Colors";
import { useTranslation } from "react-i18next";
import EnhancedText from "../regular/EnhancedText";
import MostPlayedSessions from "../home/MostPlayedSessions";
import ConditionGrid from "./ConditionGrid";

const ConditionScreen = ({ navigation }) => {
  const navigateToOption = (option) => {
    navigation?.navigate(option);
  };
  const { t } = useTranslation();

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Welcome Text */}
      <EnhancedText style={styles.greetingText}>
        Change your condition
      </EnhancedText>

      {/* Feature grid */}
      <ConditionGrid navigation={navigation} />
      {/* Most played sessions */}
      <MostPlayedSessions />
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
});

export default ConditionScreen;
