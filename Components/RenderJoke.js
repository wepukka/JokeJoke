import React from "react";
import { Text, View } from "react-native";

const renderRandom = (type, data) => {
 

  if (type == "single") {
    return <Text style={{ fontSize: 17 }}>{data.joke}</Text>;
  } 
  if (type=="twopart") { 
    return <View>
        <Text style={{ fontSize: 17 }}>{data.setup}</Text>
        <Text/> 
        <Text style={{ fontSize: 17 }}>{data.delivery}</Text>
      </View>
    };
    return <Text style={{ fontSize: 17 }}>{data.message}</Text>
};

export default renderRandom;


 

