import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import 'intl-pluralrules';
import * as Notifications from "expo-notifications";
import { ActivityIndicator, View } from "react-native";
import Toast from "react-native-toast-message";
import {
  faDrumstickBite,
  faDumbbell,
  faGlobe,
  faHome,
  faList,
  faPersonRays,
  faUser,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import ProfileScreen from "./src/profile/ProfileScreen";
import SignupScreen from "./src/authentication/SignupScreen";
import ForgotPasswordScreen from "./src/authentication/ForgotPasswordScreen";
import VerifyAccountScreen from "./src/authentication/VerifyAccountScreen";
import AuthorizationCodeScreen from "./src/authentication/AuthorizationCodeScreen";
import ResetAccountScreen from "./src/authentication/ResetAccountScreen";
import DynamicSplashScreen from "./src/regular/DynamicSplashScreen";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import toastConfiguration from "./src/common/ToastConfiguration";
import CustomHeader from "./src/regular/CustomHeader";
import UsersChoice from "./src/authentication/UsersChoice";
import SigninScreen from "./src/authentication/SigninScreen";
import HomeScreen from "./src/home/HomeScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

import { createDrawerNavigator } from "@react-navigation/drawer";

import CustomDrawerContent from "./src/regular/CustomDrawerContent";
import { I18nextProvider } from "react-i18next";
import i18n from "./src/i18n";
import BreathWorkListScreen from "./src/regular/BreathworkListScreen";
import TermsAndConditionPopup from "./src/regular/TermsAndConditionPopup";
import ConditionScreen from "./src/condition/ConditionScreen";
import CreatedListScreen from "./src/favorites/CreatedListScreen";
import CategoryScreen from "./src/categories/CategoryScreen";
import LibraryScreen from "./src/library/LibraryScreen";
import colors from "./src/common/colors/Colors";

const Drawer = createDrawerNavigator();

function DrawerNavigator({ userDetails, refreshUserProfile, handleSignOut }) {
  const [showTerms, setShowTerms] = useState(false);
  
  if (showTerms) {
    return <TermsAndConditionPopup onClose={() => setShowTerms(false)} />;
  }

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent
          {...props}
          userDetails={userDetails}
          setShowTerms={setShowTerms}
          handleSignOut={handleSignOut}
        />
      )}
      screenOptions={{
        headerShown: false, // Ensure no default header shows in drawer
      }}
    >
      <Drawer.Screen name="MainTabs">
        {(props) => (
          <Root
            {...props}
            userDetails={userDetails}
            refreshUserProfile={refreshUserProfile}
          />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

function Root({ userDetails, refreshUserProfile, navigation }) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 40,
          left: 20,
          right: 20,
          elevation: 5,
          backgroundColor: "#FFFFFF",
          borderRadius: 30, // Rounded navigation bar
          height: 65,
          paddingBottom: 0,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
        },
        tabBarIcon: ({ focused }) => {
          let icon;
          let iconColor = focused ? colors.primary : "#888";
          let isHome = route.name === "Home";

          // Icons for different routes
          switch (route.name) {
            case "Home":
              icon = faGlobe;
              break;
            case "Categories":
              icon = faWind;
              break;
            case "Favorites":
              icon = faList;
              break;
            case "Condition":
              icon = faPersonRays;
              break;
            case "Library":
              icon = faWind;
              break;
          }

          // Special style for Home icon
          if (isHome) {
            return (
              <View style={styles.homeIconContainer}>
                <View
                  style={[
                    styles.homeIcon,
                    focused && styles.homeIconFocused, // Apply focused style
                  ]}
                >
                  <FontAwesomeIcon icon={icon} size={30} color={focused ? "#ffffff" : "#000"} />
                </View>
              </View>
            );
          }

          // Normal icons for other tabs
          return <FontAwesomeIcon icon={icon} size={25} color={iconColor} />;
        },
        header: () => <CustomHeader navigation={navigation} />,
      })}
    >
      <Tab.Screen name="Categories">
        {(props) => <CategoryScreen {...props} />}
      </Tab.Screen>
      <Tab.Screen name="Favorites">
        {(props) => <CreatedListScreen {...props} />}
      </Tab.Screen>
      <Tab.Screen name="Home">
        {(props) => (
          <HomeScreen
            {...props}
            userDetails={userDetails}
            refreshUserProfile={refreshUserProfile}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="BreathworkList" options={{ tabBarButton: () => null }}>
        {(props) => (
          <BreathWorkListScreen {...props} />
        )}
      </Tab.Screen>
      <Tab.Screen name="Condition">
        {(props) => <ConditionScreen {...props} />}
      </Tab.Screen>
      <Tab.Screen name="Library">
        {(props) => <LibraryScreen {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

function AuthStack({}) {
  return (
    <Stack.Navigator
      screenOptions={({ navigation, route }) => ({
        headerShown: true,
        header: () => {
          const backgroundColor = "#000000";
          return <CustomHeader backgroundColor={backgroundColor} />;
        },
      })}
    >
      <Stack.Screen name="UserChoose" component={UsersChoice} />
      <Stack.Screen name="SignIn" component={SigninScreen} />
      <Stack.Screen name="SignUp" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen
        name="VerifyAccountScreen"
        component={VerifyAccountScreen}
      />
      <Stack.Screen
        name="AuthorizationCode"
        component={AuthorizationCodeScreen}
      />
      <Stack.Screen name="ResetPasswordScreen" component={ResetAccountScreen} />
    </Stack.Navigator>
  );
}

// async function sendPushTokenToBackend(userId, token) {
//   try {
//     const response = await fetch(
//       "https://primal-backend-851afa707cbd.herokuapp.com/register-push-token",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userId: userId,
//           token: token,
//         }),
//       }
//     );
//   } catch (error) {
//     console.error("Error sending push token to backend:", error);
//   }
// }

function AppNavigator({ navigation }) {
  const [isReady, setIsReady] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { userToken, setUserToken, userDetails, refreshUserProfile } =
    useAuth();

  useEffect(() => {
    async function initApp() {
      try {
        await Font.loadAsync({
          BahnSchrift: require("./src/fonts/bahnschrift.ttf"),
        });
        const token = await AsyncStorage.getItem("userToken");
        setUserToken(token);
      } catch (error) {
        console.log(error);
      } finally {
        setFontsLoaded(true);
      }
    }

    initApp();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleSignOut = async () => {
    await AsyncStorage.removeItem("userToken");
    setUserToken(null);
  };

  if (!isReady) {
    return <DynamicSplashScreen />;
  }

  return userToken ? (
    <DrawerNavigator
      userDetails={userDetails}
      refreshUserProfile={refreshUserProfile}
      handleSignOut={handleSignOut} // Pass sign-out function
    />
  ) : (
    <AuthStack />
  );
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
          <Toast config={toastConfiguration} />
        </NavigationContainer>
      </AuthProvider>
    </I18nextProvider>
  );
}

const styles = {
  homeIconContainer: {
    position: "absolute",
    bottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  homeIcon: {
    width: 60,
    height: 60,
    borderRadius: 35,
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  homeIconFocused: {
    backgroundColor: colors.primary,
    shadowColor: "#4A90E2",
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
};

export default App;
