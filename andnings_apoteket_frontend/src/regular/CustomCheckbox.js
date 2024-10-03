import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import EnhancedText from "./EnhancedText";

const CustomCheckbox = ({ isChecked, onChange }) => {
    return (
      <TouchableOpacity onPress={onChange} style={styles.checkboxContainer}>
        <View style={[styles.checkbox, isChecked && styles.checkedCheckbox]} />
        <EnhancedText style={styles.label}>
          I agree to the Terms & Privacy
        </EnhancedText>
      </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    checkbox: {
      marginRight: 8,
    },
    checkboxLabel: {
      color: "#fff",
    },
  });
export default CustomCheckbox;