// ShareAppModal.js
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes, faPlus, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import EnhancedText from './EnhancedText';
import EnhancedButton from './EnhancedButton';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { inviteFriends } from '../profile/endpoints/InvitationEndpoints';
import Toast from "react-native-toast-message";
import EnhancedTextInput from './EnhancedTextInput';

const ShareAppModal = ({ isVisible, onClose }) => {
  const { t } = useTranslation();
  const [emails, setEmails] = useState(['']);
  const [isLoading, setIsLoading] = useState(false);

  const addEmailField = () => {
    setEmails([...emails, '']);
  };

  const updateEmail = (text, index) => {
    const newEmails = [...emails];
    newEmails[index] = text;
    setEmails(newEmails);
  };

  const handleShare = async () => {
    const validEmails = emails.filter(email => email.trim() !== '');
    if (validEmails.length === 0) {
      Toast.show({
        type: "error",
        text1: "Please enter at least one email address.",
        text2: "Try again 🙏",
      });
      return;
    }

    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const response = await inviteFriends(token, validEmails);
      if (response.ok) {
        Toast.show({
          type: "success",
          text1: "Invitations sent successfully!",
          text2: "Your friends will receive an email soon.",
        });
        setEmails([""])
        onClose();
      } else {
        throw new Error("Failed to send invitations");
      }
    } catch (error) {
      console.error("Error sending invitations:", error);
      Toast.show({
        type: "error",
        text1: "Failed to send invitations.",
        text2: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <LinearGradient colors={['#1E3A5F', '#091D34']} style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <FontAwesomeIcon icon={faTimes} size={24} color="#F2E8DC" />
            </TouchableOpacity>
            
            <FontAwesomeIcon icon={faUserPlus} size={40} color="#F2E8DC" style={styles.headerIcon} />
            
            <EnhancedText style={styles.title}>{t('Bjud in dina vänner')}</EnhancedText>
            <EnhancedText style={styles.subtitle}>
              {t('Ge dina vänner tillgång till andningsapoteket. Dem får även en kod för 30 dagars provperiod för member plus')}
            </EnhancedText>
            
            <EnhancedText style={styles.label}>{t('Email address')}</EnhancedText>
            {emails.map((email, index) => (
              <EnhancedTextInput
                key={index}
                style={styles.input}
                value={email}
                onChangeText={(text) => updateEmail(text, index)}
                placeholder="email@example.com"
                placeholderTextColor="#8E8E8E"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            ))}
            
            <TouchableOpacity style={styles.addButton} onPress={addEmailField}>
              <FontAwesomeIcon icon={faPlus} size={20} color="#F2E8DC" />
              <EnhancedText style={styles.addButtonText}>{t('Add another')}</EnhancedText>
            </TouchableOpacity>
          </ScrollView>
          
          <EnhancedButton
            title={isLoading ? t('SENDING...') : t('SKICKA')}
            onPress={handleShare}
            style={styles.shareButton}
            textStyle={styles.shareButtonText}
            disabled={isLoading}
          />
          {isLoading && <ActivityIndicator size="large" color="#F2E8DC" style={styles.loader} />}
        </LinearGradient>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  headerIcon: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F2E8DC',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#F2E8DC',
    opacity: 0.8,
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F2E8DC',
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    fontSize: 16,
    color: '#F2E8DC',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#F2E8DC',
    marginLeft: 5,
  },
  shareButton: {
    backgroundColor: '#F2E8DC',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  shareButtonText: {
    color: '#1E3A5F',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});

export default ShareAppModal;
