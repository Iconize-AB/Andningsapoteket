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
  customStyle = {},
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry); // Toggle for showing/hiding password
  
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
      <EnhancedText style={styles.label}>
        {placeholder}
      </EnhancedText>
      <TextInput
        style={[styles.input, customStyle]}
        value={value}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry && isPasswordVisible}
        keyboardType={keyboardType}
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
    marginVertical: 10,
    position: "relative",
  },
  input: {
    height: 45,
    width: "100%",
    color: "#000",
    backgroundColor: "#fff",
    opacity: 0.2,
    fontFamily: "BahnSchrift",
    borderColor: colors.border || "#fff",
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 40,
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
    color: "#fff"
  },
  icon: {
    position: "absolute",
    right: 10,
    top: 32,
    zIndex: 1,
  },
  errorText: {
    alignSelf: "flex-start",
    marginTop: -10,
    color: "red",
  },
});

export default EnhancedTextInput;
