import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import EnhancedText from '../regular/EnhancedText';
import EnhancedButton from '../regular/EnhancedButton';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const ChallengeDay = ({ day, title }) => (
  <View style={styles.challengeDay}>
    <View style={styles.dayImagePlaceholder} />
    <View style={styles.dayTextContainer}>
      <EnhancedText style={styles.dayNumber}>{day}</EnhancedText>
      <EnhancedText style={styles.dayTitle}>{title}</EnhancedText>
    </View>
  </View>
);

const InvitationScreen = ({ navigation }) => {
  const handleStart = () => {
    navigation.navigate('SubscriptionScreen');
  };

  const handleSkip = () => {
    // Navigate to the main app or next onboarding step
    // navigation.navigate('MainApp');
  };

  return (
    <LinearGradient colors={['#1E3A5F', '#091D34']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.content}>
            <EnhancedText style={styles.title}>Din 6 dagars{'\n'}challenge</EnhancedText>
            <EnhancedText style={styles.subtitle}>
              En introduktion till breathwork som tar dig{'\n'}med på en resa in i dig själv...
            </EnhancedText>
            <View style={styles.challengeContainer}>
              <ChallengeDay day="DAG 1" title="En djupgående breathwork presentation" />
              <ChallengeDay day="DAG 2" title="En djupgående breathwork presentation" />
              <ChallengeDay day="DAG 3" title="En djupgående breathwork presentation" />
              <ChallengeDay day="DAG 4" title="En djupgående breathwork presentation" />
              {/* Add DAG 5 and DAG 6 similarly */}
            </View>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <EnhancedText style={styles.skipText}>Skip</EnhancedText>
          </TouchableOpacity>
          <View style={styles.paginationContainer}>
            <View style={styles.paginationDot} />
            <View style={styles.paginationDot} />
            <View style={[styles.paginationDot, styles.activeDot]} />
          </View>
          <TouchableOpacity
            style={styles.nextButton} 
            onPress={handleStart}
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
    justifyContent: 'center',
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F2E8DC',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
    opacity: 0.8,
  },
  challengeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  challengeDay: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  dayImagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#1E3A5F',
    borderRadius: 10,
    marginRight: 15,
  },
  dayTextContainer: {
    flex: 1,
  },
  dayNumber: {
    color: '#A0C8F9',
    fontSize: 14,
    fontWeight: 'bold',
  },
  dayTitle: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  skipText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  paginationContainer: {
    flexDirection: 'row',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
  },
  startButton: {
    backgroundColor: '#F2E8DC',
  },
});

export default InvitationScreen;
