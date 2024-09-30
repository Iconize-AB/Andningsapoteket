import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import CategoryGrid from "./CategoryGrid";
import colors from "../common/colors/Colors";
import MostPlayedJourneys from "./MostPlayedJourneys";

const CategoryScreen = ({ navigation }) => {
  const { t } = useTranslation();

  const onPressCategory = (selectedCategory) => {
    navigation.navigate("SelectedCategory", { category: selectedCategory })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("recommended_sessions")}</Text>
      
      {/* Render the grid without horizontal scroll */}
      <CategoryGrid onPressCategory={onPressCategory} />
      <View>
        {/* Render the grid without horizontal scroll */}
      <MostPlayedJourneys />
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default CategoryScreen;
