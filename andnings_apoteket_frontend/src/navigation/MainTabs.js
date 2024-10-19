import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faGlobe,
  faList,
  faPersonRays,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import CustomHeader from "../regular/CustomHeader";
import HomeScreen from "../home/HomeScreen";
import CategoryScreen from "../categories/CategoryScreen";
import CreatedPlayListsScreen from "../favorites/CreatedPlayListsScreen";
import ConditionScreen from "../condition/ConditionScreen";
import LibraryScreen from "../library/LibraryScreen";
import BreathWorkListScreen from "../regular/BreathworkListScreen";
import IndividualBreathworkSessionScreen from "../sessions/IndividualBreathworkSessionScreen";
import BreathworkPlaylistDetails from "../favorites/BreathworkPlaylistDetails";
import JourneyOverviewScreen from "../challenge/JourneyOverviewScreen";
import SelectedCategoryScreen from "../categories/SelectedCategoryScreen";
import SettingsScreen from "../profile/SettingsScreen";
import SupportScreen from "../support/SupportScreen";
import LanguageScreen from "../profile/language/LanguageScreen";
import NotificationScreen from "../profile/notifications/NotificationScreen";
import ProfileScreen from "../profile/ProfileScreen";
import colors from "../common/colors/Colors";

const Tab = createBottomTabNavigator();

const MainTabs = ({ userDetails, refreshUserProfile, navigation, setShowTerms }) => {
  const styles = StyleSheet.create({
    tabBarStyle: {
      position: "absolute",
      bottom: 40,
      left: 20,
      right: 20,
      elevation: 5,
      backgroundColor: "#FFFFFF",
      borderRadius: 30,
      height: 65,
      paddingBottom: 0,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
    },
    selectedTabContainer: {
      position: "absolute",
      bottom: 30,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1,
    },
    selectedTabIcon: {
      width: 60,
      height: 60,
      borderRadius: 35,
      backgroundColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 6,
      elevation: 5,
    },
  });

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarIcon: ({ focused }) => {
          let icon;
          let iconColor = focused ? colors.primary : "#888";

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

          if (focused) {
            return (
              <View style={styles.selectedTabContainer}>
                <View style={styles.selectedTabIcon}>
                  <FontAwesomeIcon icon={icon} size={30} color="#ffffff" />
                </View>
              </View>
            );
          }

          return <FontAwesomeIcon icon={icon} size={25} color={iconColor} />;
        },
        header: ({ route }) => {
          // Hide header for LibraryScreen, CategoryScreen, and ConditionScreen
          if (['Library', 'Categories', 'Condition'].includes(route.name)) {
            return null;
          }
          return <CustomHeader navigation={navigation} route={route} />;
        },
      })}
    >
      <Tab.Screen 
        name="Categories" 
        component={CategoryScreen}
        options={{
          header: () => null, // Ensure header is hidden for CategoryScreen
        }}
      />
      <Tab.Screen name="Favorites" component={CreatedPlayListsScreen} />
      <Tab.Screen name="Home">
        {(props) => (
          <HomeScreen
            {...props}
            userDetails={userDetails}
            refreshUserProfile={refreshUserProfile}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="BreathworkList" options={{ tabBarButton: () => null }} component={BreathWorkListScreen} />
      <Tab.Screen name="IndividualBreathworkSession" options={{ tabBarButton: () => null }} component={IndividualBreathworkSessionScreen} />
      <Tab.Screen name="BreathworkPlaylistDetails" options={{ tabBarButton: () => null }} component={BreathworkPlaylistDetails} />
      <Tab.Screen name="JourneyOverviewScreen" options={{ tabBarButton: () => null }} component={JourneyOverviewScreen} />
      <Tab.Screen name="SelectedCategory" options={{ tabBarButton: () => null }} component={SelectedCategoryScreen} />
      <Tab.Screen name="Settings" options={{ tabBarButton: () => null }}>
        {(props) => <SettingsScreen {...props} setShowTerms={setShowTerms} userDetails={userDetails} />}
      </Tab.Screen>
      <Tab.Screen name="SupportScreen" options={{ tabBarButton: () => null }} component={SupportScreen} />
      <Tab.Screen name="LanguageScreen" options={{ tabBarButton: () => null }}>
        {(props) => <LanguageScreen {...props} userDetails={userDetails} />}
      </Tab.Screen>
      <Tab.Screen name="NotificationScreen" options={{ tabBarButton: () => null }} component={NotificationScreen} />
      <Tab.Screen name="ProfileScreen" options={{ tabBarButton: () => null }}>
        {(props) => <ProfileScreen {...props} userDetails={userDetails} />}
      </Tab.Screen>
      <Tab.Screen 
        name="Condition" 
        component={ConditionScreen}
        options={{
          header: () => null, // Ensure header is hidden for ConditionScreen
        }}
      />
      <Tab.Screen 
        name="Library" 
        component={LibraryScreen}
        options={{
          header: () => null, // Ensure header is hidden for LibraryScreen
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
