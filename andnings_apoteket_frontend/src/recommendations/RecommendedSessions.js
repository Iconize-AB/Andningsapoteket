// src/components/MostPlayedSessions.js
import React from "react";
import { View, Text, ImageBackground, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

const mostPlayedSessionsData = [
  {
    id: 1,
    title: "Morgon breathwork",
    description: "Start your day with a calm mind and relaxed body.",
    imageUrl: "https://img.freepik.com/free-vector/open-air-yoga-class_23-2148653272.jpg",
  },
  {
    id: 2,
    title: "Lugn Breathwork",
    description: "Focus on your breath and stay present in the moment.",
    imageUrl: "https://media.istockphoto.com/id/1388130815/vector/woman-meditating-with-mindfulness-imagination-in-nature-and-flowers-concept-illustration-for.jpg?s=612x612&w=0&k=20&c=CSLJFtUgD6Gfr5d_Z7j7xFMngfchMGOU5H4nggv3Nis=",
  },
  {
    id: 3,
    title: "Guidad Breathwork",
    description: "Release tension and experience a state of relaxation.",
    imageUrl: "https://media.istockphoto.com/id/1299679815/vector/relaxed-male-character-in-home-clothes-and-slippers-sitting-in-comfortable-chair-yawning-man.jpg?s=612x612&w=0&k=20&c=s4OxVgFYYadB1g48qKQuRlGxcZMXqaKVLrCTcMntO1w=",
  },
];

const RecommendedSessions = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.mostPlayedContainer}>
      <Text style={styles.mostPlayedTitle}>{t("recommended_sessions")}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {mostPlayedSessionsData.map((session) => (
          <View key={session.id} style={styles.card}>
            <ImageBackground source={{ uri: session.imageUrl }} style={styles.cardImage}>
              <View style={styles.cardOverlay}>
                <Text style={styles.cardTitle}>{session.title}</Text>
                <Text style={styles.cardSubtitle}>{session.description}</Text>
                <TouchableOpacity style={styles.cardButton}>
                  <Text style={styles.cardButtonText}>{t("play_now")}</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mostPlayedContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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

export default RecommendedSessions;
