import React from "react";
import { Text, Image, ScrollView } from "react-native";
import JokeJoke from "../assets/JokeJoke.png";


const RenderJoke = (props) => {
  console.log(props.joke.message);
  if (props.joke.type == "single") {
    return (
      <ScrollView>
        <Text style={{ fontSize: 18 }}>{props.joke.joke}</Text>
      </ScrollView>
    );
  } else if (props.joke.type == "twopart") {
    return (
      <ScrollView>
        <Text style={{ fontSize: 18 }}>{props.joke.setup}</Text>
        <Text />
        <Text style={{ fontSize: 18 }}>{props.joke.delivery}</Text>
      </ScrollView>
    );
  }
  return <Image style={{ width: 200, height: 200 }} source={JokeJoke} />;
};

export default RenderJoke;
