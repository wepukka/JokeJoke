import React, { useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import Checkbox from "expo-checkbox";
import { Card } from "react-native-paper";
import CustomButton from "./Buttons";

// Props data for all rendered flatlist and save function
export default function FlagBoxes(props) {
  const [data, setData] = useState(props.data);


  // Handle checkbox change, save to state
  const handleChange = (id, data) => {
    let temp = data.map((data) => {
      if (id === data.id) {
        return { ...data, isChecked: !data.isChecked };
      }
      return data;
    });
    setData(temp)
  };

  //
  const renderFlatList = (renderData) => {
    return (
      <View>
        <FlatList
          data={renderData}
          renderItem={({ item }) => (
            <Card
              onPress={() => {
                handleChange(item.id, renderData);
              }}
              style={{ margin: 3 }}
            >
              <View style={styles.card}>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <Checkbox value={item.isChecked} color="purple" />
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
          <View style={{ flex: 3, top:"5%" }}>{renderFlatList(data)}</View>
          <View style={{flex:1, width:"40%", alignSelf:"center"}}>
          <CustomButton title="save" onPress={() => props.sendData(data)}/> 
          </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  card: {
    padding: 8,
    margin: 5,
  },
});
