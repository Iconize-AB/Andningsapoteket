import React from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import EnhancedText from '../regular/EnhancedText';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faCreditCard, faApple } from '@fortawesome/free-solid-svg-icons';
import * as AppleAuthentication from 'expo-apple-authentication';

const PaymentMethodScreen = ({ navigation }) => {
  const handlePaymentMethodSelection = (method) => {
    // Handle the payment method selection
    console.log(`Selected payment method: ${method}`);
    // Navigate to the next screen or process the payment
  };

  return (
    <LinearGradient colors={['#1E3A5F', '#091D34']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faChevronLeft} color="#F2E8DC" size={24} />
        </TouchableOpacity>
        <View style={styles.content}>
          <EnhancedText style={styles.title}>Välj betalningsmetod</EnhancedText>
          
          <TouchableOpacity 
            style={styles.paymentOption} 
            onPress={() => handlePaymentMethodSelection('credit_card')}
          >
            <FontAwesomeIcon icon={faCreditCard} color="#F2E8DC" size={24} style={styles.icon} />
            <EnhancedText style={styles.paymentText}>Kreditkort</EnhancedText>
          </TouchableOpacity>

          <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={5}
            style={styles.appleButton}
            onPress={() => handlePaymentMethodSelection('apple_id')}
          />
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
  backButton: {
    padding: 16,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F2E8DC',
    marginBottom: 30,
    textAlign: 'center',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  icon: {
    marginRight: 20,
  },
  paymentText: {
    flex: 1,
    fontSize: 18,
    color: '#F2E8DC',
  },
  appleButton: {
    height: 60,
    width: '100%',
  },
});

export default PaymentMethodScreen;
