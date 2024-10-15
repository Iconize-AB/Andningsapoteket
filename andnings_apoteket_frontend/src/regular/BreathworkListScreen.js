// src/screens/VideoListScreen.js
import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import colors from "../common/colors/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FetchSessionsByCondition } from "../categories/endpoints/BreathworkByCategoryEndpoints";
import SessionItem from "./VideoItem";

const BreathWorkListScreen = ({ navigation }) => {
  const route = useRoute();
  const { condition } = route.params;

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const response = await FetchSessionsByCondition(token, condition);
        const data = await response.json();
        if (data) {
          setSessions(data?.items);
        } else {
          console.log('Error fetching breathwork sessions:', response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch breathwork sessions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [condition]);

  const renderSessionItem = ({ item }) => (
    <SessionItem session={item} key={item.id} size="small" handlePlayNow={() => navigation.navigate("IndividualBreathworkSession", { session: item })} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={sessions}
        numColumns={2} // Ensure there are 2 items per row
        renderItem={renderSessionItem}
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
