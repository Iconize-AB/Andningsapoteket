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
          recipeListsCount: json.recipeListsCount,
          viewedAnalyticsIntroduction: json.viewedAnalyticsIntroduction,
          subscription: json.subscription,
          viewedReceipeListIntroduction: json.viewedReceipeListIntroduction,
          viewedRecoveryIntroduction: json.viewedRecoveryIntroduction,
          viewedWorkInIntroduction: json.viewedWorkInIntroduction,
          viewedWorkoutIntroduction: json.viewedWorkoutIntroduction,
          viewedWelcomePopup: json.viewedWelcomePopup,
          viewedNutritionIntroduction: json.viewedNutritionIntroduction,
          userCategories: json.categories,
          acceptedTermsAndCondition: json.acceptedTermsAndCondition,
          avatar: json.profileImageUrl,
          batches: json.batches,
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
