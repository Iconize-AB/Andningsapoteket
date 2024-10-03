import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import EnhancedText from "../regular/EnhancedText";
import colors from "../common/colors/Colors";
import EnhancedButton from "../regular/EnhancedButton";
import testImage from "../resources/test_image.jpg";
import VideoItem from "../regular/VideoItem";
import { GetMostPlayedSessions } from "./endpoints/OverallSessionEndpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MostPlayedSessions = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [mostPlayedSessions, setMostPlayedSessions] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const response = await GetMostPlayedSessions(token);
        console.log('response', response);
        if (response.ok) {
          const data = await response.json();
          setMostPlayedSessions(data?.videos);
        } else {
          console.log('Error fetching breathwork sessions:', response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch breathwork sessions", error);
      }
    };
    fetchVideos();
  }, []);

  const handlePlayNow = (session) => {
    navigation.navigate("IndividualBreathworkSession", { selectedVideo: session });
  };

  return (
    <View style={styles.mostPlayedContainer}>
      <EnhancedText style={styles.mostPlayedTitle}>{t("most_played_sessions")}</EnhancedText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {mostPlayedSessions.map((session) => (
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

export default MostPlayedSessions;
