import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UsersChoice from "../authentication/UsersChoice";
import SigninScreen from "../authentication/SigninScreen";
import SignupScreen from "../authentication/SignupScreen";
import ForgotPasswordScreen from "../authentication/ForgotPasswordScreen";
import VerifyAccountScreen from "../authentication/VerifyAccountScreen";
import AuthorizationCodeScreen from "../authentication/AuthorizationCodeScreen";
import ResetAccountScreen from "../authentication/ResetAccountScreen";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserChoose" component={UsersChoice} />
      <Stack.Screen name="SignIn" component={SigninScreen} />
      <Stack.Screen name="SignUp" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="VerifyAccountScreen" component={VerifyAccountScreen} />
      <Stack.Screen name="AuthorizationCode" component={AuthorizationCodeScreen} />
      <Stack.Screen name="ResetPasswordScreen" component={ResetAccountScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;

