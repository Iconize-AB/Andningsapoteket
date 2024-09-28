import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Modal } from "react-native";
import { Video } from "expo-av";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faPlayCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import colors from "../common/colors/Colors";
import EnhancedText from "../regular/EnhancedText";
import EnhancedButton from "../regular/EnhancedButton";
import testImage from "../resources/test_image.jpg";
import { useTranslation } from "react-i18next";

const IndividualBreathworkSessionScreen = ({ route, navigation }) => {
  const { selectedVideo } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false); // State to track "Read More"
  const { t } = useTranslation();

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleCloseModal = () => {
    setIsPlaying(false); // Stop playing
  };

  const handleGoBack = () => {
    navigation.goBack(); // Close the screen or go back
  };

  const toggleReadMore = () => {
    setExpanded(!expanded); // Toggle the expanded state
  };

  return (
    <View style={styles.container}>
      {/* Video Preview */}
      <TouchableOpacity
        onPress={handlePlay}
        style={styles.videoPreviewContainer}
      >
        <Image source={testImage} style={styles.previewImage} />
        <View style={styles.playIcon}>
          <FontAwesomeIcon icon={faPlayCircle} size={50} color="#fff" />
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
            ? selectedVideo.description // Full description when expanded
            : `${selectedVideo.description.slice(0, 100)}...`} {/* Truncated description */}
        </EnhancedText>

        {/* Read More/Read Less button */}
        <TouchableOpacity onPress={toggleReadMore}>
          <EnhancedText style={styles.readMoreText}>
            {expanded ? t("Read Less") : t("Read More")}
          </EnhancedText>
        </TouchableOpacity>

        {/* Add to Saved Sessions */}
        <EnhancedButton title={t("save_to_list")} size="medium" type="outline" />
      </View>

      {/* Video Play Modal */}
      <Modal
        visible={isPlaying}
        animationType="slide"
        onRequestClose={handleCloseModal}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  playIcon: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  infoContainer: {
    padding: 25, // More padding for a spacious look
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    width: "100%",
  },
  videoTitle: {
    fontSize: 24, // Larger title font size
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
  favoriteButton: {
    backgroundColor: "#f1f1f1",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  favoriteButtonText: {
    fontSize: 16,
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
