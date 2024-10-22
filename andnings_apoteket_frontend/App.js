import React from "react";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import Toast from "react-native-toast-message";
import { I18nextProvider } from "react-i18next";
import 'intl-pluralrules';  // Add this import

import { AuthProvider, useAuth } from "./src/context/AuthContext";
import i18n, { I18nProvider } from "./src/i18n";
import toastConfiguration from "./src/common/ToastConfiguration";
import DynamicSplashScreen from "./src/regular/DynamicSplashScreen";
import AuthStack from "./src/navigation/AuthStack";
import MainNavigator from "./src/navigation/MainNavigator";

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppContent />
        <Toast config={toastConfiguration} />
      </NavigationContainer>
    </AuthProvider>
  );
};

const AppContent = () => {
  const [isReady, setIsReady] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { userToken, setUserToken, userDetails, refreshUserProfile } = useAuth();

  useEffect(() => {
    const initApp = async () => {
      try {
        await loadFonts();
        const token = await AsyncStorage.getItem("userToken");
        setUserToken(token);
      } catch (error) {
        console.error("Error initializing app:", error);
      } finally {
        setFontsLoaded(true);
      }
    };

    initApp();
  }, [setUserToken]);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!isReady || !fontsLoaded) {
    return <DynamicSplashScreen />;
  }

  const onboardingCompleted = userDetails?.viewedOnboarding === "completed";
  const shouldShowAuthStack = !userToken || !userDetails || !onboardingCompleted;

  return shouldShowAuthStack ? (
    <AuthStack viewedOnBoarding={userDetails?.viewedOnboarding} />
  ) : (
    <MainNavigator
      userDetails={userDetails}
      refreshUserProfile={refreshUserProfile}
    />
  );
};

const loadFonts = async () => {
  await Font.loadAsync({
    BahnSchrift: require("./src/fonts/bahnschrift.ttf"),
    HelveticaNeueBold: require("./src/fonts/HelveticaNeueBold.ttf"),
    HelveticaNeueRegular: require("./src/fonts/HelveticaNeueRegular.ttf"),
  });
};

export default App;
