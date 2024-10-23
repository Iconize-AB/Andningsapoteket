import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import Toast from "react-native-toast-message";
import EnhancedText from "../regular/EnhancedText";
import { changeLanguageSetting as apiChangeLanguageSetting } from "../profile/endpoints/SettingsEndpoints";
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from 'react-i18next';

const UserConfigurationScreen = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const { changeLanguageSetting } = useAuth();
  const { t } = useTranslation();

  const handleLanguageSelect = async () => {
    if (!selectedLanguage) {
      Toast.show({
        type: "error",
        text1: t("please_select_language"),
        text2: t("select_language_to_continue"),
      });
      return;
    }

    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await apiChangeLanguageSetting(token, selectedLanguage);
      if (response.ok) {
        await changeLanguageSetting(selectedLanguage);
        Toast.show({
          type: "success",
          text1: t("language_updated_success"),
        });
        navigation.navigate("HelpOptionsScreen");
      } else {
        throw new Error("Failed to update language");
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: t("language_update_failed"),
        text2: error.message || t("please_try_again"),
      });
    }
  };

  return (
    <LinearGradient colors={['#1E3A5F', '#091D34']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <EnhancedText style={styles.title}>{t("choose_your_language")}</EnhancedText>
          <View style={styles.languageOptions}>
            <TouchableOpacity
              style={[styles.languageOption, selectedLanguage === "English" && styles.selectedOption]}
              onPress={() => setSelectedLanguage("English")}
            >
              <Image
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
                }}
                style={styles.flag}
              />
              <EnhancedText style={styles.languageText}>{t("english")}</EnhancedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.languageOption, selectedLanguage === "Svenska" && styles.selectedOption]}
              onPress={() => setSelectedLanguage("Svenska")}
            >
              <Image
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/en/4/4c/Flag_of_Sweden.svg",
                }}
                style={styles.flag}
              />
              <EnhancedText style={styles.languageText}>{t("svenska")}</EnhancedText>
            </TouchableOpacity>
          </View>
          <EnhancedText style={styles.footerText}>
            {t("language_selection_info")}
          </EnhancedText>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.continueButton, selectedLanguage && styles.continueButtonActive]} 
            onPress={handleLanguageSelect}
          >
            <FontAwesomeIcon icon={faChevronRight} color={selectedLanguage ? "#1E3A5F" : "#8E8E8E"} size={20} />
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
  languageOptions: {
    marginBottom: 30,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectedOption: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  flag: {
    width: 30,
    height: 20,
    marginRight: 15,
  },
  languageText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  footerText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
  },
  continueButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonActive: {
    backgroundColor: '#F2E8DC',
  },
});

export default UserConfigurationScreen;
