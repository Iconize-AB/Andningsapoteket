import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Toast from "react-native-toast-message";
import BackIcon from "../regular/BackIcon";
import EnhancedText from "../regular/EnhancedText";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    let response;

    if (response.ok) {
      Toast.show({
        type: "success",
        text1: "Your code has been sent!",
        text1Style: {
          color: "#466F78",
        },
        text2Style: {
          color: "#466F78",
        },
        backgroundColor: "#000",
      });
      navigation.navigate("AuthorizationCode", { email });
    } else {
      Toast.show({
        type: "error",
        text1: "Sorry, friend. The technology failed us.",
        text2: "Please try again  🙏",
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
        <BackIcon />
        <View style={styles.wrapper}>
          <View style={[styles.overlay, { backgroundColor: "#466F78" }]} />
          <EnhancedText style={styles.title}>FORGOT PASSWORD</EnhancedText>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            placeholderTextColor="#A9A9A9"
            keyboardType="email-address"
          />
          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            <EnhancedText style={styles.buttonText}>Send Reset Link</EnhancedText>
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
    marginBottom: 10,
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.8,
  },
  text: {
    fontSize: 22,
    marginBottom: 20,
    color: "#fff",
  },
  input: {
    height: 50,
    width: "100%",
    color: "#fff",
    fontSize: 16,
    backgroundColor: "#000000",
    fontFamily: "BebasNeue-Regular",
    borderRadius: 10,
    margin: 12,
    borderWidth: 1,
    padding: 10,
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
  textButton: {
    color: "#fff",
    textDecorationLine: "underline",
  },
  buttonText: {
    color: "#fff",
    textTransform: "uppercase",
    fontSize: 18,
  },
});

export default ForgotPasswordScreen;
