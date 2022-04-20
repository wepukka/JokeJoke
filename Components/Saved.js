import React, {useEffect, useState} from 'react'
import * as SQLite from 'expo-sqlite'
import { StyleSheet, Text, View, Button , FlatList} from 'react-native';

// SQLITE UPDATES RENDER  ONLY WHEN RESTARTING PROGRAM // 
export default function Saved() {

  const db = SQLite.openDatabase('jokes.db')

  const [joke, setJoke] = useState(joke)
  const [category, setCategory] = useState(category)
  const [type, setType] = useState(type)

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists jokes (id integer primary key not null, joke text, category text, type text);');
    });
    updateList();
  }, []);

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
        style={{marginTop:20}}
        data={joke}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => 
       <View style={styles.list}>
        <Text style={{fontSize:20}}> {item.joke}, {item.category} </Text>
        <Text style={{color:"red", fontSize:20}} onPress={() => deleteItem(item.id)}>Delete</Text>
        </View>}
        />  
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 50,
      backgroundColor: '#fff',
      justifyContent:"center",
      alignItems: "center"
    },
    list: {
      flexDirection:"row",
      justifyContent:"center",
      marginTop:5
    }
  });