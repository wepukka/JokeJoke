import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";


import renderRandom from "./RenderJoke";

export default function RandomJoke() {

  const [type, setType] = useState("");
  const [randJson, setRandJson] = useState({});

  // Random jokes with no "dark" & "miscellaneous" due to harshness of some jokes //
  const [url, setUrl] = useState(
    "https://v2.jokeapi.dev/joke/Programming,Pun,Spooky,Christmas"
  );

  const fetchRandomJoke = async () => {
    try {
      let response = await fetch(url);
      let data = await response.json();
      setRandJson(data);
      setType(data.type);
      console.log(url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: "blue", fontSize: 24 }}>JokeJoke</Text>
      <View style={styles.buttonContainer}>
        <Button title="Random" onPress={fetchRandomJoke} />
      </View>
      <View style={styles.jokeContainer}>{renderRandom(type, randJson)}</View>

      <StatusBar style="auto" />
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
  jokeContainer: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    marginTop: 20,
  },
});

