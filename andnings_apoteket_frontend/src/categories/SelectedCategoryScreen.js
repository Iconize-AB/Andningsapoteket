import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Dimensions } from "react-native";
import { FetchSessionsByCategoryName } from "./endpoints/BreathworkByCategoryEndpoints";
import EnhancedText from "../regular/EnhancedText";
import colors from "../common/colors/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoResult from "../regular/NoResult";
import SessionItem from "../regular/VideoItem";

const SelectedCategoryScreen = ({ navigation, route }) => {
  const { category } = route.params;
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const response = await FetchSessionsByCategoryName(token, category);
        if (response.ok) {
          const data = await response.json();
          console.log('responsedatadatadatadata', data);
          setSessions(data);
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
  }, [category]);

  const renderSessionItem = ({ item, index }) => (
    <View style={[
      styles.itemWrapper,
      index % 2 === 0 ? styles.leftItem : styles.rightItem
    ]}>
      <SessionItem
        session={{
          ...item,
          duration: `${item.duration} MIN`,
          category: item.category.toUpperCase()
        }} 
        key={item?.id} 
        size="small" 
        handlePlayNow={() => navigation.navigate("IndividualBreathworkSession", { session: item })} 
      />
    </View>
  );

  if (sessions.length === 0) {
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
          data={sessions.items}
          renderItem={renderSessionItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.videoList}
          showsVerticalScrollIndicator={false}
          numColumns={2}
        />
      )}
    </View>
  );
};

const { width } = Dimensions.get('window');
const itemWidth = (width - 38) / 2; // 38 is total horizontal padding (15 * 2 + 8 gap)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    marginBottom: 100,
    paddingTop: 20,
    backgroundColor: colors.background,
  },
  videoList: {
    alignItems: "flex-start",
  },
  itemWrapper: {
    width: itemWidth,
    marginBottom: 8, // Vertical gap between items
  },
  leftItem: {
    marginRight: 4, // Half of the 8px gap
  },
  rightItem: {
    marginLeft: 4, // Half of the 8px gap
  },
});

export default SelectedCategoryScreen;
