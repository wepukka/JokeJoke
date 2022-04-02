import React from "react";
import { Text, View } from "react-native";

const renderRandom = (type, data) => {

  if (type == "single") {
    return <Text style={{ fontSize: 25 }}>{data.joke}</Text>;
  } 
    return (
      <View>
        <Text style={{ fontSize: 25 }}>{data.setup}</Text>
        <Text style={{ fontSize: 25 }}>{data.delivery}</Text>
      </View>
    );
};

export default renderRandom;


 

