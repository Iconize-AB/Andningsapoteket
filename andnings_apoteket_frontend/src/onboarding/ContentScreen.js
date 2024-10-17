import React from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import EnhancedText from "../regular/EnhancedText";
import EnhancedButton from "../regular/EnhancedButton";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { updateOnboardingStep } from '../authentication/endpoints/AuthenticationEndpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ContentScreen = ({ route, navigation }) => {
  const { content } = route.params;

  const handleContinue = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await updateOnboardingStep(token, 'content_viewed');
      if (response.ok) {
        console.log('Onboarding step updated successfully');
        navigation.navigate("InvitationScreen");
      } else {
        console.error('Failed to update onboarding step');
      }
    } catch (error) {
      console.error('Error updating onboarding step:', error);
    }
  };

  return (
    <LinearGradient colors={["#1E3A5F", "#091D34"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.content}>
            <EnhancedText style={styles.title}>
              Let's tackle this together
            </EnhancedText>
            <View style={styles.card}>
              {content.map((item, index) => (
                <View key={index} style={styles.optionContainer}>
                  <EnhancedText style={styles.optionTitle}>
                    {item.option}
                  </EnhancedText>
                  <EnhancedText style={styles.optionContent}>
                    {item.content}
                  </EnhancedText>
                </View>
              ))}
            </View>
            <EnhancedText style={styles.footerText}>
              Remember, consistency is key. Practice these techniques regularly
              for best results.
            </EnhancedText>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <EnhancedText style={styles.skipText}>Skip</EnhancedText>
          </TouchableOpacity>
          <View style={styles.paginationContainer}>
            <View style={styles.paginationDot} />
            <View style={[styles.paginationDot, styles.activeDot]} />
            <View style={styles.paginationDot} />
          </View>
          <TouchableOpacity
            style={styles.nextButton} 
            onPress={handleContinue}
          >
            <FontAwesomeIcon icon={faChevronRight} color="#1E3A5F" size={20} />
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
    justifyContent: "center",
  },
  nextButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  introText: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 15,
    fontStyle: "italic",
  },
  optionContainer: {
    marginBottom: 15,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F2E8DC",
    marginBottom: 5,
  },
  optionContent: {
    fontSize: 16,
    color: "#FFFFFF",
    lineHeight: 24,
  },
  footerText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 14,
    opacity: 0.8,
    marginTop: 20,
  },
  buttonContainer: {
    padding: 20,
  },
  footer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  skipText: {
    fontSize: 16,
    color: "#FFFFFF",
    marginRight: 10,
  },
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    marginRight: 5,
  },
  paginationDotNotActive: {
    backgroundColor: "#8E8E8E",
  },
  activeDot: {
    backgroundColor: "#1E3A5F",
  },
  continueButton: {
    marginLeft: 10,
  },
});

export default ContentScreen;
