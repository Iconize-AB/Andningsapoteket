import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import CategoryGrid from "./CategoryGrid";
import colors from "../common/colors/Colors";

const CategoryScreen = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("recommended_sessions")}</Text>
      
      {/* Render the grid without horizontal scroll */}
      <CategoryGrid />
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