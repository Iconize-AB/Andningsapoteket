import React from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import EnhancedText from "../regular/EnhancedText";

const { width } = Dimensions.get('window');
const itemWidth = (width - 60) / 2; // 60 = 20 (left padding) + 20 (right padding) + 20 (space between items)

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
          <View style={styles.categoryBox}>
            <EnhancedText style={styles.categoryText}>{category.name}</EnhancedText>
          </View>
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
  },
  categoryBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  categoryText: {
    fontSize: 18,
    fontWeight: "bold",
    color: '#FFFFFF',
  },
});

export default CategoryGrid;
