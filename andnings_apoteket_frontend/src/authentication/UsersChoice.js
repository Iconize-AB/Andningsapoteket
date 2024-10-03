import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import colors from "../common/colors/Colors";
import EnhancedButton from "../regular/EnhancedButton";

const UsersChoice = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../resources/test.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <EnhancedButton
            title="Sign In"
            onPress={() => navigation.navigate("SignIn")}
            size="medium"
            type="primary"
          />
          <EnhancedButton
            title="Go to Sign Up"
            onPress={() => navigation.navigate("SignUp")}
            size="medium"
            type="secondary"
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    padding: 60,
    height: "100%",
    justifyContent: "center", // Center content vertically
  },
});

export default UsersChoice;
