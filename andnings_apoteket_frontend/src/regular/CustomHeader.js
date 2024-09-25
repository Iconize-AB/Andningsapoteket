import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons"; // Use 'bars' icon for menu
import colors from "../common/colors/Colors";
import logo from "../resources/iconize.png";

const CustomHeader = ({ navigation }) => {
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
      <TouchableOpacity onPress={openDrawer} style={styles.hamburgerButton}>
        <FontAwesomeIcon icon={faBars} size={30} color={colors.primary} />
      </TouchableOpacity>

      {/* Logo */}
      {/* <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Image style={styles.logo} source={logo} />
      </TouchableOpacity> */}
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
  logo: {
    width: 30,
    marginTop: 40,
    height: 30,
  },
  hamburgerButton: {
    position: "absolute",
    left: 20,
    top: 45, // Adjust based on your design
  },
});

export default CustomHeader;
