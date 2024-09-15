import React from "react";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";

const Avatar = ({ avatarUri }) => {
  return (
    <TouchableOpacity onPress={handleAvatarChange} style={styles.container}>
      <Image
        source={avatarUri ? { uri: avatarUri } : DefaultImage}
        style={styles.avatar}
      />
      <FeatherIcon name="edit" size={20} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 60,
    marginRight: 10,
    height: 60,
    borderRadius: 30,
  },
  icon: {
    position: "absolute",
    right: 10,
    top: 0,
    color: "#fff",
  },
});

export default Avatar;
