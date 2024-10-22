import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import i18n, { changeLanguage as i18nChangeLanguage } from "../i18n";
import en from "../translations/en.json";
import sv from "../translations/sv.json";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(
        "http://localhost:3000/v1/profile/fetch-profile",
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
        const updatedUserDetails = {
          fullName: json.fullName,
          email: json.email,
          id: json.id,
          language: json.language,
          lastActive: json.lastActive,
          subscription: json.subscription,
          viewedOnboarding: json.viewedOnBoarding,
          avatar: json.profile.profileImageUrl,
          emailNotification: json.profile.emailNotifications,
          pushNotification: json.profile.pushNotifications,
        };
        setUserDetails(updatedUserDetails);
        await AsyncStorage.setItem("userDetails", JSON.stringify(updatedUserDetails));
        
        // Set the language for i18n
        i18nChangeLanguage(updatedUserDetails.language);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const refreshUserProfile = useCallback(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const signIn = async (newToken) => {
    await AsyncStorage.setItem("userToken", newToken);
    refreshUserProfile();
    setUserToken(newToken);
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("userToken");
    setUserToken(null);
    setUserDetails(null);
  };

  const changeLanguageSetting = async (newLanguage) => {
    if (userDetails) {
      const updatedUserDetails = { ...userDetails, language: newLanguage };
      setUserDetails(updatedUserDetails);
      await AsyncStorage.setItem("userDetails", JSON.stringify(updatedUserDetails));
      i18nChangeLanguage(newLanguage);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        userDetails,
        setUserDetails,
        setUserToken,
        refreshUserProfile,
        signIn,
        signOut,
        changeLanguageSetting,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
