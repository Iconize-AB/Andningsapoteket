import React, { useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import EnhancedText from "./EnhancedText";
import colors from "../common/colors/Colors";
import videoitem from "../resources/videoitem.png";


const SessionItem = ({ session, handlePlayNow, size = "medium" }) => {
  const [imageError, setImageError] = useState(false);

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

  const handleImageError = () => {
    setImageError(true);
  };

  const getImageSource = () => {
    if (session.imageUrl && !imageError) {
      return { uri: session.imageUrl };
    }
    return videoitem;
  };

  return (
    <TouchableOpacity 
      style={[styles.container, getCardSizeStyle()]} 
      onPress={() => handlePlayNow(session)}
      activeOpacity={0.7}
    >
      <View style={styles.card}>
        <Image
          source={getImageSource()}
          style={styles.cardImage}
          resizeMode="cover"
          onError={handleImageError}
        />
      </View>
      <View style={styles.textContainer}>
        <EnhancedText style={styles.cardTitle} numberOfLines={2} ellipsizeMode="tail">
          {session.title}
        </EnhancedText>
        <EnhancedText style={styles.cardSubtitle}>
          {session.duration || 'null MIN'} • {session.category || 'FIRE'}
        </EnhancedText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%', // Take full width of its parent (itemWrapper)
    marginBottom: 20,
  },
  card: {
    borderRadius: 10,
    overflow: "hidden",
    aspectRatio: 16 / 9,
  },
  smallCard: {
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
    height: '100%',
  },
  textContainer: {
    marginTop: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});

export default SessionItem;
