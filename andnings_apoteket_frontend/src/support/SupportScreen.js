import React, { useState } from "react";
import { View, TextInput, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import EnhancedText from "../regular/EnhancedText";
import { useTranslation } from "react-i18next";
import { sendSupportRequest } from "./endpoints/SupportEndpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const SupportScreen = ({ userDetails }) => {
  const { t } = useTranslation();
  const [name, setName] = useState(userDetails?.fullName || "");
  const [email, setEmail] = useState(userDetails?.email || "");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !subject || !message) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "All fields are required!",
      });
      return;
    }

    setIsLoading(true);
    const token = await AsyncStorage.getItem("userToken");

    try {
      const response = await sendSupportRequest(token, name, email, subject, message);

      if (response.ok) {
        Toast.show({
          type: "success",
          text1: "Support request sent",
          text2: "We will get back to you soon!",
        });
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

  return (
    <LinearGradient colors={['#1E3A5F', '#091D34']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <EnhancedText style={styles.title}>{t("support")}</EnhancedText>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            placeholderTextColor="#A0C8F9"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Your Email"
            placeholderTextColor="#A0C8F9"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Subject"
            placeholderTextColor="#A0C8F9"
            value={subject}
            onChangeText={setSubject}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="How can we help you?"
            placeholderTextColor="#A0C8F9"
            value={message}
            onChangeText={setMessage}
            multiline={true}
          />
        </View>
        <TouchableOpacity
          style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <FontAwesomeIcon icon={faPaperPlane} color="#1E3A5F" size={20} />
          <EnhancedText style={styles.submitButtonText}>
            {isLoading ? "Submitting..." : "Submit Request"}
          </EnhancedText>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  inputContainer: {
    marginBottom: 30,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#F2E8DC',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    flexDirection: 'row',
    backgroundColor: '#F2E8DC',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#1E3A5F',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default SupportScreen;
