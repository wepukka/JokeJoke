import { React, useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import CustomButton from "../Buttons";
import { flagsData } from "../Data/JokeData";
import BottomSheet from "react-native-gesture-bottom-sheet";
import FlagBoxes from "../CreateJokeBoxes";

export default function CreateJokePage() {
  const bottomSheet = useRef();
  const [type, setType] = useState("single");
  const [joke, setJoke] = useState("");
  const [setup, setSetup] = useState("");
  const [delivery, setDelivery] = useState("");
  const [category, setCategory] = useState("");
  const [flags, setFlags] = useState(flagsData);
  const [apiResponse, setApiResponse] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Default json, where Joke or Setup & Delivery will be added
  const json = {
    formatVersion: 3,
    category: category,
    type: type,
    flags: {
      nsfw: false,
      religious: false,
      political: false,
      racist: false,
      sexist: false,
      explicit: false,
    },
    lang: "en",
  };

  const categories = [
    "Programming",
    "Misc",
    "Pun",
    "Spooky",
    "Christmas",
    "Dark",
  ];

  // saveFlag as bottomsheet param
  const saveFlags = (data) => {
    setFlags(data);
    bottomSheet.current.close();
  };

  // Contains flagSelection
  const FlagSheet = () => {
    return (
      <BottomSheet hasDraggableIcon ref={bottomSheet} height={500}>
        <FlagBoxes data={flags} sendData={saveFlags} />
      </BottomSheet>
    );
  };

  // Switch joke type
  const handleTypeChange = () => {
    if (type == "single") {
      setType("twopart");
      setJoke("");
    } else {
      setType("single");
      setSetup("");
      setDelivery("");
    }
  };

  //Switch between single and twopart joke input
  const inputForm =
    type == "single" ? (
      <View>
        <TextInput
          style={[styles.input, { top: "40%" }]}
          onChangeText={(text) => setJoke(text)}
          placeholder="Joke"
        />
      </View>
    ) : (
      <View>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setSetup(text)}
          placeholder="Setup"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setDelivery(text)}
          placeholder="Delivery"
        />
      </View>
    );

  // Dropdown for picking category
  const categoryDropDown = (
    <SelectDropdown
      buttonStyle={styles.dropDownButton}
      buttonTextStyle={styles.dropDownButtonText}
      defaultButtonText="Select Category"
      data={categories}
      onSelect={(selectedItem, index) => {
        setCategory(selectedItem);
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        // text represented after item is selected
        // if data array is an array of objects then return selectedItem.property to render after item is selected
        return selectedItem;
      }}
      rowTextForSelection={(item, index) => {
        // text represented for each item in dropdown
        // if data array is an array of objects then return item.property to represent item in dropdown
        return item;
      }}
    />
  );
  
  // Switch json booleans
  const changeJsonFlags = () => {
    flags.map((flag) => {
      if (flag.isChecked == true) {
        json.flags[flag.text.toLowerCase()] = true;
      } else {
        json.flags[flag.text.toLowerCase()] = false;
      }
    });
  };

  // Send post Request to api
  const handleSubmit = () => {
    changeJsonFlags();
    json.category = category;
    json.type = type;

    if (type == "single") {
      json.joke = joke;
    } else if (type == "twopart") {
      json.setup = setup;
      json.delivery = delivery;
    }

    fetch("https://v2.jokeapi.dev/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(json),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.message.includes("Malformed")) {
          setApiResponse("Remember to pick category and write a joke!");
        } else if (response.message.includes("blocked")) {
          setApiResponse("Too many joke requests");
        } else {
          setApiResponse(response.message);
        }
      });
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: "row", paddingHorizontal: 50 }}>
        <View style={{ flex: 1, marginTop: 30, marginRight: 30 }}>
          <CustomButton title={type} onPress={() => handleTypeChange()} />
        </View>
        <View style={{ flex: 1, marginTop: 30 }}>{categoryDropDown}</View>
      </View>
      <View
        style={{
          flex: 0.5,
          width: "30%",
        }}
      >
        <CustomButton
          title="Pick Flags"
          onPress={() => bottomSheet.current.show()}
        />
      </View>
      <View
        style={{
          flex: 2,
          marginTop: 20,
          width: "80%",
        }}
      >
        <Text style={{ alignSelf: "center", fontSize: 20, marginBottom: 10 }}>
          Write joke
        </Text>
        {inputForm}
      </View>
      <View style={{ flex: 1, padding: 10 }}>
        <Text>{apiResponse}</Text>
      </View>
      <View
        style={{
          flex: 1,
          marginTop: 20,
          width: "25%",
        }}
      >
        <CustomButton title="Submit" onPress={() => handleSubmit()} />
      </View>
      <FlagSheet />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: `#deb887`,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 15,
    borderWidth: 1,
    padding: 10,
    width: "80%",
    alignSelf: "center",
  },
  dropDownButton: {
    backgroundColor: "#4682b4",
    alignItems: "center",
    borderRadius: 10,
    elevation: 10,
    width: "100%",
    height: 40,
  },
  dropDownButtonText: {
    fontSize: 12,
    lineHeight: 20,
    fontWeight: "bold",
    letterSpacing: 1.25,
    color: "white",
  },
});
