import React, { useState } from "react"; // Import useState
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBell,
  faCog,
  faSignOutAlt,
  faUser,
  faSmile,
  faUsers,
  faNewspaper,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import colors from "../common/colors/Colors";
import { useTranslation } from "react-i18next";

const CustomDrawerContent = ({ navigation, userDetails, handleSignOut, setShowTerms }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <TouchableOpacity
        style={styles.profileSection}
        onPress={() => navigation.navigate("Profile")}
      >
        <Image style={styles.profileImage} />
        <Text style={styles.userName}>{t(userDetails?.name || "guest")}</Text>
        <Text style={styles.viewProfileText}>{t("view_profile")}</Text>
      </TouchableOpacity>

      {/* Navigation Options */}
      <View style={styles.menuSection}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("SignUp")}
        >
          <FontAwesomeIcon icon={faUser} size={24} color={colors.iconColor} />
          <Text style={styles.menuText}>{t("sign_up")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("CheckIn")}
        >
          <FontAwesomeIcon icon={faSmile} size={24} color={colors.iconColor} />
          <Text style={styles.menuText}>{t("check_in")}</Text>
        </TouchableOpacity>

        {/* This triggers the Terms & Conditions popup */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            setShowTerms(true);
            navigation.closeDrawer();
          }}
        >
          <FontAwesomeIcon icon={faBell} size={24} color={colors.iconColor} />
          <Text style={styles.menuText}>{t("terms_and_condition")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("Friends")}
        >
          <FontAwesomeIcon icon={faUsers} size={24} color={colors.iconColor} />
          <Text style={styles.menuText}>Friends & Teachers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("News")}
        >
          <FontAwesomeIcon
            icon={faNewspaper}
            size={24}
            color={colors.iconColor}
          />
          <Text style={styles.menuText}>{t("news")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("Share")}
        >
          <FontAwesomeIcon icon={faHeart} size={24} color={colors.iconColor} />
          <Text style={styles.menuText}>{t("share_andningsapoteket")}</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("Settings")}
        >
          <FontAwesomeIcon icon={faCog} size={24} color={colors.iconColor} />
          <Text style={styles.menuText}>{t("settings")}</Text>
        </TouchableOpacity>

        {/* Sign Out Button */}
        <TouchableOpacity style={styles.menuItem} onPress={handleSignOut}>
          <FontAwesomeIcon
            icon={faSignOutAlt}
            size={24}
            color={colors.iconColor}
          />
          <Text style={styles.menuText}>{t("sign_out")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 40,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.iconColor,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginTop: 10,
  },
  viewProfileText: {
    fontSize: 14,
    color: colors.primary,
    marginTop: 5,
  },
  menuSection: {
    flex: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  menuText: {
    marginLeft: 15,
    fontSize: 16,
    color: "#000",
  },
  premiumText: {
    color: colors.secondary,
    fontStyle: "italic",
  },
  bottomSection: {
    marginBottom: 20,
  },
});

export default CustomDrawerContent;
