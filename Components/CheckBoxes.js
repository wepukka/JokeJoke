import React, { useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import Checkbox from "expo-checkbox";
import { Card } from "react-native-paper";
import CustomButton from "./Buttons";
import Ionicons from "@expo/vector-icons/Ionicons"

// Props data for all rendered flatlist and save function
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
            <Card onPress={() => {
              handleChange(item.id,renderData,type)
            }} style={{ margin: 3 }}>
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
        <View style={styles.topContainer}>
          <View style={styles.checkContainer}>
            <Text
              style={{ alignSelf: "center", marginBottom: 10, marginTop: 0, fontSize:15 }}
            >
              Categories
            </Text>
            <View style={{ flex: 1 }}>
              {renderFlatList(data1, "data1")}
            </View>
          </View>

          <View style={styles.checkContainer}>
            <Text
              style={{ alignSelf: "center", marginBottom: 10, marginTop: 0, fontSize:15 }}
            >
              Blacklist
            </Text>
            <View style={{ flex: 1 }}>{renderFlatList(data2, "data2")}</View>
          </View>
        </View>
      <View style={styles.bottomContainer}>
        <View style={{flexDirection:"row"}}>
        <View style={{ flex: 2}}>
        <Text style={{alignSelf:"center",marginBottom: 10, fontSize:15 }}>Length</Text>
        {renderFlatList(data3, "data3")}
        </View>
        <View style={{flex: 1, marginTop: 25, padding: 30}}>
          <CustomButton title={<Ionicons name="checkbox-outline" size={20} color={"white"} /> } onPress={() => props.sendData(data1, data2, data3) } /> 
          </View>
        </View>
      </View>
 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  topContainer: {
    flex: 2,
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
  bottomContainer: {
    flex: 1,
  },
  card: {
    padding: 8,
    margin: 5,
    
 
  },
});
