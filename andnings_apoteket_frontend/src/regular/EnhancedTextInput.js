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
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, customStyle]}
        value={value}
        onChangeText={onChangeText}
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
    marginVertical: 10,
  },
  input: {
    height: 50,
    width: "100%",
    color: "#fff",
    fontSize: 16,
    backgroundColor: colors.secondary,
    fontFamily: "bahnschrift",
    borderRadius: 10,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: colors.border || "#fff",
  },
  errorText: {
    alignSelf: "flex-start",
    marginRight: 12,
    marginTop: -10,
    color: "red",
  },
});

export default EnhancedTextInput;
