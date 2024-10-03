import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import { useAuth } from "../context/AuthContext";
import EnhancedText from "../regular/EnhancedText";
import { isValidEmail } from "../common/Validation";
import BackIcon from "../regular/BackIcon";
import colors from "../common/colors/Colors";
import EnhancedTextInput from "../regular/EnhancedTextInput";
import EnhancedButton from "../regular/EnhancedButton";
import SingleSignOn from "./SingleSignOn";
import { Signin } from "./endpoints/AuthenticationEndpoints";

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
      console.log('json', json);
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

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <EnhancedText style={styles.title} weight="bold">Sign in</EnhancedText>
        <EnhancedText style={styles.subTitle}>
          Enter your credentials to access your account
        </EnhancedText>
      </View>
      <BackIcon navigation={navigation} />
      <View style={styles.wrapper}>
        {/* Social sign-in buttons */}
        <SingleSignOn />
        <View style={styles.inputWrapper}>
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

        {/* Register Button */}
        <EnhancedButton
          onPress={handleSignIn}
          title="Sign In"
          size="large"
          type="outline"
        />
      </View>
      {/* Sign up link */}
      <TouchableOpacity
        style={styles.textButton}
        onPress={() => navigation.navigate("SignUp")}
      >
        <EnhancedText style={styles.textButton}>
          Don't have an account? Sign up
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
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 16,
    color: "#A9A9A9",
    marginBottom: 20,
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
    marginBottom: 20,
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
    marginLeft: 20,
    marginTop: 40,
    textDecorationLine: "underline",
    bottom: 20,
  },
});

export default SigninScreen;
