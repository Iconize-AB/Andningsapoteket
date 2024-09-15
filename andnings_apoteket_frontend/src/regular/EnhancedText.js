import React from "react";
import { Text, StyleSheet } from "react-native";

const EnhancedText = ({ children, style, ...otherProps }) => (
  <Text style={[styles.defaultStyle, style]} {...otherProps}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  defaultStyle: {
    fontFamily: "BebasNeue-Regular",
  },
});

export default EnhancedText;
