import React from "react";
import { View, Text, StyleSheet } from "react-native";

const UserDetails = ({ userDetails }) => {
    console.log('userDetails333', userDetails);
  return (
    <View style={styles.container}>
      <Text>User Name: {userDetails?.fullName}</Text>
      <Text>Email: {userDetails?.email}</Text>
    </View>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
