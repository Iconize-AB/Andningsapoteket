import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  Alert,
} from "react-native";
import { Video } from "expo-av";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faPlayCircle,
  faTimes,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import colors from "../common/colors/Colors";
import EnhancedText from "../regular/EnhancedText";
import EnhancedButton from "../regular/EnhancedButton";
import { useTranslation } from "react-i18next";
import AddToPlaylistModel from "../playlists/PlaylistModel";
import { AddVideoToPlaylist } from "./endpoints/BreatworkSessionActionsEndpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomSlider from "./BottomSlider";
import SessionInfo from "./SessionInfo";
import { TrackGlobalWatchedSessionEvent } from "../events/TrackEventsEndpoints";

const IndividualBreathworkSessionScreen = ({ route, navigation }) => {
  const { selectedVideo } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [sessionStats, setSessionStats] = useState(selectedVideo?.totalWatches);
  const [isMoreVisible, setIsMoreVisible] = useState(false);
  const [listName, setListName] = useState("");
  const { t } = useTranslation();

  const categories = [
    "Sleep",
    "Restful Sleep",
    "Deep Sleep",
    "Breathing",
    "Progressive Muscle Relaxation",
    "Parasympathetic Nervous System",
  ];

  const handlePlay = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
  
      if (!token) {
        console.error("No token found");
        return;
      }
  
      const response = await TrackGlobalWatchedSessionEvent(token, selectedVideo.id);

      const data = await response.json();
  
      if (response.status === 200) {
        if (data?.totalWatches) {
          setSessionStats(data.totalWatches)
        }
        console.log("Watch session successfully tracked");
      } else {
        console.log("Watch session failed to be tracked");
      }
  
      setIsPlaying(true);
    } catch (error) {
      console.error("Error tracking watch session:", error);
    }
  };

  const handleCloseModal = () => {
    setIsPlaying(false);
  };

  const handleSaveSession = async () => {
    setIsMoreVisible(false);
    setModalVisible(true);
  };

  const handleSaveSessionToLibrary = () => {
    return;
  }


  const saveVideoToList = async () => {
    const token = await AsyncStorage.getItem("userToken");
    if (listName.trim() === "") {
      Alert.alert("Error", "Please enter a valid list name");
      return;
    }
    let response = await AddVideoToPlaylist(
      token,
      listName,
      null,
      selectedVideo.id
    );
    if (response.status === 200) {
      Alert.alert("Success", "Video saved to list");
      setIsSaved(true);
    }
    setModalVisible(false);
  };

  const toggleMoreOptions = () => {
    setIsMoreVisible(!isMoreVisible);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Video Preview */}
      <TouchableOpacity
        onPress={handlePlay}
        style={styles.videoPreviewContainer}
        activeOpacity={0.8}
      >
        <Image source={selectedVideo?.url} style={styles.previewImage} />
        <View style={styles.playIcon}>
          <FontAwesomeIcon icon={faPlayCircle} size={60} color="#fff" />
        </View>
      </TouchableOpacity>

      {/* Video Information */}
      <View style={styles.infoContainer}>
        <View style={styles.modalHeader}>
          <EnhancedText style={styles.modalTitle}>
            Morgon breathwork
          </EnhancedText>
          <TouchableOpacity
            style={styles.moreButton}
            onPress={toggleMoreOptions}
          >
            <EnhancedText style={styles.threeDotsIcon}>•••</EnhancedText>
          </TouchableOpacity>
        </View>
        
        <SessionInfo selectedVideo={selectedVideo} sessionStats={sessionStats} />
        {/* Add to Saved Sessions */}
        <EnhancedButton
          icon={faHeart}
          onPress={handleSaveSessionToLibrary}
          title={t(isSaved ? "Saved to library" : "Save to library")}
          size="medium"
        />

        {/* Categories Section */}
        <View style={styles.relatedTopicsContainer}>
          <EnhancedText style={styles.relatedTopicsTitle}>
            {t("related_topic")}
          </EnhancedText>
          <View style={styles.tagsContainer}>
            {categories.map((category, index) => (
              <View key={index} style={styles.tag}>
                <EnhancedText style={styles.tagText}>{category}</EnhancedText>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Bottom Slider for More Options */}
      <BottomSlider isVisible={isMoreVisible} onClose={toggleMoreOptions} handleSaveSession={handleSaveSession} />

      {/* Modal for entering the list name */}
      <AddToPlaylistModel
        setModalVisible={setModalVisible}
        saveVideoToList={saveVideoToList}
        setListName={setListName}
        listName={listName}
        modalVisible={modalVisible}
      />

      {/* Video Play Modal */}
      <Modal
        visible={isPlaying}
        animationType="fade"
        onRequestClose={handleCloseModal}
        transparent={true}
      >
        <View style={styles.modalContentContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleCloseModal}
          >
            <FontAwesomeIcon icon={faTimes} size={30} color="#FFF" />
          </TouchableOpacity>
          <Video
            source={{ uri: selectedVideo.videoUrl }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            style={styles.videoPlayer}
            useNativeControls
          />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 0, // Adjust padding to align the top image
  },
  videoPreviewContainer: {
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    transform: [{ scale: 1 }],
  },
  playIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -30 }, { translateY: -30 }],
    opacity: 0.8,
  },
  infoContainer: {
    padding: 25,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  modalHeader: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between", // Space between title and button
    alignItems: "center", // Align items in the center vertically
    paddingBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1, // This makes sure the title takes up the available space
  },
  moreButton: {
    width: 40, // Width and height to make it circular
    height: 40,
    backgroundColor: "#1E6B96", // Blue background color
    borderRadius: 20, // Full circular button
    justifyContent: "center", // Center the dots vertically and horizontally
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  threeDotsIcon: {
    fontSize: 18, // Size for the dots
    color: "#fff", // White color for the dots
  },
  videoTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  relatedTopicsContainer: {
    marginTop: 20,
  },
  relatedTopicsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "#f1f1f1",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  tagText: {
    fontSize: 14,
    color: "#333",
  },
  modalContentContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
  videoPlayer: {
    width: "100%",
    height: 300,
  },
});

export default IndividualBreathworkSessionScreen;
