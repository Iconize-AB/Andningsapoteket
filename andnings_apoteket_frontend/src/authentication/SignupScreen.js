// SignupScreen.js

import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
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

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [formError, setFormError] = useState({ email: "", password: "" });

  const handleSignUp = async () => {
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
      const response = await Register(email, password);
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

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <EnhancedText style={styles.title} weight="bold">Register</EnhancedText>
        <EnhancedText style={styles.subTitle}>
          Enter your credentials to access your account
        </EnhancedText>
      </View>
      <BackIcon navigation={navigation} />
      <View style={styles.wrapper}>
        {/* Social sign-in buttons */}
        <SingleSignOn />

        <View style={styles.inputWrapper}>
          <EnhancedTextInput
            style={styles.input}
            onChangeText={(text) => setName(text)}
            value={name}
            placeholder="Name"
            placeholderTextColor="#fff"
          />

          {/* Email input */}
          <EnhancedTextInput
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="Email"
            placeholderTextColor="#fff"
          />

          {/* Password input */}
          <EnhancedTextInput
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
            value={password}
            placeholder="Password"
            placeholderTextColor="#fff"
            secureTextEntry={true}
          />
        </View>

        {/* Name input */}

        {/* Display errors if they exist */}
        {formError.name !== "" && (
          <EnhancedText style={styles.errorText}>{formError.name}</EnhancedText>
        )}
        {formError.email !== "" && (
          <EnhancedText style={styles.errorText}>
            {formError.email}
          </EnhancedText>
        )}
        {formError.password !== "" && (
          <EnhancedText style={styles.errorText}>
            {formError.password}
          </EnhancedText>
        )}

        {/* Checkbox for Terms & Privacy */}
        <View style={styles.checkboxContainer}>
          <CustomCheckbox
            isChecked={agree}
            onChange={() => setAgree((prev) => !prev)}
          />
        </View>

        {/* Register Button */}
        <EnhancedButton
          onPress={handleSignUp}
          title="Register"
          size="large"
          type="outline"
        />
      </View>
      {/* Sign up link */}
      <TouchableOpacity
        style={styles.textButton}
        onPress={() => navigation.navigate("SignIn")}
      >
        <EnhancedText style={styles.textButton}>
         Already have an account? Sign in
        </EnhancedText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  button: {
    fontWeight: "bold"
  },
  content: {
    marginLeft: 20,
  },
  wrapper: {
    width: "100%",
    alignItems: "center",
  },
  inputWrapper: {
    padding: 20,
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginTop: 20,
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 16,
    color: "#A9A9A9",
  },
  input: {
    height: 50,
    width: "100%",
    backgroundColor: "#000",
    color: "#fff",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 12,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    marginRight: 8,
  },
  checkboxLabel: {
    color: "#fff",
  },
  linkText: {
    textDecorationLine: "underline",
    color: "#1E90FF",
  },
  textButton: {
    color: "#fff",
    position: "absolute",
    left: 50,
    alignItems: "center",
    justifyContent: "center",
    textDecorationLine: "underline",
    bottom: 40,
  },
});

export default SignupScreen;
