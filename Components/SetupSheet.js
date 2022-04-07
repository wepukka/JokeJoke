import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View, Dimensions, Animated } from "react-native";


import { ScrollView } from "react-native-gesture-handler";


const {width,height} = Dimensions.get("screen")

const SetupSheet = (props) => {
    const [aligment] = useState(new Animated.Value(0));

    const bringUpSetupSheet = () => {
        Animated.timing(aligment, {
            toValue: 1,
            duration: 500
        }).start();
    };

    const setupSheetIntropolate = aligment.interpolate({
        inputRange: [0, 1],
        outputRange: [-height / 2.4 + 50,  0 ]
    });

    const setupSheetStyle = {
       bottom : setupSheetIntropolate
    };

  return (
      <Animated.View style={[styles.container, setupSheetStyle]}>
          <ScrollView style = {styles.grabber}>
          </ScrollView>
        <Text>Setup sheet</Text>
    </Animated.View>
  );
};

export default SetupSheet;

const styles = StyleSheet.create({
  container: {
   position: "absolute",
   left:0,
   right:0,
   bottom: 0,
   bottom: height/3,
   height: height/2.4
  },
  grabber: {
    width:60,
    height:3,
    backgroundColor: "whitesmoke"
  },
});
