import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(
        "http://localhost:3000/profileRoute/fetch-profile",
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
          fullName: json.fullName,
          email: json.email,
          id: json.id,
          language: json.language,
          lastActive: json.lastActive,
          avatar: json.profile.profileImageUrl,
          emailNotification: json.profile.emailNotifications,
          pushNotification: json.profile.pushNotifications,
        });
        await AsyncStorage.setItem("userDetails", JSON.stringify(json));
      } else {
        return;
      }
    } catch (error) {
      return;
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
