import React, {useEffect, useState} from 'react'
import pun from "./Data/Pun.png"
import christmas from "./Data/Christmas.png"
import dark from "./Data/Dark.png"
import programming from "./Data/Programming.png"
import spooky from "./Data/Spooky.png"
import miscellaneous from "./Data/Miscellaneous.png"
import CustomButton from './Buttons'

import * as SQLite from 'expo-sqlite'
import { StyleSheet, Text, View , FlatList, Image} from 'react-native';

// SQLITE UPDATES RENDER  ONLY WHEN RESTARTING PROGRAM // 
export default function Saved({navigation}) {
  const db = SQLite.openDatabase('jokes.db')

  const images = [
    { id : 1, text: "Programming", image: programming},
    { id : 2, text: "Misc", image: miscellaneous},
    { id : 3, text: "Pun", image: pun},
    { id : 4, text: "Spooky", image: spooky},
    { id : 5, text: "Christmas", image: christmas},
    { id : 6, text: "Dark", image: dark},
  ]

  const [joke, setJoke] = useState(joke)
  
  useEffect(() => {
    // useEffect triggers when component activates
    const unsubscribe = navigation.addListener('focus', () => {
        console.log('UseEffect Saved.js')
        updateList()
    });
    return unsubscribe;
}, [navigation]);

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from jokes;', [], (_, {rows}) =>
        setJoke(rows._array)
    )
    }, null, null)
  }

  const deleteItem = (id) => {
    db.transaction(tx => {
      tx.executeSql('delete from jokes where id = ?;', [id]);}, null, updateList)
    }

    return (
      <View style={styles.container}>
       <FlatList
       showsVerticalScrollIndicator={false}
       showsHorizontalScrollIndicator={false}
        data={joke}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => 
       <View style={styles.list}>
        <Text style={{fontSize:20, color:"black", flex:1}} onPress={() => 
          navigation.navigate('Selected', {joke: item})}> { 
            item.joke
          .split(" ")
          .slice(0,2)
          .join(" ")
          }</Text>
        <CustomButton title={"DELETE"} onPress={() => deleteItem(item.id)}>{"DELETE"}{"\n"} </CustomButton>
        <Image style={styles.images} source={images[(item.imageid)-1].image}></Image>
        </View>}
        />  
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
   backgroundColor:`#deb887`
    },
    list: {
      flexDirection:"row",
      marginTop:5,
      alignItems:"center",
      backgroundColor:"whitesmoke",
    },
    images: {
      width: 50,
      height: 50,
      marginLeft:20
    },
  });