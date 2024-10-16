import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import EnhancedText from "../regular/EnhancedText";
import colors from "../common/colors/Colors";

const EnhancedTextInput = ({
  value,
  onChangeText,
  placeholder,
  errorMessage = "",
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
  customStyle = {},
  customLabelStyle = {},
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);

  const handleChangeText = (text) => {
    if (keyboardType === "numeric" || keyboardType === "number-pad") {
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
        onChangeText={handleChangeText}
        placeholder={placeholder}
        placeholderTextColor="#8E8E8E"
        secureTextEntry={secureTextEntry && isPasswordVisible}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
      {secureTextEntry && (
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <FontAwesome5
            name={isPasswordVisible ? "eye-slash" : "eye"}
            size={20}
            color="#A9A9A9"
          />
        </TouchableOpacity>
      )}
      {errorMessage !== "" && (
        <EnhancedText style={styles.errorText}>{errorMessage}</EnhancedText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 15,
    position: "relative",
  },
  input: {
    backgroundColor: '#F2E8DC',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#1E3A5F',
  },
  icon: {
    position: "absolute",
    right: 10,
    top: 15,
    zIndex: 1,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
});

export default EnhancedTextInput;
