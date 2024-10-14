import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import EnhancedText from "./EnhancedText";
import colors from "../common/colors/Colors";

const VideoItem = ({ session, handlePlayNow, size = "medium" }) => {
  const getCardSizeStyle = () => {
    switch (size) {
      case "small":
        return styles.smallCard;
      case "large":
        return styles.largeCard;
      default:
        return styles.mediumCard;
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.container, getCardSizeStyle()]} 
      onPress={() => handlePlayNow(session)}
      activeOpacity={0.7}
    >
      <View style={styles.card}>
        <Image
          source={{ uri: session.imageUrl }}
          style={styles.cardImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.textContainer}>
        <EnhancedText style={styles.cardTitle}>{session.title}</EnhancedText>
        <EnhancedText style={styles.cardSubtitle}>
          {session.duration} • {session.category}
        </EnhancedText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  card: {
    borderRadius: 10,
    overflow: "hidden",
  },
  smallCard: {
    width: "48%", // Slightly less than 50% to account for spacing
  },
  mediumCard: {
    width: 250,
    marginRight: 15,
  },
  largeCard: {
    width: "100%",
  },
  cardImage: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  textContainer: {
    marginTop: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text,
  },
  cardSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
});

export default VideoItem;
