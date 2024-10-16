import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Toast from "react-native-toast-message";
import EnhancedText from "../regular/EnhancedText";
import { ResetPassword } from "./endpoints/AuthenticationEndpoints";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { LinearGradient } from "expo-linear-gradient";
import EnhancedTextInput from "../regular/EnhancedTextInput";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    const response = await ResetPassword(email);
    console.log('response', response);
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

  const isFormValid = email.trim() !== '';

  return (
    <LinearGradient colors={['#1E3A5F', '#091D34']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.content}>
            <EnhancedText style={styles.title}>Forgot{'\n'}Password?</EnhancedText>
            <EnhancedText style={styles.subtitle}>
              Enter your email address and we'll send you instructions to reset your password.
            </EnhancedText>
            <View style={styles.inputContainer}>
              <EnhancedTextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#8E8E8E"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <EnhancedText style={styles.backText}>Back</EnhancedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.resetButton, isFormValid && styles.resetButtonActive]} 
            onPress={handleResetPassword}
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
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 30,
    opacity: 0.8,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F2E8DC',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#1E3A5F',
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
  resetButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButtonActive: {
    backgroundColor: '#F2E8DC',
  },
});

export default ForgotPasswordScreen;
