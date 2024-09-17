import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  Linking,
} from "react-native";
import { RefreshControl } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FeatherIcon from "react-native-vector-icons/Feather";
import Toast from "react-native-toast-message";
import { FontAwesome } from "@expo/vector-icons";
import { contactUsEmail } from "../common/Functions";
import Avatar from "./Avatar";
import AppText from "./AppText";
import EditProfileModal from "./EditProfileModal";

const SettingsComponent = ({
  userDetails,
  setUserDetails,
  setOriginalUserDetails,
  fetchUserProfile,
  setModalVisible,
  setShowTerms,
  setActiveTab,
  handleSignOut,
  handleOnDelete,
  handleInputChange,
  handleAvatarUpdate,
  modalVisible,
  handleCloseModal,
  handleSubmitUpdate,
  awaitingVerification,
  verificationCode,
  setVerificationCode,
  handleVerifyEmail,
}) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchUserProfile(); // Call the function to refresh profile data
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleToggleNotification = async (newSetting) => {
    const token = await AsyncStorage.getItem("userToken");
    fetch(
      "https://primal-backend-851afa707cbd.herokuapp.com/user/toggle-email-notification",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ emailNotification: newSetting }),
      }
    )
      .then((response) => response.json())
      .then(() => {
        Toast.show({
          type: "success",
          text1: "Your settings have been saved.",
          icon: "heart",
        });
        setUserDetails({ ...userDetails, emailNotification: newSetting });
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Sorry, friend. We failed to update your email notification!",
          text2: " Please try again 🙏",
        });
      });
  };

  const handleTogglePushNotification = async (newSetting) => {
    const token = await AsyncStorage.getItem("userToken");
    fetch(
      "https://primal-backend-851afa707cbd.herokuapp.com/user/toggle-push-notification",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ pushNotification: newSetting }),
      }
    )
      .then((response) => response.json())
      .then(() => {
        Toast.show({
          type: "success",
          text1: "Your settings have been saved.",
          icon: "heart",
        });
        setUserDetails({ ...userDetails, pushNotification: newSetting });
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Sorry, friend. The technology failed us.",
          text2: "Please try again 🙏",
        });
      });
  };

  const toggleEditMode = () => {
    setModalVisible(true);
    setOriginalUserDetails(userDetails);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={[styles.section, { paddingTop: 16 }]}>
        <AppText style={styles.sectionTitle}>Account details</AppText>
        <View style={styles.sectionBody}>
          <TouchableOpacity onPress={toggleEditMode} style={styles.profile}>
            <Avatar
              onChange={handleAvatarUpdate}
              avatarUri={userDetails.avatar}
            />
            <View style={styles.profileBody}>
              <AppText style={styles.profileName}>{userDetails.name}</AppText>
              <AppText style={styles.profileHandle}>
                {userDetails.email}
              </AppText>
            </View>
            <FeatherIcon color="#fff" name="chevron-right" size={22} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.section}>
        <AppText style={styles.sectionTitle}>Resources</AppText>
        <View style={styles.sectionBody}>
          <View style={[styles.rowWrapper, styles.rowFirst]}>
            <TouchableOpacity
              onPress={() => {
                setActiveTab("favorites");
              }}
              style={styles.row}
            >
              <AppText style={styles.rowLabel}>
                Saved sessions{" "}
                <FontAwesome name="heart" size={15} color="red" />
              </AppText>

              <View style={styles.rowSpacer} />

              <AppText style={styles.rowValue}>
                {userDetails?.trainingListCount}
              </AppText>

              <FeatherIcon color="#bcbcbc" name="chevron-right" size={19} />
            </TouchableOpacity>
          </View>
          {/* <View style={[styles.rowWrapper]}>
            <TouchableOpacity
              onPress={() => {
                setActiveTab("categories");
              }}
              style={styles.row}
            >
              <AppText style={styles.rowLabel}>
                My categories <FontAwesome name="heart" size={15} color="red" />
              </AppText>

              <View style={styles.rowSpacer} />

              <AppText style={styles.rowValue}>
                {userDetails?.recipeListsCount}
              </AppText>

              <FeatherIcon color="#bcbcbc" name="chevron-right" size={19} />
            </TouchableOpacity>
          </View> */}
          <View style={[styles.rowWrapper]}>
            <TouchableOpacity
              onPress={() => {
                setActiveTab("receipes");
              }}
              style={styles.row}
            >
              <AppText style={styles.rowLabel}>
                Recipes <FontAwesome name="heart" size={15} color="red" />
              </AppText>

              <View style={styles.rowSpacer} />

              <AppText style={styles.rowValue}>
                {userDetails?.recipeListsCount}
              </AppText>

              <FeatherIcon color="#bcbcbc" name="chevron-right" size={19} />
            </TouchableOpacity>
          </View>
          {/* <View style={[styles.rowWrapper]}>
            <TouchableOpacity
              onPress={() => {
                setActiveTab("analytics");
              }}
              style={styles.row}
            >
              <AppText style={styles.rowLabel}>
                Your insights{" "}
                <FontAwesomeIcon icon={faChartPie} size={15} color="#fff" />
              </AppText>
              <View style={styles.rowSpacer} />
              <FeatherIcon color="#bcbcbc" name="chevron-right" size={19} />
            </TouchableOpacity>
          </View> */}
          <View style={[styles.rowWrapper]}>
            <TouchableOpacity
              onPress={() => {
                setActiveTab("diary");
              }}
              style={styles.row}
            >
              <AppText style={styles.rowLabel}>
                Appreciation Diary{" "}
                <FontAwesome name="heart" size={15} color="red" />
              </AppText>
              <View style={styles.rowSpacer} />
              <AppText style={styles.rowValue}>
                {userDetails?.diaryEntriesCount}
              </AppText>
              <FeatherIcon color="#bcbcbc" name="chevron-right" size={19} />
            </TouchableOpacity>
          </View>
          <View style={styles.rowWrapper}>
            <View style={styles.row}>
              <AppText style={styles.rowLabel}>Email Notifications</AppText>
              <View style={styles.rowSpacer} />
              <Switch
                onValueChange={handleToggleNotification}
                style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                value={userDetails.emailNotification}
              />
            </View>
          </View>
          <View style={[styles.rowWrapper, styles.rowLast]}>
            <View style={styles.row}>
              <AppText style={styles.rowLabel}>Push Notifications</AppText>
              <View style={styles.rowSpacer} />
              <Switch
                onValueChange={handleTogglePushNotification}
                style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                value={userDetails.pushNotification}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <AppText style={styles.sectionTitle}>Help</AppText>
        <View style={styles.sectionBody}>
          <View style={[styles.rowWrapper, styles.rowFirst]}>
            <TouchableOpacity onPress={contactUsEmail} style={styles.row}>
              <AppText style={styles.rowLabel}>Contact Us</AppText>

              <View style={styles.rowSpacer} />

              <FeatherIcon color="#bcbcbc" name="chevron-right" size={19} />
            </TouchableOpacity>
          </View>
          <View style={styles.rowWrapper}>
            <TouchableOpacity onPress={contactUsEmail} style={styles.row}>
              <AppText style={styles.rowLabel}>Report Bug</AppText>

              <View style={styles.rowSpacer} />

              <FeatherIcon color="#bcbcbc" name="chevron-right" size={19} />
            </TouchableOpacity>
          </View>
          <View style={styles.rowWrapper}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("https://iconize.spce.com/s/Iconize")
              }
              style={styles.row}
            >
              <AppText style={styles.rowLabel}>Rate in App Store</AppText>

              <View style={styles.rowSpacer} />

              <FeatherIcon color="#bcbcbc" name="chevron-right" size={19} />
            </TouchableOpacity>
          </View>

          <View style={[styles.rowWrapper, styles.rowLast]}>
            <TouchableOpacity
              onPress={() => setShowTerms(true)}
              style={styles.row}
            >
              <AppText style={styles.rowLabel}>Terms and Privacy</AppText>

              <View style={styles.rowSpacer} />

              <FeatherIcon color="#bcbcbc" name="chevron-right" size={19} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={[styles.sectionBody, styles.lastRow]}>
          <View
            style={[
              styles.rowWrapper,
              styles.rowFirst,
              styles.rowLast,
              { alignItems: "center" },
            ]}
          >
            <TouchableOpacity onPress={handleSignOut} style={styles.row}>
              <AppText style={[styles.rowLabel, styles.rowLabelLogout]}>
                Log Out
              </AppText>
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.rowWrapper,
              styles.rowFirst,
              styles.rowLast,
              {
                alignItems: "center",
              },
            ]}
          >
            <TouchableOpacity onPress={handleOnDelete} style={styles.row}>
              <AppText style={[styles.rowLabel, styles.rowLabelLogout]}>
                Delete My Account
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <EditProfileModal
        visible={modalVisible}
        userDetails={userDetails}
        onChange={handleInputChange}
        onClose={handleCloseModal}
        onSave={handleSubmitUpdate}
        awaitingVerification={awaitingVerification}
        verificationCode={verificationCode}
        setVerificationCode={setVerificationCode}
        handleVerifyEmail={handleVerifyEmail}
      />
      <AppText style={styles.contentFooter}>App Version 1.1 #50491</AppText>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
  },
  contentFooter: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    color: "#a69f9f",
  },
  section: {
    paddingVertical: 12,
  },
  sectionTitle: {
    margin: 8,
    marginLeft: 12,
    fontSize: 16,
    letterSpacing: 0.33,
    fontWeight: "500",
    color: "#a69f9f",
    textTransform: "uppercase",
  },
  sectionBody: {
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  profile: {
    padding: 12,
    backgroundColor: "#000",
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profileBody: {
    marginRight: "auto",
  },
  profileName: {
    fontSize: 16,
    fontWeight: "600",
    maxWidth: "10px",
    overflow: "hidden",
    color: "#ffffff",
  },
  profileHandle: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: "400",
    color: "#ffffff",
  },
  row: {
    height: 44,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingRight: 12,
  },
  rowWrapper: {
    paddingLeft: 16,
    backgroundColor: "#000",
    borderTopWidth: 1,
    borderWidth: 1,
    borderColor: "#fff",
  },
  rowFirst: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  rowLabel: {
    fontSize: 16,
    letterSpacing: 0.24,
    color: "#fff",
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ababab",
    marginRight: 4,
  },
  rowLast: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  rowLabelLogout: {
    width: "100%",
    textAlign: "center",
    fontWeight: "600",
    color: "#dc2626",
  },
});

export default SettingsComponent;
