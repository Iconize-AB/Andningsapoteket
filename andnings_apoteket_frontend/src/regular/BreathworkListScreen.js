// src/screens/VideoListScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import colors from "../common/colors/Colors";
import EnhancedText from "./EnhancedText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FetchVideosByFeature } from "../categories/endpoints/BreathworkByCategoryEndpoints";
import VideoItem from "./VideoItem";

const BreathWorkListScreen = ({ navigation }) => {
  const route = useRoute();
  const { feature } = route.params;

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const response = await FetchVideosByFeature(token, feature);
        const data = await response.json();
        console.log("response", data);
        if (data) {
          setVideos(data?.items);
        } else {
          console.log('Error fetching breathwork sessions:', response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch breathwork sessions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [feature]);

  const renderVideoItem = ({ item }) => (
    <VideoItem session={item} key={item.id} size="small" handlePlayNow={() => navigation.navigate("VideoDetail", { video: item })} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        numColumns={2} // Ensure there are 2 items per row
        renderItem={renderVideoItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.videoList}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    marginBottom: 100,
    paddingTop: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  videoList: {
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 20,
  },
});

export default BreathWorkListScreen;
