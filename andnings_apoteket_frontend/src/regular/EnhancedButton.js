import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import colors from "../common/colors/Colors"; // Assuming centralized color management
import EnhancedText from "./EnhancedText"; // Assuming you use EnhancedText component

const EnhancedButton = ({
  onPress,
  title,
  type = "solid", // Can be 'solid', 'outline', 'primary', 'secondary'
  size = "medium", // Can be 'small', 'medium', or 'large'
  customStyle = {}, // Custom style prop to override default styles
  textStyle = {}, // Custom text style if needed
  disabled = false, // Add disabled state
}) => {
  const buttonStyles = [
    styles.button,
    type === "outline" ? styles.buttonOutline : styles.buttonSolid, // Conditional style based on solid/outline
    type === "primary" && styles.primaryButton, // Style for primary button
    type === "secondary" && styles.secondaryButton, // Style for secondary button
    size === "small" && styles.smallButton, // Style for small size
    size === "large" && styles.largeButton, // Style for large size
    customStyle, // Custom style from props
    disabled && styles.disabled, // Disabled state styles
  ];

  const textStyles = [
    styles.buttonText,
    size === "small" && styles.smallText, // Smaller text for small size
    size === "large" && styles.largeText, // Larger text for large size
    type === "outline" ? styles.outlineText : styles.solidText, // Conditional text color based on button type
    textStyle, // Custom text styles
  ];

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles} disabled={disabled}>
      <EnhancedText style={textStyles}>{title}</EnhancedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 120, // Full rounded corners
    marginTop: 12,
    width: "100%", // Button takes full width
    paddingVertical: 10, // Padding inside the button
    paddingHorizontal: 16,
  },
  buttonSolid: {
    backgroundColor: colors.primary, // Default solid background color (primary style)
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: colors.primary, // Outline border color for outline buttons
  },
  primaryButton: {
    backgroundColor: colors.primary, // Primary button background color
  },
  secondaryButton: {
    backgroundColor: colors.secondary, // Secondary button background color
  },
  smallButton: {
    paddingVertical: 6, // Less padding vertically
    paddingHorizontal: 10, // Smaller padding for small button
    borderRadius: 50, // Smaller border radius for small button
  },
  mediumButton: {
    // Default medium size (inherits from `button`)
  },
  largeButton: {
    paddingVertical: 14, // Larger padding vertically
    paddingHorizontal: 20, // More padding for large button
    borderRadius: 140, // Larger border radius for large button
  },
  buttonText: {
    textTransform: "uppercase", // Text is transformed to uppercase
    fontSize: 18, // Default font size
  },
  smallText: {
    fontSize: 14, // Smaller font size for small buttons
  },
  largeText: {
    fontSize: 22, // Larger font size for large buttons
  },
  solidText: {
    color: "#fff", // Text color for solid buttons (white)
  },
  outlineText: {
    color: colors.primary, // Text color for outline buttons
  },
  disabled: {
    backgroundColor: "#d3d3d3",
  },
});

export default EnhancedButton;
