// src/components/DayJourney.js
import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import colors from "../common/colors/Colors"; // Assuming you have this color file
import { useTranslation } from "react-i18next";
import EnhancedButton from "../regular/EnhancedButton";
import EnhancedText from "../regular/EnhancedText";

const daysData = [
  {
    day: 1,
    imageUrl:
      "https://media.istockphoto.com/id/1357733473/vector/sweet-dreams-concept.jpg?s=612x612&w=0&k=20&c=j5uJIgYYAteMDzj5hBGci_tts8ReiTJWrxWBgDbOF5A=",
  },
  {
    day: 2,
    imageUrl:
      "https://media.istockphoto.com/id/1299679815/vector/relaxed-male-character-in-home-clothes-and-slippers-sitting-in-comfortable-chair-yawning-man.jpg?s=612x612&w=0&k=20&c=s4OxVgFYYadB1g48qKQuRlGxcZMXqaKVLrCTcMntO1w=",
  },
  {
    day: 3,
    imageUrl:
      "https://media.istockphoto.com/id/1275828972/vector/sick-person-suffering-from-vertigo.jpg?s=612x612&w=0&k=20&c=Zb8fAQUswMHl_g7sHujAAHBNAVJXvaMcw8WKOEsGKZY=",
  },
  {
    day: 4,
    imageUrl:
      "https://www.mindful.org/content/uploads/A-10-Minute-Meditation-for-Deep-Relaxation-and-Ease.jpg",
  },
  {
    day: 5,
    imageUrl:
      "https://images.pond5.com/focus-abstract-concept-vector-illustration-illustration-170779240_iconl_nowm.jpeg",
  },
  {
    day: 6,
    imageUrl:
      "https://media.istockphoto.com/id/1358081661/vector/mental-health-mind-or-psychology-therapy-vector-illustration-with-human-hand-watering.jpg?s=612x612&w=0&k=20&c=eFMP-lXSdiklp9vN3QT1v6WfyDsFg_3SFo7-CKG1HGI=",
  },
];

const DayJourney = ({ navigateToOption }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.journeyContainer}>
      <EnhancedText style={styles.journeyTitle}>
        {t("start_your_journey")}
      </EnhancedText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalScroll}
      >
        {daysData.map((dayItem) => (
          <View key={dayItem.day} style={styles.card}>
            <View style={styles.cardImage}>
              <View style={styles.cardOverlay}>
                <EnhancedText style={styles.cardDayText}>
                  {t("start_day", { day: dayItem.day })}
                </EnhancedText>
                <EnhancedText style={styles.cardTitle}>
                  {t(`days.${dayItem.day}.title`)}
                </EnhancedText>
                <EnhancedText style={styles.cardSubtitle}>
                  {t(`days.${dayItem.day}.description`)}
                </EnhancedText>
                <EnhancedButton
                  title={dayItem.day === 1 ? t("Start") : t("Explore")} // Conditional button text
                  onPress={() => navigateToOption("JourneyOverviewScreen")}
                  size="small"
                  type="solid"
                />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  journeyContainer: {
    paddingHorizontal: 10,
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
    height: 250,
    marginRight: 15,
    borderRadius: 10,
    overflow: "hidden",
  },
  cardImage: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: colors.secondary,
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

export default DayJourney;
