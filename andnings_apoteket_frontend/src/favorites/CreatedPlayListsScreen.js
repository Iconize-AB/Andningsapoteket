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
  DeleteUserPlaylist,
  DeleteUserLibrarySessions,
} from "../sessions/endpoints/BreatworkSessionActionsEndpoints";
import PlaylistItem from "./PlaylistItem";
import Icon from "react-native-vector-icons/Ionicons";
import Library from "./Library";
import NoResult from "../regular/NoResult";
import Tabs from "../regular/Tabs";

const CreatedPlayListsScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [playlists, setPlaylists] = useState([]);
  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState(true);
  const tabs = [
    { label: "Playlists", value: "playlists" },
    { label: "Library", value: "library" },
  ];
  const [activeTab, setActiveTab] = useState("playlists");

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) throw new Error("No token found");

        const data = await FetchUserPlaylists(token);
        console.log("data", data);
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
      if (response.ok) {
        setPlaylists((prevPlaylists) =>
          prevPlaylists.filter((playlist) => playlist.id !== playlistId)
        );
      }
    } catch (error) {
      console.error("Failed to delete playlist", error);
    }
  };

  const handleDeleteSessions = async (sessionIds) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const response = await DeleteUserLibrarySessions(token, sessionIds);
      if (response.ok) {
        setLibrary((prevLibrary) => ({
          ...prevLibrary,
          videos: prevLibrary.videos.filter(
            (session) => !sessionIds.includes(session.videoId)
          ),
        }));
      }
    } catch (error) {
      console.error("Failed to delete sessions", error);
    }
  };

  const renderTabs = () => (
    <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
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
              <View>
                <NoResult />
              </View>
            )}
          </View>
        </>
      ) : (
          <Library
            library={library}
            handleDeleteSessions={handleDeleteSessions}
            navigation={navigation}
          />
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
