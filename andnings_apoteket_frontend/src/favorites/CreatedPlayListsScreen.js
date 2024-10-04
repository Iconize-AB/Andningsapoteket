import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from "react-native";
import colors from "../common/colors/Colors";
import { useTranslation } from "react-i18next";
import EnhancedText from "../regular/EnhancedText";
import RecommendedSessions from "../recommendations/RecommendedSessions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FetchUserLibrary,
  FetchUserPlaylists,
} from "../sessions/endpoints/BreatworkSessionActionsEndpoints";
import PlaylistItem from "./PlaylistItem"; // Import the new PlaylistItem component
import Tabs from "../regular/Tabs";
import VideoItem from "../regular/VideoItem";

const CreatedPlayListsScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [playlists, setPlaylists] = useState([]);
  const [library, setLibrary] = useState([]); // State for saved sessions
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("playlists"); // State for active tab

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) throw new Error("No token found");

        if (activeTab === "playlists") {
          const data = await FetchUserPlaylists(token);
          if (data) {
            setPlaylists(data?.lists || []);
          }
        } else {
          const savedData = await FetchUserLibrary(token);
          if (savedData) {
            setLibrary(savedData?.lists || []);
          }
        }
      } catch (error) {
        console.error("Failed to fetch sessions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  const renderTabs = () => (
    <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
  );

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
      {/* Render Tabs */}
      {renderTabs()}

      {/* Conditionally render content based on the active tab */}
      {activeTab === "playlists" ? (
        <>
          <EnhancedText style={styles.greetingText}>
            {t("your_playlists")}
          </EnhancedText>
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
        </>
      ) : (
        <>
          <EnhancedText style={styles.greetingText}>
            {t("your_library")}
          </EnhancedText>
          <View style={styles.listContainer}>
            {library.length > 0 ? (
              library.map((session, index) => (
                <VideoItem
                  session={session}
                  key={index}
                  onPress={() =>
                    navigation.navigate("IndividualBreathworkSession", {
                      selectedVideo: session,
                    })
                  }
                />
              ))
            ) : (
              <EnhancedText style={styles.noPlaylistsText}>
                {t("no_sessions_found")}
              </EnhancedText>
            )}
          </View>
        </>
      )}
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
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  tabButton: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    marginHorizontal: 5,
  },
  activeTabButton: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});

export default CreatedPlayListsScreen;
