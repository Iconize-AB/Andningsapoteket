import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import EnhancedText from "../regular/EnhancedText";
import { useTranslation } from "react-i18next";
import EnhancedTextInput from "../regular/EnhancedTextInput";
import EnhancedButton from "../regular/EnhancedButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FetchUserPlaylists } from "../sessions/endpoints/BreatworkSessionActionsEndpoints";
import PlaylistItem from "../favorites/PlaylistItem";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const AddToPlaylistModel = ({
  setModalVisible,
  saveVideoToList,
  modalVisible,
  listName,
  setListName,
}) => {
  const { t } = useTranslation();
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (modalVisible) {
      const fetchPlaylists = async () => {
        try {
          const token = await AsyncStorage.getItem("userToken");
          if (!token) throw new Error("No token found");

          const data = await FetchUserPlaylists(token);
          if (data) {
            setPlaylists(data?.lists || []);
          }
        } catch (error) {
          console.error("Failed to fetch playlists", error);
        } finally {
          setLoading(false);
        }
      };

      fetchPlaylists();
    }
  }, [modalVisible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <LinearGradient
          colors={['#1E3A5F', '#091D34']}
          style={styles.modalContainer}
        >
          <View style={styles.modalHeader}>
            <EnhancedText style={styles.modalTitle} weight="bold">
              {t("Create a New List")}
            </EnhancedText>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <FontAwesomeIcon icon={faTimes} color="#F2E8DC" size={24} />
            </TouchableOpacity>
          </View>

          <EnhancedTextInput
            placeholder="Enter List Name"
            value={listName}
            onChangeText={setListName}
            style={styles.input}
          />

          <View style={styles.actionButtons}>
            <EnhancedButton
              title={t("Save")}
              onPress={() => saveVideoToList(null)}
              size="medium"
              style={styles.button}
            />
            <EnhancedButton
              title={t("Cancel")}
              onPress={() => setModalVisible(false)}
              size="medium"
              style={styles.button}
            />
          </View>

          <View style={styles.playlistsSection}>
            <EnhancedText style={styles.playlistsTitle}>
              {t("Your Playlists")}
            </EnhancedText>
            {loading ? (
              <ActivityIndicator size="large" color="#F2E8DC" />
            ) : (
              <ScrollView style={styles.playlistsScrollView}>
                {playlists.length > 0 ? (
                  playlists.map((playlist, index) => (
                    <PlaylistItem
                      key={index}
                      playlist={playlist}
                      onPress={() => saveVideoToList(playlist?.id)}
                    />
                  ))
                ) : (
                  <EnhancedText style={styles.noPlaylistsText}>
                    {t("No playlists available.")}
                  </EnhancedText>
                )}
              </ScrollView>
            )}
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    width: "100%",
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F2E8DC",
  },
  closeButton: {
    padding: 10,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    padding: 15,
    color: "#F2E8DC",
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  playlistsSection: {
    flex: 1,
  },
  playlistsTitle: {
    fontSize: 18,
    color: "#F2E8DC",
    marginBottom: 15,
  },
  playlistsScrollView: {
    maxHeight: 300,
  },
  noPlaylistsText: {
    fontSize: 16,
    color: "#F2E8DC",
    textAlign: "center",
    marginTop: 20,
  },
});

export default AddToPlaylistModel;
