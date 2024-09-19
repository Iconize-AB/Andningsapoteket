import { Linking } from "react-native";
import Toast from "react-native-toast-message";

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function isValidEmail(email) {
  return emailRegex.test(email);
}

export const contactUsEmail = async () => {
  const email = "example@example.com";
  const subject = encodeURIComponent("Subject Text");
  const body = encodeURIComponent("Body text here...");
  const url = `mailto:${email}?subject=${subject}&body=${body}`;
  const canOpen = await Linking.canOpenURL(url);
  if (canOpen) {
    await Linking.openURL(url);
  } else {
    Toast.show({
      type: "error",
      text1: "Sorry, friend. We failed to open your email.",
      text2: "Please try again 🙏",
    });
  }
};

export const formatDate = (date) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};
