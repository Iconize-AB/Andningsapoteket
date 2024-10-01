import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
} from "react-native";
import colors from "../common/colors/Colors";
import { useTranslation } from "react-i18next";
import EnhancedText from "../regular/EnhancedText";
import RecommendedSessions from "../recommendations/RecommendedSessions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FetchUserPlaylists } from "../sessions/endpoints/BreatworkSessionActionsEndpoints";
import PlaylistItem from "./PlaylistItem"; // Import the new PlaylistItem component

const CreatedPlayListsScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) throw new Error("No token found");

        const data = await FetchUserPlaylists(token);
        if (data) {
          setPlaylists(data?.lists || []);
        }
      } catch (error) {
        console.error("Failed to fetch breathwork sessions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Welcome Text */}
      <EnhancedText style={styles.greetingText}>
        {t("your_playlists")}
      </EnhancedText>

      {/* Render fetched breathwork playlists */}
      <View style={styles.listContainer}>
        {playlists.length > 0 ? (
          playlists.map((list, index) => (
            <PlaylistItem
              key={index}
              playlist={list}
              onPress={() =>
                navigation.navigate("BreathworkPlaylistDetails", {
                  playlist: list,
                })
              }
            />
          ))
        ) : (
          <EnhancedText style={styles.noPlaylistsText}>
            {t("no_playlists_found")}
          </EnhancedText>
        )}
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
  noPlaylistsText: {
    textAlign: "center",
    color: "#666",
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
});

export default CreatedPlayListsScreen;
