import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import colors from "../common/colors/Colors";

const CustomHeader = ({ route, navigation }) => {
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
  function navigateUser() {
    if (navigation) {
      navigation.navigate("Home");
    }
  }

  return (
    <View style={[styles.headerContainer, { height: headerHeight }]}>
      <TouchableOpacity onPress={navigateUser}>
        <Image style={styles.logo} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    backgroundColor: colors.background,
    
    justifyContent: "center",
    position: "relative",
  },
  logo: {
    width: 120,
    marginTop: 40,
    height: 20,
  },
});

export default CustomHeader;
