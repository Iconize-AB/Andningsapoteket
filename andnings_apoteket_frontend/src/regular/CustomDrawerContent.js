import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import ShareAppModal from './ShareAppModal';
import { useAuth } from '../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

const CustomDrawerContent = (props) => {
  const { t } = useTranslation();
  const { navigation, userDetails, setShowPlusMembership } = props;
  const { signOut } = useAuth();
  const [isShareAppModalVisible, setShareAppModalVisible] = useState(false);
  const [isProfileExpanded, setIsProfileExpanded] = useState(true);

  const DrawerItem = ({ icon, label, onPress, expandable, expanded, children }) => (
    <View>
      <TouchableOpacity 
        style={styles.drawerItem} 
        onPress={expandable ? () => setIsProfileExpanded(!isProfileExpanded) : onPress}
      >
        <Icon name={icon} size={24} color="#F2E8DC" style={styles.icon} />
        <Text style={styles.drawerItemText}>{label}</Text>
        {expandable && (
          <Icon
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={24}
            color="#F2E8DC"
            style={styles.expandIcon}
          />
        )}
      </TouchableOpacity>
      {expanded && children}
    </View>
  );

  return (
    <LinearGradient colors={['#1E3A5F', '#091D34']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{t('Philip')}</Text>
          </View>
          <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
            <DrawerItem 
              icon="check-circle-outline" 
              label={t('Checka in')} 
              onPress={() => navigation.navigate('CheckIn')} 
            />
            <DrawerItem 
              icon="file-document-outline"
              label={t('Allmänna villkor')}
              onPress={() => navigation.navigate('Terms')}
            />
            <DrawerItem
              icon="account-outline"
              label={t('Profil')}
              expandable
              expanded={isProfileExpanded}
              onPress={() => navigation.navigate('ProfileScreen')}
            >
              {isProfileExpanded && (
                <View style={styles.subMenu}>
                  <DrawerItem 
                    icon="cog-outline" 
                    label={t('Inställningar')} 
                    onPress={() => navigation.navigate('Settings')} 
                  />
                  <DrawerItem
                    icon="account-outline"
                    label={t('Dashboard')} 
                    onPress={() => navigation.navigate('ProfileScreen')} 
                  />
                  <DrawerItem
                    icon="translate"
                    label={userDetails?.language || "Language"} 
                    onPress={() => navigation.navigate('LanguageScreen')} 
                  />
                  <DrawerItem
                    icon="bell-outline" 
                    label={t('Notifikationer')} 
                    onPress={() => navigation.navigate('NotificationScreen')} 
                  />
                  <DrawerItem 
                    icon="star-outline" 
                    label={t('Prenumeration')} 
                    onPress={() => setShowPlusMembership(true)} 
                  />
                </View>
              )}
            </DrawerItem>
            <DrawerItem 
              icon="play-circle-outline" 
              label={t('Nya sessions')} 
              onPress={() => navigation.navigate('NewSessions')} 
            />
            <DrawerItem 
              icon="cog-outline" 
              label={t('Inställningar')} 
              onPress={() => navigation.navigate('Settings')} 
            />
            <View style={styles.separator} />
            <DrawerItem 
              icon="share-variant-outline" 
              label={t('Dela andningsapoteket')} 
              onPress={() => {
                setShareAppModalVisible(true);
              }} 
            />
            <DrawerItem 
              icon="logout"
              label={t('Logga ut')}
              onPress={signOut} 
            />
            <ShareAppModal 
              isVisible={isShareAppModalVisible}
              onClose={() => setShareAppModalVisible(false)}
              onShare={(emails) => {
                // Handle sharing logic here
                console.log('Sharing with emails:', emails);
                setShareAppModalVisible(false);
              }}
            />
          </DrawerContentScrollView>
        </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F2E8DC',
  },
  drawerContent: {
    paddingTop: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileLabel: {
    marginLeft: 32,
    fontSize: 16,
    color: '#F2E8DC',
  },
  subMenu: {
    paddingLeft: 16,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 8,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  icon: {
    marginRight: 16,
  },
  drawerItemText: {
    fontSize: 16,
    color: '#F2E8DC',
  },
  expandIcon: {
    marginLeft: 16,
  },
});

export default CustomDrawerContent;
