import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { FetchVideosByCategoryName } from "./endpoints/BreathworkByCategoryEndpoints";
import EnhancedText from "../regular/EnhancedText";
import colors from "../common/colors/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import VideoItem from "../regular/VideoItem";
import NoData from "../regular/NoResult";
import NoResult from "../regular/NoResult";

const SelectedCategoryScreen = ({ navigation, route }) => {
  const { category } = route.params;
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const response = await FetchVideosByCategoryName(token, category);
        if (response.ok) {
          const data = await response.json();
          setVideos(data);
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
  }, [category]);

  const renderVideoItem = ({ item }) => (
    <VideoItem session={item} key={item.id} size="small" handlePlayNow={() => navigation.navigate("IndividualBreathworkSession", { selectedVideo: item })} />
  );

  if (videos.length === 0) {
    return (
      <View style={styles.container}>
        <NoResult />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <EnhancedText>Loading...</EnhancedText>
      ) : (
        <FlatList
          data={videos.items}
          numColumns={2} // Ensure there are 2 items per row
          renderItem={renderVideoItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.videoList}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.row}
        />
      )}
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
  videoList: {
    justifyContent: "center", // Center the content
    alignItems: "center",
  },
  row: {
    justifyContent: "space-between", // Ensure space between items in each row
    marginBottom: 20,
  },
});

export default SelectedCategoryScreen;
