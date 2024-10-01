// BottomSlider.js
import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import EnhancedText from "../regular/EnhancedText";

const BottomSlider = ({ isVisible, onClose, handleSaveSession }) => {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Animated.View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <EnhancedText style={styles.modalTitle}>More Options</EnhancedText>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <EnhancedText style={styles.closeButtonText}>X</EnhancedText>
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalOption}>
              <EnhancedText>Share Video</EnhancedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption}>
              <EnhancedText>Report Issue</EnhancedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={handleSaveSession}>
              <EnhancedText>Add to playlist</EnhancedText>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "transparant",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between", // Space between title and button
    alignItems: "center", // Align items in the center vertically
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1, // This allows the title to take as much space as possible
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
  modalContent: {
    marginTop: 20,
  },
  modalOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});

export default BottomSlider;
