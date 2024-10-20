import React from "react";
import { View, StyleSheet } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import EnhancedText from "../regular/EnhancedText";
import { LinearGradient } from 'expo-linear-gradient';

const CustomBaseToast = ({ text1, text2, type }) => {
  const isSuccess = type === "success";

  return (
    <LinearGradient
      colors={isSuccess ? ['#1E3A5F', '#091D34'] : ['#8B0000', '#4B0000']}
      style={styles.toastContainer}
    >
      <View style={styles.iconContainer}>
        <FontAwesomeIcon
          icon={isSuccess ? faCheckCircle : faExclamationCircle}
          size={24}
          color="#F2E8DC"
        />
      </View>
      <View style={styles.toastTextContainer}>
        <EnhancedText style={styles.toastText1}>{text1}</EnhancedText>
        {text2 && <EnhancedText style={styles.toastText2}>{text2}</EnhancedText>}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    marginRight: 12,
  },
  toastTextContainer: {
    flex: 1,
  },
  toastText1: {
    color: '#F2E8DC',
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 2,
  },
  toastText2: {
    color: '#F2E8DC',
    fontSize: 14,
    opacity: 0.8,
  },
});

export default CustomBaseToast;
