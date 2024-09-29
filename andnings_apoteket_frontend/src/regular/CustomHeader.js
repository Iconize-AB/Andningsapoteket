import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  Pressable,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Svg, Path } from "react-native-svg";
import { faBars } from "@fortawesome/free-solid-svg-icons"; // Use 'bars' icon for menu
import colors from "../common/colors/Colors";

const CustomHeader = ({ navigation, route }) => {
  const windowHeight = Dimensions.get("window").height;

  const getHeaderHeight = () => {
    if (Platform.OS === "ios") {
      if (windowHeight > 800) {
        return 80;
      } else if (windowHeight > 700) {
        return 70;
      } else {
        return 60;
      }
    } else {
      return 60;
    }
  };
  const headerHeight = getHeaderHeight();

  // Function to open drawer
  function openDrawer() {
    if (navigation) {
      navigation.openDrawer();
    }
  }

  return (
    <View style={[styles.headerContainer, { height: headerHeight }]}>
      {/* Hamburger Icon */}
      {route?.name === "Home" ? (
        <TouchableOpacity onPress={openDrawer} style={styles.hamburgerButton}>
          <FontAwesomeIcon icon={faBars} size={30} color={colors.primary} />
        </TouchableOpacity>
      ) : (
        // Corrected back button functionality
        <Pressable style={styles.backButton} onPress={() => navigation.navigate("Home")}>
          <Svg width="30" height="30" viewBox="0 0 180 180" fill="none">
            <Path
              d="M180 90C180 66.1305 170.518 43.2387 153.64 26.3604C136.761 9.48212 113.869 0 90 0C66.1305 0 43.2387 9.48212 26.3604 26.3604C9.48212 43.2387 0 66.1305 0 90C0 113.869 9.48212 136.761 26.3604 153.64C43.2387 170.518 66.1305 180 90 180C113.869 180 136.761 170.518 153.64 153.64C170.518 136.761 180 113.869 180 90ZM76.4297 132.504L41.3086 94.8516C40.0781 93.5156 39.375 91.793 39.375 90C39.375 88.207 40.0781 86.4492 41.3086 85.1484L76.4297 47.4961C77.9062 45.9141 79.9805 45 82.1602 45C86.4844 45 90 48.5156 90 52.8398V73.125H123.75C129.973 73.125 135 78.1523 135 84.375V95.625C135 101.848 129.973 106.875 123.75 106.875H90V127.16C90 131.484 86.4844 135 82.1602 135C79.9805 135 77.9062 134.086 76.4297 132.504Z"
              fill={colors.primary}
            />
          </Svg>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    backgroundColor: colors.background,
    justifyContent: "center",
    position: "relative",
    flexDirection: "row",
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 45,
  },
  hamburgerButton: {
    position: "absolute",
    left: 20,
    top: 45, // Adjust based on your design
  },
});

export default CustomHeader;
