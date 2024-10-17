// src/components/DayJourney.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import colors from "../common/colors/Colors"; // Assuming you have this color file
import { useTranslation } from "react-i18next";
import EnhancedButton from "../regular/EnhancedButton";
import EnhancedText from "../regular/EnhancedText";
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetSixDayChallenge } from "./endpoints/6DayChallengeEndpoints";

const DayJourney = ({ navigateToOption }) => {
  const { t } = useTranslation();
  const [challengeData, setChallengeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallengeData = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const response = await GetSixDayChallenge(token);
        
        if (response.ok) {
          const data = await response.json();
          setChallengeData(data.challenges[0]);
        } else {
          console.error("Failed to fetch challenge data");
        }
      } catch (error) {
        console.error("Error fetching challenge data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChallengeData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#1E3A5F" />;
  }

  if (!challengeData) {
    return <EnhancedText>No challenge data available</EnhancedText>;
  }

  return (
    <View style={styles.journeyContainer}>
      <EnhancedText style={styles.journeyTitle}>
        {challengeData.title}
      </EnhancedText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalScroll}
      >
        {challengeData.sessions.map((session) => (
          <TouchableOpacity
            key={session.id}
            onPress={() => navigateToOption("JourneyOverviewScreen", { sessionId: session.id })}
          >
            <LinearGradient
              colors={['#1E3A5F', '#091D34']}
              style={styles.card}
            >
              <EnhancedText style={styles.cardDayText}>
                {t("start_day", { day: session.day })}
              </EnhancedText>
              <EnhancedText style={styles.cardTitle}>
                {session.title}
              </EnhancedText>
              <EnhancedText style={styles.cardSubtitle}>
                {session.description}
              </EnhancedText>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  journeyContainer: {
    marginBottom: 20,
    paddingLeft: 20,
  },
  journeyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E3A5F",
    marginBottom: 10,
  },
  horizontalScroll: {
    flexDirection: "row",
  },
  card: {
    width: 200,
    height: 200,
    marginRight: 15,
    borderRadius: 10,
    padding: 15,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardDayText: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.8,
  },
});

export default DayJourney;
