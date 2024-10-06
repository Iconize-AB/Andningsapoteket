import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import NoData from "../regular/NoResult";
import { LoadingScreen } from "../regular/LoadingSreen";
import ListItem from "../regular/ListItem";
import NoResult from "../regular/NoResult";

const FavoriteScreen = ({
  setSelectedList,
  selectedList,
  viewComments,
  setViewComments,
  navigate,
}) => {
  // const { lists, isLoading } = useLists();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (lists.length === 0) {
    return (
      <View style={styles.favorites}>
        <NoResult message="You haven't created any session lists." />
      </View>
    );
  }

  const handlePressList = (list) => {
    setSelectedList(list);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.listItem}
      onPress={() => handlePressList(item)}
    >
      <ListItem item={item} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.favorites}>
      <FlatList
        data={lists}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.listContainer}
      />
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  favorites: {
    flex: 1,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    width: "100%",
    padding: 20,
  },
  deleteIcon: {
    color: "red",
    fontSize: 20,
    marginLeft: 10,
  },
  videoContainer: {
    width: "100%",
    padding: 20,
  },
  videoHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
