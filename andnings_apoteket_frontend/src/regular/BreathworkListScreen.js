// src/screens/VideoListScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import colors from "../common/colors/Colors";
import EnhancedText from "./EnhancedText";

const BreathWorkListScreen = ({ navigation }) => {
  const route = useRoute();
  const { feature } = route.params;

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const fetchedVideos = [
        { id: 1, title: "Video 1", thumbnail: "https://via.placeholder.com/150", feature },
        { id: 2, title: "Video 2", thumbnail: "https://via.placeholder.com/150", feature },
        { id: 3, title: "Video 3", thumbnail: "https://via.placeholder.com/150", feature },
      ];
      setVideos(fetchedVideos);
    };

    fetchVideos();
  }, [feature]);

  const renderVideoItem = ({ item }) => (
    <TouchableOpacity
      style={styles.videoItem}
      onPress={() => {
        navigation.navigate('VideoDetail', { video: item });
      }}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <EnhancedText style={styles.videoTitle}>{item.title}</EnhancedText>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
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
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
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
  videoTitle: {
    fontSize: 18,
    color: "#000",
  },
});

export default BreathWorkListScreen;
