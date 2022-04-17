import React, { useState } from "react";
import { Text, View, StyleSheet, FlatList, Button } from "react-native";
import Checkbox from "expo-checkbox";
import { Card } from "react-native-paper";

// Props sendData={saveJokeData} from RandomJoke
export default function CheckBoxes(props) {

  const [data1, setData1] = useState(props.data1);
  const [data2, setData2] = useState(props.data2);
  const [data3, setData3] = useState(props.data3);

  // Handle checkbox change, save to state
  const handleChange = (id, data, type) => {
    let temp = data.map((data) => {
      if (id === data.id) {
        return { ...data, isChecked: !data.isChecked };
      }
      return data;
    });
    if (type == "data1") {
      setData1(temp)
    }
    if (type == "data2") {
      setData2(temp)
    }
    if (type == "data3") {
      setData3(temp)
    }
  };

  //  
  const renderFlatList = (renderData, type) => {
    return (
      <View>
        <FlatList
          data={renderData}
          renderItem={({ item }) => (
            <Card style={{ margin: 3 }}>
              <View style={styles.card}>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <Checkbox
                    value={item.isChecked}
                    color="purple"
                    onValueChange={() => {
                      handleChange(item.id, renderData, type);
                    }}
                  />
                  <Text>{item.text}</Text>
                </View>
              </View>
            </Card>
          )}
        />
      </View>
    );
  };

  // View with 3 flatlist elements // 
  return (
    <View style={styles.container}>
      <View style={styles.heightDivider}>
        <View style={styles.childContainer}>
          <View style={styles.checkContainer}>
            <Text
              style={{ alignSelf: "center", marginBottom: 10, marginTop: 20, fontSize:15 }}
            >
              Categories
            </Text>
            <View style={{ flex: 1 }}>
              {renderFlatList(data1, "data1")}
            </View>
          </View>

          <View style={styles.checkContainer}>
            <Text
              style={{ alignSelf: "center", marginBottom: 10, marginTop: 20, fontSize:15 }}
            >
              Blacklist
            </Text>
            <View style={{ flex: 1 }}>{renderFlatList(data2, "data2")}</View>
          </View>
        </View>
      </View>

      <View style={styles.jokeLength}>
        <Text style={{ alignSelf: "center", marginBottom: 10, fontSize:15 }}>Length</Text>
        <View style={{ flex: 1 }}>{renderFlatList(data3, "data3")}</View>
      </View>
      <Button title="Save" onPress={() => props.sendData(data1, data2, data3) } />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    padding: 0,
  },
  heightDivider: {
    height: "70%",
  },
  childContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
    flexDirection: "row",
  },
  checkContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 2,
  },
  jokeLength: {
    flex: 1,
    width: "70%",
    alignSelf: "center",
    justifyContent: "space-around",
  },
  card: {
    padding: 8,
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});