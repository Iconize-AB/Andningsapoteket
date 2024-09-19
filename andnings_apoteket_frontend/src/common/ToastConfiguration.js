import React from "react";
import { BaseToast } from "react-native-toast-message";
import CustomBaseToast from "./CustomBaseToast";

const toastConfiguration = {
  success: (props) => (
    <CustomBaseToast
      {...props}
      style={{
        borderLeftColor: "green",
        backgroundColor: "#466F78",
        borderColor: "green",
        zIndex: 1599,
        borderWidth: 2,
      }}
    />
  ),
  error: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "red",
        backgroundColor: "#333",
        borderColor: "red",
        zIndex: 1599,
        borderWidth: 2,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
        color: "#fff",
      }}
      text2Style={{
        fontSize: 15,
        fontWeight: "400",
        color: "#fff",
      }}
    />
  ),
};

export default toastConfiguration;
