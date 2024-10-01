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
import testImage from "../resources/test_image.jpg";
import { useTranslation } from "react-i18next";
import AddToPlaylistModel from "../playlists/PlaylistModel";
import { AddVideoToPlaylist } from "./endpoints/BreatworkSessionActionsEndpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";

const IndividualBreathworkSessionScreen = ({ route, navigation }) => {
  const { selectedVideo } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [listName, setListName] = useState("");
  const { t } = useTranslation();

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleCloseModal = () => {
    setIsPlaying(false);
  };

  const toggleReadMore = () => {
    setExpanded(!expanded);
  };

  const handleSaveSession = () => {
    setModalVisible(true);
  };

  const saveVideoToList = async () => {
    const token = await AsyncStorage.getItem("userToken");
    if (listName.trim() === "") {
      Alert.alert("Error", "Please enter a valid list name");
      return;
    }
    console.log("token", token); // Check if token is being fetched correctly
    let response = await AddVideoToPlaylist(
      token,
      listName,
      null,
      selectedVideo.id
    );
    console.log("test", response); // Check if the function is being called and API response is logged
    if (response.status === 200) {
      Alert.alert("Success", "Video saved to list");
      setIsSaved(true);
    }

    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Video Preview */}
      <TouchableOpacity
        onPress={handlePlay}
        style={styles.videoPreviewContainer}
        activeOpacity={0.8}
      >
        <Image source={testImage} style={styles.previewImage} />
        <View style={styles.playIcon}>
          <FontAwesomeIcon icon={faPlayCircle} size={60} color="#fff" />
        </View>
      </TouchableOpacity>

      {/* Video Information */}
      <View style={styles.infoContainer}>
        <EnhancedText style={styles.videoTitle}>
          {selectedVideo.title}
        </EnhancedText>

        {/* Description with Read More/Read Less */}
        <EnhancedText style={styles.videoDescription}>
          {expanded
            ? selectedVideo.description
            : `${selectedVideo.description.slice(0, 100)}...`}
        </EnhancedText>
        <TouchableOpacity onPress={toggleReadMore}>
          <EnhancedText style={styles.readMoreText}>
            {expanded ? t("Read Less") : t("Read More")}
          </EnhancedText>
        </TouchableOpacity>

        {/* Add to Saved Sessions */}
        <EnhancedButton
          icon={faHeart}
          onPress={handleSaveSession}
          title={t(isSaved ? "Saved" : "Save to List")}
          size="medium"
        />
      </View>

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
    paddingTop: 60,
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  videoTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  videoDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
    textAlign: "center",
  },
  readMoreText: {
    fontSize: 16,
    color: colors.primary,
    textAlign: "center",
    marginBottom: 25,
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
