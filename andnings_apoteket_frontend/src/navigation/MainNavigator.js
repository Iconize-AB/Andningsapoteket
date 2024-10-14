import React, { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomDrawerContent from "../regular/CustomDrawerContent";
import TermsAndConditionPopup from "../regular/TermsAndConditionPopup";
import SubscriptionModal from "../subscription/SubscriptionModal";
import MainTabs from "./MainTabs";

const Drawer = createDrawerNavigator();

const MainNavigator = ({ userDetails, refreshUserProfile }) => {
  const [showTerms, setShowTerms] = useState(false);
  const [showPlusMembership, setShowPlusMembership] = useState(false);

  const handleSignOut = async () => {
    await AsyncStorage.removeItem("userToken");
    // Implement a way to update the auth context here
    // For example: setUserToken(null);
  };

  if (showPlusMembership) {
    return (
      <SubscriptionModal
        isModalVisible={showPlusMembership}
        setModalVisible={setShowPlusMembership}
      />
    );
  }

  if (showTerms) {
    return <TermsAndConditionPopup onClose={() => setShowTerms(false)} />;
  }

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent
          {...props}
          setShowPlusMembership={setShowPlusMembership}
          userDetails={userDetails}
          setShowTerms={setShowTerms}
          handleSignOut={handleSignOut}
        />
      )}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="MainTabs">
        {(props) => (
          <MainTabs
            {...props}
            setShowPlusMembership={setShowPlusMembership}
            setShowTerms={setShowTerms}
            userDetails={userDetails}
            refreshUserProfile={refreshUserProfile}
          />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default MainNavigator;

