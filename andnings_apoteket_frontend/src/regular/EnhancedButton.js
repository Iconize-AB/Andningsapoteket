import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import colors from "../common/colors/Colors"; // Assuming centralized color management
import EnhancedText from "./EnhancedText"; // Assuming you use EnhancedText component

const EnhancedButton = ({
  onPress,
  title,
  type = "solid", // Can be 'solid', 'outline', 'primary', 'secondary'
  customStyle = {}, // Custom style prop to override default styles
  textStyle = {}, // Custom text style if needed
  disabled = false, // Add disabled state
}) => {
  const buttonStyles = [
    styles.button,
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
    padding: 10, // Padding inside the button
  },
  buttonSolid: {
    backgroundColor: "#F55E09", // Default solid background color (primary style)
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#F55E09", // Outline border color for outline buttons
  },
  primaryButton: {
    backgroundColor: colors.primary, // Primary button background color
  },
  secondaryButton: {
    backgroundColor: colors.secondary, // Secondary button background color
  },
  buttonText: {
    textTransform: "uppercase", // Text is transformed to uppercase
    fontSize: 18, // Font size for the button text
  },
  solidText: {
    color: "#fff", // Text color for solid buttons (white)
  },
  outlineText: {
    color: "#F55E09", // Text color for outline buttons
  },
  disabled: {
    backgroundColor: "#d3d3d3", // Disabled button background color
  },
});

export default EnhancedButton;
