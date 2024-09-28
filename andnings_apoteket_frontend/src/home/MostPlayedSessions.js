import React from "react";
import { View, Text, ImageBackground, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import EnhancedText from "../regular/EnhancedText";
import colors from "../common/colors/Colors";
import EnhancedButton from "../regular/EnhancedButton";
import testImage from "../resources/test_image.jpg";

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

const MostPlayedSessions = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handlePlayNow = (session) => {
    navigation.navigate("IndividualBreathworkSession", { selectedVideo: session });
  };

  return (
    <View style={styles.mostPlayedContainer}>
      <EnhancedText style={styles.mostPlayedTitle}>{t("most_played_sessions")}</EnhancedText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {mostPlayedSessionsData.map((session) => (
          <View key={session.id} style={styles.card}>
            <View style={styles.cardImage}>
              <View style={styles.cardOverlay}>
                <EnhancedText style={styles.cardTitle}>{session.title}</EnhancedText>
                <EnhancedText style={styles.cardSubtitle}>{session.description}</EnhancedText>
                <EnhancedButton size="small" title={t("play_now")} onPress={() => handlePlayNow(session)} />
              </View>
            </View>
          </View>
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
    backgroundColor: colors.secondary,
    padding: 20,
    width: "100%",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#fff",
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

export default MostPlayedSessions;
