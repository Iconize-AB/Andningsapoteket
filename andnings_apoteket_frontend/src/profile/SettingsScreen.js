import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  Animated,
} from "react-native";
import EnhancedText from "../regular/EnhancedText";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../common/colors/Colors";
import Toast from "react-native-toast-message";
import { DeleteUser } from "../authentication/endpoints/AuthenticationEndpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SubscriptionModal from "../subscription/SubscriptionModal";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";

const SettingsScreen = ({
  navigation,
  userDetails,
  setUserDetails,
  setShowTerms,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { t } = useTranslation();
  const { signOut } = useAuth();

  const handleOnDelete = async () => {
    Alert.alert(
      t("alert.title"),
      t("alert.message"),
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem("userToken");
              console.log('userDetails', userDetails);
              const response = await DeleteUser(token, userDetails.id);
              console.log('response', response);
              if (response.ok) {
                Toast.show({
                  type: "success",
                  text1: "Your account has been deleted.",
                  icon: "heart",
                  text1Style: {
                    color: "#466F78",
                  },
                  text2Style: {
                    color: "#466F78",
                  },
                  backgroundColor: "#000",
                });
                signOut();
              } else {
                Toast.show({
                  type: "error",
                  text1: "Sorry, friend. The technology failed us.",
                  text2: "Please try again 🙏",
                  text1Style: {
                    color: "#466F78",
                  },
                  text2Style: {
                    color: "#466F78",
                  },
                  backgroundColor: "#000",
                });
              }
            } catch (error) {
              Toast.show({
                type: "error",
                text1: "Sorry, friend. The technology failed us.",
                text2: "Please try again 🙏",
                text1Style: {
                  color: "#466F78",
                },
                text2Style: {
                  color: "#466F78",
                },
                backgroundColor: "#000",
              });
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <EnhancedText style={styles.sectionTitle}>{t("account")}</EnhancedText>
        <View style={styles.sectionBody}>
          <TouchableOpacity
            style={styles.row}
            onPress={() =>
              navigation.navigate("ProfileScreen", { userDetails, setUserDetails })
            }
          >
            <Icon name="person-outline" size={24} color="#333" />
            <EnhancedText style={styles.rowText}>Ändra profil</EnhancedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate("LanguageScreen")}
          >
            <Icon name="globe" size={24} color="#333" />
            <EnhancedText style={styles.rowText}>Språk</EnhancedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            onPress={() =>
              navigation.navigate("NotificationScreen", {
                userDetails,
                setUserDetails,
              })
            }
          >
            <Icon name="notifications-outline" size={24} color="#333" />
            <EnhancedText style={styles.rowText}>Notifikationer</EnhancedText>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <EnhancedText style={styles.sectionTitle}>{t("support_and_about")}</EnhancedText>
        <View style={styles.sectionBody}>
          <TouchableOpacity
            style={styles.row}
            onPress={() => setModalVisible(true)}
          >
            <Icon name="card-outline" size={24} color="#333" />
            <EnhancedText style={styles.rowText}>{t("subscription")}</EnhancedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate("SupportScreen")}
          >
            <Icon name="help-circle-outline" size={24} color="#333" />
            <EnhancedText style={styles.rowText}>{t("help_and_support")}</EnhancedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={() => setShowTerms(true)}>
            <Icon name="information-circle-outline" size={24} color="#333" />
            <EnhancedText style={styles.rowText}>{t("terms_and_conditions")}</EnhancedText>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <EnhancedText style={styles.sectionTitle}>{t("actions")}</EnhancedText>
        <View style={styles.sectionBody}>
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate("ReportIssueScreen")}
          >
            <Icon name="flag-outline" size={24} color="#333" />
            <EnhancedText style={styles.rowText}>
              {t("report_a_problem")}
            </EnhancedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={handleOnDelete}>
            <Icon name="trash-outline" size={24} color="#333" />
            <EnhancedText style={[styles.rowText, styles.deleteText]}>
              {t("delete_my_account")}
            </EnhancedText>
          </TouchableOpacity>
        </View>
      </View>

      <SubscriptionModal isModalVisible={isModalVisible} setModalVisible={setModalVisible}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.background,
    flexGrow: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  sectionBody: {
    backgroundColor: "transparant",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  rowText: {
    fontSize: 16,
    marginLeft: 12,
    color: "#333",
  },
  deleteText: {
    color: "#d9534f",
  },
});

export default SettingsScreen;
