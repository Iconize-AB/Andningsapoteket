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

const SettingsScreen = ({
  handleOnTermsPress,
  navigation,
  userDetails,
  setUserDetails,
  route
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { setShowTerms } = route.params;

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
              const response = await DeleteUser(token, userDetails.id);
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
                handleSignOut();
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
      {/* Account Section */}
      <View style={styles.section}>
        <EnhancedText style={styles.sectionTitle}>Account</EnhancedText>
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

      {/* Support & About Section */}
      <View style={styles.section}>
        <EnhancedText style={styles.sectionTitle}>Support & About</EnhancedText>
        <View style={styles.sectionBody}>
          <TouchableOpacity
            style={styles.row}
            onPress={() => setModalVisible(true)}
          >
            <Icon name="card-outline" size={24} color="#333" />
            <EnhancedText style={styles.rowText}>Prenumeration</EnhancedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate("SupportScreen")}
          >
            <Icon name="help-circle-outline" size={24} color="#333" />
            <EnhancedText style={styles.rowText}>Hjälp och support</EnhancedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={() => setShowTerms(true)}>
            <Icon name="information-circle-outline" size={24} color="#333" />
            <EnhancedText style={styles.rowText}>Terms & condition</EnhancedText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Actions Section */}
      <View style={styles.section}>
        <EnhancedText style={styles.sectionTitle}>Actions</EnhancedText>
        <View style={styles.sectionBody}>
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate("ReportIssueScreen")}
          >
            <Icon name="flag-outline" size={24} color="#333" />
            <EnhancedText style={styles.rowText}>
              Rapportera ett problem
            </EnhancedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={handleOnDelete}>
            <Icon name="trash-outline" size={24} color="#333" />
            <EnhancedText style={[styles.rowText, styles.deleteText]}>
              Radera mitt konto
            </EnhancedText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal for Subscription */}
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
