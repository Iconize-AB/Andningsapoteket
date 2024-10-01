import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import CategoryGrid from "./CategoryGrid";
import colors from "../common/colors/Colors";

const CategoryScreen = ({ navigation }) => {
  const { t } = useTranslation();

  const onPressCategory = (selectedCategory) => {
    navigation.navigate("SelectedCategory", { category: selectedCategory });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CategoryGrid onPressCategory={onPressCategory} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.background,
    justifyContent: "center",
    height: "100%"
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default CategoryScreen;