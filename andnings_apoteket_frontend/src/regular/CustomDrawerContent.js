import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faUser,
  faChevronDown,
  faChevronUp,
  faSignOutAlt,
  faFileAlt,
  faCheckCircle,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import Svg, { Path } from "react-native-svg";
import { useAuth } from "../context/AuthContext";

const CustomDrawerContent = (props) => {
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const [isLanguageExpanded, setIsLanguageExpanded] = useState(false);
  const { signOut } = useAuth();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContainer}
    >
      <View style={styles.header}>
        <Text style={styles.username}>Philip</Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("ProfileScreen")}
        >
          <Text style={styles.username}>Profile</Text>
        </TouchableOpacity>
      </View>
      {/* Menu Items */}
      <TouchableOpacity style={styles.drawerItem}>
        <FontAwesomeIcon icon={faCheckCircle} size={18} color="#FFF" />
        <Text style={styles.itemText}>Checka in</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.drawerItem}>
        <FontAwesomeIcon icon={faFileAlt} size={18} color="#FFF" />
        <Text style={styles.itemText}>Allmänna villkor</Text>
      </TouchableOpacity>

      {/* Profile Section with Submenu */}
      <TouchableOpacity
        style={[styles.drawerItem, styles.expandableItem]}
        onPress={() => setIsProfileExpanded(!isProfileExpanded)}
      >
        <View style={styles.expandableWrapper}>
          <FontAwesomeIcon icon={faUser} size={18} color="#FFF" />
          <Text style={styles.itemText}>Profil</Text>
        </View>
        <FontAwesomeIcon
          icon={isProfileExpanded ? faChevronUp : faChevronDown}
          size={18}
          color="#FFF"
        />
      </TouchableOpacity>

      {isProfileExpanded && (
        <View style={styles.subMenu}>
          {/* Custom SVG Curved Line */}
          <Svg height="120" width="40" style={styles.curvedLine}>
            <Path
              d="M20 0 C10 20, 10 40, 20 60 C30 80, 30 100, 20 120"
              stroke="#FFFFFF"
              strokeWidth="2"
              fill="none"
            />
          </Svg>

          <TouchableOpacity style={styles.subMenuItem}>
            <Text style={styles.subMenuText}>Inställningar</Text>
          </TouchableOpacity>

          {/* Language Section with Dropdown */}
          <TouchableOpacity
            style={[styles.subMenuItem, styles.expandableItem]}
            onPress={() => setIsLanguageExpanded(!isLanguageExpanded)}
          >
            <Text style={styles.subMenuText}>Svenska</Text>
            <FontAwesomeIcon
              icon={isLanguageExpanded ? faChevronUp : faChevronDown}
              size={16}
              color="#B0C4DE"
            />
          </TouchableOpacity>

          {isLanguageExpanded && (
            <View style={styles.languageOptions}>
              <TouchableOpacity style={styles.languageOptionItem}>
                <Text style={styles.languageOptionText}>Svenska</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.languageOptionItem}>
                <Text style={styles.languageOptionText}>English</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity style={styles.subMenuItem}>
            <Text style={styles.subMenuText}>Notifikationer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.subMenuItem}>
            <Text style={styles.subMenuText}>Prenumeration</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.drawerItem}>
        <FontAwesomeIcon icon={faFileAlt} size={18} color="#FFF" />
        <Text style={styles.itemText}>Nya sessions</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity style={styles.drawerItem}>
        <FontAwesomeIcon icon={faFileAlt} size={18} color="#FFF" />
        <Text style={styles.itemText}>Dela andningsapoteket</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={() => props.setShowPlusMembership(true)}>
        <FontAwesomeIcon icon={faFileAlt} size={18} color="#FFF" />
        <Text style={styles.itemText}>Plus membership</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() =>
          props.navigation.navigate("Settings", {
            setShowTerms: props.setShowTerms,
          })
        }
      >
        <FontAwesomeIcon icon={faCog} size={18} color="#FFF" />
        <Text style={styles.itemText}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.drawerItem} onPress={signOut}>
        <FontAwesomeIcon icon={faSignOutAlt} size={18} color="#FFF" />
        <Text style={styles.itemText}>Logga ut</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: "#1E4A61", // Darker blue background as per image
    paddingTop: 0,
  },
  header: {
    padding: 20,
    marginTop: 50,
    backgroundColor: "#1E4A61", // Header background color
    alignItems: "center",
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 10,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 2,
  },
  itemText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#FFF",
  },
  expandableItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  expandableWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  subMenu: {
    marginLeft: 40, // Submenu indentation
    marginTop: -10, // Adjust margin for proper spacing
  },
  subMenuItem: {
    paddingVertical: 8,
  },
  subMenuText: {
    fontSize: 14,
    color: "#B0C4DE", // Lighter color for submenu
  },
  languageOptions: {
    marginLeft: 20, // Indent the language options further
    marginTop: 5,
  },
  languageOptionItem: {
    paddingVertical: 5,
  },
  languageOptionText: {
    fontSize: 14,
    color: "#B0C4DE", // Same color as other submenu items
  },
  divider: {
    height: 1,
    backgroundColor: "#B0C4DE", // Divider color
    marginVertical: 15,
    marginLeft: 20,
  },
  curvedLine: {
    position: "absolute",
    left: -40,
    top: 5,
  },
});

export default CustomDrawerContent;
