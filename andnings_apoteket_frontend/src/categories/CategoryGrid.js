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
    justifyContent: "space-between", // Evenly distribute the boxes
    paddingHorizontal: 10, // Smaller horizontal padding
  },
  categoryBox: {
    width: "45%", // Two boxes per row
    aspectRatio: 1, // Make the boxes square
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20, // Space between rows
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
