import { Modal, StyleSheet, View } from "react-native";
import EnhancedText from "../regular/EnhancedText";
import { useTranslation } from "react-i18next";
import EnhancedTextInput from "../regular/EnhancedTextInput";
import EnhancedButton from "../regular/EnhancedButton";

const AddToPlaylistModel = ({
  setModalVisible,
  saveVideoToList,
  modalVisible,
  listName,
  setListName
}) => {
  const { t } = useTranslation();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalView}>
        <View style={styles.modalContent}>
          <EnhancedText style={styles.modalTitle}>
            {t("Create a New List")}
          </EnhancedText>
          <EnhancedTextInput
            placeholder="Enter List Name"
            value={listName}
            onChangeText={setListName}
          />
          <EnhancedButton
            title={t("Save")}
            onPress={saveVideoToList}
            size="medium"
          />
          <EnhancedButton
            title={t("Cancel")}
            onPress={() => setModalVisible(false)}
            size="medium"
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default AddToPlaylistModel;
