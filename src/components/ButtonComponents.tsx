import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import Colors from "../constants/Colors";

const ButtonComponents = ({ label, onPressFunc }) => {
  return (
    <Pressable
      onPress={onPressFunc}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 300,
    height: 60,
    borderRadius: 10,
    backgroundColor: Colors.buttonPrimaryColor,
    margin: 10
  },
  buttonPressed: {
    backgroundColor: Colors.buttonSecondaryColor,
  },
  label: {
    padding: 20,
    textAlign: "center",
    alignItems: "center",
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.primaryColor,
  },
});

export default ButtonComponents;
