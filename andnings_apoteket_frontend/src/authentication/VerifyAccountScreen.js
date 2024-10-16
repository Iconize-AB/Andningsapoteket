import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  TextInput,
} from "react-native";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";
import Toast from "react-native-toast-message";
import EnhancedText from "../regular/EnhancedText";
import BackIcon from "../regular/BackIcon";
import { VerifyAccount } from "./endpoints/AuthenticationEndpoints";
import colors from "../common/colors/Colors";
import { useAuth } from "../context/AuthContext";
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { LinearGradient } from 'expo-linear-gradient';

const CELL_COUNT = 6;

const VerifyAccountScreen = ({ route, navigation }) => {
  const { email } = route.params;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const { signIn } = useAuth();

  const handleVerify = async () => {
    try {
      const response = await VerifyAccount(email, value);
      const data = await response.json();

      if (data) {
        Toast.show({
          type: "success",
          text1: "You're all set. Welcome!",
          backgroundColor: "#000",
          text1Style: {
            color: "#466F78",
          },
          text2Style: { color: "#466F78" },
        });
        // signIn(data.token);
        navigation.navigate("HelpOptionsScreen");
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
    <LinearGradient colors={['#1E3A5F', '#091D34']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <EnhancedText style={styles.title}>Verify Your{'\n'}Account</EnhancedText>
          <View style={styles.codeFieldContainer}>
            <EnhancedText style={styles.inputLabel}>Enter Verification Code</EnhancedText>
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
                  onLayout={getCellOnLayoutHandler(index)}
                  key={index}
                  style={[styles.cellRoot, isFocused && styles.focusCell]}>
                  <EnhancedText style={styles.cellText}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </EnhancedText>
                </View>
              )}
            />
          </View>
          <EnhancedText style={styles.footerText}>
            We've sent a verification code to {email}.{'\n'}Please check your inbox and enter the code above.
          </EnhancedText>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <EnhancedText style={styles.backText}>Back</EnhancedText>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.verifyButton, value.length === CELL_COUNT && styles.verifyButtonActive]} 
            onPress={handleVerify}
          >
            <FontAwesomeIcon icon={faChevronRight} color={value.length === CELL_COUNT ? "#1E3A5F" : "#8E8E8E"} size={20} />
          </TouchableOpacity>
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
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
  },
  codeFieldContainer: {
    marginBottom: 30,
  },
  inputLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 10,
  },
  codeFieldRoot: {
    marginTop: 20,
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
  footerText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  verifyButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyButtonActive: {
    backgroundColor: '#F2E8DC',
  },
});

export default VerifyAccountScreen;
