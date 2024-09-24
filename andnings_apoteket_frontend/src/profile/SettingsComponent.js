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
import EnhancedText from "../regular/EnhancedText";
import { contactUsEmail } from "../common/Validation";

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
}) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchUserProfile();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleToggleNotification = async (newSetting) => {
    const token = await AsyncStorage.getItem("userToken");
    fetch(
      "http://localhost:3000/profileRoute/toggle-email-notification",
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
      "http://localhost:3000/profileRoute/toggle-push-notification",
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
        <EnhancedText style={styles.sectionTitle}>Account details</EnhancedText>
        <View style={styles.sectionBody}>
          <TouchableOpacity onPress={toggleEditMode} style={styles.profile}>
            {/* <Avatar
              onChange={handleAvatarUpdate}
              avatarUri={userDetails.avatar}
            /> */}
            <View style={styles.profileBody}>
              <EnhancedText style={styles.profileName}>
                {userDetails.name}
              </EnhancedText>
              <EnhancedText style={styles.profileHandle}>
                {userDetails.email}
              </EnhancedText>
            </View>
            <FeatherIcon color="#fff" name="chevron-right" size={22} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.section}>
        <EnhancedText style={styles.sectionTitle}>Resources</EnhancedText>
        <View style={styles.sectionBody}>
          <View style={[styles.rowWrapper, styles.rowFirst]}>
            <View style={styles.row}>
              <EnhancedText style={styles.rowLabel}>
                Email Notifications
              </EnhancedText>
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
              <EnhancedText style={styles.rowLabel}>
                Push Notifications
              </EnhancedText>
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
        <EnhancedText style={styles.sectionTitle}>Help</EnhancedText>
        <View style={styles.sectionBody}>
          <View style={[styles.rowWrapper, styles.rowFirst]}>
            <TouchableOpacity onPress={contactUsEmail} style={styles.row}>
              <EnhancedText style={styles.rowLabel}>Contact Us</EnhancedText>

              <View style={styles.rowSpacer} />

              <FeatherIcon color="#bcbcbc" name="chevron-right" size={19} />
            </TouchableOpacity>
          </View>
          <View style={styles.rowWrapper}>
            <TouchableOpacity onPress={contactUsEmail} style={styles.row}>
              <EnhancedText style={styles.rowLabel}>Report Bug</EnhancedText>

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
              <EnhancedText style={styles.rowLabel}>
                Rate in App Store
              </EnhancedText>

              <View style={styles.rowSpacer} />

              <FeatherIcon color="#bcbcbc" name="chevron-right" size={19} />
            </TouchableOpacity>
          </View>

          <View style={[styles.rowWrapper, styles.rowLast]}>
            <TouchableOpacity
              onPress={() => setShowTerms(true)}
              style={styles.row}
            >
              <EnhancedText style={styles.rowLabel}>
                Terms and Privacy
              </EnhancedText>

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
              <EnhancedText style={[styles.rowLabel, styles.rowLabelLogout]}>
                Log Out
              </EnhancedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* <EditProfileModal
        visible={modalVisible}
        userDetails={userDetails}
        onChange={handleInputChange}
        onClose={handleCloseModal}
        onSave={handleSubmitUpdate}
        awaitingVerification={awaitingVerification}
        verificationCode={verificationCode}
        setVerificationCode={setVerificationCode}
        handleVerifyEmail={handleVerifyEmail}
      /> */}
      <EnhancedText style={styles.contentFooter}>
        App Version 1.1 #50491
      </EnhancedText>
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
