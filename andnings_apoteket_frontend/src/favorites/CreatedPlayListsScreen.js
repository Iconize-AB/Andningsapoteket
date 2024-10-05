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
import { FetchUserLibrary, FetchUserPlaylists, DeleteUserPlaylist } from "../sessions/endpoints/BreatworkSessionActionsEndpoints";
import PlaylistItem from "./PlaylistItem";
import VideoItem from "../regular/VideoItem";
import Icon from "react-native-vector-icons/Ionicons"; // Import Ionicons

const CreatedPlayListsScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [playlists, setPlaylists] = useState([]);
  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("playlists");

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) throw new Error("No token found");

        const data = await FetchUserPlaylists(token);
        if (data) {
          setPlaylists(data?.lists || []);
        }
        const savedData = await FetchUserLibrary(token);
        if (savedData) {
          setLibrary(savedData?.library || []);
        }
      } catch (error) {
        console.error("Failed to fetch sessions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  const handleDeletePlaylist = async (playlistId) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const response = await DeleteUserPlaylist(token, playlistId);
      console.log('response', response);
      if (response.ok) {
        setPlaylists((prevPlaylists) =>
          prevPlaylists.filter((playlist) => playlist.id !== playlistId)
        );
      }
    } catch (error) {
      console.error("Failed to delete playlist", error);
    }
  };

  const renderTabs = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[
          styles.tabButton,
          activeTab === "playlists" && styles.activeTabButton,
        ]}
        onPress={() => setActiveTab("playlists")}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === "playlists" && styles.activeTabText,
          ]}
        >
          {t("playlists")}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tabButton,
          activeTab === "library" && styles.activeTabButton,
        ]}
        onPress={() => setActiveTab("library")}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === "library" && styles.activeTabText,
          ]}
        >
          {t("library")}
        </Text>
      </TouchableOpacity>
    </View>
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
                <View key={index} style={styles.playlistItemContainer}>
                  <PlaylistItem
                    playlist={list}
                    onPress={() =>
                      navigation.navigate("BreathworkPlaylistDetails", {
                        playlist: list,
                      })
                    }
                  />
                  <TouchableOpacity
                    onPress={() => handleDeletePlaylist(list.id)}
                    style={styles.deleteIcon}
                  >
                    <Icon name="trash" size={24} color={colors.primary} />
                  </TouchableOpacity>
                </View>
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
            {library.videos.length > 0 ? (
              <View style={styles.videoRowContainer}>
                {library.videos.map((session, index) => (
                  <VideoItem
                    key={index}
                    session={session}
                    size="small"
                    handlePlayNow={() =>
                      navigation.navigate("IndividualBreathworkSession", {
                        selectedVideo: session,
                      })
                    }
                  />
                ))}
              </View>
            ) : (
              <EnhancedText style={styles.noPlaylistsText}>
                {t("no_sessions_found")}
              </EnhancedText>
            )}
          </View>
        </>
      )}

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
    paddingHorizontal: 10,
    marginTop: 20,
  },
  videoRowContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
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
    justifyContent: "space-between",
    marginVertical: 20,
    marginHorizontal: 20,
    backgroundColor: "#F0F0F0",
    borderRadius: 30,
    padding: 5,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E0E0E0",
    marginHorizontal: 5,
  },
  activeTabButton: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#888",
  },
  activeTabText: {
    color: "#fff",
  },
  deleteIcon: {
    padding: 10,
    position: "absolute",
    top: 0,
    right: 0,
  },
});

export default CreatedPlayListsScreen;
