import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Toast from "react-native-toast-message";
import BackIcon from "../regular/BackIcon";
import EnhancedText from "../regular/EnhancedText";
import EnhancedTextInput from "../regular/EnhancedTextInput";
import colors from "../common/colors/Colors";
import EnhancedButton from "../regular/EnhancedButton";
import { SetNewPassword } from "./endpoints/AuthenticationEndpoints";

const ResetAccountScreen = ({ route, navigation }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { email } = route.params;

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Passwords do not match!",
        text1Style: {
          color: "#466F78",
        },
        text2Style: {
          color: "#466F78",
        },
        backgroundColor: "#000",
      });
      return;
    }

    try {
      const response = await SetNewPassword(email, newPassword);
      if (response.ok) {
        Toast.show({
          type: "success",
          text1: "Yes!",
          icon: "heart",
          text2: "Your password was updated successfully!",
          text1Style: {
            color: "#466F78",
          },
          text2Style: {
            color: "#466F78",
          },
          backgroundColor: "#000",
        });
        navigation.navigate("SignIn");
      } else {
        Toast.show({
          type: "error",
          text1: "Sorry, friend. The technology failed us.",
          text2: "Please try again 🙏",
          text1Style: {
            color: "#466F78",
          },
          text2Style: {
            color: "#466F78",
          },
          backgroundColor: "#000",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Sorry, friend. The technology failed us.",
        text2: "Please try again 🙏",
        text1Style: {
          color: "#466F78",
        },
        text2Style: {
          color: "#466F78",
        },
        backgroundColor: "#000",
      });
    }
  };

  return (
    <View style={styles.container}>
        <BackIcon navigation={navigation} />
        <View style={styles.wrapper}>
          <View style={[styles.overlay, { backgroundColor: "#466F78" }]} />
          <Text style={styles.title}>SET NEW PASSWORD</Text>
          <EnhancedTextInput
            onChangeText={setNewPassword}
            value={newPassword}
            placeholder="New Password"
            placeholderTextColor="#A9A9A9"
            secureTextEntry={true}
          />
          <EnhancedTextInput
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            placeholder="New Password"
            placeholderTextColor="#A9A9A9"
            secureTextEntry={true}
          />
          <EnhancedButton
            onPress={handleUpdatePassword}
            title="Update Password"
            size="medium"
            type="outline"
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
  title: {
    color: "#000",
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  wrapper: {
    padding: 60,
    paddingTop: 10,
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 50,
    width: "100%",
    color: "#fff",
    backgroundColor: "#000000",
    borderRadius: 10,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#F55E09",
    padding: 10,
    textTransform: "uppercase",
    width: "100%",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 120,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default ResetAccountScreen;
