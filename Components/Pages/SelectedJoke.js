import React from "react";
import { StyleSheet, Text, View, Share, ScrollView } from "react-native";
import Divider from "../Divider";
import globalStyles from "../GlobalStyles";
import CustomButton from "../Buttons";
import Ionicons from "@expo/vector-icons/Ionicons";

const JokeInfo = (props) => {
  return <Text style={styles.infoText}>{props.text}</Text>;
};

export default function SelectedJoke({ route }) {
  const { joke } = route.params;

  const shareOptions = {
    title: "Shared with JokeJoke",
    message: joke.joke,
    subject: "Hello friend!"
  };

  const ShareJoke = () => {
    Share.share(shareOptions);
  };

  return (
    <View style={styles.container}>
      <Divider text={"INFO"} size={20} />
      <View style={styles.infoContainer}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <JokeInfo text={"ID"} />
            <JokeInfo text={"Category"} />
            <JokeInfo text={"Type"} />
          </View>
          <View style={{ flex: 1 }}>
            <JokeInfo text={joke.id} />
            <JokeInfo text={joke.category} />
            <JokeInfo text={joke.type} />
          </View>
        </View>
        <Divider text={"JOKE"} size={20} />
      </View>
      <View style={globalStyles.jokeContainer}>
      <ScrollView>
        <Text style={{ fontSize: 20 }}>{joke.joke}</Text>
        </ScrollView>
      </View>
      <Divider text={""} />
      <View style={{ flex: 2, justifyContent: "flex-start" }}>
        <View style={{ top: "20%", width: 100 }}>
          <CustomButton
            title={<Ionicons name="share-social" size={20} color={"white"} />}
            onPress={() => ShareJoke()}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `#deb887`,
    alignItems: "center",
    justifyContent: "center"
  },
  infoContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  jokeContainer: {
    flex: 2,
    justifyContent: "flex-start",
    paddingHorizontal: 40,
    paddingVertical: 15
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
    alignSelf: "center"
  }
});
