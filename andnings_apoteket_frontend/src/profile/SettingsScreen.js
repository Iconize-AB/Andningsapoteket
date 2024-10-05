import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import EnhancedText from "../regular/EnhancedText";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../common/colors/Colors";

const SettingsScreen = ({
  handleOnProfileChange,
  handleOnSecurityPress,
  handleOnNotificationPress,
  handleOnSubscriptionPress,
  handleOnSupportPress,
  handleOnTermsPress,
  handleOnReportProblem,
  handleOnDelete,
}) => {

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Account Section */}
      <View style={styles.section}>
        <EnhancedText style={styles.sectionTitle}>Account</EnhancedText>
        <View style={styles.sectionBody}>
          <TouchableOpacity style={styles.row} onPress={handleOnProfileChange}>
            <Icon name="person-outline" size={24} color="#333" />
            <EnhancedText style={styles.rowText}>Ändra profil</EnhancedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={handleOnSecurityPress}>
            <Icon name="shield-outline" size={24} color="#333" />
            <EnhancedText style={styles.rowText}>Säkerhet</EnhancedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={handleOnNotificationPress}>
            <Icon name="notifications-outline" size={24} color="#333" />
            <EnhancedText style={styles.rowText}>Notifikationer</EnhancedText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Support & About Section */}
      <View style={styles.section}>
        <EnhancedText style={styles.sectionTitle}>Support & About</EnhancedText>
        <View style={styles.sectionBody}>
          <TouchableOpacity style={styles.row} onPress={handleOnSubscriptionPress}>
            <Icon name="card-outline" size={24} color="#333" />
            <EnhancedText style={styles.rowText}>Prenumeration</EnhancedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={handleOnSupportPress}>
            <Icon name="help-circle-outline" size={24} color="#333" />
            <EnhancedText style={styles.rowText}>Hjälp och support</EnhancedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={handleOnTermsPress}>
            <Icon name="information-circle-outline" size={24} color="#333" />
            <EnhancedText style={styles.rowText}>Terms & condition</EnhancedText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Actions Section */}
      <View style={styles.section}>
        <EnhancedText style={styles.sectionTitle}>Actions</EnhancedText>
        <View style={styles.sectionBody}>
          <TouchableOpacity style={styles.row} onPress={handleOnReportProblem}>
            <Icon name="flag-outline" size={24} color="#333" />
            <EnhancedText style={styles.rowText}>Rapportera ett problem</EnhancedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={handleOnDelete}>
            <Icon name="trash-outline" size={24} color="#333" />
            <EnhancedText style={[styles.rowText, styles.deleteText]}>
              Radera mitt konto
            </EnhancedText>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.background,
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
