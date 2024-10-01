import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import EnhancedText from "../regular/EnhancedText";
import colors from "../common/colors/Colors";

const PlaylistItem = ({ playlist, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        source={{ uri: playlist.thumbnail || "https://via.placeholder.com/100" }}
        style={styles.thumbnail}
      />
      <View style={styles.content}>
        <View>
          <EnhancedText style={styles.title}>{playlist.name}</EnhancedText>
          <EnhancedText style={styles.description}>
            {playlist.description}
          </EnhancedText>
        </View>
        <FeatherIcon name="chevron-right" size={24} color="#ccc" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: colors.secondaryText,
    marginTop: 5,
  },
});

export default PlaylistItem;
