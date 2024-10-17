import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View, SafeAreaView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import NoResult from "../regular/NoResult";
import { LoadingScreen } from "../regular/LoadingSreen";
import EnhancedText from "../regular/EnhancedText";

const FavoriteScreen = ({
  setSelectedList,
  selectedList,
  viewComments,
  setViewComments,
  navigate,
}) => {
  // Assuming you have a hook or state management for lists and loading
  const { lists, isLoading } = useLists();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (lists.length === 0) {
    return (
      <LinearGradient colors={['#1E3A5F', '#091D34']} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <NoResult message="You haven't created any session lists." />
        </SafeAreaView>
      </LinearGradient>
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
      <View style={styles.listItemContent}>
        <EnhancedText style={styles.listItemTitle}>{item.name}</EnhancedText>
        <EnhancedText style={styles.listItemSubtitle}>{item.Sessions?.length} sessions</EnhancedText>
      </View>
      <FontAwesomeIcon icon={faChevronRight} color="#F2E8DC" size={20} />
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#1E3A5F', '#091D34']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <EnhancedText style={styles.title}>Your Favorites</EnhancedText>
          <FlatList
            data={lists}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.listContainer}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
  },
  listContainer: {
    width: "100%",
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  listItemContent: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  listItemSubtitle: {
    fontSize: 14,
    color: '#F2E8DC',
    opacity: 0.8,
  },
});

export default FavoriteScreen;
