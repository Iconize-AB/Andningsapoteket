import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import EnhancedText from "../regular/EnhancedText";
import colors from "../common/colors/Colors";

const EnhancedTextInput = ({
  value,
  onChangeText,
  placeholder,
  errorMessage = "",
  secureTextEntry = false,
  keyboardType = "default",
  customStyle = {},
  placeholderTextColor = "#A9A9A9",
}) => {
  // Handle input change, allowing only numbers if keyboardType is set to "numeric" or "number-pad"
  const handleChangeText = (text) => {
    if (keyboardType === "numeric" || keyboardType === "number-pad") {
      // Only allow numbers
      const numericText = text.replace(/[^0-9]/g, "");
      onChangeText(numericText);
    } else {
      onChangeText(text);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, customStyle]}
        value={value}
        onChangeText={handleChangeText} // Use the new handler
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
      {errorMessage !== "" && (
        <EnhancedText style={styles.errorText}>{errorMessage}</EnhancedText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 10, // Keeps space between inputs
  },
  input: {
    height: 50,
    width: "100%",
    color: "#fff",
    backgroundColor: "#000000",
    fontFamily: "BahnSchrift",
    borderColor: colors.border || "#fff",
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    padding: 10,
  },
  errorText: {
    alignSelf: "flex-start",
    marginTop: -10,
    color: "red",
  },
});

export default EnhancedTextInput;
