import React, { useState } from "react";
import { StyleSheet, ScrollView, View, TouchableOpacity } from "react-native";
import colors from "../common/colors/Colors";
import { useTranslation } from "react-i18next";
import EnhancedText from "../regular/EnhancedText";
import MostPlayedSessions from "../home/MostPlayedSessions";
import FeatherIcon from "react-native-vector-icons/Feather"; // For arrow icon
import RecommendedSessions from "../recommendations/RecommendedSessions";

const CreatedListScreen = ({ navigation }) => {
  const { t } = useTranslation();

  // Dummy data for the breathwork lists
  const [breathworkLists] = useState([
    {
      id: 1,
      name: "Morning Breathwork",
      description: "Start your day with this energizing session.",
    },
    {
      id: 2,
      name: "Evening Calm",
      description: "Relax and unwind with this calming breathwork.",
    },
    {
      id: 3,
      name: "Focus Session",
      description: "Improve your concentration with this session.",
    },
    {
      id: 4,
      name: "Sleep Preparation",
      description: "Prepare your mind and body for restful sleep.",
    },
  ]);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Welcome Text */}
      <EnhancedText style={styles.greetingText}>
        {t("your_playlists")}
      </EnhancedText>

      {/* Render dummy breathwork lists */}
      <View style={styles.listContainer}>
        {breathworkLists.map((list, index) => (
          <TouchableOpacity
            key={index}
            style={styles.listItem}
            onPress={() => navigation.navigate("BreathworkDetails", { sessionId: list.id })}
          >
            <View style={styles.listContent}>
              <View>
                <EnhancedText style={styles.listTitle}>{list.name}</EnhancedText>
                <EnhancedText style={styles.listDescription}>{list.description}</EnhancedText>
              </View>
              <FeatherIcon name="chevron-right" size={24} color="#ccc" />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recommended sessions for the user */}
      <RecommendedSessions />
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
  listContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  listItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  listDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});

export default CreatedListScreen;
