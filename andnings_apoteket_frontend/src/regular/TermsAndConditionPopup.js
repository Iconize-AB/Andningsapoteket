import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoadingScreen } from "./LoadingSreen";
import EnhancedText from "./EnhancedText";

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
        "https://primal-backend-851afa707cbd.herokuapp.com/users/accept-terms",
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
      <View
        style={[styles.popupContentWrapper, { marginTop: onClose ? -100 : 0 }]}
      >
        <View
          style={[styles.overlay, { backgroundColor: "rgba(0, 0, 0, 0.8)" }]}
        />
        <View style={styles.popupContent}>
          <EnhancedText style={styles.title}>Terms and Conditions</EnhancedText>
          <ScrollView style={styles.scrollView}>
            <EnhancedText style={styles.message}>{termsAndConditionsText}</EnhancedText>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.dismissButton, { backgroundColor: "#F55E09" }]}
              onPress={onClose ? onClose : handleAccept}
              disabled={isLoading}
            >
              <EnhancedText style={styles.buttonText}>
                {onClose ? "Done" : "Accept"}
              </EnhancedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    alignItems: "center",
    zIndex: 1000,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
  popupContentWrapper: {
    width: "90%",
    height: 500,
    borderRadius: 12,
    overflow: "hidden",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.6,
  },
  popupContent: {
    backgroundColor: "transparent",
    padding: 26,
    height: "100%",
    width: "100%",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    position: "absolute",
    top: 40,
    zIndex: 100,
    fontSize: 26,
  },
  scrollView: {
    marginTop: 80,
    marginBottom: 100,
    width: "100%",
  },
  message: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Corbel-Regular",
    paddingHorizontal: 20,
    textAlign: "left",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    position: "absolute",
    bottom: 20,
  },
  dismissButton: {
    paddingHorizontal: 10,
    height: 50,
    width: 120,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
});

export default TermsAndConditionPopup;
