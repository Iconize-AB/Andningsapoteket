import React from "react";
import { View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import EnhancedText from "../regular/EnhancedText";

const CustomBaseToast = ({ text1, text2, type }) => {
  return (
    <View style={styles.toastContainer}>
      <View style={styles.toastTextContainer}>
        <EnhancedText style={styles.toastText1}>
          {text1}
          {!text2 && (
            <FontAwesome
              name={type === "error" ? "pray" : "heart"}
              size={15}
              color={type === "error" ? "orange" : "red"}
              style={styles.iconSpacing}
            />
          )}
        </EnhancedText>
        <EnhancedText style={styles.toastText2}>
          {text2}
          {text2 && (
            <FontAwesome
              name={type === "error" ? "pray" : "heart"}
              size={15}
              color={type === "error" ? "orange" : "red"}
              style={styles.iconSpacing}
            />
          )}
        </EnhancedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#466F78",
    borderColor: "green",
    minWidth: 300,
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 8,
  },
  toastTextContainer: {
    marginLeft: 10,
  },
  toastText1: {
    color: "#fff",
    fontWeight: "bold",
    display: "flex",
  },
  toastText2: {
    color: "#fff",
    display: "flex",
  },
  iconSpacing: {
    marginLeft: 10,
  },
});

export default CustomBaseToast;
