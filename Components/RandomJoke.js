import React, { useRef, useEffect } from "react";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";
import * as SQLite from 'expo-sqlite'

// Components & Data

import UrlChange from "./UrlChange";
import CheckBoxes from "./CheckBoxes";
import renderRandom from "./RenderJoke";
import { flagsData, categoriesData, lengthData } from "./JokeData";

export default function RandomJoke() {

  const db = SQLite.openDatabase('jokes.db')

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists jokes (id integer primary key not null, joke text, category text, type text);');
    });
    updateList();
  }, []);

  const savejoke = () => {
    db.transaction(tx => {
      tx.executeSql('insert into jokes (joke, category, type) values (?,?,?);',
      ["asasd","asdasd","asdasd"], );
    }, null, updateList)
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from jokes;', [], (_, {rows}) =>
        setJoke(rows._array)
    )
    }, null, null)
  }


  const [type, setType] = useState("");
  const [joke, setJoke] = useState({});

  const [categories, setCategories] = useState(categoriesData);
  const [flags, setFlags] = useState(flagsData);
  const [length, setLength] = useState(lengthData);

  // bottomsheet location value
  const bottomSheet = useRef();

  // save data, close sheet
  const saveJokeData = (categories, flags, length) => {
    setCategories(categories);
    setFlags(flags);
    setLength(length);

    bottomSheet.current.close();
  };

  const Sheet = () => {
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

  const renderCategoryType = () => {
    if (joke.category == undefined || joke.type == undefined) {
      return (
        <View>
          <Text> {"Category: "}</Text>
          <Text> {"Type: "}</Text>
        </View>
      );
    }
    return (
      <View>
        <Text> {"Category: " + joke.category}</Text>
        <Text> {"Type: " + joke.type}</Text>
      </View>
    );
  };

  // Random jokes with no "dark" & "miscellaneous" due to harshness of some jokes //
  const [url, setUrl] = useState("https://v2.jokeapi.dev/joke/Any");

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
      setType(data.type);
      console.log(url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.jokeInfo}>
        <View style={styles.info}>
          <Text>SAVE STATUS</Text>
        </View>
        <View style={styles.jokeData}>{renderCategoryType()}</View>
      </View>
      <View style={styles.jokeContainer}>{renderRandom(type, joke)}</View>
      <View style={styles.upperButtonStyle}>
        <Button title="Joke" onPress={fetchRandomJoke} />
      </View>

      <View style={{ flexDirection: "row" }}>
        <View style={styles.lowerButtonStyle}>
          <Button title="Settings" onPress={() => bottomSheet.current.show()} />
        </View>
        <View style={styles.lowerButtonStyle}>
          <Button title="Save Joke" onPress={() => {savejoke()} } />
        </View>
      </View>
      <Sheet />
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
    flexDirection: "column",
  },
  jokeInfo: {
    padding: 8,
    flexDirection: "row",
    width: "80%",
  },
  jokeData: { flex: 1 },
  info: {
    flex: 1,
  },
  jokeContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: "55%",
    backgroundColor: "grey",
    marginBottom: 10,
    marginTop: 10,
  },
  upperButtonStyle: {
    flexDirection: "column",
    marginBottom: 30,
    width: "30%",
    backgroundColor: "grey",
  },
  lowerButtonStyle: {
    marginLeft: 20,
    width: "30%",
  },
});
