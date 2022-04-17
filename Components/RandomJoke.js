import React, {useRef, useEffect} from 'react'
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button} from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";

// Components & Data 
import mapUrl from './MapUrl';
import CheckBoxes from './CheckBoxes';
import renderRandom from "./RenderJoke";
import { flagsData, categoriesData, lengthData } from './JokeData';

export default function RandomJoke() {

  const [type, setType] = useState("");
  const [randJson, setRandJson] = useState({});

  const [categories, setCategories] = useState(categoriesData)
  const [flags, setFlags] = useState(flagsData)
  const [length, setLength] = useState(lengthData)

  const bottomSheet = useRef();

  // save data, close sheet
  const saveJokeData = (categories,flags,length) => {
    setCategories(categories)
    setFlags(flags)
    setLength(length)
    
    bottomSheet.current.close()
  }

  const Sheet = () => { 
    return(
        <BottomSheet hasDraggableIcon ref={bottomSheet} height={600} >
            <CheckBoxes data1={categories} data2={flags} data3={length} sendData={saveJokeData} /> 
        </BottomSheet>
    )}

  // Random jokes with no "dark" & "miscellaneous" due to harshness of some jokes //
  const [url, setUrl] = useState(
    "https://v2.jokeapi.dev/joke/"
  );

  // Change url if categories CATEGORIES, FLAGS or LENGTH changes 
  useEffect(() => {

  mapUrl(categories,flags,length)
  
  }, [categories,flags,length]);

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
        <Button title="Settings" onPress={() => bottomSheet.current.show() } />
        <Button title="ShowData" onPress={() => console.log(flags) } />
      </View>
      <View style={styles.jokeContainer}>{renderRandom(type, randJson)}</View>
      <Sheet/> 
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

