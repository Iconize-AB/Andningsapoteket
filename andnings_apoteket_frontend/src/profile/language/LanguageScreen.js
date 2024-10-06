import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../../common/colors/Colors";
import { useAuth } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { changeLanguageSetting } from "../endpoints/SettingsEndpoints";

const LanguageScreen = ({ userDetails }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(userDetails?.language || "Svenska");
  const { setUserDetails } = useAuth();

  const handleToggleLanguage = async (newLanguage) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const response = await changeLanguageSetting(token, newLanguage); // Call API to update language
      if (response.ok) {
        setSelectedLanguage(newLanguage);
        setUserDetails({ ...userDetails, language: newLanguage });

        Toast.show({
          type: "success",
          text1: "Language updated successfully!",
        });
      } else {
        throw new Error("Failed to update language");
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to update language!",
        text2: error.message || "Please try again.",
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* App Interface Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Interface</Text>
        <Text style={styles.subTitle}>Your device is set to English</Text>
      </View>

      {/* Content Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Content</Text>
        <Text style={styles.subTitle}>Select up to 1 language</Text>

        {/* English Language Option */}
        <View style={styles.languageRow}>
          <View style={styles.languageInfo}>
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
              }}
              style={styles.flag}
            />
            <Text style={styles.languageText}>English</Text>
          </View>
          <Switch
            onValueChange={() => handleToggleLanguage("English")}
            value={selectedLanguage === "English"}
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
            <Text style={styles.languageText}>Svenska</Text>
          </View>
          <Switch
            onValueChange={() => handleToggleLanguage("Svenska")}
            value={selectedLanguage === "Svenska"}
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
