import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import EnhancedText from './EnhancedText';
import NoResultIllustration from '../resources/noresult.png'; // Make sure the path is correct

const NoResult = ({ message }) => {
  return (
    <View style={styles.favorites}>
      <Image
        source={NoResultIllustration}
        style={styles.thumbnail}
      />
      <EnhancedText style={styles.noDataText}>
        {message || 'No results found.'}
      </EnhancedText>
    </View>
  );
};

export default NoResult;

const styles = StyleSheet.create({
  favorites: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  thumbnail: {
    width: 200,
    height: 200,
    resizeMode: 'contain', // Ensure image is scaled correctly
  },
  noDataText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
  },
});
