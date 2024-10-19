import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useTranslation } from "react-i18next";
import EnhancedText from "../regular/EnhancedText";
import NoResult from "../regular/NoResult";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlay, faEllipsisH } from "@fortawesome/free-solid-svg-icons";

const Library = ({ library, handleDeleteSessions, navigation }) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSessions, setSelectedSessions] = useState([]);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    setSelectedSessions([]);
  };

  const handleSelectSession = (sessionId) => {
    if (selectedSessions.includes(sessionId)) {
      setSelectedSessions(selectedSessions.filter((id) => id !== sessionId));
    } else {
      setSelectedSessions([...selectedSessions, sessionId]);
    }
  };

  const handleDeleteSelectedSessions = async () => {
    handleDeleteSessions(selectedSessions);
    setSelectedSessions([]);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      {library?.sessions?.length > 0 ? (
        <ScrollView style={styles.listContainer}>
          {library.sessions.map((session, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.sessionItem}
              onPress={() => {/* Navigate to session details */}}
            >
              <Image
                source={{ uri: session.session.imageUrl }}
                style={styles.sessionImage}
              />
              <View style={styles.sessionInfo}>
                <EnhancedText style={styles.sessionTitle}>
                  {session.session.title}
                </EnhancedText>
                <EnhancedText style={styles.sessionSubtitle}>
                  {session.session.description}
                </EnhancedText>
              </View>
              <TouchableOpacity style={styles.playButton}>
                <FontAwesomeIcon icon={faPlay} size={16} color="#A0C8F9" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <NoResult />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    marginTop: 10,
  },
  sessionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(160, 200, 249, 0.2)',
  },
  sessionImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  sessionInfo: {
    flex: 1,
    marginLeft: 15,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: '#FFFFFF',
    marginBottom: 4,
  },
  sessionSubtitle: {
    fontSize: 14,
    color: '#A0C8F9',
  },
  playButton: {
    padding: 8,
  },
});

export default Library;
