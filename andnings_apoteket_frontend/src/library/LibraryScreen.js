import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import colors from "../common/colors/Colors";
import { useTranslation } from "react-i18next";
import EnhancedText from "../regular/EnhancedText";
import Article from "./Article";

const LibraryScreen = () => {
  const { t } = useTranslation();

  // Dummy articles data
  const articles = [
    {
      id: 1,
      title: "Introduction to Breathwork",
      content: "This is the content of the Introduction to Breathwork article.",
      category: "Beginner",
    },
    {
      id: 2,
      title: "Advanced Breathwork Techniques",
      content:
        "This is the content of the Advanced Breathwork Techniques article.",
      category: "Advanced",
    },
    {
      id: 3,
      title: "Breathwork for Anxiety",
      content: "This is the content of the Breathwork for Anxiety article.",
      category: "Mental Health",
    },
    {
      id: 4,
      title: "Daily Breathwork Routine",
      content: "This is the content of the Daily Breathwork Routine article.",
      category: "Routine",
    },
    {
      id: 5,
      title: "Breathwork for Athletes",
      content: "This is the content of the Breathwork for Athletes article.",
      category: "Fitness",
    },
    {
      id: 6,
      title: "Breathwork for Athletes",
      content: "This is the content of the Breathwork for Athletes article.",
      category: "Fitness",
    },
    {
      id: 7,
      title: "Breathwork for Athletes",
      content: "This is the content of the Breathwork for Athletes article.",
      category: "General",
    },
    {
      id: 8,
      title: "Breathwork for Athletes",
      content: "This is the content of the Breathwork for Athletes article.",
      category: "Worldwide",
    },
    {
      id: 9,
      title: "Breathwork for Athletes",
      content: "This is the content of the Breathwork for Athletes article.",
      category: "Industry",
    },
    {
      id: 10,
      title: "Breathwork for Athletes",
      content: "This is the content of the Breathwork for Athletes article.",
      category: "Science",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState(null); // To store the selected article for the modal
  const [modalVisible, setModalVisible] = useState(false);
  const [expanded, setExpanded] = useState(false); // State to track if "Show More" is toggled

  // Extract unique categories from the articles array
  const categories = [
    "All",
    ...new Set(articles.map((article) => article.category)),
  ];

  // Filter and search logic
  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "All" || article.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  // Function to open the modal with the selected article
  const openArticle = (article) => {
    setSelectedArticle(article);
    setModalVisible(true);
  };

  // Function to toggle "Show More" and "Show Less"
  const handleToggleMore = () => {
    setExpanded(!expanded);
  };

  // Only show the first few categories unless "expanded" is true
  const categoriesToRender = expanded ? categories : categories.slice(0, 3);

  return (
    <View style={styles.container}>
      {/* Title */}
      <EnhancedText style={styles.title}>{t("Library")}</EnhancedText>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder={t("Search articles")}
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      {/* Filter Section */}
      <View style={styles.filterContainer}>
        {categoriesToRender.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.filterButton,
              selectedFilter === category && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedFilter(category)}
          >
            <EnhancedText style={styles.filterButtonText}>
              {t(category)}
            </EnhancedText>
          </TouchableOpacity>
        ))}

        {/* "Show More" or "Show Less" Button */}
        <TouchableOpacity style={styles.filterButton} onPress={handleToggleMore}>
          <EnhancedText style={styles.filterButtonText}>
            {expanded ? t("Show Less") : t("Show More")}
          </EnhancedText>
        </TouchableOpacity>
      </View>

      {/* Article List */}
      <FlatList
        data={filteredArticles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => openArticle(item)}
            style={styles.articleContainer}
          >
            <EnhancedText style={styles.articleTitle}>
              {item.title}
            </EnhancedText>
            <EnhancedText style={styles.articleCategory}>
              {item.category}
            </EnhancedText>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <EnhancedText style={styles.noArticlesText}>
            {t("No articles found")}
          </EnhancedText>
        }
        showsVerticalScrollIndicator={false} // Disable vertical scrollbar here
      />
      {/* Article Modal */}
      <Article
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedArticle={selectedArticle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 100,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  filterButton: {
    width: "23%",
    height: 40,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
  filterButtonActive: {
    backgroundColor: colors.secondary,
  },
  filterButtonText: {
    color: "#333",
    fontSize: 14,
    fontWeight: "bold",
  },
  articleContainer: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  articleCategory: {
    marginTop: 5,
    fontSize: 14,
    color: "#888",
  },
  noArticlesText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#999",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent black background
  },
  modalView: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalContent: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default LibraryScreen;
