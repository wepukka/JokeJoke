import React, {useEffect, useState} from 'react'

import * as SQLite from 'expo-sqlite'
import { StyleSheet, Text, View , FlatList, addons} from 'react-native';


// SQLITE UPDATES RENDER  ONLY WHEN RESTARTING PROGRAM // 
export default function Saved({navigation}) {

  const [joke, setJoke] = useState(joke)

  const db = SQLite.openDatabase('jokes.db')

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
        style={{marginTop:20}}
        data={joke}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => 

       <View style={styles.list}>
        <Text style={{fontSize:20, color:"blue" }} onPress={() => navigation.navigate('Selected', {joke: item})}> {item.id+"."} { item.joke.split(" ").slice(0,2).join(" ")}</Text>

        <Text style={{color:"red", fontSize:20}} onPress={() => deleteItem(item.id)}>{"DELETE"}{"\n"} </Text>
        </View>}
        />  
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex:1,
      justifyContent:"center",
      alignItems: "center",
      marginTop: 20,
    },
    list: {
      flexDirection:"row",
      justifyContent:"space-between",
      marginTop:5,
      alignItems:"center" ,
      backgroundColor:"whitesmoke"
    },
  });