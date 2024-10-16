import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import EnhancedButton from "../regular/EnhancedButton";
import EnhancedText from "../regular/EnhancedText";

const UsersChoice = ({ navigation }) => {
  return (
    <LinearGradient colors={['#1E3A5F', '#091D34']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <EnhancedText style={styles.title}>Welcome to{'\n'}Andnings Apoteket</EnhancedText>
          <View style={styles.buttonContainer}>
            <EnhancedButton
              title="Sign In"
              onPress={() => navigation.navigate("SignIn")}
              size="medium"
              type="primary"
              style={styles.button}
            />
            <EnhancedButton
              title="Sign Up"
              onPress={() => navigation.navigate("SignUp")}
              size="medium"
              type="secondary"
              style={styles.button}
            />
          </View>
          <EnhancedText style={styles.footerText}>
            Your journey to better breathing starts here.
          </EnhancedText>
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
  content: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 60,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    marginBottom: 20,
  },
  footerText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 20,
  },
});

export default UsersChoice;
