import React from "react";
import { Text, View, Image } from "react-native";
import JokeJoke from "../assets/JokeJoke.png"

const RenderJoke = (type, data) => {
  console.log(data.message)
  if (type == "single") {
    return <Text style={{ fontSize: 18}}>{data.joke}</Text>;
  } 
  else if (type=="twopart") { 
    return <View>
        <Text style={{ fontSize: 18 }}>{data.setup}</Text>
        <Text/> 
        <Text style={{ fontSize: 18 }}>{data.delivery}</Text>
      </View>
    }
  return <Image style={{width: 200, height: 200}} source={JokeJoke}/> 
};

export default RenderJoke;


 

