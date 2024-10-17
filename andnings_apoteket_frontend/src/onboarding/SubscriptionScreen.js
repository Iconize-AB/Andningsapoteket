import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Switch, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import EnhancedText from '../regular/EnhancedText';
import EnhancedButton from '../regular/EnhancedButton';
import SubscriptionConfirmationModal from './SubscriptionConfirmationModal';

const SubscriptionOption = ({ duration, price, isSelected, onSelect }) => (
  <TouchableOpacity
    style={[styles.subscriptionOption, isSelected && styles.selectedOption]}
    onPress={onSelect}
  >
    <View style={styles.checkmarkContainer}>
      {isSelected && <View style={styles.checkmark} />}
    </View>
    <View>
      <EnhancedText style={styles.optionDuration}>{duration}</EnhancedText>
      <EnhancedText style={styles.optionPrice}>{price}</EnhancedText>
    </View>
  </TouchableOpacity>
);

const SubscriptionScreen = ({ navigation }) => {
  const [freeTrialEnabled, setFreeTrialEnabled] = useState(false);
  const [selectedOption, setSelectedOption] = useState('yearly');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleContinue = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const subscriptionDetails = {
    name: selectedOption === 'yearly' ? '1 år prenumeration' : '1 månad prenumeration',
    email: 'user@example.com', // Replace with actual user email
    trial: '30',
    startDate: new Date().toLocaleDateString('sv-SE'),
    price: selectedOption === 'yearly' ? '80 sek' : '149 sek',
  };

  return (
    <LinearGradient colors={['#1E3A5F', '#091D34']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <EnhancedText style={styles.title}>Du förtjänar att må bra</EnhancedText>
          <EnhancedText style={styles.subtitle}>
            Andningsapoteket ger dig guidage andningar som kan
            hjälpa dig utvecklas som människa och må bättre.
            Bli medlem för att låsa upp allt du behöver.
          </EnhancedText>

          <View style={styles.freeTrialContainer}>
            <EnhancedText style={styles.freeTrialText}>Inte säker? Aktivera din gratismånad</EnhancedText>
            <Switch
              value={freeTrialEnabled}
              onValueChange={setFreeTrialEnabled}
              trackColor={{ false: '#767577', true: '#A0C8F9' }}
              thumbColor={freeTrialEnabled ? '#F2E8DC' : '#f4f3f4'}
            />
          </View>

          <SubscriptionOption
            duration="1 år, 960 sek"
            price="Endast 80 sek / månad"
            isSelected={selectedOption === 'yearly'}
            onSelect={() => setSelectedOption('yearly')}
          />

          <SubscriptionOption
            duration="1 månad, 149 sek"
            price=""
            isSelected={selectedOption === 'monthly'}
            onSelect={() => setSelectedOption('monthly')}
          />

          <EnhancedButton
            title="VIDARE"
            onPress={handleContinue}
            style={styles.continueButton}
          />

          <SubscriptionConfirmationModal
            isVisible={isModalVisible}
            onClose={closeModal}
            subscriptionDetails={subscriptionDetails}
            navigation={navigation}
          />

          <EnhancedText style={styles.termsText}>
            Genom att fortsätta accepterar du våra{'\n'}
            <EnhancedText style={styles.termsLink}>Allmänna Villkor</EnhancedText>
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
    padding: 20,
    justifyContent: 'center',
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
  freeTrialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  freeTrialText: {
    color: '#FFFFFF',
    fontSize: 14,
    flex: 1,
    marginRight: 10,
  },
  subscriptionOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  selectedOption: {
    backgroundColor: 'rgba(160, 200, 249, 0.2)',
    borderColor: '#A0C8F9',
    borderWidth: 1,
  },
  checkmarkContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#A0C8F9',
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#A0C8F9',
  },
  optionDuration: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionPrice: {
    color: '#A0C8F9',
    fontSize: 14,
  },
  continueButton: {
    backgroundColor: '#F2E8DC',
    marginTop: 20,
  },
  termsText: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
  },
  termsLink: {
    textDecorationLine: 'underline',
  },
});

export default SubscriptionScreen;
