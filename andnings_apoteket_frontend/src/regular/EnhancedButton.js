import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import colors from "../common/colors/Colors"; // Centralized colors

const EnhancedButton = ({
  onPress,
  title,
  size = "medium", // Default size is medium
  type = "solid", // Can be 'solid', 'outline', 'primary', or 'secondary'
  customStyle = {}, // Custom style prop to override default styles
  textStyle = {}, // Custom text style if needed
  disabled = false, // Add disabled state
}) => {
  const buttonStyles = [
    styles.button,
    styles[size], // Size-based style
    type === "outline" ? styles.buttonOutline : styles.buttonSolid, // Conditional style based on solid/outline
    type === "primary" && styles.primaryButton, // Style for primary button
    type === "secondary" && styles.secondaryButton, // Style for secondary button
    customStyle, // Custom style from props
    disabled && styles.disabled, // Disabled state styles
  ];

  const textStyles = [
    styles.buttonText,
    type === "outline" ? styles.outlineText : styles.solidText, // Conditional text color based on button type
    textStyle, // Custom text styles
  ];

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles} disabled={disabled}>
      <EnhancedButton style={textStyles}>{title}</EnhancedButton>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonSolid: {
    backgroundColor: colors.primary, // Default primary solid background
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: colors.primary, // Outline border color
  },
  primaryButton: {
    backgroundColor: colors.primary, // Use primary color for the primary button
  },
  secondaryButton: {
    backgroundColor: colors.secondary, // Use secondary color for the secondary button
  },
  buttonText: {
    textTransform: "uppercase",
    fontSize: 18,
  },
  solidText: {
    color: colors.textPrimary, // Text color for solid buttons
  },
  outlineText: {
    color: colors.primary, // Text color for outline buttons
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: "100%",
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: "80%",
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: "60%",
  },
  disabled: {
    backgroundColor: colors.disabledBackground, // Disabled state background
    borderColor: colors.disabledBorder,
  },
});

export default EnhancedButton;
