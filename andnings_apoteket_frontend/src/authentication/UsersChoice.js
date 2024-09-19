import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../common/colors/Colors";
import EnhancedButton from "../regular/EnhancedButton";

const UsersChoice = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <EnhancedButton
          title="Sign In"
          onPress={() => navigation.navigate("SignIn")}
          size="large"
          type="primary"
        />
        <EnhancedButton
          title="Go to Sign Up"
          onPress={() => navigation.navigate("SignUp")}
          size="large"
          type="secondary"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.background,
    alignItems: "center",
  },
  wrapper: {
    padding: 60,
    height: "100%",
  },
});

export default UsersChoice;
