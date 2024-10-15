import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../common/colors/Colors";
import EnhancedText from "../regular/EnhancedText";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlay, faRandom, faEllipsisVertical, faDownload, faShare } from '@fortawesome/free-solid-svg-icons';
import SessionItem from "../regular/VideoItem";

const dummyThumbnail = require('../resources/test.png'); // Ensure you have a dummy image in your assets

const BreathworkPlaylistDetails = ({ route, navigation }) => {
  const { playlist } = route.params;

  console.log('playlist', playlist?.sessions);

  const renderVideoItem = ({ item }) => {
    const session = item?.session;
    return (
        <SessionItem session={session} handlePlayNow={() => navigation.navigate("IndividualBreathworkSession", { session: item })}  />
    )
  };

  return (
    <View style={styles.container}>
      <Image source={dummyThumbnail} style={styles.headerImage} />
      <View style={styles.content}>
        <Text style={styles.title}>{playlist.name}</Text>
        <Text style={styles.creator}>{playlist.creator}</Text>
        <Text style={styles.stats}>
          {playlist.videoCount} videos • {playlist.viewCount} views • 
          Last updated on {playlist.lastUpdated}
        </Text>
        <Text style={styles.description}>{playlist.description}</Text>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.playButton}>
            <FontAwesomeIcon icon={faPlay} color="black" size={16} />
            <Text style={styles.playButtonText}>Play all</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shuffleButton}>
            <FontAwesomeIcon icon={faRandom} color="white" size={16} />
            <Text style={styles.shuffleButtonText}>Shuffle</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesomeIcon icon={faDownload} color="white" size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesomeIcon icon={faShare} color="white" size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesomeIcon icon={faEllipsisVertical} color="white" size={20} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={playlist.sessions}
          renderItem={renderVideoItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.videoList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  headerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  creator: {
    fontSize: 16,
    color: '#CCCCCC',
    marginBottom: 4,
  },
  stats: {
    fontSize: 14,
    color: '#999999',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#CCCCCC',
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  playButtonText: {
    color: 'black',
    marginLeft: 4,
    fontWeight: 'bold',
  },
  shuffleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3A3A3A',
    padding: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  shuffleButtonText: {
    color: 'white',
    marginLeft: 4,
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 8,
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
