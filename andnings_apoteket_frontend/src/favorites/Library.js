import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { useTranslation } from "react-i18next";
import colors from "../common/colors/Colors";
import Icon from "react-native-vector-icons/Ionicons";
import EnhancedText from "../regular/EnhancedText";

const Library = ({ library, handleDeleteSessions, navigation }) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSessions, setSelectedSessions] = useState([]);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    setSelectedSessions([]);
  };

  const handleSelectSession = (videoId) => {
    if (selectedSessions.includes(videoId)) {
        setSelectedSessions(selectedSessions.filter((id) => id !== videoId));
    } else {
        setSelectedSessions([...selectedSessions, videoId]);
    }
  };

  const handleDeleteSelectedSessions = async () => {
    handleDeleteSessions(selectedSessions);
    setSelectedSessions([]);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      {/* Edit Mode */}
      <View style={styles.editHeader}>
        <TouchableOpacity onPress={toggleEditMode}>
          <Text style={styles.editButtonText}>
            {isEditing ? t("done") : t("edit")}
          </Text>
        </TouchableOpacity>
        {isEditing && (
          <TouchableOpacity onPress={handleDeleteSelectedSessions}>
            <Icon name="trash" size={24} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Video Item List */}
      {library?.videos?.length > 0 ? (
        <ScrollView style={styles.listContainer}>
          {library.videos.map((session, index) => (
            <View key={index} style={styles.videoItemContainer}>
              {isEditing && (
                <TouchableOpacity onPress={() => handleSelectSession(session.video.id)}>
                  <Icon
                    name={selectedSessions.includes(session.video.id) ? "checkbox" : "square-outline"}
                    size={24}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              )}
              <Image source={{ uri: session.video.imageUrl }} style={styles.videoImage} />
              <View style={styles.videoInfo}>
                <EnhancedText style={styles.videoTitle}>{session.video.title}</EnhancedText>
                <EnhancedText style={styles.videoSubtitle}>{session.video.description}</EnhancedText>
              </View>
              <TouchableOpacity style={styles.addButton}>
                <Icon name="play" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.noVideosText}>{t("no_sessions_found")}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  playlistTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  playlistSubtitle: {
    fontSize: 16,
    color: "#ccc",
  },
  editHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.background,
  },
  editButtonText: {
    fontSize: 16,
    color: colors.primary,
  },
  listContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  videoItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  videoImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  videoInfo: {
    flex: 1,
    marginLeft: 10,
  },
  videoTitle: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
  videoSubtitle: {
    color: "#999",
  },
  addButton: {
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: 8,
  },
  moreSongsButton: {
    backgroundColor: "#fdd835",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  moreSongsText: {
    color: "#111",
    fontSize: 16,
    fontWeight: "bold",
  },
  noVideosText: {
    textAlign: "center",
    color: "#666",
    marginTop: 20,
  },
  footer: {
    padding: 20,
    backgroundColor: "#222",
  },
  footerText: {
    color: "#ccc",
    marginBottom: 5,
  },
  footerMeta: {
    color: "#888",
  },
});

export default Library;
