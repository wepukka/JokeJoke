import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

const CustomButton = (props) => {
  const { onPress, title } = props;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#6a5acd" : "#4682b4"
        },
        styles.button
      ]}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 10,

    height: 40
  },
  text: {
    fontSize: 12,
    lineHeight: 20,
    fontWeight: "bold",
    letterSpacing: 1.25,
    color: "white"
  }
});

export default CustomButton;
