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
  faHome,
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

const Drawer = createDrawerNavigator();

function DrawerNavigator({ userDetails, refreshUserProfile, handleSignOut }) {
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent
          {...props}
          userDetails={userDetails}
          handleSignOut={handleSignOut}
        />
      )}
      screenOptions={{
        headerShown: false,
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

function Root({ userDetails, refreshUserProfile }) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route, navigation }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 40,
          left: 0,
          right: 0,
          elevation: 5,
          backgroundColor: "#FFFFFF",
          borderRadius: 15,
          height: 60,
          marginLeft: 10,
          marginRight: 10,
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
        },
        tabBarIcon: ({ focused }) => {
          let icon;
          let iconColor = "#000"; // Default color

          switch (route.name) {
            case "Home":
              icon = faHome;
              break;
            case "Profile":
              icon = faUser;
              break;
            case "WorkOut":
              icon = faDumbbell;
              break;
            case "WorkIn":
              icon = faWind;
              break;
            case "Recovery":
              icon = faPersonRays;
              break;
            case "Nutrition":
              icon = faDrumstickBite;
              break;
          }

          return (
            <View
              style={{
                width: 50,
                height: 50,
                position: "absolute",
                bottom: 0,
                top: 5,
                borderRadius: 25,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon
                icon={icon}
                size={30}
                color={focused ? "#000" : iconColor} // Change icon color when focused
              />
            </View>
          );
        },
        header: () => <CustomHeader navigation={navigation} />, // Custom header
      })}
    >
      <Tab.Screen name="Home">
        {(props) => (
          <HomeScreen
            {...props}
            userDetails={userDetails}
            refreshUserProfile={refreshUserProfile}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Profile">
        {(props) => <ProfileScreen {...props} />}
      </Tab.Screen>
      <Tab.Screen name="BreathworkList" options={{ tabBarButton: () => null }}>
        {(props) => (
          <BreathWorkListScreen {...props} />
        )}
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

export default App;
