import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../common/colors/Colors";

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
          style={styles.categoryBox}
          onPress={() => onPressCategory(category.name)}
        >
          <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  categoryBox: {
    width: "40%", // Slightly smaller width to keep spacing even
    aspectRatio: 1, // Keep the boxes square
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20, // Space between rows
    marginHorizontal: 10, // Space between items
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default CategoryGrid;
