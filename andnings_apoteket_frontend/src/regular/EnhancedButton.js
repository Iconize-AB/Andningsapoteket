import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"; // Assuming you use FontAwesome
import EnhancedText from "./EnhancedText"; // Assuming you use EnhancedText component
import colors from "../common/colors/Colors"; // Assuming centralized color management

const EnhancedButton = ({
  onPress,
  title = "", // Can be an empty string if only using an icon
  icon = null, // New prop to accept an icon
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
    <TouchableOpacity
      onPress={onPress}
      style={buttonStyles}
      disabled={disabled}
      activeOpacity={0.8} // Adds opacity change on press
    >
      <View style={[styles.contentContainer, size === "small" && !title && styles.centerIconContainer]}>
        {/* Render Icon if passed */}
        {icon && (
          <FontAwesomeIcon icon={icon} size={20} color="#fff" />
        )}
        {/* Render Text if there's any */}
        {title ? <EnhancedText style={textStyles}>{title}</EnhancedText> : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 120, // Full rounded corners
    marginTop: 12,
    paddingVertical: 10, // Padding inside the button
    paddingHorizontal: 16,
    shadowColor: "#000", // Shadow color for all buttons
    shadowOffset: { width: 0, height: 4 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 5, // Shadow blur
    elevation: 4, // Elevation for Android
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
    width: 40, // Set the width to 40px for small size
    height: 40, // Set the height to 40px for small size
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
    color: "#fff", // Default text color
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
    backgroundColor: "#d3d3d3", // Disabled background
    shadowOpacity: 0, // Remove shadow when disabled
  },
  contentContainer: {
    flexDirection: "row", // To align icon and text in a row
    display: "flex",
    gap: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  centerIconContainer: {
    flexDirection: "column", // Change to column for centering the icon
    justifyContent: "center", // Center icon vertically and horizontally
  },
});

export default EnhancedButton;
