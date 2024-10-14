// ShareAppModal.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

const ShareAppModal = ({ isVisible, onClose, onShare }) => {
  const { t } = useTranslation();
  const [emails, setEmails] = useState(['']);

  const addEmailField = () => {
    setEmails([...emails, '']);
  };

  const updateEmail = (text, index) => {
    const newEmails = [...emails];
    newEmails[index] = text;
    setEmails(newEmails);
  };

  const handleShare = () => {
    onShare(emails.filter(email => email.trim() !== ''));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={24} color="#000" />
          </TouchableOpacity>
          
          <Icon name="account-plus-outline" size={40} color="#000" style={styles.headerIcon} />
          
          <Text style={styles.title}>{t('Bjud in dina vänner')}</Text>
          <Text style={styles.subtitle}>
            {t('Ge dina vänner tillgång till andningsapoteket. Dem får även en kod för 30 dagars provperiod för member plus')}
          </Text>
          
          <Text style={styles.label}>{t('Email address')}</Text>
          {emails.map((email, index) => (
            <TextInput
              key={index}
              style={styles.input}
              value={email}
              onChangeText={(text) => updateEmail(text, index)}
              placeholder="email@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          ))}
          
          <TouchableOpacity style={styles.addButton} onPress={addEmailField}>
            <Icon name="plus" size={20} color="#007AFF" />
            <Text style={styles.addButtonText}>{t('Add another')}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Text style={styles.shareButtonText}>{t('SKICKA')}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  headerIcon: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#007AFF',
    marginLeft: 5,
  },
  shareButton: {
    backgroundColor: '#F0EAD6',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default ShareAppModal;

