import React from "react";
import { Text, StyleSheet } from "react-native";

const EnhancedText = ({ children, style, weight, ...otherProps }) => {
  // Determine if the font should be bold based on the fontWeight style
  const isBold = weight === 'bold' || style?.fontStyle === 'italic';

  return (
    <Text
      style={[
        styles.defaultStyle,
        isBold ? styles.boldStyle : styles.regularStyle,
        style
      ]}
      {...otherProps}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
  },
  boldStyle: {
    fontFamily: "HelveticaNeueBold",
  },
  regularStyle: {
    fontFamily: "HelveticaNeue",
  },
});

export default EnhancedText;
