import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import EnhancedText from "../regular/EnhancedText";
import { FetchRelatedSessionsList } from "./endpoints/BreatworkSessionActionsEndpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SessionItem from "../regular/VideoItem";

const RelatedSessions = ({ sessionId }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [relatedSessions, setRelatedSessions] = useState([]);
  useEffect(() => {
    const fetchRelatedSessions = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const response = await FetchRelatedSessionsList(token, sessionId);
        if (response?.items) {
          setRelatedSessions(response.items);
        } else {
          console.log('Error fetching related sessions:', response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch breathwork sessions", error);
      }
    };
    fetchRelatedSessions();
  }, []);

  const handlePlayNow = (session) => {
    navigation.navigate("IndividualBreathworkSession", {
      session: session,
    });
  };

  return (
    <View style={styles.mostPlayedContainer}>
      <EnhancedText style={styles.mostPlayedTitle}>
        {t("related_sessions")}
      </EnhancedText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalScroll}
      >
        {relatedSessions.map((session) => (
          <SessionItem session={session} handlePlayNow={handlePlayNow} />
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

export default RelatedSessions;
