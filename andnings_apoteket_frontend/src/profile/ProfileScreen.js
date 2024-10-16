import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";
import colors from "../common/colors/Colors";
import { LoadingScreen } from "../regular/LoadingSreen";
import EnhancedText from "../regular/EnhancedText";
import { useTranslation } from "react-i18next";
import Tabs from "../regular/Tabs";
import UserDetails from "./UserDetails";

export default function ProfileScreen({ navigation, userDetails, route }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("userDetails");
  const { setUserDetails } = useAuth();
  const tabs = [
    { label: "User Details", value: "userDetails" },
    { label: "Dashboard", value: "dashboard" },
    { label: "Check-in", value: "checkin" },
  ];
  const [isLoading, setIsLoading] = useState(false);
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "userDetails":
        return <UserDetails userDetails={userDetails} />;
      case "dashboard":
        return <Dashboard />;
      case "checkin":
        return <CheckIn />;
      default:
        return <UserDetails userDetails={userDetails} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <EnhancedText style={styles.title}>Profile</EnhancedText>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Settings", {
              userDetails,
              setUserDetails,
              navigation,
              handleOnDelete,
              fetchUserProfile,
              handleSignOut,
            })
          }
        >
          <FontAwesomeIcon icon={faCog} size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Render Tabs */}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />

      {/* Render tab content based on active tab */}
      {renderTabContent()}
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
