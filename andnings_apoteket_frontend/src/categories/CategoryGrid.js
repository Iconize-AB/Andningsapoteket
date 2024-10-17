import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const itemWidth = (width - 120) / 2; // 60 = 20 (left padding) + 20 (right padding) + 20 (space between items)

const CategoryGrid = ({ onPressCategory }) => {
  const categories = [
    { id: 1, name: "Fire" },
    { id: 2, name: "Wind" },
    { id: 3, name: "Earth" },
    { id: 4, name: "Water" },
  ];

  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={styles.categoryBoxWrapper}
          onPress={() => onPressCategory(category.name)}
        >
          <LinearGradient
            colors={['#1E3A5F', '#091D34']}
            style={styles.categoryBox}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.categoryText}>{category.name}</Text>
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryBoxWrapper: {
    width: itemWidth,
    aspectRatio: 1,
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  categoryBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryText: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default CategoryGrid;
