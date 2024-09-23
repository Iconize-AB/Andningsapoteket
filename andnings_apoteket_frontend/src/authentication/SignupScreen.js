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

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  return (
    <View style={styles.container}>
      <BackIcon navigation={navigation} />
      <View style={styles.wrapper}>
        <View style={styles.titleContainer}>
          <EnhancedText style={styles.title}>
            WELCOME TO ANDNINGSAPOTEKET.
          </EnhancedText>
        </View>

        {/* Email and password fields */}
        <EnhancedTextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Email"
          placeholderTextColor="#A9A9A9"
        />
        <EnhancedTextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Password"
          placeholderTextColor="#A9A9A9"
          secureTextEntry={true}
        />

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

        <EnhancedButton
          onPress={handleSignUp}
          title="Sign Up"
          size="medium"
          type="outline"
        />

        {/* Use SingleSignOn Component */}
        <SingleSignOn />

        <TouchableOpacity
          style={styles.textButton}
          onPress={() => navigation.navigate("SignIn")}
        >
          <EnhancedText style={styles.textButton}>
            Already have an account?
          </EnhancedText>
        </TouchableOpacity>
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
  errorText: {
    alignSelf: "flex-start",
    marginRight: 12,
    marginTop: -10,
    color: "red",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    marginBottom: 20,
  },
  title: {
    color: "#000",
    fontSize: 24,
    marginBottom: 30,
    marginTop: 40,
    textAlign: "center",
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
    fontSize: 16,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  textButton: {
    color: "#000",
    marginTop: 12,
    textDecorationLine: "underline",
  },
});

export default SignupScreen;
