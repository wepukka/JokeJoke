import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SelectedJoke({ route }) {
  const { joke } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={{flexDirection:"row"}}>
        <View>
        <Text>Joke ID</Text>
        </View>
        <View>
        <Text>{joke.id}</Text>
        </View>
      </View>
        <Text>{joke.category}</Text>
        <Text>{joke.type}</Text>
      </View>

      <View style={styles.jokeContainer}>
      <Text>{joke.joke}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:`#deb887`,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer:{
    flex: 1,
    backgroundColor:"grey",
    alignItems:"center",
    justifyContent:"center",
  },
  jokeContainer: {
    flex: 2,
    backgroundColor:"whitesmoke",
    alignItems:"center",
    justifyContent:"center",
  },
});
