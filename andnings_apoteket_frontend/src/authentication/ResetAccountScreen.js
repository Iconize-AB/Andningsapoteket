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

const ResetAccountScreen = ({ route, navigation }) => {
  const { email } = route.params;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
      let response;
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
      <ImageBackground
        source={{
          uri: "https://images.squarespace-cdn.com/content/v1/60191f970b559218574dd995/e61a9073-054f-46ac-9847-12fda6e9cd79/PHOTO-2022-10-21-17-02-32.jpg?format=2500w",
        }}
        style={styles.image}
      >
        <BackIcon navigation={navigation} />
        <View style={styles.wrapper}>
          <View style={[styles.overlay, { backgroundColor: "#466F78" }]} />
          <EnhancedText style={styles.title}>SET NEW PASSWORD</EnhancedText>
          {/* <PasswordField
            onChangeText={setNewPassword}
            value={newPassword}
            placeholder="New Password"
          />
          <PasswordField
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            placeholder="Confirm Password"
          /> */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleUpdatePassword}
          >
            <EnhancedText style={styles.buttonText}>Update Password</EnhancedText>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.8,
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
