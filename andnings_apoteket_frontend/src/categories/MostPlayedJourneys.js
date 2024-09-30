import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import EnhancedText from "../regular/EnhancedText";
import testImage from "../resources/test_image.jpg";
import VideoItem from "../regular/VideoItem";

const mostPlayedSessionsData = [
  {
    id: 1,
    title: "Morgon breathwork",
    description: "Start your day with a calm mind and relaxed body.",
    imageUrl: testImage,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: 2,
    title: "Lugn Breathwork",
    description: "Focus on your breath and stay present in the moment.",
    imageUrl: testImage,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: 3,
    title: "Guidad Breathwork",
    description: "Release tension and experience a state of relaxation.",
    imageUrl: testImage,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
];

const MostPlayedJourneys = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handlePlayNow = (session) => {
    navigation.navigate("IndividualBreathworkSession", { selectedVideo: session });
  };

  return (
    <View style={styles.mostPlayedContainer}>
      <EnhancedText style={styles.mostPlayedTitle}>{t("most_played_journeys")}</EnhancedText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {mostPlayedSessionsData.map((session) => (
          <VideoItem session={session} handlePlayNow={handlePlayNow}  />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mostPlayedContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  mostPlayedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  horizontalScroll: {
    flexDirection: "row",
  },
});

export default MostPlayedJourneys;
