import React, { useEffect } from "react";
import { View, StyleSheet, Button } from "react-native";
import Toast from "react-native-toast-message";
import * as AppleAuthentication from 'expo-apple-authentication'; // Apple sign-in

const SingleSignOn = () => {
  // Apple Sign-In handler
  const handleAppleSignIn = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      // Handle Apple sign-in success
      console.log("Apple ID token:", credential.identityToken);
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
