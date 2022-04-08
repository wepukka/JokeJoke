import React, { useState } from 'react'
import {   
    Text,
    View,
    StyleSheet,
    FlatList,
    Button,
    Modal,
} from 'react-native';

import Checkbox from 'expo-checkbox';
import { Card } from 'react-native-paper';



export default function CheckBoxes () {

    const flagsData = [ 
    { id: 1, text: "NSFW", isChecked: false },
    { id: 2, text: "Religious", isChecked: false },
    { id: 3, text: "Political", isChecked: false },
    { id: 4, text: "Racist", isChecked: false },
    { id: 5, text: "Sexist", isChecked: false },
    { id: 6, text: "Explicit", isChecked: false },
];

    const categoriesData = [
    { id : 1, text : "Programming", isChecked : false},
    { id : 2, text : "Misc", isChecked : false},
    { id : 3, text : "Dark", isChecked : false},
    { id : 4, text : "Pun", isChecked : false},
    { id : 5, text : "Spooky", isChecked : false},
    { id : 6, text : "Christmas", isChecked : false},
 ];

 const lengthData = [
    { id : 1, text : "Single", isChecked : false},
    { id : 2, text : "Two part", isChecked : false},
 ];
 

    const [flags, setFlags] = useState(flagsData);
    const [categories, setCategories] = useState(categoriesData);
    const [jokeLength, setJokeLength] = useState(lengthData)

    //
    const handleChange = (id, data, type) => {
        let temp = data.map((data) => {
           
          if (id === data.id) {
              console.log(data.id, data.isChecked)
              console.log(data)
            return { ...data, isChecked: !data.isChecked};
          }
          return data;
        });
        if(type=="flags") {
            setFlags(temp)
        }
        if(type=="categories") {
            setCategories(temp)
        }
        if(type=="length") {
            setJokeLength(temp)
        }
      };

      // Params object array and type, either "flags", "categories" or "length"
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
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'space-between',
                }}>
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

  return (
    <View style={styles.container}>
    <View style={styles.heightDivider}>
    <View style={styles.childContainer}>
        
    <View style={styles.checkContainer}>
    <Text style={{alignSelf: 'center', marginBottom: 10, marginTop: 20 }}>Categories</Text>
      <View style={{ flex: 1 }}>{renderFlatList(categories, "categories")}</View>
    </View>

    <View style={styles.checkContainer}>
        <Text style={{alignSelf: 'center', marginBottom: 10, marginTop: 20 }}>Blacklist</Text>
      <View style={{ flex: 1 }}>{renderFlatList(flags, "flags")}</View>
    </View>
    </View>
    </View>

    <View style={styles.jokeLength}>
    <Text style={{alignSelf: 'center', marginBottom: 10, }}>Length</Text>
      <View style={{ flex: 1 }}>{renderFlatList(jokeLength, "length")}</View>
    </View>
    
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        padding: 0,
      },
      heightDivider: {
          height: "70%"
      },
      childContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
        flexDirection: 'row',
      },
    checkContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
      padding: 2,
    },
    jokeLength: {
        flex : 1,
        width: "70%",
        alignSelf:"center",
        justifyContent: 'space-around'
    },
  
    card: {
      padding: 8,
      margin: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
