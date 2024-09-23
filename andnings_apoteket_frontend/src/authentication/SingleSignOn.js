import React from "react";
import { View, StyleSheet, Button } from "react-native";
import Toast from "react-native-toast-message";
import * as AppleAuthentication from 'expo-apple-authentication';
import { Register } from './endpoints/AuthenticationEndpoints';

const SingleSignOn = ({ navigation }) => {
  // Apple Sign-In handler
  const handleAppleSignIn = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      // Extract the Apple ID token and email
      const { identityToken, email } = credential;
      console.log('Apple ID token', identityToken);

      // Make an API request to the backend to register with Apple ID
      const response = await Register(email, null, identityToken); // Pass the Apple ID token
      if (!response.ok) {
        Toast.show({
          type: "error",
          text1: "Apple sign-in failed.",
          text2: "Please try again.",
        });
      } else {
        const json = await response.json();
        await AsyncStorage.setItem("userToken", json.token);
        Toast.show({
          type: "success",
          text1: "Welcome onboard!",
          text2: "Signed in with Apple ID",
        });
        navigation?.navigate("VerifyAccountScreen", { email });
      }
    } catch (error) {
      if (error.code === 'ERR_CANCELED') {
        console.log("Apple sign-in canceled.");
      } else {
        Toast.show({
          type: "error",
          text1: "Apple sign-in failed.",
          text2: "Please try again.",
        });
      }
    }
  };

  return (
    <View style={styles.ssoContainer}>
      {/* Apple Sign-In Button */}
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={8}
        style={styles.appleButton}
        onPress={handleAppleSignIn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ssoContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  appleButton: {
    width: 200, // Adjust width as needed
    height: 44, // Adjust height as needed
    borderRadius: 8, // Match the round corners
  },
});

export default SingleSignOn;
