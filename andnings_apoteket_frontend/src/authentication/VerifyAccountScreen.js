import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { CodeField, Cursor } from "react-native-confirmation-code-field";
import Toast from "react-native-toast-message";
import EnhancedText from "../regular/EnhancedText";
import BackIcon from "../regular/BackIcon";

const VerifyAccountScreen = ({ route, navigation }) => {
  const { email } = route.params;
  const [code, setCode] = useState("");

  const handleVerifyCode = async () => {
    try {
      let response;

      if (response.ok) {
        Toast.show({
          type: "success",
          text1: "You're all set. Welcome!",
          backgroundColor: "#000",
          text1Style: {
            color: "#466F78",
          },
          text2Style: { color: "#466F78" },
        });
        navigation?.navigate("CategorySelection", { email });
      } else {
        Toast.show({
          type: "error",
          text1: "Sorry, friend. That wasn't the right code.",
          text2: "Please try again 🙏 ",
          backgroundColor: "#000",
          text1Style: {
            color: "#466F78",
          },
          text2Style: { color: "#466F78" },
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Sorry, friend. The technology failed us.",
        text2: "Please try again 🙏",
        backgroundColor: "#000",
        text1Style: {
          color: "#466F78",
        },
        text2Style: { color: "#466F78" },
      });
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://images.squarespace-cdn.com/content/v1/60191f970b559218574dd995/e61a9073-054f-46ac-9847-12fda6e9cd79/PHOTO-2022-10-21-17-02-32.jpg?format=2500w",
        }}
        style={styles.image}
      >
        <BackIcon navigation={navigation} />
        <View style={styles.wrapper}>
          <View style={[styles.overlay, { backgroundColor: "#466F78" }]} />
          <EnhancedText style={styles.title}>VERIFY YOUR EMAIL ADDRESS</EnhancedText>
          <CodeField
            value={code}
            onChangeText={setCode}
            cellCount={6}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <EnhancedText
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={isFocused ? () => {} : undefined}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </EnhancedText>
            )}
          />
          <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
            <EnhancedText style={styles.buttonText}>Verify Code</EnhancedText>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.8,
  },
  wrapper: {
    padding: 60,
    paddingTop: 10,
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginBottom: 20,
    fontSize: 20,
    color: "#fff",
  },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: "#fff",
    color: "#fff",
    textAlign: "center",
    marginRight: 8,
  },
  focusCell: {
    borderColor: "#F55E09",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#F55E09",
    padding: 10,
    alignItems: "center",
    width: "100%",
    alignItems: "center",
    marginTop: 40,
    borderRadius: 120,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textTransform: "uppercase",
  },
});

export default VerifyAccountScreen;