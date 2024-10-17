import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import EnhancedText from '../regular/EnhancedText';
import { updateOnboardingStep } from '../authentication/endpoints/AuthenticationEndpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChallengeOverviewScreen = ({ navigation }) => {
  const challenges = [
    { day: 1, title: "Dag 1: Andningsmedvetenhet" },
    { day: 2, title: "Dag 2: Djupandning" },
    { day: 3, title: "Dag 3: Andning för avslappning" },
    { day: 4, title: "Dag 4: Energigivande andning" },
    { day: 5, title: "Dag 5: Andning för fokus" },
    { day: 6, title: "Dag 6: Integrerad andningspraxis" },
  ];

  const handleStartChallenge = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await updateOnboardingStep(token, 'challenge_started');
      if (response.ok) {
        console.log('Onboarding step updated successfully');
        navigation.navigate('DayChallenge', { day: 1 });
      } else {
        console.error('Failed to update onboarding step');
      }
    } catch (error) {
      console.error('Error updating onboarding step:', error);
    }
  };

  return (
    <LinearGradient colors={['#1E3A5F', '#091D34']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <EnhancedText style={styles.title}>6-dagars utmaning</EnhancedText>
        {challenges.map((challenge, index) => (
          <View key={challenge.day} style={styles.challengeCard}>
            <EnhancedText style={styles.challengeTitle}>{challenge.title}</EnhancedText>
            {index === 0 && (
              <TouchableOpacity 
                style={styles.startButton}
                onPress={handleStartChallenge}
              >
                <EnhancedText style={styles.startButtonText}>Börja</EnhancedText>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F2E8DC',
    marginBottom: 20,
  },
  challengeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  challengeTitle: {
    fontSize: 18,
    color: '#F2E8DC',
    marginBottom: 10,
  },
  startButton: {
    backgroundColor: '#A0C8F9',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#1E3A5F',
    fontWeight: 'bold',
  },
});

export default ChallengeOverviewScreen;
