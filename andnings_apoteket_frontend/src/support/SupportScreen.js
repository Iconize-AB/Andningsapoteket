import React, { useState } from "react";
import { View, TextInput, ScrollView, StyleSheet, Alert } from "react-native";
import colors from "../common/colors/Colors";
import Toast from "react-native-toast-message";
import EnhancedTextInput from "../regular/EnhancedTextInput";
import EnhancedButton from "../regular/EnhancedButton";
import EnhancedText from "../regular/EnhancedText";
import { useTranslation } from "react-i18next";
import { sendSupportRequest } from "./endpoints/SupportEndpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SupportScreen = ({ userDetails }) => {
  const { t } = useTranslation();
  const [name, setName] = useState(userDetails?.fullName || "");
  const [email, setEmail] = useState(userDetails?.email || "");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !subject || !message) {
      return Alert.alert("All fields are required!");
    }

    console.log("sendSupportRequest", token, name, email, subject, message);

    setIsLoading(true);
    const token = await AsyncStorage.getItem("userToken");

    try {
      const response = await sendSupportRequest(
        token,
        name,
        email,
        subject,
        message,
      );

      if (response.ok) {
        Toast.show({
          type: "success",
          text1: "Support request sent",
          text2: "We will get back to you soon!",
        });
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        throw new Error("Failed to send support request");
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "There was an error sending your support request",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const customInputStyle = {
    borderColor: "#000",
    borderWidth: 2,
    color: "#000",
    opacity: 1,
  };

  const customLabelStyle = {
    color: "#000",
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <EnhancedText style={styles.title}>{t("support")}</EnhancedText>
      </View>
      <EnhancedTextInput
        placeholder="Your Name"
        value={name}
        customStyle={customInputStyle}
        customLabelStyle={customLabelStyle}
        onChangeText={setName}
      />
      <EnhancedTextInput
        placeholder="Your Email"
        value={email}
        customStyle={customInputStyle}
        customLabelStyle={customLabelStyle}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <EnhancedTextInput
        placeholder="Subject"
        value={subject}
        customStyle={customInputStyle}
        customLabelStyle={customLabelStyle}
        onChangeText={setSubject}
      />
      <TextInput
        style={styles.textArea}
        placeholder="How can we help you?"
        value={message}
        onChangeText={setMessage}
        multiline={true}
      />
      <EnhancedButton
        onPress={handleSubmit}
        disabled={isLoading}
        title={isLoading ? "Submitting..." : "Submit Request"}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginTop: 20,
    marginBottom: 20,
  },
  textArea: {
    width: "100%",
    height: 120,
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingTop: 10,
    textAlignVertical: "top",
    marginBottom: 20,
    marginTop: 30,
  },
});

export default SupportScreen;
