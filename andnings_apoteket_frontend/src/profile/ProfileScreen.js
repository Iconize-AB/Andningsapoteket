import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, SafeAreaView, View, Modal, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import SettingsComponent from "./SettingsComponent";
import { useAuth } from "../context/AuthContext";
import colors from "../common/colors/Colors";
import { LoadingScreen } from "../regular/LoadingSreen";
import Toast from "react-native-toast-message";
import EnhancedText from "../regular/EnhancedText";
import { FetchUserProfile } from "./endpoints/ProfileEndpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen({ navigation, route }) {
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
  
  // Hook to fetch the user profile
  const fetchUserProfile = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      console.log("Token:", token);  // Log the token to ensure it's correct
      if (!token) throw new Error("No token found");
  
      setIsLoading(true);
      const response = await FetchUserProfile(token);  
      const json = await response.json();
      console.log('JSON:', json);  // Log the JSON response
  
      if (response.ok) {
        setUserDetails({
          name: json.name,
          email: json.email,
          avatar: json.profileImageUrl,
          emailNotification: json.emailNotification,
          pushNotification: json.pushNotification,
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
      console.error("FetchUserProfile error:", error);  // Log any error
      Toast.show({
        type: "error",
        text1: "Failed to fetch profile.",
        text2: error.message || "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Ensure the profile is fetched when the component mounts
  useEffect(() => {
    console.log("useEffect triggered");  // Log when useEffect is triggered
    fetchUserProfile();
  }, [fetchUserProfile]);  // Add fetchUserProfile as a dependency

  const handleSignOut = () => {
    signOut(null);
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
          <SettingsComponent
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            fetchUserProfile={fetchUserProfile}
            handleSignOut={handleSignOut}
          />
          <TouchableOpacity style={styles.closeButton} onPress={toggleSettingsModal}>
            <FontAwesomeIcon icon={faCog} size={24} color="#fff" />
          </TouchableOpacity>
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
    top: 20,
    right: 20,
  },
});
