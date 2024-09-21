import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, SafeAreaView, View, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faComment, faTrash } from "@fortawesome/free-solid-svg-icons";
import SettingsComponent from "./SettingsComponent";
import { useFocusEffect } from "@react-navigation/native";
import Title from "../regular/Title";
import FavoriteScreen from "./FavoriteScreen";
import { useAuth } from "../context/AuthContext";
import { LoadingScreen } from "../regular/LoadingSreen";

export default function ProfileScreen({ navigation, route }) {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    avatar: "",
    userInfoId: "",
    isActivated: "",
    emailNotification: false,
    pushNotification: false,
    viewedAnalyticsIntroduction: false,
    viewedReceipeListIntroduction: false,
    categories: [],
  });
  const [originalUserDetails, setOriginalUserDetails] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [activeTab, setActiveTab] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [awaitingVerification, setAwaitingVerification] = useState(false);
  const [viewComments, setViewComments] = useState(false);
  const [selectedReceipeList, setSelectedReceipeList] = useState(null);
  const { signOut } = useAuth();

  const handleInputChange = (field, value) => {
    setUserDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarUpdate = (newUri) => {
    setUserDetails((prevState) => ({
      ...prevState,
      avatar: newUri,
    }));
  };

  const toggleMenu = () => {
    if (selectedList || selectedReceipeList) {
      setShowMenu(!showMenu);
    }
  };

  const handleCloseModal = () => {
    setUserDetails(originalUserDetails);
    setModalVisible(false);
  };

  const fetchUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      setIsLoading(true);

      const response = await fetch(
        "https://primal-backend-851afa707cbd.herokuapp.com/users/profile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const json = await response.json();

      if (response.ok) {
        setUserDetails({
          name: json.name,
          email: json.email,
          userInfoId: json.userInfoId,
          isActivated: json.isActivated,
          emailNotification: json.emailNotification,
          pushNotification: json.pushNotification,
          trainingListCount: json.trainingListCount,
          diaryEntriesCount: json.diaryEntriesCount,
          userCategories: json.categories,
          recipeListsCount: json.recipeListsCount,
          viewedAnalyticsIntroduction: json.viewedAnalyticsIntroduction,
          viewedReceipeListIntroduction: json.viewedReceipeListIntroduction,
          avatar: json.profileImageUrl,
          batches: json.batches,
        });
        await AsyncStorage.setItem("userDetails ", JSON.stringify(userDetails));
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Sorry, friend. We failed to fetch your profile.",
        text2: "Create or log into your account to join the Primal Tribe 🙏",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserProfile();
    }, [])
  );

  const handleSignOut = () => {
    signOut(null);
  };

  const handleOnDeleteList = async () => {
    Alert.alert(
      "Are you sure?",
      "Are you sure you want to delete this list? The videos contained in the list will also be removed.",
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
              let response;
              if (response.ok) {
                Toast.show({
                  type: "success",
                  text1: "Your list has been deleted.",
                  icon: "heart",
                  text1Style: {
                    color: "#466F78",
                  },
                  text2Style: {
                    color: "#466F78",
                  },
                  backgroundColor: "#000",
                });
                setSelectedList(null);
              }
            } catch (error) {
              Toast.show({
                type: "error",
                text1: "Sorry, friend. The technology failed us.",
                text2: "Please try again.",
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

  const handleOnDeleteReceipeList = async () => {
    Alert.alert(
      "Are you sure?",
      "Are you sure you want to delete this list? The videos contained in the list will also be removed.",
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
              const response = await DeleteReceipeList(
                selectedReceipeList.id,
                token
              );
              if (response.ok) {
                Toast.show({
                  type: "success",
                  text1: "Your list has been deleted.",
                  icon: "heart",
                  text1Style: {
                    color: "#466F78",
                  },
                  text2Style: {
                    color: "#466F78",
                  },
                  backgroundColor: "#000",
                });
                setSelectedReceipeList(null);
              }
            } catch (error) {
              Toast.show({
                type: "error",
                text1: "Sorry, friend. We can't delete this list right now.",
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

  const handleOnDelete = async () => {
    Alert.alert(
      "Are you sure?",
      "Are you sure you want to delete your account? This action cannot be undone.",
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
              let response;
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

  const handleSubmitUpdate = async () => {
    const token = await AsyncStorage.getItem("userToken");
    try {
      const response = await fetch(
        "http://localhost:3000/users/update/user/profile",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: userDetails.name,
            email: userDetails.email,
          }),
        }
      );
      const json = await response.json();
      if (response.ok && json.emailUpdated) {
        setAwaitingVerification(true);
        Toast.show({
          type: "info",
          icon: "heart",
          text1: "You need to verify your email address.",
        });
      } else if (response.ok) {
        Toast.show({
          type: "success",
          text1: "Your profile has been updated.",
          icon: "heart",
        });
        setModalVisible(false);
      } else {
        throw new Error(json.error || "Could not update profile");
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Sorry, friend. The technology failed us.",
        text2: "Please try again 🙏",
      });
    }
  };

  const handleVerifyEmail = async () => {
    const token = await AsyncStorage.getItem("userToken");
    try {
      const response = await fetch(
        "http://localhost:3000/users/verify",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userDetails.email,
            code: verificationCode,
          }),
        }
      );
      const json = await response.json();
      if (response.ok) {
        Toast.show({
          type: "success",
          text1: "Your email has been verified.",
          icon: "heart",
        });
        setAwaitingVerification(false);
        setModalVisible(false);
      } else {
        throw new Error(json.error || "Verification failed");
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Sorry friend. We couldn't verify your email address.",
        text2: "Please try again 🙏",
      });
    }
  };

  const handleOnViewComments = () => {
    setViewComments(true);
  };

  const navigate = () => {
      if (selectedList) {
      setSelectedList(null);
    } else if (selectedReceipeList) {
      setSelectedReceipeList(null);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "settings":
        return (
          <SettingsComponent
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            setShowTerms={setShowTerms}
            setOriginalUserDetails={setOriginalUserDetails}
            setModalVisible={setModalVisible}
            fetchUserProfile={fetchUserProfile}
            setActiveTab={setActiveTab}
            setSelectedList={setSelectedList}
            setSelectedReceipeList={setSelectedReceipeList}
            handleSignOut={handleSignOut}
            handleOnDelete={handleOnDelete}
            handleOnDeleteList={handleOnDeleteList}
            handleOnDeleteReceipeList={handleOnDeleteReceipeList}
            handleInputChange={handleInputChange}
            handleAvatarUpdate={handleAvatarUpdate}
            modalVisible={modalVisible}
            originalUserDetails={originalUserDetails}
            handleCloseModal={handleCloseModal}
            handleSubmitUpdate={handleSubmitUpdate}
            awaitingVerification={awaitingVerification}
            verificationCode={verificationCode}
            setVerificationCode={setVerificationCode}
            handleVerifyEmail={handleVerifyEmail}
          />
        );
      case "favorites":
        return (
          <FavoriteScreen
            navigate={navigate}
            setSelectedList={setSelectedList}
            viewComments={viewComments}
            setViewComments={setViewComments}
            selectedList={selectedList}
            route={route}
          />
        );
      default:
        return (
          <SettingsComponent
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            setOriginalUserDetails={setOriginalUserDetails}
            setModalVisible={setModalVisible}
            setShowTerms={setShowTerms}
            setActiveTab={setActiveTab}
            setSelectedList={setSelectedList}
            setSelectedReceipeList={setSelectedReceipeList}
            handleSignOut={handleSignOut}
            handleOnDelete={handleOnDelete}
            handleOnDeleteList={handleOnDeleteList}
            handleOnDeleteReceipeList={handleOnDeleteReceipeList}
            handleInputChange={handleInputChange}
            handleAvatarUpdate={handleAvatarUpdate}
            modalVisible={modalVisible}
            originalUserDetails={originalUserDetails}
            handleCloseModal={handleCloseModal}
            handleSubmitUpdate={handleSubmitUpdate}
            awaitingVerification={awaitingVerification}
            verificationCode={verificationCode}
            setVerificationCode={setVerificationCode}
            handleVerifyEmail={handleVerifyEmail}
          />
        );
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (showTerms) {
    return <TermsAndConditionPopup onClose={() => setShowTerms(false)} />;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#000",
      }}
    >
      <View
        style={{
          ...styles.container,
        }}
      >
        <View style={styles.header}>
          <Title
            onPress={navigate}
            route={route}
            visibility={selectedList || selectedReceipeList ? "1" : "0"}
            toggle={toggleMenu}
            title={getTitle()}
          />
        </View>
        {renderTabContent()}
        <ActionMenu
          isVisible={showMenu}
          options={[
            {
              label: "Delete list",
              isShow: selectedList,
              action: handleOnDeleteList,
              icon: (
                <FontAwesomeIcon icon={faTrash} style={styles.deleteIcon} />
              ),
            },
            {
              label: "Delete receipe list",
              isShow: selectedReceipeList,
              action: handleOnDeleteReceipeList,
              icon: (
                <FontAwesomeIcon icon={faTrash} style={styles.deleteIcon} />
              ),
            },
            {
              label: "View comments",
              isShow: selectedList,
              action: handleOnViewComments,
              icon: (
                <FontAwesomeIcon icon={faComment} style={styles.editIcon} />
              ),
            },
          ]}
          onSelectOption={(option) => {
            option.action();
            setShowMenu(false);
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: "#000",
    width: 60,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: "#466F78",
  },
  exitButton: {
    backgroundColor: "#F55E09",
  },
  editMode: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  buttons: {
    width: "100%",
    position: "relative",
    gap: 10,
    justifyContent: "center",
    flexDirection: "row",
  },
  inputs: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  input: {
    borderColor: "#ffffff",
    borderRadius: 10,
    width: "80%",
    height: 50,
    width: "100%",
    color: "#fff",
    fontSize: 16,
    backgroundColor: "#000",
    fontFamily: "BebasNeue-Regular",
    borderRadius: 10,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  lastRow: {
    display: "flex",
    gap: 8,
  },
  favorites: {
    marginTop: 20,
    justifyContent: "center",
  },

  deleteIcon: {
    color: "red",
  },
  editIcon: {
    color: "#466F78",
  },
});
