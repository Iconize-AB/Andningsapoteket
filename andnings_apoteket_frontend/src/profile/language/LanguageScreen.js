import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Image,
} from "react-native";
import colors from "../../common/colors/Colors";
import { useAuth } from "../../context/AuthContext";
import Toast from "react-native-toast-message";
import { changeLanguageSetting as apiChangeLanguageSetting } from "../endpoints/SettingsEndpoints";
import { useTranslation } from 'react-i18next';
import AsyncStorage from "@react-native-async-storage/async-storage";

const LanguageScreen = () => {
  const { userDetails, changeLanguageSetting } = useAuth();
  const { t } = useTranslation();

  const handleToggleLanguage = async (newLanguage) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await apiChangeLanguageSetting(token, newLanguage);
      if (response.ok) {
        await changeLanguageSetting(newLanguage);

        Toast.show({
          type: "success",
          text1: t("language_updated_success"),
        });
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
    <View style={styles.container}>
      {/* App Interface Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t("app_interface")}</Text>
        <Text style={styles.subTitle}>{t("device_language", { language: t(userDetails?.language || "English") })}</Text>
      </View>

      {/* Content Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t("content")}</Text>
        <Text style={styles.subTitle}>{t("select_language")}</Text>

        {/* English Language Option */}
        <View style={styles.languageRow}>
          <View style={styles.languageInfo}>
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
              }}
              style={styles.flag}
            />
            <Text style={styles.languageText}>{t("english")}</Text>
          </View>
          <Switch
            onValueChange={() => handleToggleLanguage("English")}
            value={userDetails?.language === "English"}
          />
        </View>

        {/* Svenska Language Option */}
        <View style={styles.languageRow}>
          <View style={styles.languageInfo}>
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/en/4/4c/Flag_of_Sweden.svg",
              }}
              style={styles.flag}
            />
            <Text style={styles.languageText}>{t("svenska")}</Text>
          </View>
          <Switch
            onValueChange={() => handleToggleLanguage("Svenska")}
            value={userDetails?.language === "Svenska"}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  },
  section: {
    marginBottom: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 14,
    color: "#666",
  },
  languageRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  languageInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  flag: {
    width: 30,
    height: 20,
    marginRight: 10,
  },
  languageText: {
    fontSize: 16,
  },
});

export default LanguageScreen;
