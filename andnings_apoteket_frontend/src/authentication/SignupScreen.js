// SignupScreen.js

import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EnhancedText from "../regular/EnhancedText";
import { isValidEmail } from "../common/Validation";
import BackIcon from "../regular/BackIcon";
import EnhancedTextInput from "../regular/EnhancedTextInput";
import colors from "../common/colors/Colors";
import EnhancedButton from "../regular/EnhancedButton";
import SingleSignOn from "./SingleSignOn";
import { Register } from "./endpoints/AuthenticationEndpoints";
import CustomCheckbox from "../regular/CustomCheckbox";
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { LinearGradient } from 'expo-linear-gradient';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState({ email: "", password: "" });

  const handleSignUp = async () => {
    let isValid = true;
    const token = await AsyncStorage.removeItem("userToken");
    if (!isValidEmail(email)) {
      setFormError((prev) => ({
        ...prev,
        email: "Please enter a valid email address.",
      }));
      isValid = false;
    }
    if (!password) {
      setFormError((prev) => ({ ...prev, password: "Password is required." }));
      isValid = false;
    }
    if (!password === confirmPassword) {
      setFormError((prev) => ({ ...prev, password: "Passwords do not match." }));
      isValid = false;
    }
    if (!isValid) return;
    try {
      const response = await Register(email, password);
      console.log('response', response);
      if (!response.ok) {
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
        return;
      } else {
        Toast.show({
          type: "success",
          text1: "Welcome onboard friend.",
          text2: "Let's get you started!",
          text1Style: {
            color: "#466F78",
          },
          text2Style: {
            color: "#466F78",
          },
          backgroundColor: "#000",
        });
        const json = await response.json();
        await AsyncStorage.setItem("userToken", json.token);
        navigation?.navigate("VerifyAccountScreen", { email });
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

  const isFormValid = name && email && password && confirmPassword && password === confirmPassword;

  return (
    <LinearGradient colors={['#1E3A5F', '#091D34']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.content}>
            <EnhancedText style={styles.title}>Create Your{'\n'}Account</EnhancedText>
            <View style={styles.inputContainer}>
              <EnhancedTextInput
                value={name}
                onChangeText={setName}
                placeholder="Name"
                autoCapitalize="words"
              />
              <EnhancedTextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
                errorMessage={formError.email}
              />
              <EnhancedTextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
                errorMessage={formError.password}
              />
              <EnhancedTextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm Password"
                secureTextEntry
              />
            </View>
            <EnhancedText style={styles.footerText}>
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </EnhancedText>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <EnhancedText style={styles.backText}>Back</EnhancedText>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.signupButton, isFormValid && styles.signupButtonActive]} 
            onPress={handleSignUp}
            disabled={!isFormValid}
          >
            <FontAwesomeIcon icon={faChevronRight} color={isFormValid ? "#1E3A5F" : "#8E8E8E"} size={20} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#F2E8DC',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#1E3A5F',
  },
  footerText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  signupButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupButtonActive: {
    backgroundColor: '#F2E8DC',
  },
});

export default SignupScreen;
