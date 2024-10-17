import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
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

  const fetchData = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const [playlistsData, libraryData] = await Promise.all([
        FetchUserPlaylists(token),
        FetchUserLibrary(token),
      ]);

      setPlaylists(playlistsData?.lists || []);
      setLibrary(libraryData?.library || []);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDeletePlaylist = useCallback(async (playlistId) => {
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
  }, []);

  const handleDeleteSessions = useCallback(async (sessionIds) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const response = await DeleteUserLibrarySessions(token, sessionIds);
      if (response.ok) {
        setLibrary((prevLibrary) => ({
          ...prevLibrary,
          sessions: prevLibrary.sessions.filter(
            (session) => !sessionIds.includes(session.sessionId)
          ),
        }));
      }
    } catch (error) {
      console.error("Failed to delete sessions", error);
    }
  }, []);

  const renderPlaylists = () => (
    <>
      <EnhancedText style={styles.sectionTitle}>
        {t("your_playlists")}
      </EnhancedText>
      <View style={styles.listContainer}>
        {playlists.length > 0 ? (
          playlists.map((list) => (
            <PlaylistItem
              key={list.id}
              playlist={list}
              onPress={() =>
                navigation.navigate("BreathworkPlaylistDetails", {
                  playlist: list,
                })
              }
              onDelete={() => handleDeletePlaylist(list.id)}
            />
          ))
        ) : (
          <NoResult />
        )}
      </View>
    </>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#1E3A5F" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <EnhancedText style={styles.title}>{t("your_favorites")}</EnhancedText>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
        {activeTab === "playlists" ? (
          renderPlaylists()
        ) : (
          <Library
            library={library}
            handleDeleteSessions={handleDeleteSessions}
            navigation={navigation}
          />
        )}
        <RecommendedSessions />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2E8DC',
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: 20,
  },
  listContainer: {
    marginBottom: 20,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreatedPlayListsScreen;
