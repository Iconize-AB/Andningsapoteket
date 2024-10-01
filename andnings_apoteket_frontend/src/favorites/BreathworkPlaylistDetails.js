import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import colors from "../common/colors/Colors";
import EnhancedText from "../regular/EnhancedText";
import VideoItem from "../regular/VideoItem";

const BreathworkPlaylistDetails = ({ route, navigation }) => {
  const { playlist } = route.params;

  const renderVideoItem = ({ item }) => {
    const session = item?.video;
    return (
        <VideoItem session={session} handlePlayNow={() => navigation.navigate("VideoDetail", { video: item })}  />
    )
  };

  return (
    <View style={styles.container}>
      <EnhancedText style={styles.title}>{playlist.name}</EnhancedText>
      <FlatList
        data={playlist.videos}
        renderItem={renderVideoItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.videoList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  videoList: {
    paddingBottom: 20,
  },
  videoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginRight: 20,
    borderRadius: 10,
  },
  videoInfo: {
    flex: 1,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primaryText,
  },
  videoDescription: {
    fontSize: 14,
    color: colors.secondaryText,
  },
});

export default BreathworkPlaylistDetails;
