import React, { useState } from "react";
import { View, StyleSheet, Switch } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { emailNotificationSettingsChange, pushNotificationSettingsChange } from "../endpoints/SettingsEndpoints";
import EnhancedText from "../../regular/EnhancedText";
import colors from "../../common/colors/Colors";
import { useAuth } from "../../context/AuthContext";

const NotificationScreen = () => {
  const {userDetails, setUserDetails} = useAuth();
  const [emailNotification, setEmailNotification] = useState(userDetails.emailNotification);
  const [pushNotification, setPushNotification] = useState(userDetails.pushNotification);

  const handleToggleEmailNotification = async (newSetting) => {
    const token = await AsyncStorage.getItem("userToken");
    const response = await emailNotificationSettingsChange(token, newSetting);
    const data = await response.json();
    console.log('response', data);
    if (response.ok) {
      setEmailNotification(newSetting);
      console.log('newSetting', newSetting);
      setUserDetails({ ...userDetails, emailNotification: newSetting });
    } else {
      Toast.show({
        type: "error",
        text1: "Failed to update email notification!",
        text2: "Please try again.",
      });
    }
  };

  const handleTogglePushNotification = async (newSetting) => {
    const token = await AsyncStorage.getItem("userToken");
    const response = await pushNotificationSettingsChange(token, newSetting);
    if (response.ok) {
      setPushNotification(newSetting);
      setUserDetails({ ...userDetails, pushNotification: newSetting });
    } else {
      Toast.show({
        type: "error",
        text1: "Failed to update push notification!",
        text2: "Please try again.",
      });
    }
  };

  return (
    <View style={styles.container}>
      <EnhancedText style={styles.sectionTitle}>Notification Settings</EnhancedText>

      <View style={styles.notificationOption}>
        <EnhancedText style={styles.optionLabel}>Email Notifications</EnhancedText>
        <Switch
          onValueChange={handleToggleEmailNotification}
          value={emailNotification}
        />
      </View>

      <View style={styles.notificationOption}>
        <EnhancedText style={styles.optionLabel}>Push Notifications</EnhancedText>
        <Switch
          onValueChange={handleTogglePushNotification}
          value={pushNotification}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  notificationOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionLabel: {
    fontSize: 16,
  },
});

export default NotificationScreen;
