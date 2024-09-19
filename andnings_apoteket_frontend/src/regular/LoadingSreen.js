import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export const LoadingScreen = () => {
  return (
    <View
      style={{
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000000",
      }}
    >
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
};
