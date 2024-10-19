import React from "react";
import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { useTranslation } from "react-i18next";
import CategoryGrid from "./CategoryGrid";
import EnhancedText from "../regular/EnhancedText";

const CategoryScreen = ({ navigation }) => {
  const { t } = useTranslation();

  const onPressCategory = (selectedCategory) => {
    navigation.navigate("SelectedCategory", { category: selectedCategory });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <EnhancedText style={styles.title}>{t("Choose a Category")}</EnhancedText>
          <CategoryGrid onPressCategory={onPressCategory} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2E8DC', // Beige background
  },
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F2E8DC', // Beige background
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: '#1E3A5F',
    marginBottom: 30,
    textAlign: "center",
  },
});

export default CategoryScreen;
