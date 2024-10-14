import React from "react";
import { StyleSheet, View } from "react-native";
import EnhancedText from "../regular/EnhancedText";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeadphonesAlt, faHeart } from "@fortawesome/free-solid-svg-icons";

const SessionInfo = ({ session, sessionStats }) => {
  return (
    <View style={styles.videoInfo}>
      <View style={styles.videoInfoRow}>
        <EnhancedText style={styles.videoDuration}>15 MIN</EnhancedText>
      </View>
      <View>
        <EnhancedText style={styles.videoDescription}>
          {session.description}
        </EnhancedText>
      </View>
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <FontAwesomeIcon icon={faHeart} style={styles.statIcon} />
          <EnhancedText>
            Total Watches: {sessionStats?.totalWatches}
          </EnhancedText>
        </View>
        <View style={styles.stat}>
          <FontAwesomeIcon icon={faHeadphonesAlt} style={styles.statIcon} />
          <EnhancedText>Likes: {sessionStats?.likeCount}</EnhancedText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  videoInfo: {
    display: "flex",
    gap: 16,
  },
  videoDescription: {
    fontSize: 14,
    color: "#666",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
  },
  statIcon: {
    fontSize: 20,
    color: "#000",
    marginRight: 5,
  },
  statText: {
    fontSize: 12,
    color: "#000",
  },
});

export default SessionInfo;
