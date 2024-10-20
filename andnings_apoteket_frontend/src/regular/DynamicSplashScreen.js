import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

const DynamicSplashScreen = () => {
  return (
    <LinearGradient colors={['#1E3A5F', '#091D34']} style={styles.container}>
      <TouchableOpacity
        style={styles.companyInfo}
        onPress={() =>
          Linking.openURL(
            "https:/iconize-earth.com"
          )
        }
      >
        <View>
          <Image
            source={require("../resources/developedby.png")}
            style={styles.image}
          />
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  logo: {
    width: 140,
    height: 60,
  },
  image: {
    width: 250,
    height: 50,
  },
  companyInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    bottom: 60,
  },
  developedBy: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  companyText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default DynamicSplashScreen;
