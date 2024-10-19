import React from "react";
import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { useTranslation } from "react-i18next";
import CategoryGrid from "./CategoryGrid";
import EnhancedText from "../regular/EnhancedText";
import { LinearGradient } from 'expo-linear-gradient';

const CategoryScreen = ({ navigation }) => {
  const { t } = useTranslation();

  const onPressCategory = (selectedCategory) => {
    navigation.navigate("SelectedCategory", { category: selectedCategory });
  };

  return (
    <LinearGradient colors={['#1E3A5F', '#091D34']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.content}>
            <EnhancedText style={styles.title}>{t("Choose a Category")}</EnhancedText>
            <CategoryGrid onPressCategory={onPressCategory} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: '#FFFFFF',
    marginBottom: 30,
    textAlign: "center",
  },
});

export default CategoryScreen;
