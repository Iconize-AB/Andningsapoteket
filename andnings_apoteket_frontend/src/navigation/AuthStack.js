import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UsersChoice from "../authentication/UsersChoice";
import SigninScreen from "../authentication/SigninScreen";
import SignupScreen from "../authentication/SignupScreen";
import ForgotPasswordScreen from "../authentication/ForgotPasswordScreen";
import VerifyAccountScreen from "../authentication/VerifyAccountScreen";
import AuthorizationCodeScreen from "../authentication/AuthorizationCodeScreen";
import ResetAccountScreen from "../authentication/ResetAccountScreen";
import HelpOptionsScreen from "../onboarding/HelpOptionsScreen";
import ContentScreen from "../onboarding/ContentScreen";
import InvitationScreen from "../onboarding/InvitationScreen";
import PaymentMethodScreen from "../payment/PaymentMethodScreen";
import SubscriptionScreen from "../onboarding/SubscriptionScreen";
import ChallengeOverviewScreen from "../screens/ChallengeOverviewScreen";

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
      <Stack.Screen name="HelpOptionsScreen" component={HelpOptionsScreen} />
      <Stack.Screen name="ContentScreen" component={ContentScreen} />
      <Stack.Screen name="InvitationScreen" component={InvitationScreen} />
      <Stack.Screen name="PaymentMethodScreen" component={PaymentMethodScreen} />
      <Stack.Screen name="SubscriptionScreen" component={SubscriptionScreen} />
      <Stack.Screen name="ChallengeOverviewScreen" component={ChallengeOverviewScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;

