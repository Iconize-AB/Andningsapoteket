import { StyleSheet, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import EnhancedText from "./EnhancedText";

const ListItem = ({ item }) => {
  return (
    <View style={styles.listItem}>
      <View>
        <EnhancedText style={styles.text}>{item?.name}</EnhancedText>
      </View>
      <View style={styles.options}>
        <EnhancedText style={styles.text}>{item?.Sessions?.length}</EnhancedText>
        <FontAwesomeIcon icon={faCaretRight} size={20} color="#000" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    boxShadow: "rgba(37, 37, 37, 0.098) 0px 1px 4px",
    backgroundColor: "rgb(255, 255, 255)",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    borderColor: "#000",
  },
  options: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "50%",
    gap: 10,
  },
  text: {
    color: "#000",
    fontSize: 16,
  },
});

export default ListItem;
