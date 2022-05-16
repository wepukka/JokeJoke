import React, { useRef, useEffect } from "react";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";
import * as SQLite from "expo-sqlite";


// Components & Data
import globalStyles from "../GlobalStyles";
import UrlChange from "../UrlChange";
import CheckBoxes from "../CheckBoxes";
import CustomButton from "../Buttons";
import { flagsData, categoriesData, lengthData } from "../Data/JokeData";
import Divider from "../Divider";
import RenderJoke from "../RenderJoke";

export default function JokePage() {
  const db = SQLite.openDatabase("jokes.db");
  const [url, setUrl] = useState("https://v2.jokeapi.dev/joke/Any");
  const [joke, setJoke] = useState({});
  const [categories, setCategories] = useState(categoriesData);
  const [flags, setFlags] = useState(flagsData);
  const [length, setLength] = useState(lengthData);
  const [saveStatus, setSaveStatus] = useState("");

  // bottomsheet location value
  const bottomSheet = useRef();

  // bottomSheet for fetch settings
  const SetupSheet = () => {
    return (
      <BottomSheet hasDraggableIcon ref={bottomSheet} height={600}>
        <CheckBoxes
          data1={categories}
          data2={flags}
          data3={length}
          sendData={saveJokeData}
        />
      </BottomSheet>
    );
  };

  // save data, close sheet
  const saveJokeData = (categories, flags, length) => {
    setCategories(categories);
    setFlags(flags);
    setLength(length);
    bottomSheet.current.close();
  };

  const saveJoke = () => {
    if (Object.keys(joke).length == 0 || joke.message != undefined) {
      setSaveStatus("NO JOKE");
    } else {
      sqlSave();
    }
  };

  const sqlSave = () => {
    let imageId;
    categoriesData.map((category) => {
      if (category.text == joke.category) {
        imageId = category.id;
      }
    });
    console.log(joke.category);
    let tempJoke;

    if (joke.type == "single") {
      tempJoke = joke.joke;
    } else {
      tempJoke = joke.setup + "\n\n" + joke.delivery;
    }
    setSaveStatus("SAVED");
    db.transaction((tx) => {
      tx.executeSql(
        "insert into jokes (joke, category, type, imageid) values (?,?,?,?);",
        [tempJoke, joke.category, joke.type, imageId]
      );
    }, null);
  };

  // Change url if categories CATEGORIES, FLAGS or LENGTH changes
  useEffect(() => {
    let newUrl = UrlChange(categories, flags, length);
    setUrl(newUrl);
  }, [categories, flags, length]);

  const fetchRandomJoke = async () => {
    try {
      let response = await fetch(url);
      let data = await response.json();
      setJoke(data);
      setSaveStatus("");
      console.log(url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.jokeInfo}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row", flex: 2 }}>
            <Text style={{ fontSize: 19 }}>Category</Text>
            <Text style={{ fontSize: 15, marginLeft: 20 }}>
              {joke.category}
            </Text>
          </View>
          <View style={{ flex: 0.8 }}>
            <Text></Text>
          </View>
        </View>
      </View>
      <Divider text={saveStatus} size={20} />
      <View style={globalStyles.jokeContainer}>
        <RenderJoke joke={joke}  /> 
      </View>
      <View style={styles.upperButtonStyle}>
        <CustomButton title={"JOKE"} onPress={() => fetchRandomJoke()} />
      </View>
      <View style={styles.lowerButtonContainer}>
        <View style={styles.lowerButtonStyle}>
          <CustomButton
            title={"SETTINGS"}
            onPress={() => bottomSheet.current.show()}
          />
        </View>
        <View style={styles.lowerButtonStyle}>
          <CustomButton
            title={"SAVE"}
            onPress={() => {
              saveJoke();
            }}
          />
        </View>
      </View>
      <SetupSheet />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `#deb887`,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  jokeInfo: {
    flex: 1,
    padding: 0,
    width: "80%",
    justifyContent: "center",
    flexDirection: "column"
  },
  upperButtonStyle: {
    marginBottom: 30,
    width: "25%"
  },
  lowerButtonContainer: {
    flex: 1,
    flexDirection: "row"
  },
  lowerButtonStyle: {
    marginLeft: 10,
    marginRight: 10,
    width: "25%"
  },

});
