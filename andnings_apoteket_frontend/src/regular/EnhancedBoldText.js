import React from "react";
import { Text, StyleSheet } from "react-native";

const EnhancedBoldText = ({ children, style, ...otherProps }) => (
  <Text style={[styles.defaultStyle, style]} {...otherProps}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  defaultStyle: {
    fontFamily: "bahnschrift",
    fontWeight: 700,
  },
});

export default EnhancedBoldText;
