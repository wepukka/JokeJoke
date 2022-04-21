import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import * as SQLite from "expo-sqlite";

export default function SelectedJoke({ route }) {
  const { joke } = route.params;

  return (
    <View style={styles.container}>
      <View styles={styles.middle}>
        <Text>{joke.id}</Text>
        <Text>{joke.category}</Text>
        <Text>{joke.type}</Text>

        <Text>asd</Text>
      </View>
      <View styles={styles.joke}>
        <Text>{joke.joke}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
    alignItems: "center",
    justifyContent: "center",
  },
  joke: {
    flex: 1,
    marginBottom: 20,
  },
  middle: {
    flex: 1,
    marginBottom: 20,
    marginTop: 20,
  },
});
