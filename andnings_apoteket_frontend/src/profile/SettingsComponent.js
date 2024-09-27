import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
} from "react-native";
import { RefreshControl } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import EnhancedText from "../regular/EnhancedText";
import {
  emailNotificationSettingsChange,
  pushNotificationSettingsChange,
} from "./endpoints/SettingsEndpoints";
import EnhancedTextInput from "../regular/EnhancedTextInput";
import { ChangeUserDetails } from "./endpoints/ProfileEndpoints";
import colors from "../common/colors/Colors";

const SettingsComponent = ({
  userDetails,
  setUserDetails,
  fetchUserProfile,
  handleOnDelete,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [fullName, setFullName] = useState(userDetails.fullName || "");
  const [email, setEmail] = useState(userDetails.email || "");
  const [password, setPassword] = useState("");
  const [awaitingVerification, setAwaitingVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchUserProfile();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleToggleEmailNotification = async (newSetting) => {
    const token = await AsyncStorage.getItem("userToken");
    const response = await emailNotificationSettingsChange(token, newSetting);
    if (response.ok) {
      setUserDetails({ ...userDetails, emailNotification: newSetting });
    } else {
      Toast.show({
        type: "error",
        text1: "Sorry, friend. We failed to update your email notification!",
        text2: " Please try again 🙏",
      });
    }
  };

  const handleTogglePushNotification = async (newSetting) => {
    const token = await AsyncStorage.getItem("userToken");
    const response = await pushNotificationSettingsChange(token, newSetting);
    if (response.ok) {
      setUserDetails({ ...userDetails, pushNotification: newSetting });
    } else {
      Toast.show({
        type: "error",
        text1: "Sorry, friend. We failed to update your push notification!",
        text2: " Please try again 🙏",
      });
    }
  };

  const handleVerifyEmail = async () => {
    // Logic to verify email with the verification code
    Toast.show({
      type: "success",
      text1: "Email verified successfully!",
    });
    setAwaitingVerification(false);
  };

  const handleSaveChanges = async () => {
    const token = await AsyncStorage.getItem("userToken");
    const updatedUserDetails = {
      ...userDetails,
      fullName: fullName,
      email: email,
    };
    try {
      const response = await ChangeUserDetails(token, updatedUserDetails);
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

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {awaitingVerification ? (
        <View style={styles.section}>
          <EnhancedText style={styles.sectionTitle}>
            Enter Verification Code
          </EnhancedText>
          <TextInput
            style={styles.input}
            value={verificationCode}
            onChangeText={setVerificationCode}
            placeholder="Verification Code"
            keyboardType="number-pad"
          />
          <TouchableOpacity
            style={styles.buttonSave}
            onPress={handleVerifyEmail}
          >
            <EnhancedText style={styles.buttonText}>Verify</EnhancedText>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={[styles.section, { paddingTop: 16 }]}>
            <EnhancedText style={styles.sectionTitle}>
              Account details
            </EnhancedText>
            <View style={styles.sectionBody}>
              <View style={styles.rowInput}>
                <EnhancedText style={styles.rowLabel}>Name</EnhancedText>
                <EnhancedTextInput
                  style={styles.input}
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Name"
                />
              </View>

              <View style={styles.rowInput}>
                <EnhancedText style={styles.rowLabel}>Email</EnhancedText>
                <EnhancedTextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.rowInput}>
                <EnhancedText style={styles.rowLabel}>Password</EnhancedText>
                <EnhancedTextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="New Password"
                  secureTextEntry
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.buttonSave}
              onPress={handleSaveChanges}
            >
              <EnhancedText style={styles.buttonText}>Save Changes</EnhancedText>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <EnhancedText style={styles.sectionTitle}>Notifications</EnhancedText>
            <View style={styles.sectionBody}>
              <View style={[styles.rowWrapper, styles.rowFirst]}>
                <View style={styles.row}>
                  <EnhancedText style={styles.rowLabel}>
                    Email Notifications
                  </EnhancedText>
                  <View style={styles.rowSpacer} />
                  <Switch
                    onValueChange={handleToggleEmailNotification}
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
        </>
      )}

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
            <TouchableOpacity onPress={handleOnDelete} style={styles.row}>
              <EnhancedText style={[styles.rowLabel, styles.rowLabelLogout]}>
                Delete my account
              </EnhancedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <EnhancedText style={styles.contentFooter}>
        App Version 1.1 #50491
      </EnhancedText>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    marginTop: 60,
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
    padding: 16,
    backgroundColor: colors.background,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  rowInput: {
    marginBottom: 12,
    display: "flex",
  },
  row: {
    marginBottom: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowLabel: {
    fontSize: 16,
    letterSpacing: 0.24,
    color: "#000",
    marginBottom: 0,
  },
  rowSpacer: {
    display: "none",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  buttonSave: {
    backgroundColor: "#466F78",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  rowWrapper: {
    paddingLeft: 16,
    borderTopWidth: 1,
    borderWidth: 1,
    borderColor: "#fff",
  },
  contentFooter: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    color: "#a69f9f",
  },
  rowLabelLogout: {
    fontSize: 16,
    color: "#dc2626",
  },
});

export default SettingsComponent;
