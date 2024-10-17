import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import EnhancedText from '../regular/EnhancedText';
import colors from '../common/colors/Colors';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext'; // Import the AuthContext if you're using it for the token
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateOnboardingStep } from '../authentication/endpoints/AuthenticationEndpoints';

const options = [
  'Minska ångest',
  'Minska stress',
  'Slappna av',
  'Sluta övertänka',
  'Hantera ilska',
  'Bli fokuserad',
  'Hantera oro',
  'Bli piggare'
];

const HelpOptionsScreen = ({ navigation }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleOption = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else if (selectedOptions.length < 3) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      Alert.alert('Max Selection', 'You can only select up to 3 options.');
    }
  };

  const handleNext = async () => {
    if (selectedOptions.length === 0) {
      Alert.alert('Selection Required', 'Please select at least 1 option.');
      return;
    }

    const token = await AsyncStorage.getItem("userToken");

    try {
      // Update help options
      const response = await fetch(
        'http://localhost:3000/v1/user/update-help-options',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            selectedOptions,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Help options updated successfully');
        console.log('Generated content:', data.content);
        
        // Save content to AsyncStorage
        await AsyncStorage.setItem('onboardingContent', JSON.stringify(data.content));
        
        // Update onboarding step
        const stepResponse = await updateOnboardingStep(token, 'help_options_completed');
        if (stepResponse.ok) {
          console.log('Onboarding step updated successfully');
        } else {
          console.error('Failed to update onboarding step');
        }

        // Navigate to the next screen, passing the generated content
        navigation.navigate('ContentScreen', { content: data.content });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update help options');
      }
    } catch (error) {
      console.error('Error updating help options:', error);
      Alert.alert('Error', error.message || 'Failed to update help options. Please try again.');
    }
  };

  return (
    <LinearGradient colors={['#1E3A5F', '#091D34']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <EnhancedText style={styles.title}>Vad kan vi hjälpa{'\n'}dig med?</EnhancedText>
          <View style={styles.optionsContainer}>
            {options.map((option, index) => (
              <TouchableOpacity 
                key={index} 
                style={[
                  styles.optionButton,
                  selectedOptions.includes(option) && styles.selectedOption
                ]}
                onPress={() => toggleOption(option)}
              >
                <EnhancedText style={[
                  styles.optionText,
                  selectedOptions.includes(option) && styles.selectedOptionText
                ]}>
                  {option}
                </EnhancedText>
              </TouchableOpacity>
            ))}
          </View>
          <EnhancedText style={styles.footerText}>
            Transforming lives by offering hope and opportunities for recovery, wellness, and independence.
          </EnhancedText>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <EnhancedText style={styles.skipText}>Skip</EnhancedText>
          </TouchableOpacity>
          <View style={styles.paginationContainer}>
            <View style={[styles.paginationDot, styles.activeDot]} />
            <View style={styles.paginationDot} />
            <View style={styles.paginationDot} />
          </View>
          <TouchableOpacity 
            style={[styles.nextButton, selectedOptions.length > 0 && styles.nextButtonActive]} 
            onPress={handleNext}
          >
            <FontAwesomeIcon icon={faChevronRight} color={selectedOptions.length > 0 ? "#1E3A5F" : "#8E8E8E"} size={20} />
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
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    width: '48%',
    backgroundColor: '#F2E8DC',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionText: {
    color: '#1E3A5F',
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 20,
    opacity: 0.8,
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
  nextButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonActive: {
    backgroundColor: '#F2E8DC',
  },
  selectedOption: {
    backgroundColor: '#1E3A5F',
    borderWidth: 2,
    borderColor: '#F2E8DC',
  },
  selectedOptionText: {
    color: '#F2E8DC',
  },
});

export default HelpOptionsScreen;
