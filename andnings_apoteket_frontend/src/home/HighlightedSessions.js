import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import EnhancedText from "../regular/EnhancedText";
import { GetHighlightedSessions } from "./endpoints/OverallSessionEndpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SessionItem from "../regular/VideoItem";

const HighlightedSessions = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [highlightedSessions, setHighlightedSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const response = await GetHighlightedSessions(token);
        if (response.ok) {
          const data = await response.json();
          setHighlightedSessions(data?.items);
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
      <EnhancedText style={styles.mostPlayedTitle}>{t("highlighted_sessions")}</EnhancedText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {highlightedSessions?.map((session) => (
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

export default HighlightedSessions;
