import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EnhancedText from "../regular/EnhancedText";
import { isValidEmail } from "../common/Validation";
import BackIcon from "../regular/BackIcon";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
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
      let response;
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
      <ImageBackground
        source={{
          uri: "https://images.squarespace-cdn.com/content/v1/60191f970b559218574dd995/e61a9073-054f-46ac-9847-12fda6e9cd79/PHOTO-2022-10-21-17-02-32.jpg?format=2500w",
        }}
        style={styles.image}
      >
        <BackIcon navigation={navigation} />
        <View style={styles.wrapper}>
          <View style={[styles.overlay, { backgroundColor: "#466F78" }]} />
          <View style={styles.titleContainer}>
            <EnhancedText style={styles.title}>WELCOME TO PRIMAL HEALTH.</EnhancedText>
            <View style={styles.subTitleContainer}>
              <EnhancedText style={styles.subTitle}>
                WE EXIST TO HELP YOU FEEL GOOD ABOUT YOURSELF, TO BECOME YOUR
                STRONGEST SELF IN BODY & MIND,
              </EnhancedText>
              <EnhancedText style={styles.subTitle}>
                SIGN UP TO BECOME A PART OF THE PRIMAL FAMILY.
              </EnhancedText>
            </View>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              setName(text);
              setFormError((prev) => ({ ...prev, name: "" }));
            }}
            value={name}
            placeholderTextColor="#A9A9A9"
            placeholder="Name"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              setEmail(text);
              setFormError((prev) => ({ ...prev, email: "" }));
            }}
            value={email}
            placeholderTextColor="#A9A9A9"
            placeholder="Email"
            keyboardType="email-address"
          />
          {formError.email !== "" && (
            <EnhancedText style={styles.errorText}>{formError.email}</EnhancedText>
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
            <EnhancedText style={styles.errorText}>{formError.password}</EnhancedText>
          )}
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <EnhancedText style={styles.buttonText}>Sign Up</EnhancedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.textButton}
            onPress={() => navigation.navigate("SignIn")}
          >
            <EnhancedText style={styles.textButton}>
              Already have an account?
            </EnhancedText>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000",
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
    color: "#fff",
    fontSize: 24,
    marginBottom: 30,
    marginTop: 40,
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.8,
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
    backgroundColor: "#000000",
    fontFamily: "BebasNeue-Regular",
    borderRadius: 10,
    fontSize: 16,
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
    color: "#fff",
    marginTop: 12,
    textDecorationLine: "underline",
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

export default SignupScreen;
