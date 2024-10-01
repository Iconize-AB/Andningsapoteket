import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import colors from "../common/colors/Colors";
import { useTranslation } from "react-i18next";
import EnhancedText from "../regular/EnhancedText";
import RecommendedSessions from "../recommendations/RecommendedSessions";
import FeatherIcon from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FetchUserPlaylists } from "../sessions/endpoints/BreatworkSessionActionsEndpoints";

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
            <TouchableOpacity
              key={index}
              style={styles.listItem}
              onPress={() =>
                navigation.navigate("BreathworkPlaylistDetails", {
                  playlist: list,
                })
              }
            >
              <View style={styles.listContent}>
                <View>
                  <EnhancedText style={styles.listTitle}>
                    {list.name}
                  </EnhancedText>
                  <EnhancedText style={styles.listDescription}>
                    {list.description}
                  </EnhancedText>
                </View>
                <FeatherIcon name="chevron-right" size={24} color="#ccc" />
              </View>
            </TouchableOpacity>
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
  listItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  listDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
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
