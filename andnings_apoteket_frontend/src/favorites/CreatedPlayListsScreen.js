import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import EnhancedText from "../regular/EnhancedText";
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
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faMusic, faBook } from "@fortawesome/free-solid-svg-icons";

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
    <View style={styles.sectionContainer}>
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
  );

  if (loading) {
    return (
      <LinearGradient colors={['#1E3A5F', '#091D34']} style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#F2E8DC" />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#1E3A5F', '#091D34']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <EnhancedText style={styles.title}>{t("Your Favorites")}</EnhancedText>
            <TouchableOpacity onPress={() => {/* Add new playlist logic */}}>
              <FontAwesomeIcon icon={faPlus} size={24} color="#A0C8F9" />
            </TouchableOpacity>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <FontAwesomeIcon icon={faMusic} size={24} color="#F2E8DC" />
              <EnhancedText style={styles.statValue}>{playlists.length}</EnhancedText>
              <EnhancedText style={styles.statLabel}>{t("Playlists")}</EnhancedText>
            </View>
            <View style={styles.statItem}>
              <FontAwesomeIcon icon={faBook} size={24} color="#F2E8DC" />
              <EnhancedText style={styles.statValue}>{library.length}</EnhancedText>
              <EnhancedText style={styles.statLabel}>{t("Library")}</EnhancedText>
            </View>
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === "playlists" && styles.activeTab]}
              onPress={() => setActiveTab("playlists")}
            >
              <EnhancedText style={[styles.tabText, activeTab === "playlists" && styles.activeTabText]}>
                {t("Playlists")}
              </EnhancedText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === "library" && styles.activeTab]}
              onPress={() => setActiveTab("library")}
            >
              <EnhancedText style={[styles.tabText, activeTab === "library" && styles.activeTabText]}>
                {t("Library")}
              </EnhancedText>
            </TouchableOpacity>
          </View>

          {activeTab === "playlists" ? renderPlaylists() : <Library library={library} handleDeleteSessions={handleDeleteSessions} navigation={navigation} />}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 16,
    color: '#A0C8F9',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#A0C8F9',
  },
  tabText: {
    fontSize: 18,
    color: '#A0C8F9',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  sectionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    overflow: 'hidden',
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreatedPlayListsScreen;
