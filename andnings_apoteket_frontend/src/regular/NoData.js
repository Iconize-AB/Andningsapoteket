import { StyleSheet, View } from "react-native";
import EnhancedText from "./EnhancedText";

const NoData = ({ message, onPress }) => {
  return (
    <View style={styles.favorites}>
      <EnhancedText style={styles.noDataText}>{message}</EnhancedText>
    </View>
  );
};

export default NoData;

const styles = StyleSheet.create({
  favorites: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  noDataText: {
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
  },
});
