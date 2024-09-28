import React from "react";
import { View, StyleSheet, TouchableOpacity, Modal, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import EnhancedText from "../regular/EnhancedText";

const Article = ({ modalVisible, setModalVisible, selectedArticle }) => {
  const { t } = useTranslation(); 
  return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <ScrollView>
              <EnhancedText style={styles.modalTitle}>{selectedArticle?.title}</EnhancedText>
              <EnhancedText style={styles.modalContent}>{selectedArticle?.content}</EnhancedText>
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <EnhancedText style={styles.closeButtonText}>{t("Close")}</EnhancedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalContent: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Article;
