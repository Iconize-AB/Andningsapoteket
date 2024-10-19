import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoadingScreen } from "./LoadingSreen";
import EnhancedText from "./EnhancedText";
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const termsAndConditionsText = `
By using this app, you agree to the following terms and conditions:

1. **Acceptance of Terms:** By accessing or using the app, you agree to be bound by these terms and conditions. If you do not agree with any part of these terms, you must not use the app.

2. **Account Registration:** To access certain features of the app, you may need to register an account. You are responsible for maintaining the confidentiality of your account information and are fully responsible for all activities that occur under your account.

3. **User Conduct:** You agree not to use the app for any unlawful purpose or in any way that could damage, disable, overburden, or impair the app. You also agree not to attempt to gain unauthorized access to any part of the app.

4. **Intellectual Property:** All content, features, and functionality of the app, including but not limited to text, graphics, logos, and software, are the exclusive property of the app developers and are protected by intellectual property laws.

5. **Privacy Policy:** Your use of the app is also governed by our Privacy Policy, which outlines how we collect, use, and protect your personal information.

6. **Termination:** We reserve the right to terminate or suspend your account and access to the app, without prior notice, for conduct that we believe violates these terms and conditions or is harmful to other users of the app.

7. **Limitation of Liability:** The app is provided "as is" without any warranties of any kind, either express or implied. We do not warrant that the app will be available at all times or will be free from errors or viruses. Your use of the app is at your own risk.

8. **Changes to Terms:** We reserve the right to modify these terms and conditions at any time. Your continued use of the app following the posting of changes constitutes your acceptance of those changes.

9. **Governing Law:** These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which the app is operated.

10. **Contact Information:** If you have any questions about these terms, please contact us at [support email].

By continuing to use the app, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions.
`;

const TermsAndConditionPopup = ({ setAccepted, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAccept = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("userToken");

      const response = await fetch(
        "http://localhost:3000/users/accept-terms",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        // Signin(token);
        setAccepted(true);
      } else {
        const errorData = await response.json();
        console.error("Error Response Data:", errorData);
        throw new Error("Failed to accept terms and conditions.");
      }
    } catch (error) {
      console.error("Error in handleAccept:", error);
      Toast.show({
        type: "error",
        text1: "Sorry, friend. The technology failed us.",
        text2: "Please try again!",
        text1Style: {
          color: "#466F78",
        },
        text2Style: {
          color: "#466F78",
        },
        backgroundColor: "#000",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.popupContainer}>
      <LinearGradient colors={['#1E3A5F', '#091D34']} style={styles.popupContentWrapper}>
        <View style={styles.popupContent}>
          <EnhancedText style={styles.title}>Terms and Conditions</EnhancedText>
          <ScrollView style={styles.scrollView}>
            <EnhancedText style={styles.message}>{termsAndConditionsText}</EnhancedText>
          </ScrollView>
          <View style={styles.buttonContainer}>
            {onClose && (
              <TouchableOpacity style={styles.backButton} onPress={onClose}>
                <EnhancedText style={styles.backButtonText}>Back</EnhancedText>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={onClose ? onClose : handleAccept}
              disabled={isLoading}
            >
              <FontAwesomeIcon icon={faChevronRight} color="#1E3A5F" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popupContentWrapper: {
    width: "90%",
    height: "80%",
    borderRadius: 20,
    overflow: "hidden",
  },
  popupContent: {
    padding: 20,
    height: "100%",
    justifyContent: "space-between",
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
  message: {
    color: '#F2E8DC',
    fontSize: 16,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  acceptButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F2E8DC',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TermsAndConditionPopup;
