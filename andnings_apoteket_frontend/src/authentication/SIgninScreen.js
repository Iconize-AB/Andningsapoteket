import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import Toast from "react-native-toast-message";
import { useAuth } from "../context/AuthContext";
import EnhancedText from "../regular/EnhancedText";
import { isValidEmail } from "../common/Validation";
import EnhancedTextInput from "../regular/EnhancedTextInput";
import { Signin } from "./endpoints/AuthenticationEndpoints";
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { LinearGradient } from 'expo-linear-gradient';

const SigninScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState({ email: "", password: "" });
  const { signIn } = useAuth();
  const handleSignIn = async () => {
    setFormError({ email: "", password: "" });
    let isValid = true;

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
    if (!isValid) return;
    try {
      const response = await Signin(email, password);
      const json = await response.json();
      if (response.ok) {
        signIn(json.token);
      } else {
        setFormError((prev) => ({
          ...prev,
          email: "The password or email didn't match.",
        }));
        Toast.show({
          type: "error",
          text1: "Sorry, friend.",
          text2: "The password or email didn't match.",
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

  const isFormValid = email && password;

  return (
    <LinearGradient colors={['#1E3A5F', '#091D34']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.content}>
            <EnhancedText style={styles.title}>Welcome{'\n'}Back</EnhancedText>
            <View style={styles.inputContainer}>
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
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <EnhancedText style={styles.forgotPasswordText}>Forgot Password?</EnhancedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <EnhancedText style={styles.signupText}>Sign Up</EnhancedText>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.signinButton, isFormValid && styles.signinButtonActive]} 
            onPress={handleSignIn}
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
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'right',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  signupText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  signinButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signinButtonActive: {
    backgroundColor: '#F2E8DC',
  },
});

export default SigninScreen;
