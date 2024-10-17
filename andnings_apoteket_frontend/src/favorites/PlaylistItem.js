import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import EnhancedText from "../regular/EnhancedText";
import { LinearGradient } from 'expo-linear-gradient';

const PlaylistItem = ({ playlist, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={['#1E3A5F', '#091D34']}
        style={styles.container}
      >
        <View style={styles.content}>
          <EnhancedText style={styles.title}>{playlist.name}</EnhancedText>
          <EnhancedText style={styles.description}>
            {playlist.description}
          </EnhancedText>
        </View>
        <FontAwesomeIcon icon={faChevronRight} color="#F2E8DC" size={20} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  description: {
    fontSize: 14,
    color: "#F2E8DC",
    opacity: 0.8,
    marginTop: 5,
  },
});

export default PlaylistItem;
