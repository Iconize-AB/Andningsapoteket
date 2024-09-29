import { StyleSheet, View } from "react-native";
import EnhancedText from "./EnhancedText";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import colors from "../common/colors/Colors";
import EnhancedButton from "./EnhancedButton";

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
    <View key={session.id} style={[styles.card, getCardSizeStyle()]}>
      <View style={styles.cardImage}>
        <View style={styles.cardOverlay}>
          <EnhancedText style={styles.cardTitle}>{session.title}</EnhancedText>
          <EnhancedText style={styles.cardSubtitle}>
            {session.description}
          </EnhancedText>
          <EnhancedButton
            size="small"
            icon={faPlay}
            onPress={() => handlePlayNow(session)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  smallCard: {
    width: "45%",
  },
  mediumCard: {
    width: 250,
    marginRight: 15,
  },
  largeCard: {
    width: "100%",
  },
  cardImage: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  cardOverlay: {
    backgroundColor: colors.secondary,
    padding: 20,
    width: "100%",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#fff",
  },
});

export default VideoItem;
