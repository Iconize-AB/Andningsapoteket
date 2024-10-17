import React, { useState } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Animated, ScrollView, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import EnhancedText from '../regular/EnhancedText';
import { Ionicons } from '@expo/vector-icons';

const SubscriptionConfirmationModal = ({ isVisible, onClose, subscriptionDetails, navigation }) => {
  const [paymentMethod, setPaymentMethod] = useState('appleId');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleConfirmPayment = () => {
    navigation.navigate('ChallengeOverviewScreen');
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <LinearGradient colors={['#1E3A5F', '#091D34']} style={styles.modalContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.modalHeader}>
            <EnhancedText style={styles.headerTitle}>Andningsapoteket</EnhancedText>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <EnhancedText style={styles.cancelButtonText}>Avbryt</EnhancedText>
            </TouchableOpacity>
          </View>

          <View style={styles.contentContainer}>
            <View style={styles.subscriptionInfo}>
              <View style={styles.appIcon} />
              <View>
                <EnhancedText style={styles.subscriptionName}>{subscriptionDetails.name}</EnhancedText>
                <EnhancedText style={styles.subscriptionDescription}>Andningsapoteket — Premium</EnhancedText>
              </View>
            </View>

            <View style={styles.paymentTabsContainer}>
              <TouchableOpacity
                style={[styles.paymentTab, paymentMethod === 'appleId' && styles.activePaymentTab]}
                onPress={() => setPaymentMethod('appleId')}
              >
                <EnhancedText style={[styles.paymentTabText, paymentMethod === 'appleId' && styles.activePaymentTabText]}>
                  Apple ID
                </EnhancedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.paymentTab, paymentMethod === 'creditCard' && styles.activePaymentTab]}
                onPress={() => setPaymentMethod('creditCard')}
              >
                <EnhancedText style={[styles.paymentTabText, paymentMethod === 'creditCard' && styles.activePaymentTabText]}>
                  Kreditkort
                </EnhancedText>
              </TouchableOpacity>
            </View>

            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <EnhancedText style={styles.detailLabel}>DETALJER</EnhancedText>
                <EnhancedText style={styles.detailValue}>Endast för testning. Du kommer inte att debiteras för detta köp.</EnhancedText>
              </View>
              <View style={styles.detailRow}>
                <EnhancedText style={styles.detailLabel}>KONTO</EnhancedText>
                <EnhancedText style={styles.detailValue}>{subscriptionDetails.email}</EnhancedText>
              </View>
              <View style={styles.detailRow}>
                <EnhancedText style={styles.detailLabel}>PROVA PÅ</EnhancedText>
                <EnhancedText style={styles.detailValue}>{subscriptionDetails.trial} Dagar Gratis</EnhancedText>
              </View>
              <View style={styles.detailRow}>
                <EnhancedText style={styles.detailLabel}>PRIS</EnhancedText>
                <EnhancedText style={styles.detailValue}>
                  Från {subscriptionDetails.startDate}{'\n'}
                  {subscriptionDetails.price} per månad
                </EnhancedText>
              </View>
            </View>

            {paymentMethod === 'appleId' ? (
              <View style={styles.confirmationContainer}>
                <Ionicons name="finger-print" size={40} color="#A0C8F9" />
                <EnhancedText style={styles.confirmText}>Bekräfta med Touch ID</EnhancedText>
              </View>
            ) : (
              <View style={styles.creditCardContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Kortnummer"
                  placeholderTextColor="#A0C8F9"
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  keyboardType="numeric"
                />
                <View style={styles.rowInputs}>
                  <TextInput
                    style={[styles.input, styles.halfInput]}
                    placeholder="MM/ÅÅ"
                    placeholderTextColor="#A0C8F9"
                    value={expiryDate}
                    onChangeText={setExpiryDate}
                  />
                  <TextInput
                    style={[styles.input, styles.halfInput]}
                    placeholder="CVV"
                    placeholderTextColor="#A0C8F9"
                    value={cvv}
                    onChangeText={setCvv}
                    keyboardType="numeric"
                  />
                </View>
                <TouchableOpacity style={styles.submitButton} onPress={handleConfirmPayment}>
                  <EnhancedText style={styles.submitButtonText}>Bekräfta betalning</EnhancedText>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 50,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F2E8DC',
  },
  cancelButton: {
    padding: 5,
  },
  cancelButtonText: {
    color: '#A0C8F9',
    fontSize: 16,
  },
  contentContainer: {
    padding: 20,
  },
  subscriptionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  appIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#F2E8DC',
    borderRadius: 8,
    marginRight: 10,
  },
  subscriptionName: {
    color: '#F2E8DC',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subscriptionDescription: {
    color: '#A0C8F9',
    fontSize: 14,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailRow: {
    marginBottom: 15,
  },
  detailLabel: {
    color: '#A0C8F9',
    fontSize: 12,
    marginBottom: 5,
  },
  detailValue: {
    color: '#F2E8DC',
    fontSize: 14,
  },
  confirmationContainer: {
    alignItems: 'center',
  },
  confirmText: {
    color: '#F2E8DC',
    fontSize: 16,
    marginTop: 10,
  },
  paymentTabsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#A0C8F9',
  },
  paymentTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activePaymentTab: {
    backgroundColor: '#A0C8F9',
  },
  paymentTabText: {
    color: '#A0C8F9',
    fontSize: 14,
  },
  activePaymentTabText: {
    color: '#1E3A5F',
    fontWeight: 'bold',
  },
  creditCardContainer: {
    marginTop: 20,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    color: '#F2E8DC',
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  submitButton: {
    backgroundColor: '#A0C8F9',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#1E3A5F',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SubscriptionConfirmationModal;
