import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCog, faChevronRight, faUser, faBell, faLock, faQuestionCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";
import { LoadingScreen } from "../regular/LoadingSreen";
import EnhancedText from "../regular/EnhancedText";
import { useTranslation } from "react-i18next";
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen({ navigation, userDetails }) {
  const { t } = useTranslation();
  const { signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const stats = [
    { label: "Completed Challenges", value: 12 },
    { label: "Streak", value: "7 days" },
    { label: "Total Minutes", value: 360 },
  ];

  const menuItems = [
    { label: "Edit Profile", icon: faUser, onPress: () => navigation.navigate("EditProfile") },
    { label: "Notifications", icon: faBell, onPress: () => navigation.navigate("NotificationScreen") },
    { label: "Privacy Settings", icon: faLock, onPress: () => navigation.navigate("PrivacySettings") },
    { label: "Help & Support", icon: faQuestionCircle, onPress: () => navigation.navigate("SupportScreen") },
    { label: "Sign Out", icon: faSignOutAlt, onPress: signOut },
  ];

  return (
    <LinearGradient colors={['#1E3A5F', '#091D34']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.header}>
            <EnhancedText style={styles.title}>Profile</EnhancedText>
            <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
              <FontAwesomeIcon icon={faCog} size={24} color="#F2E8DC" />
            </TouchableOpacity>
          </View>

          <View style={styles.profileInfo}>
            <View style={styles.avatar}>
              <EnhancedText style={styles.avatarText}>
                {userDetails?.name ? userDetails.name[0] : '?'}
              </EnhancedText>
            </View>
            <EnhancedText style={styles.name}>{userDetails?.name || 'User'}</EnhancedText>
            <EnhancedText style={styles.email}>{userDetails?.email || 'No email provided'}</EnhancedText>
          </View>

          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <EnhancedText style={styles.statValue}>{stat.value}</EnhancedText>
                <EnhancedText style={styles.statLabel}>{stat.label}</EnhancedText>
              </View>
            ))}
          </View>

          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
                <View style={styles.menuItemLeft}>
                  <FontAwesomeIcon icon={item.icon} color="#A0C8F9" size={20} style={styles.menuItemIcon} />
                  <EnhancedText style={styles.menuItemText}>{item.label}</EnhancedText>
                </View>
                <FontAwesomeIcon icon={faChevronRight} color="#A0C8F9" size={16} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F2E8DC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E3A5F',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#A0C8F9',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F2E8DC',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#A0C8F9',
  },
  menuContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    marginRight: 15,
  },
  menuItemText: {
    fontSize: 16,
    color: '#F2E8DC',
  },
});
