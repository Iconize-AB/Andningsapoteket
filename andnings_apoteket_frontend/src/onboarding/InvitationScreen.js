import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import EnhancedText from '../regular/EnhancedText';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';

const ChallengeDay = ({ day, title, onPress }) => (
  <TouchableOpacity style={styles.challengeDay} onPress={onPress}>
    <View style={styles.dayImagePlaceholder} />
    <View style={styles.dayTextContainer}>
      <EnhancedText style={styles.dayNumber}>{day}</EnhancedText>
      <EnhancedText style={styles.dayTitle}>{title}</EnhancedText>
    </View>
  </TouchableOpacity>
);

const DayOverviewModal = ({ visible, day, onClose }) => (
  <Modal visible={visible} transparent animationType="fade">
    <View style={styles.modalOverlay}>
      <LinearGradient
        colors={['#1E3A5F', '#091D34']}
        style={styles.modalContent}
      >
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <FontAwesomeIcon icon={faTimes} color="#F2E8DC" size={20} />
        </TouchableOpacity>
        {day && (
          <>
            <EnhancedText style={styles.modalDay}>{day.day}</EnhancedText>
            <EnhancedText style={styles.modalTitle}>{day.title}</EnhancedText>
            <View style={styles.modalDivider} />
            <EnhancedText style={styles.modalDescription}>
              Here's an overview of the day's structure:
            </EnhancedText>
            <View style={styles.structureList}>
              <StructureItem text="Introduction" duration="5 min" />
              <StructureItem text="Breathing exercise" duration="15 min" />
              <StructureItem text="Reflection" duration="5 min" />
              <StructureItem text="Closing thoughts" duration="5 min" />
            </View>
          </>
        )}
      </LinearGradient>
    </View>
  </Modal>
);

const StructureItem = ({ text, duration }) => (
  <View style={styles.structureItem}>
    <View style={styles.structureDot} />
    <EnhancedText style={styles.structureText}>{text}</EnhancedText>
    <EnhancedText style={styles.structureDuration}>{duration}</EnhancedText>
  </View>
);

const InvitationScreen = ({ navigation }) => {
  const [selectedDay, setSelectedDay] = useState(null);

  const challengeDays = [
    { day: "DAG 1", title: "En djupgående breathwork presentation" },
    { day: "DAG 2", title: "Grundläggande andningstekniker" },
    { day: "DAG 3", title: "Andning för stresshantering" },
    { day: "DAG 4", title: "Energigivande andningsövningar" },
    { day: "DAG 5", title: "Andning för bättre sömn" },
    { day: "DAG 6", title: "Integrering och reflektion" },
  ];

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
              {challengeDays.map((day, index) => (
                <ChallengeDay
                  key={index}
                  day={day.day}
                  title={day.title}
                  onPress={() => setSelectedDay(day)}
                />
              ))}
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
      <DayOverviewModal
        visible={!!selectedDay}
        day={selectedDay}
        onClose={() => setSelectedDay(null)}
      />
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxWidth: 400,
    borderRadius: 20,
    height: 600,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  modalDay: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A0C8F9',
    marginBottom: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F2E8DC',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalDivider: {
    width: '80%',
    height: 1,
    backgroundColor: 'rgba(242, 232, 220, 0.3)',
    marginBottom: 15,
  },
  modalDescription: {
    fontSize: 16,
    color: '#F2E8DC',
    marginBottom: 15,
    textAlign: 'center',
  },
  structureList: {
    width: '100%',
  },
  structureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  structureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#A0C8F9',
    marginRight: 10,
  },
  structureText: {
    flex: 1,
    fontSize: 16,
    color: '#F2E8DC',
  },
  structureDuration: {
    fontSize: 14,
    color: '#A0C8F9',
  },
});

export default InvitationScreen;
