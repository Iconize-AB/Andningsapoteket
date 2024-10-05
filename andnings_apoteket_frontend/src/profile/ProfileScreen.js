import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, SafeAreaView, View, Modal, TouchableOpacity, Alert } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClose, faCog } from "@fortawesome/free-solid-svg-icons";
import SettingsComponent from "./SettingsComponent";
import { useAuth } from "../context/AuthContext";
import colors from "../common/colors/Colors";
import { LoadingScreen } from "../regular/LoadingSreen";
import Toast from "react-native-toast-message";
import EnhancedText from "../regular/EnhancedText";
import { FetchUserProfile } from "./endpoints/ProfileEndpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DeleteUser } from "../authentication/endpoints/AuthenticationEndpoints";
import { useTranslation } from "react-i18next";

export default function ProfileScreen({ navigation, route }) {
  const { t } = useTranslation();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    avatar: "",
    emailNotification: false,
    pushNotification: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const { signOut } = useAuth();
  
  const fetchUserProfile = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");
  
      setIsLoading(true);
      const response = await FetchUserProfile(token);  
      const json = await response.json();
      if (response.ok) {
        setUserDetails({
          fullName: json.fullName,
          email: json.email,
          id: json.id,
          avatar: json.profile.profileImageUrl,
          emailNotification: json.profile.emailNotifications,
          pushNotification: json.profile.pushNotifications,
        });
      } else {
        console.error("Response error:", json);
        Toast.show({
          type: "error",
          text1: "Failed to fetch profile.",
          text2: json.error || "Please try again.",
        });
      }
    } catch (error) {
      console.error("FetchUserProfile error:", error);
      Toast.show({
        type: "error",
        text1: "Failed to fetch profile.",
        text2: error.message || "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const handleOnDelete = async () => {
    Alert.alert(
      t("alert.title"),
      t("alert.message"),
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem("userToken");
              console.log('user', userDetails.id);
              const response = await DeleteUser(token, userDetails.id);
              console.log('response222', response);
              if (response.ok) {
                Toast.show({
                  type: "success",
                  text1: "Your account has been deleted.",
                  icon: "heart",
                  text1Style: {
                    color: "#466F78",
                  },
                  text2Style: {
                    color: "#466F78",
                  },
                  backgroundColor: "#000",
                });
                handleSignOut();
              } else {
                Toast.show({
                  type: "error",
                  text1: "Sorry, friend. The technology failed us.",
                  text2: "Please try again 🙏",
                  text1Style: {
                    color: "#466F78",
                  },
                  text2Style: {
                    color: "#466F78",
                  },
                  backgroundColor: "#000",
                });
              }
            } catch (error) {
              Toast.show({
                type: "error",
                text1: "Sorry, friend. The technology failed us.",
                text2: "Please try again 🙏",
                text1Style: {
                  color: "#466F78",
                },
                text2Style: {
                  color: "#466F78",
                },
                backgroundColor: "#000",
              });
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleSignOut = () => {
    signOut();
  };

  const toggleSettingsModal = () => {
    setShowSettingsModal(!showSettingsModal);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <EnhancedText style={styles.title}>
          Profile
        </EnhancedText>
        <TouchableOpacity onPress={toggleSettingsModal}>
          <FontAwesomeIcon icon={faCog} size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showSettingsModal}
        onRequestClose={toggleSettingsModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleSettingsModal}>
            <FontAwesomeIcon icon={faClose} size={24} color="#000" />
          </TouchableOpacity>
          <SettingsComponent
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            handleOnDelete={handleOnDelete}
            fetchUserProfile={fetchUserProfile}
            handleSignOut={handleSignOut}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    zIndex: 999,
    top: 60,
    right: 20,
  },
});
