import { Modal, StyleSheet, View } from "react-native";
import EnhancedText from "../regular/EnhancedText";
import { TouchableOpacity } from "react-native";

const SubscriptionModal = ({isModalVisible, setModalVisible}) => {
    return (
        <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <EnhancedText style={styles.modalTitle}>
              Member Plus
            </EnhancedText>
            <EnhancedText style={styles.modalSubtitle}>
              Become a member to unlock thousands of courses and features
            </EnhancedText>
            {/* Features */}
            <View style={styles.featureContainer}>
              <View style={styles.featureBox}>
                <EnhancedText style={styles.featureTitle}>Unlimited Courses</EnhancedText>
                <EnhancedText style={styles.featureText}>
                  Unlock thousands of courses from the world's best teachers
                </EnhancedText>
              </View>
              <View style={styles.featureBox}>
                <EnhancedText style={styles.featureTitle}>Advanced Audio</EnhancedText>
                <EnhancedText style={styles.featureText}>
                  Unlock offline listening and add background music to meditations
                </EnhancedText>
              </View>
              {/* Add more feature boxes here... */}
            </View>
            {/* Button */}
            <TouchableOpacity
              style={styles.tryButton}
              onPress={() => {
                setModalVisible(false);
                // Handle subscription logic here...
              }}
            >
              <EnhancedText style={styles.buttonText}>Try for $0.00</EnhancedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
}

const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: "#fff",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      alignItems: "center",
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
    },
    modalSubtitle: {
      fontSize: 16,
      color: "#666",
      marginBottom: 20,
      textAlign: "center",
    },
    featureContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    featureBox: {
      width: "48%",
      backgroundColor: "#f9f9f9",
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
    },
    featureTitle: {
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: 5,
    },
    featureText: {
      fontSize: 12,
      color: "#666",
    },
    tryButton: {
      backgroundColor: "#fdd835",
      borderRadius: 8,
      paddingVertical: 15,
      paddingHorizontal: 50,
      alignItems: "center",
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#000",
    },
  });
  
  export default SubscriptionModal;