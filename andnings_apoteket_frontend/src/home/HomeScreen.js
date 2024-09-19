import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import AppText from "./AppText";
import {
  faPaw,
  faWind,
  faDrumstickBite,
  faPersonRays,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import EnhancedText from "../regular/EnhancedText";

const HomeScreen = ({ navigation, route }) => {
  const navigateToOption = (option) => {
    navigation?.navigate(option);
  };

  const imageSources = {
    WorkOut: {
      url: "https://images.pexels.com/photos/6512478/pexels-photo-6512478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Test",
    },
    WorkIn: {
      url: "https://images.pexels.com/photos/6512478/pexels-photo-6512478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Test",
    },
    Recovery: {
      url: "https://images.pexels.com/photos/6512478/pexels-photo-6512478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Test",
    },
    Nutrition: {
      url: "https://images.pexels.com/photos/6512478/pexels-photo-6512478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Test",
    },
  };

  const overlayColors = {
    WorkOut: "rgba(245, 94, 9, 0.6)",
    WorkIn: "rgba(108, 174, 188, 0.6)",
    Recovery: "rgba(17, 85, 134, 0.6)",
    Nutrition: "rgba(70, 120, 93, 0.6)",
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.row}>
          {Object.entries(imageSources).map(([key, { title, url }]) => (
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
                  {/* <FontAwesomeIcon
                    icon={icons[key]}
                    size={35}
                    color="#fff"
                    style={styles.iconStyle}
                  /> */}
                </View>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#000",
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
    display: "flex",
    flexDirection: "column",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  iconStyle: {
    marginTop: 10,
  },
  row: {
    justifyContent: "space-around",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    width: "100%",
  },
  optionBox: {
    backgroundColor: "#1E90FF",
    padding: 0,
    width: "45%",
    height: 150,
    borderRadius: 10,
    overflow: "hidden",
  },
  optionText: {
    fontSize: 24,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    display: "flex",
    gap: 10,
  },
});

export default HomeScreen;
