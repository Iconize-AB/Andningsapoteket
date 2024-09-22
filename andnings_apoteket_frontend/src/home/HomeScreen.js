import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import EnhancedText from "../regular/EnhancedText";
import colors from "../common/colors/Colors";

const HomeScreen = ({ navigation }) => {
  const navigateToOption = (option) => {
    navigation?.navigate(option);
  };

  const imageSources = {
    WorkOut: {
      url: "https://images.pexels.com/photos/6512478/pexels-photo-6512478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Work Out",
    },
    WorkIn: {
      url: "https://images.pexels.com/photos/6512478/pexels-photo-6512478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Work In",
    },
    Recovery: {
      url: "https://images.pexels.com/photos/6512478/pexels-photo-6512478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Recovery",
    },
    Nutrition: {
      url: "https://images.pexels.com/photos/6512478/pexels-photo-6512478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Nutrition",
    },
  };

  const exploreMoreCategories = {
    Wind: {
      url: "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Wind",
    },
    Water: {
      url: "https://images.pexels.com/photos/624015/pexels-photo-624015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Water",
    },
    Fire: {
      url: "https://images.pexels.com/photos/266867/pexels-photo-266867.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Fire",
    },
  };

  const overlayColors = {
    WorkOut: "rgba(245, 94, 9, 0.6)",
    WorkIn: "rgba(108, 174, 188, 0.6)",
    Recovery: "rgba(17, 85, 134, 0.6)",
    Nutrition: "rgba(70, 120, 93, 0.6)",
    Wind: "rgba(173, 216, 230, 0.6)", // Light blue for Wind
    Water: "rgba(0, 105, 148, 0.6)", // Deep blue for Water
    Fire: "rgba(255, 69, 0, 0.6)", // Orange-red for Fire
  };

  const renderBoxes = (categories) => {
    return Object.entries(categories).map(([key, { title, url }]) => (
      <TouchableOpacity
        key={key}
        style={styles.optionBox}
        onPress={() => navigateToOption(key)}
      >
        <ImageBackground source={{ uri: url }} style={styles.image}>
          <View
            style={[
              styles.overlay,
              { backgroundColor: overlayColors[key] },
            ]}
          />
          <View style={styles.details}>
            <EnhancedText style={styles.optionText}>{title}</EnhancedText>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
      <View style={styles.wrapper}>
        <View style={styles.categoryContainer}>
          <EnhancedText style={styles.categoryTitle}>Top Picks for You</EnhancedText>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"  /* Ensures smooth scrolling */
            style={styles.scrollContainer}
          >
            {renderBoxes(imageSources)}
          </ScrollView>
        </View>

        {/* Recently Viewed */}
        <View style={styles.categoryContainer}>
          <EnhancedText style={styles.categoryTitle}>Recently Viewed</EnhancedText>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"  /* Ensures smooth scrolling */
            style={styles.scrollContainer}
          >
            {renderBoxes(imageSources)}
          </ScrollView>
        </View>

        {/* Explore More */}
        <View style={styles.categoryContainer}>
          <EnhancedText style={styles.categoryTitle}>Explore More</EnhancedText>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"  /* Ensures smooth scrolling */
            style={styles.scrollContainer}
          >
            {renderBoxes(exploreMoreCategories)}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingBottom: 220, // Add extra space at the bottom for the floating menu
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingVertical: 20,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  wrapper: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10,
    marginLeft: 20,
  },
  scrollContainer: {
    paddingLeft: 20,
  },
  optionBox: {
    backgroundColor: "#1E90FF",
    width: 200,
    height: 150,
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 15,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.6,
  },
  details: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  optionText: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HomeScreen;
