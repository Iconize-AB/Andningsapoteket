import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import EnhancedText from "../regular/EnhancedText";
import { GetMostPlayedSessions } from "./endpoints/OverallSessionEndpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SessionItem from "../regular/VideoItem";

const MostPlayedSessions = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [mostPlayedSessions, setMostPlayedSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const response = await GetMostPlayedSessions(token);
        if (response.ok) {
          const data = await response.json();
          setMostPlayedSessions(data?.sessions);
        } else {
          console.log('Error fetching breathwork sessions:', response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch breathwork sessions", error);
      }
    };
    fetchSessions();
  }, []);

  const handlePlayNow = (session) => {
    navigation.navigate("IndividualBreathworkSession", { session: session });
  };

  return (
    <View style={styles.mostPlayedContainer}>
      <EnhancedText style={styles.mostPlayedTitle}>{t("most_played_sessions")}</EnhancedText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {mostPlayedSessions?.map((session) => (
          <SessionItem 
            key={session.id}
            session={session} 
            handlePlayNow={handlePlayNow}  
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mostPlayedContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
    paddingLeft: 20,
  },
  mostPlayedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E3A5F",
    marginBottom: 10,
  },
  horizontalScroll: {
    flexDirection: "row",
  },
});

export default MostPlayedSessions;
