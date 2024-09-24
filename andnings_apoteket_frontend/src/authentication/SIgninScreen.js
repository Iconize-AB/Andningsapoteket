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
      <BackIcon navigation={navigation} />
      <View style={styles.wrapper}>
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
        {/* <PasswordField
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setFormError((prev) => ({ ...prev, password: "" }));
            }}
            placeholder="Password"
          /> */}
        {formError.password !== "" && (
          <EnhancedText style={styles.errorText}>
            {formError.password}
          </EnhancedText>
        )}
        <EnhancedButton
          onPress={handleSignIn}
          title="Sign In"
          size="medium"
          type="outline"
        />
        {/* Use SingleSignOn Component */}
        <SingleSignOn />
        <TouchableOpacity
          style={styles.textButton}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          <EnhancedText style={styles.textButton}>
            FORGOT YOUR CREDENTIALS?
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
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    marginBottom: 20,
  },
  title: {
    color: "#fff",
    fontSize: 30,
    marginBottom: 10,
    textAlign: "center",
  },
  subTitleContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  subTitle: {
    color: "#fff",
    fontSize: 14,
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
    fontFamily: "bahnschrift",
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
    marginTop: 12,
    borderRadius: 120,
  },
  textButton: {
    color: "#000",
    marginTop: 12,
    textDecorationLine: "underline",
    position: "absolute",
    bottom: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    textTransform: "uppercase",
    fontSize: 18,
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#1E90FF",
  },
  buttonOutlineText: {
    color: "#1E90FF",
  },
});

export default SigninScreen;
