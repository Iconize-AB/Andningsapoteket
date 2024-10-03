import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import EnhancedText from "../regular/EnhancedText";
import { useTranslation } from "react-i18next";
import EnhancedTextInput from "../regular/EnhancedTextInput";
import EnhancedButton from "../regular/EnhancedButton";
import colors from "../common/colors/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FetchUserPlaylists } from "../sessions/endpoints/BreatworkSessionActionsEndpoints";
import PlaylistItem from "../favorites/PlaylistItem";

const AddToPlaylistModel = ({
  setModalVisible,
  saveVideoToList,   // Make sure this function can handle playlist info
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
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <EnhancedText style={styles.modalTitle} weight="bold">
              {t("Create a New List")}
            </EnhancedText>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <EnhancedText style={styles.closeButtonText}>X</EnhancedText>
            </TouchableOpacity>
          </View>

          <EnhancedTextInput
            placeholder="Enter List Name"
            value={listName}
            onChangeText={setListName}
          />

          <View style={styles.actionButtons}>
            <EnhancedButton
              title={t("Save")}
              onPress={saveVideoToList}
              size="medium"
            />
            <EnhancedButton
              title={t("Cancel")}
              onPress={() => setModalVisible(false)}
              size="medium"
            />
          </View>

          {/* Display Existing Playlists */}
          <View style={styles.playlistsSection}>
            <EnhancedText style={styles.playlistsTitle}>
              {t("Your Playlists")}
            </EnhancedText>
            {loading ? (
              <ActivityIndicator size="large" color="#FFF" />
            ) : (
              <ScrollView>
                {playlists.length > 0 ? (
                  playlists.map((playlist, index) => (
                    <PlaylistItem
                      key={index}
                      playlist={playlist}
                      onPress={() => saveVideoToList(playlist)}
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
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContainer: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
    width: "100%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
  actionButtons: {
    display: "flex",
    gap: 16,
    flexDirection: "row",
    marginTop: 20,
  },
  playlistsSection: {
    marginTop: 30,
  },
  playlistsTitle: {
    fontSize: 16,
    color: "#FFF",
    marginBottom: 10,
  },
  noPlaylistsText: {
    fontSize: 16,
    color: "#FFF",
    textAlign: "center",
    marginTop: 20,
  },
});

export default AddToPlaylistModel;
