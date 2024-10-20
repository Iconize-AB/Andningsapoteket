import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Toast from 'react-native-toast-message';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { Register } from './endpoints/AuthenticationEndpoints';
import { FontAwesome } from '@expo/vector-icons';

WebBrowser.maybeCompleteAuthSession(); // Important for Google Sign-In

const SingleSignOn = ({ navigation }) => {
  // Google Sign-In handler
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: 'YOUR_EXPO_CLIENT_ID',
    iosClientId: 'YOUR_IOS_CLIENT_ID',
    androidClientId: 'YOUR_ANDROID_CLIENT_ID',
    webClientId: 'YOUR_WEB_CLIENT_ID',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      console.log('Google token', authentication.accessToken);

      Register(null, null, authentication.accessToken)
        .then(async (res) => {
          if (!res.ok) {
            Toast.show({
              type: 'error',
              text1: 'Google sign-in failed.',
              text2: 'Please try again.',
            });
          } else {
            const json = await res.json();
            await AsyncStorage.setItem('userToken', json.token);
            Toast.show({
              type: 'success',
              text1: 'Welcome onboard!',
              text2: 'Signed in with Google',
            });
            navigation?.navigate('VerifyAccountScreen');
          }
        })
        .catch((error) => {
          Toast.show({
            type: 'error',
            text1: 'Google sign-in failed.',
            text2: 'Please try again.',
          });
        });
    }
  }, [response]);

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
          type: 'error',
          text1: 'Apple sign-in failed.',
          text2: 'Please try again.',
        });
      } else {
        const json = await response.json();
        await AsyncStorage.setItem('userToken', json.token);
        Toast.show({
          type: 'success',
          text1: 'Welcome onboard!',
          text2: 'Signed in with Apple ID',
        });
        navigation?.navigate('VerifyAccountScreen', { email });
      }
    } catch (error) {
      if (error.code === 'ERR_CANCELED') {
        console.log('Apple sign-in canceled.');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Apple sign-in failed.',
          text2: 'Please try again.',
        });
      }
    }
  };

  return (
    <View style={styles.ssoContainer}>
      {/* Google Sign-In Button */}
      <TouchableOpacity
        onPress={() => promptAsync()}
        disabled={!request}
        style={styles.googleButton}
      >
        <FontAwesome name="google" size={20} color="#000" />
        <Text style={styles.buttonText}>Google</Text>
      </TouchableOpacity>

      {/* Apple Sign-In Button */}
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={styles.appleButton}
        onPress={handleAppleSignIn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ssoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  googleButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    height: 40,
    borderRadius: 5,
  },
  appleButton: {
    width: '48%',
    height: 40,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default SingleSignOn;
