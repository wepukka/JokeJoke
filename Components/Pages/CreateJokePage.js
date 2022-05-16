import { React, useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import CustomButton from "../Buttons";

export default function CreateJokePage() {
    
  const [type, setType] = useState("single");
  const [joke, setJoke] = useState("");
  const [setup, setSetup] = useState("");
  const [delivery, setDelivery] = useState("");
  const [category, setCategory] = useState("");

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
  }

  const categories = [
    "Programming",
    "Misc",
    "Pun",
    "Spooky",
    "Christmas",
    "Dark",
  ];

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

  const handleSubmit = () => {

    json.category = category;
    json.type = type;

    if (type == "single" & joke != "" & category != "") {
      json.joke = joke;
      console.log(json)
      console.log("Send single")
    } else if (type == "twopart" & category != "" & setup != "" & delivery != "") {
      json.setup = setup;
      json.delivery = delivery;
      console.log(json)
      console.log("Send Twopart")
    }
    // ERROR
    else {
        console.log(json)
        console.log("Check all is set")
    }
  };

  useEffect(() => {
    console.log(json);
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: "row", paddingHorizontal: 50 }}>
        <View style={{ flex: 1, marginTop: 30, marginRight: 30 }}>
          <CustomButton
            title="Switch type"
            onPress={() => handleTypeChange()}
          />
          <Text style={{ fontSize: 20, alignSelf: "center" }}>{type}</Text>
        </View>
        <View style={{ flex: 1, marginTop: 30 }}>{categoryDropDown}</View>
      </View>
      <View
        style={{
          flex: 2,
          marginTop: 30,
          width: "80%",
        }}
      >
        <Text style={{ alignSelf: "center", fontSize: 20 }}>Pick Flags</Text>
      </View>
      <View
        style={{
          flex: 2,
          marginTop: 20,
          width: "80%",
        }}
      >
        <Text style={{ alignSelf: "center", fontSize: 20 }}>New joke</Text>
        {inputForm}
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
