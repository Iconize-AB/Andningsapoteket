import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { LoadingScreen } from "./Loading";
import { useLists } from "./Common/CustomHooks";
import ListItem from "./ListItem";
import FavoriteVideoContainer from "./FavoriteVideoContainer";
import NoData from "../regular/NoData";

const FavoriteScreen = ({
  setSelectedList,
  selectedList,
  viewComments,
  setViewComments,
  navigate,
}) => {
  const { lists, isLoading } = useLists();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (lists.length === 0) {
    return (
      <View style={styles.favorites}>
        <NoData message="You haven't created any session lists." />
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
      {selectedList ? (
        <FavoriteVideoContainer
          selectedList={selectedList}
          navigate={navigate}
          setViewComments={setViewComments}
          viewComments={viewComments}
        />
      ) : (
        <FlatList
          data={lists}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.listContainer}
        />
      )}
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
