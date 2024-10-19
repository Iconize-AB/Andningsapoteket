import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useTranslation } from "react-i18next";
import EnhancedText from "../regular/EnhancedText";
import Article from "./Article";
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch, faChevronRight } from "@fortawesome/free-solid-svg-icons";

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

  const renderHeader = () => (
    <>
      <View style={styles.header}>
        <EnhancedText style={styles.title}>{t("Library")}</EnhancedText>
      </View>

      <View style={styles.searchBarContainer}>
        <FontAwesomeIcon icon={faSearch} size={20} color="#A0C8F9" />
        <TextInput
          style={styles.searchBar}
          placeholder={t("Search articles")}
          placeholderTextColor="#A0C8F9"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        data={categories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilter === item && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedFilter(item)}
          >
            <EnhancedText style={[
              styles.filterButtonText,
              selectedFilter === item && styles.filterButtonTextActive,
            ]}>
              {t(item)}
            </EnhancedText>
          </TouchableOpacity>
        )}
      />
    </>
  );

  const renderArticleItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => openArticle(item)}
      style={styles.articleContainer}
    >
      <View style={styles.articleContent}>
        <EnhancedText style={styles.articleTitle}>
          {item.title}
        </EnhancedText>
        <EnhancedText style={styles.articleCategory}>
          {item.category}
        </EnhancedText>
      </View>
      <FontAwesomeIcon icon={faChevronRight} color="#A0C8F9" size={16} />
    </TouchableOpacity>
  );

  return (
    <View colors={['#1E3A5F', '#091D34']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <FlatList
          data={filteredArticles}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderArticleItem}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={
            <EnhancedText style={styles.noArticlesText}>
              {t("No articles found")}
            </EnhancedText>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
        />
      </SafeAreaView>
      
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
    backgroundColor: '#1E3A5F',
  },
  safeArea: {
    flex: 1,
  },
  flatListContent: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    color: '#FFFFFF',
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  filterButtonActive: {
    backgroundColor: '#A0C8F9',
  },
  filterButtonText: {
    color: '#A0C8F9',
    fontSize: 14,
  },
  filterButtonTextActive: {
    color: '#1E3A5F',
  },
  articleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  articleContent: {
    flex: 1,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F2E8DC',
    marginBottom: 5,
  },
  articleCategory: {
    fontSize: 14,
    color: '#A0C8F9',
  },
  noArticlesText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#A0C8F9',
  },
});

export default LibraryScreen;
