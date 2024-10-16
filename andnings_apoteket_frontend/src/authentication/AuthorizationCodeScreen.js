import React, { useState } from "react";
import { View, StyleSheet, Pressable, SafeAreaView } from "react-native";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";
import Toast from "react-native-toast-message";
import EnhancedText from "../regular/EnhancedText";
import BackIcon from "../regular/BackIcon";
import colors from "../common/colors/Colors";
import { VerifyResetCode } from "./endpoints/AuthenticationEndpoints";
import { LinearGradient } from 'expo-linear-gradient';

const CELL_COUNT = 6;

const AuthorizationCodeScreen = ({ route, navigation }) => {
  const { email } = route.params;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleVerifyCode = async () => {
    try {
      const response = await VerifyResetCode(email, value);

      if (response.ok) {
        Toast.show({
          type: "success",
          text1: "You've been verified!",
          text2: "Let's now set your new password.",
          backgroundColor: "#000",
          text1Style: { color: "#466F78" },
          text2Style: { color: "#466F78" },
        });
        navigation.navigate("ResetPasswordScreen", { email });
      } else {
        Toast.show({
          type: "error",
          text1: "Sorry, friend.",
          text2: "The code you entered was not valid!",
          backgroundColor: "#000",
          text1Style: { color: "#466F78" },
          text2Style: { color: "#466F78" },
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Sorry, friend. The technology failed us.",
        text2: "Please try again  🙏",
        backgroundColor: "#000",
        text1Style: { color: "#466F78" },
        text2Style: { color: "#466F78" },
      });
    }
  };

  return (
    <LinearGradient colors={['#1E3A5F', '#091D34']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <BackIcon navigation={navigation} />
        <View style={styles.content}>
          <EnhancedText style={styles.title}>Verify Code</EnhancedText>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <View
                key={index}
                style={[styles.cellRoot, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                <EnhancedText style={styles.cellText}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </EnhancedText>
              </View>
            )}
          />
          <Pressable 
            style={[styles.button, value.length === CELL_COUNT && styles.buttonActive]} 
            onPress={handleVerifyCode}
            disabled={value.length !== CELL_COUNT}
          >
            <EnhancedText style={styles.buttonText}>Verify Code</EnhancedText>
          </Pressable>
          <EnhancedText style={styles.footerText}>
            We've sent a verification code to {email}.{'\n'}Please check your inbox and enter the code above.
          </EnhancedText>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
  },
  codeFieldRoot: {
    marginTop: 20,
    width: 280,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: 40,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#F2E8DC',
    borderBottomWidth: 1,
  },
  cellText: {
    color: '#F2E8DC',
    fontSize: 36,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 2,
  },
  button: {
    marginTop: 40,
    backgroundColor: '#D3D3D3',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: '#F2E8DC',
  },
  buttonText: {
    color: '#1E3A5F',
    fontSize: 18,
    fontWeight: '600',
  },
  footerText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 20,
    opacity: 0.8,
  },
});

export default AuthorizationCodeScreen;
